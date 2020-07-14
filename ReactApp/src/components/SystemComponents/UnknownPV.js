import React, { useState useEffect } from 'react'

import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";


export const useUnknownPV = (props) => {
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
      pvname: pvname?pvname:"undefined",
      value: 0,
      severity: undefined,
      timestamp: undefined,
      metadata: { initialized: false, pvname: "", value: "", char_value: "", alarmColor: "", lower_disp_limit: "", upper_disp_limit: "", lower_warning_limit: "", upper_warning_limit: "", units: "", precision: 0,enum_strs:[] }
    }
    
    return pv;
  }
  const [pv, setPv] = useState(initPV());

  
  


  


  return (pv)

}

/**
 * The UnknownPV  component handles connections to EPICS process variables.
 * This is done by defining the pv name in the pv prop and using a prefix to define protocol ie "pva://" for EPICS .
 * The UnknownPV component also performs macro substitution on the pv prop using the macros prop.
 * The pv state can be raised as an object using the pvData callback or passed to child function component. All the data in this pv object is valid when pv.initialized===true
 * 
 * A hook called `useUnknownPV` is also exported which returns the pv object.
 * 
 * 
 * 
 * 
 * 
 **/
const UnknownPV=(props)=>{
  const pv= useUnknownPV(props);
  useEffect(()=>{
    props.pvData(pv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pv])
  if(props.debug){
    console.log(props)
    console.log(pv)
  }
  return(
    <React.Fragment>
      {props.debug&&<Typography>
      {"PV name: "+ pv.pvname}
      {"Value: " +pv.value}
      </Typography>}
    </React.Fragment>
  )

}
UnknownPV.propTypes = {
 
  /**
   * If defined, then the DataConnection and
   * the widget debugging information will be displayed.
   */
  debug: PropTypes.bool,

  
  /**
   * when writing to the  pv's output value, increment newValueTrigger to tell the pv component emit the output value to the process variable.
   */
  newValueTrigger:PropTypes.number,
  /**
   * the output value to the process variable. It is only emitted once the newValueTrigger is incremented.
   */
  outputValue:PropTypes.any,
 
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/

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
UnknownPV.defaultProps = {

  debug: false,
  
};


export default UnknownPV
