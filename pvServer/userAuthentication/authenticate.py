import jwt
import json
import re
import random
import string
import os
import bcrypt

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
        return randomString(16)

SECRET_PWD_KEY = loadFileSecretKey('userAuthentication/users/SECRET_PWD_KEY')

def createJTWUserIDs(UAGS):
    try:
        users=UAGS['users']
        timestamp=UAGS['timestamp']
        knownUsers={}
        for userid in users:
            JWTid=str(jwt.encode({'id':str(userid)+str(timestamp)}, SECRET_PWD_KEY, algorithm='HS256').decode('utf-8'))
            knownUsers[JWTid]={'username':userid['username'],'password':userid['password']}
        return knownUsers
    except:
        print("Error Cant load file USERS")
        return None

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
    knownUsers=createJTWUserIDs(UAGS)

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

def AutheriseUserAndPermissions(JWT,pvname):
    global knownUsers
    try:
        if JWT in knownUsers:
            username=knownUsers[JWT]['username']
            permissions=checkPermissions(pvname,username)
            d={'userAuthorised':True,'permissions':permissions}
            return d
        else:
            return {'userAuthorised':False}
    except:
        return {'userAuthorised':False}

def  AuthoriseUser(JWT):
    global knownUsers
    try:
        if JWT in knownUsers:
            username=knownUsers[JWT]['username']
            roles=checkUserRole(username)
            return {'authorised':True,'username':username,'roles':roles}
        else:
            return {'authorised':False}
    except:
        return {'authorised':False}

def LocalAuthenticateUser(user):
    global knownUsers
    if knownUsers!= None:
        JWTUsernameAndPw=str(jwt.encode({'username':str(user['username']),'password':str(user['password'])}, SECRET_PWD_KEY, algorithm='HS256').decode('utf-8'))
        keys=list(knownUsers.keys())
        for JWT in knownUsers:
            username=knownUsers[JWT]['username']
            if user['username']==username:
                try :
                    if bcrypt.checkpw( user['password'].encode('utf-8'), knownUsers[JWT]['password'].encode('utf-8')):
                        roles=checkUserRole(username)
                        return {'JWT':JWT,'username':username,'roles':roles}
                except :
                    return None
        else:
            print('Uknown user:' + str(user['username']))
            return None
    return None
