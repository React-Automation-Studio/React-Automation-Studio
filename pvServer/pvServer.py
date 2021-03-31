#!/usr/bin/env python
import gevent
from gevent import monkey; monkey.patch_all()
import time
import pymongo
from pymongo import MongoClient
import threading
import uuid
import flask
from flask import Flask, render_template, session, request, jsonify, send_from_directory, redirect, make_response
from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect
from werkzeug.routing import BaseConverter
from bson.json_util import dumps
import bcrypt
from epics import PV
import os
import sys
import json
import urllib.request
import urllib.parse
from bson.objectid import ObjectId
sys.path.insert(0, '../')
sys.path.insert(0, 'userAuthentication/')

from authenticate import  AuthoriseUser,AutheriseUserAndPermissions,checkIfAdmin, LocalAuthenticateUser, ExternalAuthenticateUser, decodeTokenGoogle, createRefreshToken, createAccessToken
from dotenv import load_dotenv
import ldap
from time import sleep
from datetime import datetime


from flask_cors import CORS
class RegexConverter(BaseConverter):
    def __init__(self, url_map, *items):
        super(RegexConverter, self).__init__(url_map)
        self.regex = items[0]

load_dotenv()
# Set this variable to "threading", "eventlet" or "gevent" to test the
# different async modes, or leave it set to None for the application to choose
# the best option based on installed packages.



async_mode = 'gevent'
print("")
print('**************************************')
print("React Automation Studio V2.2.0")
print("")
print("pvServer Environment Variables:")
print("")
print('PYEPICS_LIBCA: '+ str(os.environ['PYEPICS_LIBCA']))
print('EPICS_BASE: '+ str(os.environ['EPICS_BASE']))
print('EPICS_CA_ADDR_LIST: '+ str(os.environ['EPICS_CA_ADDR_LIST']))
print('REACT_APP_PyEpicsServerBASEURL: '+ str(os.environ['REACT_APP_PyEpicsServerBASEURL']))
print('REACT_APP_PyEpicsServerPORT: '+ str(os.environ['REACT_APP_PyEpicsServerPORT']))
print('REACT_APP_PyEpicsServerNamespace: '+ str(os.environ['REACT_APP_PyEpicsServerNamespace']))
print('REACT_APP_EnableLogin: '+ str(os.environ['REACT_APP_EnableLogin']))
print('pvServerLogLevel: {}'.format(os.environ.get('pvServerLogLevel', None)))
print('pvServerLogFile: {}'.format(os.environ.get('pvServerLogFile', None)))
print('pvServerLogFileSize: {}'.format(os.environ.get('pvServerLogFileSize', None)))
print('pvServerLogFileBackup: {}'.format(os.environ.get('pvServerLogFileBackup', None)))
print('REACT_APP_EnableActiveDirectoryLogin: '+ str(os.environ['REACT_APP_EnableActiveDirectoryLogin']))
print('REACT_APP_EnableGoogleLogin: '+ str(os.environ['REACT_APP_EnableGoogleLogin']))
REACT_APP_EnableActiveDirectoryLogin=(os.getenv('REACT_APP_EnableActiveDirectoryLogin')=='true')
REACT_APP_EnableGoogleLogin=(os.getenv('REACT_APP_EnableGoogleLogin')=='true')
REACT_APP_DisableStandardLogin=(os.getenv('REACT_APP_DisableStandardLogin')=='true')
try:
    REFRESH_COOKIE_MAX_AGE_SECS = int(
        os.environ['REFRESH_COOKIE_MAX_AGE_SECS'])
except:
    REFRESH_COOKIE_MAX_AGE_SECS =604800
print('Refresh cookie max age not set - defaulting to {} seconds'.format(REFRESH_COOKIE_MAX_AGE_SECS))
    
try:
    ACCESS_TOKEN_MAX_AGE_SECS = int(
        os.environ['ACCESS_TOKEN_MAX_AGE_SECS'])
except:
    
    ACCESS_TOKEN_MAX_AGE_SECS = 300
print('Access token max age not set - defaulting to {} seconds'.format(ACCESS_TOKEN_MAX_AGE_SECS))
try:
    REFRESH_TIMEOUT = int(
        os.environ['REFRESH_TIMEOUT'])
except:
    REFRESH_TIMEOUT = 60
print('Refresh time out not set - defaulting to {} seconds'.format(REFRESH_TIMEOUT))
    
try:
    SECURE=(os.getenv('SECURE')=='true')
   
except:
     SECURE = False
print('SECURE - {}'.format(SECURE))
   



print("")
app = flask.Flask(__name__, static_folder="./build/static", template_folder="./build")
app.url_map.converters['regex'] = RegexConverter

CORS(app)

@app.route('/api/logout', methods=['GET'])
def logout():
    res = make_response(jsonify({"logout":True}))
    res.set_cookie('refreshToken', '', max_age=0)
    return res,200



def createLoginReponse(userData):
    global REFRESH_COOKIE_MAX_AGE_SECS, ACCESS_TOKEN_MAX_AGE_SECS, REFRESH_TIMEOUT, SECURE
    if (userData is None):
        return jsonify({'login': False}), 401
    username=userData['username']
    roles=userData['roles']
    refreshToken=createRefreshToken(username,REFRESH_COOKIE_MAX_AGE_SECS)
    accessToken=createAccessToken(username,ACCESS_TOKEN_MAX_AGE_SECS,roles)
    d={
        'login': True, 
        'username':username,
        'roles':roles,
        'accessToken':accessToken,
        'refreshTokenConfig':{
        
        'refreshTimeout':REFRESH_TIMEOUT,
        'useCookie':SECURE,
        }
    }
    if not SECURE:
        d['refreshTokenConfig']['refreshToken']=refreshToken
    resp= make_response(jsonify(d))
    if SECURE:
       
        resp.set_cookie(key='refreshToken', value=refreshToken, max_age=REFRESH_COOKIE_MAX_AGE_SECS,
        secure=True, httponly=True, samesite=None)
    
    return resp, 200

@app.route('/api/refresh', methods=['POST'])
def refresh():
    global SECURE
    if SECURE:
        refreshToken = request.cookies.get('refreshToken')
    else:
        refreshToken = request.json.get('refreshToken')
    if not (refreshToken is None):
     #   print("in ifrefreshToken",refreshToken)
        userData=AuthoriseUser(refreshToken)
      #  print("userData",userData)
        if userData['authorised']:
            resp=createLoginReponse(userData)
            return resp
        else:
            return jsonify({'login': False}), 401
    else:
        return jsonify({'login': False}), 401



@app.route('/api/login/local', methods=['POST'])
def localLogin():
    global REACT_APP_DisableStandardLogin
    if not REACT_APP_DisableStandardLogin:
        user = request.json.get('user', None)
        userData=LocalAuthenticateUser(user)
        resp=createLoginReponse(userData)
        return resp
    else:
       log.info("Standard login not allowed: {} ",user['username'])
       return jsonify({'login': False}), 401 

@app.route('/api/login/ldap', methods=['POST'])
def ldapLogin():
    # print("request ip:",request.remote_addr)
    global REACT_APP_EnableActiveDirectoryLogin
    if REACT_APP_EnableActiveDirectoryLogin :
        user = request.json.get('user', None)
        LDAP_HOST=os.getenv('LDAP_HOST')
        LDAP_PORT=os.getenv('LDAP_PORT')
        LDAP_USER_DN=user['username']
        LDAP_USER_PW=user['password']
        try:
            con=ldap.initialize(LDAP_HOST+":"+LDAP_PORT)
            con.bind(LDAP_USER_DN,LDAP_USER_PW,ldap.AUTH_SIMPLE)
            if con.result():
            
                userData=ExternalAuthenticateUser(user)
                resp=createLoginReponse(userData)
                return resp

            else:
                log.info("Ldap login failed: {} ",LDAP_USER_DN)
                jsonify({'login': False}), 401
        except Exception as e:
            print("Ldap login error",e)
            # print("username",LDAP_USER_DN)
            # print("password",LDAP_USER_PW)
            log.info("Ldap login failed: {} ",LDAP_USER_DN)
            jsonify({'login': False}), 401
            return jsonify({'login': False}), 401

       
    else:
        log.info("Forbiddden Active Directory login login: {} ",user['username'])
        return jsonify({'login': False}), 401


@app.route('/api/login/google', methods=['POST'])
def googleLogin():
    global REACT_APP_EnableGoogleLogin
    if REACT_APP_EnableGoogleLogin :
        
        jwt = request.json.get('jwt', None)
        REACT_APP_EnableGoogleLoginId=(os.getenv('REACT_APP_EnableGoogleLoginId') if os.getenv('REACT_APP_EnableGoogleLoginId') else None)
        if REACT_APP_EnableGoogleLoginId :
            decoded=decodeTokenGoogle(jwt,REACT_APP_EnableGoogleLoginId)
            if decoded:
                if decoded['email'] and (decoded['email_verified']==True):
                    userData=ExternalAuthenticateUser({'username':decoded['email']})
                    resp=createLoginReponse(userData)
                    return resp
        else :
            return jsonify({'login': False}), 401
        
        return jsonify({'login': False}), 401
       
    else:
        log.info("Forbiddden google login")
        return jsonify({'login': False}), 401





# @app.route("/<regex(r'(.*?)\.(json|txt|png|ico|js)$'):file>", methods=["GET"])
# def public(file):
#     return flask.send_from_directory('./build', file)



# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')

# def index(path):
#     try :
#         return render_template('index.html', async_mode=socketio.async_mode)
#     except :
#         return "", 404




REACT_APP_DisableLogin=not(os.getenv('REACT_APP_EnableLogin')=='true')
if (REACT_APP_DisableLogin) :
    print("Authenitcation and Authorisation is DISABLED")
else:
    print("Authenitcation and Authorisation is ENABLED")
print("")

socketio = SocketIO(app,async_mode=async_mode,cors_allowed_origins='*')
thread = None
thread_lock = threading.Lock()

import log



