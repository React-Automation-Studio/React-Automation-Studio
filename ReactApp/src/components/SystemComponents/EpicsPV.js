import React, { useState, useContext, useEffect, useRef } from 'react'
import ReactAutomationStudioContext from './AutomationStudioContext';
import Typography from '@mui/material/Typography';
import PropTypes from "prop-types";
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
export const useEpicsPV = (props) => {
 
 
  const [pv, setPv] = useState(() => {
    let pvname = props.pv;
    if (props.macros) {
      let macro;
      for (macro in props.macros) {
        pvname = pvname.replace(macro.toString(), props.macros[macro].toString());
      }
    }
    if(pvname.includes('pva://')){
      console.info("It is no longer necessary to provide the prefix `pva://` for EPICS V3 PVs.\n Perform a global text replace to update.\n For convenience the `pva://` prefix is automatically removed when displayed\n and will be deprecated in a future release",pvname)
      pvname=pvname.replace('pva://',"")    
    }
    let pv = {
      initialized: false,
      pvname: pvname,
      value: 0,
      severity: undefined,
      timestamp: undefined,
      metadata: { initialized: false, pvname: "", value: "", char_value: "", alarmColor: "", lower_disp_limit: "", upper_disp_limit: "", lower_warning_limit: "", upper_warning_limit: "", units: "", precision: 0, enum_strs: [] }
    
    }

    return pv;
  });
  const pvName=pv.pvname;
 
  const [pvConnectionId] = useState(null);
  const context = useContext(ReactAutomationStudioContext);
  const [socket,setSocket] = useState(null)
  useEffect(()=>{
    if(props.makeNewSocketIoConnection===true){
      let newSocket = io("/pvServer", {
        transports: ['websocket'],
        forceNew:true,
      })
      console.log("make new socket")
      setSocket(newSocket)
    }
    else{
      setSocket(context.socket)
    }
  },[props.makeNewSocketIoConnection,context.socket])
   
  const jwt = context.userTokens.accessToken;
  const jwtRef = useRef(jwt);
  const socketRef = useRef(socket);
  useEffect(() => {
    if (jwt === null) {
      jwtRef.current = 'unauthenticated'
    }
    else {
      jwtRef.current = jwt;
    }
  }, [jwt])


  useEffect(() => {

    socketRef.current = socket;
  }, [socket])
  const pvConnectionIdRef = useRef(pvConnectionId);




  useEffect(() => {

    const updatePVData = (msg) => {

      if (msg.connected === '0') {
        setPv(pv => ({ ...pv, initialized: false }))
      }
      else {
        if (msg.newmetadata === 'False') {
          setPv(pv => (
            {
              ...pv,
              value: props.useStringValue === true ? msg.char_value : msg.value,
              severity: msg.severity,
              timestamp: msg.timestamp
            }
          ))
        }

        else {
          setPv(pv => (
            {
              ...pv,
              value: props.useStringValue === true ? msg.char_value : msg.value,
              severity: msg.severity,
              timestamp: msg.timestamp,
              initialized: true,
              metadata: {
                pvname: msg.pvname, value: msg.value, char_value: msg.char_value, alarmColor: "", enum_strs: msg.enum_strs, lower_disp_limit: msg.lower_disp_limit, upper_disp_limit: msg.upper_disp_limit,
                lower_warning_limit: msg.lower_warning_limit, upper_warning_limit: msg.upper_warning_limit, lower_ctrl_limit: msg.lower_ctrl_limit, upper_ctrl_limit: msg.upper_ctrl_limit, units: msg.units, precision: parseInt(msg.precision), severity: msg.severity, write_access: msg.write_access, read_access: msg.read_access, host: msg.host
              },
            }
          ))


        }


      }
    }
    const connectError = () => {
      if (props.debug) {
        console.log(pv.pvname, 'client: connect_error');
      }
      setPv(pv => ({ ...pv, initialized: false }))
    }

    const disconnect = () => {
      if (props.debug) {
        console.log(pv.pvname, 'client: disconnected');
      }
      setPv(pv => ({ ...pv, initialized: false }))
    }



    
    if (socket){
      pvConnectionIdRef.current=uuidv4();
    socketRef.current.emit('request_pv_info', { data: pv.pvname,pvConnectionId: pvConnectionIdRef.current, 'clientAuthorisation': jwtRef.current });
    socketRef.current.on(pv.pvname, updatePVData);
    socketRef.current.on('connect_error', connectError);
    socketRef.current.on('disconnect', disconnect);
    }

    return () => {
      if(socket){
      if (pvConnectionIdRef.current !== null) {
       
        socketRef.current.emit('remove_pv_connection', { pvname: pv.pvname, pvConnectionId: pvConnectionIdRef.current, 'clientAuthorisation': jwtRef.current });
      }
      socketRef.current.removeListener(pv.pvname, updatePVData);
      socketRef.current.removeListener('connect_error', connectError);
      socketRef.current.removeListener('disconnect', disconnect);
    }

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pvName,socket])

  useEffect(() => {
    const reconnect = () => {
      if (props.debug) {
        console.log(pv.pvname, 'client: reconnect');
      }
      


      pvConnectionIdRef.current=uuidv4();
      socketRef.current.emit('request_pv_info', { data: pv.pvname,pvConnectionId: pvConnectionIdRef.current, 'clientAuthorisation': jwtRef.current });
    
    }
    if(socket){
    socketRef.current.on('connect', reconnect);}

    return () => {
      if(socket){
      socketRef.current.removeListener('connect', reconnect);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pvName,socket])
  useEffect(() => {

    if (props.newValueTrigger > 0) {
     
      socketRef.current.emit('write_to_pv', { pvname: pv.pvname, data: props.outputValue, 'clientAuthorisation': jwtRef.current });

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.newValueTrigger])

  return (pv)

}

/**
 * The EpicsPV  component handles connections to EPICS process variables.
 * This is done by defining the pv name in the pv prop and using a prefix to define protocol ie "pva://" for EPICS .
 * The EpicsPV component also performs macro substitution on the pv prop using the macros prop.
 * The pv state can be raised as an object using the pvData callback or passed to child function component. All the data in this pv object is valid when pv.initialized===true
 * 
 * A hook called `useEpicsPV` is also exported which returns the pv object.
 * 
 * 
 * 
 * 
 * 
 **/
const EpicsPV = (props) => {
  const pv = useEpicsPV(props);
  useEffect(() => {
    props.pvData(pv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pv])
  if (props.debug) {
    console.log(props)
    console.log(pv)
  }
  return (
    <React.Fragment>
      {props.debug && <Typography>
        {"PV name: " + pv.pvname}
        {"Value: " + pv.value}
      </Typography>}
    </React.Fragment>
  )

}
EpicsPV.propTypes = {

  /**
   * If defined, then the DataConnection and
   * the widget debugging information will be displayed.
   */
  debug: PropTypes.bool,
/**
   * If defined, then the DataConnection  will be over a new socketIO  connection, otherwise the global socketIO connection
   */
  makeNewSocketIoConnection: PropTypes.bool,

  /**
   * when writing to the  pv's output value, increment newValueTrigger to tell the pv component emit the output value to the process variable.
   */
  newValueTrigger: PropTypes.number,
  /**
   * the output value to the process variable. It is only emitted once the newValueTrigger is incremented.
   */
  outputValue: PropTypes.any,

  /** Name of the process variable,  eg. '$(device):test$(id)'*/

  pv: PropTypes.string,

  /** A function that returns the pv object */

  pvData: PropTypes.func,



  /**
   * Directive to use PV's string values.
   */
  useStringValue: PropTypes.bool,


};

/**
 * Default props.definition for all widgets linked to
 * PVs storing analog values.
 */
// static defaultProps=WrappedComponent.defaultProps;
EpicsPV.defaultProps = {

  debug: false,
  makeNewSocketIoConnection:true,

};


export default EpicsPV