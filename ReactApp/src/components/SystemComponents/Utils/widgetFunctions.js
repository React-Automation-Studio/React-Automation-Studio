import React from "react";
import { create, all } from "mathjs";
import { replaceMacros } from "./macroReplacement";

const config = {};
const math = create(all, config);

const applyPrecision = (value, precision) => {
  if (!isNaN(value)) {
    return value.toFixed(precision);
  }
  return value;
};

const checkPrecision = (value, prec) => {
  const precision = parseInt(prec);
  if (prec !== undefined && !isNaN(precision)) {
    let tempValue;
    if (Array.isArray(value)) {
      tempValue = value.map((val) => {
        const floatValue = parseFloat(val);
        return applyPrecision(floatValue, precision);
      });
      return tempValue;
    } else {
      tempValue = parseFloat(value);
      return applyPrecision(tempValue, precision);
    }
  } else {
    return value;
  }
};

const formatValue = (value, numberFormat) => {
  if (numberFormat !== undefined) {
    let formatValue;
    if (Array.isArray(value)) {
      formatValue = value.map((val) =>
        math.format(parseFloat(val), numberFormat)
      );
    } else {
      formatValue = math.format(parseFloat(value), numberFormat);
    }
    return formatValue;
  } else {
    return value;
  }
};

const getContextPVs = (pvs) => {
  let newContextPVs = [];
  pvs.forEach((item) => newContextPVs.push(...item.PVs));
  return newContextPVs;
};

const getTooltipProps = (props) => {
  const { tooltip: userTooltip, tooltipProps, showTooltip, macros } = props;
  const tooltip = replaceMacros(userTooltip, macros);
  return {
    title: tooltip,
    disableFocusListener: true,
    disableTouchListener: true,
    disableHoverListener: !showTooltip,
    ...tooltipProps,
  };
};

const isInsideLimits = (value, min, max) => {
  if (min !== undefined || max !== undefined) {
    let tempValue;
    if (Array.isArray(value)) {
      tempValue = value.map((v) => {
        let tempV = parseFloat(v);
        if (!isNaN(tempV)) {
          tempV = tempV > max ? max : tempV;
          tempV = tempV < min ? min : tempV;
        }
        return tempV;
      });
      return tempValue;
    }
    tempValue = parseFloat(value);
    if (!isNaN(tempValue)) {
      tempValue = tempValue > max ? max : tempValue;
      tempValue = tempValue < min ? min : tempValue;
    }
    return tempValue;
  } else {
    if (Array.isArray(value)) {
      return value.map((v) => {
        let val = parseFloat(v);
        return isNaN(val) ? v : val;
      });
    }
    return value;
  }
};

const wrapComponent = (CustomComponent, props) => {
  return <CustomComponent {...props} />;
};

export {
  checkPrecision,
  formatValue,
  getContextPVs,
  getTooltipProps,
  isInsideLimits,
  wrapComponent,
};
