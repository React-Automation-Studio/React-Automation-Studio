import React from "react";
import { FormControlLabel } from "@mui/material";
import MuiSwitch from "@mui/material/Switch";
import Widget from "../SystemComponents/Widgets/Widget";

/* eslint-disable eqeqeq */
const SwitchInternalComponent = (props) => {
  /**
   * Save switch state.
   * @param {Event} event
   */
  const handleButtonChange = (event) => {
    let value = event.target.checked ? 1 : 0;
    props.handleImmediateChange(value);
  };

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
        <MuiSwitch
          onChange={handleButtonChange}
          checked={props.value == 1}
          color={props.onColor}
          {...props.muiSwitchProps}
        />
      }
    />
  );
};

/* eslint-disable eqeqeq */
/**
 * The Switch component is a wrapper on a Material-UI Switch component.
 * The Switch component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI Switch Demos:
 * https://mui.com/components/switches/#switch<br/><br/>
 * Material-UI Switch API:
 * https://mui.com/api/switch/
 */
const Switch = ({
  onColor = "primary",
  debug = false,
  showTooltip = false,
  ...props
}: SwitchProps) => {
  return (
    <Widget
      {...props}
      component={SwitchInternalComponent}
      usePvMinMax={false}
      usePvPrecision={false}
      min={undefined}
      max={undefined}
      prec={undefined}
      onColor={onColor}
      debug={debug}
      showTooltip={showTooltip}
    />
  );
};

interface SwitchProps {
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
   * Custom on color to be used, must be derived from Material UI theme color's.
   */
  onColor?: string;
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
  /** Any of the MUI Switch Props can applied by defining them as an object
   *
   */
  muiSwitchProps?: object;
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

export default Switch;
