#!/usr/bin/env python
from gevent import monkey

monkey.patch_all()

import bcrypt
import json
import ldap
import os
import time
import threading
import sys
from bson.json_util import dumps
from bson.objectid import ObjectId
from datetime import datetime
from dotenv import load_dotenv
from epics import PV
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room, disconnect
from urllib import parse, request as urlrequest
from werkzeug.routing import BaseConverter
import numpy as np


sys.path.insert(0, "../")
sys.path.insert(0, "userAuthentication/")

import log
from authenticate import (
    AuthoriseUser,
    AutheriseUserAndPermissions,
    checkIfAdmin,
    LocalAuthenticateUser,
    ExternalAuthenticateUser,
    decodeTokenGoogle,
    createRefreshToken,
    createAccessToken,
)
from pyMongoUtils import open_mongo_db_client


class RegexConverter(BaseConverter):
    def __init__(self, url_map, *items):
        super(RegexConverter, self).__init__(url_map)
        self.regex = items[0]


load_dotenv()
# Set this variable to "threading", "eventlet" or "gevent" to test the
# different async modes, or leave it set to None for the application to choose
# the best option based on installed packages.

async_mode = "gevent"

EPICS_LIBCA = os.getenv("PYEPICS_LIBCA", None)
EPICS_BASE = os.getenv("EPICS_BASE", None)
EPICS_CA_ADDR_LIST = os.getenv("EPICS_CA_ADDR_LIST", None)
PV_SERVER_URL = os.getenv("pvServerURL", None)
PV_SERVER_PORT = os.getenv("pvServerPort", None)
PV_SERVER_NAME_SPACE = os.getenv("pvServerNameSpace", None)
PV_SERVER_LOG_LEVEL = os.getenv("pvServerLogLevel", None)
PV_SERVER_LOG_FILE = os.getenv("pvServerLogFile", None)
PV_SERVER_LOG_FILE_SIZE = os.getenv("pvServerLogFileSize", None)
PV_SERVER_LOG_FILE_BACKUP = os.getenv("pvServerLogFileBackup", None)
REACT_ENABLE_LOGIN = os.getenv("VITE_EnableLogin", None)
REACT_ENABLE_LOGIN_AD = os.getenv("VITE_EnableActiveDirectoryLogin", None)
REACT_ENABLE_LOGIN_GOOGLE = os.getenv("VITE_EnableGoogleLogin", None)
REACT_DISABLE_STANDARD_LOGIN = os.getenv("VITE_DisableStandardLogin", None)

log.info("")
log.info("**************************************")
log.info("React Automation Studio V5.2.0")
log.info("")
log.info("pvServer Environment Variables:")
log.info("")
log.info(f"PYEPICS_LIBCA: {EPICS_LIBCA}")
log.info(f"EPICS_BASE: {EPICS_BASE}")
log.info(f"EPICS_CA_ADDR_LIST: {EPICS_CA_ADDR_LIST}")
log.info(f"pvServerURL: {PV_SERVER_URL}")
log.info(f"pvServerPort: {PV_SERVER_PORT}")
log.info(f"pvServerNameSpace: {PV_SERVER_NAME_SPACE}")
log.info(f"pvServerLogLevel: {PV_SERVER_LOG_LEVEL}")
log.info(f"pvServerLogFile: {PV_SERVER_LOG_FILE}")
log.info(f"pvServerLogFileSize: {PV_SERVER_LOG_FILE_SIZE}")
log.info(f"pvServerLogFileBackup: {PV_SERVER_LOG_FILE_BACKUP}")
log.info(f"VITE_EnableLogin: {REACT_ENABLE_LOGIN}")
log.info(f"VITE_EnableActiveDirectoryLogin: {REACT_ENABLE_LOGIN_AD}")
log.info(f"VITE_EnableGoogleLogin: {REACT_ENABLE_LOGIN_GOOGLE}")
log.info(f"VITE_DisableStandardLogin: {REACT_DISABLE_STANDARD_LOGIN}")


async_mode = "gevent"

try:
    REFRESH_COOKIE_MAX_AGE_SECS = int(os.environ["REFRESH_COOKIE_MAX_AGE_SECS"])
except:
    REFRESH_COOKIE_MAX_AGE_SECS = 604800
    log.info(
        "Refresh cookie max age not set - defaulting to"
        f" {REFRESH_COOKIE_MAX_AGE_SECS} seconds"
    )
log.info(f"REFRESH_COOKIE_MAX_AGE_SECS: {REFRESH_COOKIE_MAX_AGE_SECS}")


try:
    ACCESS_TOKEN_MAX_AGE_SECS = int(os.environ["ACCESS_TOKEN_MAX_AGE_SECS"])
except:
    ACCESS_TOKEN_MAX_AGE_SECS = 300
    log.info(
        "Access token max age not set - defaulting to"
        f" {ACCESS_TOKEN_MAX_AGE_SECS} seconds"
    )
log.info(f"ACCESS_TOKEN_MAX_AGE_SECS: {ACCESS_TOKEN_MAX_AGE_SECS}")

try:
    REFRESH_TIMEOUT = int(os.environ["REFRESH_TIMEOUT"])
except:
    REFRESH_TIMEOUT = 60
    log.info(f"Refresh time out not set - defaulting to {REFRESH_TIMEOUT} seconds")
log.info(f"REFRESH_TIMEOUT: {REFRESH_TIMEOUT}")

try:
    SECURE = os.getenv("SECURE") == "true"
except:
    SECURE = False
log.info(f"SECURE - {SECURE}")
log.info("")

VITE_DisableLogin = not (REACT_ENABLE_LOGIN == "true")
VITE_EnableActiveDirectoryLogin = REACT_ENABLE_LOGIN_AD == "true"
VITE_EnableGoogleLogin = REACT_ENABLE_LOGIN_GOOGLE == "true"
VITE_DisableStandardLogin = REACT_DISABLE_STANDARD_LOGIN == "true"
if VITE_DisableLogin:
    log.info("Authentication and Authorization is DISABLED")
else:
    log.info("Authentication and Authorization is ENABLED")
log.info("")

app = Flask(__name__, static_folder="./build/static", template_folder="./build")
app.url_map.converters["regex"] = RegexConverter
CORS(app)
socketio = SocketIO(app, async_mode=async_mode, cors_allowed_origins="*")
thread = None
thread_lock = threading.Lock()
clientPVlist = {}
clientDbWatchList = {}
myuid = 0
myDbWatchUid = 0

# AUTH ENDPOINTS AND FUNCTIONS


def create_login_response(userData):
    global REFRESH_COOKIE_MAX_AGE_SECS, ACCESS_TOKEN_MAX_AGE_SECS, REFRESH_TIMEOUT, SECURE
    if userData is None:
        return jsonify({"login": False}), 401
    username = userData["username"]
    roles = userData["roles"]
    refreshToken = createRefreshToken(username, REFRESH_COOKIE_MAX_AGE_SECS)
    accessToken = createAccessToken(username, ACCESS_TOKEN_MAX_AGE_SECS, roles)
    d = {
        "login": True,
        "username": username,
        "roles": roles,
        "accessToken": accessToken,
        "refreshTokenConfig": {
            "refreshTimeout": REFRESH_TIMEOUT,
            "useCookie": SECURE,
        },
    }
    if not SECURE:
        d["refreshTokenConfig"]["refreshToken"] = refreshToken
    resp = make_response(jsonify(d))
    if SECURE:
        resp.set_cookie(
            key="refreshToken",
            value=refreshToken,
            max_age=REFRESH_COOKIE_MAX_AGE_SECS,
            secure=True,
            httponly=True,
            samesite=None,
        )
    return resp, 200


@app.route("/api/logout", methods=["GET"])
def logout():
    res = make_response(jsonify({"logout": True}))
    res.set_cookie("refreshToken", "", max_age=0)
    return res, 200


@app.route("/api/refresh", methods=["POST"])
def refresh():
    global SECURE
    if SECURE:
        refreshToken = request.cookies.get("refreshToken")
    else:
        refreshToken = request.json.get("refreshToken")
    if not (refreshToken is None):
        userData = AuthoriseUser(refreshToken)
        log.debug("userData {}", userData)
        if userData["authorised"]:
            resp = create_login_response(userData)
            return resp
        else:
            return jsonify({"login": False}), 401
    else:
        return jsonify({"login": False}), 401


@app.route("/api/login/local", methods=["POST"])
def login_local():
    global VITE_DisableStandardLogin
    if not VITE_DisableStandardLogin:
        user = request.json.get("user", None)
        userData = LocalAuthenticateUser(user)
        resp = create_login_response(userData)
        return resp
    else:
        log.info("Standard login not allowed")
        return jsonify({"login": False}), 401


@app.route("/api/login/ldap", methods=["POST"])
def login_ldap():
    log.debug("request ip: {}", request.remote_addr)
    global VITE_EnableActiveDirectoryLogin
    if VITE_EnableActiveDirectoryLogin:
        user = request.json.get("user", None)
        LDAP_HOST = os.getenv("LDAP_HOST")
        LDAP_PORT = os.getenv("LDAP_PORT")
        LDAP_USER_DN = user["username"]
        LDAP_USER_PW = user["password"]
        try:
            con = ldap.initialize(LDAP_HOST + ":" + LDAP_PORT)
            con.bind(LDAP_USER_DN, LDAP_USER_PW, ldap.AUTH_SIMPLE)
            if con.result():
                userData = ExternalAuthenticateUser(user)
                resp = create_login_response(userData)
                return resp
            else:
                log.info("Ldap login failed: {} ", LDAP_USER_DN)
                jsonify({"login": False}), 401
        except Exception as e:
            log.info("Ldap login error", e)
            log.info("Ldap login failed: {} ", LDAP_USER_DN)
            jsonify({"login": False}), 401
            return jsonify({"login": False}), 401
    else:
        log.info("Forbiddden Active Directory login login")
        return jsonify({"login": False}), 401