clientPVlist={};
clientDbWatchList={};
myuid=0
myDbWatchUid=0
def check_pv_initialized_after_disconnect():
    global clientPVlist,clientDbWatchList
    while (True):
        for pvname in list(clientPVlist) :
            if not((len(clientPVlist[pvname]['sockets'])>0 ) or (len(clientPVlist[pvname]['socketsRW'])>0 )or (len(clientPVlist[pvname]['socketsRO'])>0 )):
                #print(pvname, " has no listening clients, removing")

                clientPVlist[pvname]['pv'].disconnect()
                clientPVlist.pop(pvname)
            else:
                #print(pvname)
                if (clientPVlist[pvname]['initialized']==False):
                    if (clientPVlist[pvname]['isConnected']):
                        clientPVlist[pvname]['pv'].get(as_string=True)
                        d=clientPVlist[pvname]['pv'].get_with_metadata(with_ctrlvars=True,use_monitor=True)
                        if  (clientPVlist[pvname]['pv'].value)!=None :
                            if d!=None:
                                for keys in d:
                                    if(str(d[keys])=='nan'):
                                        d[keys]=None

                                if(clientPVlist[pvname]['pv'].count >1):
                                    d['value']=list(d['value'])
                                if(clientPVlist[pvname]['pv'].count==0):
                                    d['value']=[]
                                if(clientPVlist[pvname]['pv'].count==1):
                                    new_char_value=str(d['char_value'])
                                    if (len(new_char_value)==0):
                                        new_char_value=str(d['value'])
                                    d['char_value']=new_char_value

                                d['pvname']= pvname
                                d['newmetadata']= 'True'
                                d['connected']= '1'
                                d['emitter']="request_pv_info: pv not in list"
                                d['chid']=str(d['chid'])
                                try:
                                    rw_room=str(pvname)+'rw'
                                    socketio.emit(pvname,d,room=rw_room,namespace='/pvServer')
                                    d['write_access']=False
                                    ro_room=str(pvname)+'ro'
                                    socketio.emit(pvname,d,room=ro_room,namespace='/pvServer')
                                    clientPVlist[pvname]['isConnected']=True
                                    clientPVlist[pvname]['initialized']=True
                                #
                                except TypeError as e:
                                    #"A type error exists in metadata dictionary and can't be converted into JSON format, previously this was caused by in CHID of type c_long(), a work arround exits, if CHID is not a c_long then try debugging")
                                    log.error("***EPICS PV info initial request info error: ")
                                    log.error("PV name: {}",pvname)
                                    log.error("PyEpics PV metadata: {}",d)
                                    log.error("Exception: {}",e)
                                    log.error("A type error exists in metadata dictionary and can't be converted into JSON format, previously this was caused by in CHID of type c_long(), a work arround exits, if CHID is not a c_long then try debugging")
                                    clientPVlist[pvname]['isConnected']=True
                                    clientPVlist[pvname]['initialized']=False
                                    log.error("Type: {}", type(d['value']))
                                    if ('epics.dbr.c_float_Array_0' in str(type(d['value']))):
                                        log.info("type is epics.dbr.c_float_Array_0")
                                    d={}
                                    d['pvname']= pvname
                                    d['connected']= '0'

                                    socketio.emit(pvname,d,room=str(pvname),namespace='/pvServer')
                                except:
                                    log.exception("Unexpected error")
                                    raise

        # for watchEventName in clientDbWatchList :
        #     print("watchEventName")
        #     with clientDbWatchList[watchEventName]['watch'] as stream:
        #         for change in stream:
        #             try:
        #                 #documentKey = change["documentKey"]
        #                 doc = clientDbWatchList[watchEventName]['collection'].find(clientDbWatchList[watchEventName]['query'])
        #                 print(str(change))
        #                 #print("documentKey: ",documentKey)
        #                 #print(watchEventName,change)
        #                 data=dumps(doc)
        #                 eventName=watchEventName
        #                 dbURL=clientDbWatchList[watchEventName]['dbURL']
        #                 d={'dbURL': dbURL,'write_access':True,'data': data}
        #                 socketio.emit(eventName,d,str(dbURL)+'rw',namespace='/pvServer')
        #                 d={'dbURL': dbURL,'write_access':False,'data': data}
        #                 socketio.emit(eventName,d,str(dbURL)+'ro',namespace='/pvServer')

        #             except:
        #                 print("Unexpected error:", sys.exc_info()[0])
        #                 raise
        time.sleep(0.1)
def dbWatchControlThread():
    global clientDbWatchList, thread_lock
    while (True):
        watchList=list(clientDbWatchList)
        # print("clientDbWatchList Lenghth",len(watchList))
        for watchEventName in watchList:
            if clientDbWatchList[watchEventName]['threadStarted'] is False:
                clientDbWatchList[watchEventName]['thread']=threading.Thread(target=dbWatchThread,args=[watchEventName]).start()
                clientDbWatchList[watchEventName]['threadStarted']=True
                clientDbWatchList[watchEventName]['closeWatch']=False
            with thread_lock:           
                if len(clientDbWatchList[watchEventName]['sockets'])==0:
                    if clientDbWatchList[watchEventName]['closeWatch']==False:
                        clientDbWatchList[watchEventName]['closeWatch']=True
                if clientDbWatchList[watchEventName]['threadClosed'] == True:
                    clientDbWatchList.pop(watchEventName)
        time.sleep(0.1)

def dbWatchThread(watchEventName):
    global clientDbWatchList
    exitThread=False
    while (exitThread==False):
        if watchEventName in clientDbWatchList :
            with clientDbWatchList[watchEventName]['watch'] as stream:
                while stream.alive:
                    change = stream.try_next()
                    if change is not None:
                        try:
                            query = clientDbWatchList[watchEventName]['query']
                            projection = clientDbWatchList[watchEventName]['projection']
                            sort = clientDbWatchList[watchEventName]['sort']
                            skip = clientDbWatchList[watchEventName]['skip']
                            limit = clientDbWatchList[watchEventName]['limit']
                            count = clientDbWatchList[watchEventName]['count']
                            if(count):
                                doc = clientDbWatchList[watchEventName]['collection'].count_documents(query)
                            else:
                                doc = clientDbWatchList[watchEventName]['collection'].find(query,projection).sort(sort).skip(skip).limit(limit)
                            data=dumps(doc)
                            eventName=watchEventName
                            dbURL=clientDbWatchList[watchEventName]['dbURL']
                            d={'dbURL': dbURL,'write_access':True,'data': data}
                            socketio.emit(eventName,d,room=str(dbURL)+'rw',namespace='/pvServer')
                            d={'dbURL': dbURL,'write_access':False,'data': data}
                            socketio.emit(eventName,d,room=str(dbURL)+'ro',namespace='/pvServer')
                        except:
                            log.error("Unexpected error: {}",sys.exc_info()[0])
                            raise
                    if clientDbWatchList[watchEventName]['closeWatch']==True:
                        clientDbWatchList[watchEventName]['watch'].close()

                    time.sleep(0.1)
                clientDbWatchList[watchEventName]['threadClosed']=True
                exitThread=True
                time.sleep(0.1)

def onValueChanges(pvname=None,count=None,char_value=None,severity=None,status=None, value=None, timestamp=None, **kw):
    global clientPVList
    pvname1='pva://'+str(pvname)
    if(clientPVlist[pvname1]['initialized']==True):
        if (float(count)== 1):
           new_char_value=str(char_value)
           if (len(new_char_value)==0):
               new_char_value=str(value)


           socketio.emit(pvname1,
              {'pvname': pvname1,'newmetadata': 'False','value': str(value),'char_value': new_char_value,'count':count, 'connected':'1', 'severity': severity,'timestamp':timestamp
              },room='pva://'+str(pvname),namespace='/pvServer')
        else:
           d={'pvname': pvname1,'newmetadata': 'False','value': list((value)),'count':count, 'connected':'1', 'severity': severity,'timestamp':timestamp}
           socketio.emit(pvname1,d,room='pva://'+str(pvname),namespace='/pvServer')


def onConnectionChange(pvname=None, conn= None, value=None, **kws):
    global clientPVlist
    pvname1='pva://'+str(pvname)

    if (conn==True):
        try:
            clientPVlist[pvname1]['isConnected']=True
            clientPVlist[pvname1]['initialized']=False

        except:
           error=1



    else:

        d={}
        d['pvname']= pvname
        d['connected']= '0'
        d['emitter']="onConnectionChange: disconnected"
        try:
            clientPVlist[pvname1]['isConnected']=False
            clientPVlist[pvname1]['initialized']=False
            socketio.emit(pvname1,d,room=str(pvname1),namespace='/pvServer')
        except:
            error=2



def background_thread():

    count = 0
    threading.Thread(target=check_pv_initialized_after_disconnect).start()
    threading.Thread(target=dbWatchControlThread).start()
    while True:
        socketio.sleep(0.1)





@socketio.on('write_to_pv', namespace='/pvServer')
def test_write(message):
    global clientPVlist,thread_lock2,REACT_APP_DisableLogin
    #print("Test")
    authenticated=False
    if REACT_APP_DisableLogin:

        accessControl={'userAuthorised':True,'permissions':{'read':True,'write':True}}
    else :
        accessControl=AutheriseUserAndPermissions(message['clientAuthorisation'],message['pvname'])
        authenticated=accessControl['userAuthorised']

    if accessControl['userAuthorised']:
        if accessControl['permissions']['write']:
            pvname1= str(message['pvname'])
            if "pva://" in pvname1:
                pvname2=pvname1.replace("pva://","")
                try:
                    clientPVlist[pvname1]['pv'].put(message['data']);
                except Exception as e:
                    log.error("***EPICS PV put error: ")
                    log.error("PV name: {}",pvname2)
                    log.error("Value to put: {}",message['data'])
                    log.error("Exception: {}",e)



            else: log.error("Unknown PV type ({})", pvname1)
        else:
            log.warning("***PV put error: write access denied ")
            log.warning("PV name: {}",message['pvname'])
            log.warning("Value to put: {}",message['data'])
    else:
        socketio.emit('redirectToLogIn',room=request.sid,namespace='/pvServer')


