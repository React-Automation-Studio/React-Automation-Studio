import React, { useState } from 'react'
import AutomationStudioContext from './AutomationStudioContext';
import EpicsPV2 from './EpicsPV2'
const usePV = (props) => {
  const pvConnection = (pv, props) => {
    console.log(pv)
    return pv.includes('pva://') ? EpicsPV2({ ...props, pv }) : undefined
  }
  let mainPv = pvConnection(props.pv, {
    macros: props.macros,
    newValueTrigger: props.newValueTrigger,
    outputValue: props.outputValue,
    useStringValue: props.useStringValue,
    debug: props.debug
  });
  let maxPv = props.usePvMinMax
    ? pvConnection(props.maxPv?props.maxPv:props.pv+".HOPR",
      {
        macros: props.macros,
        debug: props.debug
      }
    )
    : undefined;
  let minPv = props.usePvMinMax
    ? pvConnection(props.minPv?props.minPv:props.pv+".LOPR",
      {
        macros: props.macros,
        debug: props.debug
      }
    ) : undefined;
  let labelPv = props.usePvLabel
    ? pvConnection(props.labelPv?props.labelPv:props.pv+".DESC",
      {
        macros: props.macros,
        useStringValue:true,
        debug:  props.debug
      }
    ) : undefined;
  let unitsPv = props.usePvUnits
    ? pvConnection(props.unitsPv?props.unitsPv:props.pv+".EGU",
      {
        macros: props.macros,
        useStringValue:true,
        debug:  props.debug
      }
    ) : undefined;

  return (
    mainPv
  )

}
export default usePV