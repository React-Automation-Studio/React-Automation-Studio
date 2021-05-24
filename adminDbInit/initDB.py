from pymongo import MongoClient
import urllib.parse
import os
import json
from time import sleep
import bcrypt
from datetime import datetime
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
    ADMIN_PW_SALT_ROUNDS = int(
        os.environ['ADMIN_PW_SALT_ROUNDS'])
except:
    ADMIN_PW_SALT_ROUNDS =12

MONGO_INITDB_ADMIN_DATABASE='rasAdminDb'
ADMIN_DATABASE=os.getenv('ADMIN_DATABASE')
ADMIN_DATABASE_REPLICA_SET_NAME=str(os.getenv('ADMIN_DATABASE_REPLICA_SET_NAME'))
if (ADMIN_DATABASE is None) :
    print("Enviroment variable ADMIN_DATABASE is not defined, can't intialize: ",MONGO_INITDB_ADMIN_DATABASE)
else:
    if (mongoAuth):
        client = MongoClient('mongodb://%s:%s@%s' %(MONGO_ROOT_USERNAME, MONGO_ROOT_PASSWORD, ADMIN_DATABASE), replicaSet=ADMIN_DATABASE_REPLICA_SET_NAME)
        # Wait for MongoClient to discover the whole replica set and identify MASTER!
        sleep(0.1)
    else:
        client = MongoClient('mongodb://%s' % (ADMIN_DATABASE),replicaSet=ADMIN_DATABASE_REPLICA_SET_NAME)
        # Wait for MongoClient to discover the whole replica set and identify MASTER!
        sleep(0.1)
    dbnames = client.list_database_names()
    if (MONGO_INITDB_ADMIN_DATABASE not in dbnames):
        db = client[MONGO_INITDB_ADMIN_DATABASE]
        print("Instantiating database:", MONGO_INITDB_ADMIN_DATABASE)
        col = 'pvAccess'
        collection = db[col]
        with open('./config/' + col + '.json') as f:
            jsonData = json.load(f)
        collection.insert_one(jsonData)
        col = 'users'
        collection = db[col]
        with open('./config/' + col + '.json') as f:
            userdata = json.load(f)
        users=userdata['users']
        print("users",users)
        for user in users:
            user['enabled']=True
            now = datetime.now()
            timestamp = datetime.timestamp(now)
            user['pwTimestamp']=timestamp
            if user['password']:
                user['password']=(bcrypt.hashpw(user['password'].encode('utf-8'), bcrypt.gensalt(ADMIN_PW_SALT_ROUNDS))).decode('utf-8')
            collection.insert_one(user)

