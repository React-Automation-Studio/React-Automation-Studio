import React from "react";
import { FormControlLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Widget from "../SystemComponents/Widgets/Widget";

const useStyles = makeStyles((theme) => ({
  formLabel: {
    height: "100%",
    width: "100%",
    margin: "auto",
  },
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

function ComponentList(props) {
  const {
    actionValue,
    actionString,
    alignHorizontal,
    initialized,
    InputComponent,
    formControlLabel,
    labelPlacement,
    elementLabel,
    elementLabelPlacement,
    elementActionValue,
    elementActionString,
    value,
    numberOfVisibleElements,
    stretch,
  } = props;

  let width;
  if (initialized && alignHorizontal && stretch) {
    let length = value.length === undefined ? 1 : value.length;
    if (numberOfVisibleElements !== undefined) {
      let numVisibleElem = Math.max(1, parseInt(numberOfVisibleElements));
      length = Math.min(length, numVisibleElem);
    }
    width = 100 / length + "%";
  }
  console.log(width)

  const classes = useStyles({ width });

  const setValue = (arrayValue, singleValue, idx) => {
    if (arrayValue !== undefined && arrayValue.length > idx) {
      return arrayValue[idx];
    }
    return singleValue;
  };

  let list = value.map((v, idx) => {
    const handleChange = (v) => {
      let newValue = [...value];
      newValue[idx] = v;
      props.handleChange(newValue);
    };

    const handleImmediateChange = (v) => {
      let newValue = [...value];
      newValue[idx] = v;
      props.handleImmediateChange(newValue);
    };

    if (
      numberOfVisibleElements === undefined ||
      (numberOfVisibleElements > 0 && idx < numberOfVisibleElements)
    ) {
      let componentLabel = setValue(elementLabel, undefined, idx);
      let componentActionValue = setValue(elementActionValue, actionValue, idx);
      let componentActionString = setValue(
        elementActionString,
        actionString,
        idx
      );
      return (
        <span
          className={
            alignHorizontal ? classes.horizontalSpan : classes.verticalSpan
          }
          key={"elem" + idx}
        >
          <InputComponent
            {...props}
            value={v}
            formControlLabel={componentLabel}
            label={componentLabel}
            labelPlacement={elementLabelPlacement}
            actionValue={componentActionValue}
            actionString={componentActionString}
            handleChange={handleChange}
            handleImmediateChange={handleImmediateChange}
          />
        </span>
      );
    }
    return;
  });

  return (
    <FormControlLabel
      className={classes.formLabel}
      label={formControlLabel}
      labelPlacement={labelPlacement}
      control={<div>{list}</div>}
    />
  );
}

function ArrayContainerComponent(props) {
  const { containerComponent, formControlLabel, initialized, value } = props;
  let core = formControlLabel;
  if (initialized && Array.isArray(value)) {
    core = <ComponentList InputComponent={containerComponent} {...props} />;
  }
  return <div>{core}</div>;
}

/**
 * The ArrayContainer is a wrapper to show,
 * for each value of the array stored in the connected PV,
 * the component passed to the component props.
 *
 * If you want to reuse the widget components you need to use
 * the desired widget's inner component.
 * For example if you want to create an ArrayContainer with a multiple TextInput
 * you need to pass to the component prop *TextInputComponent*.
 *
 * In addiction to the props presented in this guide user can pass to
 * ArrayContainer all the props that must be forwarded to the component
 * passed to the component prop.
 *
 * Currently it can't be used with components based on mbbo/mbbi PVs
 * (i.e. RadioButtonGroup, SelectionInput, SelectionList).
 */
function ArrayContainer(props) {
  return (
    <Widget
      {...props}
      component={ArrayContainerComponent}
      containerComponent={props.component}
      pvs={undefined}
      useStringValue={false}
    />
  );
}

ArrayContainer.propTypes = {
  /**
   * Max number of visible elements.
   * It must be a positive, non zero, integer.
   * If not defined it is equal to the array length.
   */
  numberOfVisibleElements: PropTypes.number,
  /**
   * Each element of the array can have a personal label.
   * This props expect a list with the label to assign, in order,
   * to each component.
   * This prop is applied only if the received component
   * expects the prop *label*.
   */
  elementLabel: PropTypes.array,
  /**
   * Single element label position.
   * This prop is applied only if the received component
   * expects the prop *labelPlacement*.
   */
  elementLabelPlacement: PropTypes.oneOf(["top", "bottom", "start", "end"]),
  /**
   * Single element action string.
   * This prop is applied only if the received component
   * expects the prop *actionString*.
   */
  elementActionString: PropTypes.array,
  /**
   * Single element action value.
   * This prop is applied only if the received component
   * expects the prop *actionValue*.
   */
  elementActionValue: PropTypes.arrayOf(PropTypes.number),
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

ArrayContainer.defaultProps = {
  alignHorizontal: false,
  stretch: true,
};

export default ArrayContainer;
export { ArrayContainerComponent, ArrayContainer };
