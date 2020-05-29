import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, FormControlLabel } from "@material-ui/core";
import PropTypes from "prop-types";
import Widget from "../SystemComponents/Widgets/Widget";


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
  Button: {
    width: "100%",
    height: "100%",
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
  },
});



const ActionButtonComponent=(props)=> {

  /**
   * Send the predefined value to the PV.
   */
  const handleButtonClick=()=> {
   
    props.handleImmediateChange(props.actionValue);
  }


  return (
    <FormControlLabel
      key={props.pvName}
      className={props.classes.FormControl}
      disabled={props.disabled}
      label={props.formControlLabel}
      labelPlacement={props.labelPlacement}
      control={
        <Button
          className={props.classes.Button}
          variant="contained"
          color={props.onColor}
          onClick={handleButtonClick}
        >
          {props.actionString}
        </Button>
      }
    />
  );
}

/**
 * The ActionButton Component is a wrapper on the Material-UI Button component.
 * The ActionButton will ouput the `actionValue` to the process variable when pressed.
 * The ActionButton component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI Button Demos:
 * https://material-ui.com/demos/buttons/<br/><br/>
 * Material-UI Button API:
 * https://material-ui.com/api/button/
 * */

const ActionButton = (props)=> {
  
    return (
      <Widget  {...props} component={ActionButtonComponent}/> 
     
    )
  }

ActionButton.propTypes = {
  /** Define the string on the button.*/
  actionString: PropTypes.string,
  /**  Define the value to write into the PV.*/
  actionValue: PropTypes.any,
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string,
  /** Array of the process variables, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pvs: PropTypes.arrayOf(PropTypes.string),
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros: PropTypes.object,
  /** Directive to fill the label with the value contained in the  EPICS pv's DESC field. */
  usePvLabel: PropTypes.bool,

  /** Custom color to be used, must be derived from Material UI them color's*/
  color: PropTypes.string,

  /** Custom label to be used, if  `usePvLabel` is not defined. */
  label: PropTypes.string,

  /** Postion of label*/
  labelPlacement: PropTypes.oneOf(['top', 'bottom', 'start', 'end']),

  /** If defined, then the string value of the EPICS enumerator type will be forced to be used, if not defined the the enumerator index is used */
  useStringValue: PropTypes.bool,
  /** If defined, then the DataConnection debugging information will be displayed*/
  debug: PropTypes.bool,
  /** local variable intialization value*/
  intialLocalVariableValue: PropTypes.string

};

export default withStyles(styles, { withTheme: true })(ActionButton);
