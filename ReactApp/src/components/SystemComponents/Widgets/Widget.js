import React from "react";
import PropTypes from "prop-types";
import WidgetPVSingleValue from "./WidgetPVSingleValue";
import WidgetPVArray from "./WidgetPVArray";

/**
 * The Widget component creates standard properties,
 * state variables and callbacks to manage the behaviour of
 * a component communicating with one or multiple PVs.
 * It also provides the default RAS contextMenu to the child component.
 *
 * The label, min, max, units, pv and tooltip all accept macros
 * that can be replaced by the values defined in the macros prop.
 **/
function Widget(props) {
  const { showAsArray } = props;
  if (showAsArray) {
    return <WidgetPVArray {...props} /> 
  } else {
    return <WidgetPVSingleValue {...props} />;
  }
}

/**
 * Props definition for all widgets linked to PVs storing
 * analog values.
 */
Widget.propTypes = {
  /**
   * Directive to use the  alarm severity status 
   * to alter the fields background color.
   */
  alarmSensitive: PropTypes.bool,
  /**
   * Custom PV to define the alarm severity to be used, 
   * alarmSensitive must be set to `true` and useMetadata to `false`, 
   * NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
   */
  alarmPv: PropTypes.string,
  /**
   * If defined, then the DataConnection and
   * the widget debugging information will be displayed.
   */
  debug: PropTypes.bool,
  /**
   * Directive to the output value to all the pvs defined in the pvs array
   */
  writeOutputValueToAllpvs: PropTypes.bool,
  /**
   * Local variable initialization value.
   * When using loc:// type PVs.
   */
  initialLocalVariableValue: PropTypes.string,
  /**
   * Custom label to be used, if  usePvLabel is not defined.
   */
  label: PropTypes.string,
  /**
   * Custom PV to define the units to be used, 
   * usePvLabel must be set to `true` and useMetadata to `false`, 
   * NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
   */
  labelPv: PropTypes.string,
  /**
   * Values of macros that will be substituted in the pv name.
   * eg. {{'$(device)':'testIOC','$(id)':'2'}}
   */
  macros: PropTypes.object,
  /**
   * Custom maximum to be used, if usePvMinMax is not defined.
   */
  max: PropTypes.number,
  /**
   * Custom PV to define the maximum to be used, 
   * usePvMinMax must be set to `true` and useMetadata to `false`, 
   * NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
   */
  maxPv: PropTypes.string,
  /**
   * Custom minimum value to be used, if usePvMinMax is not defined.
   */
  min: PropTypes.number,
  /**
   * Custom PV to define the minimum to be used, 
   * usePvMinMax must be set to `true` and useMetadata to `false`, 
   * NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
   */
  minPv: PropTypes.string,
  /**
   * when writing to the  pv's output value, 
   * increment newValueTrigger to tell the pv component 
   * emit the output value to the process variable.
   */

  prec: PropTypes.number,
  /**
   * Custom PV to define the precision to be used, 
   * usePvPrecision must be set to `true` and useMetadata to `false`, 
   * NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
   */
  precPv: PropTypes.string,
  /**
   * Custom units to be used, if usePvUnits is not defined.
   */
  units: PropTypes.string,
  /**
   * Custom PV to define the units to be used, 
   * usePvUnits must be set to `true` and useMetadata to `false`, 
   * NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
   */
  unitsPv: PropTypes.string,
  /**
   * Directive to fill the component's label with
   * the value contained in the  pv metadata's DESC field or the labelPv value.
   * If not defined it uses the custom label as defined by the label prop.
   */
  usePvLabel: PropTypes.bool,
  /**
   * When using EPICS, the RAS pv's metadata is conventionally derived from the pyEpics PV in the pvserver.
   * The pyEpics metadata is unfortunately static and the values used will be the initial values that pvserver receives when it connects the first time.
   * This is sufficient in most cases except when the user wants to dynamically update the metaData.
   * In this case a direct connection can be made to all the pv fields by setting useMetadata to false.
   * If any of the metadata pvs are defined i.e unitsPv then the PV makes a new data  connection to this alternate pv and will
   * use the value provided by this pv as the units.
   * The same is the case for the precPV, labelPv, alarmPv, unitsPv and minPv.
   * By setting useMetadata to false also enables connection to other variables as defined by different protocols.
   */
  useMetadata: PropTypes.bool,
  /**
   * Directive to use the pv metadata's HOPR and LOPR fields or the minPv and maxPv values
   * to limit the maximum and minimum values
   * that can be contained in the value.
   * If not defined it uses the custom min and max as defined by the min and max prop.
   */
  usePvMinMax: PropTypes.bool,
  /**
   * Directive to round the value using the precision field of the PV metadata or precPv.
   * If not defined it uses the custom precision as defined by the prec prop.
   */
  usePvPrecision: PropTypes.bool,
  /**
   * Directive to use the units contained in the   pv metdata's EGU field or unitsPv.
   *  If not defined it uses the custom units as defined by the units prop.
   */
  usePvUnits: PropTypes.bool,
  /**
   * Directive to use PV's string values.
   */
  useStringValue: PropTypes.bool,
  /**
   * If defined, then the string representation of the number can be formatted
   * using the mathjs format function
   * eg. numberFormat={{notation: 'engineering',precision: 3}}.
   * See https://mathjs.org/docs/reference/functions/format.html for more examples
   */
  numberFormat: PropTypes.object,
  /**
   * Custom on color to be used, must be derived from Material UI theme color's.
   */
  onColor: PropTypes.string,
  /**
   * Custom off color to be used, must be derived from Material UI theme color's.
   */
  offColor: PropTypes.string,
  /** 
   * Name of the process variable, 
   * NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'
   */
  pv: PropTypes.string,
  /** 
   * Array of the process variables, 
   * NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'
   */
  pvs: PropTypes.arrayOf(PropTypes.string),
  /**
   * Object with a string and the corresponding severity value.
   * When PV value is equal to the string, set the corresponding severity
   * in the widget's severity.
   * Example: { stringMatch: '1', severity: 2 }.
   */
  stringSeverity: PropTypes.object,
  /**
   * Directive to override alarm severity with the rules defined in the stringSeverity
   */
  useStringSeverityMatch: PropTypes.bool,
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
   * When receiving a PV storing an array of values users can choose a subset of these value.
   * Registers accept the indexes of the registers to effectively show.
   * Order does count!
   */
  registers: PropTypes.arrayOf(PropTypes.number),
  /**
   * When receiving a PV storing an array of values users can assign a label to each register
   * or a subset of them.
   */
  registersLabel: PropTypes.arrayOf(PropTypes.string),
  /**
   * When receiving a PV storing an array of values users can set the label position for each register,
   * or a subset of them, if the receiving components allows it.
   */
  registersLabelPlacement: PropTypes.oneOf(["top", "bottom", "start", "end"]),
  /**
   * Directive to display array elements horizontal aligned.
   */
  alignHorizontal: PropTypes.bool,
  /**
   * When alignHorizontal is true, if stretch is true
   * all the elements are aligned into one row, otherwise
   * they have their standard width.
   */
  stretch: PropTypes.bool,
};

/**
 * Default props.definition for all widgets linked to
 * PVs storing analog values.
 */
Widget.defaultProps = {
  disabled: false,
  onColor: "primary",
  offColor: "default",
  showTooltip: false,
  useMetadata: true,
  tooltip: "",
  writeOutputValueToAllpvs: false,
  alignHorizontal: false,
  stretch: true,
};

export default Widget;
