import os
import numpy as np
import re
from time import sleep
import subprocess
import _thread
from epics import PV
from datetime import datetime
from pytz import utc, timezone

from notifyServer import startNotifyServer, restartNotifyServer, notify
from dbMongo import dbGetCollection, dbGetEnables, dbGetListOfPVNames, dbGetField, dbSetField, dbFindOne, dbUpdateHistory

try:
    AH_DEBUG = bool(os.environ['AH_DEBUG'])
except:
    AH_DEBUG = False

try:
    AH_TZ = os.environ['AH_TZ']
    localtz = timezone(AH_TZ)
except:
    localtz = None

ackedStateDict = {
    0: "NO_ALARM",
    1: "MINOR_ACKED",
    2: "MAJOR_ACKED",
    3: "INVALID_ACKED",
    4: "DISCONN_ACKED"
}

alarmPVSevDict = {
    0: "NO_ALARM",
    1: "MINOR_ACKED",
    2: "MINOR_ALARM",
    3: "MAJOR_ACKED",
    4: "MAJOR_ALARM",
    5: "INVALID_ACKED",
    6: "INVALID_ALARM",
    7: "DISCONN_ACKED",
    8: "DISCONNECTED"
}

alarmIOCPVPrefix = ""
alarmIOCPVSuffix = ""
bridgeMessage = ""

notifyTimeout = 0

alarmDictInitialised = False
alarmServerRestart = False
notifyContent = False
watchRestartAlarmServer = False
bridgeEvent = False

pvNameList = []
areaList = []
notifyBuffer = {}

pvDict = {}
pvInitDict = {}
pvDescDict = {}
alarmDict = {}
areaDict = {}
subAreaDict = {}
areaPVDict = {}
frontEndConnDict = {}


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


def printVal(**kw):
    # print(kw)
    pass


def propagateAreaAlarms(**kw):
    _thread.start_new_thread(propAreaAlarms, (
        kw["pvname"],
        kw["value"],
    ))


def propAreaAlarms(pvname, value):
    pvname = re.sub('^' + alarmIOCPVPrefix, '', pvname)
    pvname = re.sub('A$', '', pvname)
    pvname = re.sub(alarmIOCPVSuffix + '$', '', pvname)
    if (bool(areaDict)):
        # wait for areaDict to be instantiated
        areaKey = getKeys(pvname)[0]
        globalEnable, areaEnable, subAreaEnable, pvEnable = getEnables(pvname)

        if (subAreaEnable != None):
            enable = globalEnable and areaEnable and subAreaEnable and pvEnable
        else:
            enable = globalEnable and areaEnable and pvEnable

        if(enable):
            # PV is enabled
            areaPV = areaPVDict[areaKey]
            if(value > areaPV.value):
                # Alarm triggered
                areaPV.value = value
                if ("=" in areaKey):
                    # Evaluate top area
                    evaluateAreaPVs(areaKey.split("=")[0])
            elif(value < areaPV.value):
                # Alarm acknowledged
                evaluateAreaPVs(areaKey)
                if ("=" in areaKey):
                    # Evaluate top area
                    evaluateAreaPVs(areaKey.split("=")[0])


def evaluateAreaPVs(areaKey, fromColWatch=False):
    areaPV = areaPVDict[areaKey]
    # 0 "NO_ALARM"
    # 1 "MINOR_ACKED"
    # 2 "MINOR"
    # 3 "MAJOR_ACKED"
    # 4 "MAJOR"
    # 5 "INVALID_ACKED"
    # 6 "INVALID"
    # 7 "DISCONN_ACKED"
    # 8 "DISCONNECTED"
    alarmState = 0
    # to catch in alarm state to negate a higher level ack state
    # no need to catch disconn alarm as it is highest ranked
    minorAlarm = False
    majorAlarm = False
    invalidAlarm = False
    ackStates = [1, 3, 5, 7]

    try:
        for key in pvDict.keys():
            if (re.sub(r"pv\d+", "", key).startswith(areaKey+"=")):
                val = alarmDict[pvDict[key].pvname]["A"].value
                globalEnable, areaEnable, subAreaEnable, pvEnable = getEnables(
                    pvDict[key].pvname)
                if (subAreaEnable != None):
                    enable = globalEnable and areaEnable and subAreaEnable and pvEnable
                else:
                    enable = globalEnable and areaEnable and pvEnable
                if (not enable):
                    # pv not enabled
                    # force NO_ALARM state so neither alarm nor acked passed
                    # to areas
                    val = 0
                try:
                    if (val > alarmState):
                        alarmState = val
                    if(val == 2):
                        minorAlarm = True
                    elif(val == 4):
                        majorAlarm = True
                    elif(val == 6):
                        invalidAlarm = True
                except:
                    if(AH_DEBUG):
                        print('[Warning]', 'val =', val,
                              'alarmState =', alarmState)
    except:
        if(AH_DEBUG):
            print('[Warning]', 'pvDict changed size during iteration')

    # active alarm always supercedes acked state alarm
    if alarmState in ackStates:
        # invalid alarm takes precedence
        if(invalidAlarm):
            alarmState = 6
        elif(majorAlarm):
            alarmState = 4
        elif(minorAlarm):
            alarmState = 2

    areaPV.value = alarmState

    if (fromColWatch and ("=" in areaKey)):
        # if from col watch also reasses top area
        evaluateAreaPVs(areaKey.split("=")[0])


def getKeys(pvname):
    key_list = list(areaDict.keys())
    val_list = list(areaDict.values())
    areaName = key_list[val_list.index(pvname)]
    areaKey = re.sub(r"=pv\d+", "", areaName)
    pvKey = re.search(r"pv\d+", areaName).group(0)
    return areaKey, pvKey


def getEnables(pvname):
    areaKey, pvKey = getKeys(pvname)

    if ("=" in areaKey):
        subAreaKey = subAreaDict[areaKey]
        areaKey = areaKey.split("=")[0]

        globalEnable, areaEnable, subAreaEnable, pvEnable = dbGetEnables(
            areaKey, pvKey, subAreaKey)
    else:
        globalEnable, areaEnable, subAreaEnable, pvEnable = dbGetEnables(
            areaKey, pvKey)

    return globalEnable, areaEnable, subAreaEnable, pvEnable


def getLatch(pvname):
    areaKey, pvKey = getKeys(pvname)

    if ("=" in areaKey):
        subAreaKey = subAreaDict[areaKey]
        areaKey = areaKey.split("=")[0]

        latch = dbGetField("latch", areaKey, pvKey, subAreaKey)

    else:
        latch = dbGetField("latch", areaKey, pvKey)

    return latch


