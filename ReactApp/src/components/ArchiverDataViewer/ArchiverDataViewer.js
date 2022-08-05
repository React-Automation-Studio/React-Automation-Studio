import React, { useContext, useState, useEffect, useRef } from "react";
import AutomationStudioContext from "../SystemComponents/AutomationStudioContext";
import ContextMenu from "../SystemComponents/ContextMenu";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import DateFnsUtils from "@date-io/date-fns";
import formatISO from "date-fns/formatISO";
import {
  subHours,
  subSeconds,
  subMinutes,
  subDays,
  subWeeks,
  differenceInSeconds,
} from "date-fns";
import PV from "../SystemComponents/PV";
import { replaceMacros } from "../SystemComponents/Utils/macroReplacement";
import makeStyles from "@mui/styles/makeStyles";
import { useTheme } from "@mui/material/styles";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

import Button from "@mui/material/Button";
import Plot from "react-plotly.js";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import { LanDisconnect } from "mdi-material-ui/";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  buttonRoot: {
    textTransform: "none",
  },
  accordianRoot: {
    "&:before": {
      background: "rgba(0,0,0,0)",
    },
  },
  "@global": {
    ".js-plotly-plot .plotly .modebar": {
      // left: '50%',
      transform: "translateX(-50%)",
    },
  },
}));

