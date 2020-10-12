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
  }, [userUnits, pvUnits, macros]);
  return units;
};

export { useUnits };
