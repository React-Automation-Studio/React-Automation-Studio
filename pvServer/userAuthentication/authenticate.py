import jwt
import json
import re
import random
import string
import os


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
SECRET_KEY = loadFileSecretKey('userAuthentication/SECRET_KEY')
SECRET_PWD_KEY = loadFileSecretKey('userAuthentication/SECRET_PWD_KEY')
#print('SECRET_KEY: ',SECRET_KEY)
#print('SECRET_PWD_KEY: ',SECRET_PWD_KEY)

def loadFileUsers():
    try:
        users={}
        with open('userAuthentication/USERS', 'r') as f:
            for line in f:
                userId,email, pwd = line.strip().split(':')
                JWT=str(jwt.encode({'email':email,'password':pwd}, SECRET_PWD_KEY, algorithm='HS256').decode('utf-8'))
                users[JWT]={'email':email,'user-id':userId,'password':pwd}
#                print('user-id: '+userId +' email: '+email+' PW:'+pwd)
        return users
    except:
        print("Error Cant load file USERS")
        return None

def loadPvAccessList():
    try:
        print("loadPvAccessList")
        with open('userAuthentication/pvList.json') as json_file:
            data = json.load(json_file)
            return data
    except:
        print("Error Cant load file pvAccessList")
        return None


REACT_APP_DisableLogin=not(os.getenv('REACT_APP_EnableLogin')=='true')
if (not REACT_APP_DisableLogin) :
    knownUsers=loadFileUsers()
    UAGS=loadPvAccessList()


def checkPermissions(pvname):
    #print("Checking permissions")
    global UAGS
    for rules in UAGS['UAG1']:
        match=re.search(str(rules['rule']),str(pvname))
        if (match):
            #print(str(pvname)+" :"+str(rules['rule'])+" : "+ str(True))
            return {'read':rules['read'],'write':rules['write']}
    return {'read':False,'write':False}
            #print(str(pvname)+" :"+str(rules['rule'])+" : "+ str(False))


#print(knownUsers)

def authenticateUserAndPermissions(message):
    global knownUsers
    JWT=message['authentication']
#    print('authenticateUser: ',JWT)
    try:
        decoded_jwt=jwt.decode(str(JWT), SECRET_KEY, algorithms=['HS256'])
        #print(decoded_jwt)
        if decoded_jwt['user-id'] in knownUsers:
#            print("match")
            permissions=checkPermissions(message['data'])
            #print(message['data']+" :"+ str(permissions)
            d={'authenticated':True,'permissions':permissions}
            return d
        else:
#            print("no match")
            return {'authenticated':False}
    except:
        return {'authenticated':False}
    #print(user)


def authenticateUser(JWT):
    global knownUsers
#    print('authenticateUser: ',JWT)
    try:
        decoded_jwt=jwt.decode(str(JWT), SECRET_KEY, algorithms=['HS256'])
        #print(decoded_jwt)
        if decoded_jwt['user-id'] in knownUsers:
#            print("match")
            return True
        else:
#            print("no match")
            return False
    except:
        return False
    #print(user)
def generateJWT(userId):
    JWT=jwt.encode({'user-id':userId}, SECRET_KEY, algorithm='HS256').decode('utf-8')
#    print('generateJWT: ',JWT)
    return JWT


def authoriseUser(user):
    global knownUsers
    if knownUsers!= None:
        JWT=str(jwt.encode({'email':str(user['email']),'password':str(user['password'])}, SECRET_PWD_KEY, algorithm='HS256').decode('utf-8'))


        if JWT in knownUsers:
            if str(user['password'])==knownUsers[JWT]['password']:
                return generateJWT(JWT)
            else:
                return None
        else:
            print('Uknown user:' + str(user['email']))
            return None
    return None
    #print(user)
