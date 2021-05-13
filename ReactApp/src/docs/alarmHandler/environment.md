The alarm server is deployed with the following default parameters:

<br/>
<center>
| Parameter Name                      | Default           | Description                                                                                                                         |
| ----------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| ALARM\_DATABASE                     | localhost         | Hostname of MongoDB server where the alarm database is deployed.                                                                    |
| ALARM\_DATABASE\_REPLICA\_SET\_NAME | devrs             | Replica set name of MongoDB server where the alarm database is deployed.                                                            |
| MONGO\_INITDB\_ALARM\_DATABASE      | demoAlarmDatabase | MongoDB alarm database name. If this database does not exist on the MongoDB server it is created and initialised with seed data (see next section for details on seed data) on first run of the alarm handler.
| | |
| AH\_DEBUG | false | Directive to print additional data useful for debugging the alarm handler to the terminal
| AH\_TZ | Etc\/UTC (Canonical +00:00) | Time zone setting for alarm handler server. This is used when dates are formatted to strings for notification. Set as per https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
| | |
| | |
| SMTP_HOST | | SMTP server hostname. Required for alarm handler to notify alarm events via email
| SMTP_PORT | | SMTP server port number. Required for alarm handler to notify alarm events via email
| SMTP_SENDER | | SMTP sender email address. Required for alarm handler to notify alarm events via email
| SMTP_USER | | Username to log into SMTP server. Optional - leave blank if no login required
| SMTP_PASS | | Password to log into SMTP server. Optional - leave blank if no login required
| | |
| | |
| SIGNAL\_CLI\_REST\_API\_PORT | 8000 | Python signal-cli-rest-api port
| SIGNAL\_ACC\_NUMBER |  | Mobile number used for Signal account. Must be in E.164 format as per https://en.wikipedia.org/wiki/E.164
</center>
<center>*Table 1: Default alarm server configuration*</center>
<br/><br/>

The configuration settings above can be changed by declaring the relevant parameter name and value as environment variables.

In the React Automation Studio root folder:

Check if the .env file exists:
```bash
    ls .env
```
If the .env file does not exist in the root folder then copy example file provided:
```bash
    cp example.env .env
```

<br/>
**Changing MongoDB alarm database name:**

Edit .env file and set new name:
```bash
    MONGO_INITDB_ALARM_DATABASE=myCustomAlarmDatabase
```

<br/>
**Setting directive to print alarm handler debug data to terminal:**

Edit .env file and set:
```bash
    AH_DEBUG=true
```

<br/>
**Setting local timezone:**

Edit .env file and set new timezone (as per https://en.wikipedia.org/wiki/List_of_tz_database_time_zones):
```bash
    AH_TZ=America/Chicago
```

<br/>

**NOTE:** If the alarm database name is changed, upon restart of the alarm handler, a new database with the set name is created and initialised with seed data (see next section for details on seed data). **The alarm server will no longer point to the previous alarm database and historical alarm data will not be accessible!** For this reason it is recommended that the alarm database name is set as desired before deploying into production or saving critical data onto the database.

The previous database will still exist on the MongoDB server and can be viewed/deleted via MongoDB Compass or by pruning the Docker volume attached to the MongoDB server on which the alarm database resides. Please refer to the [Docker volumes] (https://docs.docker.com/storage/volumes/) documentation and to the [Docker documentation on how to backup, restore or migrate data volumes](https://docs.docker.com/storage/volumes/#backup-restore-or-migrate-data-volumes) for more info.

<br/><br/>
For all other settings: edit the .env file and follow the same steps as above, parameter names as shown in Table 1 and sample values shown in the example.env file.