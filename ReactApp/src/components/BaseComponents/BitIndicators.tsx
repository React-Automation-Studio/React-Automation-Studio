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

  let bitArray: number[] = [];
  let bitLabels: string[] = [];
  let bitStyles: React.CSSProperties[] = [];

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
  return (
    <Widget
      {...props}
      onColor={onColor}
      offColor={offColor}
      component={BitIndicatorsComponent}
      componentProps={{ numberOfBits, horizontal, reverseBits, usePvBitLabels }}
    />
  );
};

interface BitIndicatorsProps {
  /**
   * The PV name for the BitIndicators component.
   */
  pv: string;
  /**
   * Macros object for replacing macros in the PV name.
   */
  macros?: object;
  /**
   * Initial local variable value.
   */
  initialLocalVariableValue?: string;
  /**
   * Enable debug mode.
   */
  debug?: boolean;

  /**
   * The label for the BitIndicators component.
   */
  label?: string;
  /**
   * An array of labels for each bit.
   */
  bitLabels?: Array<string>;
  /**
   * The placement of the labels for each bit.
   */
  bitLabelPlacement?: "start" | "end" | "top" | "bottom";
  /**
   * The number of bits to display.
   */
  numberOfBits?: number;
  /**
   * Display the bits horizontally.
   */
  horizontal?: boolean;
  /**
   * Reverse the order of the bits.
   */
  reverseBits?: boolean;
  /**
   * Additional props for the MUI SvgIcon component.
   */
  muiSvgIconProps?: object;
  /**
   * Use PV bit labels instead of custom labels.
   */
  usePvBitLabels?: boolean;
  /**
   * The tooltip text for the BitIndicators component.
   */
  tooltip?: string;
  /**
   * Show the tooltip.
   */
  showTooltip?: boolean;
  /**
   * Additional props for the tooltip component.
   */
  tooltipProps?: object;
  /**
   * The color of the bits when on.
   */
  onColor?: string;
  /**
   * The color of the bits when off.
   */
  offColor?: string;

}

export default BitIndicators;
