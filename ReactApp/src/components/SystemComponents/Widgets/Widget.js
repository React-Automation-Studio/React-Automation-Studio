import React, { useState, useEffect } from 'react'
import usePV from '../usePV'
import Typography from '@material-ui/core/Typography';
import { InputAdornment, TextField } from "@material-ui/core";
import ContextMenu from "../ContextMenu";
const Widget=(props)=>{
  const [newValueTrigger,setNewValueTrigger]=useState(0);
  const [outputValue,setOutputValue]=useState(null);
  const [focus,setFocus]=useState(null);
  const [value,setValue]=useState(null);
  const [min,setMin]=useState(null);
  const [max,setMax]=useState(null);
  const [units,setUnits]=useState(null);
  const [label,setLabel]=useState(null);
  const [anchorEl,setAnchorEl]=useState(null);
  const [openContextMenu,setOpenContextMenu]=useState(false);
  const pv=usePV({
    pv:props.pv,
    maxPv:props.maxPv,
    minPv:props.minPv,
    usePvMinMax:props.usePvMinMax,
    unitsPv:props.unitsPv,
    usePvUnits:props.usePvUnits,
    alarmPv:props.alarmPv,
    labelPv:props.labelPv,
    usePvLabel:props.usePvLabel,
    
    macros:props.macros,
    newValueTrigger:newValueTrigger,
    outputValue:outputValue,
    useStringValue:props.useStringValue,
    debug:props.debug,
  });
  useEffect(()=>{
    if(props.usePvLabel){
      setLabel(pv.label)
    }
    else{
      setLabel(props.label)
    }

  },[props.label,pv.label])
  useEffect(()=>{
    if(props.usePvUnits){
      setUnits(pv.units)
    }
    else{
      setUnits(props.units)
    }

  },[props.units,pv.units])
  useEffect(()=>{
    if(props.usePvMinMax){
      setMin(pv.min)
      setMax(pv.max)
    }
    else{
      setMin(min)
      setMax(max)
    }

  },[props.min,props.max,pv.min,pv.max])
  useEffect(()=>{
    if(!focus){
      setValue(pv.value)
    }
  },[focus,pv.value])
  const handleChange=(event)=> {
    let value=event.target.value;
    if (props.imediateOutputChange){
      setValue(value);
      setOutputValue(value);
      setNewValueTrigger(newValueTrigger+1);
    }
    else{
      setValue(value);
    }
  }
  const handleFocus=()=>{
    console.log('focused')
    setFocus(true);
  }
  const handleBlur=()=>{
    setFocus(false);
  }
  const handleCatchReturn=(event)=> {
    if (event.key === "Enter" ) {
      setOutputValue(value)
      setNewValueTrigger(newValueTrigger+1);
    }
  }
  const handleToggleContextMenu=(event)=> {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.target);
    setOpenContextMenu(!openContextMenu);
    
  }
  const handleContextMenuClose=()=> {
    
    setOpenContextMenu(false);
    
  }
  const  contextMenu=()=> {
   // let listPVs = [];
   // for (let pv in this.state.dataPVs) {
   //   listPVs.push(this.state.dataPVs[pv]);
  //  }
  
    return (
      <ContextMenu
        disableProbe={props.disableProbe}
        open={openContextMenu}
        pvs={[pv]}
        handleClose={handleContextMenuClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        probeType={props.readOnly ? "readOnly" : undefined}
      />
    );
  }
  const wrapComponent=(CustomComponent, props)=> {
    return <CustomComponent {...props}  />;
  }
  const child =props.component&&wrapComponent(props.component,
     {...props,
      connection:pv.initialized,
      value:value,
      min:min,
      max:max,
      label:label,
      handleChange:handleChange,
      handleFocus:handleFocus,
      handleBlur:handleBlur,
      handleCatchReturn:handleCatchReturn,
      labelPosition:props.labelPosition,
     })
  const divStyle = {
      width: "100%",
      height: "100%",
    } 
  return(
    <div
        style={divStyle}
        onContextMenu={
          props.disableContextMenu
            ? undefined
            : handleToggleContextMenu
        }
      >
        {contextMenu()}
        {child}
    </div>
  )
}
export default Widget