def getNotify(pvname):
    areaKey, pvKey = getKeys(pvname)

    if ("=" in areaKey):
        subAreaKey = subAreaDict[areaKey]
        areaKey = areaKey.split("=")[0]

        notify = dbGetField("notify", areaKey, pvKey, subAreaKey)

    else:
        notify = dbGetField("notify", areaKey, pvKey)

    return notify


def ackPVChange(**kw):
    timestamp = datetime.now(utc).isoformat()
    # print("ack pv:", value)
    if(kw["value"]):
        if (kw["value"][0] != ''):
            _thread.start_new_thread(ackProcess, (
                kw["value"],
                timestamp,
            ))


def ackProcess(ackArray, timestamp):
    global alarmDict
    # reset ack pv so you can ack same pv/area multiple times
    alarmDict["ACK_PV"].value = []

    if(len(ackArray) > 2):
        ackNormal(ackArray, timestamp)
    else:
        ackGlobal(ackArray[0], timestamp)


def ackNormal(ackArray, timestamp):
    # ackArray
    # 0 identifier 0 = area, 1 = subArea, 2 = area_pv, 3 = subArea_pv
    # 1 area
    # 2 subArea
    # 3 pv
    # 4 logged in username
    # 5 value

    isArea = int(ackArray[0]) == 0
    isSubArea = int(ackArray[0]) == 1
    isAreaPV = int(ackArray[0]) == 2
    isSubAreaPV = int(ackArray[0]) == 3

    ackIdentifier = ""
    username = ackArray[4].capitalize()
    if(username == 'None'):
        username = 'Anonymous'

    if (isSubAreaPV):
        ackIdentifier = ackArray[1]+"="+ackArray[2]+"="+ackArray[3]
        # area=subArea=pv
        ackAlarm(ackIdentifier, timestamp, username)
    elif(isAreaPV):
        # area=pv
        ackIdentifier = ackArray[1]+"="+ackArray[3]
        ackAlarm(ackIdentifier, timestamp, username)
    elif(isSubArea):
        # area=subArea
        ackIdentifier = ackArray[1]+"="+ackArray[2]
    elif(isArea):
        # area
        ackIdentifier = ackArray[1]

    if(isArea or isSubArea):
        # area or area=subArea
        for key in pvDict.keys():
            # key is area | area=subArea | area=subArea=pv
            # areaKey is area | area=subArea
            areaKey = re.sub(r"=pv\d+", "", key)
            if (isArea):      # ackIdentifier is area
                areaKey = areaKey.split("=")[0]  # areaKey is area
            if(areaKey == ackIdentifier):
                ackAlarm(key, timestamp, username)


def ackGlobal(username, timestamp):
    topAreaList = [item for item in areaList if "=" not in item]
    for area in topAreaList:
        ackArray = ['0', area, None, None, username, True]
        ackNormal(ackArray, timestamp)


def ackAlarm(ackIdentifier, timestamp, username):
    global alarmDict
    # problem here if pv disconnected won't get severity
    if ('_1' in alarmDict[pvDict[ackIdentifier].pvname]["D"].value[0]):
        pvsev = pvDict[ackIdentifier].severity
    else:
        pvsev = 4

    pvname = pvDict[ackIdentifier].pvname
    alarmPVSev = alarmDict[pvname]["A"].value

    areaKey, pvKey = getKeys(pvname)

    if (alarmPVSev == 2 or alarmPVSev == 4 or alarmPVSev == 6 or alarmPVSev == 8):
        # in minor, major, invalid or disconn state, valid state for ack
        timestamp_string = timestamp
        # set ack time
        alarmDict[pvname]["K"].value = timestamp_string
        if ("=" in areaKey):
            subAreaKey = subAreaDict[areaKey]
            topArea = areaKey.split("=")[0]
            # write to db
            dbSetField('lastAlarmAckTime', timestamp_string,
                       topArea, pvKey, subAreaKey)
        else:
            # write to db
            dbSetField('lastAlarmAckTime', timestamp_string,
                       areaKey, pvKey)
        # Log to history
        entry = {"timestamp": timestamp, "entry": " ".join(
            [pvname, "-", username, "acknowledged", alarmPVSevDict[alarmPVSev], "to", ackedStateDict[pvsev]])}
        dbUpdateHistory(areaKey, entry, pvname)

    # 0	"NO_ALARM"  # 0 "NO_ALARM"
    # 1	"MINOR"     # 1 "MINOR_ACKED"
    # 2	"MAJOR"     # 2 "MINOR"
    # 3	"INVALID"   # 3 "MAJOR_ACKED"
    # 4 "DISCONN"   # 4 "MAJOR"
    #               # 5 "INVALID_ACKED"
    #               # 6 "INVALID"
    #               # 7 "DISCONN_ACKED"
    #               # 8 "DISCONNECTED"
    # problem here if pv disconnected won't get severity
    # solve with pseudo pvsev = 4 state for disconnected
    if (pvsev == 0):    # in NO_ALARM state
        alarmDict[pvname]["A"].value = 0    # set to NO_ALARM state
    elif (pvsev == 1):  # in MINOR state
        alarmDict[pvname]["A"].value = 1    # set to MINOR_ACKED state
    elif (pvsev == 2):  # in MAJOR state
        alarmDict[pvname]["A"].value = 3    # set to MAJOR_ACKED state
    elif (pvsev == 3):  # in INVALID state
        alarmDict[pvname]["A"].value = 5    # set to INVALID_ACKED state
    elif (pvsev == 4):  # in DISCONN state
        alarmDict[pvname]["A"].value = 7    # set to DISCONN_ACKED state


def pvConnFE(pvname=None, conn=None, **kw):
    frontEndConnDict[pvname] = conn


def waitConnFE():
    allConnected = False
    while(not allConnected):
        sleep(0.1)
        allConnected = True
        for pvConnected in frontEndConnDict.values():
            allConnected &= pvConnected


def pvConn(pvname=None, conn=None, **kw):
    _thread.start_new_thread(pvDisconn, (
        pvname,
        conn,
    ))


