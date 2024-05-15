import React from "react";
import { Button, FormControlLabel } from "@mui/material";
import Widget from "../SystemComponents/Widgets/Widget";

const ActionButtonComponent = (props) => {
  /**
   * Send the predefined value to the PV.
   */
  const handleButtonClick = () => {
    props.handleImmediateChange(props.actionValue);
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
        <Button
          sx={{
            width: "100%",
            height: "100%",
            marginTop: "auto",
            marginBottom: "auto",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          variant="contained"
          color={props.color}
          onClick={handleButtonClick}
          {...props.muiButtonProps}
        >
          {props.actionString}
        </Button>
      }
    />
  );
};

/**
 * The ActionButton Component is a wrapper on the Material-UI Button component.
 * The ActionButton will output the `actionValue` to the process variable when pressed.
 * The ActionButton component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI Button Demos:
 * https://mui.com/demos/buttons/<br/><br/>
 * Material-UI Button API:
 * https://mui.com/api/button/
 * */
const ActionButton = ({
  showTooltip = false,
  color = "primary",
  ...others
}: ActionButtonProps) => {
  return (
    <Widget
      {...others}
      showTooltip={showTooltip}
      component={ActionButtonComponent}
      writeOutputValueToAllpvs={true}
      componentProps={{ color: color }}
    />
  );
};

/**
 * The props for the ActionButton component.
 */
interface ActionButtonProps {
  /**
   * Define the string on the button.
   */
  actionString?: string;
  /**
   * Define the value to write into the PV.
   */
  actionValue?: any;
  /**
   * Name of the process variable, e.g. '$(device):test$(id)'
   */
  pv?: string;
  /**
   * Array of the process variables, e.g. '$(device):test$(id)'
   */
  pvs?: string[];
  /**
   * Values of macros that will be substituted in the pv name, e.g. {{'$(device)':'testIOC','$(id)':'2'}}
   */
  macros?: Record<string, string>;
  /**
   * Directive to fill the label with the value contained in the EPICS pv's DESC field.
   */
  usePvLabel?: boolean;
  /**
   * Custom color to be used, must be derived from Material UI theme colors.
   */
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit"
    | "default";
  /**
   * Custom label to be used, if `usePvLabel` is not defined.
   */
  label?: string;
  /**
   * Position of label.
   */
  labelPlacement?: "top" | "bottom" | "start" | "end";
  /**
   * If defined, then the string value of the EPICS enumerator type will be forced to be used, if not defined the enumerator index is used.
   */
  useStringValue?: boolean;
  /**
   * If defined, then the DataConnection debugging information will be displayed.
   */
  debug?: boolean;
  /**
   * Local variable initialization value.
   */
  initialLocalVariableValue?: string;
  /**
   * Any of the MUI Button Props can be applied by defining them as an object.
   */
  muiButtonProps?: Record<string, any>;
  /**
   * Tooltip Text.
   */
  tooltip?: string;
  /**
   * Directive to show the tooltip.
   */
  showTooltip?: boolean;
  /**
   * Any of the MUI Tooltip props can be applied by defining them as an object.
   */
  tooltipProps?: Record<string, any>;
}
export default ActionButton;
