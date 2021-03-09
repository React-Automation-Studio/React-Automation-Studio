import jwt
import json
import re
import random
import string
import os
import bcrypt
from google.oauth2 import id_token
from google.auth.transport import requests
from datetime import datetime ,timedelta
import threading
from time import sleep
from pymongo import MongoClient
from bson.json_util import dumps
global dbKnownUsers

def knownUsersDbWatchThread():
    while (True):
        print("knownUsersDbWatchThread")
        sleep(1)

print("hello")  
threading.Thread(target=knownUsersDbWatchThread).start()

def loadKnownDbUsers():
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
            print("Error cant connect to admin db",MONGO_INITDB_ADMIN_DATABASE)
        else:
            print("connected to adminDb",MONGO_INITDB_ADMIN_DATABASE)

            mydb = client[MONGO_INITDB_ADMIN_DATABASE]
            mycol=mydb['users']
            doc=mycol.find({},{"_id":0})
           
            print(list(doc))
            mycol=mydb['pvAccess']
            doc=mycol.find_one()
            print(doc['userGroups'])
            #     for key in items.keys():
            #         if key='userGroups':
            #             userGroups= item[key]
            #         else:

            #     print(x.key)
            # userGroups=doc['userGroups']
            # users=doc['users']
            # d=users
            # for i in d:
            #     print(i, d[i])
                # print(data[0]['users'])
               
            

def randomString(stringLength=10):
    """Generate a random string of fixed length """
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength))

def loadFileSecretKey(filename):
    try:
        with open(filename, 'r') as f:
            line=f.readline()
        return line
    except:
        print("Warning SECRET_PWD_KEY not set using the default key, please set the SECRET_PWD_KEY in the file users/SECRET_PWD_KEY")
        return "ugZnU^E3Fr4gapj^?zH%V5&H}A]*{mC]#>/nY_?ceSt$?99PL[md+29]:$dn)3#X" # can no longer user randomized string due to load balancing
        #return randomString(16)

SECRET_PWD_KEY = loadFileSecretKey('userAuthentication/users/SECRET_PWD_KEY')


def createKnownUsers(UAGS):
    global SECRET_PWD_KEY
    try:
        users=UAGS['users']
        timestamp=UAGS['timestamp']
        knownUsers={}
        index=0
        for userid in users:
            knownUsers["user "+str(index)]={'username':userid['username'],'password':userid['password']}
            index=index+1
        return knownUsers
    except Exception as e:
        print(e)
        print("Error Cant load file USERS")
        return None


def createRefreshToken(username,max_age):
    global SECRET_PWD_KEY
    now=datetime.utcnow()
    advanced=timedelta(seconds=max_age)
    exp=now+advanced
    refreshToken=str(jwt.encode({'username':username,'exp':exp}, SECRET_PWD_KEY, algorithm='HS256').decode('utf-8'))
    return refreshToken
def createAccessToken(username,max_age,roles):
    global SECRET_PWD_KEY
    now=datetime.utcnow()
    advanced=timedelta(seconds=max_age)
    exp=now+advanced
    accessToken=str(jwt.encode({'username':username,'exp':exp,'roles':str(roles)}, SECRET_PWD_KEY, algorithm='HS256').decode('utf-8'))
    return accessToken

def loadPvAccess():
    try:
        path='userAuthentication/users/pvAccess.json'
        timestamp=os.path.getmtime(path)
        with open(path) as json_file:
            data = json.load(json_file)
            data['timestamp']=str(timestamp)
            return data
    except:
        print("Error Cant load file pvAccess.json")
        return None

def loadUsers():
    try:
        path='userAuthentication/users/users.json'
        timestamp=os.path.getmtime(path)
        with open(path) as json_file:
            data = json.load(json_file)
            data['timestamp']=str(timestamp)
            return data
    except:
        print("Error Cant load file users.json")
        return None

