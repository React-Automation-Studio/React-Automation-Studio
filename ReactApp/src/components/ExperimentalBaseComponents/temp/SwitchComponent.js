import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { FormControlLabel, Switch } from "@material-ui/core";
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
});

/**
 * The SwitchComponent component is a wrapper on a Material-UI Selection Control component.
 * The Selection Control component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI Selection Control Demos:
 * https://material-ui.com/demos/selection-controls/<br/><br/>
 * Material-UI Switch API:
 * https://material-ui.com/api/switch/
 */
class SwitchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonChange = this.handleButtonChange.bind(this);
  }

  /**
   * Save switch state.
   * @param {Event} event
   */
  handleButtonChange(event) {
    let value = event.target.checked ? 1 : 0;
    this.props.onUpdateWidgetState({
      value: value,
      outputValue: value,
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
          <Switch
            onChange={this.handleButtonChange}
            checked={this.props.value === 1}
            color={this.props.onColor}
          />
        }
      />
    );
  }
}

export default withWidget(
  withStyles(styles, { withTheme: true })(SwitchComponent)
);
