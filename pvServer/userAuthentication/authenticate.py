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
#                print('user-id: '+userId +' email: '+email+' PW:'+pwd)
        return line
    except:
        return randomString(16)
#SECRET_KEY = loadFileSecretKey('userAuthentication/SECRET_KEY')
SECRET_PWD_KEY = loadFileSecretKey('userAuthentication/users/SECRET_PWD_KEY')
#print('SECRET_KEY: ',SECRET_KEY)
#print('SECRET_PWD_KEY: ',SECRET_PWD_KEY)


def createJTWUserIDs(UAGS):
    try:
        users=UAGS['users']
        #print(users)
        timestamp=UAGS['timestamp']
        knownUsers={}
        for userid in users:

                JWTid=str(jwt.encode({'id':str(userid)+str(timestamp)}, SECRET_PWD_KEY, algorithm='HS256').decode('utf-8'))
                #print(str(userid) +" :" +str(JWTid))
                knownUsers[JWTid]={'username':userid['username'],'password':userid['password']}
#                print('user-id: '+userId +' email: '+email+' PW:'+pwd)
        #print("createJTWUserIDs users: " +str(knownUsers))
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
    #UAGS=loadUsersAndGroups()
    UAGS={}
    UAGS['users']=users['users']
    UAGS['userGroups']=access['userGroups']
    UAGS['timestamp']=str(users['timestamp'])+str(access['timestamp'])
    knownUsers=createJTWUserIDs(UAGS)
    #knownUsers=loadFileUsers()
    #print(knownUsers)
    #print(UAGS)


def checkPermissions(pvname,username):
    #print("Checking permissions")
    global UAGS
    d={'read':False,'write':False}
    for uag in list(UAGS['userGroups'].keys()):
        for usernames in UAGS['userGroups'][uag]['usernames']:
            #print(usernames)
            if ((username==usernames)or (usernames=="*")) :

                for rules in UAGS['userGroups'][uag]['rules']:
                    match=re.search(str(rules['rule']),str(pvname))
                    if (match):
                        #print(str(pvname)+" :"+str(rules['rule'])+" : "+ str(True))
                        d= {'read':rules['read'],'write':rules['write']}
    return d
            #print(str(pvname)+" :"+str(rules['rule'])+" : "+ str(False))


#print(knownUsers)

def AutheriseUserAndPermissions(JWT,pvname):
    global knownUsers
    #JWT=message['clientAuthorisation']
#    print(' AuthoriseUser: ',JWT)
    try:

        #print(decoded_jwt)
        if JWT in knownUsers:
            username=knownUsers[JWT]['username']
#            print("match")
            permissions=checkPermissions(pvname,username)
            #print(pvname+" :"+ str(permissions))
            d={'userAuthorised':True,'permissions':permissions}
            return d
        else:
#            print("no match")
            return {'userAuthorised':False}
    except:
        return {'userAuthorised':False}
    #print(user)


def  AuthoriseUser(JWT):
    global knownUsers
#    print(' AuthoriseUser: ',JWT)
    try:
        #print(decoded_jwt)
        if JWT in knownUsers:
#            print("match")
            return True
        else:
#            print("no match")
            return False
    except:
        return False
    #print(user)


def AuthenticateUser(user):
    global knownUsers
    if knownUsers!= None:
        JWTUsernameAndPw=str(jwt.encode({'username':str(user['email']),'password':str(user['password'])}, SECRET_PWD_KEY, algorithm='HS256').decode('utf-8'))
        #print("JWTUsernameAndPw: "+str(JWTUsernameAndPw))
        keys=list(knownUsers.keys())
        #print("keys", keys)
        for JWT in knownUsers:
            #print("JWT", JWT)
            if user['email']==knownUsers[JWT]['username']:
                if bcrypt.checkpw( user['password'].encode('utf-8'), knownUsers[JWT]['password'].encode('utf-8')):
                    return JWT

        else:
            print('Uknown user:' + str(user['email']))
            return None
    return None
    #print(user)
