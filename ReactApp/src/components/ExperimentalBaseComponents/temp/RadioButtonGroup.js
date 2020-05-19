import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import PropTypes from "prop-types";
import withWidget from "../../SystemComponents/Widgets/withWidget";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    border: 1,
  },
  FormControl: {
    width: "100%",
    height: "100%",
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    textAlign: "center",
    border: 1,
    borderColor: theme.palette.grey[700],
    borderStyle: "solid",
    marginTop: -1,
  },
  buttonLastHorizontal: {
    borderStyle: "solid",
    borderColor: theme.palette.grey[700],
    border: 1,
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    textAlign: "center",
    marginLeft: -1,
  },
  buttonFirstHorizontal: {
    borderStyle: "solid",
    borderColor: theme.palette.grey[700],
    border: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    textAlign: "center",
  },
  buttonMiddleHorizontal: {
    borderStyle: "solid",
    borderColor: theme.palette.grey[700],
    border: 1,
    marginLeft: -1,
    textAlign: "center",
  },
  buttonLastVertical: {
    borderStyle: "solid",
    borderColor: theme.palette.grey[700],
    border: 1,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    textAlign: "center",
    marginTop: -1,
  },
  buttonFirstVertical: {
    borderStyle: "solid",
    borderColor: theme.palette.grey[700],
    border: 1,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    textAlign: "center",
  },
  buttonMiddleVertical: {
    borderStyle: "solid",
    borderColor: theme.palette.grey[700],
    border: 1,
    marginTop: -1,
    textAlign: "center",
  },
  listVertical: {
    width: "100%",
    height: "100%",
  },
  listHorizontal: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
});

/**
 * The RadioButtonGroup Component is a wrapper on the Material-UI List component.
 * The List component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI List Demos:
 * https://material-ui.com/demos/lists<br/><br/>
 * Material-UI List API:
 * https://material-ui.com/api/list
 */
class RadioButtonGroup extends React.Component {
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
    let radioButtons = this.props.enumStrs.map((item, index) => (
      <FormControlLabel
        key={item}
        value={index}
        control={<Radio color={this.props.onColor} />}
        label={item}
        labelPlacement="start"
      />
    ));
    return (
      <FormControlLabel
        key={this.props.pvName}
        className={this.props.classes.formControl}
        component="fieldset"
        disabled={this.props.disabled}
        label={this.props.label}
        labelPlacement={this.props.labelPosition}
        control={
          <RadioGroup value={this.props.value} onChange={this.handleChange}>
            {radioButtons}
          </RadioGroup>
        }
      />
    );
  }

  /**
   * Specific props type and default values for this widgets.
   * They extends the ones provided for a generic widget.
   */
  static propTypes = {
    //If defined, this array of strings overides the default EPICS MBBI/O
    //pv strings and are displayed as the choices in the RadioButtonGroup component
    custom_selection_strings: PropTypes.array,
  };
}

export default withWidget(
  withStyles(styles, { withTheme: true })(RadioButtonGroup)
);
