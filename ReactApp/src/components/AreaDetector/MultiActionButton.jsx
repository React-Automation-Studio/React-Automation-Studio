import React, { useState } from "react";
import { Button, FormControlLabel } from "@mui/material";
import PropTypes from "prop-types";
import Widget from "../SystemComponents/Widgets/Widget";
import { useEpicsPV } from "../SystemComponents/EpicsPV";

const MultiActionButtonComponent = (props) => {
  const [newValueTrigger, setNewValueTrigger] = useState(0);

  const simMode = useEpicsPV({
    pv: "$(P)$(R)SimMode",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.simMode,
    debug: true,
  });
  const enableCallbackPv = useEpicsPV({
    pv: "$(P)image1:EnableCallbacks",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: 1,
  });
  const cam1GainXPv = useEpicsPV({
    pv: "$(P)$(R)GainX",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.gainX,
  });
  const cam1GainYPv = useEpicsPV({
    pv: "$(P)$(R)GainY",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.gainY,
  });
  const gainPv = useEpicsPV({
    pv: "$(P)$(R)Gain",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.gain,
  });
  const gainRed = useEpicsPV({
    pv: "$(P)$(R)GainRed",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.gainRed,
  });
  const gainGreen = useEpicsPV({
    pv: "$(P)$(R)GainGreen",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.gainGreen,
  });
  const gainBlue = useEpicsPV({
    pv: "$(P)$(R)GainBlue",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.gainBlue,
  });
  const Offset = useEpicsPV({
    pv: "$(P)$(R)Offset",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.Offset,
  });
  const Noise = useEpicsPV({
    pv: "$(P)$(R)Noise",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.Noise,
  });
  const peakStartX = useEpicsPV({
    pv: "$(P)$(R)PeakStartX",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.peakStartX,
  });
  const peakStartY = useEpicsPV({
    pv: "$(P)$(R)PeakStartY",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.peakStartY,
  });
  const peakNumX = useEpicsPV({
    pv: "$(P)$(R)PeakNumX",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.peakNumX,
  });
  const peakNumY = useEpicsPV({
    pv: "$(P)$(R)PeakNumY",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.peakNumY,
  });
  const peakStepX = useEpicsPV({
    pv: "$(P)$(R)PeakStepX",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.peakStepX,
  });
  const peakStepY = useEpicsPV({
    pv: "$(P)$(R)PeakStepY",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.peakStepY,
  });
  const peakWidthX = useEpicsPV({
    pv: "$(P)$(R)PeakWidthX",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.peakWidthX,
  });
  const peakWidthY = useEpicsPV({
    pv: "$(P)$(R)PeakWidthY",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.peakWidthY,
  });
  const peakVariation = useEpicsPV({
    pv: "$(P)$(R)PeakVariation",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.peakVariation,
  });
  const xSine1Amplitude = useEpicsPV({
    pv: "$(P)$(R)XSine1Amplitude",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.xSine1Amplitude,
  });
  const xSine1Frequency = useEpicsPV({
    pv: "$(P)$(R)XSine1Frequency",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.xSine1Frequency,
  });
  const xSine1Phase = useEpicsPV({
    pv: "$(P)$(R)XSine1Phase",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.xSine1Phase,
  });
  const xSine2Amplitude = useEpicsPV({
    pv: "$(P)$(R)XSine2Amplitude",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.xSine2Amplitude,
  });
  const xSine2Frequency = useEpicsPV({
    pv: "$(P)$(R)XSine2Frequency",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.xSine2Frequency,
  });
  const xSine2Phase = useEpicsPV({
    pv: "$(P)$(R)XSine2Phase",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.xSine2Phase,
  });
  const ySine1Amplitude = useEpicsPV({
    pv: "$(P)$(R)YSine1Amplitude",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.ySine1Amplitude,
  });
  const ySine1Frequency = useEpicsPV({
    pv: "$(P)$(R)YSine1Frequency",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.ySine1Frequency,
  });
  const ySine1Phase = useEpicsPV({
    pv: "$(P)$(R)YSine1Phase",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.ySine1Phase,
  });
  const ySine2Amplitude = useEpicsPV({
    pv: "$(P)$(R)YSine2Amplitude",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.ySine2Amplitude,
  });
  const ySine2Frequency = useEpicsPV({
    pv: "$(P)$(R)YSine2Frequency",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.ySine2Frequency,
  });
  const ySine2Phase = useEpicsPV({
    pv: "$(P)$(R)YSine2Phase",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.ySine2Phase,
  });
  const xSineOperation = useEpicsPV({
    pv: "$(P)$(R)XSineOperation",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.xSineOperation,
  });
  const ySineOperation = useEpicsPV({
    pv: "$(P)$(R)YSineOperation",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: props.ySineOperation,
  });
  const acquirePeriod = useEpicsPV({
    pv: "$(P)$(R)AcquirePeriod",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: 2,
  });
  const accquire = useEpicsPV({
    pv: "$(P)$(R)Acquire",
    macros: props.macros,
    newValueTrigger: newValueTrigger,
    outputValue: 1,
  });

  /**
   * Send the predefined value to the PV.
   */
  const handleButtonClick = () => {
    setNewValueTrigger((prev) => prev + 1);
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
 * The MultiActionButton Component is a wrapper on the Material-UI Button component.
 * The MultiActionButton will output the `actionValue` to the process variable when pressed.
 * The MultiActionButton component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI Button Demos:
 * https://mui.com/demos/buttons/<br/><br/>
 * Material-UI Button API:
 * https://mui.com/api/button/
 * */
const MultiActionButton = (props) => {
  return (
    <MultiActionButtonComponent {...props} formControlLabel={props.label} />
  );
};

MultiActionButton.propTypes = {
  /** Define the string on the button.*/
  actionString: PropTypes.string,
  /**  Define the value to write into the PV.*/
  actionValues: PropTypes.any,
  /** Name of the process variable,  eg. '$(device):test$(id)'*/
  pv: PropTypes.string,
  /** Array of the process variables, eg. '$(device):test$(id)'*/
  pvs: PropTypes.arrayOf(PropTypes.string),
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros: PropTypes.object,
  /** Directive to fill the label with the value contained in the  EPICS pv's DESC field. */
  usePvLabel: PropTypes.bool,

  /** Custom color to be used, must be derived from Material UI them color's*/
  color: PropTypes.string,

  /** Custom label to be used, if  `usePvLabel` is not defined. */
  label: PropTypes.string,

  /** Position of label*/
  labelPlacement: PropTypes.oneOf(["top", "bottom", "start", "end"]),

  /** If defined, then the string value of the EPICS enumerator type will be forced to be used, if not defined the the enumerator index is used */
  useStringValue: PropTypes.bool,
  /** If defined, then the DataConnection debugging information will be displayed*/
  debug: PropTypes.bool,
  /** local variable initialization value*/
  initialLocalVariableValue: PropTypes.string,
  /**
   * Any of the MUI Button Props can applied by defining them as an object
   */
  muiButtonProps: PropTypes.object,
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
};

MultiActionButton.defaultProps = {
  showTooltip: false,
  color: "primary",
};

export default MultiActionButton;