REACT_APP_DisableLogin=not(os.getenv('REACT_APP_EnableLogin')=='true')
if (not REACT_APP_DisableLogin) :
    users=loadUsers()
    access=loadPvAccess()
    UAGS={}
    UAGS['users']=users['users']
    UAGS['userGroups']=access['userGroups']
    UAGS['timestamp']=str(users['timestamp'])+str(access['timestamp'])
    knownUsers=createKnownUsers(UAGS)
    loadKnownDbUsers()

    

def checkPermissions(pvname,username):
    global UAGS
    d={'read':False,'write':False,'roles':[]}
    for uag in list(UAGS['userGroups'].keys()):
        for usernames in UAGS['userGroups'][uag]['usernames']:
            if ((username==usernames)or (usernames=="*")) :
                for rules in UAGS['userGroups'][uag]['rules']:
                    match=re.search(str(rules['rule']),str(pvname))
                    if (match):
                        d['read']=rules['read']
                        d['write']=rules['write']
                if 'roles' in UAGS['userGroups'][uag]:
                    for roles in UAGS['userGroups'][uag]['roles']:
                        d['roles'].append(roles)
    return d

def checkUserRole(username):
    global UAGS
    roles=[]
    for uag in list(UAGS['userGroups'].keys()):
        for usernames in UAGS['userGroups'][uag]['usernames']:
            if ((username==usernames)or (usernames=="*")) :
                if 'roles' in UAGS['userGroups'][uag]:
                    for role in UAGS['userGroups'][uag]['roles']:
                        roles.append(role)
    return roles

def checkUser(username):
    global UAGS
    
    for user in UAGS['users']:
     #   print(user)
        if username==user['username'] :
      #      print("found")
            return True

                
    return False

def AutheriseUserAndPermissions(encodedJWT,pvname):
    global SECRET_PWD_KEY, UAGS
    try:
        decoded=jwt.decode(encodedJWT,SECRET_PWD_KEY)
        username=decoded['username']
        permissions=checkPermissions(pvname,username)
        d={'userAuthorised':True,'permissions':permissions}
        return d
        
    except Exception as e:
        #print("AutheriseUserAndPermissions",e)
        #print("encodedJWT",encodedJWT)
        return {'userAuthorised':False}

def  AuthoriseUser(encodedJWT):
    global SECRET_PWD_KEY, UAGS
    try:
        decoded=jwt.decode(encodedJWT,SECRET_PWD_KEY)
        username=decoded['username']
        if checkUser(username):
            roles=checkUserRole(username)
            return {'authorised':True,'username':username,'roles':roles}
        else:
            return {'authorised':False}
    except Exception as e:
        print("AuthoriseUser",e)
        return {'authorised':False}

def LocalAuthenticateUser(user):
    global knownUsers
    if knownUsers!= None:
     
        for id in knownUsers:
            username=knownUsers[id]['username']
            if user['username']==username:
                try :
                    if bcrypt.checkpw( user['password'].encode('utf-8'), knownUsers[id]['password'].encode('utf-8')):
                        roles=checkUserRole(username)
                        return {'username':username,'roles':roles}
                except :
                    return None
        else:
            print('Uknown user:' + str(user['username']))
            return None
    return None
def ExternalAuthenticateUser(user):
    global knownUsers
    if knownUsers!= None:
        # keys=list(knownUsers.keys())
        for id in knownUsers:
            username=knownUsers[id]['username']
            
            if user['username']==username:
                roles=checkUserRole(username)
                return {'username':username,'roles':roles}
            
        else:
            print('Uknown user:' + str(user['username']))
            return None
    return None

def decodeTokenGoogle(token,CLIENT_ID):
    try:
        # Specify the CLIENT_ID of the app that accesses the backend:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

        # Or, if multiple clients access the backend server:
        # idinfo = id_token.verify_oauth2_token(token, requests.Request())
        # if idinfo['aud'] not in [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]:
        #     raise ValueError('Could not verify audience.')

        # If auth request is from a G Suite domain:
        # if idinfo['hd'] != GSUITE_DOMAIN_NAME:
        #     raise ValueError('Wrong hosted domain.')

        # ID token is valid. Get the user's Google Account ID from the decoded token.
       
        return idinfo
    except ValueError:
        # Invalid token
        return None