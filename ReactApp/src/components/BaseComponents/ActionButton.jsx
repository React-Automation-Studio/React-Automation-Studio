import React from "react";
import { Button, FormControlLabel } from "@mui/material";
import PropTypes from "prop-types";
import Widget from "../SystemComponents/Widgets/Widget";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
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
  Button: {
    width: "100%",
    height: "100%",
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));


const ActionButtonComponent=(props)=> {
  const classes =useStyles();

  /**
   * Send the predefined value to the PV.
   */
  const handleButtonClick=()=> {
   
    props.handleImmediateChange(props.actionValue);
  }

  return (
    <FormControlLabel
      key={props.pvName}
      className={classes.FormControl}
      disabled={props.disabled}
      label={props.formControlLabel}
      labelPlacement={props.labelPlacement}
      control={
        <Button
          className={classes.Button}
          variant="contained"
          color={props.color}
          onClick={handleButtonClick}
          {...props.muiButtonProps}
        >
          {props.actionString}
        </Button>
      }
    />
  );
}

/**
 * The ActionButton Component is a wrapper on the Material-UI Button component.
 * The ActionButton will output the `actionValue` to the process variable when pressed.
 * The ActionButton component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI Button Demos:
 * https://material-ui.com/demos/buttons/<br/><br/>
 * Material-UI Button API:
 * https://material-ui.com/api/button/
 * */
const ActionButton = (props)=> {
    return (
      <Widget  {...props} component={ActionButtonComponent} writeOutputValueToAllpvs={true}/> 
    )
  }

ActionButton.propTypes = {
  /** Define the string on the button.*/
  actionString: PropTypes.string,
  /**  Define the value to write into the PV.*/
  actionValue: PropTypes.any,
  /** Name of the process variable,  eg. '$(device):test$(id)'*/
  pv: PropTypes.string,
  /** Array of the process variables, eg. '$(device):test$(id)'*/
  pvs: PropTypes.arrayOf(PropTypes.string),
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros: PropTypes.object,
  /** Directive to fill the label with the value contained in the  EPICS pv's DESC field. */
  usePvLabel: PropTypes.bool,

  /** Custom color to be used, must be derived from Material UI them color's*/
  color: PropTypes.string,

  /** Custom label to be used, if  `usePvLabel` is not defined. */
  label: PropTypes.string,

  /** Position of label*/
  labelPlacement: PropTypes.oneOf(['top', 'bottom', 'start', 'end']),

  /** If defined, then the string value of the EPICS enumerator type will be forced to be used, if not defined the the enumerator index is used */
  useStringValue: PropTypes.bool,
  /** If defined, then the DataConnection debugging information will be displayed*/
  debug: PropTypes.bool,
  /** local variable initialization value*/
  initialLocalVariableValue: PropTypes.string,
  /**
   * Any of the MUI Button Props can applied by defining them as an object
   */
  muiButtonProps: PropTypes.object,
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
};

ActionButton.defaultProps = { 
  showTooltip:false,
  color:'primary',
};

export default ActionButton;
