import React from "react";
import withStyles from '@mui/styles/withStyles';
import { Button, FormControlLabel } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
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
  /** If defined this sets the precision of the integer control values of the widget*/
  prec_integer: PropTypes.number,
  /** If defined this sets the precision of the decimal control values of the widget*/
  prec_decimal: PropTypes.number,
  /** An array of custom increments. If defined, overrides any values in 'prec_integer','prec_decimal'*/
  custom_increments: PropTypes.array,
  
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
  * Custom PV to define the units to be used, usePvLabel must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
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
   * Custom PV to define the maximum to be used, usePvMinMax must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  maxPv: PropTypes.string,
  /**
   * Custom minimum value to be used, if usePvMinMax is not defined.
   */
  min: PropTypes.number,
  /**
   * Custom PV to define the minimum to be used, usePvMinMax must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  minPv: PropTypes.string,
  
  /**
   * Custom precision to round the value.
   */
  prec: PropTypes.number,
  /**
   * Custom PV to define the precision to be used, usePvPrecision must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  precPv: PropTypes.string,

  /**
   * Custom units to be used, if usePvUnits is not defined.
   */
  units: PropTypes.string,
  /**
   * Custom PV to define the units to be used, usePvUnits must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
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
   * The pyEpics metadata is unfortunately static and the values used will be the initial values that pvserver receives when it connects the first time. 
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
   * Directive to use the units contained in the   pv metadata's EGU field or unitsPv.
   *  If not defined it uses the custom units as defined by the units prop.
   */
  usePvUnits: PropTypes.bool,

  /** Name of the process variable,  eg. '$(device):test$(id)'*/
  pv: PropTypes.string,

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

ThumbWheel.defaultProps = {
  prec_integer: 4,
  prec_decimal: 3,
  usePvMinMax: false,
  debug: false,
  showTooltip:false
};

export default withStyles(styles, { withTheme: true })(ThumbWheel);
