import React, { useState, useEffect } from 'react'
import PV from '../PV'
import Typography from '@material-ui/core/Typography';
import { InputAdornment, TextField } from "@material-ui/core";
import ContextMenu from "../ContextMenu";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { LanDisconnect } from "mdi-material-ui/";
const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
});
const Widget = (props) => {
  const [value, setValue] = useState(0);
  const [initialized, setInitalized] = useState(false);
  const [immediateValue, setImmediateValue] = useState(null);
  const [commitChange, SetCommitChange] = useState(false);
  const [newValueTrigger, setNewValueTrigger] = useState(0);
  const [outputValue, setOutputValue] = useState(null);
  const [focus, setFocus] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [enumStrings, setEnumStrings] = useState([]);
  const [alarmSeverity, setAlarmSeverity] = useState(0);
  const [min, setMin] = useState(0);
  const [prec, setPrec] = useState(0);
  const [max, setMax] = useState(0);
  const [units, setUnits] = useState("");
  const [label, setLabel] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openContextMenu, setOpenContextMenu] = useState(false);
  const [pv, setPv] = useState({
    value: 0,
    label: "",
    pvName: "",
    initialized: false,
    contextPVs: [],
    metadata: {},
    readOnly: true,
    severity: 0,
    enum_strs: [],
    units: "",
  });

  useEffect(() => {
    setReadOnly(pv.readOnly || props.readOnly)
  }, [pv.readOnly, props.readOnly])



  useEffect(() => {
    if (props.usePvLabel) {
      setLabel(pv.label)
    }
    else {
      setLabel(props.label)
    }

  }, [props.label, pv.label])

  useEffect(() => {
    if (props.usePvUnits) {
      if (pv.units) {
        setUnits(pv.units)
      }
      else {
        setUnits("")
      }
    }
    else {
      setUnits(props.units)
    }
  }, [props.units, pv.units])

  useEffect(() => {
    if (props.usePvPrecision) {
      setPrec(pv.prec)
    }
    else {
      setPrec(props.prec)
    }
  }, [props.prec, pv.prec, props.usePvPrecision])

  useEffect(() => {
    if (props.usePvMinMax) {
      setMin(pv.min)
      setMax(pv.max)
    }
    else {
      setMin(props.min)
      setMax(props.max)
    }

  }, [props.min, props.max, pv.min, pv.max])

  useEffect(() => {
    if (!focus) {
      setValue(checkPrecision(pv.value, prec))
    }
  }, [focus, pv.value, prec])

  useEffect(() => {
    setAlarmSeverity(pv.severity)
  }, [pv.severity])


  useEffect(() => {
    if (immediateValue !== null) {
      let tempvalue = checkPrecision(isInsideLimits(immediateValue, min, max), prec);
      setValue(tempvalue);
      setOutputValue(tempvalue);
      //console.log(immediateValue,tempvalue)
      setNewValueTrigger(newValueTrigger + 1);
      setImmediateValue(null);
    }
  }, [immediateValue, min, max, prec])

  useEffect(() => {
    if (commitChange) {
      let tempvalue = checkPrecision(isInsideLimits(value, min, max), prec);
      setValue(tempvalue);
      setOutputValue(tempvalue);
      setNewValueTrigger(newValueTrigger + 1);
      SetCommitChange(false)
    }
  }, [commitChange, min, max, prec])
  useEffect(() => {
    if (props.custom_selection_strings) {
      setEnumStrings(props.custom_selection_strings)
    }
    else {
      setEnumStrings(pv.enum_strs)
    }
  }, [props.custom_selection_strings, pv.enum_strs])
  useEffect(() => {
    setInitalized(pv.initialized)
  }, [pv.initialized])
  const checkPrecision = (value, prec) => {
    if (props.usePvPrecision || props.prec) {
      let precision = parseInt(prec);
      let tempvalue = parseFloat(value);
      if (!isNaN(tempvalue)) {
        return tempvalue.toFixed(precision);

      }
      else {
        return value;
      }
    }
    else {
      return (value)
    }
  }
  const isInsideLimits = (value, min, max) => {

    if (props.min || props.max || props.usePvMinMax) {

      let tempValue = parseFloat(value);
      if (!isNaN(tempValue)) {
        tempValue = tempValue > max ? max : tempValue;
        tempValue = tempValue < min ? min : tempValue;
        //value = tempValue;
      }

      return tempValue;

    } else {
      return value
    }


  }



  const handleToggleContextMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.target);
    setOpenContextMenu(!openContextMenu);

  }

  const handleContextMenuClose = () => {
    setOpenContextMenu(false);
  }


  const wrapComponent = (CustomComponent, props) => {
    return <CustomComponent {...props} />;
  }
  const disabled = !initialized;
  const disconnectedIcon = () => {
    return (

      <LanDisconnect
        fontSize="small"
        style={{
          color: props.theme.palette.error.main,
          verticalAlign: "middle",
        }}
      />
    );
  }


  const child = props.component && wrapComponent(props.component,
    {
      ...props,
      initialized: initialized,
      pvName: pv.pvName,
      value: value,
      min: min,
      max: max,
      label: label,
      units: units,
      disabled: disabled,
      readOnly: readOnly,
      alarmSeverity: alarmSeverity,
      enumStrs: enumStrings,
      disconnectedIcon: disconnectedIcon(),
      handleChange: setValue,
      handleImmediateChange: setImmediateValue,
      handleCommitChange: () => SetCommitChange(true),
      handleFocus: () => setFocus(true),
      handleBlur: () => setFocus(false),
      labelPosition: props.labelPosition,
    })
  const divStyle = {
    width: "100%",
    height: "100%",
  }
  if (props.debug) {
    console.log(props.name, " Debug:", "Widget Render States: ", "value:", value, "units:", units)
    console.log(props.name, " Debug:", "Widget Render pv:", pv)
  }
  return (
    <div
      style={divStyle}
      onContextMenu={
        props.disableContextMenu
          ? undefined
          : handleToggleContextMenu
      }
    >
      <ContextMenu
        disableProbe={props.disableProbe}
        open={openContextMenu}
        pvs={pv.contextPVs}
        handleClose={handleContextMenuClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        probeType={props.readOnly ? "readOnly" : undefined}
      />
      {child}
      <PV
        pv={props.pv}
        maxPv={props.maxPv}
        minPv={props.minPv}
        min={props.min}
        max={props.max}
        usePvMinMax={props.usePvMinMax}
        unitsPv={props.unitsPv}
        usePvUnits={props.usePvUnits}
        alarmPv={props.alarmPv}
        labelPv={props.labelPv}
        alarmSensitive={props.alarmSensitive}
        usePvLabel={props.usePvLabel}
        usePvPrecision={props.usePvPrecision}
        prec={props.prec}
        precPv={props.precPv}
        useEpicsMetaData={props.useEpicsMetaData}
        macros={props.macros}
        newValueTrigger={newValueTrigger}
        outputValue={outputValue}
        useStringValue={props.useStringValue}
        debug={props.debug}
        pvData={setPv}
        name={props.name}

      />

    </div>
  )
}
/**
 * Props definition for all widgets linked to PVs storing
 * analog values.
 */
