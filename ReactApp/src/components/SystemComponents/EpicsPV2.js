import React, { useState, useContext, useEffect } from 'react'
import ReactAutomationStudioContext from './AutomationStudioContext';

const EpicsPV2 = (props) => {
  const initPV = () => {
    let pvname;
    if (props.macros) {
      let macro;
      pvname = props.pv;
      for (macro in props.macros) {
        pvname = pvname.replace(macro.toString(), props.macros[macro].toString());
      }
    }
    let pv = {
      'initialized': false,
      'pvname': pvname,
      'value': ' ',
      'severity': undefined,
      'timestamp': undefined,
      'metaData': { intialized: false, pvname: "", value: "", char_value: "", alarmColor: "", lower_disp_limit: "", upper_disp_limit: "", lower_warning_limit: "", upper_warning_limit: "", units: "", precision: 0 }
    }
    return pv;
  }
  const [pv, setPv] = useState(initPV);
  const context = useContext(ReactAutomationStudioContext);
  const updatePVData = (msg) => {
    
    if (msg.connected === '0') {
      setPv(pv => ({ ...pv, initialized: false }))
    }
    else {
      if (msg.newmetadata == 'False') {
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
            initialized:true,
            metaData:{
              pvname: msg.pvname, value: msg.value, char_value: msg.char_value, alarmColor: "", enum_strs: msg.enum_strs, lower_disp_limit: msg.lower_disp_limit, upper_disp_limit: msg.upper_disp_limit,
              lower_warning_limit: msg.lower_warning_limit, upper_warning_limit: msg.upper_warning_limit, lower_ctrl_limit: msg.lower_ctrl_limit, upper_ctrl_limit: msg.upper_ctrl_limit, units: msg.units, precision: parseInt(msg.precision), severity: msg.severity, write_access: msg.write_access, read_access: msg.read_access, host: msg.host
            },
          }
        ))
       
       
      }

      
    }
  }
  const connectError=()=>{
    if (props.debug){
      console.log(pv.pvname,'client: connect_error');
    }
    setPv(pv => ({ ...pv, initialized: false }))
  }

  const disconnect=()=>{
    if (this.props.debug){
      console.log(pv.pvname,'client: disconnected');
    }
    setPv(pv => ({ ...pv, initialized: false }))
  }

  const reconnect=()=>{
    if (props.debug){
      console.log(pv.pvname,'client: reconnect');
    }
    let socket=context.socket;

    
    let jwt = JSON.parse(localStorage.getItem('jwt'));
    if (jwt===null){
      jwt='unauthenticated'
    }
    socket.emit('request_pv_info', {data: pv.pvname,'clientAuthorisation':jwt});
  }
  const handleInitialConnection=()=>{

    if (pv.initialized===false){
      updatePVData({connected:'0'});
    }

  }


  if (props.debug) {
    console.log("EpicsPV2 Debuging: ", pv.pvname, pv,props.newValueTrigger)

  }
  
  useEffect(()=>{
    
    let socket = context.socket;
    let jwt = JSON.parse(localStorage.getItem('jwt'));
    if (jwt === null) {
      jwt = 'unauthenticated'
    }
    socket.emit('request_pv_info', { data: pv.pvname, 'clientAuthorisation': jwt });
    socket.on(pv.pvname, updatePVData);
    socket.on('connect_error',connectError);
    socket.on('disconnect',disconnect);
    socket.on('reconnect',reconnect);
    console.log("helolo")
    return ()=>{
      
     
      socket.removeListener(pv.pvname,updatePVData);
      socket.removeListener('connect_error',connectError);
      socket.removeListener('disconnect', disconnect);
      socket.removeListener('reconnect',reconnect);
     
    }
  },[props.pv])

  useEffect(()=>{
    //console.log('useEffect',pv.pvname)
    if (props.newValueTrigger>0){
    let socket = context.socket;
    let jwt = JSON.parse(localStorage.getItem('jwt'));
    if (jwt === null) {
      jwt = 'unauthenticated'
    }
    socket.emit('write_to_pv', {pvname:pv.pvname, data: props.outputValue,'clientAuthorisation':jwt});
   
  }
  },[props.newValueTrigger])

  return (pv)

}
export default EpicsPV2