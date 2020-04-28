import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { FormControlLabel, SvgIcon } from "@material-ui/core";
import { Lens } from "@material-ui/icons";
import Widget from "./Widget";
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
 * The StyledIconIndicator Component is a wrapper on the Material-UI contained SvgIcon component.
 * The SvgIcon component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI SvgIcon Demos:
 * https://material-ui.com/style/icons/<br/><br/>
 * Material-UI SvgIcon API:
 * https://material-ui.com/api/svg-icon/<br/><br/>
 * A custom Icon can used by importing it in the parent and assigning it as a child <br/><br/>
 */
function StyledIconIndicator(props) {
  const place =
    props.labelPosition.charAt(0).toUpperCase() + props.labelPosition.slice(1);
  let iconStyle = { ["margin" + place]: props.theme.spacing(1) };
  let color = props.disabled
    ? "disabled"
    : props.value === 1
    ? props.onColor
    : props.offColor;
  return (
    <FormControlLabel
      key={props.pvName}
      className={props.classes.FormControl}
      disabled={props.disabled}
      label={props.label}
      labelPlacement={props.labelPosition}
      control={
        <SvgIcon size="small" style={iconStyle} color={color}>
          {props.children === undefined ? <Lens /> : props.children}
        </SvgIcon>
      }
    />
  );
}

export default withWidget(
  withStyles(styles, { withTheme: true })(StyledIconIndicator),
  { readOnly: true }
);
