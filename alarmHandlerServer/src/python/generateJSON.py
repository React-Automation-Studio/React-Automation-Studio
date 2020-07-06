import json

with open('./initDBData/pvList.json') as f:
    data = json.load(f)

keys = {}

pvs = {}
pvsFile = []

history = {}
historyFile = []
historyFile.append({"id": "_GLOBAL", "history": []})


area = ''
subArea = ''
areaList = []
subAreaList = []

for entry in data:
    # area
    area = entry["pv"].split("=")[0].split("*")[0]
    if(area not in areaList):
        # new area
        areaList.append(area)
        pvs[area] = {
            "area": area,
            "enable": True,
            "pvs": {}
        }
        keys[area] = {
            "pvKey": 0,
            "subAreaKey": 0
        }
        history[area] = {
            "id": area,
            "history": []
        }
    if(len(entry["pv"].split("=")) == 1):
        # area
        if(len(entry["pv"].split("*")) > 1):
            # pv
            pv = entry["pv"].split("*")[1]
            pvs[area]["pvs"]["pv"+str(keys[area]["pvKey"])] = {
                "name": pv,
                "enable": True,
                "latch": True,
                "notify": True,
                "lastAlarmVal": "",
                "lastAlarmTime": "",
                "lastAlarmAckTime": ""
            }
            keys[area]["pvKey"] += 1
            history[area+"*"+pv] = {
                "id": area+"*"+pv,
                "history": []
            }
    else:
        # subArea
        subArea = entry["pv"].split("=")[1].split("*")[0]
        identifier = area+"="+subArea
        if(identifier not in subAreaList):
            # new subArea
            subAreaList.append(identifier)
            keys[identifier] = {
                "pvKey": 0
            }
            pvs[area]["subArea"+str(keys[area]["subAreaKey"])] = {
                "name": subArea,
                "enable": True,
                "pvs": {}
            }
            keys[area]["subAreaKey"] += 1
            history[identifier] = {
                "id": identifier,
                "history": []
            }
        if(len(entry["pv"].split("*")) > 1):
            # pv
            pv = entry["pv"].split("*")[1]
            pvs[area]["subArea"+str(keys[area]["subAreaKey"]-1)]["pvs"]["pv"+str(keys[identifier]["pvKey"])] = {
                "name": pv,
                "enable": True,
                "latch": True,
                "notify": True,
                "lastAlarmVal": "",
                "lastAlarmTime": "",
                "lastAlarmAckTime": ""
            }
            keys[identifier]["pvKey"] += 1
            history[identifier+"*"+pv] = {
                "id": identifier+"*"+pv,
                "history": []
            }


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