def pvDisconn(pvname, conn):
    global notifyBuffer
    global notifyContent
    global alarmDict

    areaKey, pvKey = getKeys(pvname)
    if ("=" in areaKey):
        subAreaKey = subAreaDict[areaKey]
        areaKey = areaKey.split("=")[0]

        lastAlarmTime = dbGetField(
            "lastAlarmTime", areaKey, pvKey, subAreaKey)
    else:
        lastAlarmTime = dbGetField("lastAlarmTime", areaKey, pvKey)

    pv = alarmDict[pvname]["D"]
    if (not conn):
        if(alarmServerRestart):
            timestamp_string = lastAlarmTime
        else:
            timestamp = datetime.now(utc).isoformat()
            timestamp_string = timestamp

        globalEnable, areaEnable, subAreaEnable, pvEnable = getEnables(pvname)
        if (subAreaEnable != None):
            enable = globalEnable and areaEnable and subAreaEnable and pvEnable
        else:
            enable = globalEnable and areaEnable and pvEnable

        latch = getLatch(pvname)
        notify = getNotify(pvname)

        transparent = not latch or not enable
        alarmState = alarmDict[pvname]["A"].value
        disconnAlarm = alarmState != 8
        # status initially 39 char string for memory
        try:
            curr_desc = pv.value
            curr_desc[0] = 'abcdefghijklmnopqrstuvwxyzAbcdefghijk_0'
        except:
            pass
        pv.put(np.array(curr_desc))
        # set current alarm status to DISCONNECTED
        if(disconnAlarm and (alarmState < 7 or (transparent and alarmState != 7))):
            if(alarmServerRestart):
                alarmDict[pvname]["A"].value = 7
            else:
                alarmDict[pvname]["A"].value = 8
            # set alarm value
            alarmDict[pvname]["V"].value = ""
            # set alarm time
            alarmDict[pvname]["T"].value = timestamp_string
            # write to db
            # areaKey was split above so find again
            areaKey, pvKey = getKeys(pvname)
            if ("=" in areaKey):
                subAreaKey = subAreaDict[areaKey]
                topArea = areaKey.split("=")[0]
                dbSetField('lastAlarmVal', "",
                           topArea, pvKey, subAreaKey)
                dbSetField('lastAlarmTime', timestamp_string,
                           topArea, pvKey, subAreaKey)
            else:
                dbSetField('lastAlarmVal', "",
                           areaKey, pvKey)
                dbSetField('lastAlarmTime', timestamp_string,
                           areaKey, pvKey)
            # log to database
            # disabled alarms not logged
            # Only if not a controlled alarm server restart
            if(enable and not alarmServerRestart):
                entry = {"timestamp": timestamp, "entry": " ".join(
                    [pvname, "-", "DISCONNECTED"])}
                dbUpdateHistory(areaKey, entry, pvname)
                if(alarmDictInitialised and notify):
                    if(areaKey not in notifyBuffer):
                        notifyBuffer[areaKey] = {}
                    if(pvname not in notifyBuffer[areaKey]):
                        notifyBuffer[areaKey][pvname] = []
                    notifyBuffer[areaKey][pvname].append(entry)
                    notifyContent = True
    else:
        try:
            description = pvDescDict[pvname].value
            hostname = pvDescDict[pvname].host
            # hostname = "AAbcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyZZ"
            n = 39
            hostchunks = [hostname[i:i+n] for i in range(0, len(hostname), n)]
            curr_desc = ['abcdefghijklmnopqrstuvwxyzAbcdefghijk_1',
                         description] + hostchunks
        except:
            pass
        pv.put(np.array(curr_desc))


def onChanges(**kw):
    timestamp = datetime.now(utc).isoformat()
    if (alarmDictInitialised):
        _thread.start_new_thread(pvPrepareData, (
            kw["pvname"],
            kw["value"],
            kw["severity"],
            timestamp,
            kw["units"],
            kw["enum_strs"]
        ))
    else:
        _thread.start_new_thread(pvInitData, (
            kw["pvname"],
            kw["value"],
            kw["severity"],
            timestamp,
            kw["units"],
            kw["enum_strs"]
        ))


def pvPrepareData(pvname, value, severity, timestamp, units, enum_strs):

    alarmState = alarmDict[pvname]["A"].value

    noAlarm = severity == 0 and alarmState != 0
    minorAlarm = severity == 1 and alarmState != 2
    majorAlarm = severity == 2 and alarmState != 4
    invalidAlarm = severity == 3 and alarmState != 6

    proceed = noAlarm or minorAlarm or majorAlarm or invalidAlarm

    if(proceed):
        timestamp_string = timestamp

        globalEnable, areaEnable, subAreaEnable, pvEnable = getEnables(pvname)

        if (subAreaEnable != None):
            enable = globalEnable and areaEnable and subAreaEnable and pvEnable
        else:
            enable = globalEnable and areaEnable and pvEnable

        latch = getLatch(pvname)
        notify = getNotify(pvname)

        pvELN = []
        pvELN.append(enable)
        pvELN.append(latch)
        pvELN.append(notify)

        # manipulate value
        if(enum_strs):
            if(enum_strs[value] != ''):
                value = enum_strs[value]
            else:
                if(units):
                    value = str(value)+" "+units
                else:
                    value = str(value)
        else:
            if(units):
                value = str(value)+" "+units
            else:
                value = str(value)

        processPVAlarm(pvname, value, severity,
                       timestamp, timestamp_string, pvELN)


def pvInitData(pvname, value, severity, timestamp, units, enum_strs):
    global pvInitDict
    if (severity > 0):
        pvInitDict[pvname] = [value, severity, timestamp, units, enum_strs]


