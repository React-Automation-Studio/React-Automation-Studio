import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { InputAdornment, TextField } from "@material-ui/core";
import withWidget from "../SystemComponents/Widgets/withWidget";

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
  handleChange(event) {
    this.props.onUpdateWidgetState({ value: event.target.value });
  }

  /**
   * Save value on output value only when 'Enter' key is pressed.
   * @param {Event} event
   */
  catchReturn(event) {
    if (event.key === "Enter" && this.props.connection) {
      this.props.onUpdateWidgetState({
        checkValue: true,
        value: this.props.value,
        outputValue: this.props.value,
      });
    }
  }

  render() {
    const { classes } = this.props;
    let inputProps;
    let style;
    if (this.props.alarmColor !== "") {
      style = {
        background:
          "linear-gradient(45deg, " +
          this.props.theme.palette.background.default +
          " 1%, " +
          this.props.alarmColor +
          " 99%)",
      };
    }
    if (this.props.connection) {
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
        key={this.props.pvName}
        //aria-owns={this.state.openContextMenu ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        value={this.props.value}
        onKeyPress={this.catchReturn}
        onFocus={this.props.onUpdateWidgetFocus}
        onBlur={this.props.onUpdateWidgetBlur}
        onChange={this.handleChange}
        label={this.props.label}
        fullWidth={true}
        //margin="dense"
        variant="outlined"
        disabled={this.props.disabled}
        InputProps={inputProps}
      />
    );
  }
}


export default withWidget(withStyles(styles, { withTheme: true })(TextInput));
