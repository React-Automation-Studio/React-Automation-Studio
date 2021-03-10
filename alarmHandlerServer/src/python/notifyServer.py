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
from notificationMethods.notifySignal import notifySignal

from log import app_log

try:
    AH_DEBUG = bool(os.environ['AH_DEBUG'])
except:
    AH_DEBUG = False

try:
    timezone(os.environ['AH_TZ'])
    print('Local timezone for alarm handler set to', os.environ['AH_TZ'])
    app_log.info('Local timezone for alarm handler set to ' +
                 os.environ['AH_TZ'])
except:
    print('[Warning]', 'Local timezone for alarm handler not set!')
    app_log.warning('Local timezone for alarm handler not set!')


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
        app_log.warning('alarmIOCPVPrefix not instantiated')


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
        app_log.info("Must notify")
        if(notifySetup["allDay"]):
            app_log.info("All day")
        else:
            app_log.info("Time restricted")
            formatTime = "%H:%M"
            fromTime = datetime.fromisoformat(
                notifySetup["fromTime"]).astimezone(utc).strftime(formatTime)
            toTime = datetime.fromisoformat(
                notifySetup["toTime"]).astimezone(utc).strftime(formatTime)
            nowTime = now.strftime(formatTime)
            app_log.info('fromTime UTC '+str(fromTime))
            app_log.info('toTime UTC '+str(toTime))
            app_log.info('nowTime UTC '+str(nowTime))
            if(time_is_between(nowTime, fromTime, toTime)):
                app_log.info("Current time between fromTime and toTime")
            else:
                app_log.info("Current time NOT between fromTime and toTime")
                app_log.info("!!Don't notify!!")
                return False
        if(notifySetup["weekly"]):
            formatTime = "%A"
            dayToday = now.strftime(formatTime)
            app_log.info("Notify weekly")
            daysToNotify = []
            for key, value in notifySetup["days"].items():
                if(value):
                    daysToNotify.append(key)
            app_log.info("Notify on "+" ".join(daysToNotify))
            app_log.info("Today is " + dayToday)
            if(dayToday in daysToNotify):
                app_log.info("Notify today")
            else:
                app_log.info("Don't notify today")
                app_log.info("!!Don't notify!!")
                return False
        else:
            formatTime = "%d %B %Y"
            fromDate = datetime.fromisoformat(
                notifySetup["fromDate"]).astimezone(utc)
            toDate = datetime.fromisoformat(
                notifySetup["toDate"]).astimezone(utc)
            app_log.info("Notify date range")
            app_log.info('fromDate ' + fromDate.strftime(formatTime))
            app_log.info('toDate ' + toDate.strftime(formatTime))
            app_log.info("Today" + now.strftime(formatTime))
            if(date_is_between(now, fromDate, toDate)):
                app_log.info("Notify today")
            else:
                app_log.info("Don't notify today")
                app_log.info("!!Don't notify!!")
                return False

        return True
    else:
        app_log.info("!!Don't notify!!")
        return False


