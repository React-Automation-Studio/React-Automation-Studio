import React, { useState, useEffect } from 'react';
import { makeStyles, FormControlLabel } from "@material-ui/core";
import PV from '../PV'
import ContextMenu from "../ContextMenu";
import PropTypes from "prop-types";
import { LanDisconnect } from "mdi-material-ui/";
import { create, all } from 'mathjs';
import { useTheme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import {replaceMacros,replaceArrayMacros} from '../Utils/macroReplacement';
import { 
  useAlarmSeverity, 
  useContextPVs, 
  useEnumStrings, 
  useInitialized, 
  useLabel, 
  useMinMax, 
  usePrec, 
  useReadOnly, 
  useUnits,
} from "../Utils/widgetHooks";
import { checkPrecision, isInsideLimits } from "../Utils/widgetFunctions"

const config = { }
const math = create(all, config)

const useStyles = makeStyles((theme) => ({
  horizontalSpan: {
    padding: theme.spacing(1),
    display: "inline-block",
    width: (props) => props.width,
  },
  verticalSpan: {
    padding: theme.spacing(1),
    display: "inline-block",
    width: "100%",
  },
}));

/**
 * The Widget component creates standard properties, state variables and callbacks to manage the behaviour of a component communicating with one or multiple PVs. It also provides the default RAS contextMenu to the child component. 
 * 
 * The label, min, max, units, pv and tooltip all accept macros that can be replaced by the values defined in the macros prop. 
 * 
 * 
 * 
 * 
 * 
 *  
    
 * 
 **/
  const Widget = (props) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [immediateValue, setImmediateValue] = useState(null);
  const [commitChange, setCommitChange] = useState(false);
  const [newValueTrigger, setNewValueTrigger] = useState(0);
  const [outputValue, setOutputValue] = useState(null);
  const [focus, setFocus] = useState(false);
  const [tooltip] = useState(replaceMacros(props.tooltip));
  const [anchorEl, setAnchorEl] = useState(null);
  const [openContextMenu, setOpenContextMenu] = useState(false);
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
  
  const alarmSeverity = useAlarmSeverity(props, pv);
  const contextPVs = useContextPVs(pv, pvs);
  const enumStrings = useEnumStrings(props, pv);
  const initialized = useInitialized(props, pv, pvs);
  const label = useLabel(props, pv);
  const { min, max } = useMinMax(props, pv); 
  const prec = usePrec(props, pv);
  const readOnly = useReadOnly(props, pv, pvs); 
  const units = useUnits(props, pv);



  useEffect(() => {
    if (!focus) {
      let newValue;

      newValue=checkPrecision(pv.value, prec);
      if (typeof props.numberFormat !== 'undefined'){
        if (Array.isArray(newValue)) {
          newValue = newValue.map((val) => (
            math.format(parseFloat(val),props.numberFormat)
          ));
        } else {
          newValue=math.format(parseFloat(newValue),props.numberFormat);
        }
        setValue(newValue)
      }
      else{
        setValue(newValue)
      }
      if (props.debug){
        console.log(newValue)
    }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus, pv.value, prec])

  useEffect(() => {
    if (immediateValue !== null) {
      let tempvalue = checkPrecision(isInsideLimits(immediateValue, min, max), prec);
      if (typeof props.numberFormat !== 'undefined'){
        if (Array.isArray(tempvalue)) {
          tempvalue = tempvalue.map((val) => (
            math.format(parseFloat(val),props.numberFormat)
          ));
        } else {
          tempvalue=math.format(parseFloat(tempvalue),props.numberFormat);
        }
        setValue(tempvalue)
      }
      else{
        setValue(tempvalue)
      }
      
      setOutputValue(tempvalue);
     
      setNewValueTrigger(newValueTrigger + 1);
      setImmediateValue(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediateValue, min, max, prec])

  useEffect(() => {
    if (commitChange) {
      let tempvalue = checkPrecision(isInsideLimits(value, min, max), prec);
      if (typeof props.numberFormat !== 'undefined'){
        let formatValue; 
        if (Array.isArray(tempvalue)) {
          formatValue = tempvalue.map((val) => (
            math.format(parseFloat(val),props.numberFormat)
          ));
        } else {
          formatValue=math.format(parseFloat(tempvalue),props.numberFormat);
        }
        setValue(formatValue)
      }
      else{
        setValue(tempvalue)
      }
      setOutputValue(tempvalue);
      setNewValueTrigger(newValueTrigger + 1);
      setCommitChange(false)
    }
    
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commitChange, min, max, prec])

  useEffect(()=>{
    if (typeof props.usePrecision!=='undefined'){
      console.warn("prop usePrecision is deprecated, use the usePvPrecision and prec props instead")
    }
  },[props])
  

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
   // console.log(pvArray, widgetProps)
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

      }
      )
      return pvs
    }
    else {
      return []
    }
  }

  const childPv = typeof props.pv !== 'undefined' && <PV
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
    debug={props.debug}
    pvData={setPv}
    name={props.name}

  />
  const childPvs = getPvs(props.pvs, props, pvs, setPvs,props.writeOutputValueToAllpvs?newValueTrigger:undefined,props.writeOutputValueToAllpvs?outputValue:undefined)
  const contextMenu=(<ContextMenu
  disableProbe={props.disableProbe}
  open={openContextMenu}
  pvs={contextPVs}
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
/>)
  let formControlLabel = initialized ? 
    label :
    <span style={{fontSize:"inherit", whiteSpace: "nowrap"}}>
      {disconnectedIcon()}{" "+pv.pvName}
    </span>;

  let filteredValues = value;
  if (Array.isArray(value) && props.registers !== undefined && Array.isArray(props.registers)) {
    filteredValues = props.registers.map((item) => value[item]);
  }

  let width;
  if (initialized && props.alignHorizontal && props.stretch) {
    let length = filteredValues.length > 0 ? filteredValues.length : 1;
    width = 100 / length + "%";
  }
  const classes = useStyles({ width });

  let child;
  if (!Array.isArray(value) && props.component) {
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
      disconnectedIcon: disconnectedIcon(),
      handleChange: setValue,
      handleImmediateChange: setImmediateValue,
      handleCommitChange: () => setCommitChange(true),
      handleFocus: () => setFocus(true),
      handleBlur: () => setFocus(false),
      pvData: pv,
      pvsData: pvs,
    })
  } else if (Array.isArray(value) && props.component) {
    let children = filteredValues.map((v, idx) => {
      const handleIndexValue = (val) => {
        let newValue = [...value];
        newValue[idx] = val;
        setValue(newValue);
      }
      const handleIndexImmediateValue = (val) => {
        let newValue = [...value];
        newValue[idx] = val;
        setImmediateValue(newValue);
      }
      const handleIndependentValue = (arrayValue, singleValue) => {
        if (arrayValue !== undefined && arrayValue.length > idx) {
          return arrayValue[idx];
        }
        return singleValue;
      }
      let registerLabel = handleIndependentValue(props.registersLabel, undefined);
      return (
        <span
          className={
            props.alignHorizontal ? classes.horizontalSpan : classes.verticalSpan
          }
          key={"elem" + idx}
        >
          {wrapComponent(props.component, {
            ...props,
            index: idx,
            initialized: initialized,
            pvName: pv.pvName,
            value: v,
            min: min,
            max: max,
            prec: prec,
            label: registerLabel,
            formControlLabel: initialized ? registerLabel : undefined,
            labelPlacement: props.registersLabelPlacement,
            units: units,
            disabled: disabled,
            readOnly: readOnly,
            alarmSeverity: alarmSeverity,
            enumStrs: enumStrings,
            disconnectedIcon: disconnectedIcon(),
            handleChange: handleIndexValue,
            handleImmediateChange: handleIndexImmediateValue,
            handleCommitChange: () => setCommitChange(true),
            handleFocus: () => setFocus(true),
            handleBlur: () => setFocus(false),
            pvData: pv,
            pvsData: pvs,
          })}
        </span>
      );
    })
    child = (
      <FormControlLabel
        label={formControlLabel}
        labelPlacement={props.labelPlacement}
        control={<div>{children}</div>}
      />
    );
  }
  
  const divStyle = {
    width: "100%",
    height: "100%",    
  }

  const Tag=props.svgWidget?"g":"div";
  
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
   * Directive to use the  alarm severity status to alter the fields background color.
   */

  alarmSensitive: PropTypes.bool,
  /**
   * Custom PV to define the alarm severity to be used, alarmSensitive must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
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
  * Custom PV to define the units to be used, usePvLabel must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
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
   * Custom PV to define the maximum to be used, usePvMinMax must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
   */
  maxPv: PropTypes.string,
  /**
   * Custom minimum value to be used, if usePvMinMax is not defined.
   */
  min: PropTypes.number,
  /**
   * Custom PV to define the minimum to be used, usePvMinMax must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
   */
  minPv: PropTypes.string,
  /**
   * when writing to the  pv's output value, increment newValueTrigger to tell the pv component emit the output value to the process variable.
   */

  prec: PropTypes.number,
  /**
   * Custom PV to define the precision to be used, usePvPrecision must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
   */
  precPv: PropTypes.string,
 

  
  /**
   * Custom units to be used, if usePvUnits is not defined.
   */

  units: PropTypes.string,
  /**
   * Custom PV to define the units to be used, usePvUnits must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
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
  tooltip:PropTypes.string,
  /**
   * Directive to show the tooltip
   */
  showTooltip:PropTypes.bool,
  /**
   *  Any of the MUI Tooltip props can applied by defining them as an object
   */

  tooltipProps:PropTypes.object,
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
// static defaultProps=WrappedComponent.defaultProps;
Widget.defaultProps = {
  disabled: false,
  onColor: "primary",
  offColor: "default",
  showTooltip:false,
  useMetadata: true,
  tooltip:"",
  writeOutputValueToAllpvs:false,
  alignHorizontal: false,
  stretch: true,
};

export default Widget