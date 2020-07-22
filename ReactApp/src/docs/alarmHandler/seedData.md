The first time the alarm handler is run an alarm database is created and initialised with seed data from three json files.

These files can be found, from the React Automation Studio root folder, at:
```bash
    ./alarmHandlerServer/initDBData/config.json
    ./alarmHandlerServer/initDBData/pvList.json
    ./alarmHandlerServer/initDBData/users.json
```

**NOTE:** Subsequent changes to these files will only take effect if you delete the existing alarm database or prune the Docker volume attached to the MongoDB server on which the alarm database resides. **This will result in all data stored in the previous alarm database being deleted permanently!** For this reason it is recommended that you set these files up correctly before starting the alarm server.