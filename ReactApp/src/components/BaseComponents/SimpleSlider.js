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
 function handleOnClickCapture(event){
  
  if (event.button !== 0) {
    event.preventDefault()
   return;
 }
 }
  return (
    <div  className={props.classes.sliderDiv}>
      {content}
      <Slider
        className={props.classes.slider}
        onPointerDownCapture={handleOnClickCapture}
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
* **DEPRECATED Use Slider component instead** The SimpleSlider Component is a wrapper on the Material-UI contained Slider component. The SimpleSlider component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
* The margins and spacing must be controlled from the parent component.<br/><br/>
* Material-UI Slider Demos:
* https://material-ui.com/components/slider/<br/><br/>
* Material-UI Slider API:
* https://material-ui.com/api/slider/
*/
const SimpleSlider = (props) => {
  console.warn("Deprecated use Slider component instead, component will be removed in the next release")
  return (
    <Widget  {...props} component={SimpleSliderComponent} name={"SimpleSlider"}/>
  )
}

/**
   * Specific props type and default values for this widgets.
   * They extends the ones provided for a generic widget.
   */
SimpleSlider.propTypes = {

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
   * If not defined it uses the custom min and max as defined by the min and max prop.
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
  

  
  /**
   * If defined, then the string representation of the number can be formatted
   * using the mathjs format function
   * eg. numberFormat={{notation: 'engineering',precision: 3}}.
   * See https://mathjs.org/docs/reference/functions/format.html for more examples
   */
  numberFormat: PropTypes.object,
  
  
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string,

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