Widget.propTypes = {
  /**
   * Directive to use the EPICS alarm severity status to alter the fields backgorund color.
   */
  alarmSensitive: PropTypes.bool,
  /**
   * If defined, then the DataConnection and
   * the widget debugging information will be displayed.
   */
  debug: PropTypes.bool,
  /**
   * Directive to disable the button from outside.
   */
  disabled: PropTypes.bool,
  /**
   * Directive to disable the Probe page for a widget
   */
  disableProbe: PropTypes.bool,
  /**
   * If defined, then the Metadata property, defined as input string,
   * of the PV will be displayed instead of its value.
   * eg. displayMetaData='lower_disp_limit'
   */
  displayMetaData: PropTypes.string,
  /**
   * If defined, then the timestamp of the PV will be displayed instead of its value
   */
  displayTimeStamp: PropTypes.bool,
  /**
   * Local variable intialization value.
   * When using loc:// type PVs.
   */
  initialLocalVariableValue: PropTypes.string,
  /**
   * Custom label to be used, if  usePvLabel is not defined.
   */
  label: PropTypes.string,
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
   * Custom minimum value to be used, if usePvMinMax is not defined.
   */
  min: PropTypes.number,
  /**
   * If defined, then the string representaion of the number can be formatted
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
   * Custom precision to round the value.
   */
  prec: PropTypes.number,
  /**
   * List of the process variables, or the single process variable
   * to which the widget will be connected.
   * When using multiple PVs order is important beacuse you will use this property
   * to referce to specific PVs inside your widget.
   * Each name must contain the correct prefix (pva:// or loc://)
   * eg. 'pva://$(device):test$(id)'
   */
  pv: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  /**
   * Object with a string and the corresponding severity value.
   * When PV value is equal to the string, set the corresponding severity
   * in the widget's severity.
   * Example: { stringMatch: '1', severity: 2 }.
   */
  stringSeverity: PropTypes.object,
  /**
   * Custom units to be used, if usePvUnits is not defined.
   */
  units: PropTypes.string,
  /**
   * Directive to fill the component's label with
   * the value contained in the  EPICS PV's DESC field.
   */
  usePvLabel: PropTypes.bool,
  /**
   * Directive to use the HOPR and LOPR EPICS fields
   * to limit the maximum and minimum values
   * that can be contained in the value.
   */
  usePvMinMax: PropTypes.bool,
  /**
   * Directive to round the value using the PREC field of the PV.
   * If not defined it uses the custom precision.
   */
  usePvPrecision: PropTypes.bool,
  /**
   * Directive to use the units contained in the  EPICS pv's EGU field.
   */
  usePvUnits: PropTypes.bool,
  /**
   * Directive to use PV's string values.
   */
  useStringValue: PropTypes.bool,

};

/**
 * Default props.definition for all widgets linked to
 * PVs storing analog values.
 */
// static defaultProps=WrappedComponent.defaultProps;
Widget.defaultProps = {
  //  alarmSensitive: false,
  //  debug: false,
  disabled: false,
  // disableProbe: false, // in the context menu it only checks for defined and then assigns a false value
  //  displayTimeStamp: false,
  onColor: "primary",
  offColor: "default",
  useEpicsMetaData: true,
  //  usePvLabel: false,
  //  usePvMinMax: false,
  //  usePvPrecision: false,
  //  usePvUnits: false,
  //  useStringValue: false,
};

export default Widget