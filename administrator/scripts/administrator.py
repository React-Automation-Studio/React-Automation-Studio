import json
import re
import random
import string
import os
import sys
import getpass
import bcrypt

#print("Hello World")

#print("This is the name of the script: ", sys.argv[0])
#print("Number of arguments: ", len(sys.argv))
#print("The arguments are: " , str(sys.argv))


def loadUsers():
    try:
        path='/users/users.json'
        with open(path) as json_file:
            data = json.load(json_file)
            return data
    except:
        print("Error Can't load: "+path)
        return None

def saveUsers(data):
    try:
        path='/users/users.json'
        with open(path,'w') as json_file:
            json.dump(data,json_file)

    except:
        print("Error Can't load: "+path)
        return None

if str((sys.argv[1]))=="listUsers":
    users=loadUsers()['users']
    print("Users:")
    print("")
    for user in users:
        print(user['username'])

if str((sys.argv[1]))=="changeUserPw":
    data=loadUsers()
    if data:
        users=data['users']
        username = input("Enter the username:")
        userFound=False
        for user in users:
            if user['username']==username:
                userFound=True
                confirm=""
                password=""
                password = getpass.getpass(prompt="Enter the new password: ", stream=None)

                while(len(password)<6):
                    print("Error password must be at least 6 characters long, Please retry again:")
                    password = getpass.getpass(prompt="Enter the new password: ", stream=None)
                confirm = getpass.getpass(prompt="Confirm the new password: ", stream=None)
                if confirm==password:
                    user['password']=(bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(12))).decode('utf-8')
                else:
                    print("Error: passwords dont match, exiting!")
                    break;
                break;
        if userFound==False:
            print("Error: Unknown user")
        saveUsers(data)
if str((sys.argv[1]))=="checkUserPw":
    data=loadUsers()
    if data:
        users=data['users']
        username = input("Enter the username:")
        userFound=False
        for user in users:
            if user['username']==username:
                userFound=True
                confirm=""
                password=""
                password = getpass.getpass(prompt="Enter password: ", stream=None)
                if bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
                    print("Password is corerct")
                else:
                    print("Password is not correct")

                break;
        if userFound==False:
            print("Error: Unknown user")
        
