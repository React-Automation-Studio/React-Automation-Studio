from pymongo import MongoClient
import os
from time import sleep

from log import app_log

try:
    AH_DEBUG = bool(os.environ['AH_DEBUG'])
except:
    AH_DEBUG = False

try:
    REPLICA_SET_MEMBERS = os.environ['REPLICA_SET_MEMBERS'].split(',')
    REPLICA_SET_MEMBER_LENGTH = len(REPLICA_SET_MEMBERS)
except:
    REPLICA_SET_MEMBER_LENGTH = 3

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
            (MONGO_ROOT_USERNAME, MONGO_ROOT_PASSWORD, ALARM_DATABASE),
            replicaSet=ALARM_DATABASE_REPLICA_SET_NAME,
            readPreference='secondaryPreferred')
    else:
        client = MongoClient('mongodb://%s' % (ALARM_DATABASE),
                             replicaSet=ALARM_DATABASE_REPLICA_SET_NAME,
                             readPreference='secondaryPreferred')

    # Wait for MongoClient to discover the whole replica set and identify MASTER!
    # while(len(list(client.nodes)) != REPLICA_SET_MEMBER_LENGTH):
    #     sleep(1.0)
    #     app_log.info(
    #         'Waiting for Pymongo to discover the whole replica set and identify MASTER')
    # app_log.info('Pymongo connected to all replica set members')
    # app_log.info(str(list(client.nodes)))
    #

    global alarmDB
    alarmDB = client[MONGO_INITDB_ALARM_DATABASE]

    while(len(alarmDB.list_collection_names()) != 5):
        app_log.info(
            'Waiting for Pymongo to connect to all collections in alarm database')
        sleep(1.0)
    app_log.info('Pymongo connected to all collections in alarm database')
    app_log.info(str(alarmDB.list_collection_names()))
    while(len(list(alarmDB['glob'].find({}))) == 0):
        app_log.info('Alarm database '+MONGO_INITDB_ALARM_DATABASE +
                     ' still being instantiated')
        sleep(1.0)
    app_log.info('Alarm database '+MONGO_INITDB_ALARM_DATABASE +
                 ' instantiated')


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
    return areaList, list(set(pvNameList))


def dbGetField(field, areaKey, pvKey=None, subAreaKey=None):
    doc = alarmDB.pvs.find_one(
        {"area": areaKey})
    if (subAreaKey):
        if(pvKey):
            fieldValue = doc[subAreaKey]["pvs"][pvKey][field]
        else:
            fieldValue = doc[subAreaKey][field]
    else:
        if(pvKey):
            fieldValue = doc["pvs"][pvKey][field]
        else:
            fieldValue = doc[field]
    return fieldValue


def dbSetField(field, value, areaKey, pvKey=None, subAreaKey=None):
    if (subAreaKey):
        if(pvKey):
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
                    subAreaKey + '.'+field:
                    value
                }})
    else:
        if(pvKey):
            alarmDB.pvs.update_many(
                {'area': areaKey},
                {'$set': {
                    'pvs.' + pvKey + '.'+field: value
                }})
        else:
            alarmDB.pvs.update_many(
                {'area': areaKey},
                {'$set': {
                    field: value
                }})


def dbGetFieldGlobal(field):
    doc = alarmDB.glob.find_one({})
    return doc[field]


def dbSetFieldGlobal(field, value):
    alarmDB.glob.update_one({}, {
        '$set': {field: value}
    })


def dbFindOne(collection, documentKey=None):
    if(documentKey):
        doc = alarmDB[collection].find_one(
            documentKey)
    else:
        doc = alarmDB[collection].find_one()
    return doc


def dbUpdateHistory(areaKey, entry, pvname=None):
    id = areaKey
    if(pvname):
        id = id+"*"+pvname
    alarmDB.history.insert_one({
        'singleEntry': True,
        'id': id,
        'timestamp': entry["timestamp"],
        'entry': entry["entry"]
    })


def main():
    initDatabase()


main()
