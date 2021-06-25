import os
import pymongo
from pymongo import MongoClient
from time import sleep
import urllib
def OpenMongoDbClient(hostDatabaseName,databaseName):
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
    DATABASE=os.getenv(str(hostDatabaseName))
    if (DATABASE is None):
        raise Exception("Environment variable: ",hostDatabaseName," not defined.")
    rsName=str(hostDatabaseName)+'_REPLICA_SET_NAME'
    DATABASE_REPLICA_SET_NAME=str(os.getenv(rsName))
    if (DATABASE_REPLICA_SET_NAME is None):
        raise Exception("Environment variable: ",rsName," not defined.")
    try:
        if (mongoAuth):
            client = MongoClient('mongodb://%s:%s@%s' %(MONGO_ROOT_USERNAME, MONGO_ROOT_PASSWORD, DATABASE), replicaSet=DATABASE_REPLICA_SET_NAME)
            # Wait for MongoClient to discover the whole replica set and identify MASTER!
            sleep(0.1)
        else:
            client = MongoClient('mongodb://%s' % (DATABASE),replicaSet=DATABASE_REPLICA_SET_NAME)
            # Wait for MongoClient to discover the whole replica set and identify MASTER!
            sleep(0.1)
        if   (databaseName is None): #do not check for valid database
            return client
        else:
            dbnames = client.list_database_names()
            if (databaseName not in dbnames):
                raise Exception("Error can't connect to admin db",databaseName)
            return client
    except:
        raise Exception("Error can't connect to admin db",databaseName)
        