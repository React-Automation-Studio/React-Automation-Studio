import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Checkbox as MuiCheckBox, FormControlLabel } from "@material-ui/core";
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
 * The CheckBox component is a wrapper on a Material-UI CheckBox component.
 https://material-ui.com/api/checkbox/
 */
class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonChange = this.handleButtonChange.bind(this);
  }

  /**
   * Send checkbox value to the PV.
   * @param {Event} event
   */
  handleButtonChange(event) {
    let value = event.target.checked ? 1 : 0;
    this.props.onUpdateWidgetState({
      value: value,
      outputValue: value,
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
          <MuiCheckBox
            onChange={this.handleButtonChange}
            checked={this.props.value === 1}
            color={this.props.onColor}
          />
        }
      />
    );
  }
}

export default withWidget(withStyles(styles, { withTheme: true })(CheckBox));
