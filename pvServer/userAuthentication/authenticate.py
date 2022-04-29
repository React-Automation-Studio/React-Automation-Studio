import bcrypt, jwt, json, os, random, re, string, threading
from google.oauth2 import id_token
from google.auth.transport import requests
from datetime import datetime, timedelta
from time import sleep
from pyMongoUtils import OpenMongoDbClient

global dbKnownUsers


def usersDbWatchThread():
    global UAGS, knownUsers
    client = OpenMongoDbClient("ADMIN_DATABASE", "rasAdminDb")
    mydb = client["rasAdminDb"]
    mycol = mydb["users"]
    with mycol.watch() as stream:
        while stream.alive:
            change = stream.try_next()
            if change is not None:
                try:
                    doc = mycol.find({}, {"_id": 0})
                    users = list(doc)
                    UAGS["users"] = users
                    knownUsers = createKnownUsers(UAGS)
                except:
                    log.error("Unexpected error: {}", sys.exc_info()[0])
                    raise
            sleep(1)


def pvAccessDbWatchThread():
    global UAGS, knownUsers
    client = OpenMongoDbClient("ADMIN_DATABASE", "rasAdminDb")
    mydb = client["rasAdminDb"]
    mycol = mydb["pvAccess"]
    with mycol.watch() as stream:
        while stream.alive:
            change = stream.try_next()
            if change is not None:
                try:
                    doc = mycol.find_one()
                    UAGS["userGroups"] = doc["userGroups"]
                    defaultAccess = loadDefaultAccess()
                    UAGS["userGroups"]["PREVENT"] = defaultAccess["userGroups"][
                        "PREVENT"
                    ]
                    knownUsers = createKnownUsers(UAGS)
                except:
                    log.error("Unexpected error: {}", sys.exc_info()[0])
                    raise
            sleep(1)


def loadKnownDbUsers():
    global UAGS, knownUsers
    UAGS = {}
    client = OpenMongoDbClient("ADMIN_DATABASE", "rasAdminDb")
    mydb = client["rasAdminDb"]
    mycol = mydb["users"]
    doc = mycol.find({}, {"_id": 0})
    users = list(doc)
    UAGS["users"] = users
    mycol = mydb["pvAccess"]
    doc = mycol.find_one()
    UAGS["userGroups"] = doc["userGroups"]
    defaultAccess = loadDefaultAccess()
    UAGS["userGroups"]["PREVENT"] = defaultAccess["userGroups"]["PREVENT"]
    knownUsers = createKnownUsers(UAGS)
    threading.Thread(target=pvAccessDbWatchThread).start()
    threading.Thread(target=usersDbWatchThread).start()


def randomString(stringLength=10):
    """Generate a random string of fixed length"""
    letters = string.ascii_lowercase
    return "".join(random.choice(letters) for i in range(stringLength))


try:
    SECRET_PWD_KEY = str(os.environ["SECRET_PWD_KEY"])
except:
    print(
        "Warning SECRET_PWD_KEY not set using the default key, please set the"
        " SECRET_PWD_KEY in the .env file"
    )
    SECRET_PWD_KEY = (  # can no longer user randomized string due to load balancing
        "ugZnU^E3Fr4gapj^?zH%V5&H}A]*{mC]#>/nY_?ceSt$?99PL[md+29]:$dn)3#X"
    )


def createKnownUsers(UAGS):
    global SECRET_PWD_KEY
    try:
        users = UAGS["users"]
        knownUsers = {}
        index = 0
        for userid in users:
            knownUsers["user " + str(index)] = {
                "username": userid["username"],
                "password": userid["password"],
                "enabled": userid["enabled"],
            }
            index = index + 1
        return knownUsers
    except Exception as e:
        print(e)
        # print("createKnownUser UAGS['users']",UAGS['users'])
        # print("createKnownUsers:Error Cant load file USERS")
        return None


def createRefreshToken(username, max_age):
    global SECRET_PWD_KEY
    now = datetime.utcnow()
    advanced = timedelta(seconds=max_age)
    exp = now + advanced
    refreshToken = str(
        jwt.encode(
            {"username": username, "exp": exp}, SECRET_PWD_KEY, algorithm="HS256"
        ).decode("utf-8")
    )
    return refreshToken


def createAccessToken(username, max_age, roles):
    global SECRET_PWD_KEY
    now = datetime.utcnow()
    advanced = timedelta(seconds=max_age)
    exp = now + advanced
    accessToken = str(
        jwt.encode(
            {"username": username, "exp": exp, "roles": str(roles)},
            SECRET_PWD_KEY,
            algorithm="HS256",
        ).decode("utf-8")
    )
    return accessToken


def loadPvAccess():
    try:
        path = "userAuthentication/users/pvAccess.json"
        timestamp = os.path.getmtime(path)
        with open(path) as json_file:
            data = json.load(json_file)
            data["timestamp"] = str(timestamp)
            return data
    except:
        print("Error Cant load file pvAccess.json")
        return None


def loadDefaultAccess():
    try:
        path = "userAuthentication/defaultAccess.json"
        timestamp = os.path.getmtime(path)
        with open(path) as json_file:
            data = json.load(json_file)
            data["timestamp"] = str(timestamp)
            return data
    except:
        print("Error Cant load file defaultAccess.json")
        return None


