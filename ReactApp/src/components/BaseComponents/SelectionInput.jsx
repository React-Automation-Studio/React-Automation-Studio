import React from "react";
import withStyles from '@mui/styles/withStyles';
import { InputAdornment, MenuItem, TextField } from "@mui/material";
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
    <Widget {...props} useStringValue={true} component={SelectionInputComponent} usePvMinMax={false} usePvPrecision={false} min={undefined} max={undefined} prec={undefined}/>
  )
}

SelectionInput.defaultProps = {
  debug: false,
  variant: "outlined",
  margin: "none",
};

SelectionInput.propTypes = {
  /** Name of the process variable,  eg. '$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros: PropTypes.object,

  /** If defined, this array of strings overrides the default EPICS MBBI/O pv strings and are displayed as the choices in the RadioButtonGroup component*/
  custom_selection_strings: PropTypes.array,

  /** Material-UI TextField variant*/
  variant: PropTypes.string,
  /** Material-UI TextField margin*/
  margin: PropTypes.string,

  /**
   * Custom PV to define the units to be used, usePvLabel must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  labelPv: PropTypes.string,
  /**
   * Directive to fill the component's label with
   * the value contained in the  pv metadata's DESC field or the labelPv value.
   * If not defined it uses the custom label as defined by the label prop.
   */
  usePvLabel: PropTypes.bool,
  /**
   * Tooltip Text
   */
  tooltip: PropTypes.string,
  /**
   * Directive to show the tooltip
   */
  showTooltip: PropTypes.bool,
  /**
   *  Any of the MUI Tooltip props can applied by defining them as an object
   */
  tooltipProps: PropTypes.object,

  /** Any of the MUI TextField Props can applied by defining them as an object
   * 
   */
  muiTextFieldProps: PropTypes.object,

  /**
   * Custom units to be used, if usePvUnits is not defined.
   */
  units: PropTypes.string,

  /**
   * Custom PV to define the units to be used, usePvUnits must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  unitsPv: PropTypes.string,

  /**
   * Directive to use the units contained in the   pv metdata's EGU field or unitsPv.
   *  If not defined it uses the custom units as defined by the units prop.
   */
  usePvUnits: PropTypes.bool,
};

SelectionInput.defaultProps = {
  showTooltip: false,
  variant: 'outlined',
};

export default withStyles(styles, { withTheme: true })(SelectionInput);
