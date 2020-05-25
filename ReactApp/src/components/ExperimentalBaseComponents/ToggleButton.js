import React, { useState } from 'react';
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

/**
 * The ToggleButton Component is a wrapper on the Material-UI Button component. The ToggleButton will ouput a value of
 *'1' or '0' to the process variable when pressed. A '1' by default represents an 'ON' or 'true' state and a '0' an 'Off' or 'false' state.
 * If the `momentary` property is define then a '1' will be output for 100 ms before returning to '0'. <br/><br/>
 * The ToggleButton component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI Button Demos:
 * https://material-ui.com/demos/buttons/<br/><br/>
 * Material-UI Button API:
 * https://material-ui.com/api/button/
 */

const ToggleButtonComponent = (props) => {
  const [clicked, setclicked] = useState(0);
  const turnOff = () => {
    if (props.debug) {
      console.log("turnoff");
    }
    setclicked(false);
    props.handleImmediateChange(0);
  }
  const handleMouseUp = () => {
    if (props.debug) {
      console.log("mouseUp");
    }
    setTimeout(turnOff, 100);
  }
  const handleButtonClick = () => {
    let value = props.value == 0 ? 1 : 0;
    props.handleImmediateChange(value);
    window.navigator.vibrate(1);
  }
  const handleMouseDown = () => {
    if (props.debug) {
      console.log("mouseDown");
    }

    setclicked(false);
    props.handleImmediateChange(1);
  }
  const handlePointerLeave = () => {
    if (props.debug) {
      console.log("mouseLeave");
    }
    if (clicked) {
      setTimeout(turnOff, 100);
    }
  }

  const { classes } = props;
  const { value } = props;
  let momentary = props.momentary !== undefined ? props.momentary : false;
  let text;
  if (props.initialized){
    text=props.enumStrs[value == 1 ? 1 : 0]
  }
  else{
    text="Disconnected";
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
          fullWidth={true}
          variant="contained"
          disabled={props.disabled}
          color={value == 1 ? props.onColor : props.offColor}
          onClick={momentary ? undefined : handleButtonClick}
          onPointerUp={momentary ? handleMouseUp : undefined}
          onPointerDown={momentary ? handleMouseDown : undefined}
          onPointerLeave={momentary ? handlePointerLeave : undefined}
        > 
          {text}
        </Button>
      }
    />
  )
}
const ToggleButton = (props) => {

  return (
    <Widget {...props} component={ToggleButtonComponent} />

  )
}


/**
 * Specific props type and default values for this widgets.
 * They extends the ones provided for a generic widget.
 */
ToggleButton.propTypes = {
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros: PropTypes.object,
  /** Directive to fill the label with the value contained in the  EPICS pv's DESC field. */
  usePvLabel: PropTypes.bool,



  /** Custom label to be used, if  `usePvLabel` is not defined. */
  label: PropTypes.string,

  /** If defined, then the string value of the EPICS enumerator type will be forced to be used, if not defined the the enumerator index is used */

  debug: PropTypes.bool,
  /** Custom color to be used, must be derived from Material UI theme color's*/
  color: PropTypes.string,
  /** If defined then component will act as momentary button*/
  momentary: PropTypes.bool,
  /** An array of custom strings to be displayed on the button for a value of 0 or 1  i.e. ['Off','On'], If not defined then EPICS enum_strs will be used*/
  custom_selection_strings: PropTypes.array,
  /** local variable intialization value*/
  intialLocalVariableValue: PropTypes.string,
  /** label placement*/
  labelPlacement: PropTypes.oneOf(['start', 'top', 'bottom', 'end']),

};

ToggleButton.defaultProps = {

  debug: false,
  color: 'primary',
  labelPlacement: 'top',
  usePvLabel: false,
};



export default withStyles(styles, { withTheme: true })(ToggleButton);
