import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, FormControlLabel } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import PropTypes from "prop-types";
import withWidget from "../../SystemComponents/Widgets/withWidget";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  Button: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
  },
});

/**
 *  The ThumbWheel component is a wrapper on an array of Material-UI Button components.
 *  The Button component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 *  The margins and spacing must be controlled from the parent component.<br/><br/>
 *  Material-UI Button Demos:
 *  https://material-ui.com/demos/buttons/<br/><br/>
 *  Material-UI Button API:
 *  https://material-ui.com/api/button/
 */
class ThumbWheel extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  /**
   * Increment tha actual value by the received quantity.
   * If the new value is outside the limits cut it to the limit.
   * @param {float} incrementValue
   */
  handleButtonClick(incrementValue) {
    if (this.props.connection) {
      let value = this.props.value + incrementValue;
      this.props.onUpdateWidgetState({
        checkValue: true,
        value: value,
        outputValue: value,
      });
      window.navigator.vibrate(1);
    }
  }

  render() {
    let prec_integer = this.props.prec_integer;
    let prec_decimal =
      this.props.precision !== undefined
        ? this.props.precision
        : this.props.prec_decimal;
    let prec_decimal_div = prec_decimal > 0 ? prec_decimal : 0;
    let num_array = [];
    if (this.props.custom_increments !== undefined) {
      num_array = this.props.custom_increments.sort((a, b) => a - b);
    } else {
      for (let i = 0; i < prec_integer; i++) {
        num_array.push(10 ** i);
      }
      for (let i = 1; i <= prec_decimal; i++) {
        num_array.unshift(10 ** -i);
      }
    }
    return (
      <ThumbWheelWidget
        {...this.props}
        disabled={this.props.disabled}
        label={this.props.label}
        labelPos={this.props.labelPos}
        num_array={num_array}
        prec_decimal_div={prec_decimal_div}
        onHandleButtonClick={this.handleButtonClick}
      />
    );
  }

  /**
   * Specific props type and default values for this widgets.
   * They extends the ones provided for a generic widget.
   */
  static propTypes = {
    // If defined this sets the precision of the integer values of the widget.
    prec_integer: PropTypes.number,
    // If defined this sets the precision of the decimal values of the widget
    prec_decimal: PropTypes.number,
    // An array of custom increments.
    // If defined, overides any values in 'prec_integer', 'prec_decimal'.
    custom_increments: PropTypes.array,
  };

  static defaultProps = {
    prec_integer: 4,
    prec_decimal: 3,
  };
}

/**
 * Function with the details of the graphic object
 * @param {any} props
 */
function ThumbWheelWidget(props) {
  return (
    <FormControlLabel
      key={props.pvName}
      className={props.classes.Button}
      disabled={props.disabled}
      control={
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          {props.num_array.map((item, index) => (
            <div
              key={"toprowbuttons" + index + "div1"}
              style={{
                paddingRight: props.theme.spacing(1),
                paddingLeft: props.theme.spacing(1),
                display: "flex",
                flexDirection: "column",
              }}
            >
              <FormControlLabel
                className={props.classes.Button}
                control={
                  <SingleThumbWheelWidget {...props} item={item} up={true} />
                }
                label={item}
                labelPlacement="bottom"
              />
              <SingleThumbWheelWidget {...props} item={item} up={false} />
            </div>
          ))}
        </div>
      }
      label={props.label}
      labelPlacement={props.labelPos}
    />
  );
}

/**
 * Single wheel element
 * @param {any} props
 */
function SingleThumbWheelWidget(props) {
  return (
    <Button
      key={(props.up ? "top" : "bottom") + "rowbuttons" + props.index}
      className={props.classes.Button}
      disabled={props.disabled}
      size={props.buttonSize !== undefined ? props.buttonSize : "small"}
      variant="contained"
      color="primary"
      onClick={() =>
        props.onHandleButtonClick(props.up ? props.item : -props.item)
      }
    >
      {props.up ? <ExpandLess /> : <ExpandMore />}
    </Button>
  );
}

export default withWidget(withStyles(styles, { withTheme: true })(ThumbWheel));
