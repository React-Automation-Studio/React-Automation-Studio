import React, { useEffect, useState, useRef, useReducer } from "react";
import { useTheme } from "@mui/material/styles";
import ContextMenu from "../SystemComponents/ContextMenu";
import PV from "../SystemComponents/PV";
import Plot from "react-plotly.js";
import { replaceMacros } from "../SystemComponents/Utils/macroReplacement";
import { isMobileOnly } from "react-device-detect";
interface PlotDataProps {
  children: ({ data, contextInfo }) => JSX.Element;
  xPVs: string[];
  yPVs: string[];
  macros?: Record<string, string>;
  usePolling?: boolean;
  pollingRate?: number;
  updateRate?: number;
  updateMode?: "updateOnXOrYChange" | "updateOnYChange" | "updateOnXChange";
  maxLength?: number;
  makeNewSocketIoConnection?: boolean;
}
const PlotData = (props: PlotDataProps) => {
  const updateDataReducer = (pvs, newData) => {
    const { axis } = newData;
    const { updateMode } = props;

    let newPvs = [...pvs];
    let { initialized } = newData.pvData;
    let value = initialized ? newData.pvData.value : [];
    if (!Array.isArray(value)) {
      value = [value];
    }
    let newX = [];
    let newY = [];
    let oldY;
    let oldX;
    let currentX = [];
    let currentY = [];

    if (initialized) {
      if (newPvs[newData.index]) {
        if (axis === "y") {
          currentY = value;
          currentX = newPvs[newData.index].currentX
            ? newPvs[newData.index].currentX
            : [];
          oldX = newPvs[newData.index].x ? newPvs[newData.index].x : [];
          oldY = newPvs[newData.index].x ? newPvs[newData.index].y : [];
        } else {
          currentX = value;
          currentY = newPvs[newData.index].currentY
            ? newPvs[newData.index].currentY
            : [];
          oldX = newPvs[newData.index].y ? newPvs[newData.index].x : [];
          oldY = newPvs[newData.index].y ? newPvs[newData.index].y : [];
        }
        if (axis === "y") {
          if (currentX.length === currentY.length) {
            if (
              updateMode === "updateOnXOrYChange" ||
              updateMode === "updateOnYChange"
            ) {
              if (typeof props.maxLength !== "undefined") {
                newY = oldY.concat(currentY);
                newX = oldX.concat(currentX);
                if (newY.length > props.maxLength) {
                  newY.splice(0, newY.length - props.maxLength);
                }
                if (newX.length > props.maxLength) {
                  newX.splice(0, newX.length - props.maxLength);
                }
              } else {
                newY = currentY;
                newX = currentX;
              }
            } else {
              newY = oldY;
              newX = oldX;
            }
          } else {
            newY = oldY;
            newX = oldX;
          }
        } else {
          if (currentX.length === currentY.length) {
            if (
              updateMode === "updateOnXOrYChange" ||
              updateMode === "updateOnXChange"
            ) {
              if (typeof props.maxLength !== "undefined") {
                newY = oldY.concat(currentY);
                newX = oldX.concat(currentX);
                if (newY.length > props.maxLength) {
                  newY.splice(0, newY.length - props.maxLength);
                }
                if (newX.length > props.maxLength) {
                  newX.splice(0, newX.length - props.maxLength);
                }
              } else {
                newY = currentY;
                newX = currentX;
              }
            } else {
              newY = oldY;
              newX = oldX;
            }
          } else {
            newY = oldY;
            newX = oldX;
          }
        }
      } else {
        if (axis === "y") {
          currentY = value;
        } else {
          currentX = value;
        }
      }
    }

    newPvs[newData.index] = {
      x: newX,
      y: newY,
      currentX: currentX,
      currentY: currentY,
    };
    return newPvs;
  };

  const [data, updateData] = useReducer(updateDataReducer, []);
  const updatePolledDataReducer = (oldPvs, newData) => {
    let pvs = [...oldPvs];
    pvs[newData.index] = newData.pvData;
    return pvs;
  };

  const [polledDataX, updatePolledDataX] = useReducer(
    updatePolledDataReducer,
    []
  );
  const [polledDataY, updatePolledDataY] = useReducer(
    updatePolledDataReducer,
    []
  );
  const polledDataRefX = useRef(polledDataX);
  useEffect(() => {
    polledDataRefX.current = polledDataX;
  }, [polledDataX]);
  const polledDataRefY = useRef(polledDataY);
  useEffect(() => {
    polledDataRefY.current = polledDataY;
  }, [polledDataY]);
  const { usePolling, pollingRate } = props;

  useEffect(() => {
    let timer;
    const update = () => {
      polledDataRefX.current.forEach((item, index) => {
        const timestamp = Date.now() / 1000;
        updateData({
          index,
          pvData: { ...item, timestamp: timestamp },
          axis: "x",
        });
      });
      polledDataRefY.current.forEach((item, index) => {
        const timestamp = Date.now() / 1000;
        updateData({
          index,
          pvData: { ...item, timestamp: timestamp },
          axis: "y",
        });
      });
    };
    if (usePolling) {
      timer = setInterval(update, pollingRate);
    }
    return () => {
      if (usePolling) {
        clearInterval(timer);
      }
    };
  }, [usePolling, pollingRate]);

  const contextInfoReducer = (oldPvs, newData) => {
    let pvs = [...oldPvs];
    pvs[newData.index] = newData.pvs[0];

    return pvs;
  };
  const [contextInfo, updateContextInfo] = useReducer(contextInfoReducer, []);
  const [delayedData, setDelayedData] = useState([]);
  const [delayedContextInfo, setDelayedContextInfo] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const { updateRate } = props;

  useEffect(() => {
    setTimeout(() => setTrigger((prev) => prev + 1), parseInt(updateRate));
    setDelayedData(data);
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [trigger, updateRate]);

  const [trigger2, setTrigger2] = useState(0);

  useEffect(() => {
    setTimeout(() => setTrigger2((prev) => prev + 1), parseInt(1000));
    setDelayedContextInfo(contextInfo);
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [trigger2]);

  const pvConnections = () => {
    let pvs = [];
    props.xPVs.forEach((item, index) => {
      pvs.push(
        <PV
          key={"x" + index.toString()}
          pv={item}
          macros={props.macros}
          pvData={(pvData) =>
            props.usePolling
              ? updatePolledDataX({ index, pvData, axis: "x" })
              : updateData({ index, pvData, axis: "x" })
          }
          contextInfo={(pvs) => updateContextInfo({ index, pvs, axis: "x" })}
          makeNewSocketIoConnection={props.makeNewSocketIoConnection}
        />
      );
    });
    props.yPVs.forEach((item, index) => {
      pvs.push(
        <PV
          key={"y" + index.toString()}
          pv={item}
          macros={props.macros}
          pvData={(pvData) =>
            props.usePolling
              ? updatePolledDataY({ index, pvData, axis: "y" })
              : updateData({ index, pvData, axis: "y" })
          }
          contextInfo={(pvs) => updateContextInfo({ index, pvs, axis: "y" })}
          makeNewSocketIoConnection={props.makeNewSocketIoConnection}
        />
      );
    });
    return pvs;
  };
  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "inherit" }}>
      {pvConnections()}
      {props.children({ data: delayedData, contextInfo: delayedContextInfo })}
    </div>
  );
};

