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

 
  const handleChange=(event)=>{
    let value=event.target.value;
    props.handleChange(value);
  }
  const handleCatchReturn=(event)=> {
    if (event.key === "Enter" ) {
      props.handleCommitChange();
    }
  }



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
      readOnly:props.readOnly
    };
  } else {
    inputProps = { readOnly: true };
  }

  
  return (
    <TextField
      className={textFieldClassName}

      key={props.pvName}
      //aria-owns={this.state.openContextMenu ? 'menu-list-grow' : undefined}
      aria-haspopup="true"
      value={!props.initialized?props.pvName:value}
      onKeyPress={handleCatchReturn}
      onFocus={props.handleFocus}
      onBlur={props.handleBlur}
      onChange={handleChange}
      label={!props.initialized?props.disconnectedIcon:props.label}
      fullWidth={true}
      margin={props.margin}
      variant={props.variant}
      disabled={props.disabled}
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
  
  /** Material-UI TextField variant*/
  variant: PropTypes.string,
  /** Material-UI TextField margin*/
  margin: PropTypes.string,
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
   * Local variable intialization value.
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
   * Custom precision to round the value.
   */
  prec: PropTypes.number,
  /**
   * Custom PV to define the precision to be used, usePvPrecision must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
   */
  precPv: PropTypes.string,
 

  
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
   * If not defined it uses the custom mina nd max as defined by the min and max prop.
   */
  usePvMinMax: PropTypes.bool,
  /**
   * Directive to round the value using the precision field of the PV metadata or precPv.
   * If not defined it uses the custom precision as defined by the prec prop.
   */
  usePvPrecision: PropTypes.bool,
  /**
   * Directive to use the units contained in the   pv metdata's EGU field or unitsPv.
   *  If not defined it uses the custom units as defined by the units prop.
   */


  usePvUnits: PropTypes.bool,
  /**
   * Directive to use PV's string values.
   */
  useStringValue: PropTypes.bool,



  
  /**
   * If defined, then the string representaion of the number can be formatted
   * using the mathjs format function
   * eg. numberFormat={{notation: 'engineering',precision: 3}}.
   * See https://mathjs.org/docs/reference/functions/format.html for more examples
   */
  numberFormat: PropTypes.object,
  /**
   * Custom on color to be used, must be derived from Material UI theme color's.
   */
  onColor: PropTypes.string,
  /**
   * Custom off color to be used, must be derived from Material UI theme color's.
   */
  offColor: PropTypes.string,
  
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string,
  /** Array of the process variables, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pvs: PropTypes.arrayOf(PropTypes.string),
  /**
   * Object with a string and the corresponding severity value.
   * When PV value is equal to the string, set the corresponding severity
   * in the widget's severity.
   * Example: { stringMatch: '1', severity: 2 }.
   */
  stringSeverity: PropTypes.object,
  /**
   * Directive to overided alarm severity with the rules defined in the stringSeverity
   */
  useStringSeverityMatch: PropTypes.bool,


};
TextInput.defaultProps = {
  debug: false,
  variant: "outlined",
  margin: "none",
  alarmSensitive: false
};

export default withStyles(styles, { withTheme: true })(TextInput);