@app.route("/api/login/google", methods=["POST"])
def login_google():
    global VITE_EnableGoogleLogin
    if VITE_EnableGoogleLogin:
        jwt = request.json.get("jwt", None)
        VITE_EnableGoogleLoginId = (
            os.getenv("VITE_EnableGoogleLoginId")
            if os.getenv("VITE_EnableGoogleLoginId")
            else None
        )
        if VITE_EnableGoogleLoginId:
            decoded = decodeTokenGoogle(jwt, VITE_EnableGoogleLoginId)
            if decoded:
                if decoded["email"] and (decoded["email_verified"] == True):
                    userData = ExternalAuthenticateUser({"username": decoded["email"]})
                    resp = create_login_response(userData)
                    return resp
        else:
            return jsonify({"login": False}), 401
        return jsonify({"login": False}), 401
    else:
        log.info("Forbiddden google login")
        return jsonify({"login": False}), 401


# PV CONNECTION ENDPOINTS AND EVENTS


def check_pv_initialized_after_disconnect():
    global clientPVlist, clientDbWatchList
    while True:
        for pvname in list(clientPVlist):
            if not (
                (len(clientPVlist[pvname]["sockets"]) > 0)
                or (len(clientPVlist[pvname]["socketsRW"]) > 0)
                or (len(clientPVlist[pvname]["socketsRO"]) > 0)
            ):
                log.debug("{} has no listening clients, removing", pvname)
                clientPVlist[pvname]["pv"].disconnect()
                clientPVlist.pop(pvname)
            else:
                if clientPVlist[pvname]["initialized"] == False:
                    if clientPVlist[pvname]["isConnected"]:
                        if clientPVlist[pvname]["useBinaryValue"]:
                            clientPVlist[pvname]["pv"].get(as_numpy=True)
                            d = clientPVlist[pvname]["pv"].get_with_metadata(
                                as_numpy=True, with_ctrlvars=True, use_monitor=True
                            )
                        else:
                            clientPVlist[pvname]["pv"].get(
                                as_string=True, as_numpy=False
                            )
                            d = clientPVlist[pvname]["pv"].get_with_metadata(
                                with_ctrlvars=True, use_monitor=True, as_numpy=False
                            )
                        if (clientPVlist[pvname]["pv"].value) is not None:
                            if d is not None:
                                for keys in d:
                                    if str(d[keys]) == "nan":
                                        d[keys] = None
                                if clientPVlist[pvname]["useBinaryValue"]:
                                    if isinstance(d["value"], np.ndarray):
                                        d["value"] = d[
                                            "value"
                                        ].tobytes()  # convert numpy array to binary
                                else:
                                    if clientPVlist[pvname]["pv"].count > 1:
                                        if isinstance(d["value"], np.ndarray):
                                            d["value"] = d["value"].tolist()
                                        else:
                                            d["value"] = list(d["value"])
                                    if clientPVlist[pvname]["pv"].count == 0:
                                        d["value"] = []
                                    if clientPVlist[pvname]["pv"].count == 1:
                                        new_char_value = str(d["char_value"])
                                        if len(new_char_value) == 0:
                                            new_char_value = str(d["value"])
                                        d["char_value"] = new_char_value
                                d["pvname"] = pvname
                                d["newmetadata"] = "True"
                                d["connected"] = "1"
                                d["emitter"] = "request_pv_info: pv not in list"
                                d["chid"] = str(d["chid"])
                                try:
                                    rw_room = str(pvname) + "rw"
                                    socketio.emit(
                                        pvname, d, room=rw_room, namespace="/pvServer"
                                    )
                                    d["write_access"] = False
                                    ro_room = str(pvname) + "ro"
                                    socketio.emit(
                                        pvname, d, room=ro_room, namespace="/pvServer"
                                    )
                                    clientPVlist[pvname]["isConnected"] = True
                                    clientPVlist[pvname]["initialized"] = True
                                except TypeError as e:
                                    # A type error exists in metadata dictionary
                                    # and can't be converted into JSON format,
                                    # previously this was caused by in CHID
                                    # of type c_long(), a work arround exits,
                                    # if CHID is not a c_long then try debugging
                                    log.error(
                                        "***EPICS PV info initial request info error: "
                                    )
                                    log.error("PV name: {}", pvname)
                                    log.error("Exception: {}", e)
                                    log.error(
                                        "A type error exists in metadata dictionary and"
                                        " can't be converted into JSON format,"
                                        " previously this was caused by in CHID of type"
                                        " c_long(), a work around exits, if CHID is not"
                                        " a c_long then try debugging"
                                    )
                                    clientPVlist[pvname]["isConnected"] = True
                                    clientPVlist[pvname]["initialized"] = False
                                    log.error("Type: {}", type(d["value"]))
                                    if "epics.dbr.c_float_Array_0" in str(
                                        type(d["value"])
                                    ):
                                        log.info("type is epics.dbr.c_float_Array_0")
                                    elif "epics.dbr.c_ubyte_Array_1" in str(
                                        type(d["value"])
                                    ):
                                        log.info("type is epics.dbr.c_ubyte_Array_1")
                                    d = {}
                                    d["pvname"] = pvname
                                    d["connected"] = "0"
                                    socketio.emit(
                                        pvname,
                                        d,
                                        room=str(pvname),
                                        namespace="/pvServer",
                                    )
                                except:
                                    log.exception("Unexpected error")
                                    raise
                    else:
                        if clientPVlist[pvname]["pv"].connect(timeout=0.002):
                            clientPVlist[pvname]["isConnected"] = True

        time.sleep(0.1)


def db_watch_control_thread():
    global clientDbWatchList, thread_lock
    last_watch_list_length = 0
    while True:
        watchList = list(clientDbWatchList)

        watch_list_length = len(watchList)
        if watch_list_length != last_watch_list_length:
            last_watch_list_length = watch_list_length
            log.debug("clientDbWatchList length is {}", watch_list_length)

        for watchEventName in watchList:
            if clientDbWatchList[watchEventName]["threadStarted"] is False:
                clientDbWatchList[watchEventName]["thread"] = threading.Thread(
                    target=db_watch_thread, args=[watchEventName]
                ).start()
                clientDbWatchList[watchEventName]["threadStarted"] = True
                clientDbWatchList[watchEventName]["closeWatch"] = False
            with thread_lock:
                if len(clientDbWatchList[watchEventName]["sockets"]) == 0:
                    if clientDbWatchList[watchEventName]["closeWatch"] == False:
                        clientDbWatchList[watchEventName]["closeWatch"] = True
                if clientDbWatchList[watchEventName]["threadClosed"] == True:
                    clientDbWatchList.pop(watchEventName)
        time.sleep(0.1)


def db_watch_thread(watchEventName):
    global clientDbWatchList
    exitThread = False
    while exitThread == False:
        if watchEventName in clientDbWatchList:
            with clientDbWatchList[watchEventName]["watch"] as stream:
                while stream.alive:
                    change = stream.try_next()
                    if change is not None:
                        try:
                            query = clientDbWatchList[watchEventName]["query"]
                            projection = clientDbWatchList[watchEventName]["projection"]
                            sort = clientDbWatchList[watchEventName]["sort"]
                            skip = clientDbWatchList[watchEventName]["skip"]
                            limit = clientDbWatchList[watchEventName]["limit"]
                            count = clientDbWatchList[watchEventName]["count"]
                            if count:
                                doc = clientDbWatchList[watchEventName][
                                    "collection"
                                ].count_documents(query)
                            else:
                                doc = (
                                    clientDbWatchList[watchEventName]["collection"]
                                    .find(query, projection)
                                    .sort(sort)
                                    .skip(skip)
                                    .limit(limit)
                                )
                            data = dumps(doc)
                            eventName = watchEventName
                            dbURL = clientDbWatchList[watchEventName]["dbURL"]
                            d = {"dbURL": dbURL, "write_access": True, "data": data}
                            socketio.emit(
                                eventName,
                                d,
                                room=str(dbURL) + "rw",
                                namespace="/pvServer",
                            )
                            d = {"dbURL": dbURL, "write_access": False, "data": data}
                            socketio.emit(
                                eventName,
                                d,
                                room=str(dbURL) + "ro",
                                namespace="/pvServer",
                            )
                        except:
                            log.error("Unexpected error: {}", sys.exc_info()[0])
                            raise
                    if clientDbWatchList[watchEventName]["closeWatch"] == True:
                        clientDbWatchList[watchEventName]["watch"].close()
                    time.sleep(0.1)
                clientDbWatchList[watchEventName]["threadClosed"] = True
                exitThread = True
                time.sleep(0.1)


def on_change_value(
    pvname=None,
    count=None,
    char_value=None,
    severity=None,
    status=None,
    value=None,
    timestamp=None,
    **kw,
):
    global clientPVList
    if clientPVlist[pvname]["initialized"] == True:
        if clientPVlist[pvname]["useBinaryValue"]:
            if isinstance(value, np.ndarray):  # new check for numpy array
                new_char_value = str(char_value)
                if len(new_char_value) == 0:
                    new_char_value = str(value)

                socketio.emit(
                    pvname,
                    {
                        "pvname": pvname,
                        "newmetadata": "False",
                        "value": value.tobytes(),
                        "char_value": new_char_value,
                        "count": count,
                        "connected": "1",
                        "severity": severity,
                        "timestamp": timestamp,
                    },
                    room=str(pvname),
                    namespace="/pvServer",
                )

        elif float(count) == 1:
            new_char_value = str(char_value)
            if len(new_char_value) == 0:
                new_char_value = str(value)
            socketio.emit(
                pvname,
                {
                    "pvname": pvname,
                    "newmetadata": "False",
                    "value": str(value),
                    "char_value": new_char_value,
                    "count": count,
                    "connected": "1",
                    "severity": severity,
                    "timestamp": timestamp,
                },
                room=str(pvname),
                namespace="/pvServer",
            )
        else:
            new_char_value = str(char_value)
            if len(new_char_value) == 0:
                new_char_value = str(value)
            if isinstance(value, np.ndarray):
                value = value.tolist()
            d = {
                "pvname": pvname,
                "newmetadata": "False",
                "value": list((value)),
                "char_value": new_char_value,
                "count": count,
                "connected": "1",
                "severity": severity,
                "timestamp": timestamp,
            }
            socketio.emit(pvname, d, room=str(pvname), namespace="/pvServer")


