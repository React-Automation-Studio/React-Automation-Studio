import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { IconButton, FormControlLabel } from "@material-ui/core";
import { Lens } from "@material-ui/icons";
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


function StyledIconButtonComponent (props) {
 
  /**
   * Write in the PV the oppisite value of the actual one.
   */
  function handleButtonClick() {
    let value = props.value === 0 ? 1 : 0;
    props.onUpdateWidgetState({
      value: value,
      outputValue: value,
      newValueTrigger: 1,
    });
  }

 
    return (
      <FormControlLabel
        key={props.pvName}
        className={props.classes.FormControl}
        disabled={props.disabled}
        label={props.label}
        labelPlacement={props.labelPosition}
        control={
          <IconButton
            size="small"
            color={
              props.value === 1 ? props.onColor : props.offColor
            }
            onClick={handleButtonClick}
          >
            {props.children === undefined ? <Lens /> : props.children}
          </IconButton>
        }
      />
    )
  
}


/**
 * The StyledIconButton Component is a wrapper on the Material-UI contained SvgIcon component.
 * The SvgIcon component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI SvgIcon Demos:
 * https://material-ui.com/style/icons/<br/><br/>
 * Material-UI SvgIcon API:
 * https://material-ui.com/api/svg-icon/<br/><br/>
 * A custom Icon can used by importing it in the parent and assigning it as a child <br/><br/>
 */
const StyledIconButton =(props)=>{
    return (
      <GenericWidget {...props}>
            <StyledIconButtonComponent {...props}  />
      </GenericWidget>
    )
  }

StyledIconButton.propTypes = {
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros: PropTypes.object,
 
  /** local variable intialization value*/
  intialLocalVariableValue: PropTypes.string,
   /** If defined, then the DataConnection debugging information will be displayed*/
   debug: PropTypes.bool,
    /** label placement*/
  labelPlacement:PropTypes.oneOf(['start', 'top','bottom','end']),
  /** Custom label to be used, if  `usePvLabel` is not defined. */
  label: PropTypes.string,
      /**
     * Custom on color to be used, must be derived from Material UI theme color's or can be a standard color.
     */
    onColor: PropTypes.string,
    /**
     * Custom off color to be used, must be derived from Material UI theme color's or can be a standard color.
     */
    offColor: PropTypes.string,

};
StyledIconButton.defaultProps = {
  onColor:'primary',
  offColor:'default',
  debug: false,
}
export default  withStyles(styles, { withTheme: true })(StyledIconButton);

