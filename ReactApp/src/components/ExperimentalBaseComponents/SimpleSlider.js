import React, {  useRef } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Slider, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import Widget from "../SystemComponents/Widgets/Widget";


const styles = (theme) => ({
  root: {
    width: 300,
  },
  slider: {
   // padding: "30px 0px ",
    color: "primary",
  },
  rangeLabel: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(1) * 2,
  },
  sliderDiv: {
    paddingRight: theme.spacing(1) * 3,
    paddingLeft: theme.spacing(1) * 3,
  },
});


function SimpleSliderComponent(props) {
  const emitChangeDebounced = useRef(debounce(value => emitChange(value), 10)).current;

  /**
   * Write value on the PV using emitChangeDebounced function.
   * This function store the value and then wait for 10ms
   * before it can be triggered again.
   * @param {Event} event
   * @param {float} value
   */
  function handleChange(event, value) {
    props.handleFocus();
    //debounce(emitChange(value), 10)
    emitChangeDebounced(value);
  }

  /**
   * Save value on the state.
   * @param {string} value
   */
  function emitChange(value) {
    
    props.handleImmediateChange(value)
  }

  /**
   * When stop moving the slider save the reached value.
   * @param {Event} event
   * @param {float} value
   */
  function handleChangeCommited(event,value) {

    props.handleImmediateChange(value);
    props.handleBlur();
   
  }


  let content, marks;
  if (props.initialized) {
    content = (
      <Typography className={props.classes.rangeLabel}>
        {props.label} {props.value} {props.units}
      </Typography>
    );
  } else {
    content = (
      <Typography >
        {props.disconnectedIcon}{" "+props.pvName}
      </Typography>
    );
  }
  let min = props.min !== undefined ? props.min : 0;
  
  let max = props.max !== undefined ? props.max : 100;
  
  let units=props.units?props.units:""
  if (props.marks !== undefined) {
    marks = props.marks;
  } else {
    marks = [
      {
        value: min,
        label:

          min +
          " " +
          units,
      },
      {
        value: max,
        label:

          max +
          " " +
         units,
      },
    ];
  }
 //console.log("SimpleSlider",props.value,min,max,marks,props.step)
 
  return (
    <div  className={props.classes.sliderDiv}>
      {content}
      <Slider
        className={props.classes.slider}
        
        aria-labelledby="label"
        disabled={props.disabled}
        value={props.initialized?parseFloat(props.value):0}
        min={props.initialized ?parseFloat(min) : undefined}
        max={props.initialized ?parseFloat(max) : undefined}
        marks={props.initialized ? marks : undefined}
        valueLabelDisplay={props.showThumbValue ? "on" : "off"}
        step={props.step !== undefined ? props.step : undefined}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommited}
      />
    </div>
  );



}

/**
* The SimpleSlider Component is a wrapper on the Material-UI contained Slider component. The SimpleSlider component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
* The margins and spacing must be controlled from the parent component.<br/><br/>
* Material-UI Slider Demos:
* https://material-ui.com/components/slider/<br/><br/>
* Material-UI Slider API:
* https://material-ui.com/api/slider/
*/
const SimpleSlider = (props) => {

  return (
    <Widget  {...props} component={SimpleSliderComponent} name={"SimpleSlider"}/>
  )
}

/**
   * Specific props type and default values for this widgets.
   * They extends the ones provided for a generic widget.
   */
SimpleSlider.propTypes = {

  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros: PropTypes.object,
  /** Directive to fill the label with the value contained in the  EPICS pv's DESC field. */
  usePvLabel: PropTypes.bool,
  /** Directive to use the units contained in the  EPICS pv's EGU field. */
  usePvUnits: PropTypes.bool,
  /** Directive to round the value. */
  usePvPrecision: PropTypes.bool,
  /** Custom precision to round the value too, if not defined then the EPICS PREC field will be used, if `usePvPrecision` is defined. */
  prec: PropTypes.number,
  /** Custom units to be used, if `usePvUnits` is not defined. */
  units: PropTypes.string,
  /** Directive to use the HOPR and LOPR EPICS fields to limit the maximum and minimum values that can be contained in the value. */
  usePvMinMax: PropTypes.bool,
  /** Custom label to be used, if  `usePvLabel` is not defined. */
  label: PropTypes.string,
  /** Custom minimum to be used, if `usePvMinMax` is not defined. */
  min: PropTypes.number,
  /** Custom maximum to be used, if `usePvMinMax` is not defined. */
  max: PropTypes.number,
  /** If defined, then the string value of the EPICS enumerator type will be forced to be used, if not defined the the enumerator index is used */
  useStringValue: PropTypes.bool,
  /** If defined, then the DataConnection debugging information will be displayed*/
  debug: PropTypes.bool,
  /** local variable intialization value*/
  intialLocalVariableValue: PropTypes.string,

  // Custom markers in format:
  // [{value: uservalue1,label:userlabel1},{value: uservalue...,label:userlabel...}
  marks: PropTypes.array,
  // Show thumb with value
  showThumbValue: PropTypes.bool,
  // If defined, the value will be increment or decremented
  // in the define step intervals
  step: PropTypes.number,
};

SimpleSlider.defaultProps = {
  showThumbValue: false,
  step: 1,

};

export default withStyles(styles, { withTheme: true })(SimpleSlider);
