import json

with open('./initDBData/pvList.json') as f:
    data = json.load(f)

history = []
history.append({"id": "_GLOBAL", "history": []})

pvs = []
pvKey = 0
subAreaKey = 0

for entry in data:
    hist_entry = entry
    hist_entry["history"] = []
    history.append(hist_entry)

    if(len(entry["id"].split("=")) > 1):
        # subArea
        if(len(entry["id"].split("*")) > 1):
            # pv
            pv = entry["id"].split("*")[1]
            pvs[-1]["subArea"+str(subAreaKey-1)]["pvs"]["pv"+str(pvKey)] = {
                "name": pv,
                "enable": True,
                "latch": True,
                "notify": True,
                "lastAlarmVal": "",
                "lastAlarmTime": "",
                "lastAlarmAckTime": ""
            }
            pvKey += 1
        else:
            # new subArea
            subArea = entry["id"].split("=")[1]
            pvKey = 0
            pvs[-1]["subArea"+str(subAreaKey)] = {
                "name": subArea,
                "enable": True,
                "pvs": {}
            }
            subAreaKey += 1

    else:
        # area
        if(len(entry["id"].split("*")) > 1):
            # pv
            pv = entry["id"].split("*")[1]
            pvs[-1]["pvs"]["pv"+str(pvKey)] = {
                "name": pv,
                "enable": True,
                "latch": True,
                "notify": True,
                "lastAlarmVal": "",
                "lastAlarmTime": "",
                "lastAlarmAckTime": ""
            }
            pvKey += 1
        else:
            # new area
            area = entry["id"].split("=")[0]
            pvKey = 0
            subAreaKey = 0
            pvs.append({
                "area": area,
                "enable": True,
                "pvs": {}
            })

# print(history)
# print(pvs)

with open('./initDBData/history.json', 'w') as json_file:
    json.dump(history, json_file)
json_file.close()

with open('./initDBData/pvs.json', 'w') as json_file:
    json.dump(pvs, json_file)
json_file.close()