def processPVAlarm(pvname, value, severity, timestamp, timestamp_string, pvELN):
    global notifyBuffer
    global notifyContent
    global alarmDict

    areaKey, pvKey = getKeys(pvname)

    enable = pvELN[0]
    latch = pvELN[1]
    notify = pvELN[2]

    # 0 "NO_ALARM"
    # 1 "MINOR_ACKED"
    # 2 "MINOR"
    # 3 "MAJOR_ACKED"
    # 4 "MAJOR"
    # 5 "INVALID_ACKED"
    # 6 "INVALID"
    # 7 "DISCONN_ACKED"
    # 8 "DISCONNECTED"
    alarmState = alarmDict[pvname]["A"].value

    noAlarm = severity == 0 and alarmState != 0
    minorAlarm = severity == 1 and alarmState != 2
    majorAlarm = severity == 2 and alarmState != 4
    invalidAlarm = severity == 3 and alarmState != 6

    alarmSet = False
    transparent = not latch or not enable
    inAckState = alarmState == 1 or alarmState == 3 or alarmState == 5 or alarmState == 7

    logToHistory = False

    if (noAlarm and (transparent or inAckState)):
        # set current alarm status to NO_ALARM
        alarmDict[pvname]["A"].value = 0
        # Log to history
        entry = {"timestamp": timestamp, "entry": " ".join(
            [pvname, "-", "Alarm cleared to NO_ALARM"])}
        # print(timestamp, pvname, "Alarm cleared to NO_ALARM")
        logToHistory = True
    elif(minorAlarm and alarmState == 3):
        # set current alarm status to MINOR_ACKED
        alarmDict[pvname]["A"].value = 1
        # Log to history
        entry = {"timestamp": timestamp, "entry": " ".join(
            [pvname, "-", "MAJOR_ACKED alarm demoted to MINOR_ACKED"])}
        # print(timestamp, pvname, "MAJOR_ACKED alarm demoted to MINOR_ACKED")
        logToHistory = True
    elif(minorAlarm and alarmState == 5):
        # set current alarm status to MINOR_ACKED
        alarmDict[pvname]["A"].value = 1
        # Log to history
        entry = {"timestamp": timestamp, "entry": " ".join(
            [pvname, "-", "INVALID_ACKED alarm demoted to MINOR_ACKED"])}
        # print(timestamp, pvname, "INVALID_ACKED alarm demoted to MINOR_ACKED")
        logToHistory = True
    elif(minorAlarm and alarmState == 7):
        # set current alarm status to MINOR_ACKED
        alarmDict[pvname]["A"].value = 1
        # Log to history
        entry = {"timestamp": timestamp, "entry": " ".join(
            [pvname, "-", "DISCONN_ACKED alarm demoted to MINOR_ACKED"])}
        # print(timestamp, pvname, "DISCONN_ACKED alarm demoted to MINOR_ACKED")
        logToHistory = True
    elif(minorAlarm and (alarmState < 1 or (transparent and alarmState != 1))):
        # set current alarm status to MINOR
        alarmDict[pvname]["A"].value = 2
        alarmSet = True
        # Log to history
        entry = {"timestamp": timestamp, "entry": " ".join(
            [pvname, "-", "MINOR_ALARM triggered, alarm value =", str(value)])}
        # print(timestamp, pvname, "MINOR_ALARM triggered, alarm value =", value)
        logToHistory = True
    elif(majorAlarm and alarmState == 5):
        # set current alarm status to MAJOR_ACKED
        alarmDict[pvname]["A"].value = 3
        # Log to history
        entry = {"timestamp": timestamp, "entry": " ".join(
            [pvname, "-", "INVALID_ACKED alarm demoted to MAJOR_ACKED"])}
        # print(timestamp, pvname, "INVALID_ACKED alarm demoted to MAJOR_ACKED")
        logToHistory = True
    elif(majorAlarm and alarmState == 7):
        # set current alarm status to MAJOR_ACKED
        alarmDict[pvname]["A"].value = 3
        # Log to history
        entry = {"timestamp": timestamp, "entry": " ".join(
            [pvname, "-", "DISCONN_ACKED alarm demoted to MAJOR_ACKED"])}
        # print(timestamp, pvname, "DISCONN_ACKED alarm demoted to MAJOR_ACKED")
        logToHistory = True
    elif(majorAlarm and (alarmState < 3 or (transparent and alarmState != 3))):
        # set current alarm status to MAJOR
        alarmDict[pvname]["A"].value = 4
        alarmSet = True
        # Log to history
        entry = {"timestamp": timestamp, "entry": " ".join(
            [pvname, "-", "MAJOR_ALARM triggered, alarm value =", str(value)])}
        # print(timestamp, pvname, "MAJOR_ALARM triggered, alarm value =", value)
        logToHistory = True
    elif(invalidAlarm and alarmState == 7):
        # set current alarm status to INVALID_ACKED
        alarmDict[pvname]["A"].value = 5
        # Log to history
        entry = {"timestamp": timestamp, "entry": " ".join(
            [pvname, "-", "DISCONN_ACKED alarm demoted to INVALID_ACKED"])}
        # print(timestamp, pvname, "DISCONN_ACKED alarm demoted to INVALID_ACKED")
        logToHistory = True
    elif(invalidAlarm and (alarmState < 5 or (transparent and alarmState != 5))):
        # set current alarm status to INVALID
        alarmDict[pvname]["A"].value = 6
        alarmSet = True
        # Log to history
        entry = {"timestamp": timestamp, "entry": " ".join(
            [pvname, "-", "INVALID_ALARM triggered, alarm value =", str(value)])}
        # print(timestamp, pvname, "INVALID_ALARM triggered, alarm value =", value)
        logToHistory = True

    if(alarmSet):
        # set alarm value
        alarmDict[pvname]["V"].value = str(value)
        # set alarm time
        alarmDict[pvname]["T"].value = timestamp_string
        # write to db
        if ("=" in areaKey):
            subAreaKey = subAreaDict[areaKey]
            topArea = areaKey.split("=")[0]
            dbSetField('lastAlarmVal', value,
                       topArea, pvKey, subAreaKey)
            dbSetField('lastAlarmTime', timestamp_string,
                       topArea, pvKey, subAreaKey)
        else:
            dbSetField('lastAlarmVal', value,
                       areaKey, pvKey)
            dbSetField('lastAlarmTime', timestamp_string,
                       areaKey, pvKey)
    # disabled alarms not logged
    if(enable and logToHistory):
        dbUpdateHistory(areaKey, entry, pvname)
    if(enable and alarmSet and notify):
        if(areaKey not in notifyBuffer):
            notifyBuffer[areaKey] = {}
        if(pvname not in notifyBuffer[areaKey]):
            notifyBuffer[areaKey][pvname] = []
        notifyBuffer[areaKey][pvname].append(entry)
        notifyContent = True


def getListOfPVNames():
    global areaList
    global pvNameList
    areaList, pvNameList = dbGetListOfPVNames()


def replaceAllInFile(filename, original, replacedWith):
    fin = open(filename, "rt")
    data = fin.read()
    data = data.replace(original, replacedWith)
    fin.close()
    fin = open(filename, "wt")
    fin.write(data)
    fin.close()


