import React, { Children, cloneElement, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormControlLabel, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  item: ({ direction, numVisibleItems, itemMinWidth }) => {
    if (direction === "horizontal") {
      let width = parseFloat(100 / numVisibleItems).toFixed(2);
      width = Math.max(width, itemMinWidth) + "%";
      return {
        display: "inline-block",
        width: width,
      };
    } else {
      return {};
    }
  },
  container: {
    width: "100%",
  },
  form: {
    width: "100%",
    paddingRight: "20px",
  },
}));

/**
 * Each BaseComponent, when receiving a waveform PV,
 * can create an instance of the graphical BaseComponents
 * for each value of the array stored in the connected PV.
 *
 * For example you have a waveform of 5 values and you want
 * to modify each array value independently; you can pass to the
 * pv prop of a TextInput this pv, then the TextInput will automatically
 * create 5 TextInputs where each one can show and edit only one
 * value of the array stored in the PV.
 * See examples below.
 *
 * All BaseComponents, in addiction to their specific props,
 * can receive the following props.
 *
 * Currently this feature can't be used with components based on mbbo/mbbi PVs
 * (i.e. RadioButtonGroup, SelectionInput, SelectionList) and Graphs.
 *
 * @visibleName Use BaseComponents with waveform PV
 */
function ArrayContainer(props) {
  const {
    registers,
    registersLabel,
    label,
    labelPlacement,
    direction,
    numVisibleItems: userNumVisibleItems,
    maxItemsCount,
    itemMinWidth,
  } = props;
  //const bufferSize = 10;
  const [startIdx, setStartIdx] = useState(0);
  const [items, setItems] = useState([]);

  let maxItems = 100;
  let numVisibleItems = 10;
  if (registers !== undefined && Array.isArray(registers)) {
    numVisibleItems = registers.length;
    maxItems = registers.length;
  } else if (maxItemsCount !== undefined) {
    maxItems = maxItemsCount;
  }
  if (userNumVisibleItems !== undefined) {
    numVisibleItems = userNumVisibleItems;
  }

  const classes = useStyles({ direction, numVisibleItems, itemMinWidth });

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
    if (registersLabel !== undefined && Array.isArray(registersLabel)) {
      additionalProps["label"] = registersLabel[index];
    }
    return (
      <div key={index.toString()} className={classes.item}>
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
      className={classes.form}
      label={label}
      labelPlacement={labelPlacement}
      control={
        <div className={classes.container} onWheelCapture={handleWheel}>
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
   * `numVisibleItems` is the length of the `registers` array.
   * If defined the number of visible elements,
   * in any case, is equal to this number.
   * Must be a non negative integer.
   */
  numVisibleItems: PropTypes.number,
  /**
   * Max items in the array.
   * If not specified, the default value is 100.
   * If not specified and the `registers` prop is a valid array
   * `maxItemsCount` is the length of the `registers` array.
   * If defined the number of total elements,
   * in any case, is equal to this number.
   * Must be a non negative integer and greater or equal than `numVisibleItems`
   */
  maxItemsCount: PropTypes.number,
  /**
   * When receiving a PV storing an array of values users can choose a subset of these value.
   * Registers accept the indexes of the registers to effectively show.
   * Order does count!
   */
  registers: PropTypes.arrayOf(PropTypes.number),
  /**
   * When receiving a PV storing an array of values users can assign a label to each register
   * or a subset of them.
   */
  registersLabel: PropTypes.arrayOf(PropTypes.string),
  /**
   * Directive to display array elements horizontally or vertically aligned.
   */
  direction: PropTypes.string,
  /**
   * Min space width, in percentage, an item can occupy.
   */
  itemMinWidth: PropTypes.number,
};

ArrayContainer.defaultProps = {
  direction: "vertical",
  labelPlacement: "top",
  itemMinWidth: 2,
};

export default ArrayContainer;
export { ArrayContainer };