def notify(notifyBuffer):
    for user in dbGetCollection("users").find():
        notifyEmailDict = {}
        notifySMSDict = {}
        notifyWhatsAppDict = {}
        notifySignalDict = {}
        name = user["name"]
        email = user["email"]
        mobile = user["mobile"]
        for notifyPV in user["notifyPVs"]:
            for area in notifyBuffer:
                for pvname in notifyBuffer[area]:
                    app_log.info('##-START NOTIFY DEBUG-##')
                    app_log.info(name)
                    app_log.info(area)
                    app_log.info(pvname)
                    message = notifyBuffer[area][pvname]
                    minorAlarm = False
                    majorAlarm = False
                    invalidAlarm = False
                    disconnAlarm = False
                    for entry in message:
                        minorAlarm = minorAlarm or (
                            "MINOR_ALARM" in entry["entry"])
                        majorAlarm = majorAlarm or (
                            "MAJOR_ALARM" in entry["entry"])
                        invalidAlarm = invalidAlarm or (
                            "INVALID_ALARM" in entry["entry"])
                        disconnAlarm = disconnAlarm or (
                            "DISCONNECTED" in entry["entry"])
                    app_log.info("minorAlarm " + str(minorAlarm))
                    app_log.info("majorAlarm "+str(majorAlarm))
                    app_log.info("invalidAlarm "+str(invalidAlarm))
                    app_log.info("disconnAlarm "+str(disconnAlarm))
                    if(js_regex.compile(notifyPV["regEx"]).search(pvname)):
                        # Passes regEx check
                        app_log.info("Pass regEx " + notifyPV["regEx"])
                        notify = False
                        notifyAlarmType = False
                        notifyOnEmail = False
                        notifyOnSMS = False
                        notifyOnWhatsApp = False
                        notifyOnSignal = False
                        if(user["global"]):
                            app_log.info("Using global profile")
                            notify = notifyValid(user["globalSetup"])
                            notifyOnEmail = user["globalSetup"]["email"]
                            notifyOnSMS = user["globalSetup"]["sms"]
                            notifyOnWhatsApp = user["globalSetup"]["whatsapp"]
                            # Backwards compatible
                            notifyOnSignal = user["globalSetup"]["signal"] if (
                                "signal" in user["globalSetup"]) else False
                            notifyMinorAlarm = user["globalSetup"]["alarmMinor"] if (
                                "alarmMinor" in user["globalSetup"]) else True
                            notifyMajorAlarm = user["globalSetup"]["alarmMajor"] if (
                                "alarmMajor" in user["globalSetup"]) else True
                            notifyInvalidAlarm = user["globalSetup"]["alarmInvalid"] if (
                                "alarmInvalid" in user["globalSetup"]) else True
                            notifyDisconnAlarm = user["globalSetup"]["alarmDisconn"] if (
                                "alarmDisconn" in user["globalSetup"]) else True
                            #
                        else:
                            app_log.info("Using unique profile")
                            notify = notifyValid(notifyPV["notifySetup"])
                            notifyOnEmail = notifyPV["notifySetup"]["email"]
                            notifyOnSMS = notifyPV["notifySetup"]["sms"]
                            notifyOnWhatsApp = notifyPV["notifySetup"]["whatsapp"]
                            # Backwards compatible
                            notifyOnSignal = notifyPV["notifySetup"]["signal"] if (
                                "signal" in notifyPV["notifySetup"]) else False
                            notifyMinorAlarm = notifyPV["notifySetup"]["alarmMinor"] if (
                                "alarmMinor" in notifyPV["notifySetup"]) else True
                            notifyMajorAlarm = notifyPV["notifySetup"]["alarmMajor"] if (
                                "alarmMajor" in notifyPV["notifySetup"]) else True
                            notifyInvalidAlarm = notifyPV["notifySetup"]["alarmInvalid"] if (
                                "alarmInvalid" in notifyPV["notifySetup"]) else True
                            notifyDisconnAlarm = notifyPV["notifySetup"]["alarmDisconn"] if (
                                "alarmDisconn" in notifyPV["notifySetup"]) else True
                            #
                        app_log.info("notifyMinorAlarm " +
                                     str(notifyMinorAlarm))
                        app_log.info("notifyMajorAlarm " +
                                     str(notifyMajorAlarm))
                        app_log.info("notifyInvalidAlarm " +
                                     str(notifyInvalidAlarm))
                        app_log.info("notifyDisconnAlarm " +
                                     str(notifyDisconnAlarm))
                        if(minorAlarm and notifyMinorAlarm):
                            notifyAlarmType = True
                        elif(majorAlarm and notifyMajorAlarm):
                            notifyAlarmType = True
                        elif(invalidAlarm and notifyInvalidAlarm):
                            notifyAlarmType = True
                        elif(disconnAlarm and notifyDisconnAlarm):
                            notifyAlarmType = True
                        if(notify and notifyAlarmType):
                            # Passes notifyValid check
                            app_log.info(
                                "Pass notifyValid and alarm type checks")
                            if(notifyOnEmail):
                                # Notify via email
                                app_log.info("Notify via email")
                                if(area not in notifyEmailDict):
                                    notifyEmailDict[area] = {}
                                notifyEmailDict[area][pvname] = message
                            if(notifyOnSMS):
                                # Notify via sms
                                app_log.info("Notify via sms")
                                if(area not in notifySMSDict):
                                    notifySMSDict[area] = {}
                                notifySMSDict[area][pvname] = message
                            if(notifyOnWhatsApp):
                                # Notify via whatsapp
                                app_log.info("Notify via whatsapp")
                                if(area not in notifyWhatsAppDict):
                                    notifyWhatsAppDict[area] = {}
                                notifyWhatsAppDict[area][pvname] = message
                            if(notifyOnSignal):
                                # Notify via signal
                                app_log.info("Notify via Signal")
                                if(area not in notifySignalDict):
                                    notifySignalDict[area] = {}
                                notifySignalDict[area][pvname] = message
                        else:
                            app_log.info(
                                "Fail notifyValid or alarm type check")
                    else:
                        app_log.info("Fail regEx " + notifyPV["regEx"])
                    app_log.info('###-END NOTIFY DEBUG-###')
        timestamp = datetime.now(utc).isoformat()
        if(notifyEmailDict):
            if(notifyEmail(timestamp, email, notifyEmailDict)):
                # Log to global db
                timestamp = datetime.now(utc).isoformat()
                entry = {"timestamp": timestamp, "entry": " ".join(
                    [name, "notified on email"])}
                dbUpdateHistory("_GLOBAL", entry)
            else:
                # Log to global db
                timestamp = datetime.now(utc).isoformat()
                entry = {"timestamp": timestamp, "entry": " ".join(
                    ["FAILED to notify", name, "on email!"])}
                dbUpdateHistory("_GLOBAL", entry)

        if(notifySMSDict):
            if(notifySMS(timestamp, mobile, notifySMSDict)):
                # Log to global db
                timestamp = datetime.now(utc).isoformat()
                entry = {"timestamp": timestamp, "entry": " ".join(
                    [name, "notified on SMS"])}
                dbUpdateHistory("_GLOBAL", entry)
            else:
                # Log to global db
                timestamp = datetime.now(utc).isoformat()
                entry = {"timestamp": timestamp, "entry": " ".join(
                    ["FAILED to notify", name, "on SMS!"])}
                dbUpdateHistory("_GLOBAL", entry)

        if(notifyWhatsAppDict):
            if(notifyWhatsApp(timestamp, mobile, notifyWhatsAppDict)):
                # Log to global db
                timestamp = datetime.now(utc).isoformat()
                entry = {"timestamp": timestamp, "entry": " ".join(
                    [name, "notified on WhatsApp"])}
                dbUpdateHistory("_GLOBAL", entry)
            else:
                # Log to global db
                timestamp = datetime.now(utc).isoformat()
                entry = {"timestamp": timestamp, "entry": " ".join(
                    ["FAILED to notify", name, "on WhatsApp!"])}
                dbUpdateHistory("_GLOBAL", entry)

        if(notifySignalDict):
            if(notifySignal(timestamp, mobile, notifySignalDict)):
                # Log to global db
                timestamp = datetime.now(utc).isoformat()
                entry = {"timestamp": timestamp, "entry": " ".join(
                    [name, "notified on Signal"])}
                dbUpdateHistory("_GLOBAL", entry)
            else:
                # Log to global db
                timestamp = datetime.now(utc).isoformat()
                entry = {"timestamp": timestamp, "entry": " ".join(
                    ["FAILED to notify", name, "on Signal!"])}
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
    app_log.info("Notify server restarted...")


def startNotifyServer():
    # initPreSuffix()
    # getListOfPVNames()
    # initAlarmDict()

    # debug prints
    # print(alarmDict)

    print("Notify server running...")
    app_log.info("Notify server running...")
