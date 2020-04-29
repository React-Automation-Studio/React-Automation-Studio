import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { InputAdornment, TextField } from "@material-ui/core";
import PropTypes from 'prop-types';
import GenericWidget from "../SystemComponents/Widgets/GenericWidget";
const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    width: "100%",
    borderRadius: 4,
  },
});

/**
 * The TextInput Component is a wrapper on the Material-UI contained TextField component.
 * The TextField component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI TextField Demos:
 * https://material-ui.com/demos/text-fields<br/><br/>
 * Material-UI TextField API:
 * https://material-ui.com/api/text-field
 */
class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.catchReturn = this.catchReturn.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Temporary store the new value
   * @param {Event} event
   */
  handleChange=(widgetProps)=>(event)=> {
    widgetProps.onUpdateWidgetState({ value: event.target.value });
  }

  /**
   * Save value on output value only when 'Enter' key is pressed.
   * @param {Event} event
   */
  catchReturn=(widgetProps)=>(event)=> {
    if (event.key === "Enter" && widgetProps.connection) {
      widgetProps.onUpdateWidgetState({
        checkValue: true,
        value:widgetProps.value,
        outputValue: widgetProps.value,
      });
    }
  }

  render() {
    const { classes } = this.props;
    let inputProps;
    let style;

    return (
      <GenericWidget {...this.props}>
        {(widgetProps) => {
          if (widgetProps.alarmColor !== "") {
            style = {
              background:
                "linear-gradient(45deg, " +
                this.props.theme.palette.background.default +
                " 1%, " +
                widgetProps.alarmColor +
                " 99%)",
            };
          }
          if (widgetProps.connection) {
            inputProps = {
              endAdornment: (
                <InputAdornment position="end">
                  {this.props.units} {this.props.children}
                </InputAdornment>
              ),
            };
          } else {
            inputProps = { readOnly: true };
          }
          return (
            <TextField
              className={classes.textField}
              style={style}
              key={widgetProps.pvName}
              //aria-owns={this.state.openContextMenu ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              value={widgetProps.value}
              onKeyPress={this.catchReturn(widgetProps)}
              onFocus={widgetProps.onUpdateWidgetFocus}
              onBlur={widgetProps.onUpdateWidgetBlur}
              onChange={this.handleChange(widgetProps)}
              label={widgetProps.label}
              fullWidth={true}
              margin="none"
              variant="outlined"
              disabled={widgetProps.disabled}
              InputProps={inputProps}
            />
          );
        }
        }
      </GenericWidget>
    )
  }
}

TextInput.propTypes = {
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros:PropTypes.object,
  /** Directive to fill the label with the value contained in the  EPICS pv's DESC field. */
  usePvLabel:PropTypes.bool,
  /** Directive to use the units contained in the  EPICS pv's EGU field. */
  usePvUnits: PropTypes.bool,
  /** Directive to round the value. */
  usePrecision:PropTypes.bool,
  /** Custom precision to round the value too, if not defined then the EPICS PREC field will be used, if `usePrecision` is defined. */
  prec:PropTypes.number,
  /** Custom units to be used, if `usePvUnits` is not defined. */
  units:PropTypes.string,
  /** Directive to use the HOPR and LOPR EPICS fields to limit the maximum and minimum values that can be contained in the value. */
  usePvMinMax:PropTypes.bool,
  /** Directive to use the EPICS alarm severity status to alter the fields backgorund color  */
  alarmSensitive:PropTypes.bool,
  /** Custom label to be used, if  `usePvLabel` is not defined. */
  label: PropTypes.string,
  /** Custom minimum to be used, if `usePvMinMax` is not defined. */
  min:PropTypes.number,
  /** Custom maximum to be used, if `usePvMinMax` is not defined. */
  max:PropTypes.number,
  /** If defined, then the string value of the EPICS enumerator type will be forced to be used, if not defined the the enumerator index is used */
  useStringValue:PropTypes.bool,
  /** If defined, then the DataConnection debugging information will be displayed*/
  debug:PropTypes.bool,
  /** local variable intialization value*/
  intialLocalVariableValue:PropTypes.string

};
TextInput.defaultProps={
  debug:false
};

export default withStyles(styles, { withTheme: true })(TextInput);
