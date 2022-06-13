import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Radio, FormControlLabel } from "@material-ui/core";
import Widget from "../SystemComponents/Widgets/Widget";
import PropTypes from 'prop-types';
const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  FormControl: {
    width: "100%",
    height: "100%",
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

/* eslint-disable eqeqeq */
const RadioButtonComponent=(props)=>{

  /**
   * Send to PV the opposite value
   */
  const handleOnClick=()=> {
    let value = props.value == 0 ? 1 : 0;
    props.handleImmediateChange(value);
  }
 
  return (
    <FormControlLabel
      key={props.pvName}
      className={props.classes.FormControl}
      disabled={props.disabled}
      label={props.formControlLabel}
      labelPlacement={props.labelPosition}
      control={
        <Radio
          onClick={handleOnClick}
          checked={props.value == 1}
          color={props.onColor}
          {...props.muiRadioProps}
        />
      }
    />
  );
}

/* eslint-enable eqeqeq */
/**
 * The RadioButton component is a wrapper on a Material-UI RadioButton component. <br/><br/>
 * https://material-ui.com/api/radio/
 */
const RadioButton = (props) => {
  return (
    <Widget {...props} component={RadioButtonComponent} usePvMinMax={false} usePvPrecision={false} min={undefined} max={undefined} prec={undefined}/>
  )
}

RadioButton.propTypes = {
  /** Name of the process variable,  eg. '$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros: PropTypes.object,

  /** local variable initialization value*/
  initialLocalVariableValue: PropTypes.string,
  /** If defined, then the DataConnection debugging information will be displayed*/
  debug: PropTypes.bool,
  /** label placement*/
  labelPlacement: PropTypes.oneOf(['start', 'top', 'bottom', 'end']),
  /** Custom label to be used, if  `usePvLabel` is not defined. */
  label: PropTypes.string,
  /**
   * Custom on color to be used, must be derived from Material UI theme color's.
   */
  onColor: PropTypes.string,
  /**
   * Directive to fill the component's label with
   * the value contained in the  pv metadata's DESC field or the labelPv value.
   * If not defined it uses the custom label as defined by the label prop.
   */
  usePvLabel: PropTypes.bool,
  /**
   * Custom PV to define the units to be used, usePvLabel must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  labelPv: PropTypes.string,
  /** Any of the MUI Radio Props can applied by defining them as an object
   * 
   */
  muiRadioProps: PropTypes.object,
  /**
   * Tooltip Text
   */
  tooltip:PropTypes.string,
  /**
   * Directive to show the tooltip
   */
  showTooltip:PropTypes.bool,
  /**
   *  Any of the MUI Tooltip props can applied by defining them as an object
   */
  tooltipProps:PropTypes.object,
}

RadioButton.defaultProps = {
  onColor: 'primary',
  debug: false,
  showTooltip:false
}

export default withStyles(styles, { withTheme: true })(RadioButton);
