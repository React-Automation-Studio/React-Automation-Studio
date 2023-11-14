import React, { Children, cloneElement, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormControlLabel, useTheme } from "@mui/material";
import widgetProps from "../SystemComponents/Utils/widgetProps";

/**
 * How can we display waveforms as list of BaseComponents?
 *
 * The `ArrayContainer` receives as a child one or more BaseComponents
 * and create a list of these assigning to each one the corresponding value
 * of the array stored in the PV.
 *
 * For example you have a waveform of 5 values and you want
 * to modify each array value independently; users can pass, to the
 * `ArrayContainer`, a `TextInput` connected to the target pv.
 * The `ArrayContainer` component will automatically
 * create 5 TextInputs where each one can show and edit only one
 * value of the array stored in the PV.
 * See examples below.
 *
 * The `ArrayContainer` needs some props to correctly instantiates the widgets.
 *
 * Currently this feature can't be used with BaseComponents
 * based on mbbo/mbbi PVs (i.e. RadioButtonGroup, SelectionInput,
 * SelectionList) and Graphs.
 */
function ArrayContainer(props) {
  const {
    registers,
    registersLabel,
    label,
    labelPlacement,
    direction,
    visibleItemsCount,
    maxItemsCount,
    itemMinWidth,
    spacing,
    showIndices,
  } = props;
  const theme = useTheme();
  const [startIdx, setStartIdx] = useState(0);
  const [items, setItems] = useState([]);

  let maxItems = 100;
  let numVisibleItems = 10;
  if (registers !== undefined && Array.isArray(registers)) {
    numVisibleItems = registers.length;
    maxItems = registers.length;
  } else if (maxItemsCount !== undefined) {
    maxItems = maxItemsCount;
    if (visibleItemsCount === undefined && numVisibleItems > maxItems) {
      numVisibleItems = maxItems;
    }
  }
  if (
    visibleItemsCount !== undefined &&
    !(
      registers !== undefined &&
      Array.isArray(registers) &&
      registers.length <= visibleItemsCount
    )
  ) {
    numVisibleItems = visibleItemsCount;
  }

  useEffect(() => {
    let newItems = [];
    for (let i = 0; i < numVisibleItems; i++) {
      newItems.push({
        index: i,
        component: recreateSingleChild(i),
      });
    }
    setItems(newItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numVisibleItems]);

  const updateItems = (newStartIdx) => {
    let newItems = [...items];
    if (newStartIdx < startIdx) {
      let newItem = {
        index: newStartIdx,
        component: recreateSingleChild(newStartIdx),
      };
      newItems.pop();
      newItems = [newItem].concat(newItems);
    } else {
      let idx = newItems[newItems.length - 1].index + 1;
      newItems.splice(0, 1);
      let newItem = {
        index: idx,
        component: recreateSingleChild(idx),
      };
      newItems.push(newItem);
    }
    setItems(newItems);
    setStartIdx(newStartIdx);
  };

  const handleWheel = (e) => {
    if (e.deltaY < 0 && startIdx > 0) {
      e.preventDefault();
      updateItems(startIdx - 1);
    } else if (e.deltaY > 0 && startIdx + numVisibleItems < maxItems) {
      e.preventDefault();
      updateItems(startIdx + 1);
    }
  };

  const recreateSingleChild = (index) => {
    let additionalProps = {};

    if (registers !== undefined && Array.isArray(registers)) {
      additionalProps["index"] = registers[index];
    } else {
      additionalProps["index"] = index;
    }
    if (
      registersLabel !== undefined &&
      Array.isArray(registersLabel) &&
      registersLabel[index]
    ) {
      additionalProps["label"] = registersLabel[index].toString();
    } else if (showIndices) {
      additionalProps["label"] = index.toString();
    }

    return (
      <div
        key={index.toString()}
        style={{
          padding: theme.spacing(spacing),
          display: direction === "horizontal" ? "inline-block" : undefined,
          width:
            direction === "horizontal"
              ? Math.max(
                  parseFloat(100 / numVisibleItems).toFixed(2),
                  itemMinWidth
                ) + "%"
              : undefined,
        }}
      >
        {Children.map(props.children, (child) =>
          cloneElement(child, additionalProps)
        )}
      </div>
    );
  };

  let visibleItems = [];
  items.forEach((item) => {
    if (item.index >= startIdx && item.index < startIdx + numVisibleItems) {
      visibleItems.push(item.component);
    }
  });

  return (
    <FormControlLabel
      sx={{
        width: "100%",
        paddingRight: "20px",
      }}
      label={label}
      labelPlacement={labelPlacement}
      control={
        <div
          style={{
            width: "100%",
          }}
          onWheelCapture={handleWheel}
          onClick={(e) => e.preventDefault()}
        >
          {visibleItems}
        </div>
      }
    />
  );
}

ArrayContainer.propTypes = {
  /**
   * Custom label to be used, if  usePvLabel is not defined.
   */
  label: PropTypes.string,
  /**
   * Label placement position
   */
  labelPlacement: PropTypes.oneOf(["start", "top", "bottom", "end"]),
  /**
   * Users can choose how many items they want to show.
   * If not specified, the default value is 10.
   * If not specified and the `registers` prop is a valid array
   * `visibleItemsCount` is the length of the `registers` array.
   * If defined the number of visible elements,
   * in any case, is equal to this number.
   * Must be a non negative integer.
   */
  visibleItemsCount: (props, propName, componentName) => {
    widgetProps.nonNegativeInteger(props, propName, componentName);
    if (props[propName] > props.maxItemsCount) {
      return new Error(
        "Invalid prop `" +
          propName +
          "` supplied to" +
          " `" +
          componentName +
          "`. Prop `" +
          propName +
          "` must be lower or equal than `maxItemsCount`. Validation failed."
      );
    }
  },
  /**
   * Max items in the array.
   * If not specified, the default value is 100.
   * If not specified and the `registers` prop is a valid array
   * `maxItemsCount` is the length of the `registers` array.
   * If defined the number of total elements,
   * in any case, is equal to this number.
   * Must be a non negative integer and greater or equal than `visibleItemsCount`
   */
  maxItemsCount: widgetProps.nonNegativeInteger,
  /**
   * When receiving a PV storing an array of values users can choose a subset of these value.
   * Registers accept the indexes of the registers to effectively show.
   * Order does count!
   */
  registers: PropTypes.arrayOf(widgetProps.nonNegativeInteger),
  /**
   * When receiving a PV storing an array of values users can assign a label to each register
   * or a subset of them.
   */
  registersLabel: PropTypes.arrayOf(PropTypes.string),
  /**
   * Directive to use the array indices as the labels, unless the registersLabel prop is defined
   */
  showIndices: PropTypes.bool,
  /**
   * Directive to display array elements horizontally or vertically aligned.
   */
  direction: PropTypes.oneOf(["vertical", "horizontal"]),
  /**
   * Min space width, in percentage, an item can occupy.
   */

  itemMinWidth: (props, propName, componentName) => {
    if (!(props[propName] >= 0 && props[propName] <= 100)) {
      return new Error(
        "Invalid prop `" +
          propName +
          "` supplied to" +
          " `" +
          componentName +
          "`. Prop `" +
          propName +
          "` must be a floating number between 0 and 100. Validation failed."
      );
    }
  },
  /**
   * Spacing between items. Follows the same logic as grid container's spacing.
   * Must be a non negative integer.
   */
  spacing: widgetProps.nonNegativeInteger,
};

ArrayContainer.defaultProps = {
  direction: "vertical",
  labelPlacement: "top",
  itemMinWidth: 2,
  spacing: 1,
  showIndices: true,
};

export default ArrayContainer;
export { ArrayContainer };
