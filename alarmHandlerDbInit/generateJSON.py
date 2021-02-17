import json

with open('./initDBData/pvList.json') as f:
    pvData = json.load(f)

with open('./initDBData/userList.json') as f:
    userData = json.load(f)

pvs = {}
pvsFile = []

users = {}
usersFile = []

areaName = ''

for area in pvData:
    for areaKey, areaValue in area.items():
        if(areaKey == "area"):
            # new area template
            areaName = areaValue
            pvs[areaName] = {
                "area": areaName,
                "enable": True,
                "bridge": False,
                "bridgeTime": "",
                "pvs": {}
            }
        elif(areaKey == "pvs"):
            # area pvs
            for pvKey, pvName in area[areaKey].items():
                pvs[areaName]["pvs"][pvKey] = {
                    "name": pvName,
                    "enable": True,
                    "bridge": False,
                    "bridgeTime": "",
                    "latch": True,
                    "notify": True,
                    "lastAlarmVal": "",
                    "lastAlarmTime": "",
                    "lastAlarmAckTime": ""
                }
        elif("subArea" in areaKey):
            # new subArea template
            pvs[areaName][areaKey] = {
                "name": areaValue["name"],
                "enable": True,
                "bridge": False,
                "bridgeTime": "",
                "pvs": {}
            }
            # subArea pvs
            for pvKey, pvName in area[areaKey]["pvs"].items():
                pvs[areaName][areaKey]["pvs"][pvKey] = {
                    "name": pvName,
                    "enable": True,
                    "bridge": False,
                    "bridgeTime": "",
                    "latch": True,
                    "notify": True,
                    "lastAlarmVal": "",
                    "lastAlarmTime": "",
                    "lastAlarmAckTime": ""
                }

