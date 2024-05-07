import React from "react";
import { Radio, FormControlLabel } from "@mui/material";
import Widget from "../SystemComponents/Widgets/Widget";

/* eslint-disable eqeqeq */
const RadioButtonComponent = (props) => {
  /**
   * Send to PV the opposite value
   */
  const handleOnClick = () => {
    let value = props.value == 0 ? 1 : 0;
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
      labelPlacement={props.labelPosition}
      control={
        <Radio
          onClick={handleOnClick}
          checked={props.value == 1}
          color={props.onColor}
          {...props.muiRadioProps}
        />
      }
    />
  );
};

/* eslint-enable eqeqeq */
/**
 * The RadioButton component is a wrapper on a Material-UI RadioButton component. <br/><br/>
 * https://mui.com/api/radio/
 */
const RadioButton = (
  {
    onColor= "primary",
    debug= false,
    showTooltip= false,
    ...props}: RadioButtonProps
) => {
  return (
    <Widget
      {...props}
      component={RadioButtonComponent}
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

interface RadioButtonProps {
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
  onColor?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
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
  /** Any of the MUI Radio Props can applied by defining them as an object
   *
   */
  muiRadioProps?: object;
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


export default RadioButton;
