import React, { useState, useEffect } from 'react'
import EpicsPV from './EpicsPV'
import LocalPV from './LocalPV'
import UnknownPV from './UnknownPV'
import PropTypes from "prop-types";

/**
 * The PV component handles connections to EPICS process variables and local process vairable.
 * This is done by defining the pv name in the pv prop and using a prefix to define protocol ie "pva://" for EPICs and "loc://" for local variable.
 * The PV component also performs macro substitution on the pv prop using the macros prop.
 * The pv state can be raised as an object using the pvData callback or passed to child function component. All the data in this pv object is valid when pv.initialized===true
 * 
 * 
 * 
 * 
 * 
 **/

const PV = (props) => {
  const [pvs, setPvs] = useState(null)
  const [pv, SetPv] = useState({
    value: 0,
    label: "",
    initialized: false,
    PVs: [],
    metadata: {},
    severity: 0,
    timestamp: "",
    units: "",
    min: 0,
    max: 0,
    prec: 0,
    readOnly: true,
    enum_strs: []
  })
  const pvConnection = (pv, props) => {
    let pvname = pv.toString();
    if (props.macros) {
      let macro;    
      for (macro in props.macros) {
        pvname = pvname.replace(macro.toString(), props.macros[macro].toString());
      }
    }
    return pvname.includes('pva://')
      ?
      EpicsPV({ ...props, pv:pvname })
      : (pvname.includes('loc://')
        ?
        LocalPV({ ...props, pv:pvname })
        : UnknownPV({ ...props, pv:pvname }))
  }
  const pvData = (name) => (pv) => {

    setPvs(pvs => ({
      ...pvs,
      [name]: pv,
    }))
  }

  const dataPv = pvConnection(props.pv, {
    macros: props.macros,
    newValueTrigger: props.newValueTrigger,
    outputValue: props.outputValue,
    useStringValue: props.useStringValue,
    initialLocalVariableValue: props.initialLocalVariableValue,
    debug: props.debug,
    pvData: pvData('data')

  });

  let maxPv = !props.useMetadata && props.usePvMinMax
    ? pvConnection(props.maxPv ? props.maxPv : props.pv + ".HOPR",
      {
        macros: props.macros,
        debug: props.debug,
        initialLocalVariableValue: props.initialLocalVariableValue,
        pvData: pvData('max')

      }
    )
    : undefined;
  let minPv = !props.useMetadata && props.usePvMinMax
    ? pvConnection(props.minPv ? props.minPv : props.pv + ".LOPR",
      {
        macros: props.macros,
        debug: props.debug,
        initialLocalVariableValue: props.initialLocalVariableValue,
        pvData: pvData('min')
      }
    ) : undefined;
  let labelPv = props.usePvLabel
    ? pvConnection(props.labelPv ? props.labelPv : props.pv + ".DESC",
      {
        macros: props.macros,
        useStringValue: true,
        debug: props.debug,
        initialLocalVariableValue: props.initialLocalVariableValue,
        pvData: pvData('label')
      }
    ) : undefined;
  let unitsPv = !props.useMetadata && props.usePvUnits
    ? pvConnection(props.unitsPv ? props.unitsPv : props.pv + ".EGU",
      {
        macros: props.macros,
        useStringValue: true,
        debug: props.debug,
        initialLocalVariableValue: props.initialLocalVariableValue,
        pvData: pvData('units')
      }
    ) : undefined;
  let precisionPv = !props.useMetadata && props.usePvPrecision
    ? pvConnection(props.precPv ? props.precPv : props.pv + ".PREC",
      {
        macros: props.macros,
        useStringValue: true,
        debug: props.debug,
        initialLocalVariableValue: props.initialLocalVariableValue,
        pvData: pvData('precision')
      }
    ) : undefined;
  let alarmPv = !props.useMetadata && props.alarmSensitive
    ? pvConnection(props.alarmPv ? props.alarmPv : props.pv + ".SEVR",
      {
        macros: props.macros,
        //useStringValue:true,
        debug: props.debug,
        initialLocalVariableValue: props.initialLocalVariableValue,
        pvData: pvData('alarm')
      }
    ) : undefined;
  useEffect(() => {
    if (props.debug) {
      console.log("use effect PV render")
    }


    let pv = {};
    if (pvs) {
      let pvKeys = Object.keys(pvs);
      pv.value = pvs.data ? pvs.data.value : "";
      pv.pvName = pvs.data ? pvs.data.pvname : "";
      pv.severity = pvs.data ? pvs.data.severity : "";
      pv.timestamp = pvs.data ? pvs.data.timestamp : "";
      pv.metadata = pvs.data ? pvs.data.metadata : {};
      pv.enum_strs = pvs.data ? pvs.data.metadata.enum_strs : [];
      pv.label = props.usePvLabel ? (pvs.label ? pvs.label.value : "") : props.label;
      pv.max = props.usePvMinMax ? (props.useMetadata ? (pvs.data ? pvs.data.metadata.upper_disp_limit : "") : pvs.max ? pvs.max.value : "") : props.max;
      pv.min = props.usePvMinMax ? (props.useMetadata ? (pvs.data ? pvs.data.metadata.lower_disp_limit : "") : pvs.min ? pvs.min.value : "") : props.min;
      pv.prec = props.usePvPrecision ? (props.useMetadata ? (pvs.data ? pvs.data.metadata.precision : "") : pvs.precision ? pvs.precision.value : "") : props.prec;
      pv.units = props.usePvUnits ? (props.useMetadata ? (pvs.data ? pvs.data.metadata.units : "") : pvs.units ? pvs.units.value : "") : props.units;
      let initialized = true;
      let pvArray = [];
      for (let index in pvKeys) {
        initialized = initialized && pvs[pvKeys[index]].initialized;
        if (pvs[pvKeys[index]].pvname) {
          pvArray.push(pvs[pvKeys[index]]);
        }
      }
      pv.initialized = initialized;
      if (pv.initialized) {
        pv.readOnly = !pv.metadata.write_access;
      }
      else {
        pv.readOnly = true;
      }
      pv.PVs = pvArray;
      // console.log(pv)
      SetPv(pv);

    }


 // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pvs])
  useEffect(() => {
    if (typeof props.pvData !=='undefined'){
      props.pvData(pv)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pv])
  if (props.debug) {
    console.log(props)
    console.log(props.name, " Debug:", "PV Render States: ", "pvs:", pvs)
    console.log(props.name, " Debug:", "PV Render pv:", pv)
  }
  
  return (
    <React.Fragment>
      {dataPv}
      {maxPv}
      {minPv}
      {labelPv}
      {unitsPv}
      {precisionPv}
      {alarmPv}
      {props.children?props.children(pv):null}    
    </React.Fragment>

  )

}
PV.propTypes = {
  /**
   * Directive to use the  alarm severity status to alter the fields backgorund color.
   */

  alarmSensitive: PropTypes.bool,
  /**
   * Custom PV to define the alarm severity to be used, alarmSensitive must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
   */
  alarmPv: PropTypes.string,
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
   * Custom label to be used, if  usePvLabel is not defined.
   */
  label: PropTypes.string,
  /**
  * Custom PV to define the units to be used, usePvLabel must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
  */
  labelPv: PropTypes.string,
  /**
   * Values of macros that will be substituted in the pv name.
   * eg. {{'$(device)':'testIOC','$(id)':'2'}}
   */
  macros: PropTypes.object,
  /**
   * Custom maximum to be used, if usePvMinMax is not defined.
   */
  max: PropTypes.number,
  /**
   * Custom PV to define the maximum to be used, usePvMinMax must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
   */
  maxPv: PropTypes.string,
  /**
   * Custom minimum value to be used, if usePvMinMax is not defined.
   */
  min: PropTypes.number,
  /**
   * Custom PV to define the minimum to be used, usePvMinMax must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
   */
  minPv: PropTypes.string,
  /**
   * when writing to the  pv's output value, increment newValueTrigger to tell the pv component emit the output value to the process variable.
   */
  newValueTrigger:PropTypes.number,
  /**
   * the output value to the process variable. It is only emitted once the newValueTrigger is incremented.
   */
  outputValue:PropTypes.any,
  /**
   * Custom precision to round the value.
   */
  prec: PropTypes.number,
  /**
   * Custom PV to define the precision to be used, usePvPrecision must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
   */
  precPv: PropTypes.string,
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/

  pv: PropTypes.string,

   /** A function that returns the pv object */

   pvData: PropTypes.func,

  
  /**
   * Custom units to be used, if usePvUnits is not defined.
   */

  units: PropTypes.string,
  /**
   * Custom PV to define the units to be used, usePvUnits must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
   */
  unitsPv: PropTypes.string,
  /**
   * Directive to fill the component's label with
   * the value contained in the  pv metadata's DESC field or the labelPv value.
   * If not defined it uses the custom label as defined by the label prop.
   */
  usePvLabel: PropTypes.bool,
  /**
   * When using EPICS, the RAS pv's metadata is conventionally derived from the pyEpics PV in the pvserver. 
   * The pyEpics metadata is unfortunately static and the values used will be the intial values that pvserver receives when it connects the first time. 
   * This is sufficient in most cases except when the user wants to dynamically update the metaData.
   * In this case a direct connection can be made to all the pv fields by setting useMetadata to false. 
   * If any of the metadata pvs are defined i.e unitsPv then the PV makes a new data  connection to this alternate pv and will
   * use the value provided by this pv as the units. 
   * The same is the case for the precPV, labelPv, alarmPv, unitsPv and minPv.
   * By setting useMetadata to false also enables connection to other variables as defined by different protocols.
   */
  useMetadata: PropTypes.bool,
  /**
   * Directive to use the pv metadata's HOPR and LOPR fields or the minPv and maxPv values
   * to limit the maximum and minimum values
   * that can be contained in the value.
   * If not defined it uses the custom min and max as defined by the min and max prop.
   */
  usePvMinMax: PropTypes.bool,
  /**
   * Directive to round the value using the precision field of the PV metadata or precPv.
   * If not defined it uses the custom precision as defined by the prec prop.
   */
  usePvPrecision: PropTypes.bool,
  /**
   * Directive to use the units contained in the   pv metadata's EGU field or unitsPv.
   *  If not defined it uses the custom units as defined by the units prop.
   */


  usePvUnits: PropTypes.bool,
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
PV.defaultProps = {

  debug: false,
  useMetadata: true,

};



export default PV

