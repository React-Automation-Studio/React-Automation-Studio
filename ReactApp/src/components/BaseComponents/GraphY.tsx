import React, { useEffect, useState, useRef, useReducer } from "react";
import { useTheme } from "@mui/material/styles";
import ContextMenu from "../SystemComponents/ContextMenu";
import PV from "../SystemComponents/PV";
import Plot from "react-plotly.js";
import { isMobileOnly } from "react-device-detect";
import { replaceMacros } from "../SystemComponents/Utils/macroReplacement";
import { useUpdateDataWorker } from "./GraphY/UpdateDataWorker";
const PlotData = (props) => {
  const theme = useTheme();
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

  const [trigger2, setTrigger2] = useState(0);

  // Replace the reducer with the worker hook
  const [data, processUpdate] = useUpdateDataWorker();

  useEffect(() => {
    const timeout = setTimeout(
      () => setTrigger((prev) => prev + 1),
      parseInt(updateRate)
    );
    setDelayedData(data);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [trigger, updateRate]);

  useEffect(() => {
    const timeout = setTimeout(() => setTrigger2((prev) => prev + 1), 1000);
    setDelayedContextInfo(contextInfo);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [trigger2]);

  const [polledData, setPolledData] = useState([]);
  const polledDataRef = useRef(polledData);

  useEffect(() => {
    polledDataRef.current = polledData;
  }, [polledData]);

  const { usePolling, pollingRate } = props;

  // Polling effect
  useEffect(() => {
    let timer;
    const update = () => {
      polledDataRef.current.forEach((item, index) => {
        const timestamp = Date.now() / 1000;
        processUpdate(index, { ...item, timestamp }, props, theme);
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
  }, [usePolling, pollingRate, processUpdate, props, theme]);

  const pvConnections = () => {
    return props.pvs.map((item, index) =>
      processUpdate ? (
        <PV
          key={index.toString()}
          pv={item}
          macros={props.macros}
          pvData={(pvData) =>
            props.usePolling
              ? setPolledData((prev) => {
                  const newPolledData = [...prev];
                  newPolledData[index] = pvData;
                  return newPolledData;
                })
              : processUpdate(index, pvData, props, theme)
          }
          contextInfo={(pvs) => updateContextInfo({ index, pvs })}
          makeNewSocketIoConnection={props.makeNewSocketIoConnection}
        />
      ) : null
    );
  };

  return (
    <React.Fragment>
      {pvConnections()}
      {props.children({
        data: updateRate !== undefined ? delayedData : data,
        contextInfo: delayedContextInfo,
      })}
    </React.Fragment>
  );
};

/**
 * The GraphY Component has been updated to Plotly.js scatter and line plot.
 * **Note**: The update includes a small breaking change.
 * See the backgroundColor prop for the workaround.
 */
const GraphY = ({
  updateRate = 100,
  makeNewSocketIoConnection = false,
  debug = false,
  showLegend = true,
  yAxisTitle = "Y-axis",
  xAxisTitle = "X-axis",
  usePolling = false,
  pollingRate = 100,
  width = "100%",
  height = "100%",
  disableMobileStatic = false,
  plotlyStyle = {
    position: "relative",
    display: "inline-block",
    width: "100%",
    height: "100%",
  },
  maxLength,
  ...props
}: GraphYProps) => {
  const theme = useTheme<any>();
  const backgroundColor = props.backgroundColor
    ? props.backgroundColor
    : theme.palette.background.default;
  const paperRef = useRef<any>(null);
  const [widthComputed, setWidthComputed] = useState(0);
  const [heightComputed, setHeightComputed] = useState(0);
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
            : props.aspectRatio
              ? paperRef.current.offsetWidth * props.aspectRatio
              : paperRef.current.offsetHeight
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
  }, [paperRef, width, height, props.aspectRatio]);

  const [domain, setDomain] = useState([0, 1]);

  useEffect(() => {
    if (props.yAxes !== undefined) {
      let numberOfyAxes: number = props.yAxes.length;
      let newYPositions: number[] = [];
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
      range: [
        typeof props.yMin !== "undefined" ? props.yMin : null,
        typeof props.yMax !== "undefined" ? props.yMax : null,
      ],
      automargin: true,
      ticksuffix: props.yUnits ? props.yUnits : "",
      nticks: props.yNoOfTicks ? props.yNoOfTicks : 0,
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

  const [layout, setLayout] = useState<any>({
    plot_bgcolor: backgroundColor,
    paper_bgcolor: backgroundColor,
  });

  useEffect(() => {
    setLayout({
      title: {
        text: props.title,
      },
      plot_bgcolor: backgroundColor,
      autosize: true,
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
        ticksuffix: props.xUnits ? props.xUnits : "",
        nticks: props.xNoOfTicks ? props.xNoOfTicks : 0,
        tickformat: props.xTickFormat ? props.xTickFormat : "",
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
        t: props.title ? 24 : 16,
        r: isMobileOnly ? 16 : 0,
        l: 0,
        b: 0,
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
    props.xNoOfTicks,
    props.xTickFormat,
    props.xUnits,
  ]);
  return (
    <div
      ref={paperRef}
      style={{
        paddingRight: 8,
        paddingLeft: 8,
        paddingTop: 8,
        width: width ? width : widthComputed,
        height: height ? height : heightComputed,
        backgroundColor: backgroundColor,
      }}
    >
      <PlotData
        {...props}
        backgroundColor={backgroundColor}
        updateRate={updateRate}
        makeNewSocketIoConnection={makeNewSocketIoConnection}
        debug={debug}
        showLegend={showLegend}
        yAxisTitle={yAxisTitle}
        xAxisTitle={xAxisTitle}
        usePolling={usePolling}
        pollingRate={pollingRate}
        disableMobileStatic={disableMobileStatic}
        plotlyStyle={plotlyStyle}
        maxLength={maxLength}
      >
        {({ data, contextInfo }) => {
          return (
            <div
              style={{ width: "100%", height: "100%" }}
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
                        doubleclick: false,
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
                data={data}
                layout={{ ...layout }}
              />
            </div>
          );
        }}
      </PlotData>
    </div>
  );
};

interface GraphYProps {
  /** Array of the process variables, eg. ['$(device):test$(id0)','$(device):test$(id1)']*/
  pvs: string[];
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
  /** If defined, then the default React-Vis line colors will be overridden using the string items defined in the array*/
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
   */
  yHoverFormat?: string;
  /**
   * Directive to show the legend
   */
  showLegend?: boolean;
  /**
   * **Note**: the zoom feature is disabled on a mobile device. To enable set this prop to true.
   */
  disableMobileStatic?: boolean;
  /** If the height is undefined then the height will be set to parents height, but if the aspectRatio is defined the the height will be set to the width multplied by the aspect ratio*/
  aspectRatio?: number;
  /**
   * The backgorund color defaults to ```theme.palette.background.default```
   * For a Paper or a Card component set it to ```theme.palette.background.paper```
   */
  backgroundColor?: string;
  /**
   * Set the width.
   */
  width?: string;
  /**
   * Set the height.
   */
  height?: string;
  /** Custom y axis units to be used*/
  yUnits?: string;
  /** Custom x axis units to be used*/
  xUnits?: string;
  /** Overide the plotly.js style*/
  plotlyStyle?: React.CSSProperties;
  /**
   * Directive to disable the probes on the graph
   */
  disableProbe?: boolean;
  /**
   * Directive to disable the context menu on the graph
   */
  disableContextMenu?: boolean;
  /**
   * Custom x axis minimum to be used,if not defined the graph will auto-scale
   *
   * */
  xMin?: number;
  /**
   * Custom x axis maximum to be used,if not defined the graph will auto-scale
   *
   * */
  xMax?: number;
  /**
   * The number of ticks on the x-axis
   */
  xNoOfTicks?: number;
  /**
   * The number of ticks on the y-axis
   */
  yNoOfTicks?: number;
  /**
   * Title of the graph
   */
  title?: string;
  /**
   * The x-axis tick format
   */
  xTickFormat?: string;
  /**
   * The x-axis tick values
   */
  xTickValues?: number[];
  /**
   * The x-axis tick labels
   */
  xTickLabels?: string[];
  /**
   * The y-axis tick values
   */
  yTickValues?: number[];
  /**
   * The y-axis tick labels
   */
  yTickLabels?: string[];
  /**
   * yAxes: Array of y-axis properties, the implementation appears broken and will be fixed in a later release
   */
  yAxes?: any[];
}

export default GraphY;