def on_change_conn(pvname=None, conn=None, value=None, **kws):
    global clientPVlist
    if conn == True:
        try:
            clientPVlist[pvname]["isConnected"] = True
            clientPVlist[pvname]["initialized"] = False
        except:
            error = 1
    else:
        d = {}
        d["pvname"] = pvname
        d["connected"] = "0"
        d["emitter"] = "onConnectionChange: disconnected"
        try:
            clientPVlist[pvname]["isConnected"] = False
            clientPVlist[pvname]["initialized"] = False
            socketio.emit(pvname, d, room=str(pvname), namespace="/pvServer")
        except:
            error = 2


def background_thread():
    count = 0
    threading.Thread(target=check_pv_initialized_after_disconnect).start()
    threading.Thread(target=db_watch_control_thread).start()
    while True:
        socketio.sleep(0.1)


@socketio.on("write_to_pv", namespace="/pvServer")
def write_to_pv(message):
    global clientPVlist, thread_lock2, VITE_DisableLogin
    authenticated = False
    if VITE_DisableLogin:
        accessControl = {
            "userAuthorised": True,
            "permissions": {"read": True, "write": True},
        }
    else:
        accessControl = AutheriseUserAndPermissions(
            message["clientAuthorisation"], message["pvname"]
        )
        authenticated = accessControl["userAuthorised"]
    if accessControl["userAuthorised"]:
        if accessControl["permissions"]["write"]:
            pvname1 = str(message["pvname"])
            pvname2 = pvname1.replace("pva://", "")
            try:
                clientPVlist[pvname1]["pv"].put(message["data"])
            except Exception as e:
                log.error("***EPICS PV put error: ")
                log.error("PV name: {}", pvname2)
                log.error("Value to put: {}", message["data"])
                log.error("Exception: {}", e)
        else:
            log.warning("***PV put error: write access denied ")
            log.warning("PV name: {}", message["pvname"])
            log.warning("Value to put: {}", message["data"])
    else:
        socketio.emit("redirectToLogIn", room=request.sid, namespace="/pvServer")


@socketio.on("remove_pv_connection", namespace="/pvServer")
def remove_pv_connection(message):
    global clientPVlist, VITE_DisableLogin, myuid
    pvname1 = str(message["pvname"])
    authenticated = False
    if VITE_DisableLogin:
        authenticated = True
        accessControl = {
            "userAuthorised": True,
            "permissions": {"read": True, "write": True},
        }
    else:
        accessControl = AutheriseUserAndPermissions(
            message["clientAuthorisation"], pvname1
        )
        authenticated = accessControl["userAuthorised"]
    if accessControl["userAuthorised"]:
        if pvname1 in clientPVlist:

            def removePvId():
                pvConnectionId = str(message["pvConnectionId"])
                try:
                    if (
                        pvConnectionId
                        in clientPVlist[pvname1]["socketsRW"][request.sid][
                            "pvConnectionIds"
                        ]
                    ):
                        clientPVlist[pvname1]["socketsRW"][request.sid][
                            "pvConnectionIds"
                        ].pop(str(pvConnectionId))
                        if (
                            len(
                                clientPVlist[pvname1][""][request.sid][
                                    "pvConnectionIds"
                                ]
                            )
                            == 0
                        ):
                            leave_room(str(pvname1) + "rw")
                            clientPVlist[pvname1]["socketsRW"].pop(request.sid)
                except:
                    pass
                try:
                    if (
                        pvConnectionId
                        in clientPVlist[pvname1]["socketsRO"][request.sid][
                            "pvConnectionIds"
                        ]
                    ):
                        clientPVlist[pvname1]["socketsRO"][request.sid][
                            "pvConnectionIds"
                        ].pop(str(pvConnectionId))
                        if (
                            len(
                                clientPVlist[pvname1]["socketsRO"][request.sid][
                                    "pvConnectionIds"
                                ]
                            )
                            == 0
                        ):
                            leave_room(str(pvname1) + "ro")
                            clientPVlist[pvname1]["socketsRO"].pop(request.sid)
                except:
                    pass
                try:
                    if (
                        pvConnectionId
                        in clientPVlist[pvname1]["sockets"][request.sid][
                            "pvConnectionIds"
                        ]
                    ):
                        clientPVlist[pvname1]["sockets"][request.sid][
                            "pvConnectionIds"
                        ].pop(str(pvConnectionId))
                        if (
                            len(
                                clientPVlist[pvname1]["sockets"][request.sid][
                                    "pvConnectionIds"
                                ]
                            )
                            == 0
                        ):
                            leave_room(str(pvname1))
                            clientPVlist[pvname1]["sockets"].pop(request.sid)
                except:
                    pass

            time.sleep(3)  # wait for 3 seconds before removing a watch
            with thread_lock:
                removePvId()

        else:
            log.error("Pvname ({}) not in clientPVlist", pvname1)
    else:
        socketio.emit("redirectToLogIn", room=request.sid, namespace="/pvServer")


@socketio.on("request_pv_info", namespace="/pvServer")
def request_pv_info(message):
    global clientPVlist, VITE_DisableLogin, myuid
    pvname1 = str(message["data"])
    useBinaryValue = message["useBinaryValue"]
    pvname1 = pvname1.replace("pva://", "")  # work around for old prefix
    authenticated = False
    if VITE_DisableLogin:
        authenticated = True
        accessControl = {
            "userAuthorised": True,
            "permissions": {"read": True, "write": True},
        }
    else:
        accessControl = AutheriseUserAndPermissions(
            message["clientAuthorisation"], pvname1
        )
        authenticated = accessControl["userAuthorised"]
    if accessControl["userAuthorised"]:
        if not (pvname1 in clientPVlist):
            if accessControl["permissions"]["read"]:
                pv = PV(
                    pvname1,
                    connection_timeout=0.002,
                    connection_callback=on_change_conn,
                    auto_monitor=True,
                )
                pvlist = {}
                pvlist["pv"] = pv
                pvlist["isConnected"] = False
                pvlist["initialized"] = False
                pvlist["useBinaryValue"] = useBinaryValue
                if "pvConnectionId" in message:
                    pvConnectionId = str(message["pvConnectionId"])
                else:
                    myuid = myuid + 1
                    pvConnectionId = str(myuid)
                if accessControl["permissions"]["write"]:
                    join_room(str(pvname1) + "rw")
                    join_room(str(pvname1))
                    pvlist["sockets"] = {
                        request.sid: {"pvConnectionIds": {pvConnectionId: True}}
                    }
                    pvlist["socketsRW"] = {
                        request.sid: {"pvConnectionIds": {pvConnectionId: True}}
                    }
                    pvlist["socketsRO"] = {}
                else:
                    join_room(str(pvname1) + "ro")
                    join_room(str(pvname1))
                    pvlist["sockets"] = {
                        request.sid: {"pvConnectionIds": {pvConnectionId: True}}
                    }
                    pvlist["socketsRO"] = {
                        request.sid: {"pvConnectionIds": {pvConnectionId: True}}
                    }
                    pvlist["socketsRW"] = {}
                clientPVlist[pvname1] = pvlist
                clientPVlist[pvname1]["pv"].add_callback(on_change_value, index=0)
                log.debug(
                    "new pv {} generated pvConnectionId: {}", pvname1, pvConnectionId
                )
                return {"pvConnectionId": pvConnectionId}
        else:
            if accessControl["permissions"]["read"]:
                clientPVlist[pvname1]["initialized"] = False
                if "pvConnectionId" in message:
                    pvConnectionId = str(message["pvConnectionId"])
                else:
                    myuid = myuid + 1
                    pvConnectionId = str(myuid)
                if accessControl["permissions"]["write"]:
                    join_room(str(pvname1) + "rw")
                    join_room(str(pvname1))
                    if request.sid in clientPVlist[pvname1]["sockets"]:
                        if (
                            "pvConnectionIds"
                            in clientPVlist[pvname1]["sockets"][request.sid]
                        ):
                            if (
                                pvConnectionId
                                in clientPVlist[pvname1]["sockets"][request.sid][
                                    "pvConnectionIds"
                                ]
                            ):
                                log.info(
                                    "not a unique id {} {}", pvConnectionId, pvname1
                                )
                                log.debug(
                                    "allConnectionIds {}",
                                    clientPVlist[pvname1]["sockets"][request.sid][
                                        "pvConnectionIds"
                                    ],
                                )
                            else:
                                clientPVlist[pvname1]["sockets"][request.sid][
                                    "pvConnectionIds"
                                ][pvConnectionId] = True
                        else:
                            clientPVlist[pvname1]["sockets"][request.sid][
                                "pvConnectionIds"
                            ] = {pvConnectionId: True}
                    else:
                        clientPVlist[pvname1]["sockets"][request.sid] = {
                            "pvConnectionIds": {pvConnectionId: True}
                        }
                    if request.sid in clientPVlist[pvname1]["socketsRW"]:
                        if (
                            "pvConnectionIds"
                            in clientPVlist[pvname1]["socketsRW"][request.sid]
                        ):
                            if (
                                pvConnectionId
                                in clientPVlist[pvname1]["socketsRW"][request.sid][
                                    "pvConnectionIds"
                                ]
                            ):
                                log.info(
                                    "not a unique id RW {} {}", pvConnectionId, pvname1
                                )
                                log.debug(
                                    "allConnectionIds RW {}",
                                    clientPVlist[pvname1]["socketsRW"][request.sid][
                                        "pvConnectionIds"
                                    ],
                                )
                            else:
                                clientPVlist[pvname1]["socketsRW"][request.sid][
                                    "pvConnectionIds"
                                ][pvConnectionId] = True
                        else:
                            clientPVlist[pvname1]["socketsRW"][request.sid][
                                "pvConnectionIds"
                            ] = {pvConnectionId: True}
                    else:
                        clientPVlist[pvname1]["socketsRW"][request.sid] = {
                            "pvConnectionIds": {pvConnectionId: True}
                        }
                else:
                    join_room(str(pvname1) + "ro")
                    join_room(str(pvname1))
                    if request.sid in clientPVlist[pvname1]["sockets"]:
                        if (
                            "pvConnectionIds"
                            in clientPVlist[pvname1]["sockets"][request.sid]
                        ):
                            if (
                                pvConnectionId
                                in clientPVlist[pvname1]["sockets"][request.sid][
                                    "pvConnectionIds"
                                ]
                            ):
                                log.info(
                                    "not a unique id {} {}", pvConnectionId, pvname1
                                )
                                log.debug(
                                    "allConnectionIds {}",
                                    clientPVlist[pvname1]["sockets"][request.sid][
                                        "pvConnectionIds"
                                    ],
                                )
                            else:
                                clientPVlist[pvname1]["sockets"][request.sid][
                                    "pvConnectionIds"
                                ][pvConnectionId] = True
                        else:
                            clientPVlist[pvname1]["sockets"][request.sid][
                                "pvConnectionIds"
                            ] = {pvConnectionId: True}
                    else:
                        clientPVlist[pvname1]["sockets"][request.sid] = {
                            "pvConnectionIds": {pvConnectionId: True}
                        }
                    if request.sid in clientPVlist[pvname1]["socketsRO"]:
                        if (
                            "pvConnectionIds"
                            in clientPVlist[pvname1]["socketsRO"][request.sid]
                        ):
                            if (
                                pvConnectionId
                                in clientPVlist[pvname1]["socketsRO"][request.sid][
                                    "pvConnectionIds"
                                ]
                            ):
                                log.info(
                                    "not a unique id ro {} {}", pvConnectionId, pvname1
                                )
                                log.debug(
                                    "allConnectionIds ro {}",
                                    clientPVlist[pvname1]["socketsRO"][request.sid][
                                        "pvConnectionIds"
                                    ],
                                )
                            else:
                                clientPVlist[pvname1]["socketsRO"][request.sid][
                                    "pvConnectionIds"
                                ][pvConnectionId] = True
                        else:
                            clientPVlist[pvname1]["socketsRO"][request.sid][
                                "pvConnectionIds"
                            ] = {pvConnectionId: True}
                    else:
                        clientPVlist[pvname1]["socketsRO"][request.sid] = {
                            "pvConnectionIds": {pvConnectionId: True}
                        }
                return {"pvConnectionId": pvConnectionId}
    else:
        socketio.emit("redirectToLogIn", room=request.sid, namespace="/pvServer")


