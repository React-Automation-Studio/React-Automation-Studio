import React from "react";
import { makeVisFlexible } from "react-vis";
import uuid from "uuid";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import withWidget from "../../SystemComponents/Widgets/withWidget";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textTicks: {
    fill:
      theme.palette.type === "dark"
        ? theme.palette.grey["300"]
        : theme.palette.grey["500"],
  },
});

/**
 * The Tank Component is an Automation-studio component.
 */
class Tank extends React.Component {
  render() {
    let min = this.props.min !== undefined ? this.props.min : 0;
    let max = this.props.max !== undefined ? this.props.max : 100;
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {this.props.label}
        <FlexibleTankComponent
          {...this.props}
          disabled={this.props.disabled}
          min={min}
          max={max}
          units={this.props.units}
          value={this.props.value}
          color={
            this.props.alarmColor === ""
              ? this.props.theme.palette.primary.main
              : this.props.alarmColor
          }
          prec={this.props.precision}
        />
      </div>
    );
  }

  /**
   * Specific props type and default values for this widgets.
   * They extends the ones provided for a generic widget.
   */
  static propTypes = {
    // Directive to show the istantaneous value.
    showValue: PropTypes.bool,
    // Directive to show the tick values.
    showTicks: PropTypes.bool,
    // Set number of ticks to show.
    ticksCount: PropTypes.number,
    // Lock the aspect ratio, if true,`height=width/aspectRatio`,
    // otherwise the height will grow to the height of the parent container .
    lockAspectRatio: PropTypes.bool,
    // Width to height aspect ratio.
    aspectRatio: PropTypes.number,
  };

  static defaultProps = {
    showValue: true,
    showTicks: true,
    ticksCount: 3,
    lockAspectRatio: true,
    aspectRatio: 1,
  };
}

/**
 * Tank graphical component
 */
class TankComponent extends React.Component {
  constructor(props) {
    super(props);
    this.getTickValues = this.getTickValues.bind(this);
  }

  /**
   * Function to show ticks on tank component.
   */
  getTickValues(x0, y0, x2, y2, xOffset, yOffset) {
    let ticks = [];
    if (this.props.showTicks) {
      for (let i = 0; i < this.props.ticksCount; i++) {
        const tickValue =
          (i * (this.props.max - this.props.min)) /
            (this.props.ticksCount - 1) +
          this.props.min;
        ticks.push(
          <TankLabel
            {...this.props}
            key={i}
            idx={i}
            xPos={xOffset - 3}
            yPos={
              y2 - (i * (y2 - y0 - yOffset)) / (this.props.ticksCount - 1) - 3
            }
            value={tickValue}
          />
        );
      }
    }
    if (this.props.showValue) {
      ticks.push(
        <TankLabel
          {...this.props}
          key={-1}
          idx={-1}
          xPos={x0 + (x2 - x0) / 2}
          yPos={yOffset - 4}
          value={this.props.value}
        />
      );
    }
    return ticks;
  }

  render() {
    const gradientId = uuid.v4();
    let value = isFinite(this.props.value) ? this.props.value : 0;
    let yOffset = this.props.width > 16 ? 16 : 0;
    let xOffset = this.props.width > 80 ? 80 : 0;
    let height = this.props.lockAspectRatio
      ? this.props.width / this.props.aspectRatio
      : this.props.height;
    let y0 = yOffset;
    let y2 = height - yOffset;
    let x0 = xOffset;
    let x2 = this.props.width - xOffset * 0;
    let x1 = (x2 - x0) / 2 + x0;
    let level;
    if (this.props.min === this.props.max) {
      level = 0;
    } else {
      level =
        ((y2 - y0) * (value - this.props.min)) /
        (this.props.max - this.props.min);
    }
    let color = this.props.color;
    let tiks = !this.props.disabled
      ? this.getTickValues(x0, y0, x2, y2, xOffset, yOffset)
      : "";
    return (
      <svg width={this.props.width} height={height}>
        <linearGradient id={gradientId + "baseleft1"}>
          <stop
            offset="0%"
            stopColor={
              this.props.theme.palette.type === "dark"
                ? this.props.theme.palette.grey["300"]
                : this.props.theme.palette.grey["200"]
            }
          />
          <stop
            offset="100%"
            stopColor={
              !this.props.disabled
                ? this.props.theme.palette.grey["200"]
                : "default"
            }
          />
        </linearGradient>
        <linearGradient id={gradientId + "baseright1"}>
          <stop
            offset="0%"
            stopColor={
              !this.props.disabled
                ? this.props.theme.palette.grey["200"]
                : "default"
            }
          />
          <stop
            offset="100%"
            stopColor={
              this.props.theme.palette.type === "dark"
                ? this.props.theme.palette.grey["300"]
                : this.props.theme.palette.grey["200"]
            }
          />
        </linearGradient>
        <linearGradient id={gradientId + "right1"}>
          <stop
            offset="0%"
            stopColor={
              this.props.theme.palette.type === "dark"
                ? this.props.theme.palette.grey["300"]
                : this.props.theme.palette.grey["200"]
            }
          />
          <stop
            offset="100%"
            stopColor={!this.props.disabled ? color : "default"}
          />
        </linearGradient>
        <linearGradient id={gradientId + "left1"}>
          <stop
            offset="0%"
            stopColor={!this.props.disabled ? color : "default"}
          />
          <stop
            offset="100%"
            stopColor={
              this.props.theme.palette.type === "dark"
                ? this.props.theme.palette.grey["300"]
                : this.props.theme.palette.grey["200"]
            }
          />
        </linearGradient>
        <g>
          <rect
            x={x1 - 1}
            y={y0}
            width={x2 - x1}
            height={y2 - y0}
            style={{
              opacity: 1,
              strokeWidth: "0",
              fill: "url(#" + gradientId + "baseright1)",
            }}
          />
          <rect
            x={x0}
            y={y0}
            width={x2 - x1}
            height={y2 - y0}
            style={{
              opacity: 1,
              strokeWidth: "0",
              fill: "url(#" + gradientId + "baseleft1)",
            }}
          />
          <rect
            x={x0}
            y={y2 - level}
            width={x1 - x0}
            height={level}
            style={{
              opacity: 1,
              strokeWidth: "0",
              fill: "url(#" + gradientId + "left1)",
            }}
          />
          <rect
            x={x1 - 1}
            y={y2 - level}
            width={x2 - x1}
            height={level}
            style={{
              opacity: 1,
              strokeWidth: "0",
              fill: "url(#" + gradientId + "right1)",
            }}
          />
          {tiks}
        </g>
      </svg>
    );
  }

  /**
   * Specific props type and default values for this component.
   */
  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
  };
}

/**
 * Component to show a label on this widget
 * @param {object} props
 */
function TankLabel(props) {
  let textAnchor, value;
  if (props.idx === -1) {
    textAnchor = "middle";
    value = props.value;
  } else {
    textAnchor = "end";
    value = parseFloat(props.value).toFixed(props.prec);
  }
  return (
    <g key={props.idx}>
      <text
        className={props.classes.textTicks}
        x={props.xPos}
        y={props.yPos}
        textAnchor={textAnchor}
      >
        {value + props.units}
      </text>
    </g>
  );
}

const FlexibleTankComponent = makeVisFlexible(
  withStyles(styles, { withTheme: true })(TankComponent)
);

export default withWidget(withStyles(styles, { withTheme: true })(Tank), {
  readOnly: true,
});
