import React from "react";
import { IconButton, FormControlLabel } from "@mui/material";
import { Lens } from "@mui/icons-material";
import Widget from "../SystemComponents/Widgets/Widget";

/* eslint-disable eqeqeq */
const StyledIconButtonComponent = (props) => {
  /**
   * Write in the PV the oppisite value of the actual one.
   */
  const handleButtonClick = () => {
    let value = props.value == 0 ? 1 : 0;
    //console.log(props.value,value)
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
        <IconButton
          size="small"
          color={props.value == 1 ? props.onColor : props.offColor}
          onClick={handleButtonClick}
        >
          {props.children === undefined ? <Lens /> : props.children}
        </IconButton>
      }
    />
  );
};

/* eslint-enable eqeqeq */
/**
 * The StyledIconButton Component is a wrapper on the Material-UI contained SvgIcon component.
 * The SvgIcon component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI SvgIcon Demos:
 * https://mui.com/style/icons/<br/><br/>
 * Material-UI SvgIcon API:
 * https://mui.com/api/svg-icon/<br/><br/>
 * A custom Icon can used by importing it in the parent and assigning it as a child <br/><br/>
 */
const StyledIconButton = ({
  onColor = "primary",
  offColor = "default",
  debug = false,
  showTooltip = false,
  ...others
}: StyledIconButtonProps) => {
  return (
    <Widget
      {...others}
      component={StyledIconButtonComponent}
      usePvMinMax={false}
      usePvPrecision={false}
      min={undefined}
      max={undefined}
      prec={undefined}
      onColor={onColor}
      offColor={offColor}
      debug={debug}
      showTooltip={showTooltip}
    />
  );
};

interface StyledIconButtonProps {
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
   * Custom on color to be used, must be derived from Material UI theme color.
   */
  onColor?: string;
  /**
   * Custom off color to be used, must be derived from Material UI theme color.
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

export default StyledIconButton;