@socketio.on("connect", namespace="/pvServer")
def client_connect():
    global thread
    log.info("Client Connected: {}", request.sid)
    with thread_lock:
        if thread is None:
            thread = socketio.start_background_task(background_thread)
    emit("my_response", {"data": "Connected", "count": 0})


@socketio.on("disconnect", namespace="/pvServer")
def client_disconnect():
    global clientDbWatchList
    log.info("Client disconnected: {}", request.sid)
    for pvname1 in clientPVlist:
        try:
            leave_room(str(pvname1) + "rw")
            clientPVlist[pvname1]["socketsRW"].pop(request.sid)
        except:
            pass
        try:
            leave_room(str(pvname1) + "ro")
            clientPVlist[pvname1]["socketsRO"].pop(request.sid)
        except:
            pass
        try:
            leave_room(str(pvname1))
            clientPVlist[pvname1]["sockets"].pop(request.sid)
        except:
            log.debug("disconn sockets {}", clientPVlist[pvname1]["sockets"])
            log.debug("disconn socketsRO {}", clientPVlist[pvname1]["socketsRO"])
            log.debug("disconn socketsRW {}", clientPVlist[pvname1]["socketsRW"])
    try:
        log.debug(list(clientDbWatchList))
        for watchEventName in list(clientDbWatchList):
            socketId = str(request.sid)
            log.debug("socketId {} ({})", socketId, watchEventName)
            if socketId in list(clientDbWatchList[watchEventName]["sockets"]):
                log.debug("socketId found {} ({})", socketId, watchEventName)
                clientDbWatchList[watchEventName]["sockets"].pop(str(request.sid), None)
    except Exception as e:
        log.info("disconnect", e)
        pass
    disconnect(request.sid, namespace="/pvServer")


# DATABASE FUNCTIONS AND EVENTS


@socketio.on("databaseRead", namespace="/pvServer")
def db_read(message):
    global clientPVlist, VITE_DisableLogin
    dbURL = str(message["dbURL"])
    log.debug("databaseRead: SSID: {} dbURL: {}", request.sid, dbURL)
    authenticated = False
    if VITE_DisableLogin:
        authenticated = True
        accessControl = {
            "userAuthorised": True,
            "permissions": {"read": True, "write": True},
        }
    else:
        accessControl = AutheriseUserAndPermissions(
            message["clientAuthorisation"], dbURL
        )
        authenticated = accessControl["userAuthorised"]
    if accessControl["userAuthorised"]:
        if "mongodb://" in dbURL:
            log.debug("mongodb database connection request: {}")
            str1 = dbURL.replace("mongodb://", "")
            strings = str1.split(":")
            try:
                Parametersstr = str1.split("Parameters:")[1]
                parameters = json.loads(Parametersstr)
            except:
                raise Exception("Parameters are not defined")
            log.debug("Parameters: {}", str(parameters))
            if len(strings) >= 3:
                database = strings[0]
                dbName = strings[1]
                colName = strings[2]
                log.debug("database: {} length: {}", database, len(database))
                log.debug("dbName: {} length: {}", dbName, len(dbName))
                log.debug("colName: {} length: {}", colName, len(colName))
                ### must insert a better error detection here
                if (len(database) > 0) and (len(dbName) > 0) and (len(colName) > 0):
                    write_access = False
                    if accessControl["permissions"]["read"]:
                        if accessControl["permissions"]["write"]:
                            join_room(str(dbURL) + "rw")
                            write_access = True
                        else:
                            join_room(str(dbURL) + "ro")
                            write_access = False
                        try:
                            log.debug("connecting: " + dbURL)
                            myclient = open_mongo_db_client(database, dbName)
                            mydb = myclient[dbName]
                            mycol = mydb[colName]
                            try:
                                query = parameters["query"]
                                X = mycol.find(query)
                            except:
                                X = mycol.find()
                            log.info("done: {}", dbURL)
                            data = dumps(X)
                            d = {
                                "dbURL": dbURL,
                                "write_access": write_access,
                                "data": data,
                            }
                            eventName = "databaseData:" + dbURL
                            log.debug("eventName {}", eventName)
                            socketio.emit(
                                eventName, d, room=request.sid, namespace="/pvServer"
                            )
                            return "OK"
                        except:
                            log.error("Could not connect to MongoDB: {}", dbURL)
                            return "Ack: Could not connect to MongoDB: " + str(dbURL)
                else:
                    log.error(
                        "Malformed database URL, must be in format:"
                        " mongodb://databaseID:database:collection"
                    )
            else:
                log.error(
                    "Malformed database URL, must be in format:"
                    " mongodb://databaseID:database:collection"
                )
        else:
            log.error("Unknown URL schema ({})", dbURL)
    else:
        socketio.emit("redirectToLogIn", room=request.sid, namespace="/pvServer")


@socketio.on("databaseBroadcastRead", namespace="/pvServer")
def db_read_broadcast(message):
    global clientPVlist, VITE_DisableLogin
    dbURL = str(message["dbURL"])
    log.debug("databaseRead: SSID: {} dbURL: {}", request.sid, dbURL)
    authenticated = False
    if VITE_DisableLogin:
        authenticated = True
        accessControl = {
            "userAuthorised": True,
            "permissions": {"read": True, "write": True},
        }
    else:
        accessControl = AutheriseUserAndPermissions(
            message["clientAuthorisation"], dbURL
        )
        authenticated = accessControl["userAuthorised"]
    if accessControl["userAuthorised"]:
        if "mongodb://" in dbURL:
            log.debug("mongodb database connection request: {}", dbURL)
            str1 = dbURL.replace("mongodb://", "")
            strings = str1.split(":")
            try:
                Parametersstr = str1.split("Parameters:")[1]
                parameters = json.loads(Parametersstr)
            except:
                raise Exception("Parameters are not defined")
            if len(strings) >= 3:
                database = strings[0]
                dbName = strings[1]
                colName = strings[2]
                log.debug("database: {} length: {}", database, len(database))
                log.debug("dbName {} length: {}", dbName, len(dbName))
                log.debug("colName: {} length: {}", colName, len(colName))
                ### must insert a better error detection here
                if (len(database) > 0) and (len(dbName) > 0) and (len(colName) > 0):
                    write_access = False
                    if accessControl["permissions"]["read"]:
                        if accessControl["permissions"]["write"]:
                            join_room(str(dbURL) + "rw")
                            write_access = True
                        else:
                            join_room(str(dbURL) + "ro")
                            write_access = False
                        try:
                            log.debug("connecting: " + dbURL)
                            myclient = open_mongo_db_client(database, dbName)
                            mydb = myclient[dbName]
                            mycol = mydb[colName]
                            try:
                                query = parameters["query"]
                                X = mycol.find(query)
                            except:
                                X = mycol.find()
                            log.debug("done: " + dbURL)
                            data = dumps(X)
                            eventName = "databaseData:" + dbURL
                            log.debug("eventName {}", eventName)
                            d = {
                                "dbURL": dbURL,
                                "write_access": write_access,
                                "data": data,
                            }
                            socketio.emit(
                                eventName,
                                d,
                                room=str(dbURL) + "rw",
                                namespace="/pvServer",
                            )
                            d = {"dbURL": dbURL, "write_access": False, "data": data}
                            socketio.emit(
                                eventName,
                                d,
                                room=str(dbURL) + "ro",
                                namespace="/pvServer",
                            )
                            return "OK"
                        except:
                            log.error("Could not connect to MongoDB: {}", dbURL)
                            return "Ack: Could not connect to MongoDB: " + str(dbURL)
                else:
                    log.error(
                        "Malformed database URL, must be in format:"
                        " mongodb://databaseID:database:collection"
                    )
            else:
                log.error(
                    "Malformed database URL, must be in format:"
                    " mongodb://databaseID:database:collection"
                )
        else:
            log.error("Unknown URL schema ({})", dbURL)
    else:
        socketio.emit("redirectToLogIn", room=request.sid, namespace="/pvServer")


