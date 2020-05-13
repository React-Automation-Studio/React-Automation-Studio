import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Checkbox as MuiCheckBox, FormControlLabel } from "@material-ui/core";
import GenericWidget from "../SystemComponents/Widgets/GenericWidget";
import PropTypes from 'prop-types';

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
 * The CheckBox component is a wrapper on a Material-UI CheckBox component.
 https://material-ui.com/api/checkbox/
 */
const CheckBoxComponent = (props) => {


  /**
   * Send checkbox value to the PV.
   * @param {Event} event
   */
  function handleButtonChange(event) {
    let value = event.target.checked ? 1 : 0;
    props.onUpdateWidgetState({
      value: value,
      outputValue: value,
    });
  }


  return (
    <FormControlLabel
      key={props.pvName}
      className={props.classes.FormControl}
      disabled={props.disabled}
      label={props.label}
      labelPlacement={props.labelPlacement}
      control={
        <MuiCheckBox
          onChange={handleButtonChange}
          checked={props.value == 1}
          color={props.onColor}
        />
      }
    />
  );

}

const CheckBox = (props) => {
  return (
    <GenericWidget {...props}>

      <CheckBoxComponent {...props} />


    </GenericWidget>
  )
}

CheckBox.propTypes = {
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros: PropTypes.object,

  /** local variable intialization value*/
  intialLocalVariableValue: PropTypes.string,
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

}
CheckBox.defaultProps = {
  onColor: 'primary',
  debug: false,
}
export default withStyles(styles, { withTheme: true })(CheckBox);
