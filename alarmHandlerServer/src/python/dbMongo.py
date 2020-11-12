from pymongo import MongoClient
import os
from time import sleep

try:
    AH_DEBUG = bool(os.environ['AH_DEBUG'])
except:
    AH_DEBUG = False


def initDatabase():
    try:
        ALARM_DATABASE = os.environ['ALARM_DATABASE']
    except:
        ALARM_DATABASE = "localhost"
    try:
        ALARM_DATABASE_REPLICA_SET_NAME = os.environ['ALARM_DATABASE_REPLICA_SET_NAME']
    except:
        ALARM_DATABASE_REPLICA_SET_NAME = "devrs"

    try:
        MONGO_ROOT_USERNAME = os.environ['MONGO_ROOT_USERNAME']
        MONGO_ROOT_PASSWORD = os.environ['MONGO_ROOT_PASSWORD']
        MONGO_ROOT_USERNAME = urllib.parse.quote_plus(
            MONGO_ROOT_USERNAME)
        MONGO_ROOT_PASSWORD = urllib.parse.quote_plus(
            MONGO_ROOT_PASSWORD)
        mongoAuth = True
    except:
        mongoAuth = False

    try:
        MONGO_INITDB_ALARM_DATABASE = os.environ['MONGO_INITDB_ALARM_DATABASE']
    except:
        MONGO_INITDB_ALARM_DATABASE = "demoAlarmDatabase"

    if (mongoAuth):
        client = MongoClient(
            'mongodb://%s:%s@%s' %
            (MONGO_ROOT_USERNAME, MONGO_ROOT_PASSWORD, ALARM_DATABASE), replicaSet=ALARM_DATABASE_REPLICA_SET_NAME)
        # Wait for MongoClient to discover the whole replica set and identify MASTER!
        sleep(0.5)
    else:
        client = MongoClient('mongodb://%s' % (ALARM_DATABASE),
                             replicaSet=ALARM_DATABASE_REPLICA_SET_NAME)
        # Wait for MongoClient to discover the whole replica set and identify MASTER!
        sleep(0.5)

    global alarmDB
    alarmDB = client[MONGO_INITDB_ALARM_DATABASE]

    # Prefix and suffix for alarmIOC pvs
    global alarmIOCPVPrefix
    global alarmIOCPVSuffix
    doc = alarmDB.config.find_one()
    try:
        alarmIOCPVPrefix = doc["alarmIOCPVPrefix"]
        alarmIOCPVSuffix = doc["alarmIOCPVSuffix"]
    except:
        if(AH_DEBUG):
            print('[Warning]', 'alarmIOCPVPrefix not instantiated')


def dbUpdateHistory(id, entry):
    alarmDB.history.update_many(
        {'id': id},
        {'$push': {
            'history': {
                '$each': [entry],
                '$position': 0
            }
        }})


def main():
    initDatabase()


main()
