import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import PropTypes from "prop-types";
import Widget from "../SystemComponents/Widgets/Widget";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    border: 1,
  },
  FormControl: {
    width: "100%",
    height: "100%",
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    
  },
  RadioGroup:{
    padding:theme.spacing(1)
  }
});

const RadioButtonGroupComponent=(props)=>{
  const handleChange=(event)=> {
    let value = event.target.value;
    props.handleImmediateChange(value);
  }
  let radioButtons = props.enumStrs.map((item, index) => (
    <FormControlLabel
      key={item}
      value={item}
      disabled={props.disabled}
      control={<Radio color={props.onColor} />}
      label={item}
      labelPlacement={props.bitLabelPlacement}
    />
  ));
  return (
    <FormControlLabel
      key={props.pvName}
      className={props.classes.formControl}
      disabled={props.disabled}
      label={props.formControlLabel}
      labelPlacement={props.labelPlacement}
      control={
        <RadioGroup className={props.classes.RadioGroup} value={props.value} onChange={handleChange} {...props.muiRadioGroupProps}>
          {radioButtons}
        </RadioGroup>
      }
    />
  );
}

/**
 * The RadioButtonGroup Component is a wrapper on the Material-UI List component.
 * The List component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI List Demos:
 * https://material-ui.com/demos/lists<br/><br/>
 * Material-UI List API:
 * https://material-ui.com/api/list
 */
const RadioButtonGroup = (props) => {
  return (
    <Widget {...props} useStringValue={true} component={RadioButtonGroupComponent} usePvMinMax={false} usePvPrecision={false} min={undefined} max={undefined} prec={undefined}/>
  )
}

/**
  * Specific props type and default values for this widgets.
  * They extends the ones provided for a generic widget.
  */
RadioButtonGroup.propTypes = {
  /**
   * If defined, this array of strings overrides the default EPICS MBBI/O
   * pv strings and are displayed as the choices in the RadioButtonGroup component.
   */
  custom_selection_strings: PropTypes.array,

  /** Name of the process variable,  eg. '$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros: PropTypes.object,

  /** Custom label to be used, if  `usePvLabel` is not defined. */
  label: PropTypes.string,
  /** If defined, then the DataConnection debugging information will be displayed*/
  debug: PropTypes.bool,
  /** label placement*/
  labelPlacement: PropTypes.oneOf(['start', 'top', 'bottom', 'end']),

  /** local variable initialization value*/
  initialLocalVariableValue: PropTypes.string,
  /**
   * Directive to fill the component's label with
   * the value contained in the  pv metadata's DESC field or the labelPv value.
   * If not defined it uses the custom label as defined by the label prop.
   */
  usePvLabel: PropTypes.bool,
  /**
   * Custom PV to define the units to be used, usePvLabel must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  labelPv: PropTypes.string,
  /** Any of the MUI RadioGroup Props can applied by defining them as an object
   * 
   */
  muiRadioGroupProps: PropTypes.object,
  /**
   * Tooltip Text
   */
  tooltip: PropTypes.string,
  /**
   * Directive to show the tooltip
   */
  showTooltip: PropTypes.bool,
  /**
   *  Any of the MUI Tooltip props can applied by defining them as an object
   */
  tooltipProps: PropTypes.object,
  /**
   * If defined, the position of the bit labels relative to the widget.
   */
  bitLabelPlacement: PropTypes.oneOf(["start", "end", "top", "bottom"]),
};

RadioButtonGroup.defaultProps = {
  labelPlacement: 'top',
  bitLabelPlacement: 'end',
  showTooltip: false
};

export default withStyles(styles, { withTheme: true })(RadioButtonGroup);