@socketio.on("remove_dbWatch", namespace="/pvServer")
def db_remove_watch(message):
    global clientPVlist, VITE_DisableLogin, myuid, thread_lock
    dbURL = str(message["dbURL"])
    authenticated = False
    if VITE_DisableLogin:
        authenticated = True
        accessControl = {
            "userAuthorised": True,
            "permissions": {"read": True, "write": True},
        }
    else:
        accessControl = AutheriseUserAndPermissions(
            message["clientAuthorisation"], dbURL
        )
        authenticated = accessControl["userAuthorised"]
    if accessControl["userAuthorised"]:
        dbWatchId = str(message["dbWatchId"]) + str(request.sid)
        watchEventName = "databaseWatchData:" + dbURL

        def remove_watch():
            log.info("remove {}", watchEventName)
            try:
                if (
                    dbWatchId
                    in clientDbWatchList[watchEventName]["sockets"][request.sid][
                        "dbWatchIds"
                    ]
                ):
                    log.debug("debug1: {} {}", dbWatchId, watchEventName)
                    clientDbWatchList[watchEventName]["sockets"][request.sid][
                        "dbWatchIds"
                    ].pop(str(dbWatchId))
                    log.debug("debug2: {} {}", dbWatchId, watchEventName)
                    if (
                        len(
                            clientDbWatchList[watchEventName]["sockets"][request.sid][
                                "dbWatchIds"
                            ]
                        )
                        == 0
                    ):
                        log.debug("debug3: {} {}", dbWatchId, watchEventName)
                        leave_room(str(watchEventName))
                        clientDbWatchList[watchEventName]["sockets"].pop(request.sid)
                    log.debug("debug4: {} {}", dbWatchId, watchEventName)
            except:
                log.info("Could not remove watchID")

        time.sleep(3)  # wait for 3 seconds before removing a watch
        with thread_lock:
            remove_watch()
    else:
        socketio.emit("redirectToLogIn", room=request.sid, namespace="/pvServer")


@socketio.on("databaseReadWatchAndBroadcast", namespace="/pvServer")
def db_read_watch_broadcast(message):
    global clientPVlist, VITE_DisableLogin, clientDbWatchList, myDbWatchUid, thread_lock
    dbURL = str(message["dbURL"])
    authenticated = False
    if VITE_DisableLogin:
        authenticated = True
        accessControl = {
            "userAuthorised": True,
            "permissions": {"read": True, "write": True},
        }
    else:
        accessControl = AutheriseUserAndPermissions(
            message["clientAuthorisation"], dbURL
        )
        authenticated = accessControl["userAuthorised"]
    if accessControl["userAuthorised"]:
        if "mongodb://" in dbURL:
            str1 = dbURL.replace("mongodb://", "")
            strings = str1.split(":")
            try:
                Parametersstr = str1.split("Parameters:")[1]
                parameters = json.loads(Parametersstr)
            except:
                raise Exception("Parameters are not defined")
            if len(strings) >= 3:
                database = strings[0]
                dbName = strings[1]
                colName = strings[2]
                ### must insert a better error detection here
                if (len(database) > 0) and (len(dbName) > 0) and (len(colName) > 0):
                    write_access = False
                    if accessControl["permissions"]["read"]:
                        if accessControl["permissions"]["write"]:
                            join_room(str(dbURL) + "rw")
                            write_access = True
                        else:
                            join_room(str(dbURL) + "ro")
                            write_access = False
                        try:
                            myclient = open_mongo_db_client(database, dbName)
                            mydb = myclient[dbName]
                            mycol = mydb[colName]
                            query = (
                                parameters["query"] if ("query" in parameters) else None
                            )
                            # Convert string ObjectId's to valid ObjectId objects
                            if query:
                                if "_id" in query:
                                    try:
                                        for key, value in query["_id"].items():
                                            query["_id"][key] = ObjectId(value)
                                    except:
                                        pass
                            projection = (
                                parameters["projection"]
                                if ("projection" in parameters)
                                else None
                            )
                            if "sort" in parameters:
                                sort = []
                                for sortItem in parameters["sort"]:
                                    sort.append((sortItem[0], sortItem[1]))
                            else:
                                sort = [("$natural", 1)]
                            skip = parameters["skip"] if ("skip" in parameters) else 0
                            limit = (
                                parameters["limit"] if ("limit" in parameters) else 0
                            )
                            count = (
                                parameters["count"]
                                if ("count" in parameters)
                                else False
                            )
                            if count:
                                X = mycol.count_documents(query)
                            else:
                                X = (
                                    mycol.find(query, projection)
                                    .sort(sort)
                                    .skip(skip)
                                    .limit(limit)
                                )
                            data = dumps(X)
                            eventName = "databaseWatchData:" + dbURL
                            watchEventName = eventName
                            myDbWatchUid = str(message["dbWatchId"] + str(request.sid))
                            dbWatchId = str(myDbWatchUid)
                            d = {
                                "dbURL": dbURL,
                                "write_access": write_access,
                                "data": data,
                            }
                            socketio.emit(
                                eventName,
                                d,
                                room=str(request.sid),
                                namespace="/pvServer",
                            )
                            with thread_lock:
                                if not (watchEventName in clientDbWatchList):
                                    dbWatch = {}
                                    dbWatch["watchEventName"] = watchEventName
                                    dbWatch["client"] = myclient
                                    dbWatch["db"] = mydb
                                    dbWatch["collection"] = mycol
                                    dbWatch["watch"] = mycol.watch()
                                    dbWatch["dbURL"] = dbURL
                                    dbWatch["query"] = query
                                    dbWatch["projection"] = projection
                                    dbWatch["sort"] = sort
                                    dbWatch["skip"] = skip
                                    dbWatch["limit"] = limit
                                    dbWatch["count"] = count
                                    dbWatch["sockets"] = {
                                        str(request.sid): {
                                            "dbWatchIds": {str(dbWatchId): True}
                                        }
                                    }
                                    dbWatch["thread"] = None
                                    dbWatch["threadStarted"] = False
                                    dbWatch["closeWatch"] = False
                                    dbWatch["threadClosed"] = False
                                    clientDbWatchList[watchEventName] = dbWatch
                                else:
                                    if (
                                        request.sid
                                        in clientDbWatchList[watchEventName]["sockets"]
                                    ):
                                        if (
                                            "dbWatchIds"
                                            in clientDbWatchList[watchEventName][
                                                "sockets"
                                            ][request.sid]
                                        ):
                                            if (
                                                dbWatchId
                                                in clientDbWatchList[watchEventName][
                                                    "sockets"
                                                ][request.sid]["dbWatchIds"]
                                            ):
                                                log.info(
                                                    "not a unique id {} {}",
                                                    dbWatchId,
                                                    watchEventName,
                                                )
                                            else:
                                                clientDbWatchList[watchEventName][
                                                    "sockets"
                                                ][request.sid]["dbWatchIds"][
                                                    dbWatchId
                                                ] = True
                                        else:
                                            clientDbWatchList[watchEventName][
                                                "sockets"
                                            ][request.sid]["dbWatchIds"] = {
                                                dbWatchId: True
                                            }
                                    else:
                                        clientDbWatchList[watchEventName]["sockets"][
                                            request.sid
                                        ] = {"dbWatchIds": {dbWatchId: True}}
                                return {"dbWatchId": dbWatchId}
                        except:
                            return "Ack: Could not connect to MongoDB: " + str(dbURL)
                else:
                    log.error(
                        "Malformed database URL, must be in format:"
                        " mongodb://databaseID:database:collection"
                    )
            else:
                log.error(
                    "Malformed database URL, must be in format:"
                    " mongodb://databaseID:database:collection"
                )
        else:
            log.error("Unknown URL schema ({})", dbURL)
    else:
        socketio.emit("redirectToLogIn", room=request.sid, namespace="/pvServer")


@socketio.on("databaseUpdateOne", namespace="/pvServer")
def db_update_one(message):
    global clientPVlist, VITE_DisableLogin
    dbURL = str(message["dbURL"])
    authenticated = False
    if VITE_DisableLogin:
        authenticated = True
        accessControl = {
            "userAuthorised": True,
            "permissions": {"read": True, "write": True},
        }
    else:
        accessControl = AutheriseUserAndPermissions(
            message["clientAuthorisation"], dbURL
        )
        authenticated = accessControl["userAuthorised"]
    if accessControl["userAuthorised"]:
        if accessControl["permissions"]["write"]:
            if "mongodb://" in dbURL:
                log.debug("mongodb database connection request: {}", dbURL)
                str1 = dbURL.replace("mongodb://", "")
                strings = str1.split(":")
                if len(strings) == 3:
                    database = strings[0]
                    dbName = strings[1]
                    colName = strings[2]
                    log.debug("database: {} length: {}", database, len(database))
                    log.debug("dbName: {} length: {}", dbName, len(dbName))
                    log.debug("colName: {} length: {}", colName, len(colName))
                    ### must insert a better error detection here
                    if (len(database) > 0) and (len(dbName) > 0) and (len(colName) > 0):
                        try:
                            log.debug("connecting: " + dbURL)
                            myclient = open_mongo_db_client(database, dbName)
                            mydb = myclient[dbName]
                            mycol = mydb[colName]
                            id = message["id"]
                            newvalues = message["newvalues"]
                            try:
                                mydb[colName].update_one(
                                    {"_id": ObjectId(str(id))}, newvalues
                                )
                            except Exception as e:
                                log.info(e)
                            log.debug("done: " + dbURL)
                            try:
                                responseID = message["responseID"]
                            except:
                                responseID = ""
                            return "OK"
                        except:
                            log.error("Could not connect to MongoDB: {}", dbURL)
                            return "Ack: Could not connect to MongoDB: " + str(dbURL)
                else:
                    log.error(
                        "Malformed database URL, must be in format:"
                        " mongodb://databaseID:database:collection"
                    )
            else:
                log.error("Unknown URL schema ({})", dbURL)
        else:
            log.warning("Write access denied to database URL: {}", dbURL)
    else:
        socketio.emit("redirectToLogIn", room=request.sid, namespace="/pvServer")


