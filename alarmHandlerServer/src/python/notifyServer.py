from pymongo import MongoClient
import os
import numpy as np
import js_regex
from time import sleep
import subprocess
import _thread
from epics import PV
from datetime import datetime
from pytz import utc, timezone

from dbMongo import dbFindOne, dbGetCollection, dbUpdateHistory

from notificationMethods.notifyEmail import notifyEmail
from notificationMethods.notifySMS import notifySMS
from notificationMethods.notifyWhatsApp import notifyWhatsApp

try:
    AH_DEBUG = bool(os.environ['AH_DEBUG'])
except:
    AH_DEBUG = False

try:
    timezone(os.environ['AH_TZ'])
    print('Local timezone for alarm handler set to', os.environ['AH_TZ'])
except:
    print('[Warning]', 'Local timezone for alarm handler not set!')


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


def time_is_between(now, fromTime, toTime):
    if toTime < fromTime:
        # over midnight e.g., 23:30-04:15
        return now >= fromTime or now <= toTime
    return fromTime <= now <= toTime


def date_is_between(now, fromDate, toDate):
    return fromDate <= now <= toDate


def notifyValid(notifySetup):
    now = datetime.now(utc)
    if(notifySetup["notify"]):
        if(AH_DEBUG):
            print("Must notify")
        if(notifySetup["allDay"]):
            if(AH_DEBUG):
                print("All day")
        else:
            if(AH_DEBUG):
                print("Time restricted")
            formatTime = "%H:%M"
            fromTime = datetime.fromisoformat(
                notifySetup["fromTime"]).astimezone(utc).strftime(formatTime)
            toTime = datetime.fromisoformat(
                notifySetup["toTime"]).astimezone(utc).strftime(formatTime)
            nowTime = now.strftime(formatTime)
            if(AH_DEBUG):
                print('fromTime UTC', fromTime)
                print('toTime UTC', toTime)
                print('nowTime UTC', nowTime)
            if(time_is_between(nowTime, fromTime, toTime)):
                if(AH_DEBUG):
                    print("Current time between fromTime and toTime")
            else:
                if(AH_DEBUG):
                    print("Current time NOT between fromTime and toTime")
                    print("!!Don't notify!!")
                return False
        if(notifySetup["weekly"]):
            formatTime = "%A"
            dayToday = now.strftime(formatTime)
            if(AH_DEBUG):
                print("Notify weekly")
            daysToNotify = []
            for key, value in notifySetup["days"].items():
                if(value):
                    daysToNotify.append(key)
            if(AH_DEBUG):
                print("Notify on", " ".join(daysToNotify))
                print("Today is", dayToday)
            if(dayToday in daysToNotify):
                if(AH_DEBUG):
                    print("Notify today")
            else:
                if(AH_DEBUG):
                    print("Don't notify today")
                    print("!!Don't notify!!")
                return False
        else:
            formatTime = "%d %B %Y"
            fromDate = datetime.fromisoformat(
                notifySetup["fromDate"]).astimezone(utc)
            toDate = datetime.fromisoformat(
                notifySetup["toDate"]).astimezone(utc)
            if(AH_DEBUG):
                print("Notify date range")
                print('fromDate', fromDate.strftime(formatTime))
                print('toDate', toDate.strftime(formatTime))
                print("Today", now.strftime(formatTime))
            if(date_is_between(now, fromDate, toDate)):
                if(AH_DEBUG):
                    print("Notify today")
            else:
                if(AH_DEBUG):
                    print("Don't notify today")
                    print("!!Don't notify!!")
                return False

        return True
    else:
        if(AH_DEBUG):
            print("!!Don't notify!!")
        return False


def notify(notifyBuffer):
    for user in dbGetCollection("users").find():
        notifyEmailDict = {}
        notifySMSDict = {}
        notifyWhatsAppDict = {}
        name = user["name"]
        email = user["email"]
        mobile = user["mobile"]
        for notifyPV in user["notifyPVs"]:
            for area in notifyBuffer:
                for pvname in notifyBuffer[area]:
                    if(AH_DEBUG):
                        print('##-START NOTIFY DEBUG-##')
                        print(name)
                        print(area)
                        print(pvname)
                    message = notifyBuffer[area][pvname]
                    if(js_regex.compile(notifyPV["regEx"]).search(pvname)):
                        # Passes regEx check
                        if(AH_DEBUG):
                            print("Pass regEx", notifyPV["regEx"])
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
                                if(area not in notifyEmailDict):
                                    notifyEmailDict[area] = {}
                                notifyEmailDict[area][pvname] = message
                            if(notifyOnSMS):
                                # Notify via sms
                                if(AH_DEBUG):
                                    print("Notify via sms")
                                if(area not in notifySMSDict):
                                    notifySMSDict[area] = {}
                                notifySMSDict[area][pvname] = message
                            if(notifyOnWhatsApp):
                                # Notify via whatsapp
                                if(AH_DEBUG):
                                    print("Notify via whatsapp")
                                if(area not in notifyWhatsAppDict):
                                    notifyWhatsAppDict[area] = {}
                                notifyWhatsAppDict[area][pvname] = message
                        else:
                            if(AH_DEBUG):
                                print("Fail notifyValid")
                    else:
                        if(AH_DEBUG):
                            print("Fail regEx", notifyPV["regEx"])
                    if(AH_DEBUG):
                        print('###-END NOTIFY DEBUG-###')
        timestamp = datetime.isoformat(datetime.now(utc))
        if(notifyEmailDict):
            if(notifyEmail(timestamp, email, notifyEmailDict)):
                # Log to global db
                entry = {"timestamp": timestamp, "entry": " ".join(
                    [name, "notified on email"])}
                dbUpdateHistory("_GLOBAL", entry)
            else:
                # Log to global db
                entry = {"timestamp": timestamp, "entry": " ".join(
                    ["FAILED to notify", name, "on email!"])}
                dbUpdateHistory("_GLOBAL", entry)

        if(notifySMSDict):
            if(notifySMS(timestamp, mobile, notifySMSDict)):
                # Log to global db
                entry = {"timestamp": timestamp, "entry": " ".join(
                    [name, "notified on SMS"])}
                dbUpdateHistory("_GLOBAL", entry)
            else:
                # Log to global db
                entry = {"timestamp": timestamp, "entry": " ".join(
                    ["FAILED to notify", name, "on SMS!"])}
                dbUpdateHistory("_GLOBAL", entry)

        if(notifyWhatsAppDict):
            if(notifyWhatsApp(timestamp, mobile, notifyWhatsAppDict)):
                # Log to global db
                entry = {"timestamp": timestamp, "entry": " ".join(
                    [name, "notified on WhatsApp"])}
                dbUpdateHistory("_GLOBAL", entry)
            else:
                # Log to global db
                entry = {"timestamp": timestamp, "entry": " ".join(
                    ["FAILED to notify", name, "on WhatsApp!"])}
                dbUpdateHistory("_GLOBAL", entry)


def disconnectAllPVs():
    for pvname in pvNameList:
        pv = alarmDict[pvname]
        pv.clear_auto_monitor()
        pv.clear_callbacks()
        pv.disconnect()


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
