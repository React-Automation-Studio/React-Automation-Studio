import { useEffect, useState } from "react";
import { replaceMacros } from "./macroReplacement";

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

export { useMinMax, usePrec, useUnits };