def initSubPVDict(subArea, areaName):
    global pvDict
    global areaDict
    subAreaName = areaName
    for key in subArea.keys():
        if (key == "name"):
            subAreaName = subAreaName + "=" + subArea[key]
        if (key == "pvs"):
            for pvKey in subArea[key].keys():
                pvname = subArea[key][pvKey]["name"]
                pv = PV(pvname=pvname,
                        connection_timeout=0.001,
                        callback=onChanges,
                        connection_callback=pvConn,
                        form='ctrl')
                pvDict[subAreaName + "=" + pvKey] = pv
                areaDict[subAreaName + "=" +
                         pvKey] = subArea[key][pvKey]["name"]


def initPVDict():
    global pvDict
    global areaDict
    global subAreaDict
    # loop through each document = area
    for area in dbGetCollection("pvs").find():
        for key in area.keys():
            if (key == "area"):
                areaName = area[key]
            if (key == "pvs"):
                for pvKey in area[key].keys():
                    pvname = area[key][pvKey]["name"]
                    pv = PV(pvname=pvname,
                            connection_timeout=0.001,
                            callback=onChanges,
                            connection_callback=pvConn,
                            form='ctrl')
                    pvDict[areaName + "=" + pvKey] = pv
                    areaDict[areaName + "=" + pvKey] = area[key][pvKey]["name"]
            if ("subArea" in key):
                subAreaDict[areaName + "=" + area[key]["name"]] = key
                initSubPVDict(area[key], areaName)


def killAlarmIOC():
    subprocess.call("tmux kill-session -t ALARMIOC", shell=True)
    print("Alarm server IOC stopped")


def startAlarmIOC():
    # ALARM PVS
    lines = []
    lines.append("file \"db/Alarm.db\" {\n")
    for pvname in pvNameList:
        pvname = alarmIOCPVPrefix + pvname + alarmIOCPVSuffix
        lines.append("{ alarm_name = \"" + pvname + "\" }\n")
    lines.append("}\n")
    # remove duplicates in case multiple areas had same pv
    # not required anymore - fixed in dbGetListOfPVNames
    # lines = list(dict.fromkeys(lines))
    # write to Alarms.substitutions
    alarmsSubFile = open("/epics/alarmIOC/db/Alarms.substitutions", "w")
    alarmsSubFile.writelines(lines)
    alarmsSubFile.close()
    # AREA PVS
    lines = []
    lines.append("file \"db/Area.db\" {\n")
    for area in areaList:
        pvname = alarmIOCPVPrefix + area
        lines.append("{ area_name = \"" + pvname + "\" }\n")
    lines.append("}\n")
    # remove duplicates in case multiple areas had same pv
    lines = list(dict.fromkeys(lines))
    # write to Areas.substitutions
    areasSubFile = open("/epics/alarmIOC/db/Areas.substitutions", "w")
    areasSubFile.writelines(lines)
    areasSubFile.close()
    # ACK PV
    replaceAllInFile("/epics/alarmIOC/db/Global.db", '$(ioc):',
                     alarmIOCPVPrefix)
    # Check to see if must run on custom port
    if(alarmIOCPVPrefix == "alarmIOC:"):
        with open('/epics/alarmIOC/iocBoot/iocalarmIOC/st.cmd', 'r') as file:
            lines = file.readlines()
        lines[6] = lines[6].replace("#", "")
        with open('/epics/alarmIOC/iocBoot/iocalarmIOC/st.cmd', 'w') as file:
            file.writelines(lines)
        print("Running alarm server IOC on port 8004")
    else:
        print("Running alarm server IOC on default port")
    subprocess.call("./startAlarmIOC.cmd", shell=True)
    sleep(0.1)
    print("Alarm server IOC running successfully")


def initialiseAlarmIOC():
    global alarmDict
    print("Intilialising alarm server IOC from database")

    for pvname in pvNameList:
        areaKey, pvKey = getKeys(pvname)
        # print(areaKey, pvKey)

        if ("=" in areaKey):
            subAreaKey = subAreaDict[areaKey]
            areaKey = areaKey.split("=")[0]

            lastAlarmVal = dbGetField(
                "lastAlarmVal", areaKey, pvKey, subAreaKey)
            lastAlarmTime = dbGetField(
                "lastAlarmTime", areaKey, pvKey, subAreaKey)
            lastAlarmAckTime = dbGetField(
                "lastAlarmAckTime", areaKey, pvKey, subAreaKey)

        else:
            lastAlarmVal = dbGetField("lastAlarmVal", areaKey, pvKey)
            lastAlarmTime = dbGetField("lastAlarmTime", areaKey, pvKey)
            lastAlarmAckTime = dbGetField("lastAlarmAckTime", areaKey, pvKey)

        pv = alarmDict[pvname]["D"]
        val = pv.get()
        pvDisconnected = False
        try:
            # actual pv did not connect during server initialisation
            if (val.size == 0):
                pvDisconnected = True
                # status initially 39 char string for memory
                pv.put(
                    np.array([
                        'abcdefghijklmnopqrstuvwxyzAbcdefghijk_0',
                        "[Disconnected]", "[Disconnected]"
                    ]))
                pvDisconn(pvname, False)
            else:
                # if alarm was activated when server initialised
                try:
                    units = pvInitDict[pvname][3]
                    enum_strs = pvInitDict[pvname][4]
                    value = pvInitDict[pvname][0]
                    if(enum_strs):
                        if(enum_strs[value] != ''):
                            lastAlarmVal = enum_strs[value]
                        else:
                            if(units):
                                lastAlarmVal = str(value)+" "+units
                            else:
                                lastAlarmVal = str(value)
                    else:
                        if(units):
                            lastAlarmVal = str(value)+" "+units
                        else:
                            lastAlarmVal = str(value)
                    if(not alarmServerRestart):
                        lastAlarmTime = pvInitDict[pvname][2]
                    # set current alarm status
                    sev = pvInitDict[pvname][1]
                    if(sev == 1):     # MINOR alarm
                        if(alarmServerRestart):
                            alarmDict[pvname]["A"].value = 1
                        else:
                            alarmDict[pvname]["A"].value = 2
                        # Log to history
                        entry = {"timestamp": pvInitDict[pvname][2], "entry": " ".join(
                            [pvname, "-", "MINOR_ALARM triggered, alarm value =", str(lastAlarmVal)])}
                        # print(pvInitDict[pvname][2], pvname,
                        #       "MINOR_ALARM triggered, alarm value =", lastAlarmVal)
                    elif(sev == 2):     # MAJOR alarm
                        if(alarmServerRestart):
                            alarmDict[pvname]["A"].value = 3
                        else:
                            alarmDict[pvname]["A"].value = 4
                        # Log to history
                        entry = {"timestamp": pvInitDict[pvname][2], "entry": " ".join(
                            [pvname, "-", "MAJOR_ALARM triggered, alarm value =", str(lastAlarmVal)])}
                        # print(pvInitDict[pvname][2], pvname,
                        #       "MAJOR_ALARM triggered, alarm value =", lastAlarmVal)
                    elif(sev == 3):     # INVALID alarm
                        if(alarmServerRestart):
                            alarmDict[pvname]["A"].value = 5
                        else:
                            alarmDict[pvname]["A"].value = 6
                        # Log to history
                        entry = {"timestamp": pvInitDict[pvname][2], "entry": " ".join(
                            [pvname, "-", "INVALID_ALARM triggered, alarm value =", str(lastAlarmVal)])}
                        # print(pvInitDict[pvname][2], pvname,
                        #       "INVALID_ALARM triggered, alarm value =", lastAlarmVal)
                    # write to db
                    areaKey, pvKey = getKeys(pvname)
                    if ("=" in areaKey):
                        subAreaKey = subAreaDict[areaKey]
                        topArea = areaKey.split("=")[0]
                        dbSetField('lastAlarmVal', lastAlarmVal,
                                   topArea, pvKey, subAreaKey)
                        dbSetField('lastAlarmTime', lastAlarmTime,
                                   topArea, pvKey, subAreaKey)
                    else:
                        dbSetField('lastAlarmVal', lastAlarmVal,
                                   areaKey, pvKey)
                        dbSetField('lastAlarmTime', lastAlarmTime,
                                   areaKey, pvKey)
                    # Write entry to database for alarms that were active on startup
                    # Only if not a controlled alarm server restart
                    if(not alarmServerRestart):
                        dbUpdateHistory(areaKey, entry, pvname)
                except:
                    # set current alarm status to NO_ALARM
                    alarmDict[pvname]["A"].value = 0
        except:
            if(AH_DEBUG):
                print('[Warning]', 'Unable to connect to pv:', pvname)

        if(not pvDisconnected):
            # set alarm value
            alarmDict[pvname]["V"].value = str(lastAlarmVal)
            # set alarm time
            alarmDict[pvname]["T"].value = lastAlarmTime
        # set ack time
        alarmDict[pvname]["K"].value = lastAlarmAckTime

    print("Alarm server IOC successfully initialised from database")


