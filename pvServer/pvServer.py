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

from authenticate import authenticateUser, authoriseUser
from dotenv import load_dotenv
load_dotenv()
# Set this variable to "threading", "eventlet" or "gevent" to test the
# different async modes, or leave it set to None for the application to choose
# the best option based on installed packages.
async_mode = 'gevent'
print("")
print('**************************************')
print("Automation Studio: pvServer Ver 1.000")
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
app = Flask(__name__, static_folder="../build/static", template_folder="../build")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):

    return render_template('index.html', async_mode=socketio.async_mode)




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
                  pvname2=pvname.replace("pva://","")

                  if  (clientPVlist[pvname]['pv'].value)!=None :
                      d=clientPVlist[pvname]['pv'].get_with_metadata(with_ctrlvars=True,use_monitor=False)
                      for keys in d:
                          if(str(d[keys])=='nan'):
                              d[keys]=None
                      if(clientPVlist[pvname]['pv'].count >1):
                          d['value']=list(clientPVlist[pvname]['pv'].value)
                      else:
                          d['value']=str(clientPVlist[pvname]['pv'].value )
                      d['pvname']=str(pvname)
                      d['newmetadata']= 'True'
                      d['connected']= '1'
                      d['count']=clientPVlist[pvname]['pv'].count
                      d['severity']=clientPVlist[pvname]['pv'].severity
                      d['emitter']="function:d['severity']=clientPVlist[pvname]['pv'].severity: try"
                      clientPVlist[pvname]['initialized']=True
                      socketio.emit(pvname,d,room=str(pvname),namespace='/test')

              else:
                  d={}
                  d['pvname']= pvname
                  d['connected']= '0'
                  d['emitter']="function:d['severity']=clientPVlist[pvname]['pv'].severity: else: not connected"
                  socketio.emit(pvname,d,room=str(pvname),namespace='/test')

       time.sleep(1)



def onValueChanges(pvname=None,count=None,char_value=None,severity=None,status=None, value=None, timestamp=None, **kw):
    global clientPVList
    pvname1='pva://'+str(pvname)
    if(clientPVlist[pvname1]['initialized']==True):
        if (float(count)== 1):
           socketio.emit(pvname1,
              {'pvname': pvname1,'newmetadata': 'False','value': str(value),'char_value': str(char_value),'count':count, 'connected':'1', 'severity': severity,'timestamp':timestamp
              },room='pva://'+str(pvname),namespace='/test')
        else:
           d={'pvname': pvname1,'newmetadata': 'False','value': list((value)),'count':count, 'connected':'1', 'severity': severity,'timestamp':timestamp}
           socketio.emit(pvname1,d,room='pva://'+str(pvname),namespace='/test')


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
        d['emitter']="onConnectionChange: disconneted"
        try:
            clientPVlist[pvname1]['isConnected']=False
            clientPVlist[pvname1]['initialized']=False
            socketio.emit(pvname1,d,room=str(pvname),namespace='/test')
        except:
            error=2



def background_thread():
    """Example of how to send server generated events to clients."""
    count = 0
    threading.Thread(target=check_pv_initialized_after_disconnect).start()

    while True:
        socketio.sleep(0.1)





