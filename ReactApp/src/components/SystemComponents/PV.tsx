import React, { useState, useEffect, useCallback } from "react";
import EpicsPV from "./EpicsPV";
import LocalPV from "./LocalPV";
import {EpicsPVType} from "./EpicsPV";

/**
 * Type definition for the PV object.
 */
export type PVType = {
  initialized: boolean;
  pvName: string;
  value: number | string;
  severity: string | undefined;
  timestamp: string | undefined;
  metadata: {
    initialized: boolean;
    pvname: string;
    value: string;
    char_value: string;
    alarmColor: string;
    lower_disp_limit: string;
    upper_disp_limit: string;
    lower_warning_limit: string;
    upper_warning_limit: string;
    units: string;
    precision: number;
    enum_strs: string[];
    write_access: boolean;
  };
  label: string;
  max?: number|undefined;
  min?: number|undefined;
  prec?: number|undefined;
  units: string;
  readOnly: boolean;
  PVs: any[];
  enum_strs: string[];
  
};

/**
 * Props definition for the PV component.
 */
interface PVProps {
  /**
   * If defined, then the DataConnection will be over a new socketIO connection, otherwise the global socketIO connection.
   */
  makeNewSocketIoConnection?: boolean;
  /**
   * Directive to use the alarm severity status to alter the field's background color.
   */
  alarmSensitive?: boolean;
  /**
   * Custom PV to define the alarm severity to be used. `alarmSensitive` must be set to `true` and `useMetadata` to `false`. Example: `$(device):test$(id)`.
   */
  alarmPv?: string;
  /**
   * If defined, then the DataConnection and the widget debugging information will be displayed.
   */
  debug?: boolean;
  /**
   * Local variable initialization value. When using `loc://` type PVs.
   */
  initialLocalVariableValue?: string;
  /**
   * Custom label to be used if `usePvLabel` is not defined.
   */
  label?: string;
  /**
   * Custom PV to define the units to be used. `usePvLabel` must be set to `true` and `useMetadata` to `false`. Example: `$(device):test$(id)`.
   */
  labelPv?: string;
  /**
   * Values of macros that will be substituted in the PV name. Example: `{'$(device)':'testIOC','$(id)':'2'}`.
   */
  macros?: object;
  /**
   * Custom maximum to be used if `usePvMinMax` is not defined.
   */
  max?: number;
  /**
   * Custom PV to define the maximum to be used. `usePvMinMax` must be set to `true` and `useMetadata` to `false`. Example: `$(device):test$(id)`.
   */
  maxPv?: string;
  /**
   * Custom minimum value to be used if `usePvMinMax` is not defined.
   */
  min?: number;
  /**
   * Custom PV to define the minimum to be used. `usePvMinMax` must be set to `true` and `useMetadata` to `false`. Example: `$(device):test$(id)`.
   */
  minPv?: string;
  /**
   * When writing to the PV's output value, increment `newValueTrigger` to tell the PV component to emit the output value to the process variable.
   */
  newValueTrigger?: number;
  /**
   * The output value to the process variable. It is only emitted once the `newValueTrigger` is incremented.
   */
  outputValue?: any;
  /**
   * Custom precision to round the value.
   */
  prec?: number;
  /**
   * Custom PV to define the precision to be used. `usePvPrecision` must be set to `true` and `useMetadata` to `false`. Example: `$(device):test$(id)`.
   */
  precPv?: string;
  /**
   * Name of the process variable. Example: `$(device):test$(id)`.
   */
  pv: string;
  /**
   * A function that returns the PV object.
   */
  pvData?: (pv:PVType) => void;
  
  /**
   * Custom units to be used if `usePvUnits` is not defined.
   */
  units?: string;
  /**
   * Custom PV to define the units to be used. `usePvUnits` must be set to `true` and `useMetadata` to `false`. Example: `$(device):test$(id)`.
   */
  unitsPv?: string;
  /**
   * Directive to fill the component's label with the value contained in the PV metadata's DESC field or the `labelPv` value.
   * If not defined, it uses the custom label as defined by the `label` prop.
   */
  usePvLabel?: boolean;
  /**
   * When using EPICS, the RAS PV's metadata is conventionally derived from the pyEpics PV in the pvserver.
   * The pyEpics metadata is unfortunately static and the values used will be the initial values that pvserver receives when it connects the first time.
   * This is sufficient in most cases except when the user wants to dynamically update the metaData.
   * In this case, a direct connection can be made to all the PV fields by setting `useMetadata` to `false`.
   * If any of the metadata PVs are defined (e.g., `unitsPv`), then the PV makes a new data connection to this alternate PV and will
   * use the value provided by this PV as the units.
   * The same is the case for `precPv`, `labelPv`, `alarmPv`, `unitsPv`, and `minPv`.
   * By setting `useMetadata` to `false`, it also enables connection to other variables as defined by different protocols.
   */
  useMetadata?: boolean;
  /**
   * Directive to use the PV metadata's HOPR and LOPR fields or the `minPv` and `maxPv` values
   * to limit the maximum and minimum values that can be contained in the value.
   * If not defined, it uses the custom min and max as defined by the `min` and `max` prop.
   */
  usePvMinMax?: boolean;
  /**
   * Directive to round the value using the precision field of the PV metadata or `precPv`.
   * If not defined, it uses the custom precision as defined by the `prec` prop.
   */
  usePvPrecision?: boolean;
  /**
   * Directive to use the units contained in the PV metadata's EGU field or `unitsPv`.
   * If not defined, it uses the custom units as defined by the `units` prop.
   */
  usePvUnits?: boolean;
  /**
   * Directive to use PV's string values.
   */
  useStringValue?: boolean;
  /**
   * Directive to use numpy binary value of the PV value.
   */
  useBinaryValue?: boolean;

