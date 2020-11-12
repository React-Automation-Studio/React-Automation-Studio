from pymongo import MongoClient
import os
import numpy as np
import js_regex
from time import sleep
import subprocess
import _thread
from epics import PV
from datetime import datetime

from dbMongo import dbFindOne, dbGetCollection

from notifyEmail import notifyEmail
from notifyMobile import notifyMobile

try:
    AH_DEBUG = bool(os.environ['AH_DEBUG'])
except:
    AH_DEBUG = False

pvNameList = []
alarmDict = {}


def initPreSuffix():
    # Prefix and suffix for alarmIOC pvs
    global alarmIOCPVPrefix
    global alarmIOCPVSuffix
    doc = dbFindOne("config")
    try:
        alarmIOCPVPrefix = doc["alarmIOCPVPrefix"]
        alarmIOCPVSuffix = doc["alarmIOCPVSuffix"]
    except:
        if(AH_DEBUG):
            print('[Warning]', 'alarmIOCPVPrefix not instantiated')


def getListOfPVNames():
    # loop through each document = area
    for area in dbGetCollection("pvs").find():
        for key in area.keys():
            if (key == "pvs"):
                for pvKey in area[key].keys():
                    pvNameList.append(area[key][pvKey]["name"])
            if ("subArea" in key):
                for subAreaKey in area[key].keys():
                    if (subAreaKey == "pvs"):
                        for pvKey in area[key][subAreaKey].keys():
                            pvNameList.append(
                                area[key][subAreaKey][pvKey]["name"])


def initAlarmDict():
    for pvname in pvNameList:
        alarmName = alarmIOCPVPrefix + pvname + alarmIOCPVSuffix
        pv = PV(pvname=alarmName + "A",
                connection_timeout=0.001)
        pv.wait_for_connection(timeout=5)
        alarmDict[pvname] = pv
    # NOTIFY PV
    pv = PV(pvname=alarmIOCPVPrefix + "NOTIFY",
            connection_timeout=0.001)
    pv.wait_for_connection(timeout=5)
    alarmDict["NOTIFY"] = pv


def notifyValid(notifySetup):
    if(notifySetup["notify"]):
        if(AH_DEBUG):
            print("Must notify")
        if(notifySetup["allDay"]):
            if(AH_DEBUG):
                print("All day")
        else:
            if(AH_DEBUG):
                print("Time restricted")

        return True
    else:
        if(AH_DEBUG):
            print("!!Don't notify!!")
        return False


def notify(notifyBuffer):
    for entry in notifyBuffer:
        pvname = entry["pv"]
        message = entry["message"]
        for user in dbGetCollection("users").find():
            userNotifyEmailDict = {}
            userNotifyMobileDict = {}
            email = user["email"]
            mobile = user["mobile"]
            if(AH_DEBUG):
                print(email, pvname)
            for notifyPV in user["notifyPVs"]:
                if(js_regex.compile(notifyPV["regEx"]).search(pvname)):
                    # Passes regEx check
                    if(AH_DEBUG):
                        print("Pass regEx")
                    notify = False
                    notifyOnEmail = False
                    notifyOnMobile = False
                    if(user["global"]):
                        if(AH_DEBUG):
                            print("Using global profile")
                        notify = notifyValid(user["globalSetup"])
                        notifyOnEmail = user["globalSetup"]["email"]
                        notifyOnMobile = user["globalSetup"]["mobile"]
                    else:
                        if(AH_DEBUG):
                            print("Using unique profile")
                        notify = notifyValid(notifyPV["notifySetup"])
                        notifyOnEmail = notifyPV["notifySetup"]["email"]
                        notifyOnMobile = notifyPV["notifySetup"]["mobile"]
                    if(notify):
                        # Passes notifyValid check
                        if(AH_DEBUG):
                            print("Pass notifyValid")
                        if(notifyOnEmail):
                            # Notify via email
                            if(AH_DEBUG):
                                print("Notify via email")
                            if email not in userNotifyEmailDict:
                                userNotifyEmailDict[email] = {}
                            userNotifyEmailDict[email][pvname] = message
                        if(notifyOnMobile):
                            # Notify via mobile
                            if(AH_DEBUG):
                                print("Notify via mobile")
                            if mobile not in userNotifyMobileDict:
                                userNotifyMobileDict[mobile] = {}
                            userNotifyMobileDict[mobile][pvname] = message
            if(userNotifyEmailDict):
                notifyEmail(userNotifyEmailDict)
            if(userNotifyMobileDict):
                notifyMobile(userNotifyMobileDict)


def disconnectAllPVs():
    for pvname in pvNameList:
        alarmDict[pvname].disconnect()


def clearGlobalDicts():
    global pvNameList
    del pvNameList[:]
    global alarmDict
    alarmDict.clear()


def restartNotifyServer():
    # disconnectAllPVs()
    # clearGlobalDicts()
    # getListOfPVNames()
    # initAlarmDict()
    print("Notify server restarted...")


def startNotifyServer():
    # initPreSuffix()
    # getListOfPVNames()
    # initAlarmDict()

    # debug prints
    # print(alarmDict)

    print("Notify server running...")
