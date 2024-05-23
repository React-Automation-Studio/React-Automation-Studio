import React from "react";
import { FormControlLabel, SvgIcon, useTheme } from "@mui/material";
import Lens from "@mui/icons-material/Lens";
import Widget from "../SystemComponents/Widgets/Widget";

function StyledIconIndicatorComponent(props) {
  const theme = useTheme();
  let onColor = theme.palette.primary.main;
  let offColor = theme.palette.grey[300];
  if (typeof props.onColor !== "undefined") {
    if (props.onColor === "primary") {
      onColor = theme.palette.primary.main;
    } else if (props.onColor === "secondary") {
      onColor = theme.palette.secondary.main;
    } else if (props.onColor === "default") {
      onColor = theme.palette.grey[300];
    } else {
      onColor = props.onColor;
    }
  }

  if (typeof props.offColor !== "undefined") {
    if (props.offColor === "primary") {
      offColor = theme.palette.primary.main;
    } else if (props.offColor === "secondary") {
      offColor = theme.palette.secondary.main;
    } else if (props.offColor === "default") {
      offColor = theme.palette.grey[300];
    } else {
      offColor = props.offColor;
    }
  }
  let iconStyle = {};
  if (typeof props.labelPlacement !== "undefined") {
    if (props.labelPlacement === "top") {
      iconStyle["marginTop"] = theme.spacing(1);
    } else if (props.labelPlacement === "end") {
      iconStyle["marginRight"] = theme.spacing(1);
    } else if (props.labelPlacement === "start") {
      iconStyle["marginLeft"] = theme.spacing(1);
    } else if (props.labelPlacement === "bottom") {
      iconStyle["marginBottom"] = theme.spacing(1);
    }
  }

  /* eslint-disable eqeqeq */
  let color = !props.initialized
    ? theme.palette.action.disabled
    : props.value != 0
      ? onColor
      : offColor;

  iconStyle["color"] = color;
  /* eslint-enable eqeqeq */
  return (
    <FormControlLabel
      key={props.pvName}
      sx={{
        width: "100%",
        height: "100%",
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: "auto",
        marginRight: "auto",
      }}
      disabled={props.disabled}
      label={props.formControlLabel}
      labelPlacement={props.labelPlacement}
      control={
        <SvgIcon size="small" style={iconStyle}>
          {props.children === undefined ? <Lens /> : props.children}
        </SvgIcon>
      }
    />
  );
}

/**
 * The StyledIconIndicator Component is a wrapper on the Material-UI contained SvgIcon component.
 * The SvgIcon component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI SvgIcon Demos:
 * https://mui.com/style/icons/<br/><br/>
 * Material-UI SvgIcon API:
 * https://mui.com/api/svg-icon/<br/><br/>
 * A custom Icon can used by importing it in the parent and assigning it as a child <br/><br/>
 */
const StyledIconIndicator = ({
  onColor = "primary",
  offColor = "default",
  debug = false,
  showTooltip = false,
  ...others
}: StyledIconIndicatorProps) => {
  return (
    <Widget
      {...others}
      component={StyledIconIndicatorComponent}
      onColor={onColor}
      offColor={offColor}
      debug={debug}
      showTooltip={showTooltip}
    />
  );
};

interface StyledIconIndicatorProps {
  /** Name of the process variable,  eg. '$(device):test$(id)'*/
  pv: string;
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros?: object;

  /** local variable initialization value*/
  initialLocalVariableValue?: string;
  /** If defined, then the DataConnection debugging information will be displayed*/
  debug?: boolean;
  /** label placement*/
  labelPlacement?: "start" | "top" | "bottom" | "end";
  /** Custom label to be used, if  `usePvLabel` is not defined. */
  label?: string;
  /**
   * Custom on color to be used, must be derived from Material UI theme color's or can be a standard color.
   */
  onColor?: string;
  /**
   * Custom off color to be used, must be derived from Material UI theme color's or can be a standard color.
   */
  offColor?: string;
  /**
   * Directive to fill the component's label with
   * the value contained in the  pv metadata's DESC field or the labelPv value.
   * If not defined it uses the custom label as defined by the label prop.
   */
  usePvLabel?: boolean;
  /**
   * Custom PV to define the units to be used, usePvLabel must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  labelPv?: string;
  /**
   * Tooltip Text
   */
  tooltip?: string;
  /**
   * Directive to show the tooltip
   */
  showTooltip?: boolean;
  /**
   *  Any of the MUI Tooltip props can applied by defining them as an object
   */
  tooltipProps?: object;
}

export default StyledIconIndicator;
