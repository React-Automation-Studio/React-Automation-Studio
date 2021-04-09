import os
import pymongo
from pymongo import MongoClient
from time import sleep
def OpenMongoDbClient(hostDatabaseName,databaseName):
    print("OpenMongoDbClient: hostDatabaseName",hostDatabaseName," :databaseName :",databaseName)
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

    

    MONGO_INITDB_ADMIN_DATABASE='rasAdminDb'
    DATABASE=os.getenv(str(hostDatabaseName))
    if (DATABASE is None):
        raise Exception("Environment variable: ",hostDatabaseName," not defined.")
    rsName=str(hostDatabaseName)+'_REPLICA_SET_NAME'
    print(rsName)
    DATABASE_REPLICA_SET_NAME=str(os.getenv(rsName))
    if (DATABASE_REPLICA_SET_NAME is None):
        raise Exception("Environment variable: ",rsName," not defined.")
    print("here")
    try:
        if (mongoAuth):
            client = MongoClient('mongodb://%s:%s@%s' %(MONGO_ROOT_USERNAME, MONGO_ROOT_PASSWORD, DATABASE), replicaSet=DATABASE_REPLICA_SET_NAME)
            # Wait for MongoClient to discover the whole replica set and identify MASTER!
            sleep(0.1)
        else:
            client = MongoClient('mongodb://%s' % (DATABASE),replicaSet=DATABASE_REPLICA_SET_NAME)
            # Wait for MongoClient to discover the whole replica set and identify MASTER!
            sleep(0.1)
        dbnames = client.list_database_names()
        if (databaseName not in dbnames):
            raise Exception("Error can't connect to admin db",databaseName)
        print("connected to: "+databaseName)
        return client
    except:
        raise Exception("Error can't connect to admin db",databaseName)
        