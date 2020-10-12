import { useEffect, useState } from "react";
import { replaceArrayMacros, replaceMacros } from "./macroReplacement";

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
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
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

export { useEnumStrings, useLabel, useMinMax, usePrec, useUnits };
