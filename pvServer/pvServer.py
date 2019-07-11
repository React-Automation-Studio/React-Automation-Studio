#!/usr/bin/env python
import gevent
from gevent import monkey; monkey.patch_all()
import time

import threading

from flask import Flask, render_template, session, request, jsonify
from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect

from epics import PV
import logging
import os
import sys
sys.path.insert(0, '../')
sys.path.insert(0, 'userAuthentication/')

from authenticate import  AuthoriseUser,AutheriseUserAndPermissions, AuthenticateUser
from dotenv import load_dotenv
load_dotenv()
# Set this variable to "threading", "eventlet" or "gevent" to test the
# different async modes, or leave it set to None for the application to choose
# the best option based on installed packages.
async_mode = 'gevent'
print("")
print('**************************************')
print("Automation Studio: pvServer Ver 1.001")
print("")
print("Environment Variables:")
print("")
print('PYEPICS_LIBCA: '+ str(os.environ['PYEPICS_LIBCA']))
print('EPICS_BASE: '+ str(os.environ['EPICS_BASE']))
print('EPICS_CA_ADDR_LIST: '+ str(os.environ['EPICS_CA_ADDR_LIST']))
print('REACT_APP_PyEpicsServerBASEURL: '+ str(os.environ['REACT_APP_PyEpicsServerBASEURL']))
print('REACT_APP_PyEpicsServerPORT: '+ str(os.environ['REACT_APP_PyEpicsServerPORT']))
print('REACT_APP_PyEpicsServerNamespace: '+ str(os.environ['REACT_APP_PyEpicsServerNamespace']))
print('REACT_APP_EnableLogin: '+ str(os.environ['REACT_APP_EnableLogin']))
print("")
#app = Flask(__name__, static_folder="../build/static", template_folder="../build")
app = Flask(__name__)
#@app.route('/', defaults={'path': ''})
#@app.route('/<path:path>')
#def index(path):

#    return render_template('index.html', async_mode=socketio.async_mode)




REACT_APP_DisableLogin=not(os.getenv('REACT_APP_EnableLogin')=='true')
if (REACT_APP_DisableLogin) :
    print("Authenitcation and Authorisation is DISABLED")
else:
    print("Authenitcation and Authorisation is ENABLED")
print("")

socketio = SocketIO(app, async_mode=async_mode)
thread = None
thread_lock = threading.Lock()

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)



clientPVlist={};


def check_pv_initialized_after_disconnect():


    global clientPVlist
    while (True):
       for pvname in clientPVlist :
          if (clientPVlist[pvname]['initialized']==False):
              if (clientPVlist[pvname]['isConnected']):
                  clientPVlist[pvname]['pv'].get(as_string=True)
                  d=clientPVlist[pvname]['pv'].get_with_metadata(with_ctrlvars=True,use_monitor=True)
                  if  (clientPVlist[pvname]['pv'].value)!=None :
                      for keys in d:
                          if(str(d[keys])=='nan'):
                              d[keys]=None
                      if(clientPVlist[pvname]['pv'].count >1):
                          d['value']=list(d['value'])
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

                      except TypeError:
                        #"A type error exists in metadata dictionary and can't be converted into JSON format, previously this was caused by in CHID of type c_long(), a work arround exits, if CHID is not a c_long then try debugging")
                          print("***EPICS PV info initial request info error: ")
                          print("PV name: "+ str(pvname))
                          print("PyEpics PV metadata: "+ str(d))
                          print("A type error exists in metadata dictionary and can't be converted into JSON format, previously this was caused by in CHID of type c_long(), a work arround exits, if CHID is not a c_long then try debugging")
                          clientPVlist[pvname]['isConnected']=True
                          clientPVlist[pvname]['initialized']=False
                          d={}
                          d['pvname']= pvname
                          d['connected']= '0'
                          socketio.emit(pvname,d,room=str(pvname),namespace='/pvServer')
                      except:
                          print("Unexpected error:", sys.exc_info()[0])
                          raise

       time.sleep(0.1)



