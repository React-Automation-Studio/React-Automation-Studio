import React from "react";
import { makeVisFlexible } from "react-vis";
import uuid from "uuid";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import withWidget from "../../SystemComponents/Widgets/withWidget";

const styles = (theme) => ({
  textTicks: {
    fill:
      theme.palette.type === "dark"
        ? theme.palette.grey["300"]
        : theme.palette.grey["500"],
  },
  textValue: {
    fill:
      theme.palette.type === "dark"
        ? theme.palette.grey["300"]
        : theme.palette.grey["500"],
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  segmentValue: {
    textAnchor: "middle",
    fontSize: "14px",
    fontWeight: "bold",
    fill: "rgb(0, 102, 102) !important",
  },
  TextFieldSeverity0: {
    width: "100%",
    marginTop: "auto",
    marginBottom: "auto",
    fontWeight: 500,
    borderRadius: 4,
  },
  TextFieldSeverity1: {
    width: "100%",
    marginTop: "auto",
    marginBottom: "auto",
    fontWeight: 500,
    borderRadius: 4,
    background:
      "linear-gradient(45deg, " +
      theme.palette.background.default +
      " 1%, #FF8E53 99%)", //'green'
  },
  TextFieldSeverity2: {
    width: "100%",
    marginTop: "auto",
    marginBottom: "auto",
    fontWeight: 500,
    borderRadius: 4,
    background:
      "linear-gradient(45deg, " +
      theme.palette.background.default +
      " 1%, #E20101 99%)", //'green'
  },
});

/**
 * The ProgressBar Component is an Automation-studio component.
 */
class ProgressBar extends React.Component {
  render() {
    let min = this.props.min !== undefined ? this.props.min : 0;
    let max = this.props.max !== undefined ? this.props.max : 100;
    let color =
      this.props.alarmColor === undefined || this.props.alarmColor === ""
        ? this.props.theme.palette.primary.main
        : this.props.alarmColor;
    return (
      <div key={this.props.pvName}>
        {this.props.label}
        <FlexibleProgressBarComponent
          {...this.props}
          pv={this.props.pvName}
          min={min}
          max={max}
          units={this.props.units}
          value={this.props.value}
          color={color}
          lockAspectRatio={this.props.lockAspectRatio}
          aspectRatio={this.props.aspectRatio}
          showValue={this.props.showValue}
          showTicks={this.props.showTicks}
          disabled={this.props.disabled}
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
    aspectRatio: 1.75,
  };
}

/**
 * ProgressBar graphical component
 */
class ProgressBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.getTickValues = this.getTickValues.bind(this);
  }

  getTickValues(x0, x2, y0, y2) {
    let ticks = [];
    if (this.props.showTicks) {
      for (let i = 0; i < this.props.ticksCount; i++) {
        const tickValue =
          (i * (this.props.max - this.props.min)) /
            (this.props.ticksCount - 1) +
          this.props.min;
        ticks.push(
          <ProgressBarLabel
            {...this.props}
            key={i}
            idx={i}
            xPos={(i * x2) / (this.props.ticksCount - 1)}
            yPos={y2 + y0}
            value={tickValue}
          />
        );
      }
    }
    if (this.props.showValue) {
      ticks.push(
        <ProgressBarLabel
          {...this.props}
          key={-1}
          idx={-1}
          xPos={x0}
          yPos={y0 - 4}
          value={this.props.value}
        />
      );
    }
    return ticks;
  }

  render() {
    let value = isFinite(this.props.value) ? this.props.value : 0;
    const gradientId = uuid.v4();
    let height = this.props.lockAspectRatio
      ? this.props.width / this.props.aspectRatio
      : this.props.height;
    const y0 = this.props.width > 16 ? 16 : 0;
    const y2 = height - y0;
    const y1 = y2 / 2;
    const x0 = 0;
    const x2 = this.props.width;
    let level;
    if (this.props.min === this.props.max) {
      level = 0;
    } else {
      level =
        (x2 * (value - this.props.min)) / (this.props.max - this.props.min);
    }
    let ticks = !this.props.disabled ? this.getTickValues(x0, x2, y0, y2) : "";
    return (
      <svg width={this.props.width} height={height}>
        <linearGradient
          id={gradientId + "baseBottom1"}
          gradientTransform="rotate(90)"
        >
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
        <linearGradient
          id={gradientId + "baseTop1"}
          gradientTransform="rotate(90)"
        >
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
        <linearGradient
          id={gradientId + "bottom1"}
          gradientTransform="rotate(90)"
        >
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
            stopColor={!this.props.disabled ? this.props.color : "default"}
          />
        </linearGradient>
        <linearGradient id={gradientId + "top1"} gradientTransform="rotate(90)">
          <stop
            offset="0%"
            stopColor={!this.props.disabled ? this.props.color : "default"}
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
        <rect
          x={x0}
          y={y0}
          width={x2}
          height={y1 - y0}
          style={{
            opacity: 1,
            strokeWidth: "0",
            fill: "url(#" + gradientId + "baseTop1)",
          }}
        />
        <rect
          x={x0}
          y={y1 - 1}
          width={x2}
          height={y2 - y1}
          style={{
            opacity: 1,
            strokeWidth: "0",
            fill: "url(#" + gradientId + "baseBottom1)",
          }}
        />
        <rect
          x={x0}
          y={y0}
          width={level}
          height={y1 - y0}
          style={{
            opacity: 1,
            strokeWidth: "0",
            fill: "url(#" + gradientId + "top1)",
          }}
        />
        <rect
          x={x0}
          y={y1 - 1}
          width={level}
          height={y2 - y1}
          style={{
            opacity: 1,
            strokeWidth: "0",
            fill: "url(#" + gradientId + "bottom1)",
          }}
        />
        {ticks}
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

function ProgressBarLabel(props) {
  let textAnchor, value;
  if (props.idx === -1) {
    textAnchor = "start";
    value = props.value;
  } else if (props.idx === 0) {
    textAnchor = "start";
    value = parseFloat(props.value).toFixed(props.prec);
  } else if (props.idx === props.ticksCount - 1) {
    textAnchor = "end";
    value = parseFloat(props.value).toFixed(props.prec);
  } else {
    textAnchor = "middle";
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

const FlexibleProgressBarComponent = makeVisFlexible(
  withStyles(styles, { withTheme: true })(ProgressBarComponent)
);

export default withWidget(
  withStyles(styles, { withTheme: true })(ProgressBar),
  { readOnly: true }
);