@socketio.on('remove_pv_connection', namespace='/pvServer')
def test_message(message):
    global clientPVlist,REACT_APP_DisableLogin, myuid
    pvname1= str(message['pvname'])
    authenticated=False
    if REACT_APP_DisableLogin:
        authenticated=True
        accessControl={'userAuthorised':True,'permissions':{'read':True,'write':True}}
    else :
        accessControl=AutheriseUserAndPermissions(message['clientAuthorisation'],pvname1)
        authenticated=accessControl['userAuthorised']

    if accessControl['userAuthorised'] :


        if pvname1 in	clientPVlist:

            if "pva://" in pvname1:
                pvConnectionId= str(message['pvConnectionId'])
                #print("remove_pv_connection id: ",pvConnectionId, pvname1)
                try:
                    #print("before pop",clientPVlist[pvname1]['sockets'][request.sid]['pvConnectionIds'])
                    if pvConnectionId in clientPVlist[pvname1]['socketsRW'][request.sid]['pvConnectionIds']:
                        #print("debug1: ",pvConnectionId, pvname1)
                        #print("before pop",clientPVlist[pvname1]['sockets'][request.sid]['pvConnectionIds'])
                        clientPVlist[pvname1]['socketsRW'][request.sid]['pvConnectionIds'].pop(str(pvConnectionId))
                        #print("length ",len(clientPVlist[pvname1]['socketsRW'][request.sid]['pvConnectionIds']))
                        if len(clientPVlist[pvname1]['socketsRW'][request.sid]['pvConnectionIds'])==0:
                            leave_room(str(pvname1)+'rw')
                            clientPVlist[pvname1]['socketsRW'].pop(request.sid)

                        #print("after pop",clientPVlist[pvname1]['sockets'][request.sid]['pvConnectionIds'])
                except:
                    pass
                    #print("remove_pv_connection id not in socketsRW: ",pvConnectionId, pvname1)

                try:
                    #print("before pop",clientPVlist[pvname1]['sockets'][request.sid]['pvConnectionIds'])
                    if pvConnectionId in clientPVlist[pvname1]['socketsRO'][request.sid]['pvConnectionIds']:
                        clientPVlist[pvname1]['socketsRO'][request.sid]['pvConnectionIds'].pop(str(pvConnectionId))
                        if len(clientPVlist[pvname1]['socketsRO'][request.sid]['pvConnectionIds'])==0:
                            leave_room(str(pvname1)+'ro')
                            clientPVlist[pvname1]['socketsRO'].pop(request.sid)
                        #print("after pop",clientPVlist[pvname1]['sockets'][request.sid]['pvConnectionIds'])
                except:
                    pass
                    #print("remove_pv_connection id not in socketsRO: ",pvConnectionId, pvname1)
                try:
                    #print("before pop",clientPVlist[pvname1]['sockets'][request.sid]['pvConnectionIds'])
                    if pvConnectionId in clientPVlist[pvname1]['sockets'][request.sid]['pvConnectionIds']:
                        #print("debug1: ",pvConnectionId, pvname1)
                        #print("before pop",clientPVlist[pvname1]['sockets'][request.sid]['pvConnectionIds'])
                        clientPVlist[pvname1]['sockets'][request.sid]['pvConnectionIds'].pop(str(pvConnectionId))
                        if len(clientPVlist[pvname1]['sockets'][request.sid]['pvConnectionIds'])==0:
                            leave_room(str(pvname1))
                            clientPVlist[pvname1]['sockets'].pop(request.sid)
                        #print("after pop",clientPVlist[pvname1]['sockets'][request.sid]['pvConnectionIds'])
                except:
                    pass
                    #print("remove_pv_connection id not in sockets: ",pvConnectionId, pvname1)

                #print("sockets",clientPVlist[pvname1]['sockets'])
                #print("socketsRO",clientPVlist[pvname1]['socketsRO'])
                #print("socketsRW",clientPVlist[pvname1]['socketsRW'])


            else:
                log.error("Unknown PV type ({})",pvname1)


        else:
            log.error("Pvname ({}) not in clientPVlist",pvname1)

    else:
        socketio.emit('redirectToLogIn',room=request.sid,namespace='/pvServer')




@socketio.on('request_pv_info', namespace='/pvServer')
def test_message(message):
    global clientPVlist,REACT_APP_DisableLogin, myuid
    pvname1= str(message['data'])
    authenticated=False
    if REACT_APP_DisableLogin:
        authenticated=True
        accessControl={'userAuthorised':True,'permissions':{'read':True,'write':True}}
    else :
        accessControl=AutheriseUserAndPermissions(message['clientAuthorisation'],pvname1)
        authenticated=accessControl['userAuthorised']

    if accessControl['userAuthorised'] :


        if not (pvname1 in	clientPVlist):

            if "pva://" in pvname1:


                if(accessControl['permissions']['read']):

                    pvname2=pvname1.replace("pva://","")
                    pv= PV(pvname2,connection_timeout=0.002,connection_callback= onConnectionChange)
                    pvlist={}
                    pvlist['pv']=pv
                    pvlist['isConnected']=False
                    pvlist['initialized']=False

                    #pvConnectionId=str(uuid.uuid1())
                    myuid=myuid+1
                    pvConnectionId=str(myuid)
                    if(accessControl['permissions']['write']):
                        join_room(str(pvname1)+'rw')
                        join_room(str(pvname1))



                        pvlist['sockets']={request.sid:{'pvConnectionIds':{pvConnectionId:True}}}
                        pvlist['socketsRW']={request.sid:{'pvConnectionIds':{pvConnectionId:True}}}
                        pvlist['socketsRO']={}
                    else:
                        join_room(str(pvname1)+'ro')
                        join_room(str(pvname1))



                        pvlist['sockets']={request.sid:{'pvConnectionIds':{pvConnectionId:True}}}
                        pvlist['socketsRO']={request.sid:{'pvConnectionIds':{pvConnectionId:True}}}
                        pvlist['socketsRW']={}
                    clientPVlist[pvname1]=pvlist
                    clientPVlist[pvname1]['pv'].add_callback(onValueChanges,index=0)
                    #print("new pv", pvname1," generated pvConnectionId: ",pvConnectionId)
                    return {"pvConnectionId":pvConnectionId}



            else:
                log.error("Unknown PV type ({})",pvname1)


        else:

            if "pva://" in pvname1:
                if(accessControl['permissions']['read']):

                    pvname2=pvname1.replace("pva://","")
                    clientPVlist[pvname1]['initialized']=False
                    myuid=myuid+1
                    pvConnectionId=str(myuid)
                    #pvConnectionId=str(uuid.uuid4())
                    #print("pv exists", pvname1," generated pvConnectionId: ",pvConnectionId)
                    #print("all sockets ",clientPVlist[pvname1]['sockets'])
                    #print("all sockets rw",clientPVlist[pvname1]['socketsRW'])
                    if(accessControl['permissions']['write']):
                        join_room(str(pvname1)+'rw')
                        join_room(str(pvname1))
                        if request.sid in clientPVlist[pvname1]['sockets']:

                            if 'pvConnectionIds' in clientPVlist[pvname1]['sockets'][request.sid]:
                                if  pvConnectionId in clientPVlist[pvname1]['sockets'][request.sid]['pvConnectionIds']:
                                    log.info("not a unique id {} {}",pvConnectionId,pvname1)
                     #               print("allConnectionIds ",clientPVlist[pvname1]['sockets'][request.sid]['pvConnectionIds'])
                                else:
                                    clientPVlist[pvname1]['sockets'][request.sid]['pvConnectionIds'][pvConnectionId]=True
                            else:
                                clientPVlist[pvname1]['sockets'][request.sid]['pvConnectionIds']={pvConnectionId:True}
                        else:
                            clientPVlist[pvname1]['sockets'][request.sid]={'pvConnectionIds':{pvConnectionId:True}}
                        if request.sid in clientPVlist[pvname1]['socketsRW']:
                            if 'pvConnectionIds' in clientPVlist[pvname1]['socketsRW'][request.sid]:
                                if  pvConnectionId in clientPVlist[pvname1]['socketsRW'][request.sid]['pvConnectionIds']:
                                     log.info("not a unique id RW {} {}",pvConnectionId,pvname1)
                      #              print("allConnectionIds RW ",clientPVlist[pvname1]['socketsRW'][request.sid]['pvConnectionIds'])
                                else:
                                    clientPVlist[pvname1]['socketsRW'][request.sid]['pvConnectionIds'][pvConnectionId]=True
                            else:
                                clientPVlist[pvname1]['socketsRW'][request.sid]['pvConnectionIds']={pvConnectionId:True}
                        else:
                            clientPVlist[pvname1]['socketsRW'][request.sid]={'pvConnectionIds':{pvConnectionId:True}}



                    else:
                        join_room(str(pvname1)+'ro')
                        join_room(str(pvname1))
                        if request.sid in clientPVlist[pvname1]['sockets']:
                            if 'pvConnectionIds' in clientPVlist[pvname1]['sockets'][request.sid]:
                                if  pvConnectionId in clientPVlist[pvname1]['sockets'][request.sid]['pvConnectionIds']:
                                    log.info("not a unique id {} {}",pvConnectionId,pvname1)
                       #             print("allConnectionIds",clientPVlist[pvname1]['sockets'][request.sid]['pvConnectionIds'])
                                else:
                                    clientPVlist[pvname1]['sockets'][request.sid]['pvConnectionIds'][pvConnectionId]=True
                            else:
                                clientPVlist[pvname1]['sockets'][request.sid]['pvConnectionIds']={pvConnectionId:True}
                        else:
                            clientPVlist[pvname1]['sockets'][request.sid]={'pvConnectionIds':{pvConnectionId:True}}

                        if request.sid in clientPVlist[pvname1]['socketsRO']:
                            if 'pvConnectionIds' in clientPVlist[pvname1]['socketsRO'][request.sid]:
                                if  pvConnectionId in clientPVlist[pvname1]['socketsRO'][request.sid]['pvConnectionIds']:
                                    log.info("not a unique id ro {} {}",pvConnectionId,pvname1)
                         #           print("allConnectionIds ro",clientPVlist[pvname1]['socketsRO'][request.sid]['pvConnectionIds'])
                                else:
                                    clientPVlist[pvname1]['socketsRO'][request.sid]['pvConnectionIds'][pvConnectionId]=True
                            else:
                                clientPVlist[pvname1]['socketsRO'][request.sid]['pvConnectionIds']={pvConnectionId:True}
                        else:
                            clientPVlist[pvname1]['socketsRO'][request.sid]={'pvConnectionIds':{pvConnectionId:True}}

                    return {"pvConnectionId":pvConnectionId}


            else:
                log.error("Unknown PV type ({})",pvname1)
    else:
        socketio.emit('redirectToLogIn',room=request.sid,namespace='/pvServer')

@socketio.on('databaseRead', namespace='/pvServer')
def databaseRead(message):
    global clientPVlist,REACT_APP_DisableLogin
    dbURL= str(message['dbURL'])

    #print("databaseRead: SSID: ",request.sid,' dbURL: ', dbURL)
    #print("message:",str(message))
    authenticated=False
    if REACT_APP_DisableLogin:
        authenticated=True
        accessControl={'userAuthorised':True,'permissions':{'read':True,'write':True}}
    else :
        accessControl=AutheriseUserAndPermissions(message['clientAuthorisation'],dbURL)
        authenticated=accessControl['userAuthorised']

    if accessControl['userAuthorised'] :
        if "mongodb://" in dbURL:

            #print("mongodb database connection request: ",dbURL)
            str1=dbURL.replace("mongodb://","")
            strings=  str1.split(':')
            try:
                Parametersstr=str1.split("Parameters:")[1]
                parameters=json.loads(Parametersstr)
            except:
                raise Exception("Parameters are not defined")

            #print("Parameters:",str(parameters))
            if(len(strings)>=3):
                database= strings[0];
                dbName=   strings[1];
                colName=  strings[2];
                #print("database: ", database, "length: ", len(database))
                #print("dbName: "  ,   dbName, "length: ", len(dbName))
                #print("colName: " ,  colName, "length: ", len(colName))
                ### must insert a better error detection here

                if ((len(database)>0) and (len(dbName)>0) and (len(colName)>0)):
                    write_access=False
                    if(accessControl['permissions']['read']):
                        if(accessControl['permissions']['write']):
                            join_room(str(dbURL)+'rw')
                            write_access=True
                            #join_room(str(dbURL))
                        else:
                            join_room(str(dbURL)+'ro')
                            write_access=False
                            #join_room(str(dbURL))
                        try:
                            #print("connecting: "+dbURL)
                            try:
                                databaseString="mongodb://"+ str(os.environ[database])+"/"
                                replicaSetName=str(os.environ[database+"_REPLICA_SET_NAME"])
                                myclient = pymongo.MongoClient(databaseString,serverSelectionTimeoutMS=10,replicaSet=replicaSetName)
                                # Wait for MongoClient to discover the whole replica set and identify MASTER!
                                time.sleep(0.1)
                                #myclient.server_info()
                            except pymongo.errors.ServerSelectionTimeoutError as err:
                                log.error(err)
                                return "Ack: Could not connect to MongoDB: "+str(dbURL)


                            mydb = myclient[dbName]

                            mycol=mydb[colName]
                            try:
                                query=parameters['query']
                #                print("using query:",query)
                                X=mycol.find(query)
                            except:
                                X=mycol.find()


                            #for x in X:
                                #print(x)
                            log.info("done: {}",dbURL)


                            data=dumps(X)
                            d={'dbURL': dbURL,'write_access':write_access,'data': data}

                            eventName='databaseData:'+dbURL;
                #            print("eventName",eventName)
                            socketio.emit(eventName,d,room=request.sid,namespace='/pvServer')
                            return "OK"
                        except:
                            log.error("Could not connect to MongoDB: {}",dbURL)
                            return "Ack: Could not connect to MongoDB: "+str(dbURL)
                else:
                    log.error("Malformed database URL, must be in format: mongodb://databaseID:database:collection")
            else:
                log.error("Malformed database URL, must be in format: mongodb://databaseID:database:collection")





        else:
            log.error("Unknown URL schema ({})",dbURL)
    else:
        socketio.emit('redirectToLogIn',room=request.sid,namespace='/pvServer')

