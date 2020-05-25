import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { FormControlLabel, Switch } from "@material-ui/core";
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
});

/**
 * The SwitchComponent component is a wrapper on a Material-UI Selection Control component.
 * The Selection Control component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI Selection Control Demos:
 * https://material-ui.com/demos/selection-controls/<br/><br/>
 * Material-UI Switch API:
 * https://material-ui.com/api/switch/
 */
const SwitchInternalComponent = (props) => {
  

  /**
   * Save switch state.
   * @param {Event} event
   */
 const handleButtonChange=(event)=> {
    let value = event.target.checked ? 1 : 0;
    props.handleImmediateChange(value);
  }

 
    return (
      <FormControlLabel
        key={props.pvName}
        className={props.classes.FormControl}
        disabled={props.disabled}
        label={props.label}
        labelPlacement={props.labelPosition}
        control={
          <Switch
            onChange={handleButtonChange}
            checked={props.value == 1}
            color={props.onColor}
          />
        }
      />
    );
  }

const SwitchComponent =(props)=>{
  return (
    <Widget {...props} component={SwitchInternalComponent}/>
       
    
  )
}
export default withStyles(styles, { withTheme: true })(SwitchComponent)

