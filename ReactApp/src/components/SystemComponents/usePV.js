import React, { useState, useEffect } from 'react'
import AutomationStudioContext from './AutomationStudioContext';
import EpicsPV2 from './EpicsPV2'
const usePV = (props) => {
  const [pvs, setPvs] = useState(null)
  const [pv, SetPv] = useState({
    value: "",
    label: "",
    initialized: false,
    contextPVs: [],
    severity:0,
  })
  const pvConnection = (pv, props) => {
   // console.log(pv)
    return pv.includes('pva://') ? EpicsPV2({ ...props, pv }) : undefined
  }
  const pvData = (name) => (pv) => {
    if (props.debug) {
      console.log('pv', name, pv)
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
        pvData: pvData('max')
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
      console.log("use effect usePV render")
    }
  

    let pv = {};
    if (pvs) {
      let pvKeys = Object.keys(pvs);
      //console.log(pvKeys)
      pv.value = pvs.data ? pvs.data.value : "";
      pv.severity = pvs.data ? pvs.data.severity : "";
      pv.label = props.usePvLabel ? (pvs.label ? pvs.label.value : "") : props.label;
      pv.max=props.usePvMinMax?(props.useEpicsMetaData?(pvs.data?pvs.data.metaData.upper_disp_limit:""):pvs.max?pvs.max.value:""):props.max;
      pv.min=props.usePvMinMax?(props.useEpicsMetaData?(pvs.data?pvs.data.metaData.lower_disp_limit:""):pvs.min?pvs.min.value:""):props.min;
      pv.prec=props.usePvPrecision?(props.useEpicsMetaData?(pvs.data?pvs.data.metaData.precision:""):pvs.prec?pvs.prec.value:""):props.prec;
      let initialized = true;
      let pvArray = [];
      for (let index in pvKeys) {
        //console.log(index)
        initialized = initialized && pvs[pvKeys[index]].initialized;
        pvArray.push({ pvname: pvs[pvKeys[index]].pvname, initialized: pvs[pvKeys[index]].initialized });
      }
      pv.initialized = initialized;
      pv.contextPVs = pvArray;
      SetPv(pv);
    }
    
  },[pvs])
  console.log(pv)
  return (
    pv
  )

}
export default usePV