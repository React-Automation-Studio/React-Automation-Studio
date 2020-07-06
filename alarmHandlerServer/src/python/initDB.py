from pymongo import MongoClient
import urllib.parse
import os
import json
from time import sleep

ALARM_DATABASE = os.environ['ALARM_DATABASE']
ALARM_DATABASE_REPLICA_SET_NAME = os.environ['ALARM_DATABASE_REPLICA_SET_NAME']

try:
    MONGO_INITDB_ROOT_USERNAME = os.environ['MONGO_INITDB_ROOT_USERNAME']
    MONGO_INITDB_ROOT_PASSWORD = os.environ['MONGO_INITDB_ROOT_PASSWORD']
    MONGO_INITDB_ROOT_USERNAME = urllib.parse.quote_plus(
        MONGO_INITDB_ROOT_USERNAME)
    MONGO_INITDB_ROOT_PASSWORD = urllib.parse.quote_plus(
        MONGO_INITDB_ROOT_PASSWORD)
    mongoAuth = True
except:
    mongoAuth = False

MONGO_INITDB_ALARM_DATABASE = os.environ['MONGO_INITDB_ALARM_DATABASE']

try:
    DEMO_ALARMS_IOC = os.environ['DEMO_ALARMS_IOC']
    runDemoIOC = True
except:
    runDemoIOC = False

if (runDemoIOC):
    fin = open("./initDBData/pvs.json", "rt")
    data = fin.read()
    data = data.replace('$(DEMO_ALARMS_IOC)', DEMO_ALARMS_IOC)
    fin.close()
    fin = open("./initDBData/pvs.json", "wt")
    fin.write(data)
    fin.close()

    fin = open("./initDBData/history.json", "rt")
    data = fin.read()
    data = data.replace('$(DEMO_ALARMS_IOC)', DEMO_ALARMS_IOC)
    fin.close()
    fin = open("./initDBData/history.json", "wt")
    fin.write(data)
    fin.close()

if (mongoAuth):
    client = MongoClient(
        'mongodb://%s:%s@%s' %
        (MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, ALARM_DATABASE), replicaSet=ALARM_DATABASE_REPLICA_SET_NAME)
    # Wait for MongoClient to discover the whole replica set and identify MASTER!
    sleep(0.1)
else:
    client = MongoClient('mongodb://%s' % (ALARM_DATABASE),
                         replicaSet=ALARM_DATABASE_REPLICA_SET_NAME)
    # Wait for MongoClient to discover the whole replica set and identify MASTER!
    sleep(0.1)

dbnames = client.list_database_names()

if (MONGO_INITDB_ALARM_DATABASE not in dbnames):
    db = client[MONGO_INITDB_ALARM_DATABASE]
    print("Instantiating database:", MONGO_INITDB_ALARM_DATABASE)
    colnames = ['config', 'history', 'pvs', 'users']
    for col in colnames:
        collection = db[col]
        with open('./initDBData/' + col + '.json') as f:
            jsonData = json.load(f)
        collection.insert_many(jsonData)
    collection = db['glob']
    collection.insert_many(
        [{
            "enableAllAreas": True
        }]
    )
    print(MONGO_INITDB_ALARM_DATABASE, "database instantiated successfully.")

    client.close()
else:
    print(MONGO_INITDB_ALARM_DATABASE,
          "databse already exists... skipping this step.")