def onValueChanges(pvname=None,count=None,char_value=None,severity=None,status=None, value=None, timestamp=None, **kw):
    global clientPVList
    pvname1='pva://'+str(pvname)
    if(clientPVlist[pvname1]['initialized']==True):
        if (float(count)== 1):
           socketio.emit(pvname1,
              {'pvname': pvname1,'newmetadata': 'False','value': str(value),'char_value': str(char_value),'count':count, 'connected':'1', 'severity': severity,'timestamp':timestamp
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
                except:
                    print("***EPICS PV put error: ")
                    print("PV name: "+ str(pvname2))
                    print("Value to put : "+str(message['data']))



            else: print("Unknown PV type")
        else:
            print("***PV put error: write access denied ")
            print("PV name: "+ str(message['pvname']))
            print("Value to put : "+str(message['data']))
    else:
        socketio.emit('redirectToLogIn',room=request.sid,namespace='/pvServer')






@socketio.on('request_pv_info', namespace='/pvServer')
def test_message(message):
    global clientPVlist,REACT_APP_DisableLogin
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
                    if(accessControl['permissions']['write']):
                        join_room(str(pvname1)+'rw')
                        join_room(str(pvname1))
                    else:
                        join_room(str(pvname1)+'ro')
                        join_room(str(pvname1))
                    pvname2=pvname1.replace("pva://","")
                    pv= PV(pvname2,connection_timeout=0.002,connection_callback= onConnectionChange)
                    pvlist={}
                    pvlist['pv']=pv
                    pvlist['isConnected']=False
                    pvlist['initialized']=False
                    clientPVlist[pvname1]=pvlist
                    clientPVlist[pvname1]['pv'].add_callback(onValueChanges,index=0)


        else:

            if "pva://" in pvname1:
                if(accessControl['permissions']['read']):
                    if(accessControl['permissions']['write']):
                        join_room(str(pvname1)+'rw')
                        join_room(str(pvname1))
                    else:
                        join_room(str(pvname1)+'ro')
                        join_room(str(pvname1))
                    pvname2=pvname1.replace("pva://","")
                    clientPVlist[pvname1]['initialized']=False


            else: print("Unknown PV type")
    else:
        socketio.emit('redirectToLogIn',room=request.sid,namespace='/pvServer')


@socketio.on('AuthenticateClient', namespace='/pvServer')
def test_authorise(message):
    global REACT_APP_DisableLogin

    if (not REACT_APP_DisableLogin ):
        jwt=AuthenticateUser(message['user'])
        if not (jwt is None) :
            emit('clientAuthenticated', {'successful': True, 'jwt':jwt},room=request.sid,namespace='/pvServer')
        else:
            emit('clientAuthenticated', {'successful': False},room=request.sid,namespace='/pvServer')
            socketio.emit('redirectToLogIn',room=request.sid,namespace='/pvServer')
    else:
        emit('clientAuthenticated', {'successful': True, 'jwt':'anonomous'},room=request.sid,namespace='/pvServer')

@socketio.on('AuthoriseClient', namespace='/pvServer')
def test_authenticate(message):
    global REACT_APP_DisableLogin

    if (not REACT_APP_DisableLogin ):
        if  AuthoriseUser(message):
            emit('clientAuthorisation', {'successful': True},room=request.sid,namespace='/pvServer')
        else:
            emit('clientAuthorisation', {'successful': False},room=request.sid,namespace='/pvServer')
            socketio.emit('redirectToLogIn',room=request.sid,namespace='/pvServer')
            disconnect(request.sid,namespace='/pvServer')
    else:
        emit('clientAuthorisation', {'successful': True},room=request.sid,namespace='/pvServer')



@socketio.on('connect', namespace='/pvServer')
def test_connect():
    global thread
    print("Client Connected: " +request.sid)
    with thread_lock:
        if thread is None:
            thread = socketio.start_background_task(background_thread)
    emit('my_response', {'data': 'Connected', 'count': 0})


@socketio.on('disconnect', namespace='/pvServer')
def test_disconnect():
    print('Client disconnected', request.sid)
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
            socketio.run(app, host='0.0.0.0', debug=True, port=int(REACT_APP_PyEpicsServerPORT,10), keyfile='../certificates/server.key', certfile='../certificates/server.cer')
        else:
            socketio.run(app,host='0.0.0.0',port=int(REACT_APP_PyEpicsServerPORT,10),  debug=True)
    else:
        socketio.run(app,host='127.0.0.1',  debug=True)
