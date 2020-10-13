import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { LanDisconnect } from "mdi-material-ui/";
import { Tooltip, makeStyles } from "@material-ui/core";
import PV from "../PV";
import ContextMenu from "../ContextMenu";
import {
  useAlarmSeverity,
  useEnumStrings,
  useInitialized,
  useLabel,
  useMinMax,
  usePrec,
  useReadOnly,
  useUnits,
} from "../Utils/widgetHooks";
import {
  checkPrecision,
  formatValue,
  getContextPVs,
  getTooltipProps,
  isInsideLimits,
  wrapComponent,
} from "../Utils/widgetFunctions";

const useStyles = makeStyles((theme) => ({
  disconnectedIcon: {
    color: theme.palette.error.main,
    verticalAlign: "middle",
  },
  disconnectedIconForm: { fontSize: "inherit", whiteSpace: "nowrap" },
}));

/**
 * The Widget component creates standard properties,
 * state variables and callbacks to manage the behaviour
 * of a component communicating with one or multiple PVs.
 * It also provides the default RAS contextMenu to the child component.
 *
 * The label, min, max, units, pv and tooltip all accept macros
 * that can be replaced by the values defined in the macros prop.
 **/
function WidgetSinglePV(props) {
  if (props.pv === undefined) console.log("sono undefined");
  const classes = useStyles();
  const { debug, disabled: userDisabled, disableProbe, numberFormat } = props;

  const defaultPV = {
    value: 0,
    label: "",
    pvName: "",
    initialized: false,
    PVs: [],
    metadata: {},
    timestamp: "",
    readOnly: true,
    severity: 0,
    enum_strs: [],
    units: "",
  };
  let defaultPVs;
  if (props.pvs !== undefined) {
    defaultPVs = props.pvs.map(() => defaultPV);
  } else {
    defaultPVs = [];
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const [focus, setFocus] = useState(false);
  const [openContextMenu, setOpenContextMenu] = useState(false);
  const [contextPVs, setContextPVs] = useState([]);
  const [pvs, setPvs] = useState(defaultPVs);
  const [pv, setPv] = useState(defaultPV);

  const alarmSeverity = useAlarmSeverity(props, pv);
  const enumStrings = useEnumStrings(props, pv);
  const initialized = useInitialized([pv, ...pvs]);
  const label = useLabel(props, pv);
  const { min, max } = useMinMax(props, pv);
  const prec = usePrec(props, pv);
  const readOnly = useReadOnly(props, [pv, ...pvs]);
  const units = useUnits(props, pv);

  const disabled = !initialized || readOnly || userDisabled;
  const tooltipProps = getTooltipProps(props);
  const disconnectedIcon = (
    <LanDisconnect fontSize="inherit" className={classes.disconnectedIcon} />
  );
  const formControlLabel = initialized ? (
    label
  ) : (
    <span className={classes.disconnectedIconForm}>
      {disconnectedIcon} {pv.pvName}
    </span>
  );
  const contextMenu = (
    <ContextMenu
      disableProbe={disableProbe}
      open={openContextMenu}
      pvs={contextPVs}
      handleClose={() => setOpenContextMenu(false)}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      probeType={readOnly ? "readOnly" : undefined}
    />
  );

  const handleToggleContextMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.target);
    setOpenContextMenu(!openContextMenu);
    setContextPVs(getContextPVs([pv, ...pvs]));
  };

  const [value, setValue] = useState(0);
  const [immediateValue, setImmediateValue] = useState(null);
  const [commitChange, setCommitChange] = useState(false);
  const [newValueTrigger, setNewValueTrigger] = useState(0);
  const [outputValue, setOutputValue] = useState(null);

  useEffect(() => {
    if (!focus) {
      const tempValue = checkPrecision(pv.value, prec);
      setValue(formatValue(tempValue, numberFormat));
      if (debug) {
        console.log(tempValue);
      }
    }
  }, [focus, pv.value, prec, numberFormat, debug]);

  useEffect(() => {
    if (immediateValue !== null) {
      const tempValue = checkPrecision(
        isInsideLimits(immediateValue, min, max),
        prec
      );
      setValue(formatValue(tempValue, numberFormat));
      setOutputValue(tempValue);
      setNewValueTrigger(newValueTrigger + 1);
      setImmediateValue(null);
    }
  }, [immediateValue, min, max, prec, numberFormat, newValueTrigger]);

  useEffect(() => {
    if (commitChange) {
      const tempValue = checkPrecision(isInsideLimits(value, min, max), prec);
      setValue(formatValue(tempValue, numberFormat));
      setOutputValue(tempValue);
      setNewValueTrigger(newValueTrigger + 1);
      setCommitChange(false);
    }
  }, [commitChange, min, max, prec, numberFormat, newValueTrigger, value]);

  let childPv;
  if (props.pv !== undefined) {
    childPv = (
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
        useMetadata={props.useMetadata}
        macros={props.macros}
        newValueTrigger={newValueTrigger}
        outputValue={outputValue}
        useStringValue={props.useStringValue}
        initialLocalVariableValue={props.initialLocalVariableValue}
        debug={debug}
        pvData={setPv}
        name={props.name}
      />
    );
  }

  let child;
  if (props.component !== undefined) {
    child = wrapComponent(props.component, {
      ...props,
      initialized: initialized,
      pvName: pv.pvName,
      value: value,
      min: min,
      max: max,
      prec: prec,
      label: label,
      formControlLabel: formControlLabel,
      units: units,
      disabled: disabled,
      readOnly: readOnly,
      alarmSeverity: alarmSeverity,
      enumStrs: enumStrings,
      disconnectedIcon: disconnectedIcon,
      handleChange: setValue,
      handleImmediateChange: setImmediateValue,
      handleCommitChange: () => setCommitChange(true),
      handleFocus: () => setFocus(true),
      handleBlur: () => setFocus(false),
      pvData: pv,
      pvsData: pvs,
    });
  }

  useEffect(() => {
    if (typeof props.usePrecision !== "undefined") {
      console.warn(
        "prop usePrecision is deprecated, use the usePvPrecision and prec props instead"
      );
    }
  }, [props]);

  const Tag = props.svgWidget ? "g" : "div";
  const divStyle = {
    width: "100%",
    height: "100%",
  };

  let childPvs;
  if (props.pvs !== undefined) {
    childPvs = props.pvs.map((item, index) => {
      const handleData = (data) => {
        let newData = [...pvs];
        newData[index] = data;
        setPvs(newData);
      };
      return (
        <PV
          key={index.toString()}
          pv={item}
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
          useMetadata={props.useMetadata}
          macros={props.macros}
          newValueTrigger={
            props.writeOutputValueToAllpvs ? newValueTrigger : undefined
          }
          outputValue={props.writeOutputValueToAllpvs ? outputValue : undefined}
          useStringValue={props.useStringValue}
          initialLocalVariableValue={props.initialLocalVariableValue}
          debug={debug}
          pvData={handleData}
          name={props.name}
        />
      );
    });
  }

  return (
    <Tooltip {...tooltipProps}>
      <Tag
        style={props.svgWidget ? undefined : divStyle}
        onContextMenu={
          props.disableContextMenu ? undefined : handleToggleContextMenu
        }
      >
        {child}
        {childPv}
        {childPvs}
        {contextMenu}
      </Tag>
    </Tooltip>
  );
}

/**
 * Props definition for all widgets linked to PVs storing
 * analog values.
 */
WidgetSinglePV.propTypes = {
  /**
   * Directive to use the  alarm severity status to alter the fields background color.
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
   * increment newValueTrigger to tell the pv component emit the 
   * output value to the process variable.
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
   * The pyEpics metadata is unfortunately static and the values used will be 
   * the initial values that pvserver receives when it connects the first time.
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
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string,
  /** Array of the process variables, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
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
WidgetSinglePV.defaultProps = {
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

export default WidgetSinglePV;
