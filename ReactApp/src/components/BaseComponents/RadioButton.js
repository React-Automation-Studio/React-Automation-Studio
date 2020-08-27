import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Radio, FormControlLabel } from "@material-ui/core";
import Widget from "../SystemComponents/Widgets/Widget";
import PropTypes from 'prop-types';

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
}));

/* eslint-disable eqeqeq */
const RadioButtonComponent=(props)=>{

  const classes = useStyles();

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
        className={classes.FormControl}
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
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
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
  * Custom PV to define the units to be used, usePvLabel must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
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
}

RadioButton.defaultProps = {
  onColor: 'primary',
  debug: false,
  showTooltip:false,
  alignHorizontal: false,
  stretch: true,
}

RadioButtonComponent.defaultProps = RadioButton.defaultProps;

export default RadioButton;
export { RadioButton, RadioButtonComponent };