@socketio.on("databaseUpdateMany", namespace="/pvServer")
def db_update_many(message):
    global clientPVlist, VITE_DisableLogin
    dbURL = str(message["dbURL"])
    log.debug("databaseUpdate: SSID: {} dbURL: {}", request.sid, dbURL)
    log.debug("message: {}", str(message))
    authenticated = False
    if VITE_DisableLogin:
        authenticated = True
        accessControl = {
            "userAuthorised": True,
            "permissions": {"read": True, "write": True},
        }
    else:
        accessControl = AutheriseUserAndPermissions(
            message["clientAuthorisation"], dbURL
        )
        authenticated = accessControl["userAuthorised"]
    if accessControl["userAuthorised"]:
        if accessControl["permissions"]["write"]:
            if "mongodb://" in dbURL:
                log.debug("mongodb database connection request: {}", dbURL)
                str1 = dbURL.replace("mongodb://", "")
                strings = str1.split(":")
                if len(strings) == 3:
                    database = strings[0]
                    dbName = strings[1]
                    colName = strings[2]
                    log.debug("database: {} length: {}", database, len(database))
                    log.debug("dbName: {} length: {}", dbName, len(dbName))
                    log.debug("colName: {} length: {}", colName, len(colName))
                    ### must insert a better error detection here
                    if (len(database) > 0) and (len(dbName) > 0) and (len(colName) > 0):
                        try:
                            log.debug("connecting: " + dbURL)
                            myclient = open_mongo_db_client(database, dbName)
                            mydb = myclient[dbName]
                            mycol = mydb[colName]
                            query = message["query"] if ("query" in message) else {}
                            aggregation = (
                                message["aggregation"]
                                if ("aggregation" in message)
                                else {}
                            )
                            if "_id" in query:
                                try:
                                    for key, value in query["_id"].items():
                                        query["_id"][key] = ObjectId(value)
                                except:
                                    pass
                            newvalues = (
                                message["newvalues"]
                                if ("newvalues" in message)
                                else None
                            )
                            try:
                                if "aggregation" in message:
                                    mydb[colName].update_many(query, [aggregation])
                                else:
                                    mydb[colName].update_many(query, newvalues)
                            except Exception as e:
                                log.info(e)
                            log.debug("done: " + dbURL)
                            try:
                                responseID = message["responseID"]
                            except:
                                responseID = ""
                            return "OK"
                        except:
                            log.error("Could not connect to MongoDB: {}", dbURL)
                            return "Ack: Could not connect to MongoDB: " + str(dbURL)
                else:
                    log.error(
                        "Malformed database URL, must be in format:"
                        " mongodb://databaseID:database:collection"
                    )
            else:
                log.error("Unknown URL schema ({})", dbURL)
        else:
            log.warning("Write access denied to database URL: {}", dbURL)
    else:
        socketio.emit("redirectToLogIn", room=request.sid, namespace="/pvServer")


@socketio.on("databaseDeleteOne", namespace="/pvServer")
def db_delete_one(message):
    global clientPVlist, VITE_DisableLogin
    dbURL = str(message["dbURL"])
    log.debug("databaseUpdate: SSID: {} dbURL: {}", request.sid, dbURL)
    log.debug("message: {}", str(message))
    authenticated = False
    if VITE_DisableLogin:
        authenticated = True
        accessControl = {
            "userAuthorised": True,
            "permissions": {"read": True, "write": True},
        }
    else:
        accessControl = AutheriseUserAndPermissions(
            message["clientAuthorisation"], dbURL
        )
        authenticated = accessControl["userAuthorised"]
    if accessControl["userAuthorised"]:
        if accessControl["permissions"]["write"]:
            if "mongodb://" in dbURL:
                log.debug("mongodb database connection request: {}", dbURL)
                str1 = dbURL.replace("mongodb://", "")
                strings = str1.split(":")
                if len(strings) == 3:
                    database = strings[0]
                    dbName = strings[1]
                    colName = strings[2]
                    log.debug("database: {} length: {}", database, len(database))
                    log.debug("dbName: {} length: {}", dbName, len(dbName))
                    log.debug("colName: {} length: {}", colName, len(colName))
                    ### must insert a better error detection here
                    if (len(database) > 0) and (len(dbName) > 0) and (len(colName) > 0):
                        try:
                            log.debug("connecting: " + dbURL)
                            myclient = open_mongo_db_client(database, dbName)
                            mydb = myclient[dbName]
                            mycol = mydb[colName]
                            id = message["id"]
                            try:
                                mydb[colName].delete_one({"_id": ObjectId(str(id))})
                            except Exception as e:
                                log.info(e)
                            log.debug("done: " + dbURL)
                            try:
                                responseID = message["responseID"]
                            except:
                                responseID = ""
                            return "OK"
                        except:
                            log.error("Could not connect to MongoDB: {}", dbURL)
                            return "Ack: Could not connect to MongoDB: " + str(dbURL)
                else:
                    log.error(
                        "Malformed database URL, must be in format:"
                        " mongodb://databaseID:database:collection"
                    )
            else:
                log.error("Unknown URL schema ({})", dbURL)
        else:
            log.warning("Write access denied to database URL: {}", dbURL)
    else:
        socketio.emit("redirectToLogIn", room=request.sid, namespace="/pvServer")


@socketio.on("databaseInsertOne", namespace="/pvServer")
def db_insert_one(message):
    global clientPVlist, VITE_DisableLogin
    log.debug("databaseInsertOne")
    dbURL = str(message["dbURL"])
    log.debug("databaseInsertOne: SSID: {} dbURL: {}", request.sid, dbURL)
    authenticated = False
    if VITE_DisableLogin:
        authenticated = True
        accessControl = {
            "userAuthorised": True,
            "permissions": {"read": True, "write": True},
        }
    else:
        accessControl = AutheriseUserAndPermissions(
            message["clientAuthorisation"], dbURL
        )
        authenticated = accessControl["userAuthorised"]
    if accessControl["userAuthorised"]:
        if accessControl["permissions"]["write"]:
            if "mongodb://" in dbURL:
                log.debug("mongodb database connection request: {}", dbURL)
                str1 = dbURL.replace("mongodb://", "")
                strings = str1.split(":")
                if len(strings) == 3:
                    database = strings[0]
                    dbName = strings[1]
                    colName = strings[2]
                    log.debug("database: {} length: {}", database, len(database))
                    log.debug("dbName: {} length: {}", dbName, len(dbName))
                    log.debug("colName: {} length: {}", colName, len(colName))
                    ### must insert a better error detection here
                    if (len(database) > 0) and (len(dbName) > 0) and (len(colName) > 0):
                        try:
                            log.debug("connecting: " + dbURL)
                            myclient = open_mongo_db_client(database, dbName)
                            mydb = myclient[dbName]
                            mycol = mydb[colName]
                            newEntry = message["newEntry"]
                            log.debug("newEntry {}", str(newEntry))
                            try:
                                log.debug("add newEntry")
                                log.debug("dbName: {}", dbName)
                                log.debug("colName: {}", colName)
                                mydb[colName].insert_one(newEntry)
                            except Exception as e:
                                log.info(e)
                            log.debug("done: " + dbURL)
                            return "OK"
                        except:
                            log.error("Could not connect to MongoDB: {}", dbURL)
                            return "Ack: Could not connect to MongoDB: " + str(dbURL)
                else:
                    log.error(
                        "Malformed database URL, must be in format:"
                        " mongodb://databaseID:database:collection"
                    )
            else:
                log.error("Unknown URL schema ({})", dbURL)
        else:
            log.warning("Write access denied to database URL: {}", dbURL)
    else:
        socketio.emit("redirectToLogIn", room=request.sid, namespace="/pvServer")


@socketio.on("archiverRead", namespace="/pvServer")
def archiver_read(message):
    global clientPVlist, VITE_DisableLogin
    archiverURL = str(message["archiverURL"])
    log.debug("databaseRead: SSID: {}", request.sid)
    authenticated = False
    if VITE_DisableLogin:
        authenticated = True
        accessControl = {
            "userAuthorised": True,
            "permissions": {"read": True, "write": True},
        }
    else:
        accessControl = AutheriseUserAndPermissions(
            message["clientAuthorisation"], archiverURL
        )
        authenticated = accessControl["userAuthorised"]
    if accessControl["userAuthorised"]:
        if "arch://" in archiverURL:
            str1 = archiverURL.replace("arch://", "")
            strings = str1.split(":")
            try:
                reqStr = str1.split("request:")[1]
                archiver_request = json.loads(reqStr)
            except:
                raise Exception("Request not defined")
            if len(strings) >= 1:
                archiver = strings[0]
                if len(archiver) > 0:
                    write_access = False
                    if accessControl["permissions"]["read"]:
                        if accessControl["permissions"]["write"]:
                            join_room(str(archiverURL) + "rw")
                            write_access = True
                        else:
                            join_room(str(archiverURL) + "ro")
                            write_access = False
                        try:
                            pv = archiver_request["pv"]
                            pv = pv.replace("pva://", "")
                            pv = parse.quote(pv)
                            fromOptions = archiver_request["options"]["from"]
                            fromOptions = parse.quote(fromOptions)
                            toOptions = archiver_request["options"]["to"]
                            toOptions = parse.quote(toOptions)
                            parameters = archiver_request["options"]["parameters"]
                            URL = (
                                str(os.environ[archiver])
                                + "/retrieval/data/getData.json?pv="
                                + pv
                                + "&from="
                                + fromOptions
                                + "&to="
                                + toOptions
                                + parameters
                            )
                            archiver_request = urlrequest.urlopen(URL)
                            data = json.load(archiver_request)
                            eventName = "archiverReadData:" + archiverURL
                            d = {
                                "archiverURL": archiverURL,
                                "write_access": write_access,
                                "data": data,
                            }
                            socketio.emit(
                                eventName,
                                d,
                                room=str(archiverURL) + "rw",
                                namespace="/pvServer",
                            )
                            d = {
                                "archiverURL": archiverURL,
                                "write_access": False,
                                "data": data,
                            }
                            socketio.emit(
                                eventName,
                                d,
                                room=str(archiverURL) + "ro",
                                namespace="/pvServer",
                            )
                            return {"initialized": True}
                        except:
                            log.info("could not connect to Archiver: : {}", archiverURL)
                            return {"initialized": False}
        else:
            log.info("Unkwown Archiver URL: : {}", archiverURL)
    else:
        socketio.emit("redirectToLogIn", room=request.sid, namespace="/pvServer")


