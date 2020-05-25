import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Radio, FormControlLabel } from "@material-ui/core";
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
 * The RadioButton component is a wrapper on a Material-UI RadioButton component. <br/><br/>
 * https://material-ui.com/api/radio/
 */
const RadioButtonComponent=(props)=>{

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
        className={props.classes.FormControl}
        disabled={props.disabled}
        label={props.formControlLabel}
        labelPlacement={props.labelPosition}
        control={
          <Radio
            onClick={handleOnClick}
            checked={props.value == 1}
            color={props.onColor}
          />
        }
      />
    );
 
}
const RadioButton = (props) => {
  return (
    <Widget {...props} component={RadioButtonComponent}/>

  )
}
export default withStyles(styles, { withTheme: true })(RadioButton);
