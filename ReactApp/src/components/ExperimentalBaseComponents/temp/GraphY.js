import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ReactVisLightDarkTheme from "../SystemComponents/ReactVisLightDarkTheme";
import {
  FlexibleXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
} from "react-vis";
import {
  formatTime,
  getLegend,
  log10Conversion,
} from "../SystemComponents/Widgets/WidgetUtils";

const styles = (theme) => ({
  lineSeries: {
    stroke: theme.palette.type === "dark" ? "orange" : "default",
  },
});

/**
 * The GraphY Component is a wrapper on Uber's React-Vis
 * FlexibleXYPlot lineSeries graph component.
 * The GraphY component is implemented with zero margins and
 * enabled to grow to the width and height of its parent container.<br/><br/>
 * The width and height must be controlled from the parent component.<br/><br/>
 * React-vis Demos:
 * https://uber.github.io/react-vis/examples/showcases/plots<br/><br/>
 * React-vis API:
 * http://uber.github.io/react-vis/documentation/series-reference/line-series
 */
class GraphY extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: undefined,
    };
    this.periodicStateUpdate = this.periodicStateUpdate.bind(this);
    this.dataPVs = {};
    for (let pvName of this.props.pvList) {
      this.dataPVs[pvName] = {
        xValue: [],
        yValue: [],
      };
    }
  }

  /**
   * If usePolling props is true, periodically check PVs' values.
   */
  componentDidMount() {
    if (this.props.usePolling) {
      this.intervalId = setInterval(
        this.periodicStateUpdate,
        this.props.pollingRate
      );
    }
  }

  /**
   * Delete the timer.
   */
  componentWillUnmount() {
    if (this.props.usePolling) {
      clearInterval(this.intervalId);
    }
  }

  /**
   * Don't update if receiveng new props when in polling mode.
   * @param {Object} nextProps
   */
  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps && this.props.usePolling) {
      return false;
    }
    return true;
  }
  /**
   * Callback to periodically update state.
   */
  periodicStateUpdate() {
    let d = new Date();
    this.setState({ timestamp: d.getTime() / 1000 });
  }

  /**
   * At any new render update the value and timestamp list.
   * @param {String} pvName
   * @param {Date} timestamp
   */
  handleInputValueUnpolled(pvName, timestamp) {
    let idx = this.props.pvList.indexOf(pvName);
    let value = this.props.valueList[idx];
    let yValueLength = this.dataPVs[pvName].yValue.length;
    // Apply convertion and concatenate old with new values.
    if (!Array.isArray(value)) {
      value = [value];
    }
    if (this.props.yScaleLog10) {
      value = log10Conversion(value);
    }
    if (
      !(
        this.props.triggerOnSingleValueChange &&
        yValueLength > 0 &&
        value.length === 1 &&
        value[0] === this.dataPVs[pvName].yValue[yValueLength - 1]
      )
    ) {
      this.dataPVs[pvName].yValue = this.dataPVs[pvName].yValue.concat(value);
      if (this.props.usePolling) {
        this.dataPVs[pvName].xValue.push(this.state.timestamp);
      } else {
        this.dataPVs[pvName].xValue.push(timestamp);
      }
    }

    // Crop array if too long.
    let max;
    let yLen = this.dataPVs[pvName].yValue.length;
    let xLen = this.dataPVs[pvName].xValue.length;
    if (this.props.maxLength !== undefined) {
      max = this.props.maxLength;
    } else {
      max = Array.isArray(value) ? value.length : 1;
    }
    if (yLen > max) {
      this.dataPVs[pvName].yValue = this.dataPVs[pvName].yValue.slice(
        yLen - max
      );
    }
    if (xLen > max) {
      this.dataPVs[pvName].xValue = this.dataPVs[pvName].xValue.slice(1);
    }
  }

  /**
   * Set domain's min and max value and return them.
   */
  getDomainLimits() {
    let ymin, ymax;
    if (this.props.ymin !== undefined) {
      ymin = this.props.ymin;
    } else {
      let arrayMin = this.props.pvList.map((pvName) =>
        Math.min(...this.dataPVs[pvName].yValue)
      );
      ymin = Math.min(...arrayMin);
    }
    if (this.props.ymax !== undefined) {
      ymax = this.props.ymax;
    } else {
      let arrayMax = this.props.pvList.map((pvName) =>
        Math.max(...this.dataPVs[pvName].yValue)
      );
      ymax = Math.max(...arrayMax);
    }
    return [ymin, ymax];
  }

  /**
   * Create linedata from values and timestamps.
   */
  getLineData(pvName, useTimes) {
    let linedata = this.dataPVs[pvName].yValue.map((value, idx) => {
      if (useTimes) {
        return { x: this.dataPVs[pvName].xValue[idx], y: value };
      } else {
        return { x: idx, y: value };
      }
    });
    return linedata;
  }

  render() {
    const theme = this.props.theme;

    let useTimes = this.props.useTimestamp;
    for (let value of this.props.valueList) {
      useTimes =
        useTimes &&
        (!Array.isArray(value) || (Array.isArray(value) && value.length === 1));
    }

    let legendColor;
    if (this.props.lineColor !== undefined) {
      legendColor = this.props.lineColor;
    } else {
      legendColor =
        theme.palette.type === "dark"
          ? theme.darkLineColors
          : theme.lightLineColors;
    }
    let legend = getLegend(this.props.legend, legendColor, theme);

    let multiLineData = this.props.pvList.map((pvName, idx) => {
      if (this.props.connectionList[idx]) {
        this.handleInputValueUnpolled(pvName, this.props.timestampList[idx]);
        let linedata = this.getLineData(pvName, useTimes);
        return (
          <LineSeries
            key={pvName.toString()}
            color={legendColor[idx]}
            getNull={(v) => v.y !== null}
            data={linedata}
            style={{
              strokeLinejoin: "round",
              strokeWidth: 2,
            }}
          />
        );
      } else {
        let data = [{ x: 0, y: 0 }];
        return (
          <LineSeries
            key={pvName.toString()}
            color={"grey"}
            getNull={(v) => v.y !== null}
            data={data}
            style={{
              strokeLinejoin: "round",
              strokeWidth: 2,
            }}
          />
        );
      }
    });

    let yDomain = this.getDomainLimits();

    let xAxisTitle =
      this.props.xAxisTitle !== undefined ? this.props.xAxisTitle : "X Axis";
    let yAxisTitle =
      this.props.yAxisTitle !== undefined ? this.props.yAxisTitle : "Y Axis";

    let yAxisStyle = {
      title: {
        stroke: theme.palette.type === "dark" ? "#dbdbe0" : "#6b6b76",
        strokeWidth: 0.2,
      },
      text: {
        stroke: "none",
        fill: theme.palette.type === "dark" ? "#a9a9b2" : "#6b6b76",
        fontWeight: 600,
      },
    };
    let xAxisStyle = {
      ...yAxisStyle,
      line: { stroke: "#ADDDE1" },
      ticks: { stroke: "#ADDDE1" },
    };
    let linesStyle = {
      stroke: theme.palette.type === "dark" ? "#0097a7" : "#B7E9ED",
    };

    return (
      <React.Fragment>
        <ReactVisLightDarkTheme />
        <FlexibleXYPlot yDomain={yDomain} margin={{ left: 60 }}>
          <HorizontalGridLines style={linesStyle} />
          <VerticalGridLines style={linesStyle} />
          <XAxis
            title={xAxisTitle}
            tickFormat={(v) =>
              useTimes ? formatTime(v) : v + " " + this.props.xUnits
            }
            tickTotal={4}
            color="white"
            style={xAxisStyle}
          />
          <YAxis
            title={yAxisTitle}
            tickFormat={(v) =>
              (this.props.yScaleLog10 ? "10E" : "") +
              v +
              " " +
              this.props.yUnits
            }
            left={9}
            tickSize={20}
            tickPadding={2}
            style={yAxisStyle}
          />
          {multiLineData}
          {legend}
        </FlexibleXYPlot>
      </React.Fragment>
    );
  }

  static propTypes = {
    /** PVs to display along the Y axis. */
    yPVs: PropTypes.oneOf([PropTypes.string, PropTypes.array]),
    /** Y axis title. */
    yAxisTitle: PropTypes.string,
    /** X axis title. */
    xAxisTitle: PropTypes.string,
    /** Custom y axis minimum to be used,if not defined the graph will auto-scale */
    ymin: PropTypes.number,
    /** Custom y axis maximum to be used,if not defined the graph will auto-scale */
    ymax: PropTypes.number,
    /** If defined, then a legend will be displayed,using the string items defined in the array*/
    legend: PropTypes.array,
    /** If defined, then the default React-Vis line colors will overided using the string items defined in the array*/
    lineColor: PropTypes.array,
    /** If defined then the length of the line graphs will grow up until the value defined*/
    maxLength: PropTypes.number,
    /** Custom y axis units to be used*/
    yUnits: PropTypes.string,
    /** Custom x axis units to be used*/
    xUnits: PropTypes.string,
    /** Directive to sample the PV value, on the client side at the polling rate*/
    usePolling: PropTypes.bool,
    /** Directive to scale the y-axis as a log base 10 value*/
    yScaleLog10: PropTypes.bool,
    /** Polling interval in ms used in polling mode*/
    pollingRate: PropTypes.number,
    /** If defined then the graph will only update on a value change*/
    triggerOnSingleValueChange: PropTypes.bool,
    /** Directive to use PV tiemstamp on x-axis. Enabled only when the associated PV has lenght 1*/
    useTimestamp: PropTypes.bool,
  };

  static defaultProps = {
    yAxisTitle: "Y-axis",
    xAxisTitle: "X-axis",
    yUnits: "",
    xUnits: "",
    usePolling: false,
    pollingRate: 100,
  };
}

export default withStyles(styles, { withTheme: true })(GraphY);