def loadUsers():
    try:
        path = "userAuthentication/users/users.json"
        timestamp = os.path.getmtime(path)
        with open(path) as json_file:
            data = json.load(json_file)
            data["timestamp"] = str(timestamp)
            return data
    except:
        print("Error Cant load file users.json")
        return None


REACT_APP_DisableLogin = not (os.getenv("REACT_APP_EnableLogin") == "true")
if not REACT_APP_DisableLogin:
    UAGS = {}
    loadKnownDbUsers()
    # print("UAGS",json.dumps(UAGS, indent=4,))


def checkPermissions(pvname, username):
    global UAGS
    permissions = {"read": False, "write": False, "roles": []}

    def checkUAGPermision(pvname, username, UAGS, uag, permissions):
        for usernames in UAGS["userGroups"][uag]["usernames"]:
            if (username == usernames) or (usernames == "*"):
                for rules in UAGS["userGroups"][uag]["rules"]:
                    match = re.search(str(rules["rule"]), str(pvname))
                    if match:
                        permissions["read"] = rules["read"]
                        permissions["write"] = rules["write"]
                if "roles" in UAGS["userGroups"][uag]:
                    for roles in UAGS["userGroups"][uag]["roles"]:
                        permissions["roles"].append(roles)
        return permissions

    UAGslist = list(UAGS["userGroups"].keys())
    permissions = checkUAGPermision(
        pvname, username, UAGS, "DEFAULT", permissions
    )  # apply default permission first
    for uag in UAGslist:  # apply all other  permissions
        if not (uag in ["ADMIN", "DEFAULT"]):
            permissions = checkUAGPermision(pvname, username, UAGS, uag, permissions)
    permissions = checkUAGPermision(
        pvname, username, UAGS, "ADMIN", permissions
    )  # apply applicable admin
    return permissions


def checkUserRole(username):
    global UAGS
    roles = []
    for uag in list(UAGS["userGroups"].keys()):
        for usernames in UAGS["userGroups"][uag]["usernames"]:
            if (username == usernames) or (usernames == "*"):
                if "roles" in UAGS["userGroups"][uag]:
                    for role in UAGS["userGroups"][uag]["roles"]:
                        roles.append(role)
    return roles


def checkUser(username):
    global UAGS
    for user in UAGS["users"]:
        if username == user["username"]:
            if user["enabled"]:
                return True
            else:
                return False

    return False


def AutheriseUserAndPermissions(encodedJWT, pvname):
    global SECRET_PWD_KEY, UAGS
    try:
        decoded = jwt.decode(encodedJWT, SECRET_PWD_KEY)
        username = decoded["username"]
        if checkUser(username):
            permissions = checkPermissions(pvname, username)
            d = {"userAuthorised": True, "permissions": permissions}
            return d
        else:
            return {"userAuthorised": False}

    except Exception as e:
        return {"userAuthorised": False}


def checkIfAdmin(encodedJWT):
    global SECRET_PWD_KEY, UAGS
    try:
        decoded = jwt.decode(encodedJWT, SECRET_PWD_KEY)
        username = decoded["username"]
        adminUsers = UAGS["userGroups"]["ADMIN"]["usernames"]
        if username in adminUsers:
            return True
        else:
            return False

    except Exception as e:
        return False


def AuthoriseUser(encodedJWT):
    global SECRET_PWD_KEY, UAGS
    try:
        decoded = jwt.decode(encodedJWT, SECRET_PWD_KEY)
        username = decoded["username"]
        if checkUser(username):
            roles = checkUserRole(username)
            return {"authorised": True, "username": username, "roles": roles}
        else:
            return {"authorised": False}
    except Exception as e:
        print("AuthoriseUser", e)
        return {"authorised": False}


def LocalAuthenticateUser(user):
    global knownUsers
    if knownUsers != None:
        for userId in knownUsers:
            username = knownUsers[userId]["username"]
            if user["username"] == username:
                try:
                    if knownUsers[userId]["enabled"]:
                        if bcrypt.checkpw(
                            user["password"].encode("utf-8"),
                            knownUsers[userId]["password"].encode("utf-8"),
                        ):
                            roles = checkUserRole(username)

                            return {"username": username, "roles": roles}
                    else:
                        return None
                except:
                    return None
        print("Unknown user:" + str(user["username"]))
        return None
    return None


def ExternalAuthenticateUser(user):
    global knownUsers
    if knownUsers != None:
        for userId in knownUsers:
            username = knownUsers[userId]["username"]

            if user["username"] == username:
                if knownUsers[userId]["enabled"]:
                    roles = checkUserRole(username)
                    return {"username": username, "roles": roles}
                else:
                    return None

        print("Uknown user:" + str(user["username"]))
        return None
    return None


def decodeTokenGoogle(token, CLIENT_ID):
    try:
        # Specify the CLIENT_ID of the app that accesses the backend:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

        # Or, if multiple clients access the backend server:
        # idinfo = id_token.verify_oauth2_token(token, requests.Request())
        # if idinfo['aud'] not in [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]:
        #     raise ValueError('Could not verify audience.')

        # If auth request is from a G Suite domain:
        # if idinfo['hd'] != GSUITE_DOMAIN_NAME:
        #     raise ValueError('Wrong hosted domain.')

        # ID token is valid. Get the user's Google Account ID from the decoded token.

        return idinfo
    except Exception as e:
        print(e)
        # Invalid token
        return None