@socketio.on('write_to_pv', namespace='/test')
def test_write(message):
    global clientPVlist,thread_lock2,REACT_APP_DisableLogin
    authenticated=False
    if REACT_APP_DisableLogin:
        authenticated=True
    else :
        authenticated=authenticateUser(message['authentication'])

    if authenticated :
        pvname1= str(message['pvname'])

        if not (pvname1 in	clientPVlist):

            if "pva://" in pvname1:
               pvname2=pvname1.replace("pva://","")
               pv=PV(pvname2,auto_monitor=True,connection_timeout=0.2,callback= onValueChanges,connection_callback= onConnectionChange)
               pvlist={}
               pvlist['pv']=pv
               pvlist['isConnected']=False
               pvlist['initialized']=False
               clientPVlist[pvname1]=pvlist
               d=(clientPVlist[pvname1]['pv'].get_with_metadata(with_ctrlvars=True,use_monitor=False))

               if  (clientPVlist[pvname1]['isConnected']):
                   if( not clientPVlist[pvname1]['initialized']):
                       if  (clientPVlist[pvname1]['pv'].value)!=None :
                           d=(clientPVlist[pvname1]['pv'].get_with_metadata(with_ctrlvars=True,use_monitor=False))
                       if(clientPVlist[pvname1]['pv'].count >1):
                           d['value']=list(d['value'])
                       d['pvname']= pvname1
                       d['newmetadata']= 'True'
                       d['connected']= '1'

                       clientPVlist[pvname1]['initialized']=True
                       pvname2=pvname1.replace("pva://","")
                       try:
                           clientPVlist[pvname1]['pv'].put(message['data']);
                       except:
                           print("***EPICS PV put error: ")
                           print("PV name: "+ str(pvname2))
                           print("Value to put : "+str(message['data']))
               else:
                  d={}
                  d['pvname']= pvname2
                  d['connected']= '0'
                  d['emitter']="write_to_pv: pv not in list"
                  socketio.emit(pvname1,d,namespace='/test')


            else: print("Unknown PV type")
        else:

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
        socketio.emit('redirectToLogIn',room=request.sid,namespace='/test')






@socketio.on('request_pv_info', namespace='/test')
def test_message(message):
    global clientPVlist,REACT_APP_DisableLogin
    pvname1= str(message['data'])
    authenticated=False
    if REACT_APP_DisableLogin:
        authenticated=True
    else :
        authenticated=authenticateUser(message['authentication'])

    if authenticated :

        if not (pvname1 in	clientPVlist):

            if "pva://" in pvname1:

                join_room(str(pvname1))
                pvname2=pvname1.replace("pva://","")

                pv= PV(pvname2,connection_timeout=0.2,connection_callback= onConnectionChange)
                pv.get(as_string=True)
                pvlist={}
                pvlist['pv']=pv
                pvlist['isConnected']=False
                pvlist['initialized']=False
                clientPVlist[pvname1]=pvlist



                d=(clientPVlist[pvname1]['pv'].get_with_metadata(with_ctrlvars=True,use_monitor=False))
                clientPVlist[pvname1]['pv'].add_callback(onValueChanges,index=0)

                if  (clientPVlist[pvname1]['pv'].value)!=None :
                    for keys in d:
                        if(str(d[keys])=='nan'):
                            d[keys]=None
                    if(clientPVlist[pvname1]['pv'].count >1):
                        d['value']=list(d['value'])
                    d['pvname']= pvname1
                    d['newmetadata']= 'True'
                    d['connected']= '1'

                    d['emitter']="request_pv_info: pv not in list"
                    d['chid']=str(d['chid'])
                    try:
                        socketio.emit(pvname1,d,room=str(pvname1),namespace='/test')
                        clientPVlist[pvname1]['isConnected']=True
                        clientPVlist[pvname1]['initialized']=True

                    except TypeError:
                        #"A type error exists in metadata dictionary and can't be converted into JSON format, previously this was caused by in CHID of type c_long(), a work arround exits, if CHID is not a c_long then try debugging")
                        print("***EPICS PV info initial request info error: ")
                        print("PV name: "+ str(pvname1))
                        print("PyEpics PV metadata: "+ str(d))
                        print("A type error exists in metadata dictionary and can't be converted into JSON format, previously this was caused by in CHID of type c_long(), a work arround exits, if CHID is not a c_long then try debugging")
                        clientPVlist[pvname1]['isConnected']=False
                        clientPVlist[pvname1]['initialized']=False
                        d={}
                        d['pvname']= pvname2
                        d['connected']= '0'
                        socketio.emit(pvname1,d,room=str(pvname1),namespace='/test')
                    except:
                        print("Unexpected error:", sys.exc_info()[0])
                        raise






                else:
                    d={}
                    d['pvname']= pvname2
                    d['connected']= '0'
                    socketio.emit(pvname1,d,room=str(pvname1),namespace='/test')





            else: print("Unknown PV type")
        else:

            if "pva://" in pvname1:
                join_room(str(pvname1))
                pvname2=pvname1.replace("pva://","")
                clientPVlist[pvname1]['initialized']=False
                if  (clientPVlist[pvname1]['pv'].value)!=None:
                    d=(clientPVlist[pvname1]['pv'].get_with_metadata(with_ctrlvars=True,use_monitor=False))

                    for keys in d:
                        if(str(d[keys])=='nan'):
                            d[keys]=None
                    d['pvname']= pvname1
                    if(clientPVlist[pvname1]['pv'].count >1):
                        d['value']=list(d['value'])
                    d['newmetadata']= 'True'
                    d['connected']= '1'
                    d['emitter']="request_pv_info: pv already  in list"
                    d['chid']=str(d['chid'])

                    try:
                        socketio.emit(pvname1,d,room=str(pvname1),namespace='/test')
                        clientPVlist[pvname1]['isConnected']=True
                        clientPVlist[pvname1]['initialized']=True

                    except TypeError:
                        print("***EPICS PV info initial request info error: ")
                        print("PV name: "+ str(pvname1))
                        print("PyEpics PV metadata: "+ str(d))
                        print("A type error exists in metadata dictionary and can't be converted into JSON format, previously this was caused by in CHID of type c_long(), a work arround exits, if CHID is not a c_long then try debugging")
                        clientPVlist[pvname1]['isConnected']=False
                        clientPVlist[pvname1]['initialized']=False
                        d={}
                        d['pvname']= pvname2
                        d['connected']= '0'
                        socketio.emit(pvname1,d,room=str(pvname1),namespace='/test')
                    except:
                        print("Unexpected error:", sys.exc_info()[0])
                        raise



            else: print("Unknown PV type")
    else:
        socketio.emit('redirectToLogIn',room=request.sid,namespace='/test')


