import json

with open('./initDBData/pvList.json') as f:
    pvData = json.load(f)

pvs = {}
pvsFile = []

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
                "roles": area["roles"],
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
                "roles": areaValue["roles"],
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

for value in pvs.values():
    pvsFile.append(value)

with open('./initDBData/pvs.json', 'w') as json_file:
    json.dump(pvsFile, json_file)
json_file.close()
