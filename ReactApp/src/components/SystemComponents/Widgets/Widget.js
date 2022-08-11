import React, { useState, useEffect } from 'react'
import PV from '../PV'
import PropTypes from "prop-types";
import { LanDisconnect } from "mdi-material-ui/";
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import {replaceMacros,replaceArrayMacros} from '../Utils/macroReplacement';
import { useContextMenu } from "../Utils/widgetHooks";
import { 
  checkIndex, 
  checkPrecision, 
  formatValue, 
  isInsideLimits
} from "../Utils/widgetFunctions";

/**
 * The Widget component creates standard properties, state variables and callbacks to manage the behaviour of a component communicating with one or multiple PVs. It also provides the default RAS contextMenu to the child component.
 *
 * The label, min, max, units, pv and tooltip all accept macros that can be replaced by the values defined in the macros prop.
 */
const Widget = (props) => {
  const { disableProbe, index } = props;
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [initialized, setInitalized] = useState(false);
  const [immediateValue, setImmediateValue] = useState(null);
  const [commitChange, setCommitChange] = useState(false);
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
  const [tooltip] = useState(replaceMacros(props.tooltip));
  const [pv, setPv] = useState({
    value: 0,
    label: "",
    pvName: "",
    initialized: false,
    PVs: [],
    metadata: {},
    timestamp:"",
    readOnly: true,
    severity: 0,
    enum_strs: [],
    units: "",
  });
  const [pvs, setPvs] = useState([]);

  const [contextMenu, handleToggleContextMenu] = useContextMenu(
    [pv, ...pvs], 
    readOnly, 
    disableProbe
  );
 
  useEffect(() => {
    let ro=props.readOnly===true;
    if (props.pv){
      ro = ro || pv.readOnly;
    }

    if (props.pvs) {
      pvs.forEach((item) => {
        ro = ro || item.readOnly;
      })
    }

    setReadOnly(ro)
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pv, props.readOnly,pvs,])

  useEffect(() => {
    if (props.usePvLabel) {
      setLabel(pv.label)
    }
    else {
      setLabel(replaceMacros(props.label,props.macros))
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.label, pv.label,props.macros])

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
      setUnits(replaceMacros(props.units,props.macros))
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.units, pv.units,props.macros])

  useEffect(() => {
    if (props.usePvPrecision) {
      setPrec(pv.prec)
    }
    else {
      setPrec(props.prec)
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.prec, pv.prec, props.usePvPrecision])

  useEffect(() => {
    if (props.usePvMinMax) {
      setMin(pv.min)
      setMax(pv.max)
    }
    else {
      setMin(props.min,props.macros)
      setMax(props.max,props.macros)
    }
 // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.min, props.max, pv.min, pv.max])

  useEffect(() => {
    if (!focus) {
      const tempValue = checkPrecision(pv.value, prec);
      setValue(formatValue(tempValue, props.numberFormat));
      if (props.debug) {
        console.log(tempValue);
      }
    }
  }, [focus, pv.value, prec, props.numberFormat, props.debug]);

  useEffect(() => {
    let newSeverity=pv.severity;
    if (typeof props.useStringSeverityMatch !== 'undefined'){
      if (props.useStringSeverityMatch===true){

        if (typeof props.stringSeverity !== 'undefined'){
          let string;
          for (string in props.stringSeverity){
            // eslint-disable-next-line eqeqeq
            if (value==props.stringSeverity[string].stringMatch){
              newSeverity=props.stringSeverity[string].severity;
              break;
            }

          }

        }
      }
    }
    setAlarmSeverity(newSeverity)
  }, [pv.severity,props.useStringSeverityMatch,props.stringSeverity,value])

  useEffect(() => {
    if (immediateValue !== null) {
      const tempValue = checkPrecision(
        isInsideLimits(immediateValue, min, max),
        prec
      );
      setValue(formatValue(tempValue, props.numberFormat));
      setOutputValue(tempValue);
      setNewValueTrigger(newValueTrigger + 1);
      setImmediateValue(null);
    }
  }, [immediateValue, min, max, prec, props.numberFormat, newValueTrigger]);

  useEffect(() => {
    if (commitChange) {
      const tempValue = checkPrecision(isInsideLimits(value, min, max), prec);
      setValue(formatValue(tempValue, props.numberFormat));
      setOutputValue(tempValue);
      setNewValueTrigger(newValueTrigger + 1);
      setCommitChange(false);
    }
  }, [commitChange, min, max, prec, props.numberFormat, newValueTrigger, value]);
    
  useEffect(() => {
    if (props.custom_selection_strings) {
      setEnumStrings(replaceArrayMacros(props.custom_selection_strings,props.macros))
    }
    else {
      setEnumStrings(pv.enum_strs)
    }
  }, [props.custom_selection_strings, pv.enum_strs,props.macros])

  useEffect(() => {
    let init =
      (typeof props.pv !== 'undefined')
      || (typeof props.pvs !== 'undefined')

    if (props.pv) {
      init = init&&pv.initialized;
    }
    if (props.pvs) {
      pvs.forEach((item) => {
        init = init && item.initialized;
      })
    }

    setInitalized(init)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pv.initialized, pvs])

  useEffect(()=>{
    if (typeof props.usePrecision!=='undefined'){
      console.warn("prop usePrecision is deprecated, use the usePvPrecision and prec props instead")
    }
  },[props])

  const wrapComponent = (CustomComponent, props) => {
    return <CustomComponent {...props} />;
  }

  const disabled = !initialized || readOnly||props.disabled;

  const disconnectedIcon = () => {
    return (
      <LanDisconnect
        fontSize="inherit"
        style={{
          color: theme.palette.error.main,
          verticalAlign: "middle",
        }}
      />
    );
  }

  const getPvs = (pvArray, widgetProps, prevState, setState,newValueTrigger,outputValue) => {
    let pvs = [];
    if (typeof pvArray !== 'undefined') {
      pvArray.forEach((item, index) => {
        let pv;
        let props;
        if (typeof item === Object) {
          pv = item.pv;
          props = item.props;
        }
        else {
          pv = item;
          props = widgetProps;
        }
        pvs.push(
          <PV
            key={index.toString()}
            makeNewSocketIoConnection={props.makeNewSocketIoConnection}
            pv={pv}
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
            debug={props.debug}
            pvData={(data) => setState(prevState => {
              let state = [...prevState]
              state[index] = data;
              return state

            }
            )}
            name={props.name}
          />)
      })
      return pvs
    }
    else {
      return []
    }
  }

  const childPv = typeof props.pv !== 'undefined' && <PV
    pv={props.pv}
    makeNewSocketIoConnection={props.makeNewSocketIoConnection}
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
    debug={props.debug}
    pvData={setPv}
    name={props.name}
  />

  const childPvs = getPvs(props.pvs, props, pvs, setPvs,props.writeOutputValueToAllpvs?newValueTrigger:undefined,props.writeOutputValueToAllpvs?outputValue:undefined)

  const handleValue = (newValue, setFunction) => {
    if (checkIndex(index, value)) {
      let newArrayValue = [...value];
      newArrayValue[index] = newValue;
      setFunction(newArrayValue);
    } else {
      setFunction(newValue);
    }
  };

  const child = props.component && wrapComponent(props.component,
    {
      ...props,
      initialized: initialized,
      pvName: pv.pvName,
      value: checkIndex(index, value) ? value[index] : value,
      min: min,
      max: max,
      prec:prec,
      label: label,
      formControlLabel:initialized?label :<span style={{fontSize:"inherit", whiteSpace: "nowrap"}}>{disconnectedIcon()}{" "+pv.pvName}</span>,
      units: units,
      disabled: disabled,
      readOnly: readOnly,
      alarmSeverity: alarmSeverity,
      enumStrs: enumStrings,
      disconnectedIcon: disconnectedIcon(),
      handleChange: (newValue) => handleValue(newValue, setValue),
      handleImmediateChange: (newValue) =>
        handleValue(newValue, setImmediateValue),
      handleCommitChange: () => setCommitChange(true),
      handleFocus: () => setFocus(true),
      handleBlur: () => setFocus(false),
      pvData: pv,
      pvsData: pvs,
    })

  const divStyle = {
    width: "100%",
    height: "100%",
  }

  const Tag=props.svgWidget?"g":"div";
  if(props.debug){
    console.log("Widget PVs",props.pvs)
  }

  return (
    <Tooltip
      title={tooltip}
      disableFocusListener={true}
      disableTouchListener={true}
      disableHoverListener={props.showTooltip===false}
      {...props.tooltipProps}  >

    <Tag
      style={props.svgWidget?undefined:divStyle}
      onContextMenu={ props.disableContextMenu ? undefined : handleToggleContextMenu}
    >
      {child}
      {childPv}
      {childPvs}
      {contextMenu}
    </Tag>
   </Tooltip>
  )
}

/**
 * Props definition for all widgets linked to PVs storing
 * analog values.
 */
Widget.propTypes = {
  /**
   * If defined, then the DataConnection  will be over a new socketIO  connection, otherwise the global socketIO connection
   */
  makeNewSocketIoConnection: PropTypes.bool,
  /**
   * Directive to use the  alarm severity status to alter the fields background color.
   */
  alarmSensitive: PropTypes.bool,
  /**
   * Custom PV to define the alarm severity to be used, alarmSensitive must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
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
  writeOutputValueToAllpvs:PropTypes.bool,
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
  * Custom PV to define the units to be used, usePvLabel must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
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
   * Custom PV to define the maximum to be used, usePvMinMax must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  maxPv: PropTypes.string,
  /**
   * Custom minimum value to be used, if usePvMinMax is not defined.
   */
  min: PropTypes.number,
  /**
   * Custom PV to define the minimum to be used, usePvMinMax must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  minPv: PropTypes.string,
  /**
   * when writing to the  pv's output value, increment newValueTrigger to tell the pv component emit the output value to the process variable.
   */

  prec: PropTypes.number,
  /**
   * Custom PV to define the precision to be used, usePvPrecision must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  precPv: PropTypes.string,

  /**
   * Custom units to be used, if usePvUnits is not defined.
   */
  units: PropTypes.string,
  /**
   * Custom PV to define the units to be used, usePvUnits must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
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

  /** Name of the process variable,  eg. '$(device):test$(id)'*/
  pv: PropTypes.string,
  /** Array of the process variables, eg. '$(device):test$(id)'*/
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
  tooltip:PropTypes.string,
  /**
   * Directive to show the tooltip
   */
  showTooltip:PropTypes.bool,
  /**
   *  Any of the MUI Tooltip props can applied by defining them as an object
   */
  tooltipProps:PropTypes.object,
};

/**
 * Default props.definition for all widgets linked to
 * PVs storing analog values.
 */
Widget.defaultProps = {
  disabled: false,
  onColor: "primary",
  offColor: "default",
  showTooltip:false,
  useMetadata: true,
  tooltip:"",
  writeOutputValueToAllpvs:false,
};

export default Widget
