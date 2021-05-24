import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { IconButton, FormControlLabel } from "@material-ui/core";
import { Lens } from "@material-ui/icons";
import Widget from "../SystemComponents/Widgets/Widget";
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

/* eslint-disable eqeqeq */
const StyledIconButtonComponent=(props)=> {
 
  /**
   * Write in the PV the oppisite value of the actual one.
   */
  const handleButtonClick=()=> {
    let value = props.value == 0 ? 1 : 0;
    //console.log(props.value,value)
    props.handleImmediateChange(value);
  }

 
    return (
      <FormControlLabel
        key={props.pvName}
        className={props.classes.FormControl}
        disabled={props.disabled}
        label={props.formControlLabel}
        labelPlacement={props.labelPlacement}
        control={
          <IconButton
            size="small"
            color={
              props.value == 1 ? props.onColor : props.offColor
            }
            onClick={handleButtonClick}
          >
            {props.children === undefined ? <Lens /> : props.children}
          </IconButton>
        }
      />
    )
  
}

/* eslint-enable eqeqeq */
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
      <Widget {...props} component={StyledIconButtonComponent} usePvMinMax={false} usePvPrecision={false} min={undefined} max={undefined} prec={undefined}/>
      
    )
  }

StyledIconButton.propTypes = {
  /** Name of the process variable,  eg. '$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros: PropTypes.object,
 
  /** local variable initialization value*/
  initialLocalVariableValue: PropTypes.string,
   /** If defined, then the DataConnection debugging information will be displayed*/
   debug: PropTypes.bool,
    /** label placement*/
  labelPlacement:PropTypes.oneOf(['start', 'top','bottom','end']),
  /** Custom label to be used, if  `usePvLabel` is not defined. */
  label: PropTypes.string,
      /**
     * Custom on color to be used, must be derived from Material UI theme color.
     */
    onColor: PropTypes.string,
    /**
     * Custom off color to be used, must be derived from Material UI theme color.
     */
    offColor: PropTypes.string,
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

};
StyledIconButton.defaultProps = {
  onColor:'primary',
  offColor:'default',
  debug: false,
  showTooltip:false

}
export default  withStyles(styles, { withTheme: true })(StyledIconButton);

