const nonNegativeInteger = (props, propName, componentName) => {
  if (!(Number.isInteger(props[propName]) && props[propName] >= 0)) {
    return new Error(
      "Invalid prop `" +
        propName +
        "` supplied to" +
        " `" +
        componentName +
        "`. Prop `" +
        propName +
        "` must be a non negative integer. Validation failed."
    );
  }
};

export default { nonNegativeInteger };
