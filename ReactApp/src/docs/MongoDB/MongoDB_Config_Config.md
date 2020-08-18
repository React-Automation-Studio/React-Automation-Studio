The MongoDB configuration settings can be changed by declaring the relevant parameter name and value as environment variables.

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
**Changing replica set name:**

Edit .env file and set new name:
```bash
    REPLICA_SET_NAME=myCustomRS
```
NOTE: In order for the change of replica set name to take effect, the Docker volumes related to the MongoDB will need to be pruned (deleted). **This will result in all data stored in these databases being deleted permanently!** For this reason it is recommended that the MongoDB replica set name is set as desired before deploying into production or saving critical data onto the databases. Please refer to the [Docker volumes] (https://docs.docker.com/storage/volumes/) documentation and to the [Docker documentation on how to backup, restore or migrate data volumes](https://docs.docker.com/storage/volumes/#backup-restore-or-migrate-data-volumes) for more info.

<br/>
**Updating members of the replica set:**

Edit .env file and list all {n} members (comma delimited):
```bash
    REPLICA_SET_MEMBERS=hostname1:port1,hostname2:port2,...hostname{n}:port{n}
```