@socketio.on('databaseBroadcastRead', namespace='/pvServer')
def databaseBroadcastRead(message):
    global clientPVlist,REACT_APP_DisableLogin
    dbURL= str(message['dbURL'])

    #print("databaseRead: SSID: ",request.sid,' dbURL: ', dbURL)
    #print("message:",str(message))
    authenticated=False
    if REACT_APP_DisableLogin:
        authenticated=True
        accessControl={'userAuthorised':True,'permissions':{'read':True,'write':True}}
    else :
        accessControl=AutheriseUserAndPermissions(message['clientAuthorisation'],dbURL)
        authenticated=accessControl['userAuthorised']

    if accessControl['userAuthorised'] :
        if "mongodb://" in dbURL:

    #        print("mongodb database connection request: ",dbURL)
            str1=dbURL.replace("mongodb://","")
            strings=  str1.split(':')
            try:
                Parametersstr=str1.split("Parameters:")[1]
                parameters=json.loads(Parametersstr)
            except:
                raise Exception("Parameters are not defined")

    #        print("Parameters:",str(parameters))
            if(len(strings)>=3):
                database= strings[0];
                dbName=   strings[1];
                colName=  strings[2];
    #            print("database: ", database, "length: ", len(database))
    #            print("dbName: "  ,   dbName, "length: ", len(dbName))
    #            print("colName: " ,  colName, "length: ", len(colName))
                ### must insert a better error detection here

                if ((len(database)>0) and (len(dbName)>0) and (len(colName)>0)):
                    write_access=False
                    if(accessControl['permissions']['read']):
                        if(accessControl['permissions']['write']):
                            join_room(str(dbURL)+'rw')
                            write_access=True
                            #join_room(str(dbURL))
                        else:
                            join_room(str(dbURL)+'ro')
                            write_access=False
                            #join_room(str(dbURL))
                        try:
    #                        print("connecting: "+dbURL)
                            try:
                                databaseString="mongodb://"+ str(os.environ[database])+"/"
                                replicaSetName=str(os.environ[database+"_REPLICA_SET_NAME"])
                                myclient = pymongo.MongoClient(databaseString,serverSelectionTimeoutMS=10,replicaSet=replicaSetName)
                                # Wait for MongoClient to discover the whole replica set and identify MASTER!
                                time.sleep(0.1)
                                #myclient.server_info()
                            except pymongo.errors.ServerSelectionTimeoutError as err:
                                log.error(err)
                                return "Ack: Could not connect to MongoDB: "+str(dbURL)

                            mydb = myclient[dbName]

                            mycol=mydb[colName]
                            try:
                                query=parameters['query']
                    #            print("using query:",query)
                                X=mycol.find(query)
                            except:
                                X=mycol.find()


                            #for x in X:
                                #print(x)
    #                        print("done: "+dbURL)


                            data=dumps(X)


                            eventName='databaseData:'+dbURL;
    #                        print("eventName",eventName)
                            d={'dbURL': dbURL,'write_access':write_access,'data': data}
                            socketio.emit(eventName,d,room=str(dbURL)+'rw',namespace='/pvServer')
                            d={'dbURL': dbURL,'write_access':False,'data': data}
                            socketio.emit(eventName,d,room=str(dbURL)+'ro',namespace='/pvServer')
                            return 'OK'
                        except:
                            log.error("Could not connect to MongoDB: {}",dbURL)
                            return "Ack: Could not connect to MongoDB: "+str(dbURL)
                else:
                    log.error("Malformed database URL, must be in format: mongodb://databaseID:database:collection")
            else:
                log.error("Malformed database URL, must be in format: mongodb://databaseID:database:collection")





        else:
            log.error("Unknown URL schema ({})",dbURL)
    else:
        socketio.emit('redirectToLogIn',room=request.sid,namespace='/pvServer')



@socketio.on('remove_dbWatch', namespace='/pvServer')
def remove_dbWatch(message):
    global clientPVlist,REACT_APP_DisableLogin, myuid, thread_lock
    dbURL= str(message['dbURL'])
    authenticated=False
    if REACT_APP_DisableLogin:
        authenticated=True
        accessControl={'userAuthorised':True,'permissions':{'read':True,'write':True}}
    else :
        accessControl=AutheriseUserAndPermissions(message['clientAuthorisation'],dbURL)
        authenticated=accessControl['userAuthorised']
    if accessControl['userAuthorised'] :
        dbWatchId=str(message['dbWatchId'])+str(request.sid)
        watchEventName='databaseWatchData:'+dbURL;
        def removeWatch():
            log.info("remove {}",watchEventName)
            try:
                if dbWatchId in clientDbWatchList[watchEventName]['sockets'][request.sid]['dbWatchIds']:
                    log.debug("debug1: {} {}",dbWatchId,watchEventName)
                    clientDbWatchList[watchEventName]['sockets'][request.sid]['dbWatchIds'].pop(str(dbWatchId))
                    log.debug("debug2: {} {}",dbWatchId,watchEventName)
                    if len(clientDbWatchList[watchEventName]['sockets'][request.sid]['dbWatchIds'])==0:
                        log.debug("debug3: {} {}",dbWatchId,watchEventName)
                        leave_room(str(watchEventName))
                        clientDbWatchList[watchEventName]['sockets'].pop(request.sid)
                    log.debug("debug4: {} {}",dbWatchId,watchEventName)
            except:
                log.info("Could not remove watchID")
                pass
        time.sleep(3) # wait for 3 seconds before removing a watch
        with thread_lock:        
            removeWatch()
        




    else:
        socketio.emit('redirectToLogIn',room=request.sid,namespace='/pvServer')




@socketio.on('databaseReadWatchAndBroadcast', namespace='/pvServer')
def databaseReadWatchAndBroadcast(message):
    global clientPVlist,REACT_APP_DisableLogin,clientDbWatchList,myDbWatchUid,thread_lock
    dbURL= str(message['dbURL'])
    authenticated=False
    if REACT_APP_DisableLogin:
        authenticated=True
        accessControl={'userAuthorised':True,'permissions':{'read':True,'write':True}}
    else :
        accessControl=AutheriseUserAndPermissions(message['clientAuthorisation'],dbURL)
        authenticated=accessControl['userAuthorised']
    if accessControl['userAuthorised'] :
        if "mongodb://" in dbURL:
            str1=dbURL.replace("mongodb://","")
            strings=  str1.split(':')
            try:
                Parametersstr=str1.split("Parameters:")[1]
                parameters=json.loads(Parametersstr)
            except:
                raise Exception("Parameters are not defined")
            if(len(strings)>=3):
                database= strings[0];
                dbName=   strings[1];
                colName=  strings[2];

                ### must insert a better error detection here

                if ((len(database)>0) and (len(dbName)>0) and (len(colName)>0)):
                    write_access=False
                    if(accessControl['permissions']['read']):
                        if(accessControl['permissions']['write']):
                            join_room(str(dbURL)+'rw')
                            write_access=True
                        else:
                            join_room(str(dbURL)+'ro')
                            write_access=False
                        try:
                            try:
                                databaseString="mongodb://"+ str(os.environ[database])+"/"
                                replicaSetName=str(os.environ[database+"_REPLICA_SET_NAME"])
                                myclient = pymongo.MongoClient(databaseString,replicaSet=replicaSetName)
                                # Wait for MongoClient to discover the whole replica set and identify MASTER!
                                time.sleep(0.1)
                                #myclient.server_info()
                            except pymongo.errors.ServerSelectionTimeoutError as err:
                                log.error(err)
                                return "Ack: Could not connect to MongoDB: "+str(dbURL)
                            mydb = myclient[dbName]
                            mycol=mydb[colName]
                            query=parameters['query'] if ('query' in parameters) else None
                            # Convert string ObjectId's to valid ObjectId objects
                            if(query):
                                if("_id" in query):
                                    try:
                                        for key,value in query["_id"].items():
                                            query["_id"][key]=ObjectId(value)
                                    except:
                                        pass
                            projection=parameters['projection'] if ('projection' in parameters) else None
                            if('sort' in parameters):
                                sort=[]
                                for sortItem in parameters['sort']:
                                    sort.append((sortItem[0],sortItem[1]))
                            else:
                                sort=[('$natural', 1)]
                            skip=parameters['skip'] if ('skip' in parameters) else 0
                            limit=parameters['limit'] if ('limit' in parameters) else 0
                            count=parameters['count'] if ('count' in parameters) else False
                            if(count):
                                X=mycol.count_documents(query)
                            else:
                                X=mycol.find(query,projection).sort(sort).skip(skip).limit(limit)
                            data=dumps(X)
                            eventName='databaseWatchData:'+dbURL;
                            watchEventName=eventName
                            myDbWatchUid=dbURL= str(message['dbWatchId']+str(request.sid))
                            dbWatchId=str(myDbWatchUid)
                            d={'dbURL': dbURL,'write_access':write_access,'data': data}
                            socketio.emit(eventName,d,room=str(request.sid),namespace='/pvServer')
                            with thread_lock:
                                if not (watchEventName in	clientDbWatchList):
                                    dbWatch={}
                                    dbWatch['watchEventName']=watchEventName
                                    dbWatch['client']=myclient
                                    dbWatch['db']=mydb
                                    dbWatch['collection']=mycol
                                    dbWatch['watch']=mycol.watch()
                                    dbWatch['dbURL']=dbURL
                                    dbWatch['query']=query
                                    dbWatch['projection']=projection
                                    dbWatch['sort']=sort
                                    dbWatch['skip']=skip
                                    dbWatch['limit']=limit
                                    dbWatch['count']=count
                                    dbWatch['sockets']={
                                        str(request.sid):{
                                            "dbWatchIds":{
                                                str(dbWatchId):True
                                            }
                                        }
                                    }
                                    dbWatch['thread']=None
                                    dbWatch['threadStarted']=False
                                    dbWatch['closeWatch']=False
                                    dbWatch['threadClosed']=False
                                    clientDbWatchList[watchEventName]=dbWatch
                                    join_room(str(watchEventName))
                                else:

                                    if request.sid in clientDbWatchList[watchEventName]['sockets']:
                                        if 'dbWatchIds' in clientDbWatchList[watchEventName]['sockets'][request.sid]:
                                            if  dbWatchId in clientDbWatchList[watchEventName]['sockets'][request.sid]['dbWatchIds']:
                                                log.info("not a unique id {} {}",dbWatchId,watchEventName)
                                            else:
                                                clientDbWatchList[watchEventName]['sockets'][request.sid]['dbWatchIds'][dbWatchId]=True
                                        else:
                                            clientDbWatchList[watchEventName]['sockets'][request.sid]['dbWatchIds']={dbWatchId:True}
                                    else:
                                        clientDbWatchList[watchEventName]['sockets'][request.sid]={'dbWatchIds':{dbWatchId:True}}

                                    join_room(str(watchEventName))
                                return {"dbWatchId":dbWatchId}
                        except:
                            return "Ack: Could not connect to MongoDB: "+str(dbURL)
                else:
                    log.error("Malformed database URL, must be in format: mongodb://databaseID:database:collection")
            else:
                log.error("Malformed database URL, must be in format: mongodb://databaseID:database:collection")
        else:
            log.error("Unknown URL schema ({})",dbURL)
    else:
        socketio.emit('redirectToLogIn',room=request.sid,namespace='/pvServer')

