from pymongo import MongoClient
from pymongo.errors import OperationFailure
from time import sleep
import os

REPLICA_SET_NAME = os.environ['REPLICA_SET_NAME']
REPLICA_SET_MEMBERS = os.environ['REPLICA_SET_MEMBERS'].split(',')
print("REPLICA_SET_NAME", REPLICA_SET_NAME)
print("REPLICA_SET_MEMBERS", REPLICA_SET_MEMBERS)

try:
    MONGO_INITDB_ROOT_USERNAME = os.environ['MONGO_INITDB_ROOT_USERNAME']
    MONGO_INITDB_ROOT_PASSWORD = os.environ['MONGO_INITDB_ROOT_PASSWORD']
    MONGO_INITDB_ROOT_USERNAME = urllib.parse.quote_plus(
        MONGO_INITDB_ROOT_USERNAME)
    MONGO_INITDB_ROOT_PASSWORD = urllib.parse.quote_plus(
        MONGO_INITDB_ROOT_PASSWORD)
    mongoAuth = True
except:
    mongoAuth = False

if (mongoAuth):
    client = MongoClient(
        'mongodb://%s:%s@%s' %
        (MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, REPLICA_SET_MEMBERS[0]))
else:
    client = MongoClient('mongodb://%s' % (REPLICA_SET_MEMBERS[0]))

config_document = {
    "_id": REPLICA_SET_NAME,
    "members": []
}
id = 0
for MEMBER in REPLICA_SET_MEMBERS:
    config_document["members"].append({
        "_id": id,
        "host": MEMBER
    })
    id += 1

try:
    replMembers = []
    for member in client.admin.command({"replSetGetStatus": 1})["members"]:
        replMembers.append(member["name"])
    print("Replset already instantiated")
    if(replMembers == REPLICA_SET_MEMBERS):
        print("All replica set members remain the same")
        print(
            "Mongo setup complete. Exiting mongosetup docker service. [mongodb still running!]")
    else:
        print("Replica set members have changed")
        print("Existing member list:", replMembers)
        print("New member list:", REPLICA_SET_MEMBERS)
        reConfig = client.admin.command({"replSetGetConfig": 1})["config"]
        reConfig["members"] = config_document["members"]
        reConfig["version"] += 1
        client.admin.command(
            {
                "replSetReconfig": reConfig,
                "force": True
            }
        )
        print("Replset successfully reconfigured.")
        print(client.admin.command({"replSetGetStatus": 1})["members"])
        print("Replset successfully reconfigured.")
        print(
            "Mongo setup complete. Exiting mongosetup docker service. [mongodb still running!]")


except OperationFailure as err:
    if("no replset config" in str(err)):
        print("Initialising new mongodb replset.")
        replSetOkay = False
        while(not replSetOkay):
            try:
                client.admin.command({"replSetInitiate": config_document})
                print("Replset successfully instantiated.")
                print(client.admin.command({"replSetGetStatus": 1})["members"])
                print("Replset successfully instantiated.")
                print(
                    "Mongo setup complete. Exiting mongosetup docker service. [mongodb still running!]")
                replSetOkay = True
            except OperationFailure as err:
                if("replSetInitiate quorum check failed" in str(err)):
                    print("Waiting for replSetInitiate quorum")
                    sleep(1)
                    pass
                else:
                    print(err)
    else:
        print(err)
