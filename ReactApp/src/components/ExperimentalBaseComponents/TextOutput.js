import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { InputAdornment, TextField } from "@material-ui/core";
import PropTypes from 'prop-types';
import GenericWidget from "../SystemComponents/Widgets/GenericWidget";
import red from '@material-ui/core/colors/red';
import deepOrange from '@material-ui/core/colors/deepOrange';
const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  input: {
    color: theme.palette.grey[500],
  },
  cssLabel: {
    "&$cssFocused": {
      color: theme.palette.grey[500],
    },
  },
  cssFocused: {},
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: theme.palette.grey[500],
    },
  },
  notchedOutline: {},
  bootstrapRoot: {
    "label + &": {
      marginTop: theme.spacing(1) * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
  TextFieldSeverity0: {
    width: '100%',
    borderRadius: 4,
  },
  TextFieldSeverity1: {
    width: '100%',
    borderRadius: 4,
    background:'linear-gradient(45deg, '+ theme.palette.background.default+ ' 1%, '+deepOrange['400'] +' 99%)'
  },
  TextFieldSeverity2: {
    width: '100%',
    borderRadius: 4,
    background:'linear-gradient(45deg, '+ theme.palette.background.default+ ' 1%, '+red['800'] +' 99%)'
  }
});


function TextOutputComponent(props) {
  const { classes } = props;
  let inputProps = {
    classes: {
      root: classes.cssOutlinedInput,
      focused: classes.cssFocused,
      input: classes.input,
      notchedOutline: classes.notchedOutline,
    },
    readOnly: true,
  };
  let inputLabelProps = {
    classes: {
      root: classes.cssLabel,
      focused: classes.cssFocused,
    },
  };

  let textFieldClassName;
  if (typeof props.alarmSensitive !== 'undefined') {
    if (props.alarmSensitive == true) {
      if (props.alarmSeverity == 1) {
        textFieldClassName = classes.TextFieldSeverity1;

      }
      else if (props.alarmSeverity == 2) {
        textFieldClassName = classes.TextFieldSeverity2;

      }
      else {
        textFieldClassName = classes.TextFieldSeverity0;

      }

    }
  }
  return (
    
          <TextField
            className={classes.textFieldClassName}
           
            key={props.pvName}
            //aria-owns={state.openContextMenu ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            value={props.value}
            fullWidth={true}
            onFocus={props.onUpdateWidgetFocus}
            onBlur={props.onUpdateWidgetBlur}
            label={props.label}
            margin="none"
            variant="outlined"
            disabled={props.disabled}
            InputLabelProps={inputLabelProps}
            InputProps={inputProps}
          />
        )
      

   
  
}


/**
 *  The TextOutput Component is a wrapper on the Material-UI contained TextField component in read-only mode.
 *  The TextField component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 *  The margins and spacing must be controlled from the parent component.<br/><br/>
 *  Material-UI TextField Demos:
 *  https://material-ui.com/demos/text-fields<br/><br/>
 *  Material-UI TextField API:
 *  https://material-ui.com/api/text-field
 */
const TextOutput =(props)=>{
    return (
      <GenericWidget {...props} component={TextOutputComponent}/>
         
      
    )
  }


TextOutput.propTypes = {
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros: PropTypes.object,
  /** Directive to fill the label with the value contained in the  EPICS pv's DESC field. */
  usePvLabel: PropTypes.bool,
  /** Directive to use the units contained in the  EPICS pv's EGU field. */
  usePvUnits: PropTypes.bool,
  /** Directive to round the value. */
  usePrecision: PropTypes.bool,
  /** Custom precision to round the value too, if not defined then the EPICS PREC field will be used, if `usePrecision` is defined. */
  prec: PropTypes.number,
  /** Custom units to be used, if `usePvUnits` is not defined. */
  units: PropTypes.string,
  /** Directive to use the HOPR and LOPR EPICS fields to limit the maximum and minimum values that can be contained in the value. */
  usePvMinMax: PropTypes.bool,
  /** Directive to use the EPICS alarm severity status to alter the fields backgorund color  */
  alarmSensitive: PropTypes.bool,
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
  /** Material-UI TextField variant*/
  variant: PropTypes.string,
  /** Material-UI TextField margin*/
  margin: PropTypes.string,


};
TextOutput.defaultProps = {
  debug: false,
  variant: "outlined",
  margin: "none",
  alarmSensitive: false
};

export default withStyles(styles, { withTheme: true })(TextOutput);
