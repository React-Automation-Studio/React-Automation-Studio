import React, { useState, useEffect } from 'react'
import AutomationStudioContext from './AutomationStudioContext';
import EpicsPV2 from './EpicsPV2'
const PV = (props) => {
  const [pvs, setPvs] = useState(null)
  const [pv, SetPv] = useState({
    value: 0,
    label: "",
    initialized: false,
    contextPVs: [],
    metadata:{},
    severity:0,
    units:"",
    min:0,
    max:0,
    prec:0,
    readOnly:true,
  })
  const pvConnection = (pv, props) => {
    return pv.includes('pva://') ? EpicsPV2({ ...props, pv }) : undefined
  }
  const pvData = (name) => (pv) => {
    if (props.debug) {
    }
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
    debug: props.debug,
    pvData: pvData('data')

  });

  let maxPv = !props.useEpicsMetaData && props.usePvMinMax
    ? pvConnection(props.maxPv ? props.maxPv : props.pv + ".HOPR",
      {
        macros: props.macros,
        debug: props.debug,
        pvData: pvData('max')

      }
    )
    : undefined;
  let minPv = !props.useEpicsMetaData && props.usePvMinMax
    ? pvConnection(props.minPv ? props.minPv : props.pv + ".LOPR",
      {
        macros: props.macros,
        debug: props.debug,
        pvData: pvData('min')
      }
    ) : undefined;
  let labelPv = props.usePvLabel
    ? pvConnection(props.labelPv ? props.labelPv : props.pv + ".DESC",
      {
        macros: props.macros,
        useStringValue: true,
        debug: props.debug,
        pvData: pvData('label')
      }
    ) : undefined;
  let unitsPv = !props.useEpicsMetaData && props.usePvUnits
    ? pvConnection(props.unitsPv ? props.unitsPv : props.pv + ".EGU",
      {
        macros: props.macros,
        useStringValue: true,
        debug: props.debug,
        pvData: pvData('units')
      }
    ) : undefined;
  let precisionPv = !props.useEpicsMetaData && props.usePvPrecision
    ? pvConnection(props.precPv ? props.precPv : props.pv + ".PREC",
      {
        macros: props.macros,
        useStringValue: true,
        debug: props.debug,
        pvData: pvData('precision')
      }
    ) : undefined;
  let alarmPv = !props.useEpicsMetaData && props.alarmSensitive
    ? pvConnection(props.alarmPv ? props.alarmPv : props.pv + ".SEVR",
      {
        macros: props.macros,
        //useStringValue:true,
        debug: props.debug,
        pvData: pvData('alarm')
      }
    ) : undefined;
  useEffect(()=>{
    if(props.debug){
      console.log("use effect PV render")
    }
  

    let pv = {};
    if (pvs) {
      let pvKeys = Object.keys(pvs);
      pv.value = pvs.data ? pvs.data.value : "";
      pv.pvName= pvs.data ? pvs.data.pvname : "";
      pv.severity = pvs.data ? pvs.data.severity : "";
      pv.metadata = pvs.data ? pvs.data.metadata : {};
      pv.enum_strs = pvs.data ? pvs.data.metadata.enum_strs : [];
      pv.label = props.usePvLabel ? (pvs.label ? pvs.label.value : "") : props.label;
      pv.max=props.usePvMinMax?(props.useEpicsMetaData?(pvs.data?pvs.data.metadata.upper_disp_limit:""):pvs.max?pvs.max.value:""):props.max;
      pv.min=props.usePvMinMax?(props.useEpicsMetaData?(pvs.data?pvs.data.metadata.lower_disp_limit:""):pvs.min?pvs.min.value:""):props.min;
      pv.prec=props.usePvPrecision?(props.useEpicsMetaData?(pvs.data?pvs.data.metadata.precision:""):pvs.precision?pvs.precision.value:""):props.prec;
      pv.units=props.usePvUnits?(props.useEpicsMetaData?(pvs.data?pvs.data.metadata.units:""):pvs.units?pvs.units.value:""):props.units;
      let initialized = true;
      let pvArray = [];
      for (let index in pvKeys) {
        initialized = initialized && pvs[pvKeys[index]].initialized;
        if(pvs[pvKeys[index]].pvname){
          pvArray.push(pvs[pvKeys[index]]);
        }
      }
      pv.initialized = initialized;
      if (pv.initialized){
        pv.readOnly=!pv.metadata.write_access;
      }
      else{
        pv.readOnly=true;
      }
      pv.contextPVs = pvArray;
     // console.log(pv)
      SetPv(pv);
    
    }

    
    
  },[pvs])
  useEffect(()=>{
    props.pvData(pv)
  },[pv])
  if (props.debug){
    console.log( props.name," Debug:","PV Render States: ","pvs:",pvs)
    console.log( props.name," Debug:","PV Render pv:",pv)
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
    </React.Fragment>
  
  )

}
export default PV