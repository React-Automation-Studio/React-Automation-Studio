The first time the alarm handler is run an alarm database is created and initialised with seed data from three json files.

These files can be found, from the React Automation Studio root folder, at:
```bash
    ./alarmHandlerServer/initDBData/config.json
    ./alarmHandlerServer/initDBData/pvList.json
    ./alarmHandlerServer/initDBData/users.json
```

**NOTE:** Subsequent changes to these files will only take effect if you delete the existing alarm database or prune the Docker volume attached to the MongoDB server on which the alarm database resides. **This will result in all data stored in the previous alarm database being deleted permanently!** For this reason it is recommended that you set these files up correctly before starting the alarm server.

<br/>
**config.json**

```bash
    [{
        "alarmIOCPVPrefix": "alarmIOC:",
        "alarmIOCPVSuffix": ""
    }]
```

This file sets the prefix and suffix to be pre/appended to pvs created by the alarm server. Pvs created by the alarm server include pvs to monitor the areas, alarm and acknowledge times. Additional runtime configurations will be defined in this file in future.

<br/>
**pvList.json**

```bash
    [
        {
            "area": "BEAMLINE DEMO",
            "pvs": {},
            "subArea0": {
                "name": "POWER SUPPLIES",
                "pvs": {
                    "pv0": "testIOC:PS1:Readback",
                    "pv1": "testIOC:PS2:Readback",
                    "pv2": "testIOC:PS3:Readback",
                    "pv3": "testIOC:PS4:Readback",
                    "pv4": "testIOC:STR1:X:Readback",
                    "pv5": "testIOC:STR1:Y:Readback",
                    "pv6": "testIOC:STR2:X:Readback",
                    "pv7": "testIOC:STR2:Y:Readback",
                    "pv8": "testIOC:STR3:Y:Readback",
                    "pv9": "testIOC:STR4:X:Readback"
                }
            },
            "subArea1": {
                "name": "SLITS",
                "pvs": {
                    "pv0": "testIOC:SLITXY1:X:Gap:Readback",
                    "pv1": "testIOC:SLITXY1:X:Offset:Readback",
                    "pv2": "testIOC:SLITXY1:Y:Gap:Readback",
                    "pv3": "testIOC:SLITXY1:Y:Offset:Readback",
                    "pv4": "testIOC:SLITXY2:X:Gap:Readback",
                    "pv5": "testIOC:SLITXY2:X:Offset:Readback",
                    "pv6": "testIOC:SLITXY2:Y:Gap:Readback",
                    "pv7": "testIOC:SLITXY2:Y:Offset:Readback",
                    "pv8": "testIOC:SLITXY3:X:Gap:Readback",
                    "pv9": "testIOC:SLITXY3:X:Offset:Readback",
                    "pv10": "testIOC:SLITXY3:Y:Gap:Readback",
                    "pv11": "testIOC:SLITXY3:Y:Offset:Readback"
                }
            }
        },
        {
            "area": "BUILDING DEMO",
            "pvs": {},
            "subArea0": {
                "name": "FIRE",
                "pvs": {
                    "pv0": "$(DEMO_ALARMS_IOC):building_fire"
                }
            },
            "subArea1": {
                "name": "HVAC",
                "pvs": {
                    "pv0": "$(DEMO_ALARMS_IOC):building_airtemp",
                    "pv1": "$(DEMO_ALARMS_IOC):building_airhumidity",
                    "pv2": "$(DEMO_ALARMS_IOC):building_airpressure_diff"
                }
            },
        ...(more)
```

This files defines the alarm handler hierarchy. Here the areas and subAreas and the respective pvs that belong to those areas or subAreas to seed the alarm database are defined.

The pvList.json is an array of areas, and can be seen as:

```bash
    [
        { 
            area0_Object
        },
        { 
            area1_Object
        },
        ...
        { 
            area{n}_Object
        },
    ]
```

where each area{n} object is defined as:

```bash
    {
        "area": "Area Name",
        "pvs":{ 
            Object of pvs that belong to area 
        },
        "subArea0": {
            subArea0_Object
        },
        ...
        "subArea{k}": {
            subArea{k}_Object
        }
    }
```

where each pvs object is defined as:

```bash
    {
        "pv0": "pv0_name",
        "pv1": "pv1_name",
        ...
        "pv{q}": "pv{q}_name"
    }
```

and each subArea{k} object is defined as:

```bash
    {
        "name": "SubArea Name",
        "pvs": {
            Object of pvs that belong to subArea
        }
    }
```

From these definitions it is clear that a user can define a custom number of areas, each with a custom number of pvs and subAreas.

**NOTE:** It is currently not possible to add or remove areas, subAreas or pvs in a controlled manner from the front end (user interface). It is envisaged that this will be done before the beta release.

<br/>
**users.json**

```bash
[
    {
        "name": "User One",
        "username": "user1",
        "email": "user1@example.com",
        "notifyPVs": [
            "amplitude\\b",
            "vault",
            "cyclotron.*RF",
            "cyclotron.*RF\\d",
            "air.*press",
            "SLIT.*2"
        ]
    },
    {
        "name": "User Two",
        "username": "user2",
        "email": "user2@example.com",
        "notifyPVs": [
            "radiation",
            "^testIOC.*STR",
            "SLIT.*Gap",
            "vault"
        ]
    },
    ...(more)
]
```

This file defines the users for the alarm handler user notification system.

The users.json is an array of users, where each user object is defined as:

```bash
    {
        "name": "Name of user",
        "username": "React Automation Studio username",
        "email": "Notify email address",
        "notifyPVs": [
            Array of regex expressions of pvs to notify user on
        ]
    }
```

See the alarm handler user guide for more information on the notification regex expressions.

**NOTE:** It is currently not possible to add or remove users in a controlled manner from the front end (user interface). It is envisaged that this will be done before the beta release.