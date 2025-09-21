import React, { useState, useEffect } from "react";
import PV from "../PV";
import { LanDisconnect } from "mdi-material-ui/";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { replaceMacros, replaceArrayMacros } from "../Utils/macroReplacement";
import { useContextMenu } from "../Utils/widgetHooks";
import {
  checkIndex,
  checkPrecision,
  formatValue,
  isInsideLimits,
} from "../Utils/widgetFunctions";
import { PVType } from "../PV";

/**
 * The Widget component creates standard properties, state variables and callbacks to manage the behaviour of a component communicating with one or multiple PVs. It also provides the default RAS contextMenu to the child component.
 *
 * The label, min, max, units, pv and tooltip all accept macros that can be replaced by the values defined in the macros prop.
 */
const Widget = ({
  editMode = false,
  disabled = false,
  onColor = "primary",
  offColor = "default",
  showTooltip = false,
  useMetadata = true,
  tooltip = "",
  writeOutputValueToAllpvs = false,
  ...others
}: WidgetProps) => {
  const { disableProbe, index } = others;
  const theme = useTheme();
  const [value, setValue] = useState<any>(0);
  const [initialized, setInitalized] = useState(false);
  const [immediateValue, setImmediateValue] = useState(null);
  const [commitChange, setCommitChange] = useState(false);
  const [newValueTrigger, setNewValueTrigger] = useState(0);
  const [outputValue, setOutputValue] = useState(null);
  const [focus, setFocus] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [enumStrings, setEnumStrings] = useState<string[]>([]);
  const [alarmSeverity, setAlarmSeverity] = useState<
    string | undefined | number
  >(0);
  const [min, setMin] = useState<number | undefined>(0);
  const [prec, setPrec] = useState<number | undefined>(0);
  const [max, setMax] = useState<number | undefined>(0);
  const [units, setUnits] = useState("");
  const [label, setLabel] = useState("");
  const [passedTooltip] = useState(replaceMacros(tooltip));
  const [pv, setPv] = useState<PVType>({
    value: 0,
    label: "",
    pvName: "",
    initialized: false,
    PVs: [],
    metadata: {
      initialized: false,
      pvname: "",
      value: "",
      char_value: "",
      alarmColor: "",
      lower_disp_limit: "",
      upper_disp_limit: "",
      lower_warning_limit: "",
      upper_warning_limit: "",
      units: "",
      precision: 0,
      enum_strs: [],
      write_access: false,
    },
    timestamp: "",
    readOnly: true,
    severity: "0",
    enum_strs: [],
    units: "",
    max: 0,
    min: 0,
    prec: 0,
  });
  const [pvs, setPvs] = useState<any>([]);

  const [contextMenu, handleToggleContextMenu] = useContextMenu(
    [pv, ...pvs],
    readOnly,
    disableProbe
  );

  useEffect(() => {
    let ro = others.readOnly === true;
    if (others.pv) {
      ro = ro || pv.readOnly;
    }

    if (others.pvs) {
      pvs.forEach((item) => {
        ro = ro || item.readOnly;
      });
    }

    setReadOnly(ro);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pv, others.readOnly, pvs]);

  useEffect(() => {
    if (others.usePvLabel) {
      setLabel(pv.label);
    } else {
      setLabel(replaceMacros(others.label, others.macros));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [others.label, pv.label, others.macros]);

  useEffect(() => {
    if (others.usePvUnits) {
      if (pv.units) {
        setUnits(pv.units);
      } else {
        setUnits("");
      }
    } else {
      setUnits(replaceMacros(others.units, others.macros));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [others.units, pv.units, others.macros]);

  useEffect(() => {
    if (others.usePvPrecision) {
      setPrec(pv.prec);
    } else {
      setPrec(others.prec);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [others.prec, pv.prec, others.usePvPrecision]);

  useEffect(() => {
    if (others.usePvMinMax) {
      setMin(pv.min);
      setMax(pv.max);
    } else {
      setMin(others.min);
      setMax(others.max);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [others.min, others.max, pv.min, pv.max]);

  useEffect(() => {
    if (!focus) {
      const tempValue = checkPrecision(pv.value, prec);
      setValue(formatValue(tempValue, others.numberFormat));
      if (others.debug) {
        console.log(tempValue);
      }
    }
  }, [focus, pv.value, prec, others.numberFormat, others.debug]);

  useEffect(() => {
    let newSeverity = pv.severity;
    if (typeof others.useStringSeverityMatch !== "undefined") {
      if (others.useStringSeverityMatch === true) {
        if (typeof others.stringSeverity !== "undefined") {
          let string;
          for (string in others.stringSeverity) {
            // eslint-disable-next-line eqeqeq
            if (value == others.stringSeverity[string].stringMatch) {
              newSeverity = others.stringSeverity[string].severity;
              break;
            }
          }
        }
      }
    }
    setAlarmSeverity(newSeverity);
  }, [pv.severity, others.useStringSeverityMatch, others.stringSeverity, value]);

  useEffect(() => {
    if (immediateValue !== null) {
      const tempValue = checkPrecision(
        isInsideLimits(immediateValue, min, max),
        prec
      );
      setValue(formatValue(tempValue, others.numberFormat));
      setOutputValue(tempValue);
      setNewValueTrigger(newValueTrigger + 1);
      setImmediateValue(null);
    }
  }, [immediateValue, min, max, prec, others.numberFormat, newValueTrigger]);

  useEffect(() => {
    if (commitChange) {
      const tempValue = checkPrecision(isInsideLimits(value, min, max), prec);
      setValue(formatValue(tempValue, others.numberFormat));
      setOutputValue(tempValue);
      setNewValueTrigger(newValueTrigger + 1);
      setCommitChange(false);
    }
  }, [
    commitChange,
    min,
    max,
    prec,
    others.numberFormat,
    newValueTrigger,
    value,
  ]);

  useEffect(() => {
    if (others.custom_selection_strings) {
      setEnumStrings(
        replaceArrayMacros(others.custom_selection_strings, others.macros)
      );
    } else {
      setEnumStrings(pv.enum_strs);
    }
  }, [others.custom_selection_strings, pv.enum_strs, others.macros]);

  useEffect(() => {
    let init =
      typeof others.pv !== "undefined" || typeof others.pvs !== "undefined";

    if (others.pv) {
      init = init && pv.initialized;
    }
    if (others.pvs) {
      pvs.forEach((item) => {
        init = init && item.initialized;
      });
    }

    setInitalized(init);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pv.initialized, pvs]);

  const wrapComponent = (CustomComponent, props) => {
    return <CustomComponent {...props} />;
  };

  const hardDisabled = !initialized || readOnly || disabled;

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
  };

  const getPvs = (
    pvArray,
    widgetProps,
    prevState,
    setState,
    newValueTrigger,
    outputValue
  ) => {
    let pvs = [];
    if (typeof pvArray !== "undefined") {
      const pvs: React.ReactNode[] = [];
      pvArray.forEach((item, index) => {
        let pv;
        let props;
        if (typeof item === "object") {
          pv = item.pv;
          props = item.props;
        } else {
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
            useMetadata={useMetadata}
            macros={props.macros}
            newValueTrigger={newValueTrigger}
            outputValue={outputValue}
            useStringValue={props.useStringValue}
            initialLocalVariableValue={props.initialLocalVariableValue}
            debug={props.debug}
            pvData={(data) =>
              setState((prevState) => {
                let state = [...prevState];
                state[index] = data;
                return state;
              })
            }
          />
        );
      });
      return pvs;
    } else {
      return [];
    }
  };

  const childPv = typeof others.pv !== "undefined" && (
    <PV
      pv={others.pv}
      editMode={editMode} 
      makeNewSocketIoConnection={others.makeNewSocketIoConnection}
      maxPv={others.maxPv}
      minPv={others.minPv}
      min={others.min}
      max={others.max}
      usePvMinMax={others.usePvMinMax}
      unitsPv={others.unitsPv}
      usePvUnits={others.usePvUnits}
      alarmPv={others.alarmPv}
      labelPv={others.labelPv}
      alarmSensitive={others.alarmSensitive}
      usePvLabel={others.usePvLabel}
      usePvPrecision={others.usePvPrecision}
      prec={others.prec}
      precPv={others.precPv}
      useMetadata={useMetadata}
      macros={others.macros}
      newValueTrigger={newValueTrigger}
      outputValue={outputValue}
      useStringValue={others.useStringValue}
      initialLocalVariableValue={others.initialLocalVariableValue}
      debug={others.debug}
      pvData={setPv}
    />
  );

  const childPvs = getPvs(
    others.pvs,
    others,
    pvs,
    setPvs,
    writeOutputValueToAllpvs ? newValueTrigger : undefined,
    writeOutputValueToAllpvs ? outputValue : undefined
  );

  const handleValue = (newValue, setFunction) => {
    if (index !== undefined && Array.isArray(value)) {
      let newArrayValue = [...value];
      newArrayValue[index] = newValue;
      setFunction(newArrayValue);
    } else {
      setFunction(newValue);
    }
  };

  const child =
    others.component &&
    wrapComponent(others.component, {
      ...others,
      initialized: initialized,
      pvName: pv.pvName,
      value: index !== undefined && Array.isArray(value) ? value[index] : value,
      min: min,
      max: max,
      prec: prec,
      label: label,
      editMode: editMode,
      formControlLabel: editMode ?
        label : (
          initialized ? (
            label
          ) : (
            <span style={{ fontSize: "inherit", whiteSpace: "nowrap" }}>
              {disconnectedIcon()}
              {" " + pv.pvName}
            </span>
          )),
      units: units,
      disabled: hardDisabled,
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

      onColor: onColor,
      offColor: offColor,
      showTooltip: showTooltip,
      useMetadata: useMetadata,
      tooltip: tooltip,
      writeOutputValueToAllpvs: writeOutputValueToAllpvs,
      ...(others.componentProps ?? {}),
    });

  const divStyle = {
    width: "100%",
    height: "100%",
  };

  const Tag = others.svgWidget ? "g" : "div";
  if (others.debug) {
    console.log("Widget PVs", others.pvs);
  }

  return (
    <Tooltip
      title={passedTooltip}
      disableFocusListener={true}
      disableTouchListener={true}
      disableHoverListener={showTooltip === false}
      {...others.tooltipProps}
      key={`${others.usePvLabel},${others.pvs},${others.pv}${others.usePvMinMax}${others.usePvPrecision}${others.usePvUnits}${others.useStringValue}`}
    >
      <Tag
        style={others.svgWidget ? undefined : divStyle}
        onContextMenu={
          others.disableContextMenu ? undefined : handleToggleContextMenu
        }
      >
        {child}
        {childPv}
        {childPvs}
        {contextMenu}
      </Tag>
    </Tooltip>
  );
};

interface WidgetProps {
  /**
   * If defined, then the DataConnection will be over a new socketIO connection, otherwise the global socketIO connection.
   */
  makeNewSocketIoConnection?: boolean;
  /**
   * Directive to use the alarm severity status to alter the fields background color.
   */
  alarmSensitive?: boolean;
  /**
   * Custom PV to define the alarm severity to be used, alarmSensitive must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  alarmPv?: string;
  /**
   * If defined, then the DataConnection and the widget debugging information will be displayed.
   */
  debug?: boolean;
  /**
   * If defined, then the widget will be in edit mode.
   * If not defined, then the widget will be in view mode.
   */
  editMode?: boolean;
  /**
   * Directive to the output value to all the pvs defined in the pvs array.
   */
  writeOutputValueToAllpvs?: boolean;
  /**
   * Local variable initialization value. When using loc:// type PVs.
   */
  initialLocalVariableValue?: string;
  /**
   * Custom label to be used, if usePvLabel is not defined.
   */
  label?: string;
  /**
   * Custom PV to define the units to be used, usePvLabel must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  labelPv?: string;
  /**
   * Values of macros that will be substituted in the pv name. eg. {{'$(device)':'testIOC','$(id)':'2'}}
   */
  macros?: object;
  /**
   * Custom maximum to be used, if usePvMinMax is not defined.
   */
  max?: number;
  /**
   * Custom PV to define the maximum to be used, usePvMinMax must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  maxPv?: string;
  /**
   * Custom minimum value to be used, if usePvMinMax is not defined.
   */
  min?: number;
  /**
   * Custom PV to define the minimum to be used, usePvMinMax must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  minPv?: string;
  /**
   * When writing to the pv's output value, increment newValueTrigger to tell the pv component emit the output value to the process variable.
   */
  prec?: number;
  /**
   * Custom PV to define the precision to be used, usePvPrecision must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  precPv?: string;
  /**
   * Custom units to be used, if usePvUnits is not defined.
   */
  units?: string;
  /**
   * Custom PV to define the units to be used, usePvUnits must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  unitsPv?: string;
  /**
   * Directive to fill the component's label with the value contained in the pv metadata's DESC field or the labelPv value.
   * If not defined it uses the custom label as defined by the label prop.
   */
  usePvLabel?: boolean;
  /**
   * When using EPICS, the RAS pv's metadata is conventionally derived from the pyEpics PV in the pvserver.
   * The pyEpics metadata is unfortunately static and the values used will be the initial values that pvserver receives when it connects the first time.
   * This is sufficient in most cases except when the user wants to dynamically update the metaData.
   * In this case a direct connection can be made to all the pv fields by setting useMetadata to false.
   * If any of the metadata pvs are defined i.e unitsPv then the PV makes a new data connection to this alternate pv and will
   * use the value provided by this pv as the units.
   * The same is the case for the precPV, labelPv, alarmPv, unitsPv, and minPv.
   * By setting useMetadata to false also enables connection to other variables as defined by different protocols.
   */
  useMetadata?: boolean;
  /**
   * Directive to use the pv metadata's HOPR and LOPR fields or the minPv and maxPv values to limit the maximum and minimum values that can be contained in the value.
   * If not defined it uses the custom min and max as defined by the min and max prop.
   */
  usePvMinMax?: boolean;
  /**
   * Directive to round the value using the precision field of the PV metadata or precPv.
   * If not defined it uses the custom precision as defined by the prec prop.
   */
  usePvPrecision?: boolean;
  /**
   * Directive to use the units contained in the pv metdata's EGU field or unitsPv.
   * If not defined it uses the custom units as defined by the units prop.
   */
  usePvUnits?: boolean;
  /**
   * Directive to use PV's string values.
   */
  useStringValue?: boolean;
  /**
   * If defined, then the string representation of the number can be formatted using the mathjs format function eg. numberFormat={{notation: 'engineering',precision: 3}}.
   * See https://mathjs.org/docs/reference/functions/format.html for more examples.
   */
  numberFormat?: object;
  /**
   * Custom on color to be used, must be derived from Material UI theme color's.
   */
  onColor?: string;
  /**
   * Custom off color to be used, must be derived from Material UI theme color's.
   */
  offColor?: string;
  /**
   * Name of the process variable, eg. '$(device):test$(id)'.
   */
  pv?: string;
  /**
   * Array of the process variables, eg. '$(device):test$(id)'.
   */
  pvs?: string[];
  /**
   * Object with a string and the corresponding severity value.
   * When PV value is equal to the string, set the corresponding severity in the widget's severity.
   * Example: { stringMatch: '1', severity: 2 }.
   */
  stringSeverity?: object;
  /**
   * Directive to override alarm severity with the rules defined in the stringSeverity.
   */
  useStringSeverityMatch?: boolean;
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
  tooltipProps?: object;

  /**
   * Indicates whether the widget is disabled.
   */
  disabled?: boolean;
  /**
   * read-only property.
   * If defined, then the widget will be read-only.
   * If not defined, then the widget will be read-only if the pv is read-only.
   */
  readOnly?: boolean;

  /**
   * Index of the value to be displayed.
   */
  index?: number;
  /**
   * Disable probe. If defined, then the probe will be disabled.
   * If not defined, then the probe will be enabled.
   * The probe is used to display the value of the widget in the probe component.
   * The probe component is a floating window that displays the value of the widget.
   */
  disableProbe?: boolean;
  /**
   * Component to be rendered.
   *
   */
  component?: any;
  /**
   * Custom selection strings to be used.
   */
  custom_selection_strings?: string[];
  /**
   * Directive to infer an SVG widget.
   */
  svgWidget?: boolean;
  /**
   * Directive to disable the context menu.
   */
  disableContextMenu?: boolean;
  /**
   * 
   *  Label placement
   */
  labelPlacement?: "start" | "top" | "bottom" | "end";
  /**
   * Component specific props that are not part of the standard widget. 
   * You can pass any prop that the component accepts, eg. componentProps={{variant: 'outlined'}}. 
   * Be sure to check the component's documentation for the available props.
   *  Do not use this prop to pass the standard widget props, use the standard props instead.
   */
  componentProps?: object;

}

export default Widget;
