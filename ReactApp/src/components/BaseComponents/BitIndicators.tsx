import React from "react";
import { Grid, FormControlLabel, SvgIcon, useTheme } from "@mui/material";
import { Lens } from "@mui/icons-material";
import Widget from "../SystemComponents/Widgets/Widget";

const BitIndicatorsComponent = (props) => {
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

  let bitArray = [];
  let bitLabels = [];
  let bitStyles = [];

  let bitLabelPos =
    props.bitLabelPlacement !== undefined
      ? props.bitLabelPlacement
      : props.horizontal
        ? "top"
        : "end";
  const place = bitLabelPos.charAt(0).toUpperCase() + bitLabelPos.slice(1);

  for (let n = 0; n < props.numberOfBits; n++) {
    bitArray.push(props.initialized ? props.value & Math.pow(2, n) : 0);
    if (props.usePvBitLabels === false) {
      bitLabels.push(
        props.bitLabels === undefined ? "Bit " + n : props.bitLabels[n]
      );
    } else {
      if (props.enumStrs !== null) {
        if (n < props.enumStrs.length) {
          bitLabels[n] = props.enumStrs[n];
        }
      }
    }
    bitStyles.push({ ["margin" + place]: theme.spacing(1) });
  }
  if (props.reverseBits) {
    bitLabels = bitLabels.reverse();
    bitArray = bitArray.reverse();
    bitStyles = bitStyles.reverse();
  }

  let bits = bitArray.map((value, index) => {
    // eslint-disable-next-line eqeqeq
    let color = !props.initialized
      ? theme.palette.grey[300]
      : value != 0
        ? onColor
        : offColor;
    return (
      <Grid item key={index.toString()} xs={!props.horizontal ? 12 : undefined}>
        <FormControlLabel
          sx={{
            marginTop: "auto",
            marginBottom: "auto",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          disabled={props.disabled}
          label={bitLabels[index]}
          labelPlacement={bitLabelPos}
          control={
            <SvgIcon
              size="small"
              style={{ ...bitStyles[index], color: color }}
              {...props.muiSvgIconProps}
            >
              {props.children === undefined ? <Lens /> : props.children}
            </SvgIcon>
          }
        />
      </Grid>
    );
  });

  return (
    <Grid
      key={props.pvName}
      container
      spacing={props.horizontal ? 2 : 0}
      alignItems="flex-start"
      direction={props.horizontal ? "row" : "column"}
    >
      <Grid key={props.label} item xs={12}>
        {props.initialized ? (
          props.label
        ) : (
          <span>
            {props.disconnectedIcon}
            {" " + props.pvName}
          </span>
        )}
      </Grid>
      {bits}
    </Grid>
  );
};

/**
 * Props for the BitIndicators component.
 */
interface BitIndicatorsProps {
  /** Name of the process variable, e.g. '$(device):test$(id)' */
  pv: string;
  /** Values of macros that will be substituted in the pv name, e.g. {{'$(device)':'testIOC','$(id)':'2'}} */
  macros?: object;
  /** Local variable initialization value */
  initialLocalVariableValue?: string;
  /** If defined, then the Data initialized debugging information will be displayed */
  debug?: boolean;
  /** Label placement */
  labelPlacement?: "start" | "top" | "bottom" | "end";
  /** Custom label to be used, if `usePvLabel` is not defined. */
  label?: string;
  /** Array of custom bit labels. */
  bitLabels?: string[];
  /** If defined, the position of the bit labels relative to the widget. */
  bitLabelPlacement?: "start" | "end" | "top" | "bottom";
  /** Number of bits to indicate. */
  numberOfBits?: number;
  /** Display bits horizontally. */
  horizontal?: boolean;
  /** Reverse bits order. */
  reverseBits?: boolean;
  /** Any of the MUI Svg Icon can be applied by defining them as an object. */
  muiSvgIconProps?: object;
  /** Directive to use the PV Bit Labels. */
  usePvBitLabels?: boolean;
  /** Tooltip Text */
  tooltip?: string;
  /** Directive to show the tooltip. */
  showTooltip?: boolean;
  /** Any of the MUI Tooltip props can be applied by defining them as an object. */
  tooltipProps?: object;
  /** Custom color to be used, must be derived from Material UI theme colors. */
  onColor?: string;
  /** Custom color to be used, must be derived from Material UI theme colors. */
  offColor?: string;
  

}

/**
 * The BitIndicators Component is a wrapper on multiple SvgIcon components.
 * Each SvgIcon component indicates the value of each of the bits of the PV Value.
 * <br/><br/>
 * Material-UI SvgIcon Demos:
 * https://mui.com/style/icons/<br/><br/>
 * Material-UI SvgIcon API:
 * https://mui.com/api/svg-icon/<br/><br/>
 * A custom Icon can used by importing it in the parent and assigning it as a child <br/><br/>
 */
const BitIndicators = ({
  numberOfBits = 8,
  horizontal = false,
  reverseBits = false,
  onColor = "primary",
  offColor = "default",
  usePvBitLabels = false,
  ...props
}: BitIndicatorsProps) => {
  return <Widget {...props} component={BitIndicatorsComponent} />;
};



export default BitIndicators;
