from pymongo import MongoClient
import os
import numpy as np
import js_regex
from time import sleep
import subprocess
import _thread
from epics import PV
from datetime import datetime

from dbMongo import dbFindOne, dbGetCollection, dbUpdateHistory

from notificationMethods.notifyEmail import notifyEmail
from notificationMethods.notifySMS import notifySMS
from notificationMethods.notifyWhatsApp import notifyWhatsApp

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
            userNotifySMSDict = {}
            userNotifyWhatsAppDict = {}
            username = user["username"]
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
                    notifyOnSMS = False
                    notifyOnWhatsApp = False
                    if(user["global"]):
                        if(AH_DEBUG):
                            print("Using global profile")
                        notify = notifyValid(user["globalSetup"])
                        notifyOnEmail = user["globalSetup"]["email"]
                        notifyOnSMS = user["globalSetup"]["sms"]
                        notifyOnWhatsApp = user["globalSetup"]["whatsapp"]
                    else:
                        if(AH_DEBUG):
                            print("Using unique profile")
                        notify = notifyValid(notifyPV["notifySetup"])
                        notifyOnEmail = notifyPV["notifySetup"]["email"]
                        notifyOnSMS = notifyPV["notifySetup"]["sms"]
                        notifyOnWhatsApp = notifyPV["notifySetup"]["whatsapp"]
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
                        if(notifyOnSMS):
                            # Notify via sms
                            if(AH_DEBUG):
                                print("Notify via sms")
                            if mobile not in userNotifySMSDict:
                                userNotifySMSDict[mobile] = {}
                            userNotifySMSDict[mobile][pvname] = message
                        if(notifyOnWhatsApp):
                            # Notify via whatsapp
                            if(AH_DEBUG):
                                print("Notify via whatsapp")
                            if mobile not in userNotifyWhatsAppDict:
                                userNotifyWhatsAppDict[mobile] = {}
                            userNotifyWhatsAppDict[mobile][pvname] = message
            if(userNotifyEmailDict):
                if(notifyEmail(userNotifyEmailDict)):
                    # Log to global db
                    timestamp = datetime.timestamp(datetime.now())
                    entry = {"timestamp": timestamp, "entry": " ".join(
                        [username, "notified on email"])}
                    dbUpdateHistory("_GLOBAL", entry)
                else:
                    # Log to global db
                    timestamp = datetime.timestamp(datetime.now())
                    entry = {"timestamp": timestamp, "entry": " ".join(
                        ["FAILED to notify", username, "on email!"])}
                    dbUpdateHistory("_GLOBAL", entry)

            if(userNotifySMSDict):
                if(notifySMS(userNotifySMSDict)):
                    # Log to global db
                    timestamp = datetime.timestamp(datetime.now())
                    entry = {"timestamp": timestamp, "entry": " ".join(
                        [username, "notified on SMS"])}
                    dbUpdateHistory("_GLOBAL", entry)
                else:
                    # Log to global db
                    timestamp = datetime.timestamp(datetime.now())
                    entry = {"timestamp": timestamp, "entry": " ".join(
                        ["FAILED to notify", username, "on SMS!"])}
                    dbUpdateHistory("_GLOBAL", entry)

            if(userNotifyWhatsAppDict):
                if(notifyWhatsApp(userNotifyWhatsAppDict)):
                    # Log to global db
                    timestamp = datetime.timestamp(datetime.now())
                    entry = {"timestamp": timestamp, "entry": " ".join(
                        [username, "notified on WhatsApp"])}
                    dbUpdateHistory("_GLOBAL", entry)
                else:
                    # Log to global db
                    timestamp = datetime.timestamp(datetime.now())
                    entry = {"timestamp": timestamp, "entry": " ".join(
                        ["FAILED to notify", username, "on WhatsApp!"])}
                    dbUpdateHistory("_GLOBAL", entry)


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