@socketio.on("UserDetailsWatch", namespace="/pvServer")
def watch_user_details(message):
    global clientPVlist, VITE_DisableLogin, clientDbWatchList, myDbWatchUid, thread_lock
    authorisation = AuthoriseUser(message["clientAuthorisation"])
    if authorisation["authorised"]:
        try:
            client = open_mongo_db_client("ADMIN_DATABASE", "rasAdminDb")
            mydb = client["rasAdminDb"]
            mycol = mydb["users"]
            query = {"username": message["username"]}
            projection = {"password": 0}
            sort = [("$natural", 1)]
            skip = 0
            limit = 0
            count = False
            doc = mycol.find(query, projection)
            data = dumps(doc)
            eventName = "databaseWatchData:" + "UserDetailsWatch:" + message["username"]
            d = {"write_access": True, "data": data}
            socketio.emit(eventName, d, room=str(request.sid), namespace="/pvServer")
            watchEventName = eventName
            myDbWatchUid = str(message["dbWatchId"] + str(request.sid))
            dbWatchId = str(myDbWatchUid)
            with thread_lock:
                if not (watchEventName in clientDbWatchList):
                    dbWatch = {}
                    dbWatch["watchEventName"] = watchEventName
                    dbWatch["client"] = client
                    dbWatch["db"] = mydb
                    dbWatch["collection"] = mycol
                    dbWatch["watch"] = mycol.watch()
                    dbWatch["dbURL"] = watchEventName
                    dbWatch["query"] = query
                    dbWatch["projection"] = projection
                    dbWatch["sort"] = sort
                    dbWatch["skip"] = skip
                    dbWatch["limit"] = limit
                    dbWatch["count"] = count
                    dbWatch["sockets"] = {
                        str(request.sid): {"dbWatchIds": {str(dbWatchId): True}}
                    }
                    dbWatch["thread"] = None
                    dbWatch["threadStarted"] = False
                    dbWatch["closeWatch"] = False
                    dbWatch["threadClosed"] = False
                    clientDbWatchList[watchEventName] = dbWatch
                    join_room(str(watchEventName))
                    join_room(str(watchEventName) + "rw")
                else:
                    if request.sid in clientDbWatchList[watchEventName]["sockets"]:
                        if (
                            "dbWatchIds"
                            in clientDbWatchList[watchEventName]["sockets"][request.sid]
                        ):
                            if (
                                dbWatchId
                                in clientDbWatchList[watchEventName]["sockets"][
                                    request.sid
                                ]["dbWatchIds"]
                            ):
                                log.info(
                                    "not a unique id {} {}", dbWatchId, watchEventName
                                )
                            else:
                                clientDbWatchList[watchEventName]["sockets"][
                                    request.sid
                                ]["dbWatchIds"][dbWatchId] = True
                        else:
                            clientDbWatchList[watchEventName]["sockets"][request.sid][
                                "dbWatchIds"
                            ] = {dbWatchId: True}
                    else:
                        clientDbWatchList[watchEventName]["sockets"][request.sid] = {
                            "dbWatchIds": {dbWatchId: True}
                        }
                    join_room(str(watchEventName))
                    join_room(str(watchEventName) + "rw")
                return {"dbWatchId": dbWatchId}
        except Exception as e:
            log.info("adminallusers", e)
            return "Ack: Could not connect to MongoDB ADMIN_DATABASE"
    else:
        socketio.emit("redirectToLogIn", room=request.sid, namespace="/pvServer")
        return "Ack: not authorised"


@socketio.on("adminAllUsers", namespace="/pvServer")
def admin_all_users(message):
    global clientPVlist, VITE_DisableLogin, clientDbWatchList, myDbWatchUid, thread_lock
    isAdmin = checkIfAdmin(message["clientAuthorisation"])
    if isAdmin:
        try:
            client = open_mongo_db_client("ADMIN_DATABASE", "rasAdminDb")
            mydb = client["rasAdminDb"]
            mycol = mydb["users"]
            query = {}
            projection = {"password": 0}
            sort = [("$natural", 1)]
            skip = 0
            limit = 0
            count = False
            doc = mycol.find(query, projection)
            data = dumps(doc)
            eventName = "databaseWatchData:" + "adminAllUsers"
            d = {"write_access": True, "data": data}
            socketio.emit(eventName, d, room=str(request.sid), namespace="/pvServer")
            watchEventName = eventName
            myDbWatchUid = str(message["dbWatchId"] + str(request.sid))
            dbWatchId = str(myDbWatchUid)
            with thread_lock:
                if not (watchEventName in clientDbWatchList):
                    dbWatch = {}
                    dbWatch["watchEventName"] = watchEventName
                    dbWatch["client"] = client
                    dbWatch["db"] = mydb
                    dbWatch["collection"] = mycol
                    dbWatch["watch"] = mycol.watch()
                    dbWatch["dbURL"] = watchEventName
                    dbWatch["query"] = query
                    dbWatch["projection"] = projection
                    dbWatch["sort"] = sort
                    dbWatch["skip"] = skip
                    dbWatch["limit"] = limit
                    dbWatch["count"] = count
                    dbWatch["sockets"] = {
                        str(request.sid): {"dbWatchIds": {str(dbWatchId): True}}
                    }
                    dbWatch["thread"] = None
                    dbWatch["threadStarted"] = False
                    dbWatch["closeWatch"] = False
                    dbWatch["threadClosed"] = False
                    clientDbWatchList[watchEventName] = dbWatch
                    join_room(str(watchEventName))
                    join_room(str(watchEventName) + "rw")
                else:
                    if request.sid in clientDbWatchList[watchEventName]["sockets"]:
                        if (
                            "dbWatchIds"
                            in clientDbWatchList[watchEventName]["sockets"][request.sid]
                        ):
                            if (
                                dbWatchId
                                in clientDbWatchList[watchEventName]["sockets"][
                                    request.sid
                                ]["dbWatchIds"]
                            ):
                                log.info(
                                    "not a unique id {} {}", dbWatchId, watchEventName
                                )
                            else:
                                clientDbWatchList[watchEventName]["sockets"][
                                    request.sid
                                ]["dbWatchIds"][dbWatchId] = True
                        else:
                            clientDbWatchList[watchEventName]["sockets"][request.sid][
                                "dbWatchIds"
                            ] = {dbWatchId: True}
                    else:
                        clientDbWatchList[watchEventName]["sockets"][request.sid] = {
                            "dbWatchIds": {dbWatchId: True}
                        }
                    join_room(str(watchEventName))
                    join_room(str(watchEventName) + "rw")
                return {"dbWatchId": dbWatchId}
        except Exception as e:
            log.info("adminallusers", e)
            return "Ack: Could not connect to MongoDB ADMIN_DATABASE"
    else:
        socketio.emit("redirectToLogIn", room=request.sid, namespace="/pvServer")
        return "Ack: not authorised"


@socketio.on("adminWatchUAGs", namespace="/pvServer")
def admin_watch_uags(message):
    global clientPVlist, VITE_DisableLogin, clientDbWatchList, myDbWatchUid, thread_lock
    isAdmin = checkIfAdmin(message["clientAuthorisation"])
    if isAdmin:
        try:
            client = open_mongo_db_client("ADMIN_DATABASE", "rasAdminDb")
            mydb = client["rasAdminDb"]
            mycol = mydb["pvAccess"]
            query = {}
            projection = None
            sort = [("$natural", 1)]
            skip = 0
            limit = 0
            count = False
            doc = mycol.find(query, projection)
            data = dumps(doc)
            eventName = "databaseWatchData:" + "adminWatchUAGs"
            d = {"write_access": True, "data": data}
            socketio.emit(eventName, d, room=str(request.sid), namespace="/pvServer")
            watchEventName = eventName
            myDbWatchUid = str(message["dbWatchId"] + str(request.sid))
            dbWatchId = str(myDbWatchUid)
            with thread_lock:
                if not (watchEventName in clientDbWatchList):
                    dbWatch = {}
                    dbWatch["watchEventName"] = watchEventName
                    dbWatch["client"] = client
                    dbWatch["db"] = mydb
                    dbWatch["collection"] = mycol
                    dbWatch["watch"] = mycol.watch()
                    dbWatch["dbURL"] = watchEventName
                    dbWatch["query"] = query
                    dbWatch["projection"] = projection
                    dbWatch["sort"] = sort
                    dbWatch["skip"] = skip
                    dbWatch["limit"] = limit
                    dbWatch["count"] = count
                    dbWatch["sockets"] = {
                        str(request.sid): {"dbWatchIds": {str(dbWatchId): True}}
                    }
                    dbWatch["thread"] = None
                    dbWatch["threadStarted"] = False
                    dbWatch["closeWatch"] = False
                    dbWatch["threadClosed"] = False
                    clientDbWatchList[watchEventName] = dbWatch
                    join_room(str(watchEventName))
                    join_room(str(watchEventName) + "rw")
                else:
                    if request.sid in clientDbWatchList[watchEventName]["sockets"]:
                        if (
                            "dbWatchIds"
                            in clientDbWatchList[watchEventName]["sockets"][request.sid]
                        ):
                            if (
                                dbWatchId
                                in clientDbWatchList[watchEventName]["sockets"][
                                    request.sid
                                ]["dbWatchIds"]
                            ):
                                log.info(
                                    "not a unique id {} {}", dbWatchId, watchEventName
                                )
                            else:
                                clientDbWatchList[watchEventName]["sockets"][
                                    request.sid
                                ]["dbWatchIds"][dbWatchId] = True
                        else:
                            clientDbWatchList[watchEventName]["sockets"][request.sid][
                                "dbWatchIds"
                            ] = {dbWatchId: True}
                    else:
                        clientDbWatchList[watchEventName]["sockets"][request.sid] = {
                            "dbWatchIds": {dbWatchId: True}
                        }
                    join_room(str(watchEventName))
                    join_room(str(watchEventName) + "rw")
                return {"dbWatchId": dbWatchId}
        except Exception as e:
            log.info("adminWatchUAGs", e)
            return "Ack: Could not connect to MongoDB ADMIN_DATABASE"
    else:
        socketio.emit("redirectToLogIn", room=request.sid, namespace="/pvServer")
        return "Ack: not authorised"


