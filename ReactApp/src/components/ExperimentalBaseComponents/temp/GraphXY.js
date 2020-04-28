import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ReactVisLightDarkTheme from "React-Automation-Studio/components/SystemComponents/ReactVisLightDarkTheme";
import {
  FlexibleXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
} from "react-vis";
import { getLegend, areArrayEqual, log10Conversion } from "./WidgetUtils";

const styles = (theme) => ({
  lineSeries: {
    stroke: theme.palette.type === "dark" ? "orange" : "default",
  },
});

/**
 * The GraphXY Component is a wrapper on Uber's React-Vis
 * FlexibleXYPlot lineSeries graph component.
 * The GraphXY component is implemented with zero margins and
 * enabled to grow to the width and height of its parent container.<br/><br/>
 * The width and height must be controlled from the parent component.<br/><br/>
 * The compoment requires the that X and Y process variables must be defined.
 * The X and Y process variable names are declared
 * in the 'xPVs' and 'yPVs' array props.
 * Multiple traces can be plotted at the same time,
 * the index of the 'xPVs' and 'yPVs' array elements define each trace.
 * PVs can be scalar or array variables.
 * React-vis Demos:
 * https://uber.github.io/react-vis/examples/showcases/plots<br/><br/>
 * React-vis API:
 * http://uber.github.io/react-vis/documentation/series-reference/line-series
 */
