import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, FormControlLabel } from "@material-ui/core";
import PropTypes from "prop-types";
import GenericWidget from "../SystemComponents/Widgets/GenericWidget";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
});



const ActionFanoutButtonComponent=(props)=> {
  

  /**
   * Write actionValue to all PVs linked to this component.
   */
  const handleButtonClick=()=> {
    let values = {};
    for (let pvName of props.pvList) {
      values[pvName] = {
        checkValue: true,
        value: props.actionValue,
        outputValue: props.actionValue,
        newValueTrigger: 1,
      };
    }
    props.onUpdateWidgetState(values);
  }

 
    return (
      <FormControlLabel
        key={props.pvName}
        style={{
          width: "100%",
          margin: 0,
        }}
        disabled={props.disabled}
        label={props.label}
        labelPlacement={props.labelPlacement}
        control={
          <Button
            fullWidth={true}
            variant="contained"
            color={props.onColor}
            className={props.classes.button}
            onClick={handleButtonClick}
          >
            {props.actionString}
          </Button>
        }
      />
    );
  

}
/**
 * The ActionFanoutButton Component is a wrapper on the Material-UI Button component.
 * The ActionButton will ouput the `actionValue` to all the process variable.
 * The ActionButton component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI Button Demos:
 * https://material-ui.com/demos/buttons/<br/><br/>
 * Material-UI Button API:
 * https://material-ui.com/api/button/
 * 
 * */
const ActionFanoutButton =(props)=> {
    return (
      <GenericWidget {...props} component={ActionFanoutButtonComponent}  />
    )
  }

ActionFanoutButton.propTypes = {
  /** Names of the process variables, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  dataPVs: PropTypes.array.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros:PropTypes.object,

  /** Custom color to be used, must be derived from Material UI them color's*/
  color: PropTypes.string,

  /** Custom label to be used */
  label: PropTypes.string,

  /** Postion of label*/
  labelPlacement:  PropTypes.oneOf(['top', 'bottom','start','end']),

  /** If defined, then the string value of the EPICS enumerator type will be forced to be used, if not defined the the enumerator index is used */
  useStringValue:PropTypes.bool,
  /** If defined, then the DataConnection debugging information will be displayed*/
  debug:PropTypes.bool,
  /** local variable intialization value*/
  intialLocalVariableValue:PropTypes.string


};

ActionFanoutButton.defaultProps = {
    debug: false,
    color: 'primary',
    useStringValue: false,
    usePvLabel: false
};

export default withStyles(styles, { withTheme: true })(ActionFanoutButton);