def initDescDict():
    global pvDescDict
    for pvname in pvNameList:
        desc = pvname + ".DESC"
        pv = PV(pvname=desc, connection_timeout=0.001)
        pvDescDict[pvname] = pv


def initAreaPVDict():
    global areaPVDict
    global frontEndConnDict
    for area in areaList:
        pvname = alarmIOCPVPrefix + area
        pv = PV(pvname=pvname,
                connection_timeout=0.001,
                callback=printVal,
                connection_callback=pvConnFE)
        frontEndConnDict[pvname] = False
        # pv.wait_for_connection(timeout=5)
        areaPVDict[area] = pv


def initAlarmDict():
    global alarmDict
    global frontEndConnDict
    for pvname in pvNameList:
        alarmName = alarmIOCPVPrefix + pvname + alarmIOCPVSuffix
        for suff in ["", "A", "V", "T", "K"]:
            if (suff == "A"):
                pv = PV(pvname=alarmName + suff,
                        connection_timeout=0.001,
                        callback=propagateAreaAlarms,
                        connection_callback=pvConnFE)
                frontEndConnDict[alarmName + suff] = False
                # pv.wait_for_connection(timeout=5)
            else:
                pv = PV(pvname=alarmName + suff,
                        connection_timeout=0.001,
                        callback=printVal,
                        connection_callback=pvConnFE)
                frontEndConnDict[alarmName + suff] = False
                # pv.wait_for_connection(timeout=5)
            if (suff == ""):
                alarmDict[pvname] = {}
                alarmDict[pvname]["D"] = pv
            else:
                alarmDict[pvname][suff] = pv
    # ACK PV
    pv = PV(pvname=alarmIOCPVPrefix + "ACK_PV",
            connection_timeout=0.001,
            callback=ackPVChange,
            connection_callback=pvConnFE)
    frontEndConnDict[alarmIOCPVPrefix + "ACK_PV"] = False
    # pv.wait_for_connection(timeout=5)
    alarmDict["ACK_PV"] = pv


def disconnectAllPVs():

    for pv in pvDict.values():
        pv.clear_auto_monitor()
        pv.clear_callbacks()
        pv.disconnect()

    for pv in pvDescDict.values():
        pv.clear_auto_monitor()
        pv.clear_callbacks()
        pv.disconnect()

    for pv in areaPVDict.values():
        pv.clear_auto_monitor()
        pv.clear_callbacks()
        pv.disconnect()

    for pvname in pvNameList:
        for suff in ["A", "D", "K", "T", "V"]:
            alarmDict[pvname][suff].clear_auto_monitor()
            alarmDict[pvname][suff].clear_callbacks()
            alarmDict[pvname][suff].disconnect()

    alarmDict["ACK_PV"].clear_auto_monitor()
    alarmDict["ACK_PV"].clear_callbacks()
    alarmDict["ACK_PV"].disconnect()


def clearGlobalDicts():
    global areaList
    global pvNameList
    del areaList[:]
    del pvNameList[:]
    global pvDict
    global areaDict
    global subAreaDict
    pvDict.clear()
    areaDict.clear()
    subAreaDict.clear()
    global pvDescDict
    pvDescDict.clear()
    global areaPVDict
    areaPVDict.clear()
    global alarmDict
    alarmDict.clear()
    global frontEndConnDict
    frontEndConnDict.clear()


def restartAlarmServer():
    global alarmDictInitialised
    alarmDictInitialised = False

    global alarmServerRestart
    alarmServerRestart = True

    disconnectAllPVs()
    clearGlobalDicts()
    getListOfPVNames()
    # Restart alarm IOC
    killAlarmIOC()
    sleep(0.1)
    startAlarmIOC()
    # Initialise string PVs for front end
    initAlarmDict()
    # Initialise area PVs (for alarmList)
    initAreaPVDict()
    # Wait for all front end PVs to connect - must!
    # ~ 1.0 seconds at most
    waitConnFE()
    # Initialise description PV of each alarm PV
    # External PVs
    initDescDict()
    # Initialise alarm PVs
    # External PVs
    initPVDict()
    # Sleep to allow all external PV connects
    sleep(2.0)
    # Initialiase saved string PVs from database
    initialiseAlarmIOC()

    # Restart notify server
    restartNotifyServer()

    print("Alarm server restarted...")

    alarmDictInitialised = True
    alarmServerRestart = False


