import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, FormControlLabel } from "@material-ui/core";
import PropTypes from "prop-types";
import withWidget from "../SystemComponents/Widgets/withWidget";

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
 * The ToggleButton Component is a wrapper on the Material-UI Button component. The ToggleButton will ouput a value of
 *'1' or '0' to the process variable when pressed. A '1' by default represents an 'ON' or 'true' state and a '0' an 'Off' or 'false' state.
 * If the `momentary` property is define then a '1' will be output for 100 ms before returning to '0'. <br/><br/>
 * The ToggleButton component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI Button Demos:
 * https://material-ui.com/demos/buttons/<br/><br/>
 * Material-UI Button API:
 * https://material-ui.com/api/button/
 */
class ToggleButton extends React.Component {
  constructor(props) {
    super(props);
    this.turnOff = this.turnOff.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handlePointerLeave = this.handlePointerLeave.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.clicked = false;
  }

  /**
   * When clicking the button, not in momentary mode,
   * set the PV to the oppisite of the actual value.
   */
  handleButtonClick() {
    let value = this.props.value === 0 ? 1 : 0;
    this.props.onUpdateWidgetState({
      value: value,
      outputValue: value,
      newValueTrigger: 1,
    });
    window.navigator.vibrate(1);
  }

  /**
   * When in momentary mode, detect down action on mouse click.
   * When in this this state write 1 to the corresponding PV.
   */
  handleMouseDown() {
    if (this.props.debug) {
      console.log("mouseDown");
    }
    this.clicked = true;
    this.props.onUpdateWidgetState({
      value: 1,
      outputValue: 1,
      newValueTrigger: 1,
    });
  }

  /**
   * When in momentary mode, detect up action on mouse click.
   * When in this this state write 0 to the corresponding PV  after 100ms.
   */
  handleMouseUp() {
    if (this.props.debug) {
      console.log("mouseUp");
    }
    setTimeout(this.turnOff, 100);
  }

  /**
   * When the pointer leave the widget, also if the down action persists,
   * write 0 to the corresponding PV after 100ms.
   */
  handlePointerLeave() {
    if (this.props.debug) {
      console.log("mouseLeave");
    }
    if (this.clicked) {
      setTimeout(this.turnOff, 100);
    }
  }

  /**
   * Function to set to zero the value and to false the click state.
   */
  turnOff() {
    if (this.props.debug) {
      console.log("turnoff");
    }
    this.clicked = false;
    this.props.onUpdateWidgetState({
      value: 0,
      outputValue: 0,
      newValueTrigger: 1,
    });
  }

  render() {
    let momentary =
      this.props.momentary !== undefined ? this.props.momentary : false;
    let value = this.props.value;
    const {classes}=this.props;
    return (
      <FormControlLabel
        key={this.props.pvName}
        className={classes.FormControl}
        disabled={this.props.disabled}
        label={this.props.label}
        labelPlacement={this.props.labelPos}
        control={
          <Button
            className={classes.Button}
            fullWidth={true}
            variant="contained"
            color={value === 1 ? this.props.onColor : this.props.offColor}
            onClick={momentary ? undefined : this.handleButtonClick}
            onPointerUp={momentary ? this.handleMouseUp : undefined}
            onPointerDown={momentary ? this.handleMouseDown : undefined}
            onPointerLeave={momentary ? this.handlePointerLeave : undefined}
          >
            {this.props.enumStrs[value === 1 ? value : 0]}
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
    // An array of custom strings to be displayed on the button for a value of 0 or 1
    // i.e. ['Off','On']. If not defined then EPICS enumStrs will be used.
    custom_selection_strings: PropTypes.array,
    // Directive to enable momentary behaviour.
    momentary: PropTypes.bool,
  };
}

export default withWidget(withStyles(styles, { withTheme: true })(ToggleButton));
