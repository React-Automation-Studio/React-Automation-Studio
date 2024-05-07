import React from "react";
import { InputAdornment, MenuItem, TextField, useTheme } from "@mui/material";
import Widget from "../SystemComponents/Widgets/Widget";

const SelectionInputComponent = (props) => {
  const theme = useTheme();
  function handleChange(event) {
    let value = event.target.value;
    props.handleImmediateChange(value);
  }

  let inputProps;
  let stringValues;
  if (props.initialized) {
    stringValues = props.enumStrs.map((item, idx) => (
      <MenuItem key={item.toString()} value={props.useStringValue ? item : idx}>
        {item}
      </MenuItem>
    ));
    inputProps = {
      endAdornment: (
        <InputAdornment
          style={{ marginRight: theme.spacing(1) }}
          position="end"
        >
          {props.units} {props.children}
        </InputAdornment>
      ),
      readOnly: props.readOnly,
    };
  } else {
    inputProps = {
      endAdornment: (
        <InputAdornment
          style={{ marginRight: theme.spacing(1) }}
          position="end"
        >
          {props.units} {props.children}
        </InputAdornment>
      ),
      readOnly: props.readOnly,
    };
    stringValues = props.pvName;
  }

  return (
    <TextField
      key={props.pvName}
      sx={{
        width: "100%",
        fontWeight: 500,
        borderRadius: 4,
      }}
      select={props.initialized}
      disabled={props.disabled}
      value={props.initialized ? props.value : stringValues}
      onFocus={props.onUpdateWidgetFocus}
      onBlur={props.onUpdateWidgetBlur}
      onChange={handleChange}
      label={props.initialized ? props.label : props.disconnectedIcon}
      margin={props.margin}
      variant={props.variant}
      InputProps={inputProps}
      {...props.muiTextFieldProps}
    >
      {stringValues}
    </TextField>
  );
};

/**
 * The SelectionInput Component is a wrapper on the Material-UI TextField component.
 * The TextField component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI TextField Demos:
 * https://mui.com/demos/text-fields<br/><br/>
 * Material-UI TextField API:
 * https://mui.com/api/text-field
 */
const SelectionInput = ({
  showTooltip = false,
  variant = "outlined",
  ...props
}: SelectionInputProps) => {
  return (
    <Widget
      {...props}
      useStringValue={true}
      component={SelectionInputComponent}
      usePvMinMax={false}
      usePvPrecision={false}
      min={undefined}
      max={undefined}
      prec={undefined}
      showTooltip={showTooltip}
      componentProps={{
        variant,
      }}
    />
  );
};

interface SelectionInputProps {
  /** Name of the process variable,  eg. '$(device):test$(id)'*/
  pv: string;
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros?: object;

  /** If defined, this array of strings overrides the default EPICS MBBI/O pv strings and are displayed as the choices in the RadioButtonGroup component*/
  custom_selection_strings?: string[];

  /** Material-UI TextField variant*/
  variant?: "standard" | "outlined" | "filled" 
  /** Material-UI TextField margin*/
  margin?: string;

  /**
   * Custom PV to define the units to be used, usePvLabel must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  labelPv?: string;
  /**
   * Directive to fill the component's label with
   * the value contained in the  pv metadata's DESC field or the labelPv value.
   * If not defined it uses the custom label as defined by the label prop.
   */
  usePvLabel?: boolean;
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

  /** Any of the MUI TextField Props can applied by defining them as an object
   *
   */
  muiTextFieldProps?: object;

  /**
   * Custom units to be used, if usePvUnits is not defined.
   */
  units?: string;

  /**
   * Custom PV to define the units to be used, usePvUnits must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  unitsPv?: string;

  /**
   * Directive to use the units contained in the   pv metdata's EGU field or unitsPv.
   *  If not defined it uses the custom units as defined by the units prop.
   */
  usePvUnits?: boolean;
}

export default SelectionInput;