/**
 * The GraphXY Component has been updated to Plotly.js scatter and line plot.
 * **Note**: The update includes a small breaking change.
 * See the backgroundColor prop for the workaround.
 */
const GraphXY = ({
  updateRate = 100,
  makeNewSocketIoConnection = false,
  debug = false,
  showLegend = false,
  yAxisTitle = "Y-axis",
  xAxisTitle = "X-axis",
  usePolling = false,
  pollingRate = 100,
  width= "100%",
  aspectRatio = 1,
  updateMode = "updateOnXOrYChange",
  disableMobileStatic = false,
  plotlyStyle = {
    position: "relative",
    display: "inline-block",
    width: "100%",
    height: "100%",
    paddingBottom: 8,
  },
  height,
  ...props
}: GraphXYProps) => {
  const theme = useTheme();
  const backgroundColor = props.backgroundColor
    ? props.backgroundColor
    : theme.palette.background.default;
  if (typeof props.ymin !== "undefined") {
    console.warn("Prop ymin is deprecated, use yMin instead");
  }
  if (typeof props.ymax !== "undefined") {
    console.warn("Prop ymax is deprecated, use yMax instead");
  }

  const createTraces = (data) => {
    let traces = [];

    data.forEach((item, index) => {
      const traceProps = {
        type: "scatter",
        mode: "lines",
        marker: {
          color: props.lineColor
            ? props.lineColor[index]
            : theme.palette.reactVis.lineColors[index],
        },

        name:
          typeof props.legend !== "undefined"
            ? props.legend[index]
              ? props.legend[index]
              : replaceMacros(props.yPVs[index], props.macros)
            : replaceMacros(props.yPVs[index], props.macros),
        hovertemplate: props.yHoverFormat
          ? "(%{y:" +
            props.yHoverFormat +
            "}) %{x}<extra>%{fullData.name}</extra>"
          : "(%{y}) %{x}<extra>%{fullData.name}</extra>",
      };
      traces.push({ ...item, ...traceProps });
    });
    return traces;
  };

  const paperRef = useRef(null);
  const [widthComputed, setWidthComputed] = useState(null);
  const [heightComputed, setHeightComputed] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleToggleContextMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.target);
    setOpenContextMenu(!openContextMenu);
  };

  const handleContextMenuClose = () => {
    setOpenContextMenu(false);
  };

  const [openContextMenu, setOpenContextMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (paperRef.current) {
        setHeightComputed(
          height
            ? height
            : paperRef.current.offsetWidth * aspectRatio
        );
        setWidthComputed(paperRef.current.offsetWidth);
      }
    };
    // The 'current' property contains info of the reference:
    // align, title, ... , width, height, etc.
    if (paperRef.current) {
      setHeightComputed(height ? height : paperRef.current.offsetWidth);
      setWidthComputed(paperRef.current.offsetWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [paperRef, width, height, aspectRatio]);

  const [domain, setDomain] = useState([0, 1]);

  useEffect(() => {
    if (props.yAxes !== undefined) {
      let numberOfyAxes = props.yAxes.length;
      let newYPositions = [];
      let increment = 100 / widthComputed;
      let newDomain = [increment * (numberOfyAxes - 1), 1];
      let index = 0;
      for (let i = numberOfyAxes - 1; i >= 0; i--) {
        newYPositions[index] = i * increment;
        index++;
      }
      setDomain(newDomain);
    } else {
      setDomain([0, 1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widthComputed]);
  const [yAxes] = useState(() => {
    let yAxesInit = {};
    yAxesInit["yaxis"] = {
      gridcolor: theme.palette.reactVis[".rv-xy-plot__grid-lines__line"].stroke,
      tickcolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
      zerolinecolor:
        theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
      linecolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
      type: props.yScaleLog10 === true ? "log" : "linear",
      tickformat: props.yTickFormat ? props.yTickFormat : "",
      zeroline: true,
      showline: true,
      showgrid: true,
      automargin: true,
      range: [
        typeof props.yMin !== "undefined" ? props.yMin : null,
        typeof props.yMax !== "undefined" ? props.yMax : null,
      ],
      tickmode: props.yTickValues ? "array" : "auto",
      tickvals: props.yTickValues ? props.yTickValues : [],
      ticktext: props.yTickValues
        ? props.yTickLabels
          ? props.yTickLabels
          : props.yTickValues
        : [],
    };
    return yAxesInit;
  });
  const [legend] = useState(() => {
    let legendInit =
     showLegend === true
        ? {
            legend: {
              orientation: "h",
              x: 1,
              xanchor: "right",
              y: 0.975,
              bgcolor: "00000000",
            },
          }
        : {};
    return legendInit;
  });

  const [layout, setLayout] = useState({
    plot_bgcolor: backgroundColor,
    paper_bgcolor: backgroundColor,
  });

  useEffect(() => {
    setLayout({
      title: {
        text: props.title,
      },
      plot_bgcolor: backgroundColor,
      xaxis: {
        domain: domain,
        gridcolor:
          theme.palette.reactVis[".rv-xy-plot__grid-lines__line"].stroke,
        tickcolor:
          theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
        zerolinecolor:
          theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
        linecolor:
          theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
        zeroline: true,
        showline: true,
        showgrid: true,
        automargin: true,
        range: [
          typeof props.xMin !== "undefined" ? props.xMin : null,
          typeof props.xMax !== "undefined" ? props.xMax : null,
        ],
        tickmode: props.xTickValues ? "array" : "auto",
        tickvals: props.xTickValues ? props.xTickValues : [],
        ticktext: props.xTickValues
          ? props.xTickLabels
            ? props.xTickLabels
            : props.xTickValues
          : [],
      },
      ...yAxes,
      font: {
        family: "Roboto,Arial",
        color: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
      },
      paper_bgcolor: backgroundColor,
      ...legend,
      showlegend: showLegend,
      margin: {
        t: props.title ? 32 : 16,
        r: 16,
        l: 48,
        b: 32,
      },
      annotations: [
        yAxisTitle && {
          xref: "paper",
          yref: "paper",
          x: 0,
          xanchor: "left",
          y: 1,
          yanchor: "top",
          text: yAxisTitle,
          textangle: 270,
          showarrow: false,
        },
        xAxisTitle && {
          xref: "paper",
          yref: "paper",
          x: 1,
          xanchor: "right",
          y: 0,
          yanchor: "bottom",
          text: xAxisTitle,
          showarrow: false,
        },
      ],
    });
  }, [
    theme,
    showLegend,
    xAxisTitle,
    props.title,
    backgroundColor,
    props.xMin,
    props.xTickLabels,
    props.xTickValues,
    yAxisTitle,
    yAxes,
    domain,
    legend,
    props.xMax,
  ]);

  return (
    <div
      ref={paperRef}
      style={{
        width: width ? width : widthComputed,
        height: height ? height : heightComputed,
        margin: 8,
        backgroundColor: backgroundColor,
      }}
    >
      <PlotData
        {...props}
        backgroundColor={backgroundColor}
        updateRate={updateRate}
        makeNewSocketIoConnection={makeNewSocketIoConnection}
        pollingRate={pollingRate}
        usePolling={usePolling}
        updateMode={updateMode}
      >
        {({ data, contextInfo }) => {
          const traces = createTraces(data);

          return (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "inherit",
                padding: 8,
              }}
              onContextMenu={
                props.disableContextMenu ? undefined : handleToggleContextMenu
              }
              onPointerDownCapture={(event) => {
                if (event.button !== 0) {
                  event.preventDefault();
                  return;
                }
              }}
            >
              {contextInfo && openContextMenu && (
                <ContextMenu
                  disableProbe={props.disableProbe}
                  open={openContextMenu}
                  pvs={contextInfo}
                  handleClose={handleContextMenuClose}
                  probeType={"readOnly"}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                />
              )}
              <Plot
                config={
                  typeof props.displayModeBar !== "undefined"
                    ? {
                        displaylogo: false,
                        scrollZoom: false,
                        displayModeBar: props.displayModeBar,
                        staticPlot: isMobileOnly ? true : false,
                        toImageButtonOptions: {
                          format: "svg",
                        },
                      }
                    : {
                        displaylogo: false,
                        scrollZoom: false,
                        staticPlot:
                          isMobileOnly && disableMobileStatic === false
                            ? true
                            : false,
                        toImageButtonOptions: {
                          format: "svg",
                        },
                      }
                }
                useResizeHandler={true}
                style={plotlyStyle}
                data={traces}
                layout={{ ...layout }}
              />
            </div>
          );
        }}
      </PlotData>
    </div>
  );
};

interface GraphXYProps {
  /** X Array of the process variables,eg. ['$(device):test$(id0)','$(device):test$(id1)']*/
  xPVs: string[];
  /** Y Array of the process variables,  eg. ['$(device):test$(id0)','$(device):test$(id1)']*/
  yPVs: string[];
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id0)':'1','$(id1)':'2'}}*/
  macros?: Record<string, string>;
  /** Y axis title. */
  yAxisTitle?: string;
  /** X axis title. */
  xAxisTitle?: string;

  /**
   * Show the plotly mode bar: if true, display permanently, if false hide permanently, if undefined it will display on hover.
   */
  displayModeBar?: boolean;
  /** Custom y axis minimum to be used,if not defined the graph will auto-scale */
  yMin?: number;
  /** Custom y axis maximum to be used,if not defined the graph will auto-scale */
  yMax?: number;

  /** If defined, then the DataConnection debugging information will be displayed*/
  debug?: boolean;
  /** If defined, then a legend will be displayed,using the string items defined in the array*/
  legend?: string[];
  /** If defined, then the default line colors will be overridden using the string items defined in the array*/
  lineColor?: string[];
  /** If defined then the length of the line graphs will grow up until the value defined*/
  maxLength?: number;

  /** Directive to sample the PV value, on the client side at the polling rate*/
  usePolling?: boolean;
  /** Directive to scale the y-axis as a log base 10 value*/
  yScaleLog10?: boolean;
  /**
   * The plotjs format overide for the tick format. This is derived from the <a href="https://github.com/d3/d3-format/blob/v2.0.0/README.md#format">d3 format specification</a>
   * Example: ".3e" : exponential notaion with 3 digits.
   *
   */
  yTickFormat?: string;
  /**
   * Use this prop to make a seperate socket connection for the graph. It is experimental and can be possbily improve performace and for high data rate pv's and prevent slowing down the user interface
   */
  makeNewSocketIoConnection?: boolean;
  /** Polling interval in ms used in polling mode*/
  pollingRate?: number;

  /** Directive to use PV timestamp on x-axis*/
  useTimeStamp?: boolean;
  /** Graph update perdiod in ms, set this higher for larger number of data points */
  updateRate?: number;

  /**
   * The plotjs format overide for the y value. This is derived from the <a href="https://github.com/d3/d3-format/blob/v2.0.0/README.md#format">d3 format specification</a>
   * Example: ".3e" : exponential notation with 3 digits.
   *
   */
  yHoverFormat?: string;
  /**
   * Directive to show the legend
   */
  showLegend?: boolean;
  /** Update mode of the graph, Note polling mode will override these settings*/
  updateMode?: "updateOnXOrYChange" | "updateOnYChange" | "updateOnXChange";
  /** If the height is undefined then the height will be set to parents width multplied by the aspect ratio*/
  aspectRatio?: number;
  /**
   * The backgorund color defaults to ```theme.palette.background.default```
   * For a Paper or a Card component set it to ```theme.palette.background.paper```
   */
  backgroundColor?: string;
  /**
   * Set the width
   */
  width?: string;
  /**
   * Set the height, by default it is calculated from the width X aspectRatio.
   */
  height?: string;
  /**
   * **Note**: the zoom feature is disabled on a mobile device. To enable set this prop to true.
   */
  disableMobileStatic?: boolean;
  /** Overide the plotly.js style*/
  plotlyStyle?: React.CSSProperties;
}

export default GraphXY;
