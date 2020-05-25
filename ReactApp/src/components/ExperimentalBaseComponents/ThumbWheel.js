import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, FormControlLabel } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import PropTypes from "prop-types";
import Widget from "../SystemComponents/Widgets/Widget";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  Button: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
  },
});




const ThumbWheelComponent = (props) => {

  function handleButtonClick(incrementValue) {
    if (props.initialized) {
      let value = parseFloat(props.value) + parseFloat(incrementValue);
      props.handleImmediateChange(value);;
      window.navigator.vibrate(1);
    }
  }
  let prec_integer = props.prec_integer;
  let prec_decimal = props.prec_decimal;
  let prec_decimal_div = prec_decimal > 0 ? prec_decimal : 0;
  let num_array = [];
  if (props.custom_increments !== undefined) {
    num_array = props.custom_increments.sort((a, b) => a - b);
  } else {
    for (let i = 0; i < prec_integer; i++) {
      num_array.push(10 ** i);
    }
    for (let i = 1; i <= prec_decimal; i++) {
      let value = 10 ** -i
      value = value.toFixed(i)
      num_array.unshift(value);
    }
  }
  return (<ThumbWheelWidget
    {...props}
    disabled={props.disabled}
    label={props.label}
    //labelPosition={props.labelPosition}
    num_array={num_array}
    prec_decimal_div={prec_decimal_div}
    onHandleButtonClick={handleButtonClick}
  />
  )
}

/**
 * Function with the details of the graphic object
 * @param {any} props
 */
const ThumbWheelWidget = (props) => {
  return (
    <FormControlLabel
      key={props.pvName}
      className={props.classes.Button}
      disabled={props.disabled}
      control={
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          {props.num_array.map((item, index) => (
            <div
              key={"toprowbuttons" + index + "div1"}
              style={{
                paddingRight: props.theme.spacing(1),
                paddingLeft: props.theme.spacing(1),
                display: "flex",
                flexDirection: "column",
              }}
            >
              <FormControlLabel
                className={props.classes.Button}
                control={
                  <SingleThumbWheelWidget {...props} item={item} up={true} />
                }
                label={item}
                labelPlacement="bottom"
              />
              <SingleThumbWheelWidget {...props} item={item} up={false} />
            </div>
          ))}
        </div>
      }
      label={props.formControlLabel}
      labelPlacement={props.labelPlacement}
    />
  );
}

/**
 * Single wheel element
 * @param {any} props
 */
const SingleThumbWheelWidget = (props) => {
  return (
    <Button
      key={(props.up ? "top" : "bottom") + "rowbuttons" + props.index}
      className={props.classes.Button}
      disabled={props.disabled}
      size={props.buttonSize !== undefined ? props.buttonSize : "small"}
      variant="contained"
      color="primary"
      onClick={() =>
        props.onHandleButtonClick(props.up ? props.item : -props.item)
      }
    >
      {props.up ? <ExpandLess /> : <ExpandMore />}
    </Button>
  );
}
/**
 *  The ThumbWheel component is a wrapper on an array of Material-UI Button components.
 *  The Button component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 *  The margins and spacing must be controlled from the parent component.<br/><br/>
 *  Material-UI Button Demos:
 *  https://material-ui.com/demos/buttons/<br/><br/>
 *  Material-UI Button API:
 *  https://material-ui.com/api/button/
 */
const ThumbWheel = (props) => {
  return (
    <Widget {...props} component={ThumbWheelComponent} />
  )
}


ThumbWheel.propTypes = {
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros: PropTypes.object,
  /** Directive to use the HOPR and LOPR EPICS fields to limit the maximum and minimum values that can be contained in the value. */
  usePvMinMax: PropTypes.bool,
  /** Directive to use the EPICS alarm severity status to alter the fields backgorund color  */
  alarmSensitive: PropTypes.bool,
  /** Custom minimum to be used, if `usePvMinMax` is not defined. */
  min: PropTypes.number,
  /** Custom maximum to be used, if `usePvMinMax` is not defined. */
  max: PropTypes.number,
  /** If defined, then the DataConnection debugging information will be displayed*/
  debug: PropTypes.bool,
  /** If defined this sets the precision of the integer control values of the widget*/
  prec_integer: PropTypes.number,
  /** If defined this sets the precision of the decimal control values of the widget*/
  prec_decimal: PropTypes.number,

  /** Custom precision to round the value.    */
  prec: PropTypes.number,

  /** Directive to round the value using the PREC field of the PV. If not defined it uses the custom precision. */
  usePvPrecision: PropTypes.bool,
  /** An array of custom increments. If defined, overides any values in 'prec_integer','prec_decimal'*/
  custom_increments: PropTypes.array,
  /** local variable intialization value*/
  intialLocalVariableValue: PropTypes.string

};
ThumbWheel.defaultProps = {
  prec_integer: 4,
  prec_decimal: 3,
  usePvMinMax: false,
  debug: false,
  alarmSensitive: false,
};
export default withStyles(styles, { withTheme: true })(ThumbWheel);
