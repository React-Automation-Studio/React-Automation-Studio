import { useEffect, useState } from "react";
import { replaceArrayMacros, replaceMacros } from "./macroReplacement";

const useAlarmSeverity = (props, pv) => {
  const {
    useStringSeverityMatch,
    stringSeverity: usersSeverityStrings,
  } = props;
  const { severity: pvSeverity, value } = pv;
  const [alarmSeverity, setAlarmSeverity] = useState(0);
  useEffect(() => {
    if (useStringSeverityMatch && usersSeverityStrings !== undefined) {
      for (let string in usersSeverityStrings) {
        if (
          value.toString() ===
          usersSeverityStrings[string].stringMatch.toString()
        ) {
          setAlarmSeverity(usersSeverityStrings[string].severity);
          break;
        }
      }
    } else {
      setAlarmSeverity(pvSeverity);
    }
  }, [pvSeverity, useStringSeverityMatch, usersSeverityStrings, value]);
  return alarmSeverity;
};

const useEnumStrings = (props, pv) => {
  const { custom_selection_strings, macros } = props;
  const { enum_strs } = pv;
  const [enumStrings, setEnumStrings] = useState([]);
  useEffect(() => {
    if (custom_selection_strings) {
      setEnumStrings(replaceArrayMacros(custom_selection_strings, macros));
    } else {
      setEnumStrings(enum_strs);
    }
  }, [custom_selection_strings, enum_strs, macros]);
  return enumStrings;
};

const useInitialized = (props, pv, pvs) => {
  const { pv: userPv, pvs: userPvs } = props;
  const { initialized: pvInitialized } = pv;
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (userPv) {
      setInitialized(pvInitialized);
    }
    if (userPvs) {
      let init = true;
      pvs.forEach((item) => {
        init = init && item.initialized;
      });
      setInitialized(init);
    }
  }, [userPv, userPvs, pvInitialized, pvs]);
  return initialized;
};

const useLabel = (props, pv) => {
  const { usePvLabel, label: userLabel, macros } = props;
  const { label: pvLabel } = pv;
  const [label, setLabel] = useState("");
  useEffect(() => {
    if (usePvLabel) {
      setLabel(pvLabel);
    } else {
      setLabel(replaceMacros(userLabel, macros));
    }
  }, [usePvLabel, userLabel, pvLabel, macros]);
  return label;
};

const useMinMax = (props, pv) => {
  const { usePvMinMax, min: userMin, max: userMax } = props;
  const { min: pvMin, max: pvMax } = pv;
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  useEffect(() => {
    if (usePvMinMax) {
      setMin(pvMin);
      setMax(pvMax);
    } else {
      if (userMin !== undefined) setMin(userMin);
      if (userMax !== undefined) setMax(userMax);
    }
  }, [usePvMinMax, userMin, userMax, pvMin, pvMax]);
  return { min: min, max: max };
};

const usePrec = (props, pv) => {
  const { usePvPrecision, prec: userPrec } = props;
  const { prec: pvPrec } = pv;
  const [prec, setPrec] = useState(0);
  useEffect(() => {
    if (usePvPrecision) {
      setPrec(pvPrec);
    } else {
      setPrec(userPrec);
    }
  }, [userPrec, pvPrec, usePvPrecision]);
  return prec;
};

const useReadOnly = (props, pv, pvs) => {
  const { readOnly: userReadOnly, pv: userPv, pvs: userPvs } = props;
  const { readOnly: pvReadOnly } = pv;
  const [readOnly, setReadOnly] = useState(true);
  useEffect(() => {
    let ro = userReadOnly;
    if (userPv) {
      ro = ro || pvReadOnly;
    }
    if (userPvs) {
      pvs.forEach((item) => {
        ro = ro || item.readOnly;
      });
    }
    setReadOnly(ro);
  }, [userPv, userPvs, userReadOnly, pvReadOnly, pvs]);
  return readOnly;
};

const useUnits = (props, pv) => {
  const { usePvUnits, units: userUnits, macros } = props;
  const { units: pvUnits } = pv;
  const [units, setUnits] = useState("");
  useEffect(() => {
    if (usePvUnits) {
      if (pvUnits) {
        setUnits(pvUnits);
      } else {
        setUnits("");
      }
    } else {
      setUnits(replaceMacros(userUnits, macros));
    }
  }, [usePvUnits, userUnits, pvUnits, macros]);
  return units;
};

export {
  useAlarmSeverity,
  useEnumStrings,
  useInitialized,
  useLabel,
  useMinMax,
  usePrec,
  useReadOnly,
  useUnits,
};
