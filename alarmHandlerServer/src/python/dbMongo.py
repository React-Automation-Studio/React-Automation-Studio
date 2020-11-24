from pymongo import MongoClient
import os
from time import sleep

try:
    AH_DEBUG = bool(os.environ['AH_DEBUG'])
except:
    AH_DEBUG = False

alarmDB = None


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
        # sleep(0.5)
    else:
        client = MongoClient('mongodb://%s' % (ALARM_DATABASE),
                             replicaSet=ALARM_DATABASE_REPLICA_SET_NAME)
        # Wait for MongoClient to discover the whole replica set and identify MASTER!
        # sleep(0.5)

    global alarmDB
    alarmDB = client[MONGO_INITDB_ALARM_DATABASE]

    while(len(alarmDB.list_collection_names()) != 5):
        if(AH_DEBUG):
            print('Waiting for Pymongo to connect to all collections in alarm database')
    if(AH_DEBUG):
        print('Pymongo connected to alarm database')
        print(alarmDB.list_collection_names())


def dbGetCollection(collection):
    return alarmDB[collection]


def dbGetEnables(areaKey, pvKey, subAreaKey=None):
    doc = alarmDB.pvs.find_one(
        {"area": areaKey})
    if (subAreaKey):
        areaEnable = doc["enable"]
        subAreaEnable = doc[subAreaKey]["enable"]
        pvEnable = doc[subAreaKey]["pvs"][pvKey]["enable"]

    else:
        areaEnable = doc["enable"]
        subAreaEnable = None
        pvEnable = doc["pvs"][pvKey]["enable"]

    globalEnable = alarmDB.glob.find_one()[
        "enableAllAreas"]

    return globalEnable, areaEnable, subAreaEnable, pvEnable


def dbGetListOfPVNames():
    areaList = []
    pvNameList = []
    # loop through each document = area
    for area in alarmDB.pvs.find():
        for key in area.keys():
            if (key == "area"):
                areaList.append(area[key])
            if (key == "pvs"):
                for pvKey in area[key].keys():
                    pvNameList.append(area[key][pvKey]["name"])
            if ("subArea" in key):
                for subAreaKey in area[key].keys():
                    if (subAreaKey == "name"):
                        areaList.append(area["area"] + '=' +
                                        area[key][subAreaKey])
                    if (subAreaKey == "pvs"):
                        for pvKey in area[key][subAreaKey].keys():
                            pvNameList.append(
                                area[key][subAreaKey][pvKey]["name"])
    return areaList, pvNameList


def dbGetPVField(field, areaKey, pvKey, subAreaKey=None):
    doc = alarmDB.pvs.find_one(
        {"area": areaKey})
    if (subAreaKey):
        fieldValue = doc[subAreaKey]["pvs"][pvKey][field]
    else:
        fieldValue = doc["pvs"][pvKey][field]
    return fieldValue


def dbSetPVField(field, value, areaKey, pvKey, subAreaKey=None):
    if (subAreaKey):
        alarmDB.pvs.update_many(
            {'area': areaKey},
            {'$set': {
                subAreaKey + '.pvs.' + pvKey + '.'+field:
                value
            }})
    else:
        alarmDB.pvs.update_many(
            {'area': areaKey},
            {'$set': {
                'pvs.' + pvKey + '.'+field: value
            }})


def dbFindOne(collection, documentKey=None):
    if(documentKey):
        doc = alarmDB[collection].find_one(
            documentKey)
    else:
        doc = alarmDB[collection].find_one()
    return doc


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