def bridgeWatchThread(areaKey, bridgeTime, subAreaKey=None, pvKey=None):
    if(AH_DEBUG):
        print("Thread STARTED "+areaKey)
        print("Bridge until "+bridgeTime)

    bridgeTime = datetime.isoformat(
        datetime.fromisoformat(bridgeTime).astimezone(utc))

    while(True):
        sleep(1.0)
        if(subAreaKey):
            topAreaKey = areaKey.split("=")[0]
            if(pvKey):
                enable = dbGetField('enable', topAreaKey, pvKey, subAreaKey)
            else:
                enable = dbGetField('enable', topAreaKey,
                                    subAreaKey=subAreaKey)
        else:
            if(pvKey):
                enable = dbGetField('enable', areaKey, pvKey)
            else:
                enable = dbGetField('enable', areaKey)
        if(enable):
            break
        elif(datetime.now(utc).isoformat() > bridgeTime):
            if(AH_DEBUG):
                print("Bridge timeout "+areaKey)
            if(subAreaKey):
                if(pvKey):
                    dbSetField('bridge', False, topAreaKey, pvKey, subAreaKey)
                    dbSetField('enable', True, topAreaKey, pvKey, subAreaKey)
                else:
                    dbSetField('bridge', False, topAreaKey,
                               subAreaKey=subAreaKey)
                    dbSetField('enable', True, topAreaKey,
                               subAreaKey=subAreaKey)
            else:
                if(pvKey):
                    dbSetField('bridge', False, areaKey, pvKey)
                    dbSetField('enable', True, areaKey, pvKey)
                else:
                    dbSetField('bridge', False, areaKey)
                    dbSetField('enable', True, areaKey)
            break
        else:
            pass
            # if(AH_DEBUG):
            #     print(datetime.now().isoformat())
            #     print(bridgeTime)

    if(AH_DEBUG):
        print("Thread ENDED "+areaKey)


def pvCollectionWatch():
    global watchRestartAlarmServer
    global bridgeMessage
    global bridgeEvent
    with dbGetCollection("pvs").watch() as stream:
        for change in stream:
            # os.system('cls' if os.name == 'nt' else 'clear')
            # print(change)
            if(change["operationType"] == "update"):
                try:
                    documentKey = change["documentKey"]
                    doc = dbFindOne("pvs", documentKey)
                    change = change["updateDescription"]["updatedFields"]
                    timestamp = datetime.now(utc).isoformat()
                    for key in change.keys():
                        # print('#####')
                        # print(key)
                        if(key == "bridge"):
                            bridgeEvent = change[key]
                            topArea = doc.get("area")
                            if(not bridgeEvent):
                                bridgeMessage = topArea+" area BRIDGE cleared to area DISABLED"
                                entry = {"timestamp": timestamp,
                                         "entry": bridgeMessage}
                                dbUpdateHistory(topArea, entry)
                            else:
                                bridgeMessage = topArea+" area BRIDGED until "
                        elif(key == "bridgeTime"):
                            # Time zone localisation
                            if(localtz):
                                str_time = datetime.fromisoformat(change[key]).astimezone(localtz).strftime(
                                    "%d %b %Y %H:%M:%S")
                            else:
                                str_time = datetime.fromisoformat(change[key]).strftime(
                                    "%d %b %Y %H:%M:%S")+" (UTC)"
                            # Time zone localisation
                            bridgeMessage = bridgeMessage+str_time
                            entry = {"timestamp": timestamp,
                                     "entry": bridgeMessage}
                            if(bridgeEvent):
                                dbUpdateHistory(topArea, entry)
                                _thread.start_new_thread(
                                    bridgeWatchThread, (topArea, change[key],))
                        elif(key == "enable"):
                            # area enable
                            topArea = doc.get("area")
                            # print(areaKey, "area enable changed!")
                            for area in areaList:
                                if ("=" in area):
                                    if (area.split("=")[0] == topArea):
                                        areaKey = area
                                        evaluateAreaPVs(areaKey, True)
                            # Log to history
                            msg = "ENABLED" if change[key] else "DISABLED"
                            entry = {"timestamp": timestamp, "entry": " ".join(
                                [topArea, "area", msg])}
                            # print(timestamp, topArea,
                            #   "area", msg)
                            if(not bridgeEvent):
                                dbUpdateHistory(topArea, entry)
                        elif ("pvs." in key and (key.endswith(".bridge"))):
                            bridgeEvent = change[key]
                            pvname = None
                            keys = key.split(".")
                            for one_key in keys:
                                if (one_key not in ["bridge"]):
                                    doc = doc.get(one_key)
                                else:
                                    doc = doc.get("name")
                                    pvname = doc
                            if(not bridgeEvent):
                                bridgeMessage = pvname+" - Alarm BRIDGE cleared to DISABLED"
                                entry = {"timestamp": timestamp,
                                         "entry": bridgeMessage}
                                areaKey = getKeys(pvname)[0]
                                dbUpdateHistory(areaKey, entry, pvname)
                            else:
                                bridgeMessage = pvname+" - Alarm BRIDGED until "
                        elif ("pvs." in key and (key.endswith(".bridgeTime"))):
                            # Time zone localisation
                            if(localtz):
                                str_time = datetime.fromisoformat(change[key]).astimezone(localtz).strftime(
                                    "%d %b %Y %H:%M:%S")
                            else:
                                str_time = datetime.fromisoformat(change[key]).strftime(
                                    "%d %b %Y %H:%M:%S")+" (UTC)"
                            # Time zone localisation
                            bridgeMessage = bridgeMessage+str_time
                            entry = {"timestamp": timestamp,
                                     "entry": bridgeMessage}
                            if(bridgeEvent):
                                areaKey, pvKey = getKeys(pvname)
                                dbUpdateHistory(areaKey, entry, pvname)
                                if ("=" in areaKey):
                                    subAreaKey = subAreaDict[areaKey]
                                    areaKey = areaKey.split("=")[0]
                                else:
                                    subAreaKey = None
                                _thread.start_new_thread(
                                    bridgeWatchThread, (areaKey, change[key], subAreaKey, pvKey,))
                        elif ("pvs." in key and (key.endswith(".enable") or key.endswith(".latch") or key.endswith(".notify"))):
                            # pv enable/latch/notify
                            # print("enable/latch/notify of pv changed!")
                            pvname = None
                            keys = key.split(".")
                            for one_key in keys:
                                if (one_key not in ["enable", "latch", "notify"]):
                                    doc = doc.get(one_key)
                                else:
                                    doc = doc.get("name")
                                    pvname = doc
                            areaKey = getKeys(pvname)[0]
                            if(key.endswith(".enable")):
                                evaluateAreaPVs(areaKey, True)
                            # Log to history
                            if(key.endswith(".enable")):
                                msg = "ENABLED" if change[key] else "DISABLED"
                            elif(key.endswith(".latch")):
                                msg = "latch ENABLED" if change[key] else "latch DISABLED"
                            elif(key.endswith(".notify")):
                                msg = "notify ENABLED" if change[key] else "notify DISABLED"
                            entry = {"timestamp": timestamp, "entry": " ".join(
                                [pvname, '-', "Alarm", msg])}
                            # print(timestamp, pvname,
                            #       "alarm", msg)
                            if((key.endswith(".enable") and not bridgeEvent) or key.endswith(".latch") or key.endswith(".notify")):
                                dbUpdateHistory(areaKey, entry, pvname)
                        elif (key.endswith(".bridge")):
                            # subArea bridge
                            bridgeEvent = change[key]
                            areaKey = doc.get("area") + "=" + doc.get(
                                key.split(".")[0])["name"]
                            areaName = areaKey.replace("=", " > ")
                            if(not bridgeEvent):
                                bridgeMessage = areaName+" area BRIDGE cleared to area DISABLED"
                                entry = {"timestamp": timestamp,
                                         "entry": bridgeMessage}
                                dbUpdateHistory(areaKey, entry)
                            else:
                                bridgeMessage = areaName+" area BRIDGED until "
                        elif (key.endswith(".bridgeTime")):
                            # subArea bridgeTime
                            # Time zone localisation
                            if(localtz):
                                str_time = datetime.fromisoformat(change[key]).astimezone(localtz).strftime(
                                    "%d %b %Y %H:%M:%S")
                            else:
                                str_time = datetime.fromisoformat(change[key]).strftime(
                                    "%d %b %Y %H:%M:%S")+" (UTC)"
                            # Time zone localisation
                            bridgeMessage = bridgeMessage+str_time
                            entry = {"timestamp": timestamp,
                                     "entry": bridgeMessage}
                            if(bridgeEvent):
                                dbUpdateHistory(areaKey, entry)
                                _thread.start_new_thread(
                                    bridgeWatchThread, (areaKey, change[key], key.split(".")[0],))
                        elif (key.endswith(".enable")):
                            # subArea enable
                            areaKey = doc.get("area") + "=" + doc.get(
                                key.split(".")[0])["name"]
                            # print(areaKey, "area enable changed!")
                            evaluateAreaPVs(areaKey, True)
                            # Log to history
                            msg = "ENABLED" if change[key] else "DISABLED"
                            entry = {"timestamp": timestamp, "entry": " ".join(
                                [areaKey.replace("=", " > "), "sub area", msg])}
                            # print(timestamp, areaKey.replace("=", " > "),
                            #       "sub area", msg)
                            if(not bridgeEvent):
                                dbUpdateHistory(areaKey, entry)
                        elif (key == "pvs" or key.endswith(".pvs")):
                            # New pvs added
                            watchRestartAlarmServer = True
                        elif (key == "area" or key.endswith(".name")):
                            # Name change
                            watchRestartAlarmServer = True
                except:
                    if(AH_DEBUG):
                        print("no relevant updates")
            elif(change["operationType"] == "replace"):
                watchRestartAlarmServer = True
            elif(change["operationType"] == "insert"):
                watchRestartAlarmServer = True
            elif(change["operationType"] == "delete"):
                watchRestartAlarmServer = True


