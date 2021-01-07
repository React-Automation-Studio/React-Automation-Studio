import json

with open('./initDBData/pvList.json') as f:
    data = json.load(f)

pvs = {}
pvsFile = []

history = {}
historyFile = []
historyFile.append({"id": "_GLOBAL", "history": []})


areaName = ''

for area in data:
    for areaKey, areaValue in area.items():
        if(areaKey == "area"):
            # new area template
            areaName = areaValue
            pvs[areaName] = {
                "area": areaName,
                "enable": True,
                "pvs": {}
            }
            history[areaName] = {
                "id": areaName,
                "history": []
            }
        elif(areaKey == "pvs"):
            # area pvs
            for pvKey, pvName in area[areaKey].items():
                pvs[areaName]["pvs"][pvKey] = {
                    "name": pvName,
                    "enable": True,
                    "latch": True,
                    "notify": True,
                    "lastAlarmVal": "",
                    "lastAlarmTime": "",
                    "lastAlarmAckTime": ""
                }
                if pvName not in history:
                    history[pvName] = {
                        "id": pvName,
                        "areas": [areaName],
                        "history": []
                    }
                else:
                    areas=history[pvName]["areas"]
                    newArea = areaName
                    areas.append(newArea)
                    history[pvName]["areas"] = list(set(areas))
        elif("subArea" in areaKey):
            # new subArea template
            pvs[areaName][areaKey] = {
                "name": areaValue["name"],
                "enable": True,
                "pvs": {}
            }
            history[areaName+"="+areaValue["name"]] = {
                "id": areaName+"="+areaValue["name"],
                "history": []
            }
            # subArea pvs
            for pvKey, pvName in area[areaKey]["pvs"].items():
                pvs[areaName][areaKey]["pvs"][pvKey] = {
                    "name": pvName,
                    "enable": True,
                    "latch": True,
                    "notify": True,
                    "lastAlarmVal": "",
                    "lastAlarmTime": "",
                    "lastAlarmAckTime": ""
                }
                if pvName not in history:
                    history[pvName] = {
                        "id": pvName,
                        "areas": [areaName+"="+areaValue["name"]],
                        "history": []
                    }
                else:
                    areas = history[pvName]["areas"]
                    newArea = areaName+"="+areaValue["name"]
                    areas.append(newArea)
                    history[pvName]["areas"] = list(set(areas))

for value in pvs.values():
    pvsFile.append(value)

for value in history.values():
    historyFile.append(value)

with open('./initDBData/pvs.json', 'w') as json_file:
    json.dump(pvsFile, json_file)
json_file.close()

with open('./initDBData/history.json', 'w') as json_file:
    json.dump(historyFile, json_file)
json_file.close()