class GraphXY extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: undefined,
    };
    this.periodicStateUpdate = this.periodicStateUpdate.bind(this);
    this.dataPVs = [];
    for (let i = 0; i < this.props.pvList.length / 2; i++) {
      this.dataPVs.push({
        xValue: [],
        yValue: [],
        xmin: undefined,
        xmax: undefined,
        ymin: undefined,
        ymax: undefined,
      });
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
   * Update component based on updateMode.
   * @param {Object} nextProps
   */
  shouldComponentUpdate(nextProps) {
    if (
      !this.props.usePolling &&
      this.props.updateMode === "updateOnXOrYChange"
    ) {
      return true;
    }
    let oneXChanged = false;
    let oneYChanged = false;
    for (let i = 0; i < this.props.valueList.length; i++) {
      let equal = areArrayEqual(
        this.props.valueList[i],
        nextProps.valueList[i]
      );
      if (i < this.props.valueList.length / 2) {
        oneXChanged = equal ? oneXChanged : true;
      } else {
        oneYChanged = equal ? oneYChanged : true;
      }
    }
    if (
      (this.props !== nextProps && this.props.usePolling) ||
      (this.props.updateMode === "updateOnYChange" &&
        oneXChanged &&
        !oneYChanged) ||
      (this.props.updateMode === "updateOnXChange" &&
        oneYChanged &&
        !oneXChanged)
    ) {
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

  handleLineDataUpdate(coupleId, value, isX = false) {
    let xOrYValue = isX ? "xValue" : "yValue";
    let xOrYMin = isX ? "xmin" : "ymin";
    let xOrYMax = isX ? "xmax" : "ymax";
    let xOrYLog = isX ? "xScaleLog10" : "yScaleLog10";

    // Apply convertion and concatenate old with new values.
    if (!Array.isArray(value)) {
      value = [value];
    }
    if (this.props[xOrYLog]) {
      value = log10Conversion(value, this.props.min);
    }
    if (!areArrayEqual(value, this.dataPVs[coupleId][xOrYValue])) {
      this.dataPVs[coupleId][xOrYValue] = this.dataPVs[coupleId][
        xOrYValue
      ].concat(value);

      // Crop array if too long.
      let max;
      let length = this.dataPVs[coupleId][xOrYValue].length;
      if (this.props.maxLength !== undefined) {
        max = this.props.maxLength;
      } else {
        max = value.length;
      }
      if (length > max) {
        this.dataPVs[coupleId][xOrYValue] = this.dataPVs[coupleId][
          xOrYValue
        ].slice(length - max);
      }

      // Update min and max
      this.dataPVs[coupleId][xOrYMax] = Math.max(
        ...this.dataPVs[coupleId][xOrYValue]
      );
      this.dataPVs[coupleId][xOrYMin] = Math.min(
        ...this.dataPVs[coupleId][xOrYValue]
      );
    }
  }

  /**
   * Set domain's min and max value and return them.
   */
  getDomainLimits(isX = false) {
    let minProps = isX ? "xmin" : "ymin";
    let maxProps = isX ? "xmax" : "ymax";
    let min, max;
    if (this.props[minProps] !== undefined) {
      min = this.props[minProps];
    } else {
      let arrayMin = this.dataPVs.map((elem) => elem[minProps]);
      min = Math.min(...arrayMin);
    }
    if (this.props[maxProps] !== undefined) {
      max = this.props[maxProps];
    } else {
      let arrayMax = this.dataPVs.map((elem) => elem[maxProps]);
      max = Math.max(...arrayMax);
    }
    return [min, max];
  }

  render() {
    const theme = this.props.theme;
    let arrayLen = this.props.valueList.length / 2;

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

    for (let idx in this.props.pvList) {
      let isX = idx < arrayLen ? true : false;
      let couple = idx % arrayLen;
      if (this.props.connectionList[idx]) {
        this.handleLineDataUpdate(couple, this.props.valueList[idx], isX);
      }
    }

    // Create linedata from x and y values.
    let multiLineData = this.dataPVs.map((elem, idx) => {
      let linedata = elem.yValue.map((value, idx) => {
        return { x: elem.xValue[idx], y: value };
      });
      return (
        <LineSeries
          key={idx.toString()}
          color={legendColor[idx]}
          getNull={(v) => v.y !== null}
          data={linedata}
          style={{
            strokeLinejoin: "round",
            strokeWidth: 2,
          }}
        />
      );
    });

    let xDomain = this.getDomainLimits(true);
    let yDomain = this.getDomainLimits(false);

    let xAxisTitle =
      this.props.xAxisTitle !== undefined ? this.props.xAxisTitle : "X Axis";
    let yAxisTitle =
      this.props.yAxisTitle !== undefined ? this.props.yAxisTitle : "Y Axis";

    let xAxisStyle = {
      title: {
        stroke: theme.palette.type === "dark" ? "#dbdbe0" : "#6b6b76",
        strokeWidth: 0.2,
      },
      text: {
        stroke: "none",
        fill: theme.palette.type === "dark" ? "#a9a9b2" : "#6b6b76",
        fontWeight: 600,
      },
      line: { stroke: "#ADDDE1" },
      ticks: { stroke: "#ADDDE1" },
    };
    let yAxisStyle = {
      title: {
        stroke: theme.palette.type === "dark" ? "#ccccce" : "#dbdbe0",
        strokeWidth: 0.2,
      },
      text: {
        stroke: "none",
        fill: theme.palette.type === "dark" ? "#a9a9b2" : "#6b6b76",
        fontWeight: 600,
      },
    };
    let linesStyle = {
      stroke: theme.palette.type === "dark" ? "#0097a7" : "#B7E9ED",
    };
    return (
      <React.Fragment>
        <ReactVisLightDarkTheme />
        <FlexibleXYPlot
          yDomain={yDomain}
          xDomain={xDomain}
          margin={{ left: 60 }}
        >
          <HorizontalGridLines style={linesStyle} />
          <VerticalGridLines style={linesStyle} />
          <XAxis
            title={xAxisTitle}
            tickFormat={(v) =>
              (this.props.xScaleLog10 ? "10E" : "") +
              v +
              " " +
              this.props.xUnits
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
    /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id0)':'1','$(id1)':'2'}}*/
    yAxisTitle: PropTypes.string,
    /** X axis title. */
    xAxisTitle: PropTypes.string,
    /** Custom y axis minimum to be used,if not defined the graph will auto-scale */
    ymin: PropTypes.number,
    /** Custom y axis maximum to be used,if not defined the graph will auto-scale */
    ymax: PropTypes.number,
    /** Custom x axis minimum to be used,if not defined the graph will auto-scale */
    xmin: PropTypes.number,
    /** Custom x axis maximum to be used,if not defined the graph will auto-scale */
    xmax: PropTypes.number,
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
    /** Directive to scale the y-axis as a log base 10 value*/
    yScaleLog10: PropTypes.bool,
    /** Directive to scale the x-axis as a log base 10 value*/
    xScaleLog10: PropTypes.bool,
    /** Directive to sample the PV values, on the client side at the polling rate*/
    usePolling: PropTypes.bool,
    /** Polling interval in ms used in polling mode*/
    pollingRate: PropTypes.number,
    /** Update mode of the graph, Note polling mode will overide these settings*/
    updateMode: PropTypes.oneOf([
      "updateOnXOrYChange",
      "updateOnYChange",
      "updateOnXChange",
    ]),
  };

  static defaultProps = {
    updateMode: "updateOnXOrYChange",
    yAxisTitle: "Y-axis",
    xAxisTitle: "X-axis",
    yUnits: "",
    xUnits: "",
    usePolling: false,
    pollingRate: 100,
  };
}

export default withStyles(styles, { withTheme: true })(GraphXY);