@socketio.on('databaseUpdateOne', namespace='/pvServer')
def databaseUpdateOne(message):
    global clientPVlist,REACT_APP_DisableLogin
    dbURL= str(message['dbURL'])
    authenticated=False
    if REACT_APP_DisableLogin:
        authenticated=True
        accessControl={'userAuthorised':True,'permissions':{'read':True,'write':True}}
    else :
        accessControl=AutheriseUserAndPermissions(message['clientAuthorisation'],dbURL)
        authenticated=accessControl['userAuthorised']

    if accessControl['userAuthorised'] :
        if accessControl['permissions']['write']:
            if "mongodb://" in dbURL:

#                print("mongodb database connection request: ",dbURL)
                str1=dbURL.replace("mongodb://","")
                strings=  str1.split(':')
                if(len(strings)==3):
                    database= strings[0];
                    dbName=   strings[1];
                    colName=  strings[2];
#                    print("database: ", database, "length: ", len(database))
#                    print("dbName: "  ,   dbName, "length: ", len(dbName))
#                    print("colName: " ,  colName, "length: ", len(colName))
                    ### must insert a better error detection here

                    if ((len(database)>0) and (len(dbName)>0) and (len(colName)>0)):


                        try:
                            #print("connecting: "+dbURL)
                            try:
                                databaseString="mongodb://"+ str(os.environ[database])+"/"
                                replicaSetName=str(os.environ[database+"_REPLICA_SET_NAME"])
                                myclient = pymongo.MongoClient(databaseString,serverSelectionTimeoutMS=10,replicaSet=replicaSetName)
                                # Wait for MongoClient to discover the whole replica set and identify MASTER!
                                time.sleep(0.1)
                                #myclient.server_info()
                            except pymongo.errors.ServerSelectionTimeoutError as err:
                                log.info(err)
                                return "Ack: Could not connect to MongoDB: "+str(dbURL)

                            mydb = myclient[dbName]

                            mycol=mydb[colName]
                            id=message['id']
                            newvalues=message['newvalues']
                            try:
                                mydb[colName].update_one({'_id':ObjectId(str(id))},newvalues)

                            except Exception as e:
                                log.info(e)



#                            print("done: "+dbURL)

                            try:
                                responseID=message['responseID']
                            except:
                                responseID="";

                            #eventName='databaseUpdateOne';
    #                        print("eventName",eventName)
                            return 'OK'
                        except:
                            log.error("Could not connect to MongoDB: {}",dbURL)
                            return "Ack: Could not connect to MongoDB: "+str(dbURL)

                else:
                    log.error("Malformed database URL, must be in format: mongodb://databaseID:database:collection")
            else:
                log.error("Unknown URL schema ({})",dbURL)
        else:
            log.warning("Write access denied to database URL: {}",dbURL)

    else:
        socketio.emit('redirectToLogIn',room=request.sid,namespace='/pvServer')

@socketio.on('databaseUpdateMany', namespace='/pvServer')
def databaseUpdateMany(message):
    global clientPVlist,REACT_APP_DisableLogin
    dbURL= str(message['dbURL'])

#    print("databaseUpdate: SSID: ",request.sid,' dbURL: ', dbURL)
#    print("message:",str(message))
    authenticated=False
    if REACT_APP_DisableLogin:
        authenticated=True
        accessControl={'userAuthorised':True,'permissions':{'read':True,'write':True}}
    else :
        accessControl=AutheriseUserAndPermissions(message['clientAuthorisation'],dbURL)
        authenticated=accessControl['userAuthorised']

    if accessControl['userAuthorised'] :
        if accessControl['permissions']['write']:
            if "mongodb://" in dbURL:

#                print("mongodb database connection request: ",dbURL)
                str1=dbURL.replace("mongodb://","")
                strings=  str1.split(':')
                if(len(strings)==3):
                    database= strings[0];
                    dbName=   strings[1];
                    colName=  strings[2];
#                    print("database: ", database, "length: ", len(database))
#                    print("dbName: "  ,   dbName, "length: ", len(dbName))
#                    print("colName: " ,  colName, "length: ", len(colName))
                    ### must insert a better error detection here

                    if ((len(database)>0) and (len(dbName)>0) and (len(colName)>0)):


                        try:
                            #print("connecting: "+dbURL)
                            try:
                                databaseString="mongodb://"+ str(os.environ[database])+"/"
                                replicaSetName=str(os.environ[database+"_REPLICA_SET_NAME"])
                                myclient = pymongo.MongoClient(databaseString,serverSelectionTimeoutMS=10,replicaSet=replicaSetName)
                                # Wait for MongoClient to discover the whole replica set and identify MASTER!
                                time.sleep(0.1)
                                #myclient.server_info()
                            except pymongo.errors.ServerSelectionTimeoutError as err:
                                log.info(err)
                                return "Ack: Could not connect to MongoDB: "+str(dbURL)

                            mydb = myclient[dbName]

                            mycol=mydb[colName]
                            query=message['query'] if ('query' in message) else {}
                            aggregation=message['aggregation'] if ('aggregation' in message) else {}
                            if("_id" in query):
                                try:
                                    for key,value in query["_id"].items():
                                        query["_id"][key]=ObjectId(value)
                                except:
                                    pass

                            newvalues=message['newvalues'] if ('newvalues' in message) else None
                            try:
                                if('aggregation' in message):
                                    mydb[colName].update_many(query,[aggregation])
                                else:
                                    mydb[colName].update_many(query,newvalues)

                            except Exception as e:
                                log.info(e)



#                            print("done: "+dbURL)

                            try:
                                responseID=message['responseID']
                            except:
                                responseID="";

                            #eventName='databaseUpdateOne';
    #                        print("eventName",eventName)
                            return 'OK'
                        except:
                            log.error("Could not connect to MongoDB: {}",dbURL)
                            return "Ack: Could not connect to MongoDB: "+str(dbURL)

                else:
                    log.error("Malformed database URL, must be in format: mongodb://databaseID:database:collection")
            else:
                log.error("Unknown URL schema ({})",dbURL)
        else:
            log.warning("Write access denied to database URL: {}",dbURL)

    else:
        socketio.emit('redirectToLogIn',room=request.sid,namespace='/pvServer')

@socketio.on('databaseDeleteOne', namespace='/pvServer')
def databaseDeleteOne(message):
    global clientPVlist,REACT_APP_DisableLogin
    dbURL= str(message['dbURL'])

#    print("databaseUpdate: SSID: ",request.sid,' dbURL: ', dbURL)
#    print("message:",str(message))
    authenticated=False
    if REACT_APP_DisableLogin:
        authenticated=True
        accessControl={'userAuthorised':True,'permissions':{'read':True,'write':True}}
    else :
        accessControl=AutheriseUserAndPermissions(message['clientAuthorisation'],dbURL)
        authenticated=accessControl['userAuthorised']

    if accessControl['userAuthorised'] :
        if accessControl['permissions']['write']:
            if "mongodb://" in dbURL:

#                print("mongodb database connection request: ",dbURL)
                str1=dbURL.replace("mongodb://","")
                strings=  str1.split(':')
                if(len(strings)==3):
                    database= strings[0];
                    dbName=   strings[1];
                    colName=  strings[2];
#                    print("database: ", database, "length: ", len(database))
#                    print("dbName: "  ,   dbName, "length: ", len(dbName))
#                    print("colName: " ,  colName, "length: ", len(colName))
                    ### must insert a better error detection here

                    if ((len(database)>0) and (len(dbName)>0) and (len(colName)>0)):


                        try:
                            #print("connecting: "+dbURL)
                            try:
                                databaseString="mongodb://"+ str(os.environ[database])+"/"
                                replicaSetName=str(os.environ[database+"_REPLICA_SET_NAME"])
                                myclient = pymongo.MongoClient(databaseString,serverSelectionTimeoutMS=10,replicaSet=replicaSetName)
                                # Wait for MongoClient to discover the whole replica set and identify MASTER!
                                time.sleep(0.1)
                                #myclient.server_info()
                            except pymongo.errors.ServerSelectionTimeoutError as err:
                                log.info(err)
                                return "Ack: Could not connect to MongoDB: "+str(dbURL)

                            mydb = myclient[dbName]

                            mycol=mydb[colName]
                            id=message['id']
                            # newvalues=message['newvalues']
                            try:
                                mydb[colName].delete_one({'_id':ObjectId(str(id))})

                            except Exception as e:
                                log.info(e)



#                            print("done: "+dbURL)

                            try:
                                responseID=message['responseID']
                            except:
                                responseID="";

                            #eventName='databaseUpdateOne';
    #                        print("eventName",eventName)
                            return 'OK'
                        except:
                            log.error("Could not connect to MongoDB: {}",dbURL)
                            return "Ack: Could not connect to MongoDB: "+str(dbURL)

                else:
                    log.error("Malformed database URL, must be in format: mongodb://databaseID:database:collection")
            else:
                log.error("Unknown URL schema ({})",dbURL)
        else:
            log.warning("Write access denied to database URL: {}",dbURL)

    else:
        socketio.emit('redirectToLogIn',room=request.sid,namespace='/pvServer')


@socketio.on('databaseInsertOne', namespace='/pvServer')
def databaseInsertOne(message):
    global clientPVlist,REACT_APP_DisableLogin
#    print("databaseInsertOne")
    dbURL= str(message['dbURL'])