  /**
   * A function that returns the PV object.
   */
  children?: (pv: any) => React.ReactNode;
  /**
   * A function that returns the contextInfo.
   */
  contextInfo?: (pv: any) => void;
}

/**
 * The PV component handles connections to EPICS process variables and local process vairable.
 * This is done by defining the pv name in the pv prop and using a prefix "loc://" for local variable.
 * The PV component also performs macro substitution on the pv prop using the macros prop.
 * The pv state can be raised as an object using the pvData callback or passed to child function component. All the data in this pv object is valid when pv.initialized===true
 */
const PV = ({
  debug = false,
  useMetadata = true,
  makeNewSocketIoConnection = false,
  useBinaryValue = false,
  ...props
}: PVProps) => {

  const [pvs, setPvs] = useState<{ data?: EpicsPVType | null; max?: any | null; min?: any | null; label?: any | null; units?: any | null; precision?: any | null; alarm?: any | null }|null>(
   
  null);
  const [pv, SetPv] = useState<PVType>({
    value: 0,
    label: "",
    initialized: false,
    PVs: [],
    pvName: "",
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
    severity: "0",
    timestamp: "",
    units: "",
    min: 0,
    max: 0,
    prec: 0,
    readOnly: true,
    enum_strs: [],
  });

  const pvConnection = (pv, props) => {
    let pvname = pv.toString();
    if (props.macros) {
      let macro;
      for (macro in props.macros) {
        pvname = pvname.replace(
          macro.toString(),
          props.macros[macro].toString()
        );
      }
    }
    return pvname.includes("loc://")
      ? LocalPV({ ...props, pv: pvname })
      : EpicsPV({ ...props, pv: pvname });
  };

  const processPvDataData = useCallback((data:EpicsPVType) => {
    setPvs((pvs) => ({ ...pvs, data }));
  }, []);
  const dataPv = pvConnection(props.pv, {
    macros: props.macros,
    newValueTrigger: props.newValueTrigger,
    outputValue: props.outputValue,
    useStringValue: props.useStringValue,
    initialLocalVariableValue: props.initialLocalVariableValue,
    makeNewSocketIoConnection: makeNewSocketIoConnection,
    debug: debug,
    useBinaryValue: useBinaryValue,
    pvData: processPvDataData,
  });

  const processPvDataMax = useCallback((max) => {
    setPvs((pvs) => ({ ...pvs, max }));
  }, []);
  let maxPv =
    !useMetadata && props.usePvMinMax
      ? pvConnection(props.maxPv ? props.maxPv : props.pv + ".HOPR", {
          macros: props.macros,
          debug: debug,
          initialLocalVariableValue: props.initialLocalVariableValue,
          pvData: processPvDataMax,
        })
      : undefined;
  const processPvDataMin = useCallback((min) => {
    setPvs((pvs) => ({ ...pvs, min }));
  }, []);
  let minPv =
    !useMetadata && props.usePvMinMax
      ? pvConnection(props.minPv ? props.minPv : props.pv + ".LOPR", {
          macros: props.macros,
          debug: debug,
          initialLocalVariableValue: props.initialLocalVariableValue,
          pvData: processPvDataMin,
        })
      : undefined;
  const processPvDataLabel = useCallback((label) => {
    setPvs((pvs) => ({ ...pvs, label }));
  }, []);
  let labelPv = props.usePvLabel
    ? pvConnection(props.labelPv ? props.labelPv : props.pv + ".DESC", {
        macros: props.macros,
        useStringValue: true,
        debug: debug,
        initialLocalVariableValue: props.initialLocalVariableValue,
        pvData: processPvDataLabel,
      })
    : undefined;
  const processPvDataUnits = useCallback((units) => {
    setPvs((pvs) => ({ ...pvs, units }));
  }, []);
  let unitsPv =
    !useMetadata && props.usePvUnits
      ? pvConnection(props.unitsPv ? props.unitsPv : props.pv + ".EGU", {
          macros: props.macros,
          useStringValue: true,
          debug: debug,
          initialLocalVariableValue: props.initialLocalVariableValue,
          pvData: processPvDataUnits,
        })
      : undefined;
  const processPvDataPrecision = useCallback((precision) => {
    setPvs((pvs) => ({ ...pvs, precision }));
  }, []);
  let precisionPv =
    !useMetadata && props.usePvPrecision
      ? pvConnection(props.precPv ? props.precPv : props.pv + ".PREC", {
          macros: props.macros,
          useStringValue: true,
          debug: debug,
          initialLocalVariableValue: props.initialLocalVariableValue,
          pvData: processPvDataPrecision,
        })
      : undefined;
  const processPvDataAlarm = useCallback((alarm) => {
    setPvs((pvs) => ({ ...pvs, alarm }));
  }, []);
  let alarmPv =
    !useMetadata && props.alarmSensitive
      ? pvConnection(props.alarmPv ? props.alarmPv : props.pv + ".SEVR", {
          macros: props.macros,
          debug: debug,
          initialLocalVariableValue: props.initialLocalVariableValue,
          pvData: processPvDataAlarm,
        })
      : undefined;

  useEffect(() => {
    if (debug) {
      console.log("use effect PV render");
    }

    let pv: PVType = {
      initialized: false,
      pvName: "",
      value: 0,
      severity: "",
      timestamp: "",
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
      label: "",
      max: 0,
      min: 0,
      prec: 0,
      units: "",
      readOnly: true,
      PVs: [],
      enum_strs: [],
    };
    if (pvs) {
      pv.value = pvs.data ? pvs.data.value : "";
      pv.pvName = pvs.data ? pvs.data.pvname : "";
      pv.severity = pvs.data ? pvs.data.severity : "";
      pv.timestamp = pvs.data ? pvs.data.timestamp : "";
      pv.metadata = pvs.data ? pvs.data.metadata : {
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
      };
      pv.enum_strs = pvs.data ? pvs.data.metadata.enum_strs : [];
      pv.label = props.usePvLabel
        ? pvs.label
          ? pvs.label.value
          : ""
        : props.label;
      pv.max = props.usePvMinMax
        ? useMetadata
          ? pvs.data
            ? pvs.data.metadata.upper_disp_limit
            : ""
          : pvs.max
            ? pvs.max.value
            : ""
        : props.max;
      pv.min = props.usePvMinMax
        ? useMetadata
          ? pvs.data
            ? pvs.data.metadata.lower_disp_limit
            : ""
          : pvs.min
            ? pvs.min.value
            : ""
        : props.min;
      pv.prec = props.usePvPrecision
        ? useMetadata
          ? pvs.data
            ? pvs.data.metadata.precision
            : ""
          : pvs.precision
            ? pvs.precision.value
            : ""
        : props.prec;
      pv.units = props.usePvUnits
        ? useMetadata
          ? pvs.data
            ? pvs.data.metadata.units
            : ""
          : pvs.units
            ? pvs.units.value
            : ""
        : props.units;
      let initialized = true;
      let pvArray: any[] = []; // Add type annotation for pvArray
      let pvKeys: string[] = Object.keys(pvs); // Add type annotation for pvKeys
      for (let index in pvKeys) {
        initialized = initialized && pvs[pvKeys[index]].initialized;
        if (pvs[pvKeys[index]].pvname) {
          pvArray.push(pvs[pvKeys[index]]);
        }
      }
      pv.initialized = initialized;
      if (pv.initialized) {
        pv.readOnly = !pv.metadata.write_access;
      } else {
        pv.readOnly = true;
      }
      pv.PVs = pvArray;
      SetPv(pv);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pvs]);

  useEffect(() => {
    if (typeof props.pvData !== "undefined") {
      props.pvData(pv);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pv]);

  const contextPVs = pv.PVs;

  useEffect(() => {
    if (typeof props.contextInfo !== "undefined") {
      props.contextInfo(contextPVs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextPVs]);

  if (debug) {
    console.log(`PV ${props.pv}:`, { props, pv, pvs });
  }

  return (
    <React.Fragment>
      {dataPv}
      {maxPv}
      {minPv}
      {labelPv}
      {unitsPv}
      {precisionPv}
      {alarmPv}
      {props.children ? props.children(pv) : null}
    </React.Fragment>
  );
};

export default PV;
