import React from "react";
import { Typography, Paper, FormControlLabel } from "@mui/material";
import Widget from "../SystemComponents/Widgets/Widget";
const normalizeColors = (theme, color) => {
  if (color === "primary") {
    return theme.palette.primary.main;
  } else if (color === "secondary") {
    return theme.palette.secondary.main;
  } else if (color === "default") {
    return theme.palette.grey[300];
  }
  return color;
};

function LightPanelComponent(props) {
  const {
    value,
    enumStrs,
    onColor,
    offColor,
    formControlLabel,
    labelPlacement,
    customValueStrings,
    useStringValue,
    initialized,
    align,
    variant,
  } = props;

  /* Support offColor and onColor when colors is not used */
  let colors = props.colors;
  if (colors === undefined) {
    colors = {
      0: offColor,
      1: onColor,
    };
  }

  /* Try to use customValueStrings if defined */
  let val = value;
  if (initialized && customValueStrings !== undefined) {
    const parsed = parseInt(value);
    if (!isNaN(parsed)) {
      const customValueString = customValueStrings[parseInt(value)];
      if (customValueString !== undefined) {
        val = customValueString;
      }
    }
  }
  /* Print disconnected if PV not initialized */
  if (!initialized) {
    val = "DISCONNECTED";
  }
  return (
    <FormControlLabel
      key={props.pvName}
      label={formControlLabel}
      labelPlacement={labelPlacement}
      sx={{
        cursor: "default",
        width: "100%",
        height: "100%",
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: "auto",
        marginRight: "auto",
      }}
      disabled={!initialized}
      control={
        <Paper
          variant="outlined"
          sx={{
            width: "100%",
            height: "100%",
            padding: "0.5em 1em",
            margin: "0em 0.5em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRadius: "10em",
            background: (theme) => {
              if (theme === undefined) return "";
              if (!props.initialized) return theme.palette.grey[500];
              if (props.value === undefined) return "";
              if (props.colors === undefined) return "";
              let value = props.value;
              if (
                useStringValue &&
                enumStrs !== undefined &&
                enumStrs !== null
              ) {
                value = enumStrs.indexOf(props.value);
              }
              if (props.colors[value] !== undefined) {
                return normalizeColors(theme, props.colors[value]);
              }
              return normalizeColors(theme, "default");
            },
          }}
        >
          <Typography
            sx={{
              color: "rgba(0, 0, 0, 0.87)",
              fontWeight: "500",
            }}
            align={align}
            variant={variant}
            {...props.muiTypographyProps}
          >
            {val}
          </Typography>
        </Paper>
      }
    />
  );
}

/**
 * The LightPanel Component shows the label associated with the PV value and changes the background color accordingly.<br/><br/>
 * The component is implemented with zero margins and enabled to grow to the width of its parent container.
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 */
const LightPanel = ({
  debug = false,
  showTooltip = false,
  useStringValue = true,
  align = "center",
  ...props
}: LightPanelProps) => {
  return (
    <Widget
      {...props}
      component={LightPanelComponent}
      readOnly
      debug={debug}
      showTooltip={showTooltip}
      useStringValue={useStringValue}
      componentProps={{ align: align }}
    />
  );
};

interface LightPanelProps {
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
   * Custom colors to be used for each state. The colors must be derived from Material UI theme color's or can be a standard color.
   * This prop must be an object where the PV value corresponds to the key in the object,
   * and the value is the desired color. Eg: ``{0: "red", 1: "lime"}``.
   */
  colors?: object;

  /**
   * Color corresponding to PV value == ``1``. When the colors prop is defined, this will be ignored.
   */
  onColor?: string;

  /**
   * Color corresponding to PV value == ``0``. When the colors prop is defined, this will be ignored.
   */
  offColor?: string;

  /** Show the PV string value instead of the numeric one.*/
  useStringValue?: boolean;

  /** Custom strings to display as values. The integer value of the PV is the index of the array to display.
   * `useStringValue` must be `false`.
   */
  customValueStrings?: string[];

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

  /**
   * Any of the MUI TextField Props can applied by defining them as an object.
   */
  muiTypographyProps?: object;

  /**
   * Material UI Typography align. Used to align the value string inside the LightPanel.
   */
  align?: string;

  /**
   * Material UI Typography variant. Used to change the style of the value string inside the LightPanel.
   */
  variant?: string;
}

export default LightPanel;
