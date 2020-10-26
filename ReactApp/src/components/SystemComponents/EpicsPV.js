import React, { useState, useContext, useEffect } from 'react'
import ReactAutomationStudioContext from './AutomationStudioContext';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";


export const useEpicsPV = (props) => {
  const initPV = () => {
    let pvname = props.pv;
    if (props.macros) {
      let macro;
      for (macro in props.macros) {
        pvname = pvname.replace(macro.toString(), props.macros[macro].toString());
      }
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
  }
  const [pv, setPv] = useState(initPV());
  const [pvConnectionId, setPvConnectionId] = useState(null);
  const context = useContext(ReactAutomationStudioContext);






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

    const reconnect = () => {
      if (props.debug) {
        console.log(pv.pvname, 'client: reconnect');
      }
      let socket = context.socket;


      let jwt = JSON.parse(localStorage.getItem('jwt'));
      if (jwt === null) {
        jwt = 'unauthenticated'
      }
      socket.emit('request_pv_info', { data: pv.pvname, 'clientAuthorisation': jwt });
    }
    // const handleInitialConnection=()=>{

    //   if (pv.initialized===false){
    //     updatePVData({connected:'0'});
    //   }

    // }

    const handleRequestPvInfoAck = (msg) => {
    //  console.log(pv.pvname, "msg: ", msg)
      if (typeof msg !== 'undefined') {
        //console.log(this.state['pvname'], "pvConnectionId: ",msg.pvConnectionId)
        setPvConnectionId(msg.pvConnectionId)
      }

    }

    let socket = context.socket;
    let jwt = JSON.parse(localStorage.getItem('jwt'));
    if (jwt === null) {
      jwt = 'unauthenticated'
    }
    socket.emit('request_pv_info', { data: pv.pvname, 'clientAuthorisation': jwt },handleRequestPvInfoAck);
    let timerId;
    if (props.pollingRate === 0) {
      socket.on(pv.pvname, updatePVData);
    } else {
      timerId = setInterval(() => {
        socket.emit(
          "get_polled_value",
          { data: pv.pvname, clientAuthorisation: jwt },
          updatePVData
        );
      }, props.pollingRate);
    }
    socket.on("init_" + pv.pvname, updatePVData);
    socket.on('connect_error', connectError);
    socket.on('disconnect', disconnect);
    socket.on('reconnect', reconnect);

    return () => {

      if (pvConnectionId !== null) {
        let jwt = JSON.parse(localStorage.getItem('jwt'));
        if (jwt === null) {
          jwt = 'unauthenticated'
        }
        socket.emit('remove_pv_connection', { pvname: pv.pvname, pvConnectionId: pvConnectionId, 'clientAuthorisation': jwt });
      }
      socket.removeListener(pv.pvname, updatePVData);
      socket.removeListener('connect_error', connectError);
      socket.removeListener('disconnect', disconnect);
      socket.removeListener('reconnect', reconnect);
      if (timerId !== undefined) {
        clearInterval(timerId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {

    if (props.newValueTrigger > 0) {
      let socket = context.socket;
      let jwt = JSON.parse(localStorage.getItem('jwt'));
      if (jwt === null) {
        jwt = 'unauthenticated'
      }
      socket.emit('write_to_pv', { pvname: pv.pvname, data: props.outputValue, 'clientAuthorisation': jwt });

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
   * when writing to the  pv's output value, increment newValueTrigger to tell the pv component emit the output value to the process variable.
   */
  newValueTrigger: PropTypes.number,
  /**
   * the output value to the process variable. It is only emitted once the newValueTrigger is incremented.
   */
  outputValue: PropTypes.any,

  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/

  pv: PropTypes.string,

  /** A function that returns the pv object */

  pvData: PropTypes.func,



  /**
   * Directive to use PV's string values.
   */
  useStringValue: PropTypes.bool,

  /**
   * Read value from PV on specified period interval [ms].
   * If set to zero, no polling is applied.
   */
  pollingRate: PropTypes.number,

};

/**
 * Default props.definition for all widgets linked to
 * PVs storing analog values.
 */
// static defaultProps=WrappedComponent.defaultProps;
EpicsPV.defaultProps = {
  pollingRate: 0,
  debug: false,

};


export default EpicsPV