const useArchiverDataHook = (props) => {
  const context = useContext(AutomationStudioContext);
  const [data, setData] = useState(null);
  const [initialized, setInitialized] = useState(true);
  useEffect(() => {
    const handleAck = (msg) => {
      if (typeof msg !== "undefined") {
        setInitialized(msg.initialized);
      }
    };
    const handleArchiverReadData = (msg) => {
      setData(msg.data);
      setInitialized(true);
    };
    let socket = context.socket;
    let jwt = context.userTokens.accessToken;
    if (props.archiverURL) {
      socket.emit(
        "archiverRead",
        { archiverURL: props.archiverURL, clientAuthorisation: jwt },
        handleAck
      );
      socket.on(
        "archiverReadData:" + props.archiverURL,
        handleArchiverReadData
      );
    }
    const reconnect = () => {
      if (props.archiverURL) {
        socket.emit("archiverRead", {
          archiverURL: props.archiverURL,
          clientAuthorisation: jwt,
          handleAck,
        });
      }
    };
    const disconnect = () => {
      if (props.archiverURL) {
        setInitialized(false);
        setData(null);
      }
    };
    socket.on("disconnect", disconnect);
    socket.on("connect", reconnect);
    return () => {
      if (props.archiverURL) {
        socket.removeListener("connect", reconnect);
        socket.removeListener("disconnect", disconnect);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.archiverURL]);
  return { data: data, initialized: initialized };
};

const ArchiverData = (props) => {
  const theme = useTheme();
  const calcBin = (pv, from, to, maxNumberOfSamples, raw) => {
    let dif = differenceInSeconds(to, from);
    if (raw) {
    } else if (dif > maxNumberOfSamples) {
      let binSizeInSeconds = Math.ceil(dif / maxNumberOfSamples);
      let query = "mean_" + binSizeInSeconds + "(" + pv + ")";
      return query;
    } else {
      return pv;
    }
  };
  const { data, initialized } = useArchiverDataHook({
    archiverURL:
      "arch://" +
      props.archiver +
      ":request:" +
      JSON.stringify({
        pv: calcBin(props.pv, props.from, props.to, props.maxNumberOfSamples),
        options: {
          from: formatISO(props.from),
          to: formatISO(props.to),
          parameters: props.parameters,
        },
      }),
  });
  const [dataXY, setDataXY] = useState({ x: [], y: [] });
  useEffect(() => {
    if (data !== null && typeof data !== "undefined") {
      let newArchiverData = [];
      let x = [];
      let y = [];
      if (data.length > 0) {
        if (typeof data[0].data !== undefined) {
          newArchiverData = data[0].data;
          let sample;
          for (sample in newArchiverData) {
            // eslint-disable-next-line eqeqeq
            if (sample == 0) {
              x.push(props.from);
              y.push(newArchiverData[sample].val);
            } else {
              if (sample > 0) {
                x.push(new Date(newArchiverData[sample].secs * 1000));
                y.push(newArchiverData[sample - 1].val);
              }
              x.push(new Date(newArchiverData[sample].secs * 1000));
              y.push(newArchiverData[sample].val);
            }
            // eslint-disable-next-line eqeqeq
            if (sample == newArchiverData.length - 1) {
              x.push(props.to);
              y.push(newArchiverData[sample].val);
            }
          }
          setDataXY({ x: x, y: y });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  useEffect(() => {
    props.archData(dataXY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataXY]);

  return (
    <React.Fragment>
      <div />
      {initialized === false && (
        <Typography>
          <LanDisconnect
            fontSize="inherit"
            style={{
              color: theme.palette.error.main,
              verticalAlign: "middle",
            }}
          />
          {" " +
            props.archiver +
            " Not connected or no data for PV: " +
            props.pv}
        </Typography>
      )}
    </React.Fragment>
  );
};

/**
 * The ArchiverDataViewer is an interface to display EPICS archived data. It uses plotly.js to display the the pv data.
 * The archiver needs to be declared as environment variable in order for the pvServer to connect to a valid archiver (see the archiver prop). For the DEMO_ARCHIVER, the environment variable declaration is:
 * `DEMO_ARCHIVER=http://localhost:17668`. The demo archiver needs to built for the demos to work. It is available at: <a href="https://github.com/React-Automation-Studio/React-Automation-Studio-Demo-Archiver"> React-Automation-Studio-Demo-Archiver</a>
 * <br/>The ArchiveDataViewer will indicate if connection can't be established to the pv's archived data.
 * @param {*} props
 */
const ArchiverDataViewer = (props) => {
  const paperRef = useRef(null);
  const classes = useStyles();
  const theme = useTheme();
  const [pvsArchData, setPvsArchData] = useState([]);
  const [pvs, setPvs] = useState([]);
  const pvConnections = () => {
    let newPvs = [];
    props.traces.forEach((item, index) => {
      const pvName = replaceMacros(item.pv, props.macros);
      newPvs.push(
        <PV
          key={index.toString()}
          pv={pvName}
          pvData={(pv) => {
            if (pvs[index]) {
              if (pvs[index].initialized !== pv.initialized) {
                setPvs((prePvs) => {
                  let newPvs = [...prePvs];
                  newPvs[index] = {};
                  newPvs[index]["initialized"] = pv.initialized;
                  newPvs[index]["pvname"] = pvName.replace("pva://", "");
                  return newPvs;
                });
              }
            } else {
              setPvs((prePvs) => {
                let newPvs = [...prePvs];
                newPvs[index] = {};
                newPvs[index]["initialized"] = pv.initialized;
                newPvs[index]["pvname"] = replaceMacros(item.pv, props.macros);
                return newPvs;
              });
            }
          }}
        />
      );
    });
    return newPvs;
  };
  const initSelectedFromDate = () => {
    if (typeof props.from !== "undefined") {
      return new Date(props.from);
    } else if (typeof props.fromTimeOffset !== "undefined") {
      let newDate;
      let date = new Date();
      switch (props.fromTimeOffset) {
        case "30s":
          newDate = subSeconds(date, 30);
          break;
        case "1m":
          newDate = subMinutes(date, 1);
          break;
        case "5m":
          newDate = subMinutes(date, 5);
          break;
        case "30m":
          newDate = subMinutes(date, 30);
          break;
        case "1h":
          newDate = subHours(date, 1);
          break;
        case "2h":
          newDate = subHours(date, 2);
          break;
        case "12h":
          newDate = subHours(date, 12);
          break;
        case "1d":
          newDate = subDays(date, 1);
          break;
        case "2d":
          newDate = subDays(date, 2);
          break;
        case "1w":
          newDate = subWeeks(date, 1);
          break;
        default:
          newDate = subHours(date, 1);
      }
      return newDate;
    } else {
      return subHours(new Date(), 1);
    }
  };
  const [selectedFromDate, setSelectedFromDate] = useState(
    initSelectedFromDate()
  );
  const [selectedToDate, setSelectedToDate] = useState(
    props.to ? new Date(props.to) : new Date()
  );
  const [live, setLive] = useState(props.livePolling === true);
  const [livePollingRatePeriod, setLivePollingRatePeriod] = useState(
    props.pollingRatePeriod ? parseInt(props.pollingRatePeriod) : 1000
  );
  const [fromButton, setFromButton] = useState(
    props.fromTimeOffset ? props.fromTimeOffset : "none"
  );
  useEffect(() => {
    const updateToDate = () => {
      let date = new Date();
      setSelectedToDate(date);
      switch (fromButton) {
        case "30s":
          setSelectedFromDate(subSeconds(date, 30));
          break;
        case "1m":
          setSelectedFromDate(subMinutes(date, 1));
          break;
        case "5m":
          setSelectedFromDate(subMinutes(date, 5));
          break;
        case "30m":
          setSelectedFromDate(subMinutes(date, 30));
          break;
        case "1h":
          setSelectedFromDate(subHours(date, 1));
          break;
        case "2h":
          setSelectedFromDate(subHours(date, 2));
          break;
        case "12h":
          setSelectedFromDate(subHours(date, 12));
          break;
        case "1d":
          setSelectedFromDate(subDays(date, 1));
          break;
        case "2d":
          setSelectedFromDate(subDays(date, 2));
          break;
        case "1w":
          setSelectedFromDate(subWeeks(date, 1));
          break;
        default:
      }
    };
    let intervalId;
    if (live) {
      let dif = differenceInSeconds(selectedToDate, selectedFromDate);
      let pollingRatePeriod = dif < 1000 ? 1000 : 1000 * Math.ceil(dif / 17519);
      let newPollingRatePeriod = props.pollingRatePeriod
        ? props.pollingRatePeriod > 1000
          ? props.pollingRatePeriod
          : 1000
        : pollingRatePeriod;
      setLivePollingRatePeriod(newPollingRatePeriod);
      intervalId = setInterval(updateToDate, newPollingRatePeriod);
    }
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live, fromButton, props.pollingRatePeriod]);
  const handleOnClick30s = () => {
    let date = new Date();
    setSelectedFromDate(subSeconds(date, 30));
    setSelectedToDate(date);
    setFromButton("30s");
  };
  const handleOnClick1m = () => {
    let date = new Date();
    setSelectedFromDate(subMinutes(date, 1));
    setSelectedToDate(date);
    setFromButton("1m");
  };
  const handleOnClick5m = () => {
    let date = new Date();
    setSelectedFromDate(subMinutes(date, 5));
    setSelectedToDate(date);
    setFromButton("5m");
  };
  const handleOnClick30m = () => {
    let date = new Date();
    setSelectedFromDate(subMinutes(date, 30));
    setSelectedToDate(date);
    setFromButton("30m");
  };
  const handleOnClick1h = () => {
    let date = new Date();
    setSelectedFromDate(subHours(date, 1));
    setSelectedToDate(date);
    setFromButton("1h");
  };
  const handleOnClick2h = () => {
    let date = new Date();
    setSelectedFromDate(subHours(date, 2));
    setSelectedToDate(date);
    setFromButton("2h");
  };
  const handleOnClick12h = () => {
    let date = new Date();
    setSelectedFromDate(subHours(date, 12));
    setSelectedToDate(date);
    setFromButton("12h");
  };
  const handleOnClick1d = () => {
    let date = new Date();
    setSelectedFromDate(subDays(date, 1));
    setSelectedToDate(date);
    setFromButton("1d");
  };
  const handleOnClick2d = () => {
    let date = new Date();
    setSelectedFromDate(subDays(date, 2));
    setSelectedToDate(date);
    setFromButton("2d");
  };
  const handleOnClick1w = () => {
    let date = new Date();
    setSelectedFromDate(subWeeks(date, 1));
    setSelectedToDate(date);
    setFromButton("1w");
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [openContextMenu, setOpenContextMenu] = useState(false);
  const handleToggleContextMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.target);
    setOpenContextMenu(!openContextMenu);
  };
  const handleContextMenuClose = () => {
    setOpenContextMenu(false);
  };
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  useEffect(() => {
    const handleResize = () => {
      if (paperRef.current) {
        setHeight(paperRef.current.offsetHeight);
        setWidth(paperRef.current.offsetWidth);
      }
    };
    // The 'current' property contains info of the reference:
    // align, title, ... , width, height, etc.
    if (paperRef.current) {
      setHeight(paperRef.current.offsetHeight);
      setWidth(paperRef.current.offsetWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [paperRef]);
  const [domain, setDomain] = useState([0, 1]);
  const [yPositions, setYPositions] = useState([0, 0, 0]);
  useEffect(() => {
    if (props.yAxes !== undefined) {
      let numberOfyAxes = props.yAxes.length;
      let newYPositions = [];
      let increment = 100 / width;
      let newDomain = [increment * (numberOfyAxes - 1), 1];
      let index = 0;
      for (let i = numberOfyAxes - 1; i >= 0; i--) {
        newYPositions[index] = i * increment;
        index++;
      }
      setYPositions(newYPositions);
      setDomain(newDomain);
    } else {
      setYPositions([0]);
      setDomain([0, 1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);
  let yAxes = {};
  if (props.yAxes !== undefined) {
    props.yAxes.forEach((item, index) => {
      let key = index === 0 ? "yaxis" : "yaxis" + (index + 1);
      if (index > 0) {
        yAxes[key] = {
          title: item.title ? item.title : "Y-Axis " + (index + 1),
          titlefont: {
            color:
              props.yAxes.length > 1
                ? theme.palette.reactVis.lineColors[index]
                : theme.palette.reactVis[".rv-xy-plot__axis__tick__line"]
                    .stroke,
          },
          tickfont: {
            color:
              props.yAxes.length > 1
                ? theme.palette.reactVis.lineColors[index]
                : theme.palette.reactVis[".rv-xy-plot__axis__tick__line"]
                    .stroke,
          },
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
          showgrid: item.showGrid ? item.showGrid : true,
          side: "left",
          position: yPositions[index],
          anchor: "free",
          overlaying: "y",
          type: item.type === "log" ? "log" : "linear",
          tickformat: item.tickFormat ? item.tickFormat : "",
        };
      } else {
        yAxes["yaxis"] = {
          title: item.title ? item.title : "Y-Axis " + (index + 1),
          titlefont: { color: theme.palette.reactVis.lineColors[index] },
          tickfont: { color: theme.palette.reactVis.lineColors[index] },
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
          type: item.type === "log" ? "log" : "linear",
          tickformat: item.tickFormat ? item.tickFormat : "",
        };
      }
    });
  } else {
    yAxes["yaxis"] = {
      title: "Y-Axis ",
      gridcolor: theme.palette.reactVis[".rv-xy-plot__grid-lines__line"].stroke,
      tickcolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
      zerolinecolor:
        theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
      linecolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
      zeroline: true,
      showline: true,
      showgrid: true,
    };
  }
  let legend =
    props.showLegend === true
      ? {
          legend: isMobile
            ? {
                orientation: "h",
                x: 0,
                y: 1.1,
              }
            : undefined,
        }
      : {};
  let layout = {
    title: props.title,
    plot_bgcolor: theme.palette.background.paper,
    xaxis: {
      domain: domain,
      title: props.xAxisTitle ? props.xAxisTitle : "",
      gridcolor: theme.palette.reactVis[".rv-xy-plot__grid-lines__line"].stroke,
      tickcolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
      zerolinecolor:
        theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
      linecolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
      zeroline: true,
      showline: true,
      showgrid: true,
      range: [selectedFromDate, selectedToDate],
    },
    ...yAxes,
    font: {
      family: "Roboto,Arial",
      color: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
    },
    paper_bgcolor: theme.palette.background.paper,
    ...legend,
    showlegend: props.showLegend,
  };

  return (
    <div ref={paperRef} style={{ width: props.width }}>
      {pvConnections()}

      {props.showButtons && (
        <Accordion
          classes={{ root: classes.accordianRoot }}
          elevation={0}
          defaultExpanded={props.defaultButtonsExpanded}
          style={{ marginBottom: 0 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}></AccordionSummary>
          <AccordionDetails>
            <Grid
              container
              spacing={2}
              alignItems={"center"}
              direction={"row"}
              justifyContent={"center"}
            >
              <Grid item xl={6} lg={"auto"} md={12} sm={12} xs={12}>
                <Grid
                  container
                  spacing={2}
                  alignItems={"center"}
                  direction={"row"}
                  justifyContent={"center"}
                >
                  <Grid item xs={2} sm={"auto"} md={1} lg={"auto"}>
                    <Button
                      classes={{ root: classes.buttonRoot }}
                      variant={"outlined"}
                      color={fromButton === "30s" ? "secondary" : "primary"} //was default
                      onClick={handleOnClick30s}
                    >
                      30s
                    </Button>
                  </Grid>
                  <Grid item xs={2} sm={"auto"} md={1} lg={"auto"}>
                    <Button
                      classes={{ root: classes.buttonRoot }}
                      onClick={handleOnClick1m}
                      variant={"outlined"}
                      color={fromButton === "1m" ? "secondary" : "primary"} //was default
                    >
                      1m
                    </Button>
                  </Grid>
                  <Grid item xs={2} sm={"auto"} md={1} lg={"auto"}>
                    <Button
                      classes={{ root: classes.buttonRoot }}
                      onClick={handleOnClick5m}
                      variant={"outlined"}
                      color={fromButton === "5m" ? "secondary" : "primary"} //was default
                    >
                      5m
                    </Button>
                  </Grid>
                  <Grid item xs={2} sm={"auto"} md={1} lg={"auto"}>
                    <Button
                      classes={{ root: classes.buttonRoot }}
                      onClick={handleOnClick30m}
                      variant={"outlined"}
                      color={fromButton === "30m" ? "secondary" : "primary"} //was default
                    >
                      30m
                    </Button>
                  </Grid>
                  <Grid item xs={2} sm={"auto"} md={1} lg={"auto"}>
                    <Button
                      classes={{ root: classes.buttonRoot }}
                      onClick={handleOnClick1h}
                      variant={"outlined"}
                      color={fromButton === "1h" ? "secondary" : "primary"} //was default
                    >
                      1h
                    </Button>
                  </Grid>
                  <Grid item xs={2} sm={"auto"} md={1} lg={"auto"}>
                    <Button
                      classes={{ root: classes.buttonRoot }}
                      onClick={handleOnClick2h}
                      variant={"outlined"}
                      color={fromButton === "2h" ? "secondary" : "primary"} //was default
                    >
                      2h
                    </Button>
                  </Grid>
                  <Grid item xs={2} sm={"auto"} md={1} lg={"auto"}>
                    <Button
                      classes={{ root: classes.buttonRoot }}
                      onClick={handleOnClick12h}
                      variant={"outlined"}
                      color={fromButton === "12h" ? "secondary" : "primary"} //was default
                    >
                      12h
                    </Button>
                  </Grid>
                  <Grid item xs={2} sm={"auto"} md={1} lg={"auto"}>
                    <Button
                      classes={{ root: classes.buttonRoot }}
                      onClick={handleOnClick1d}
                      variant={"outlined"}
                      color={fromButton === "1d" ? "secondary" : "primary"} //was default
                    >
                      1d
                    </Button>
                  </Grid>
                  <Grid item xs={2} sm={"auto"} md={1} lg={"auto"}>
                    <Button
                      classes={{ root: classes.buttonRoot }}
                      onClick={handleOnClick2d}
                      variant={"outlined"}
                      color={fromButton === "2d" ? "secondary" : "primary"} //was default
                    >
                      2d
                    </Button>
                  </Grid>
                  <Grid item xs={2} sm={"auto"} md={1} lg={"auto"}>
                    <Button
                      classes={{ root: classes.buttonRoot }}
                      onClick={handleOnClick1w}
                      variant={"outlined"}
                      color={fromButton === "1w" ? "secondary" : "primary"} //was default
                    >
                      1w
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xl={2}
                lg={"auto"}
                md={4}
                sm={6}
                xs={6}
                style={{ textAlign: "center" }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDateTimePicker
                    label="From:"
                    value={selectedFromDate}
                    maxDateTime={selectedToDate}
                    onChange={(newDate) => {
                      setSelectedFromDate(newDate);

                      setFromButton("none");
                    }}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid
                item
                xl={2}
                lg={"auto"}
                md={4}
                sm={6}
                xs={6}
                style={{ textAlign: "center" }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDateTimePicker
                    label="To:"
                    value={selectedToDate}
                    minDateTime={selectedFromDate}
                    onChange={(newDate) => {
                      setSelectedToDate(newDate);
                      setFromButton("none");
                      setLive(false);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xl={3} lg={"auto"} md={4} sm={6} xs={12}>
                <Grid
                  container
                  spacing={2}
                  alignItems={"center"}
                  direction={"row"}
                  justifyContent={"center"}
                >
                  <Grid item xs={4} md={4}>
                    <Button
                      classes={{ root: classes.buttonRoot }}
                      variant={"contained"}
                      color={live ? "primary" : "default"}
                      onClick={() => setLive(live === true ? false : true)}
                    >
                      Live
                    </Button>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <TextField
                      label="Refresh Rate"
                      variant="outlined"
                      value={parseInt(livePollingRatePeriod) / 1000}
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">sec</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}
      {width !== null && height !== null && (
        <div
          style={{
            width: width,
            height: props.height,
            background: theme.palette.background.paper,
            paddingBottom: 8,
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
          <Plot
            config={
              props.displayModeBar
                ? {
                    displaylogo: false,
                    scrollZoom: false,
                    doubleclick: false,
                    displayModeBar: props.displayModeBar,
                    toImageButtonOptions: {
                      format: "svg",
                    },
                  }
                : {
                    displaylogo: false,
                    scrollZoom: false,
                    toImageButtonOptions: {
                      format: "svg",
                    },
                  }
            }
            useResizeHandler={true}
            style={{
              position: "relative",
              display: "inline-block",
              width: "100%",
              height: "100%",
              paddingBottom: 8,
            }}
            data={pvsArchData.map((pvData, index) => {
              if (index === 0) {
                return {
                  x: pvData.x,
                  y: pvData.y,
                  name: props.traces[index].name
                    ? props.traces[index].name
                    : replaceMacros(
                        props.traces[index].pv,
                        props.macros
                      ).replace("pva://", ""),
                  type: props.traces[index].type
                    ? props.traces[index].type
                    : "scatter",
                  mode: props.traces[index].mode
                    ? props.traces[index].mode
                    : "lines",
                  marker: {
                    color: props.traces[index].color
                      ? props.traces[index].color
                      : theme.palette.reactVis.lineColors[index],
                  },
                  hovertemplate: props.traces[index].yHoverFormat
                    ? "(%{y:" +
                      props.traces[index].yHoverFormat +
                      "}) %{x}<extra>%{fullData.name}</extra>"
                    : "(%{y}) %{x}<extra>%{fullData.name}</extra>",
                };
              } else {
                return {
                  x: pvData.x,
                  y: pvData.y,
                  name: props.traces[index].name
                    ? props.traces[index].name
                    : replaceMacros(
                        props.traces[index].pv,
                        props.macros
                      ).replace("pva://", ""),
                  type: props.traces[index].type
                    ? props.traces[index].type
                    : "scatter",
                  mode: props.traces[index].mode
                    ? props.traces[index].mode
                    : "lines",
                  marker: {
                    color: props.traces[index].color
                      ? props.traces[index].color
                      : theme.palette.reactVis.lineColors[index],
                  },
                  yaxis:
                    typeof props.traces[index].yAxis !== "undefined"
                      ? parseInt(props.traces[index].yAxis) === 0
                        ? undefined
                        : "y" + (parseInt(props.traces[index].yAxis) + 1)
                      : "yaxis",
                  hovertemplate: props.traces[index].yHoverFormat
                    ? "(%{y:" +
                      props.traces[index].yHoverFormat +
                      "}) %{x}<extra>%{fullData.name}</extra>"
                    : "(%{y}) %{x}<extra>%{fullData.name}</extra>",
                };
              }
            })}
            layout={{ ...layout }}
          />
          <ContextMenu
            disableProbe={props.disableProbe}
            open={openContextMenu}
            pvs={pvs}
            handleClose={handleContextMenuClose}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            probeType={props.readOnly ? "readOnly" : undefined}
          />
        </div>
      )}
      {props.traces.map(
        (trace, index) =>
          width !== null &&
          height !== null && (
            <ArchiverData
              key={index.toString()}
              maxNumberOfSamples={width * 10}
              archiver={props.archiver}
              pv={replaceMacros(trace.pv, props.macros)}
              from={selectedFromDate}
              to={selectedToDate}
              parameters={"&donotchunk"}
              archData={(data) =>
                setPvsArchData((prevData) => {
                  let pvData = [...prevData];
                  pvData[index] = data;
                  return pvData;
                })
              }
            />
          )
      )}
    </div>
  );
};

ArchiverDataViewer.propTypes = {
  /**
   * 	Is name of the environment variable defined in your .env or docker-compose yaml file file and corresponds to hostname or ip of the archiver followed by `retrieval_url` port, eg DEMO_ARCHIVER
   * In the .env file it should be declared as `DEMO_ARCHIVER=http://localhost:17688`
   */
  archiver: PropTypes.string,
  /**
   * The height of the graph
   */
  height: PropTypes.string,
  /**
   * The width of the graph
   */
  width: PropTypes.string,
  /**
   * Direct to show the legend
   */
  showLegend: PropTypes.bool,
  /**
   * An array of objects with shape that defines each trace
   */
  traces: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * The pv name
       */
      pv: PropTypes.string.isRequired,
      /**
       * The custom name of the trace
       */
      name: PropTypes.string,
      /**
       * The type of the trace i.e. `'scatter'`
       */
      type: PropTypes.string,
      /**
       * The mode of the trace i.e. `'lines'`
       */
      mode: PropTypes.string,
      /**
       * The custom color of the trace
       */
      color: PropTypes.color,
      /**
       * Corresponding yAxis index
       */
      yAxis: PropTypes.number,
      /**
       * The plotjs format overide for the y value. This is derived from the <a href="https://github.com/d3/d3-format/blob/v2.0.0/README.md#format">d3 format specification</a>
       * Example: ".3e" : exponential notaion with 3 digits.
       *
       */
      yHoverFormat: PropTypes.string,
    })
  ),

  /**
   * An array of objects with shape that defines each Y Axis
   */
  yAxes: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Axis title
       */
      title: PropTypes.string,
      /**
       * Axis color
       */
      color: PropTypes.string,
      /**
       * show or hide the grid
       */
      showgrid: PropTypes.bool,
      /**
       * The plotjs format overide for the tick format. This is derived from the <a href="https://github.com/d3/d3-format/blob/v2.0.0/README.md#format">d3 format specification</a>
       * Example: ".3e" : exponential notaion with 3 digits.
       *
       */
      tickFormat: PropTypes.string,
      /**
       * 'linear' or 'log' type
       */
      type: PropTypes.string,
    })
  ),
  /**
   * Expand the buttons accordion
   */
  defaultButtonsExpanded: PropTypes.bool,
  /**
   * Display mode bar, true= display permanently, false=permanently hidden, undefine= auto hide
   */
  displayModeBar: PropTypes.bool,
  /**
   * Show buttons accordion
   */
  showButtons: PropTypes.bool,
  /**
   * When enabled, new data will be polled at 1Hz up to 12 hours of data. The polling rate period then increase linearly as to not overload the archiver
   */
  livePolling: PropTypes.bool,
  /**
   * Polling Rate Period in ms, minimum=1000 ms. This value will also override the linear scaling of the polling period for data queries of larger than 12 hours worth of data.
   */
  pollingRatePeriod: PropTypes.number,
  /**
   * Sets fromTimeOffset button
   */
  fromTimeOffset: PropTypes.oneOf([
    "30s",
    "1m",
    "5m",
    "30m",
    "1h",
    "2h",
    "12h",
    "1d",
    "2d",
    "1w",
  ]),
  /**
   * From  time, ISO date format: (YYYY-MM-DDTHH:MM:SSZ), will override the fromTimeOffset
   */
  from: PropTypes.string,
  /**
   * To  time,  ISO date format: (YYYY-MM-DDTHH:MM:SSZ)
   */
  to: PropTypes.string,
};

/**
 * Default props.definition
 */
ArchiverDataViewer.defaultProps = {
  width: "100%",
  height: "40vh",
  showLegend: false,
  defaultButtonsExpanded: true,
};

export default ArchiverDataViewer;
