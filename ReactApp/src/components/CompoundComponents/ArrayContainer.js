import React from "react";
import PropTypes from "prop-types";

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
  const wrapComponent = (InputComponent, props) => {
    return <InputComponent {...props} pvs={undefined} useStringValue={false} />;
  };
  const BaseComponent = wrapComponent(props.component, props);
  return <div>{BaseComponent}</div>;
}

ArrayContainer.propTypes = {
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
   * When receiving a PV storing an array of values users can set the label position for each register,
   * or a subset of them, if the receiving components allows it.
   */
  registersLabelPlacement: PropTypes.oneOf(["top", "bottom", "start", "end"]),
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
export { ArrayContainer };