#    print("databaseInsertOne: SSID: ",request.sid,' dbURL: ', dbURL)
#    print("message:",str(message))
    authenticated=False
    if REACT_APP_DisableLogin:
        authenticated=True
        accessControl={'userAuthorised':True,'permissions':{'read':True,'write':True}}
    else :
        accessControl=AutheriseUserAndPermissions(message['clientAuthorisation'],dbURL)
        authenticated=accessControl['userAuthorised']

    if accessControl['userAuthorised'] :
        if accessControl['permissions']['write']:
            if "mongodb://" in dbURL:

#                print("mongodb database connection request: ",dbURL)
                str1=dbURL.replace("mongodb://","")
                strings=  str1.split(':')
                if(len(strings)==3):
                    database= strings[0];
                    dbName=   strings[1];
                    colName=  strings[2];
#                    print("database: ", database, "length: ", len(database))
#                    print("dbName: "  ,   dbName, "length: ", len(dbName))
#                    print("colName: " ,  colName, "length: ", len(colName))
                    ### must insert a better error detection here

                    if ((len(database)>0) and (len(dbName)>0) and (len(colName)>0)):


                        try:
#                            print("connecting: "+dbURL)
                            try:
                                databaseString="mongodb://"+ str(os.environ[database])+"/"
                                replicaSetName=str(os.environ[database+"_REPLICA_SET_NAME"])
                                myclient = pymongo.MongoClient(databaseString,serverSelectionTimeoutMS=10,replicaSet=replicaSetName)
                                # Wait for MongoClient to discover the whole replica set and identify MASTER!
                                time.sleep(0.1)
                                #myclient.server_info()
                            except pymongo.errors.ServerSelectionTimeoutError as err:
                                log.error(err)
                                return "Ack: Could not connect to MongoDB: "+str(dbURL)

                            mydb = myclient[dbName]

                            mycol=mydb[colName]

                            # id=message['id']
                            newEntry=message['newEntry']

#                            print("newEntry",str(newEntry))
                            try:
                                # print("add newEntry")
                                # print("dbName:",dbName)
                                # print("colName:",colName)

                                 mydb[colName].insert_one(newEntry)
                            #
                            except Exception as e:
                                log.info(e)
#                            print("done: "+dbURL)


                            return 'OK'
                        except:
                            log.error("Could not connect to MongoDB: {}",dbURL)
                            return "Ack: Could not connect to MongoDB: "+str(dbURL)

                else:
                    log.error("Malformed database URL, must be in format: mongodb://databaseID:database:collection")
            else:
                log.error("Unknown URL schema ({})",dbURL)
        else:
            log.warning("Write access denied to database URL: {}",dbURL)

    else:
        socketio.emit('redirectToLogIn',room=request.sid,namespace='/pvServer')

@socketio.on('archiverRead', namespace='/pvServer')
def archiverRead(message):
    global clientPVlist,REACT_APP_DisableLogin
    archiverURL= str(message['archiverURL'])

    #print("databaseRead: SSID: ",request.sid,' dbURL: ', dbURL)
    #print("message:",str(message))
    authenticated=False
    if REACT_APP_DisableLogin:
        authenticated=True
        accessControl={'userAuthorised':True,'permissions':{'read':True,'write':True}}
    else :
        accessControl=AutheriseUserAndPermissions(message['clientAuthorisation'],archiverURL)
        authenticated=accessControl['userAuthorised']

    if accessControl['userAuthorised'] :
        if "arch://" in archiverURL:

            str1=archiverURL.replace("arch://","")
            strings=  str1.split(':')
            try:
                requestStr=str1.split("request:")[1]
                request=json.loads(requestStr)
            except:
                raise Exception("Request not defined")


            if(len(strings)>=1):
                archiver= strings[0];


                if ((len(archiver)>0)):
                    write_access=False
                    if(accessControl['permissions']['read']):
                        if(accessControl['permissions']['write']):
                            join_room(str(archiverURL)+'rw')
                            write_access=True

                        else:
                            join_room(str(archiverURL)+'ro')
                            write_access=False

                        try:
                            pv=request['pv']
                            pv=pv.replace("pva://","")
                            pv=urllib.parse.quote(pv)

                            fromOptions=request['options']['from']

                            fromOptions=urllib.parse.quote(fromOptions)
                            toOptions=request['options']['to']

                            toOptions=urllib.parse.quote(toOptions)
                            parameters=request['options']['parameters']


                            URL=str(os.environ[archiver])+'/retrieval/data/getData.json?pv='+pv+'&from='+fromOptions+'&to='+toOptions+parameters

                            req = urllib.request.urlopen(URL)
                            data = json.load(req)


                            eventName='archiverReadData:'+archiverURL;

                            d={'archiverURL': archiverURL,'write_access':write_access,'data': data}
                            socketio.emit(eventName,d,room=str(archiverURL)+'rw',namespace='/pvServer')
                            d={'archiverURL': archiverURL,'write_access':False,'data': data}
                            socketio.emit(eventName,d,room=str(archiverURL)+'ro',namespace='/pvServer')
                            return {'initialized':True}
                        except:

                            log.info('could not connect to Archiver: : {}',archiverURL)
                            return {'initialized':False}







        else:
             log.info('Unkwown Archiver URL: : {}',archiverURL)
    else:
        socketio.emit('redirectToLogIn',room=request.sid,namespace='/pvServer')



@socketio.on('adminAllUsers', namespace='/pvServer')
def adminAllUsers(message):
    global clientPVlist,REACT_APP_DisableLogin,clientDbWatchList,myDbWatchUid,thread_lock

    isAdmin=checkIfAdmin(message['clientAuthorisation'])
    if isAdmin :
        
        try:
            MONGO_ROOT_USERNAME = os.environ['MONGO_ROOT_USERNAME']
            MONGO_ROOT_PASSWORD = os.environ['MONGO_ROOT_PASSWORD']
            MONGO_ROOT_USERNAME = urllib.parse.quote_plus(
                MONGO_ROOT_USERNAME)
            MONGO_ROOT_PASSWORD = urllib.parse.quote_plus(
                MONGO_ROOT_PASSWORD)
            mongoAuth = True
        except:
            mongoAuth = False

        try:
            ADMIN_PW_SALT_ROUNDS = int(
                os.environ['ADMIN_PW_SALT_ROUNDS'])
        except:
            ADMIN_PW_SALT_ROUNDS =12

        MONGO_INITDB_ADMIN_DATABASE='rasAdminDb'
        ADMIN_DATABASE=os.getenv('ADMIN_DATABASE')
        ADMIN_DATABASE_REPLICA_SET_NAME=str(os.getenv('ADMIN_DATABASE_REPLICA_SET_NAME'))
        if (ADMIN_DATABASE is None) :
            print("Enviroment variable ADMIN_DATABASE is not defined, can't intialize: ",MONGO_INITDB_ADMIN_DATABASE)
        else:
            try:
                if (mongoAuth):
                    client = MongoClient('mongodb://%s:%s@%s' %(MONGO_ROOT_USERNAME, MONGO_ROOT_PASSWORD, ADMIN_DATABASE), replicaSet=ADMIN_DATABASE_REPLICA_SET_NAME)
                    # Wait for MongoClient to discover the whole replica set and identify MASTER!
                    sleep(0.1)
                else:
                    client = MongoClient('mongodb://%s' % (ADMIN_DATABASE),replicaSet=ADMIN_DATABASE_REPLICA_SET_NAME)
                    # Wait for MongoClient to discover the whole replica set and identify MASTER!
                    sleep(0.1)
                dbnames = client.list_database_names()
                if (MONGO_INITDB_ADMIN_DATABASE not in dbnames):
                    print("Error cant connect to admin db",MONGO_INITDB_ADMIN_DATABASE)
                else:
                    mydb = client[MONGO_INITDB_ADMIN_DATABASE]
                    mycol=mydb['users']
                    query={}
                    projection={"password":0}
                    sort=[('$natural', 1)]
                    skip=0
                    limit=0
                    count=False
                    doc=mycol.find(query,projection)
                    data=dumps(doc)
                    eventName='databaseWatchData:'+'adminAllUsers'
                    d={'write_access':True,'data': data}
                    socketio.emit(eventName,d,room=str(request.sid),namespace='/pvServer')
                    watchEventName=eventName
                    myDbWatchUid= str(message['dbWatchId']+str(request.sid))
                    dbWatchId=str(myDbWatchUid)
                    with thread_lock:
                        if not (watchEventName in	clientDbWatchList):
                            dbWatch={}
                            dbWatch['watchEventName']=watchEventName
                            dbWatch['client']=client
                            dbWatch['db']=mydb
                            dbWatch['collection']=mycol
                            dbWatch['watch']=mycol.watch()
                            dbWatch['dbURL']=watchEventName
                            dbWatch['query']=query
                            dbWatch['projection']=projection
                            dbWatch['sort']=sort
                            dbWatch['skip']=skip
                            dbWatch['limit']=limit
                            dbWatch['count']=count
                            dbWatch['sockets']={
                                str(request.sid):{
                                    "dbWatchIds":{
                                        str(dbWatchId):True
                                    }
                                }
                            }
                            dbWatch['thread']=None
                            dbWatch['threadStarted']=False
                            dbWatch['closeWatch']=False
                            dbWatch['threadClosed']=False
                            clientDbWatchList[watchEventName]=dbWatch
                            join_room(str(watchEventName))
                            join_room(str(watchEventName)+'rw')
                        else:
                            if request.sid in clientDbWatchList[watchEventName]['sockets']:
                                if 'dbWatchIds' in clientDbWatchList[watchEventName]['sockets'][request.sid]:
                                    if  dbWatchId in clientDbWatchList[watchEventName]['sockets'][request.sid]['dbWatchIds']:
                                        log.info("not a unique id {} {}",dbWatchId,watchEventName)
                                    else:
                                        clientDbWatchList[watchEventName]['sockets'][request.sid]['dbWatchIds'][dbWatchId]=True
                                else:
                                    clientDbWatchList[watchEventName]['sockets'][request.sid]['dbWatchIds']={dbWatchId:True}
                            else:
                                clientDbWatchList[watchEventName]['sockets'][request.sid]={'dbWatchIds':{dbWatchId:True}}

                            join_room(str(watchEventName))
                            join_room(str(watchEventName)+'rw')

                        return {"dbWatchId":dbWatchId}
            except Exception as e:
                print("adminallusers",e)
                return "Ack: Could not connect to MongoDB ADMIN_DATABASE"
        
    else:
        socketio.emit('redirectToLogIn',room=request.sid,namespace='/pvServer')
        return "Ack: not authorised"

