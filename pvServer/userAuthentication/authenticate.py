import jwt
import json
import re
import random
import string
import os
import bcrypt

import log

def randomString(stringLength=10):
    """Generate a random string of fixed length """
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength))


def mask_left(s, unmasked_len=3, min_masked=4):
    if s is None:
        return None
    s_len = len(s)
    if s_len < min_masked:
        return '*' * min_masked
    unmasked_len = min(unmasked_len, s_len - min_masked)
    return s[:unmasked_len] + '*' * (s_len - unmasked_len)


def mask_right(s, unmasked_len=3, min_masked=4):
    if s is None:
        return None
    s_len = len(s)
    if s_len < min_masked:
        return '*' * min_masked
    unmasked_len = min(unmasked_len, s_len - min_masked)
    return '*' * (s_len - unmasked_len) + s[-unmasked_len:]


def mask_email(email):
    if email is None:
        return None
    name_domain = email.split('@')
    name_domain[0] = mask_left(name_domain[0])
    if len(name_domain) < 2:
        return name_domain[0]
    domain_components = name_domain[1].split('.')
    domain_components_last = domain_components[-1]
    domain_components[:] = ['*' * len(c) for c in domain_components]
    domain_components[-1] = mask_right(domain_components_last)
    name_domain[1] = '.'.join(domain_components)
    return '@'.join(name_domain[:2])


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
        log.exception('Exception while creating JWT lookup table. No user will be allowed.')
        return {}


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
    d={'read':False,'write':False,'roles':[]}
    for uag in list(UAGS['userGroups'].keys()):
        for usernames in UAGS['userGroups'][uag]['usernames']:
            #print(usernames)
            if ((username==usernames)or (usernames=="*")) :

                for rules in UAGS['userGroups'][uag]['rules']:
                    match=re.search(str(rules['rule']),str(pvname))
                    if (match):
                        #print(str(pvname)+" :"+str(rules['rule'])+" : "+ str(True))
                        d['read']=rules['read']
                        d['write']=rules['write']
                if 'roles' in UAGS['userGroups'][uag]:
                    for roles in UAGS['userGroups'][uag]['roles']:
                        d['roles'].append(roles)
                        #print("username: "+str(username) + ' role: '+ roles)
    return d
            #print(str(pvname)+" :"+str(rules['rule'])+" : "+ str(False))

def checkUserRole(username):
    #print("Checking permissions")
    global UAGS
    roles=[]
    for uag in list(UAGS['userGroups'].keys()):
        for usernames in UAGS['userGroups'][uag]['usernames']:
            #print(usernames)
            if ((username==usernames)or (usernames=="*")) :
                if 'roles' in UAGS['userGroups'][uag]:
                    for role in UAGS['userGroups'][uag]['roles']:
                        roles.append(role)
                        #print("username: "+str(username) + ' role: '+ role)
    return roles



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
            username=knownUsers[JWT]['username']
            roles=checkUserRole(username)

#            print("match")
            return {'authorised':True,'username':username,'roles':roles}
        else:
#            print("no match")
            return {'authorised':False}
    except:
        return {'authorised':False}
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
            username=knownUsers[JWT]['username']
            if user['email']==username:
                if bcrypt.checkpw( user['password'].encode('utf-8'), knownUsers[JWT]['password'].encode('utf-8')):
                    roles=checkUserRole(username)
                    return {'JWT':JWT,'username':username,'roles':roles}

        else:
            log.warning('Unknown user or invalid password: "{}"', mask_email(user.get('email', None)))
            return None
    return None
    #print(user)
