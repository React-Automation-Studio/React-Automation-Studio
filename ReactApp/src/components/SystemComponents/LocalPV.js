import React, { useState, useContext, useEffect } from 'react'
import ReactAutomationStudioContext from './AutomationStudioContext';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
export const useLocalPV = (props) => {
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
  const context = useContext(ReactAutomationStudioContext);

  let contextPv=context.localVariables[pv.pvname]?context.localVariables[pv.pvname]:undefined;
  let contextPvValue=contextPv?contextPv.value:undefined;

  
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

  useEffect(() => {


    if (typeof context.localVariables[pv.pvname] === 'undefined') {

      let msg = {
        value: typeof props.initialLocalVariableValue === 'undefined' ? 0 : props.initialLocalVariableValue,
        connected: '1',
        newmetadata: 'True',
        pvname: pv.pvname,
        char_value: typeof props.initialLocalVariableValue === 'undefined' ? 0 : props.initialLocalVariableValue,
        enum_strs: "",
        lower_disp_limit: typeof props.min === 'undefined' ? 0 : props.min,
        upper_disp_limit: typeof props.max === 'undefined' ? 0 : props.max,
        lower_warning_limit: typeof props.min === 'undefined' ? 0 : props.min,
        upper_warning_limit: typeof props.max === 'undefined' ? 0 : props.max,
        lower_ctrl_limit: typeof props.min === 'undefined' ? 0 : props.min,
        upper_ctrl_limit: typeof props.max === 'undefined' ? 0 : props.max,
        units: typeof props.units === 'undefined' ? "" : props.units,
        precision: 1,
        severity: 0,
        write_access: true,
        read_access: true,

      };


      context.updateLocalVariable(pv.pvname, msg);
      updatePVData(context.localVariables[pv.pvname]);
    }
    else {

      //this.context.localVariables[this.state.pvname].newmetadata='True';
      updatePVData(context.localVariables[pv.pvname]);
      //  console.log(this.state)

    }


 

// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=>{
    if (props.debug){

     
    console.log(contextPv)
    }
    updatePVData(context.localVariables[pv.pvname]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[contextPvValue])

  
  useEffect(() => {

    if (props.newValueTrigger > 0) {
      let msg = context.localVariables[pv.pvname];
      if (props.useStringValue) {
        msg.char_value = props.outputValue;
        msg.value = props.outputValue;
      } else {
        msg.value = props.outputValue;
      }
      context.updateLocalVariable(pv.pvname, msg);
      updatePVData(context.localVariables[pv.pvname]);

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.newValueTrigger])

  if(props.debug){
    console.log(pv,contextPv)
  }
  return (pv)

}

/**
 * The LocalPV  component handles connections to local process variables which are valid within the same web page
 * This is done by defining the pv name in the pv prop and using a prefix to define protocol ie "loc://" 
 * The LocalPV component also performs macro substitution on the pv prop using the macros prop.
 * The pv state can be raised as an object using the pvData callback or passed to child function component. All the data in this pv object is valid when pv.initialized===true
 * 
 * A hook called `useLocalPV` is also exported which returns the pv object.
 * 
 * 
 * 
 * 
 * 
 **/
const LocalPV = (props) => {
  const pv = useLocalPV(props);
  useEffect(() => {
    props.pvData(pv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pv])

  return (
    <React.Fragment>
      {props.debug && <Typography>
        {"PV name: " + pv.pvname}
        {"Value: " + pv.value}
      </Typography>}
    </React.Fragment>
  )

}

LocalPV.propTypes = {
 
  /**
   * If defined, then the DataConnection and
   * the widget debugging information will be displayed.
   */
  debug: PropTypes.bool,

  /**
   * Local variable initialization value.
   * When using loc:// type PVs.
   */
  initialLocalVariableValue: PropTypes.string,
  /**
   * when writing to the  pv's output value, increment newValueTrigger to tell the pv component emit the output value to the process variable.
   */
  newValueTrigger:PropTypes.number,
  /**
   * the output value to the process variable. It is only emitted once the newValueTrigger is incremented.
   */
  outputValue:PropTypes.any,
 
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
LocalPV.defaultProps = {

  debug: false,
  
};

export default LocalPV