@socketio.on('adminWatchUAGs', namespace='/pvServer')
def adminWatchUAGs(message):
    global clientPVlist,REACT_APP_DisableLogin,clientDbWatchList,myDbWatchUid,thread_lock

    isAdmin=checkIfAdmin(message['clientAuthorisation'])
    if isAdmin :
        
        try:
            MONGO_ROOT_USERNAME = os.environ['MONGO_ROOT_USERNAME']
            MONGO_ROOT_PASSWORD = os.environ['MONGO_ROOT_PASSWORD']
            MONGO_ROOT_USERNAME = urllib.parse.quote_plus(
                MONGO_ROOT_USERNAME)
            MONGO_ROOT_PASSWORD = urllib.parse.quote_plus(
                MONGO_ROOT_PASSWORD)
            mongoAuth = True
        except:
            mongoAuth = False

        try:
            ADMIN_PW_SALT_ROUNDS = int(
                os.environ['ADMIN_PW_SALT_ROUNDS'])
        except:
            ADMIN_PW_SALT_ROUNDS =12

        MONGO_INITDB_ADMIN_DATABASE='rasAdminDb'
        ADMIN_DATABASE=os.getenv('ADMIN_DATABASE')
        ADMIN_DATABASE_REPLICA_SET_NAME=str(os.getenv('ADMIN_DATABASE_REPLICA_SET_NAME'))
        if (ADMIN_DATABASE is None) :
            print("Enviroment variable ADMIN_DATABASE is not defined, can't intialize: ",MONGO_INITDB_ADMIN_DATABASE)
        else:
            try:
                if (mongoAuth):
                    client = MongoClient('mongodb://%s:%s@%s' %(MONGO_ROOT_USERNAME, MONGO_ROOT_PASSWORD, ADMIN_DATABASE), replicaSet=ADMIN_DATABASE_REPLICA_SET_NAME)
                    # Wait for MongoClient to discover the whole replica set and identify MASTER!
                    sleep(0.1)
                else:
                    client = MongoClient('mongodb://%s' % (ADMIN_DATABASE),replicaSet=ADMIN_DATABASE_REPLICA_SET_NAME)
                    # Wait for MongoClient to discover the whole replica set and identify MASTER!
                    sleep(0.1)
                dbnames = client.list_database_names()
                if (MONGO_INITDB_ADMIN_DATABASE not in dbnames):
                    print("Error cant connect to admin db",MONGO_INITDB_ADMIN_DATABASE)
                else:
                    mydb = client[MONGO_INITDB_ADMIN_DATABASE]
                    mycol=mydb['pvAccess']
                    query={}
                    projection=None
                    sort=[('$natural', 1)]
                    skip=0
                    limit=0
                    count=False
                    doc=mycol.find(query,projection)
                    data=dumps(doc)
                    eventName='databaseWatchData:'+'adminWatchUAGs'
                    d={'write_access':True,'data': data}
                    socketio.emit(eventName,d,room=str(request.sid),namespace='/pvServer')
                    watchEventName=eventName
                    myDbWatchUid= str(message['dbWatchId']+str(request.sid))
                    dbWatchId=str(myDbWatchUid)
                    with thread_lock:
                        if not (watchEventName in	clientDbWatchList):
                            dbWatch={}
                            dbWatch['watchEventName']=watchEventName
                            dbWatch['client']=client
                            dbWatch['db']=mydb
                            dbWatch['collection']=mycol
                            dbWatch['watch']=mycol.watch()
                            dbWatch['dbURL']=watchEventName
                            dbWatch['query']=query
                            dbWatch['projection']=projection
                            dbWatch['sort']=sort
                            dbWatch['skip']=skip
                            dbWatch['limit']=limit
                            dbWatch['count']=count
                            dbWatch['sockets']={
                                str(request.sid):{
                                    "dbWatchIds":{
                                        str(dbWatchId):True
                                    }
                                }
                            }
                            dbWatch['thread']=None
                            dbWatch['threadStarted']=False
                            dbWatch['closeWatch']=False
                            dbWatch['threadClosed']=False
                            clientDbWatchList[watchEventName]=dbWatch
                            join_room(str(watchEventName))
                            join_room(str(watchEventName)+'rw')
                        else:

                            if request.sid in clientDbWatchList[watchEventName]['sockets']:
                                if 'dbWatchIds' in clientDbWatchList[watchEventName]['sockets'][request.sid]:
                                    if  dbWatchId in clientDbWatchList[watchEventName]['sockets'][request.sid]['dbWatchIds']:
                                        log.info("not a unique id {} {}",dbWatchId,watchEventName)
                        #               print("allConnectionIds ",clientDbWatchList[watchEventName]['sockets'][request.sid]['dbWatchIds'])
                                    else:
                                        clientDbWatchList[watchEventName]['sockets'][request.sid]['dbWatchIds'][dbWatchId]=True
                                else:
                                    clientDbWatchList[watchEventName]['sockets'][request.sid]['dbWatchIds']={dbWatchId:True}
                            else:
                                clientDbWatchList[watchEventName]['sockets'][request.sid]={'dbWatchIds':{dbWatchId:True}}

                            join_room(str(watchEventName))
                            join_room(str(watchEventName)+'rw')

                        return {"dbWatchId":dbWatchId}
            except Exception as e:
                print("adminWatchUAGs",e)
                return "Ack: Could not connect to MongoDB ADMIN_DATABASE"
        
    else:
        socketio.emit('redirectToLogIn',room=request.sid,namespace='/pvServer')
        return "Ack: not authorised"



@socketio.on('adminAddUser', namespace='/pvServer')
def adminAddUser(message):
    global clientPVlist,REACT_APP_DisableLogin,clientDbWatchList,myDbWatchUid
    # print("message",message)
    isAdmin=checkIfAdmin(message['clientAuthorisation'])
    if isAdmin :
        # print("isAdmin",isAdmin)
        try:
            MONGO_ROOT_USERNAME = os.environ['MONGO_ROOT_USERNAME']
            MONGO_ROOT_PASSWORD = os.environ['MONGO_ROOT_PASSWORD']
            MONGO_ROOT_USERNAME = urllib.parse.quote_plus(
                MONGO_ROOT_USERNAME)
            MONGO_ROOT_PASSWORD = urllib.parse.quote_plus(
                MONGO_ROOT_PASSWORD)
            mongoAuth = True
        except:
            mongoAuth = False

        try:
            ADMIN_PW_SALT_ROUNDS = int(
                os.environ['ADMIN_PW_SALT_ROUNDS'])
        except:
            ADMIN_PW_SALT_ROUNDS =12

        MONGO_INITDB_ADMIN_DATABASE='rasAdminDb'
        ADMIN_DATABASE=os.getenv('ADMIN_DATABASE')
        ADMIN_DATABASE_REPLICA_SET_NAME=str(os.getenv('ADMIN_DATABASE_REPLICA_SET_NAME'))
        if (ADMIN_DATABASE is None) :
            print("Enviroment variable ADMIN_DATABASE is not defined, can't intialize: ",MONGO_INITDB_ADMIN_DATABASE)
        else:
            try:
                if (mongoAuth):
                    client = MongoClient('mongodb://%s:%s@%s' %(MONGO_ROOT_USERNAME, MONGO_ROOT_PASSWORD, ADMIN_DATABASE), replicaSet=ADMIN_DATABASE_REPLICA_SET_NAME)
                    # Wait for MongoClient to discover the whole replica set and identify MASTER!
                    sleep(0.1)
                else:
                    client = MongoClient('mongodb://%s' % (ADMIN_DATABASE),replicaSet=ADMIN_DATABASE_REPLICA_SET_NAME)
                    # Wait for MongoClient to discover the whole replica set and identify MASTER!
                    sleep(0.1)
                dbnames = client.list_database_names()
                if (MONGO_INITDB_ADMIN_DATABASE not in dbnames):
                    print("Error cant connect to admin db",MONGO_INITDB_ADMIN_DATABASE)
                else:
                    print("connected to adminDb",MONGO_INITDB_ADMIN_DATABASE)

                    mydb = client[MONGO_INITDB_ADMIN_DATABASE]
                    mycol=mydb['users']
                    user=message["user"]
                    existingUser=mycol.find_one({'username':user['username']})
                    if existingUser:
                        return "Error: Username Exists"
                    else:
                        user['enabled']=True
                        now = datetime.now()
                        timestamp = datetime.timestamp(now)
                        user['pwTimestamp']=timestamp
                        if user['password']:
                            user['password']=(bcrypt.hashpw(user['password'].encode('utf-8'), bcrypt.gensalt(ADMIN_PW_SALT_ROUNDS))).decode('utf-8')
                        mycol.insert_one(user)
                    return "OK"
            except Exception as e:
                print("admin add user error",e)
                return "Ack: Could not connect to MongoDB ADMIN_DATABASE"
        
    else:
        socketio.emit('redirectToLogIn',room=request.sid,namespace='/pvServer')
        return "Ack: not authorised"    



@socketio.on('adminDeleteUser', namespace='/pvServer')
def adminAddUser(message):
    global clientPVlist,REACT_APP_DisableLogin,clientDbWatchList,myDbWatchUid
    # print("message",message)
    isAdmin=checkIfAdmin(message['clientAuthorisation'])
    if isAdmin :
        # print("isAdmin",isAdmin)
        try:
            MONGO_ROOT_USERNAME = os.environ['MONGO_ROOT_USERNAME']
            MONGO_ROOT_PASSWORD = os.environ['MONGO_ROOT_PASSWORD']
            MONGO_ROOT_USERNAME = urllib.parse.quote_plus(
                MONGO_ROOT_USERNAME)
            MONGO_ROOT_PASSWORD = urllib.parse.quote_plus(
                MONGO_ROOT_PASSWORD)
            mongoAuth = True
        except:
            mongoAuth = False

        try:
            ADMIN_PW_SALT_ROUNDS = int(
                os.environ['ADMIN_PW_SALT_ROUNDS'])
        except:
            ADMIN_PW_SALT_ROUNDS =12

        MONGO_INITDB_ADMIN_DATABASE='rasAdminDb'
        ADMIN_DATABASE=os.getenv('ADMIN_DATABASE')
        ADMIN_DATABASE_REPLICA_SET_NAME=str(os.getenv('ADMIN_DATABASE_REPLICA_SET_NAME'))
        if (ADMIN_DATABASE is None) :
            print("Enviroment variable ADMIN_DATABASE is not defined, can't intialize: ",MONGO_INITDB_ADMIN_DATABASE)
        else:
            try:
                if (mongoAuth):
                    client = MongoClient('mongodb://%s:%s@%s' %(MONGO_ROOT_USERNAME, MONGO_ROOT_PASSWORD, ADMIN_DATABASE), replicaSet=ADMIN_DATABASE_REPLICA_SET_NAME)
                    # Wait for MongoClient to discover the whole replica set and identify MASTER!
                    sleep(0.1)
                else:
                    client = MongoClient('mongodb://%s' % (ADMIN_DATABASE),replicaSet=ADMIN_DATABASE_REPLICA_SET_NAME)
                    # Wait for MongoClient to discover the whole replica set and identify MASTER!
                    sleep(0.1)
                dbnames = client.list_database_names()
                if (MONGO_INITDB_ADMIN_DATABASE not in dbnames):
                    print("Error cant connect to admin db",MONGO_INITDB_ADMIN_DATABASE)
                else:
                    print("connected to adminDb",MONGO_INITDB_ADMIN_DATABASE)

                    mydb = client[MONGO_INITDB_ADMIN_DATABASE]
                    mycol=mydb['users']
                    
                    try:
                        id=message['id']
                        mycol.delete_one({'_id':ObjectId(str(id))})

                    except Exception as e:
                        log.info(e)
                        return 'Error:could not delete the user'

                    return 'OK'
            except Exception as e:
                print("admin add user error",e)
                return "Ack: Could not connect to MongoDB ADMIN_DATABASE"
        
    else:
        socketio.emit('redirectToLogIn',room=request.sid,namespace='/pvServer')
        return "Ack: not authorised"    

