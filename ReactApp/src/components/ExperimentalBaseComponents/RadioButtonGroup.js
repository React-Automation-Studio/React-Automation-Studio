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

/**
 * The RadioButtonGroup Component is a wrapper on the Material-UI List component.
 * The List component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI List Demos:
 * https://material-ui.com/demos/lists<br/><br/>
 * Material-UI List API:
 * https://material-ui.com/api/list
 */
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
        labelPlacement="start"
      />
    ));
    return (
      <FormControlLabel
        key={props.pvName}
        className={props.classes.formControl}
     //   component="fieldset"
        disabled={props.disabled}
        label={props.formControlLabel}
        labelPlacement={props.labelPlacement}
        control={
          <RadioGroup className={props.classes.RadioGroup}   value={props.value} onChange={handleChange}>
            {radioButtons}
          </RadioGroup>
        }
      />
    );
  }

 


const RadioButtonGroup = (props) => {
  return (
    <Widget {...props} useStringValue={true} component={RadioButtonGroupComponent}/>
  )
}
 /**
   * Specific props type and default values for this widgets.
   * They extends the ones provided for a generic widget.
   */
  RadioButtonGroup.propTypes = {
    //If defined, this array of strings overides the default EPICS MBBI/O
    //pv strings and are displayed as the choices in the RadioButtonGroup component
    custom_selection_strings: PropTypes.array,
  };

  RadioButtonGroup.defaultProps = {
   labelPlacement:'top'
  };
export default   withStyles(styles, { withTheme: true })(RadioButtonGroup)

