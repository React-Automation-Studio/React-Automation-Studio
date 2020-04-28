import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, FormControlLabel } from "@material-ui/core";
import PropTypes from "prop-types";
import withWidget from "../../SystemComponents/Widgets/withWidget";

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
  Button: {
    width: "100%",
    height: "100%",
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

/**
 * The ActionButton Component is a wrapper on the Material-UI Button component.
 * The ActionButton will ouput the `actionValue` to the process variable when pressed.
 * The ActionButton component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI Button Demos:
 * https://material-ui.com/demos/buttons/<br/><br/>
 * Material-UI Button API:
 * https://material-ui.com/api/button/
 */
class ActionButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  /**
   * Send the predefined value to the PV.
   */
  handleButtonClick() {
    this.props.onUpdateWidgetState({
      checkValue: true,
      value: this.props.actionValue,
      outputValue: this.props.actionValue,
      newValueTrigger: 1,
    });
  }

  render() {
    return (
      <FormControlLabel
        key={this.props.pvName}
        className={this.props.classes.FormControl}
        disabled={this.props.disabled}
        label={this.props.label}
        labelPlacement={this.props.labelPosition}
        control={
          <Button
            className={this.props.classes.Button}
            variant="contained"
            color={this.props.onColor}
            onClick={this.handleButtonClick}
          >
            {this.props.actionString}
          </Button>
        }
      />
    );
  }

  /**
   * Specific props type and default values for this widgets.
   * They extends the ones provided for a generic widget.
   */
  static propTypes = {
    // Define the string on the button.
    actionString: PropTypes.string,
    // Define the value to write into the PV.
    actionValue: PropTypes.any,
  };
}

export default withWidget(
  withStyles(styles, { withTheme: true })(ActionButton)
);
