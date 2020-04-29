import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { InputAdornment, MenuItem, TextField } from "@material-ui/core";
import PropTypes from 'prop-types';

import withWidget from "../SystemComponents/Widgets/withWidget";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  TextField: {
    width: "100%",
    fontWeight: 500,
    borderRadius: 4,
  },
});

/**
 * The SelectionInput Component is a wrapper on the Material-UI TextField component. 
 * The TextField component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI TextField Demos:
 * https://material-ui.com/demos/text-fields<br/><br/>
 * Material-UI TextField API:
 * https://material-ui.com/api/text-field

 */
class SelectionInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let value = event.target.value;
    this.props.onUpdateWidgetState({
      value: value,
      outputValue: value,
      newValueTrigger: 1,
    });
  }

  render() {
    console.log("this.props.useStringValue",this.props.useStringValue)
    console.log("this.props.enumStrs",this.props.enumStrs)
    console.log("this.props.value",this.props.value)
    let inputProps;
    let stringValues = this.props.enumStrs.map((item, idx) => (
      <MenuItem
        key={item.toString()}
        value={this.props.useStringValue ? item : idx}
      >
        {item}
      </MenuItem>
    ));
    if (this.props.connection) {
      inputProps = {
        endAdornment: (
          <InputAdornment
            style={{ marginRight: this.props.theme.spacing(1) }}
            position="end"
          >
            {this.props.units} {this.props.children}
          </InputAdornment>
        ),
      };
    }
    return (
      <TextField
        key={this.props.pvName}
        className={this.props.classes.TextField}
        select
        disabled={this.props.disabled}
        key={this.props.pvName}
        value={this.props.value}
        onFocus={this.props.onUpdateWidgetFocus}
        onBlur={this.props.onUpdateWidgetBlur}
        onChange={this.handleChange}
        label={this.props.label}
        margin="dense"
        variant="outlined"
        InputProps={inputProps}
      >
        {stringValues}
      </TextField>
    );
  }

  /**
   * Specific props type and default values for this widgets.
   * They extends the ones provided for a generic widget.
   */
  
  
 
  static defaultProps = {
    useStringValue:true,
  };

}

SelectionInput.propTypes = {
  //If defined, this array of strings overides the default EPICS MBBI/O
  //pv strings and are displayed as the choices in the RadioButtonGroup component
  custom_selection_strings: PropTypes.array,
  /**
     * Directive to use PV's string values.
     */
    useStringValue: PropTypes.bool,
  
};

export default withWidget(withStyles(styles, { withTheme: true })(SelectionInput));
