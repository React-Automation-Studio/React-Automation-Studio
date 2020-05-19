import React, { useState, useEffect } from 'react'
import usePV from '../usePV'
import Typography from '@material-ui/core/Typography';
import { InputAdornment, TextField } from "@material-ui/core";
const HooksWidget=(props)=>{
  const [newValueTrigger,setNewValueTrigger]=useState(0);
  const [outputValue,setOutputValue]=useState(null);
  const [focus,setFocus]=useState(null);
  const [value,setValue]=useState(null);
  const pv=usePV({
    pv:props.pv,
    macros:props.macros,
    newValueTrigger:newValueTrigger,
    outputValue:outputValue,
    useStringValue:props.useStringValue,
    debug:props.debug,
  });
  useEffect(()=>{
    if(!focus){
      setValue(pv.value)
    }
  })
  const handleChange=(event)=> {
    setValue(event.target.value);
  }
  const handleFocus=()=>{
    setFocus(true);
  }
  const handleBlur=()=>{
    setFocus(false);
  }
  const catchReturn=(event)=> {
    if (event.key === "Enter" ) {
      setOutputValue(value)
      setNewValueTrigger(newValueTrigger+1);
    }
  }
  console.log("newValueTrigger",newValueTrigger)
  return(
    <React.Fragment>
      <Typography> {pv.pvname +' Value: '+pv.value +'Connected: '+pv.initialized} </Typography>
      <TextField
      //className={textFieldClassName}

      key={pv.pvname}
      aria-haspopup="true"
      value={value}
      onKeyPress={catchReturn}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      //label={props.label}
      fullWidth={true}
      margin="none"
      variant={props.variant}
      disabled={props.disabled}
      //InputProps={inputProps}
    />
    </React.Fragment>
  )

}
export default HooksWidget