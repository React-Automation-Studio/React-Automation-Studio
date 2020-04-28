import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { IconButton, FormControlLabel } from "@material-ui/core";
import { Lens } from "@material-ui/icons";
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
 * The StyledIconButton Component is a wrapper on the Material-UI contained SvgIcon component.
 * The SvgIcon component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI SvgIcon Demos:
 * https://material-ui.com/style/icons/<br/><br/>
 * Material-UI SvgIcon API:
 * https://material-ui.com/api/svg-icon/<br/><br/>
 * A custom Icon can used by importing it in the parent and assigning it as a child <br/><br/>
 */
class StyledIconButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  /**
   * Write in the PV the oppisite value of the actual one.
   */
  handleButtonClick() {
    let value = this.props.value === 0 ? 1 : 0;
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
          <IconButton
            size="small"
            color={
              this.props.value === 1 ? this.props.onColor : this.props.offColor
            }
            onClick={this.handleButtonClick}
          >
            {this.props.children === undefined ? <Lens /> : this.props.children}
          </IconButton>
        }
      />
    );
  }
}

export default withWidget(
  withStyles(styles, { withTheme: true })(StyledIconButton)
);
