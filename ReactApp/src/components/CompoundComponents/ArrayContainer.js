import React from "react";
import PropTypes from "prop-types";

/**
 * The ArrayContainer is a wrapper to show,
 * for each value of the array stored in the connected PV,
 * the component passed to the component props.
 * It works only with waveform PVs.
 *
 * If you want to reuse the widget components you need to use
 * the desired widget's inner component.
 * For example if you want to create an ArrayContainer with a multiple TextInput
 * you need to pass to the component prop *TextInputComponent*.
 * (i.e. choose your inner component, such as TextInput,
 * and append the word "Component" -> TextInputComponent.
 * See the examples to learn more about its usage).
 *
 * In addiction to the props presented in this guide user can pass to
 * ArrayContainer all the props that must be forwarded to the component
 * passed to the component prop.
 *
 * Currently it can't be used with components based on mbbo/mbbi PVs
 * (i.e. RadioButtonGroup, SelectionInput, SelectionList).
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
