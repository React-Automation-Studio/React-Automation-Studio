import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { InputAdornment, TextField } from "@material-ui/core";
import PropTypes from 'prop-types';
import Widget from "../SystemComponents/Widgets/Widget";
import red from '@material-ui/core/colors/red';
import deepOrange from '@material-ui/core/colors/deepOrange';


const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  TextFieldSeverity0: {
    width: '100%',
    borderRadius: 4,
  },
  TextFieldSeverity1: {
    width: '100%',
    borderRadius: 4,
    background: 'linear-gradient(45deg, ' + theme.palette.background.default + ' 1%, ' + deepOrange['400'] + ' 99%)'
  },
  TextFieldSeverity2: {
    width: '100%',
    borderRadius: 4,
    background: 'linear-gradient(45deg, ' + theme.palette.background.default + ' 1%, ' + red['800'] + ' 99%)'
  }
});

const TextInputComponent=(props)=> {

 




  let style;
  const { classes } = props;
  const { initialized } = props;
  const { theme } = props;
  const { value } = props;

  let textFieldClassName;
  if (typeof props.alarmSensitive !== 'undefined') {
    if (props.alarmSensitive == true) {
      if (props.alarmSeverity == 1) {
        textFieldClassName = classes.TextFieldSeverity1;

      }
      else if (props.alarmSeverity == 2) {
        textFieldClassName = classes.TextFieldSeverity2;

      }
      else {
        textFieldClassName = classes.TextFieldSeverity0;

      }

    }
  }


  let inputProps;

  if (initialized) {
    inputProps = {
      endAdornment: (
        <InputAdornment position="end">
          {props.units} {props.children}
        </InputAdornment>
      ),
    };
  } else {
    inputProps = { readOnly: true };
  }

  console.log(value)
  return (
    <TextField
      className={textFieldClassName}

      key={props.pvName}
      //aria-owns={this.state.openContextMenu ? 'menu-list-grow' : undefined}
      aria-haspopup="true"
      value={value}
      onKeyPress={props.handleCatchReturn}
      onFocus={props.handleFocus}
      onBlur={props.handleBlur}
      onChange={props.handleChange}
      label={props.label}
      fullWidth={true}
      margin="none"
      variant={props.variant}
      //disabled={props.disabled}
      InputProps={inputProps}
    />
  );
}

/**
 * The TextInput Component is a wrapper on the Material-UI contained TextField component.
 * The TextField component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI TextField Demos:
 * https://material-ui.com/demos/text-fields<br/><br/>
 * Material-UI TextField API:
 * https://material-ui.com/api/text-field
 * 
 * 
 * 
 */
const TextInput =(props)=>{
    return (
      <Widget {...props} component={TextInputComponent}/>
    )
}

TextInput.propTypes = {
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros: PropTypes.object,
  /** Directive to fill the label with the value contained in the  EPICS pv's DESC field. */
  usePvLabel: PropTypes.bool,
  /** Directive to use the units contained in the  EPICS pv's EGU field. */
  usePvUnits: PropTypes.bool,
  /** Directive to round the value. */
  usePrecision: PropTypes.bool,
  /** Custom precision to round the value too, if not defined then the EPICS PREC field will be used, if `usePrecision` is defined. */
  prec: PropTypes.number,
  /** Custom units to be used, if `usePvUnits` is not defined. */
  units: PropTypes.string,
  /** Directive to use the HOPR and LOPR EPICS fields to limit the maximum and minimum values that can be contained in the value. */
  usePvMinMax: PropTypes.bool,
  /** Directive to use the EPICS alarm severity status to alter the fields backgorund color  */
  alarmSensitive: PropTypes.bool,
  /** Custom label to be used, if  `usePvLabel` is not defined. */
  label: PropTypes.string,
  /** Custom minimum to be used, if `usePvMinMax` is not defined. */
  min: PropTypes.number,
  /** Custom maximum to be used, if `usePvMinMax` is not defined. */
  max: PropTypes.number,
  /** If defined, then the string value of the EPICS enumerator type will be forced to be used, if not defined the the enumerator index is used */
  useStringValue: PropTypes.bool,
  /** If defined, then the DataConnection debugging information will be displayed*/
  debug: PropTypes.bool,
  /** local variable intialization value*/
  intialLocalVariableValue: PropTypes.string,
  /** Material-UI TextField variant*/
  variant: PropTypes.string,
  /** Material-UI TextField margin*/
  margin: PropTypes.string,


};
TextInput.defaultProps = {
  debug: false,
  variant: "outlined",
  margin: "none",
  alarmSensitive: false
};

export default withStyles(styles, { withTheme: true })(TextInput);
