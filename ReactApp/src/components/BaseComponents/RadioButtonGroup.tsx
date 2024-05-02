import React from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import Widget from "../SystemComponents/Widgets/Widget";
import { useTheme } from "@mui/material";

const RadioButtonGroupComponent = (props) => {
  const theme = useTheme();
  const handleChange = (event) => {
    let value = event.target.value;
    props.handleImmediateChange(value);
  };
  let radioButtons = props.enumStrs.map((item, index) => (
    <FormControlLabel
      key={item}
      value={item}
      disabled={props.disabled}
      control={<Radio color={props.onColor} />}
      label={item}
      labelPlacement={props.bitLabelPlacement}
    />
  ));
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
        <RadioGroup
          sx={{ padding: theme.spacing(1) }}
          value={props.value}
          onChange={handleChange}
          {...props.muiRadioGroupProps}
        >
          {radioButtons}
        </RadioGroup>
      }
    />
  );
};

/**
 * The RadioButtonGroup Component is a wrapper on the Material-UI List component.
 * The List component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI List Demos:
 * https://mui.com/demos/lists<br/><br/>
 * Material-UI List API:
 * https://mui.com/api/list
 */
const RadioButtonGroup = ({
  labelPlacement = "top",
  bitLabelPlacement = "end",
  showTooltip = false,
  ...props
}: RadioButtonGroupProps) => {
  return (
    <Widget
      {...props}
      useStringValue={true}
      component={RadioButtonGroupComponent}
      usePvMinMax={false}
      usePvPrecision={false}
      min={undefined}
      max={undefined}
      prec={undefined}
      labelPlacement={labelPlacement}
      bitLabelPlacement={bitLabelPlacement}
      showTooltip={showTooltip}
    />
  );
};

interface RadioButtonGroupProps {
  /**
   * If defined, this array of strings overrides the default EPICS MBBI/O
   * pv strings and are displayed as the choices in the RadioButtonGroup component.
   */
  custom_selection_strings?: string[];

  /** Name of the process variable,  eg. '$(device):test$(id)'*/
  pv: string;
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros?: Record<string, string>;

  /** Custom label to be used, if  `usePvLabel` is not defined. */
  label?: string;
  /** If defined, then the DataConnection debugging information will be displayed*/
  debug?: boolean;
  /** label placement*/
  labelPlacement?: "start" | "top" | "bottom" | "end";

  /** local variable initialization value*/
  initialLocalVariableValue?: string;
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
  /** Any of the MUI RadioGroup Props can applied by defining them as an object
   *
   */
  muiRadioGroupProps?: Record<string, any>;
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
  tooltipProps?: Record<string, any>;
  /**
   * If defined, the position of the bit labels relative to the widget.
   */
  bitLabelPlacement?: "start" | "end" | "top" | "bottom";
}

export default RadioButtonGroup;
