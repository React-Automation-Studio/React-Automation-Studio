import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { InputAdornment, MenuItem, TextField } from "@material-ui/core";
import PropTypes from 'prop-types';

import Widget from "../SystemComponents/Widgets/Widget";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  TextField: {
    width: "100%",
    fontWeight: 500,
    borderRadius: 4,
  },
});


const SelectionInputComponent = (props) => {

  function handleChange(event) {
    let value = event.target.value;
    props.handleImmediateChange(value);
  }

  
  let inputProps;
  let stringValues; 
  if (props.initialized) {
    stringValues= props.enumStrs.map((item, idx) => (
      <MenuItem
        key={item.toString()}
        value={props.useStringValue ? item : idx}
      >
        {item}
      </MenuItem>
    ));
    inputProps = {
      endAdornment: (
        <InputAdornment
          style={{ marginRight: props.theme.spacing(1) }}
          position="end"
        >
          {props.units} {props.children}
        </InputAdornment>
      ),
      readOnly:props.readOnly,
      
    };
  }
  else{
    
    
    inputProps = {
      endAdornment: (
        <InputAdornment
          style={{ marginRight: props.theme.spacing(1) }}
          position="end"
        >
          {props.units} {props.children}
        </InputAdornment>
      ),
      readOnly:props.readOnly,
      
    };
    stringValues=props.pvName
  }
  

  return (
    <TextField
      key={props.pvName}
      className={props.classes.TextField}
      select={props.initialized}
      disabled={props.disabled}
      value={props.initialized?props.value:stringValues}
      onFocus={props.onUpdateWidgetFocus}
      onBlur={props.onUpdateWidgetBlur}
      onChange={handleChange}
      label={props.initialized?props.label:props.disconnectedIcon}
      margin={props.margin}
      variant={props.variant}
      InputProps={inputProps}
    >
      {stringValues}
    </TextField>
  );
}




/**
* The SelectionInput Component is a wrapper on the Material-UI TextField component. 
* The TextField component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
* The margins and spacing must be controlled from the parent component.<br/><br/>
* Material-UI TextField Demos:
* https://material-ui.com/demos/text-fields<br/><br/>
* Material-UI TextField API:
* https://material-ui.com/api/text-field

*/

const SelectionInput = (props) => {
  return (
    <Widget {...props} useStringValue={true} component={SelectionInputComponent}/>
  )
}


SelectionInput.defaultProps = {

  debug: false,
  variant: "outlined",
  margin: "none",

};


SelectionInput.propTypes = {
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros: PropTypes.object,
  /** Directive to fill the label with the value contained in the  EPICS pv's DESC field. */
  usePvLabel: PropTypes.bool,
  /** Directive to use the units contained in the  EPICS pv's EGU field. */

  //If defined, this array of strings overides the default EPICS MBBI/O
  //pv strings and are displayed as the choices in the RadioButtonGroup component
  custom_selection_strings: PropTypes.array,

  /** Material-UI TextField variant*/
  variant: PropTypes.string,
  /** Material-UI TextField margin*/
  margin: PropTypes.string,

};

export default withStyles(styles, { withTheme: true })(SelectionInput);