@socketio.on("adminAddUser", namespace="/pvServer")
def admin_add_user(message):
    global clientPVlist, VITE_DisableLogin, clientDbWatchList, myDbWatchUid
    isAdmin = checkIfAdmin(message["clientAuthorisation"])
    if isAdmin:
        try:
            client = open_mongo_db_client("ADMIN_DATABASE", "rasAdminDb")
            mydb = client["rasAdminDb"]
            mycol = mydb["users"]
            user = message["user"]
            existingUser = mycol.find_one({"username": user["username"]})
            if existingUser:
                return "Error: Username Exists"
            else:
                user["enabled"] = True

                if user["password"]:
                    try:
                        ADMIN_PW_SALT_ROUNDS = int(os.environ["ADMIN_PW_SALT_ROUNDS"])
                    except:
                        ADMIN_PW_SALT_ROUNDS = 12
                    user["password"] = (
                        bcrypt.hashpw(
                            user["password"].encode("utf-8"),
                            bcrypt.gensalt(ADMIN_PW_SALT_ROUNDS),
                        )
                    ).decode("utf-8")
                    now = datetime.now()
                    timestamp = datetime.timestamp(now)
                    user["pwTimestamp"] = timestamp
                mycol.insert_one(user)
            return "OK"
        except Exception as e:
            log.info("admin add user error", e)
            return "Ack: Could not connect to MongoDB ADMIN_DATABASE"
    else:
        socketio.emit("redirectToLogIn", room=request.sid, namespace="/pvServer")
        return "Ack: not authorised"


@socketio.on("adminDeleteUser", namespace="/pvServer")
def admin_delete_user(message):
    global clientPVlist, VITE_DisableLogin, clientDbWatchList, myDbWatchUid
    isAdmin = checkIfAdmin(message["clientAuthorisation"])
    if isAdmin:
        try:
            client = open_mongo_db_client("ADMIN_DATABASE", "rasAdminDb")
            mydb = client["rasAdminDb"]
            mycol = mydb["users"]
            try:
                id = message["id"]
                mycol.delete_one({"_id": ObjectId(str(id))})
            except Exception as e:
                log.info(e)
                return "Error:could not delete the user"
            return "OK"
        except Exception as e:
            log.info("admin add user error", e)
            return "Ack: Could not connect to MongoDB ADMIN_DATABASE"
    else:
        socketio.emit("redirectToLogIn", room=request.sid, namespace="/pvServer")
        return "Ack: not authorised"


@socketio.on("adminEnableUser", namespace="/pvServer")
def admin_enable_user(message):
    global clientPVlist, VITE_DisableLogin, clientDbWatchList, myDbWatchUid
    isAdmin = checkIfAdmin(message["clientAuthorisation"])
    if isAdmin:
        try:
            client = open_mongo_db_client("ADMIN_DATABASE", "rasAdminDb")
            mydb = client["rasAdminDb"]
            mycol = mydb["users"]
            id = message["id"]
            enabled = message["enabled"]
            log.info(message)
            try:
                mycol.update_one(
                    {"_id": ObjectId(str(id))}, {"$set": {"enabled": enabled}}
                )
            except Exception as e:
                log.info(e)
                return "error: can't update user "
            return "OK"
        except Exception as e:
            log.info("admin enable user error", e)
            return "Ack: Could not connect to MongoDB ADMIN_DATABASE"
    else:
        socketio.emit("redirectToLogIn", room=request.sid, namespace="/pvServer")
        return "Ack: not authorised"


@socketio.on("adminModifyUser", namespace="/pvServer")
def admin_modify_user(message):
    global clientPVlist, VITE_DisableLogin, clientDbWatchList, myDbWatchUid
    isAdmin = checkIfAdmin(message["clientAuthorisation"])
    if isAdmin:
        try:
            client = open_mongo_db_client("ADMIN_DATABASE", "rasAdminDb")
            mydb = client["rasAdminDb"]
            mycol = mydb["users"]
            id = message["id"]
            try:
                update = {"$set": {}}
                if message["password"]:
                    try:
                        ADMIN_PW_SALT_ROUNDS = int(os.environ["ADMIN_PW_SALT_ROUNDS"])
                    except:
                        ADMIN_PW_SALT_ROUNDS = 12
                    password = (
                        bcrypt.hashpw(
                            message["password"].encode("utf-8"),
                            bcrypt.gensalt(ADMIN_PW_SALT_ROUNDS),
                        )
                    ).decode("utf-8")
                    now = datetime.now()
                    timestamp = datetime.timestamp(now)
                    update["$set"]["password"] = password
                    update["$set"]["pwTimestamp"] = timestamp
                if "email" in message:
                    update["$set"]["email"] = message["email"]
                if "givenName" in message:
                    update["$set"]["givenName"] = message["givenName"]
                if "familyName" in message:
                    update["$set"]["familyName"] = message["familyName"]
                if "phoneNumber" in message:
                    update["$set"]["phoneNumber"] = message["phoneNumber"]
                if "officeLocation" in message:
                    update["$set"]["officeLocation"] = message["officeLocation"]
                mycol.update_one({"_id": ObjectId(str(id))}, update)
            except Exception as e:
                log.info(e)
                return "error: can't update user "
            return "OK"
        except Exception as e:
            log.info("admin enable user error", e)
            return "Ack: Could not connect to MongoDB ADMIN_DATABASE"
    else:
        socketio.emit("redirectToLogIn", room=request.sid, namespace="/pvServer")
        return "Ack: not authorised"


@socketio.on("ModifyUser", namespace="/pvServer")
def modify_user(message):
    global clientPVlist, VITE_DisableLogin, clientDbWatchList, myDbWatchUid
    authorisation = AuthoriseUser(message["clientAuthorisation"])
    if authorisation["authorised"]:
        try:
            client = open_mongo_db_client("ADMIN_DATABASE", "rasAdminDb")
            mydb = client["rasAdminDb"]
            mycol = mydb["users"]
            id = message["id"]
            try:
                update = {"$set": {}}
                if message["password"]:
                    try:
                        ADMIN_PW_SALT_ROUNDS = int(os.environ["ADMIN_PW_SALT_ROUNDS"])
                    except:
                        ADMIN_PW_SALT_ROUNDS = 12
                    password = (
                        bcrypt.hashpw(
                            message["password"].encode("utf-8"),
                            bcrypt.gensalt(ADMIN_PW_SALT_ROUNDS),
                        )
                    ).decode("utf-8")
                    now = datetime.now()
                    timestamp = datetime.timestamp(now)
                    update["$set"]["password"] = password
                    update["$set"]["pwTimestamp"] = timestamp
                if "email" in message:
                    update["$set"]["email"] = message["email"]
                if "givenName" in message:
                    update["$set"]["givenName"] = message["givenName"]
                if "familyName" in message:
                    update["$set"]["familyName"] = message["familyName"]
                if "phoneNumber" in message:
                    update["$set"]["phoneNumber"] = message["phoneNumber"]
                if "officeLocation" in message:
                    update["$set"]["officeLocation"] = message["officeLocation"]
                mycol.update_one({"_id": ObjectId(str(id))}, update)
            except Exception as e:
                log.info(e)
                return "error: can't update user "
            return "OK"
        except Exception as e:
            log.info("admin enable user error", e)
            return "Ack: Could not connect to MongoDB ADMIN_DATABASE"
    else:
        socketio.emit("redirectToLogIn", room=request.sid, namespace="/pvServer")
        return "Ack: not authorised"


@socketio.on("adminUpdateUAGs", namespace="/pvServer")
def admin_update_uags(message):
    global clientPVlist, VITE_DisableLogin, clientDbWatchList, myDbWatchUid
    isAdmin = checkIfAdmin(message["clientAuthorisation"])
    if isAdmin:
        try:
            client = open_mongo_db_client("ADMIN_DATABASE", "rasAdminDb")
            mydb = client["rasAdminDb"]
            mycol = mydb["pvAccess"]
            id = message["id"]
            userGroups = message["UAGs"]
            try:
                mycol.update_one(
                    {"_id": ObjectId(str(id))}, {"$set": {"userGroups": userGroups}}
                )
            except Exception as e:
                log.info(e)
                return "error: can't update UAGs "
            return "OK"
        except Exception as e:
            log.info("admin enable user error", e)
            return "Ack: Could not connect to MongoDB ADMIN_DATABASE"
    else:
        socketio.emit("redirectToLogIn", room=request.sid, namespace="/pvServer")
        return "Ack: not authorised"


@socketio.on("AuthoriseClient", namespace="/pvServer")
def authorize_client(message):
    global VITE_DisableLogin
    if not VITE_DisableLogin:
        userData = AuthoriseUser(message)
        if userData["authorised"]:
            emit(
                "clientAuthorisation",
                {
                    "successful": True,
                    "username": userData["username"],
                    "roles": userData["roles"],
                },
                room=request.sid,
                namespace="/pvServer",
            )
        else:
            emit(
                "clientAuthorisation",
                {"successful": False},
                room=request.sid,
                namespace="/pvServer",
            )
            socketio.emit("redirectToLogIn", room=request.sid, namespace="/pvServer")
            disconnect(request.sid, namespace="/pvServer")
    else:
        emit(
            "clientAuthorisation",
            {"successful": True},
            room=request.sid,
            namespace="/pvServer",
        )


if __name__ == "__main__":
    VITE_PyEpicsServerURL = os.getenv("pvServerURL")
    pvServerPort = os.getenv("pvServerPort")
    if pvServerPort is None:
        pvServerPort = "5000"
    VITE_PyEpicsServerURL = (
        VITE_PyEpicsServerURL + ":" + pvServerPort + "/" + "pvServer"
    )
    log.info(f"pvServer URL: {VITE_PyEpicsServerURL}")
    log.info("")
    if not (VITE_PyEpicsServerURL is None):
        if "https" in VITE_PyEpicsServerURL:
            socketio.run(
                app,
                host="0.0.0.0",
                debug=False,
                port=int(pvServerPort, 10),
                keyfile="../certificates/server.key",
                certfile="../certificates/server.cer",
                use_reloader=False,
            )
        else:
            socketio.run(
                app,
                host="0.0.0.0",
                port=int(pvServerPort, 10),
                debug=True,
                use_reloader=False,
            )
    else:
        socketio.run(app, host="127.0.0.1", debug=True, use_reloader=False)