@socketio.on('Authorise', namespace='/test')
def test_authorise(message):
    global REACT_APP_DisableLogin

    if (not REACT_APP_DisableLogin ):
        jwt=authoriseUser(message['user'])
        if not (jwt is None) :
            emit('authorised', {'successful': True, 'jwt':jwt},room=request.sid,namespace='/test')
        else:
            emit('authorised', {'successful': False},room=request.sid,namespace='/test')
            socketio.emit('redirectToLogIn',room=request.sid,namespace='/test')
    else:
        emit('authorised', {'successful': True, 'jwt':'anonomous'},room=request.sid,namespace='/test')

@socketio.on('Authenticate', namespace='/test')
def test_authenticate(message):
    global REACT_APP_DisableLogin

    if (not REACT_APP_DisableLogin ):
        if authenticateUser(message):
            emit('authentication', {'successful': True},room=request.sid,namespace='/test')
        else:
            emit('authentication', {'successful': False},room=request.sid,namespace='/test')
            socketio.emit('redirectToLogIn',room=request.sid,namespace='/test')
    else:
        emit('authentication', {'successful': True},room=request.sid,namespace='/test')



@socketio.on('connect', namespace='/test')
def test_connect():
    global thread
    print("Client Connected: " +request.sid)
    with thread_lock:
        if thread is None:
            thread = socketio.start_background_task(background_thread)
    emit('my_response', {'data': 'Connected', 'count': 0})


@socketio.on('disconnect', namespace='/test')
def test_disconnect():
    print('Client disconnected', request.sid)


if __name__ == '__main__':
    REACT_APP_PyEpicsServerURL=os.getenv('REACT_APP_PyEpicsServerBASEURL')
    REACT_APP_PyEpicsServerPORT=os.getenv('REACT_APP_PyEpicsServerPORT')
    REACT_APP_PyEpicsServerNamespace=os.getenv('REACT_APP_PyEpicsServerNamespace')
    REACT_APP_PyEpicsServerURL=REACT_APP_PyEpicsServerURL+':'+REACT_APP_PyEpicsServerPORT+'/'+REACT_APP_PyEpicsServerNamespace
    print("pvServer URL: ",REACT_APP_PyEpicsServerURL)
    print("")
    if not (REACT_APP_PyEpicsServerURL is None):
        if 'https' in REACT_APP_PyEpicsServerURL:
            socketio.run(app, host='0.0.0.0', debug=True, port=int(REACT_APP_PyEpicsServerPORT,10), keyfile='../server.key', certfile='../server.cer')
        else:
            socketio.run(app,host='0.0.0.0',  debug=True)
    else:
        socketio.run(app,host='127.0.0.1',  debug=True)
