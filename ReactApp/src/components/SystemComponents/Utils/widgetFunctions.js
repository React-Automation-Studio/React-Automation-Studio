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

export { checkPrecision };
