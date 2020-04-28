import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Radio, FormControlLabel } from "@material-ui/core";
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
 * The RadioButton component is a wrapper on a Material-UI RadioButton component. <br/><br/>
 * https://material-ui.com/api/radio/
 */
class RadioButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  /**
   * Send to PV the opposite value
   */
  handleOnClick() {
    let value = this.props.value === 0 ? 1 : 0;
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
        labelPlacement={this.props.labelPos}
        control={
          <Radio
            onClick={this.handleOnClick}
            checked={this.props.value === 1}
            color={this.props.onColor}
          />
        }
      />
    );
  }
}

export default withWidget(withStyles(styles, { withTheme: true })(RadioButton));
