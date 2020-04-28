import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Slider, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import withWidget from "../SystemComponents/Widgets/withWidget";

const styles = (theme) => ({
  root: {
    width: 300,
  },
  slider: {
    padding: "22px 0px ",
    color: "primary",
  },
  rangeLabel: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(1) * 2,
  },
  sliderDiv: {
    paddingRight: theme.spacing(1) * 3,
    paddingLeft: theme.spacing(1) * 3,
  },
});

/**
 * The SimpleSlider Component is a wrapper on the Material-UI contained Slider component. The SimpleSlider component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI Slider Demos:
 * https://material-ui.com/components/slider/<br/><br/>
 * Material-UI Slider API:
 * https://material-ui.com/api/slider/
 */
class SimpleSlider extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCommited = this.handleChangeCommited.bind(this);
    this.emitChangeDebounced = debounce(this.emitChange, 10);
  }

  /**
   * Write value on the PV using emitChangeDebounced function.
   * This function store the value and then wait for 10ms
   * before it can be triggered again.
   * @param {Event} event
   * @param {float} value
   */
  handleChange(event, value) {
    this.props.onUpdateWidgetState({ focus: true });
    this.emitChangeDebounced(value);
  }

  /**
   * Save value on the state.
   * @param {string} value
   */
  emitChange(value) {
    this.props.onUpdateWidgetState({
      checkValue: true,
      value: value,
      outputValue: value,
      newValueTrigger: 1,
    });
  }

  /**
   * When stop moving the slider save the reached value.
   * @param {Event} event
   * @param {float} value
   */
  handleChangeCommited(event, value) {
    this.props.onUpdateWidgetState({
      checkValue: true,
      value: value,
      outputValue: value,
      inputValue: value,
      focus: false,
    });
  }

  render() {
    let content, marks;
    if (this.props.connection) {
      content = (
        <Typography className={this.props.classes.rangeLabel} id="subtitle2">
          {this.props.label} {this.props.value} {this.props.units}
        </Typography>
      );
    } else {
      content = (
        <Typography className={this.props.classes.rangeLabel} id="subtitle2">
          {this.props.label}
        </Typography>
      );
    }
    let min = this.props.min !== undefined ? this.props.min : 0;
    let max = this.props.max !== undefined ? this.props.max : 100;
  
    if (this.props.marks !== undefined) {
      marks = this.props.marks;
    } else {
      marks = [
        {
          value: min,
          label:
   
            min +
            " " +
            this.props.units,
        },
        {
          value: max,
          label:

            max +
            " " +
            this.props.units,
        },
      ];
    }
    //console.log('max',max)
    //console.log('min',min)
    //console.log('marks',marks)
    //console.log('this.props.max',this.props.max)
    //console.log('this.props.units',this.props.units)
    //console.log(this.props.connection)
    return (
      <div className={this.props.classes.sliderDiv}>
        {content}
        <Slider
          className={this.props.classes.slider}
          key={this.props.pvName+this.props.connection}
          aria-labelledby="label"
          disabled={this.props.disabled}
          value={this.props.value}
          min={this.props.connection?min:undefined}
          max={this.props.connection?max:undefined}
          marks={this.props.connection?marks:undefined}
          valueLabelDisplay={this.props.showThumbValue ? "on" : "off"}
          step={this.props.step !== undefined ? this.props.step : undefined}
          onChange={this.handleChange}
          onChangeCommitted={this.handleChangeCommited}
        />
      </div>
    );
  }

  /**
   * Specific props type and default values for this widgets.
   * They extends the ones provided for a generic widget.
   */
  static propTypes = {
    // Custom markers in format:
    // [{value: uservalue1,label:userlabel1},{value: uservalue...,label:userlabel...}
    marks: PropTypes.array,
    // Show thumb with value
    showThumbValue: PropTypes.bool,
    // If defined, the value will be increment or decremented
    // in the define step intervals
    step: PropTypes.number,
  };

  static defaultProps = {
    showThumbValue: false,
    step: 1,
  };
}

export default withWidget(
  withStyles(styles, { withTheme: true })(SimpleSlider)
);
