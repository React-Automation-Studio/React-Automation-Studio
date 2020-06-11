import React, { useState } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Button, FormControlLabel } from "@material-ui/core";
import PropTypes from "prop-types";
import {isMobile,isTablet} from 'react-device-detect';
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
    <Widget {...props} component={ToggleButtonComponent} disableContextMenu={disableContextMenu} />

  )
}

/* eslint-disable eqeqeq */
/**
 * Specific props type and default values for this widgets.
 * They extends the ones provided for a generic widget.
 */
ToggleButton.propTypes = {
  
  /** Custom color to be used, must be derived from Material UI theme color's*/
  color: PropTypes.string,
  /** If defined then component will act as momentary button*/
  momentary: PropTypes.bool,
  
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
  


  
  
  
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string,
  /** Array of the process variables, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pvs: PropTypes.arrayOf(PropTypes.string),

};

ToggleButton.defaultProps = {

  debug: false,
  color: 'primary',
  labelPlacement: 'top',
  usePvLabel: false,
};



export default withStyles(styles, { withTheme: true })(ToggleButton);