def globalCollectionWatch():
    with dbGetCollection("glob").watch() as stream:
        for change in stream:
            # print(change)
            try:
                change = change["updateDescription"]["updatedFields"]
                timestamp = datetime.now(utc).isoformat()
                for key in change.keys():
                    if (key == "enableAllAreas"):
                        # print(areaKey, "area enable changed!")
                        for area in areaList:
                            if ("=" in area):
                                areaKey = area
                                evaluateAreaPVs(areaKey, True)
                        # Log to history
                        msg = "ENABLED" if change[key] else "DISABLED"
                        entry = {"timestamp": timestamp, "entry": " ".join(
                            ["ALL AREAS", msg])}
                        # print(timestamp, topArea,
                        #   "area", msg)
                        dbUpdateHistory("_GLOBAL", entry)

            except:
                if(AH_DEBUG):
                    print("No relevant lobal var updates")


def main():
    initPreSuffix()
    getListOfPVNames()
    startAlarmIOC()
    # Initialise string PVs for front end
    initAlarmDict()
    # Initialise area PVs (for alarmList)
    initAreaPVDict()
    # Wait for all front end PVs to connect - must!
    # ~ 1.0 seconds at most
    waitConnFE()
    # Initialise description PV of each alarm PV
    # External PVs
    initDescDict()
    # Initialise alarm PVs
    # External PVs
    initPVDict()
    # Sleep to allow all external PV connects
    sleep(2.0)
    # Initialiase saved string PVs from database
    initialiseAlarmIOC()
    # Initialise database collection watch on pvs
    # For enable change on pv to reevaluate area pvs
    _thread.start_new_thread(pvCollectionWatch, ())
    # For change to global enable to reevaluate area pvs
    _thread.start_new_thread(globalCollectionWatch, ())

    # Start notify server
    startNotifyServer()

    # Final debug outputs
    # print('areaPVDict', areaPVDict)
    # print('areaDict', areaDict)
    # print('pvDict', pvDict)

    print("Alarm server running...")

    global alarmDictInitialised
    alarmDictInitialised = True

    while (True):
        global notifyBuffer
        global notifyContent
        global notifyTimeout
        global watchRestartAlarmServer
        sleep(1.0)
        if(watchRestartAlarmServer):
            watchRestartAlarmServer = False
            restartAlarmServer()
        if(notifyContent):
            notifyTimeout += 1
            notifyContent = False
            sleep(1.0)
            if((not notifyContent) or (notifyTimeout >= 2)):
                notify(notifyBuffer)
                notifyBuffer = {}
                notifyTimeout = 0

        # restartAlarmServer()


if __name__ == "__main__":
    main()