for user in userData:
    for userKey, userValue in user.items():
        if(userKey == "name"):
            # new user template
            name = userValue
            users[name] = {
                userKey: name,
                "global": True,
                "globalSetup": {
                    "notify": True,
                    "alarmMinor": True,
                    "alarmMajor": True,
                    "alarmInvalid": True,
                    "alarmDisconn": True,
                    "email": True,
                    "sms": False,
                    "whatsapp": False,
                    "signal": False,
                    "allDay": True,
                    "fromTime": "",
                    "toTime": "",
                    "weekly": True,
                    "days": {
                        "Monday": True,
                        "Tuesday": True,
                        "Wednesday": True,
                        "Thursday": True,
                        "Friday": True,
                        "Saturday": True,
                        "Sunday": True
                    },
                    "dateRange": False,
                    "fromDate": "",
                    "toDate": ""
                },
                "notifyPVs": []
            }
            # For demo users only insert demo notify expressions
            if(name == "Demo User One"):
                users[name]["notifyPVs"] = [{
                    "regEx": "amplitude\\b",
                    "notifySetup": {
                        "notify": True,
                        "alarmMinor": True,
                        "alarmMajor": True,
                        "alarmInvalid": True,
                        "alarmDisconn": True,
                        "email": True,
                        "sms": False,
                        "whatsapp": False,
                        "signal": False,
                        "allDay": True,
                        "fromTime": "",
                        "toTime": "",
                        "weekly": True,
                        "days": {
                            "Monday": True,
                            "Tuesday": True,
                            "Wednesday": True,
                            "Thursday": True,
                            "Friday": True,
                            "Saturday": True,
                            "Sunday": True
                        },
                        "dateRange": False,
                        "fromDate": "",
                        "toDate": ""
                    }
                },
                    {
                    "regEx": "vault",
                    "notifySetup": {
                        "notify": True,
                        "alarmMinor": True,
                        "alarmMajor": True,
                        "alarmInvalid": True,
                        "alarmDisconn": True,
                        "email": True,
                        "sms": False,
                        "whatsapp": False,
                        "signal": False,
                        "allDay": True,
                        "fromTime": "",
                        "toTime": "",
                        "weekly": True,
                        "days": {
                            "Monday": True,
                            "Tuesday": True,
                            "Wednesday": True,
                            "Thursday": True,
                            "Friday": True,
                            "Saturday": True,
                            "Sunday": True
                        },
                        "dateRange": False,
                        "fromDate": "",
                        "toDate": ""
                    }
                },
                    {
                    "regEx": "cyclotron.*RF",
                    "notifySetup": {
                        "notify": True,
                        "alarmMinor": True,
                        "alarmMajor": True,
                        "alarmInvalid": True,
                        "alarmDisconn": True,
                        "email": True,
                        "sms": False,
                        "whatsapp": False,
                        "signal": False,
                        "allDay": True,
                        "fromTime": "",
                        "toTime": "",
                        "weekly": True,
                        "days": {
                            "Monday": True,
                            "Tuesday": True,
                            "Wednesday": True,
                            "Thursday": True,
                            "Friday": True,
                            "Saturday": True,
                            "Sunday": True
                        },
                        "dateRange": False,
                        "fromDate": "",
                        "toDate": ""
                    }
                },
                    {
                    "regEx": "cyclotron.*RF\\d",
                    "notifySetup": {
                        "notify": True,
                        "alarmMinor": True,
                        "alarmMajor": True,
                        "alarmInvalid": True,
                        "alarmDisconn": True,
                        "email": True,
                        "sms": False,
                        "whatsapp": False,
                        "signal": False,
                        "allDay": True,
                        "fromTime": "",
                        "toTime": "",
                        "weekly": True,
                        "days": {
                            "Monday": True,
                            "Tuesday": True,
                            "Wednesday": True,
                            "Thursday": True,
                            "Friday": True,
                            "Saturday": True,
                            "Sunday": True
                        },
                        "dateRange": False,
                        "fromDate": "",
                        "toDate": ""
                    }
                },
                    {
                    "regEx": "air.*press",
                    "notifySetup": {
                        "notify": True,
                        "alarmMinor": True,
                        "alarmMajor": True,
                        "alarmInvalid": True,
                        "alarmDisconn": True,
                        "email": True,
                        "sms": False,
                        "whatsapp": False,
                        "signal": False,
                        "allDay": True,
                        "fromTime": "",
                        "toTime": "",
                        "weekly": True,
                        "days": {
                            "Monday": True,
                            "Tuesday": True,
                            "Wednesday": True,
                            "Thursday": True,
                            "Friday": True,
                            "Saturday": True,
                            "Sunday": True
                        },
                        "dateRange": False,
                        "fromDate": "",
                        "toDate": ""
                    }
                },
                    {
                    "regEx": "SLIT.*2",
                    "notifySetup": {
                        "notify": True,
                        "alarmMinor": True,
                        "alarmMajor": True,
                        "alarmInvalid": True,
                        "alarmDisconn": True,
                        "email": True,
                        "sms": False,
                        "whatsapp": False,
                        "signal": False,
                        "allDay": True,
                        "fromTime": "",
                        "toTime": "",
                        "weekly": True,
                        "days": {
                            "Monday": True,
                            "Tuesday": True,
                            "Wednesday": True,
                            "Thursday": True,
                            "Friday": True,
                            "Saturday": True,
                            "Sunday": True
                        },
                        "dateRange": False,
                        "fromDate": "",
                        "toDate": ""
                    }
                }]
            elif(name == "Demo User Two"):
                users[name]["notifyPVs"] = [{
                    "regEx": "radiation",
                    "notifySetup": {
                        "notify": True,
                        "alarmMinor": True,
                        "alarmMajor": True,
                        "alarmInvalid": True,
                        "alarmDisconn": True,
                        "email": True,
                        "sms": False,
                        "whatsapp": False,
                        "signal": False,
                        "allDay": True,
                        "fromTime": "",
                        "toTime": "",
                        "weekly": True,
                        "days": {
                            "Monday": True,
                            "Tuesday": True,
                            "Wednesday": True,
                            "Thursday": True,
                            "Friday": True,
                            "Saturday": True,
                            "Sunday": True
                        },
                        "dateRange": False,
                        "fromDate": "",
                        "toDate": ""
                    }
                },
                    {
                    "regEx": "^testIOC.*STR",
                    "notifySetup": {
                        "notify": True,
                        "alarmMinor": True,
                        "alarmMajor": True,
                        "alarmInvalid": True,
                        "alarmDisconn": True,
                        "email": True,
                        "sms": False,
                        "whatsapp": False,
                        "signal": False,
                        "allDay": True,
                        "fromTime": "",
                        "toTime": "",
                        "weekly": True,
                        "days": {
                            "Monday": True,
                            "Tuesday": True,
                            "Wednesday": True,
                            "Thursday": True,
                            "Friday": True,
                            "Saturday": True,
                            "Sunday": True
                        },
                        "dateRange": False,
                        "fromDate": "",
                        "toDate": ""
                    }
                },
                    {
                    "regEx": "SLIT.*Gap",
                    "notifySetup": {
                        "notify": True,
                        "alarmMinor": True,
                        "alarmMajor": True,
                        "alarmInvalid": True,
                        "alarmDisconn": True,
                        "email": True,
                        "sms": False,
                        "whatsapp": False,
                        "signal": False,
                        "allDay": True,
                        "fromTime": "",
                        "toTime": "",
                        "weekly": True,
                        "days": {
                            "Monday": True,
                            "Tuesday": True,
                            "Wednesday": True,
                            "Thursday": True,
                            "Friday": True,
                            "Saturday": True,
                            "Sunday": True
                        },
                        "dateRange": False,
                        "fromDate": "",
                        "toDate": ""
                    }
                },
                    {
                    "regEx": "vault",
                    "notifySetup": {
                        "notify": True,
                        "alarmMinor": True,
                        "alarmMajor": True,
                        "alarmInvalid": True,
                        "alarmDisconn": True,
                        "email": True,
                        "sms": False,
                        "whatsapp": False,
                        "signal": False,
                        "allDay": True,
                        "fromTime": "",
                        "toTime": "",
                        "weekly": True,
                        "days": {
                            "Monday": True,
                            "Tuesday": True,
                            "Wednesday": True,
                            "Thursday": True,
                            "Friday": True,
                            "Saturday": True,
                            "Sunday": True
                        },
                        "dateRange": False,
                        "fromDate": "",
                        "toDate": ""
                    }
                }]
            elif(name == "Demo User Three"):
                users[name]["notifyPVs"] = [{
                    "regEx": "SLITXY1.*Gap",
                    "notifySetup": {
                        "notify": True,
                        "alarmMinor": True,
                        "alarmMajor": True,
                        "alarmInvalid": True,
                        "alarmDisconn": True,
                        "email": True,
                        "sms": False,
                        "whatsapp": False,
                        "signal": False,
                        "allDay": True,
                        "fromTime": "",
                        "toTime": "",
                        "weekly": True,
                        "days": {
                            "Monday": True,
                            "Tuesday": True,
                            "Wednesday": True,
                            "Thursday": True,
                            "Friday": True,
                            "Saturday": True,
                            "Sunday": True
                        },
                        "dateRange": False,
                        "fromDate": "",
                        "toDate": ""
                    }
                },
                    {
                    "regEx": "building.*air",
                    "notifySetup": {
                        "notify": True,
                        "alarmMinor": True,
                        "alarmMajor": True,
                        "alarmInvalid": True,
                        "alarmDisconn": True,
                        "email": True,
                        "sms": False,
                        "whatsapp": False,
                        "signal": False,
                        "allDay": True,
                        "fromTime": "",
                        "toTime": "",
                        "weekly": True,
                        "days": {
                            "Monday": True,
                            "Tuesday": True,
                            "Wednesday": True,
                            "Thursday": True,
                            "Friday": True,
                            "Saturday": True,
                            "Sunday": True
                        },
                        "dateRange": False,
                        "fromDate": "",
                        "toDate": ""
                    }
                },
                    {
                    "regEx": "SLIT",
                    "notifySetup": {
                        "notify": True,
                        "alarmMinor": True,
                        "alarmMajor": True,
                        "alarmInvalid": True,
                        "alarmDisconn": True,
                        "email": True,
                        "sms": False,
                        "whatsapp": False,
                        "signal": False,
                        "allDay": True,
                        "fromTime": "",
                        "toTime": "",
                        "weekly": True,
                        "days": {
                            "Monday": True,
                            "Tuesday": True,
                            "Wednesday": True,
                            "Thursday": True,
                            "Friday": True,
                            "Saturday": True,
                            "Sunday": True
                        },
                        "dateRange": False,
                        "fromDate": "",
                        "toDate": ""
                    }
                },
                    {
                    "regEx": "interlocks",
                    "notifySetup": {
                        "notify": True,
                        "alarmMinor": True,
                        "alarmMajor": True,
                        "alarmInvalid": True,
                        "alarmDisconn": True,
                        "email": True,
                        "sms": False,
                        "whatsapp": False,
                        "signal": False,
                        "allDay": True,
                        "fromTime": "",
                        "toTime": "",
                        "weekly": True,
                        "days": {
                            "Monday": True,
                            "Tuesday": True,
                            "Wednesday": True,
                            "Thursday": True,
                            "Friday": True,
                            "Saturday": True,
                            "Sunday": True
                        },
                        "dateRange": False,
                        "fromDate": "",
                        "toDate": ""
                    }
                },
                    {
                    "regEx": "water.*flow",
                    "notifySetup": {
                        "notify": True,
                        "alarmMinor": True,
                        "alarmMajor": True,
                        "alarmInvalid": True,
                        "alarmDisconn": True,
                        "email": True,
                        "sms": False,
                        "whatsapp": False,
                        "signal": False,
                        "allDay": True,
                        "fromTime": "",
                        "toTime": "",
                        "weekly": True,
                        "days": {
                            "Monday": True,
                            "Tuesday": True,
                            "Wednesday": True,
                            "Thursday": True,
                            "Friday": True,
                            "Saturday": True,
                            "Sunday": True
                        },
                        "dateRange": False,
                        "fromDate": "",
                        "toDate": ""
                    }
                },
                    {
                    "regEx": "building.*temp",
                    "notifySetup": {
                        "notify": True,
                        "alarmMinor": True,
                        "alarmMajor": True,
                        "alarmInvalid": True,
                        "alarmDisconn": True,
                        "email": True,
                        "sms": False,
                        "whatsapp": False,
                        "signal": False,
                        "allDay": True,
                        "fromTime": "",
                        "toTime": "",
                        "weekly": True,
                        "days": {
                            "Monday": True,
                            "Tuesday": True,
                            "Wednesday": True,
                            "Thursday": True,
                            "Friday": True,
                            "Saturday": True,
                            "Sunday": True
                        },
                        "dateRange": False,
                        "fromDate": "",
                        "toDate": ""
                    }
                },
                    {
                    "regEx": "SLIT.*1.*Readback",
                    "notifySetup": {
                        "notify": True,
                        "alarmMinor": True,
                        "alarmMajor": True,
                        "alarmInvalid": True,
                        "alarmDisconn": True,
                        "email": True,
                        "sms": False,
                        "whatsapp": False,
                        "signal": False,
                        "allDay": True,
                        "fromTime": "",
                        "toTime": "",
                        "weekly": True,
                        "days": {
                            "Monday": True,
                            "Tuesday": True,
                            "Wednesday": True,
                            "Thursday": True,
                            "Friday": True,
                            "Saturday": True,
                            "Sunday": True
                        },
                        "dateRange": False,
                        "fromDate": "",
                        "toDate": ""
                    }
                },
                    {
                    "regEx": "air.*diff",
                    "notifySetup": {
                        "notify": True,
                        "alarmMinor": True,
                        "alarmMajor": True,
                        "alarmInvalid": True,
                        "alarmDisconn": True,
                        "email": True,
                        "sms": False,
                        "whatsapp": False,
                        "signal": False,
                        "allDay": True,
                        "fromTime": "",
                        "toTime": "",
                        "weekly": True,
                        "days": {
                            "Monday": True,
                            "Tuesday": True,
                            "Wednesday": True,
                            "Thursday": True,
                            "Friday": True,
                            "Saturday": True,
                            "Sunday": True
                        },
                        "dateRange": False,
                        "fromDate": "",
                        "toDate": ""
                    }
                },
                    {
                    "regEx": "demoAlarms.*\\:.*building",
                    "notifySetup": {
                        "notify": True,
                        "alarmMinor": True,
                        "alarmMajor": True,
                        "alarmInvalid": True,
                        "alarmDisconn": True,
                        "email": True,
                        "sms": False,
                        "whatsapp": False,
                        "signal": False,
                        "allDay": True,
                        "fromTime": "",
                        "toTime": "",
                        "weekly": True,
                        "days": {
                            "Monday": True,
                            "Tuesday": True,
                            "Wednesday": True,
                            "Thursday": True,
                            "Friday": True,
                            "Saturday": True,
                            "Sunday": True
                        },
                        "dateRange": False,
                        "fromDate": "",
                        "toDate": ""
                    }
                }]

        else:
            users[name][userKey] = userValue


for value in pvs.values():
    pvsFile.append(value)

with open('./initDBData/pvs.json', 'w') as json_file:
    json.dump(pvsFile, json_file)
json_file.close()

for value in users.values():
    usersFile.append(value)

with open('./initDBData/users.json', 'w') as json_file:
    json.dump(usersFile, json_file)
json_file.close()