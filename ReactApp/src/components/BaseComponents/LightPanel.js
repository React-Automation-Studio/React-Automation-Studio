import React from "react";
import {
  Typography,
  Paper,
  makeStyles,
  FormControlLabel,
} from "@material-ui/core";
import PropTypes from "prop-types";
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

const useStyles = makeStyles((theme) => ({
  FormControlLabel: {
    cursor: "default",
    width: "100%",
    height: "100%",
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
  },
  Paper: {
    width: "100%",
    height: "100%",
    padding: "0.5em 1em",
    margin: "0em 0.5em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: "10em",
    background: (props) => {
      if (theme === undefined) return "";
      if (!props.initialized) return theme.palette.grey[500];
      if (props.value === undefined) return "";
      if (props.colors === undefined) return "";
      let value = props.value;
      if (
        props.useStringValue &&
        props.enumStrs !== undefined &&
        props.enumStrs !== null
      ) {
        value = props.enumStrs.indexOf(props.value);
      }
      if (props.colors[value] !== undefined) {
        return normalizeColors(theme, props.colors[value]);
      }
      return normalizeColors(theme, "default");
    },
  },
  Typography: {
    color: "rgba(0, 0, 0, 0.87)",
    fontWeight: "500",
  },
}));

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

  const classes = useStyles({
    value,
    enumStrs,
    colors,
    useStringValue,
    initialized,
  });

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
      className={classes.FormControlLabel}
      disabled={!initialized}
      control={
        <Paper className={classes.Paper} variant="outlined">
          <Typography
            className={classes.Typography}
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
const LightPanel = (props) => {
  return <Widget {...props} component={LightPanelComponent} readOnly />;
};

LightPanel.propTypes = {
  /** Name of the process variable,  eg. '$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,

  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros: PropTypes.object,

  /** local variable initialization value*/
  initialLocalVariableValue: PropTypes.string,

  /** If defined, then the DataConnection debugging information will be displayed*/
  debug: PropTypes.bool,

  /** label placement*/
  labelPlacement: PropTypes.oneOf(["start", "top", "bottom", "end"]),

  /** Custom label to be used, if  `usePvLabel` is not defined. */
  label: PropTypes.string,

  /**
   * Custom colors to be used for each state. The colors must be derived from Material UI theme color's or can be a standard color.
   * This prop must be an object where the PV value corresponds to the key in the object,
   * and the value is the desired color. Eg: ``{0: "red", 1: "lime"}``.
   */
  colors: PropTypes.object,

  /**
   * Color corresponding to PV value == ``1``. When the colors prop is defined, this will be ignored.
   */
  onColor: PropTypes.string,

  /**
   * Color corresponding to PV value == ``0``. When the colors prop is defined, this will be ignored.
   */
  offColor: PropTypes.string,

  /** Show the PV string value instead of the numeric one.*/
  useStringValue: PropTypes.bool,

  /** Custom strings to display as values. The integer value of the PV is the index of the array to display.
   * `useStringValue` must be `false`.
   */
  customValueStrings: PropTypes.arrayOf(PropTypes.string),

  /**
   * Directive to fill the component's label with
   * the value contained in the  pv metadata's DESC field or the labelPv value.
   * If not defined it uses the custom label as defined by the label prop.
   */
  usePvLabel: PropTypes.bool,

  /**
   * Custom PV to define the units to be used, usePvLabel must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  labelPv: PropTypes.string,

  /**
   * Tooltip Text
   */
  tooltip: PropTypes.string,

  /**
   * Directive to show the tooltip
   */
  showTooltip: PropTypes.bool,

  /**
   *  Any of the MUI Tooltip props can applied by defining them as an object
   */
  tooltipProps: PropTypes.object,

  /**
   * Any of the MUI TextField Props can applied by defining them as an object.
   */
  muiTypographyProps: PropTypes.object,

  /**
   * Material UI Typography align. Used to align the value string inside the LightPanel.
   */
  align: PropTypes.string,

  /**
   * Material UI Typography variant. Used to change the style of the value string inside the LightPanel.
   */
  variant: PropTypes.string,
};

LightPanel.defaultProps = {
  debug: false,
  showTooltip: false,
  useStringValue: true,
  align: "center",
};

export default LightPanel;
