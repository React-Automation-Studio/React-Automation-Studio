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
      " 1%, #FF8E53 99%)",
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
 * The Gauge Component is an Automation-studio component.
 */
class Gauge extends React.Component {
  render() {
    let min, max, units, value;
    if (this.props.disabled) {
      min = 0;
      max = 100;
      value = 0;
      units = "";
    } else {
      min = this.props.min !== undefined ? this.props.min : 0;
      max = this.props.max !== undefined ? this.props.max : 100;
      value = this.props.value;
      units = this.props.units;
    }
    let color =
      this.props.alarmColor === undefined || this.props.alarmColor === ""
        ? this.props.theme.palette.primary.main
        : this.props.alarmColor;
    return (
      <div key={this.props.pvName}>
        {this.props.label}
        <FlexibleGaugeComponent
          {...this.props}
          min={min}
          max={max}
          units={units}
          value={value}
          pv={this.props.pvName}
          prec={this.props.precision}
          color={color}
        />
      </div>
    );
  }

  /**
   * Specific props type and default values for this widgets.
   * They extends the ones provided for a generic widget.
   */
  static propTypes = {
    // Set number of ticks to show.
    ticksCount: PropTypes.number,
    // Custom gauge ring withd to be used.
    ringWidth: PropTypes.number,
  };

  static defaultProps = { ticksCount: 6 };
}

/**
 * Gauge graphical component
 */
class GaugeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.getTickValues = this.getTickValues.bind(this);
  }

  getTickValues(x0, x1, y, xOffset, radialTxtOff) {
    let ticks = [];
    for (let i = 0; i < this.props.ticksCount; i++) {
      const rotation = (i * 180) / (this.props.ticksCount - 1);
      const value =
        (i * (this.props.max - this.props.min)) / (this.props.ticksCount - 1) +
        this.props.min;
      ticks.push(
        <g
          key={i}
          transform={"rotate(" + rotation + " " + (x0 + x1) / 2 + " " + y + ")"}
        >
          <text
            className={this.props.classes.textTicks}
            x={xOffset - radialTxtOff}
            y={y}
            textAnchor="middle"
            transform={
              "rotate(" + 270 + "," + (xOffset - radialTxtOff) + "," + y + ")"
            }
          >
            {parseFloat(value).toFixed(parseInt(this.props.prec)) +
              this.props.units}
          </text>
        </g>
      );
    }
    return ticks;
  }

  render() {
    let value = isFinite(this.props.value) ? this.props.value : 0;
    const gradientId = uuid.v4();
    const ringWidth =
      this.props.ringWidth !== undefined
        ? this.props.ringWidth
        : 0.16667 * this.props.width;
    const xOffset = 24;
    const radialTxtOff = 8;
    const yOffset = 20;
    const valueOffsetY = 18;
    const radius = (this.props.width - 2 * xOffset - ringWidth) / 2;
    const x0 = ringWidth / 2 + xOffset;
    const x1 = radius * 2 + x0;
    const y0 = ringWidth / 2 + radius + yOffset;
    let needleRotation;
    if (this.props.max === this.props.min) {
      needleRotation = 0;
    } else {
      needleRotation =
        (180 * (value - this.props.min)) / (this.props.max - this.props.min);
    }
    let ticks = !this.props.disabled
      ? this.getTickValues(x0, x1, y0, xOffset, radialTxtOff)
      : "";
    return (
      <svg width={this.props.width} height={xOffset + this.props.width / 2}>
        {
          <text
            x={(x0 + x1) / 2}
            y={y0 + valueOffsetY}
            textAnchor="middle"
            className={this.props.classes.textValue}
          >
            {!this.props.disabled ? value + this.props.units : ""}
          </text>
        }
        <linearGradient id={gradientId}>
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
        <path
          style={{
            opacity: 1,
            fill: "none",
            fillOpacity: 1,
            stroke: "url(#" + gradientId + ")",
            strokeWidth: ringWidth,
            strokeMiterlimit: 4,
            strokeDasharray: "none",
            strokeOpacity: 1,
          }}
          d={
            "M " +
            x0 +
            " " +
            y0 +
            " A " +
            radius +
            " " +
            radius +
            " 0 0 1 " +
            x1 +
            " " +
            y0
          }
        />
        <path
          fill={this.props.theme.palette.secondary.main}
          transform={
            "rotate(" + needleRotation + " " + (x0 + x1) / 2 + " " + y0 + ")"
          }
          d={
            "M " +
            (xOffset - 6) +
            " " +
            (y0 - 1) +
            " " +
            (xOffset + y0 - yOffset) +
            " " +
            (y0 - 4) +
            " " +
            (xOffset + y0 - yOffset) +
            " " +
            (y0 + 4) +
            " " +
            (xOffset - 6) +
            " " +
            (y0 + 1) +
            " " +
            (xOffset - 6) +
            " " +
            (y0 - 1)
          }
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

const FlexibleGaugeComponent = makeVisFlexible(
  withStyles(styles, { withTheme: true })(GaugeComponent)
);

export default withWidget(withStyles(styles, { withTheme: true })(Gauge), {
  readOnly: true,
});