@socketio.on('adminEnableUser', namespace='/pvServer')
def adminAddUser(message):
    global clientPVlist,REACT_APP_DisableLogin,clientDbWatchList,myDbWatchUid
    # print("message",message)
    isAdmin=checkIfAdmin(message['clientAuthorisation'])
    if isAdmin :
        # print("isAdmin",isAdmin)
        try:
            MONGO_ROOT_USERNAME = os.environ['MONGO_ROOT_USERNAME']
            MONGO_ROOT_PASSWORD = os.environ['MONGO_ROOT_PASSWORD']
            MONGO_ROOT_USERNAME = urllib.parse.quote_plus(
                MONGO_ROOT_USERNAME)
            MONGO_ROOT_PASSWORD = urllib.parse.quote_plus(
                MONGO_ROOT_PASSWORD)
            mongoAuth = True
        except:
            mongoAuth = False

       

        MONGO_INITDB_ADMIN_DATABASE='rasAdminDb'
        ADMIN_DATABASE=os.getenv('ADMIN_DATABASE')
        ADMIN_DATABASE_REPLICA_SET_NAME=str(os.getenv('ADMIN_DATABASE_REPLICA_SET_NAME'))
        if (ADMIN_DATABASE is None) :
            print("Enviroment variable ADMIN_DATABASE is not defined, can't intialize: ",MONGO_INITDB_ADMIN_DATABASE)
        else:
            try:
                if (mongoAuth):
                    client = MongoClient('mongodb://%s:%s@%s' %(MONGO_ROOT_USERNAME, MONGO_ROOT_PASSWORD, ADMIN_DATABASE), replicaSet=ADMIN_DATABASE_REPLICA_SET_NAME)
                    # Wait for MongoClient to discover the whole replica set and identify MASTER!
                    sleep(0.1)
                else:
                    client = MongoClient('mongodb://%s' % (ADMIN_DATABASE),replicaSet=ADMIN_DATABASE_REPLICA_SET_NAME)
                    # Wait for MongoClient to discover the whole replica set and identify MASTER!
                    sleep(0.1)
                dbnames = client.list_database_names()
                if (MONGO_INITDB_ADMIN_DATABASE not in dbnames):
                    print("Error cant connect to admin db",MONGO_INITDB_ADMIN_DATABASE)
                else:
                    print("connected to adminDb",MONGO_INITDB_ADMIN_DATABASE)

                    mydb = client[MONGO_INITDB_ADMIN_DATABASE]
                    mycol=mydb['users']
                    id=message['id']
                    enabled=message['enabled']
                    print(message)
                    try:
                        mycol.update_one({'_id':ObjectId(str(id))}, { "$set": { "enabled": enabled}})
                    except Exception as e:
                        log.info(e)
                        return("error: can't update user ")
                    return 'OK'
            except Exception as e:
                print("admin enable user error",e)
                return "Ack: Could not connect to MongoDB ADMIN_DATABASE"
        
    else:
        socketio.emit('redirectToLogIn',room=request.sid,namespace='/pvServer')
        return "Ack: not authorised"


@socketio.on('adminUpdateUAGs', namespace='/pvServer')
def adminAddUser(message):
    global clientPVlist,REACT_APP_DisableLogin,clientDbWatchList,myDbWatchUid
    # print("message",message)
    isAdmin=checkIfAdmin(message['clientAuthorisation'])
    if isAdmin :
        # print("isAdmin",isAdmin)
        try:
            MONGO_ROOT_USERNAME = os.environ['MONGO_ROOT_USERNAME']
            MONGO_ROOT_PASSWORD = os.environ['MONGO_ROOT_PASSWORD']
            MONGO_ROOT_USERNAME = urllib.parse.quote_plus(
                MONGO_ROOT_USERNAME)
            MONGO_ROOT_PASSWORD = urllib.parse.quote_plus(
                MONGO_ROOT_PASSWORD)
            mongoAuth = True
        except:
            mongoAuth = False

       

        MONGO_INITDB_ADMIN_DATABASE='rasAdminDb'
        ADMIN_DATABASE=os.getenv('ADMIN_DATABASE')
        ADMIN_DATABASE_REPLICA_SET_NAME=str(os.getenv('ADMIN_DATABASE_REPLICA_SET_NAME'))
        if (ADMIN_DATABASE is None) :
            print("Enviroment variable ADMIN_DATABASE is not defined, can't intialize: ",MONGO_INITDB_ADMIN_DATABASE)
        else:
            try:
                if (mongoAuth):
                    client = MongoClient('mongodb://%s:%s@%s' %(MONGO_ROOT_USERNAME, MONGO_ROOT_PASSWORD, ADMIN_DATABASE), replicaSet=ADMIN_DATABASE_REPLICA_SET_NAME)
                    # Wait for MongoClient to discover the whole replica set and identify MASTER!
                    sleep(0.1)
                else:
                    client = MongoClient('mongodb://%s' % (ADMIN_DATABASE),replicaSet=ADMIN_DATABASE_REPLICA_SET_NAME)
                    # Wait for MongoClient to discover the whole replica set and identify MASTER!
                    sleep(0.1)
                dbnames = client.list_database_names()
                if (MONGO_INITDB_ADMIN_DATABASE not in dbnames):
                    print("Error cant connect to admin db",MONGO_INITDB_ADMIN_DATABASE)
                else:
                    print("connected to adminDb",MONGO_INITDB_ADMIN_DATABASE)

                    mydb = client[MONGO_INITDB_ADMIN_DATABASE]
                    mycol=mydb['pvAccess']
                    id=message['id']
                    # enabled=message['enabled']
                    userGroups=message['UAGs']
                    print(message)
                    try:
                        mycol.update_one({'_id':ObjectId(str(id))},{ "$set": { "userGroups":userGroups }})
                    except Exception as e:
                        log.info(e)
                        return("error: can't update UAGs ")
                    return 'OK'
            except Exception as e:
                print("admin enable user error",e)
                return "Ack: Could not connect to MongoDB ADMIN_DATABASE"
        
    else:
        socketio.emit('redirectToLogIn',room=request.sid,namespace='/pvServer')
        return "Ack: not authorised"



@socketio.on('AuthenticateClient', namespace='/pvServer')
def authenticate(message):
    print("Error, old socket io authentication is disabled")
    # global REACT_APP_DisableLogin

    # if (not REACT_APP_DisableLogin ):
    #     userData=LocalAuthenticateUser(message['user'])
    #     if not (userData is None) :
    #         emit('clientAuthenticated', {'successful': True, 'jwt':userData['JWT'],'username':userData['username'],'roles':userData['roles']},room=request.sid,namespace='/pvServer')
    #     else:
    #         emit('clientAuthenticated', {'successful': False},room=request.sid,namespace='/pvServer')
    #         socketio.emit('redirectToLogIn',room=request.sid,namespace='/pvServer')
    # else:
    #     emit('clientAuthenticated', {'successful': True, 'jwt':'anonomous'},room=request.sid,namespace='/pvServer')

@socketio.on('AuthoriseClient', namespace='/pvServer')
def test_authenticate(message):
    global REACT_APP_DisableLogin

    if (not REACT_APP_DisableLogin ):
        userData=AuthoriseUser(message)
        #print(str(userData))
        if userData['authorised']:
            emit('clientAuthorisation', {'successful': True,'username':userData['username'],'roles':userData['roles']},room=request.sid,namespace='/pvServer')
        else:
            emit('clientAuthorisation', {'successful': False},room=request.sid,namespace='/pvServer')
            socketio.emit('redirectToLogIn',room=request.sid,namespace='/pvServer')
            disconnect(request.sid,namespace='/pvServer')
    else:
        emit('clientAuthorisation', {'successful': True},room=request.sid,namespace='/pvServer')



@socketio.on('connect', namespace='/pvServer')
def test_connect():
    global thread
    log.info('Client Connected: {}',request.sid)
    with thread_lock:
        if thread is None:
            thread = socketio.start_background_task(background_thread)
    emit('my_response', {'data': 'Connected', 'count': 0})


@socketio.on('disconnect', namespace='/pvServer')
def test_disconnect():
    global clientDbWatchList
    print("disconnected",request.sid)
    log.info('Client disconnected: {}',request.sid)
    for pvname1 in	clientPVlist:
        if "pva://" in pvname1:

            try:
                leave_room(str(pvname1)+'rw')
                clientPVlist[pvname1]['socketsRW'].pop(request.sid)
            except:
                pass
            try:
                leave_room(str(pvname1)+'ro')
                clientPVlist[pvname1]['socketsRO'].pop(request.sid)
            except:
                pass
            try:
                leave_room(str(pvname1))
                clientPVlist[pvname1]['sockets'].pop(request.sid)
            except:
                pass

            #print("disconn sockets",clientPVlist[pvname1]['sockets'])
            #print("disconn socketsRO",clientPVlist[pvname1]['socketsRO'])
            #print("disconn socketsRW",clientPVlist[pvname1]['socketsRW'])


        else:
            log.info("Unknown PV type ({})", pvname1)
    try:
        print(list(clientDbWatchList))
        for watchEventName in list(clientDbWatchList) :
            socketId=str(request.sid)
            print("socketId ",socketId,watchEventName)
            if socketId in list(clientDbWatchList[watchEventName]['sockets']):
                print("socketId found",socketId,watchEventName)
                clientDbWatchList[watchEventName]['sockets'].pop(str(request.sid),None)
    except Exception as e:
        print("disconnect",e)
        pass
    disconnect(request.sid,namespace='/pvServer')


if __name__ == '__main__':
    REACT_APP_PyEpicsServerURL=os.getenv('REACT_APP_PyEpicsServerBASEURL')
    REACT_APP_PyEpicsServerPORT=os.getenv('REACT_APP_PyEpicsServerPORT')
    if (REACT_APP_PyEpicsServerPORT is None):
        REACT_APP_PyEpicsServerPORT='5000'

    REACT_APP_PyEpicsServerURL=REACT_APP_PyEpicsServerURL+':'+REACT_APP_PyEpicsServerPORT+'/'+'pvServer'
    print("pvServer URL: ",REACT_APP_PyEpicsServerURL)
    print("")
    if not (REACT_APP_PyEpicsServerURL is None):
        if 'https' in REACT_APP_PyEpicsServerURL:
            socketio.run(app, host='0.0.0.0', debug=True, port=int(REACT_APP_PyEpicsServerPORT,10), keyfile='../certificates/server.key', certfile='../certificates/server.cer',use_reloader=False)
        else:
            socketio.run(app,host='0.0.0.0',port=int(REACT_APP_PyEpicsServerPORT,10),  debug=True,use_reloader=False)
    else:
        socketio.run(app,host='127.0.0.1',  debug=True,use_reloader=False)
