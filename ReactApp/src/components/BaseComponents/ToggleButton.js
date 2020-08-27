import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Button, FormControlLabel } from "@material-ui/core";
import PropTypes from "prop-types";
import {isMobile,isTablet} from 'react-device-detect';
import Widget from "../SystemComponents/Widgets/Widget";

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

/* eslint-disable eqeqeq */
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

  const classes = useStyles();
  const { value } = props;
  let momentary = props.momentary !== undefined ? props.momentary : false;
  let text;
  if (props.initialized){
    if (props.enumStrs !== null && props.enumStrs !== undefined) {
      text=props.enumStrs[value == 1 ? 1 : 0]
    } else {
      text = value;
    }
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
          {...props.muiButtonProps}
        > 
          {text}
        </Button>
      }
    />
  )
}

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

const ToggleButton = (props) => {
  let momentary = props.momentary !== undefined ? props.momentary : false;
  let disableContextMenu;
  
  if (isMobile||isTablet){
    if(momentary===true){
      disableContextMenu=true;
    }
    else{
      disableContextMenu=props.disableContextMenu;
    }
  }
  else{
    disableContextMenu=props.disableContextMenu;
  }
  return (
    <Widget {...props} component={ToggleButtonComponent} disableContextMenu={disableContextMenu} usePvMinMax={false} usePvPrecision={false} min={undefined} max={undefined} prec={undefined} />

  )
}

/* eslint-disable eqeqeq */
/**
 * Specific props type and default values for this widgets.
 * They extends the ones provided for a generic widget.
 */
ToggleButton.propTypes = {
  
     /**
     * Custom on color to be used, must be derived from Material UI theme color.
     */
    onColor: PropTypes.string,
    /**
     * Custom off color to be used, must be derived from Material UI theme color.
     */
    offColor: PropTypes.string,
  /** If defined then component will act as momentary button*/
  momentary: PropTypes.bool,
  
  /**
   * If defined, then the DataConnection and
   * the widget debugging information will be displayed.
   */
  debug: PropTypes.bool,

  /**
   * Local variable initialization value.
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

 


  
  
  
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string,
  /** Any of the MUI Button Props can applied by defining them as an object
   * 
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
  /**
   * When receiving a PV storing an array of values users can choose a subset of these value.
   * Registers accept the indexes of the registers to effectively show.
   * Order does count!
   */
  registers: PropTypes.arrayOf(PropTypes.number),
  /**
   * When receiving a PV storing an array of values users can assign a label to each register
   * or a subset of them.
   */
  registersLabel: PropTypes.arrayOf(PropTypes.string),
  /**
   * When receiving a PV storing an array of values users can set the label position for each register,
   * or a subset of them, if the receiving components allows it.
   */
  registersLabelPlacement: PropTypes.oneOf(["top", "bottom", "start", "end"]),
  /**
   * Directive to display array elements horizontal aligned.
   */
  alignHorizontal: PropTypes.bool,
  /**
   * When alignHorizontal is true, if stretch is true
   * all the elements are aligned into one row, otherwise
   * they have their standard width.
   */
  stretch: PropTypes.bool,
};

ToggleButton.defaultProps = {
  debug: false,
  color: 'primary',
  labelPlacement: 'top',
  usePvLabel: false,
  showTooltip:false,
  alignHorizontal: false,
  stretch: true,
};

ToggleButtonComponent.defaultProps = ToggleButton.defaultProps;

export default ToggleButton;
export { ToggleButton, ToggleButtonComponent };
