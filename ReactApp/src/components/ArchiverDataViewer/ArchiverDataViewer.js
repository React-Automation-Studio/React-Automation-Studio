import React, { useContext, useState, useEffect, useRef } from 'react';
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import ContextMenu from "../SystemComponents/ContextMenu";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import formatISO from 'date-fns/formatISO';
import { format, subHours, subSeconds, subMinutes, subDays, subWeeks } from 'date-fns';

import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";


import DateFnsAdapter from "@date-io/date-fns";
import Button from '@material-ui/core/Button';
import Plot from 'react-plotly.js';

import Grid from '@material-ui/core/Grid';
import PropTypes from "prop-types";
import { isMobile, isTablet } from 'react-device-detect';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    buttonRoot: {
        textTransform: 'none',

    },
    '@global': {
        '.js-plotly-plot .plotly .modebar': {
            // left: '50%',
            transform: 'translateX(-50%)',
        }

    },
}));


const useArchiverDataHook = (props) => {

    const context = useContext(AutomationStudioContext);
    const [dbWatchId, setDbWatchId] = useState(null);
    const [data, setData] = useState(null);

    const [writeAccess, setWriteAccess] = useState(false);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const handleArchiverReadAck = (msg) => {

            if (typeof msg !== 'undefined') {
                setDbWatchId(msg.dbWatchId)
            }
        }
        const handleArchiverReadData = (msg) => {

            setData(msg.data);
            setInitialized(true)
            setWriteAccess(msg.write_access)
        }


        let socket = context.socket;
        let jwt = JSON.parse(localStorage.getItem('jwt'));
        if (jwt === null) {
            jwt = 'unauthenticated'
        }
        if (props.archiverURL) {
            socket.emit('archiverRead', { 'archiverURL': props.archiverURL, 'clientAuthorisation': jwt }, handleArchiverReadAck)
            socket.on('archiverReadData:' + props.archiverURL, handleArchiverReadData);
        }

        const reconnect = () => {
            if (props.archiverURL) {
                socket.emit('archiverRead', { 'archiverURL': props.archiverURL, 'clientAuthorisation': jwt }, handleArchiverReadAck)
            }
        }
        const disconnect = () => {
            if (props.archiverURL) {
                setInitialized(false);
                setData(null)
            }
        }
        socket.on('disconnect', disconnect);
        socket.on('reconnect', reconnect);
        return () => {

            if (props.archiverURL) {

                socket.removeListener('reconnect', reconnect);
                socket.removeListener('disconnect', disconnect);
            }

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.archiverURL])

    return (data)

}
const ArchiverData = (props) => {

    const data = useArchiverDataHook({
        archiverURL: 'arch://DEMO_ARCHIVER:request:' + JSON.stringify({
            pv: props.pv,
            options: {
                from: formatISO(props.from),
                to: formatISO(props.to),
                parameters: props.parameters,

            }
        })
    });
    const [dataXY, setDataXY] = useState({ x: [], y: [] })
    useEffect(() => {
        if (data !== null) {
            let newArchiverData = [];
            let x = [];
            let y = [];
            if (typeof data[0].data !== undefined) {

                newArchiverData = data[0].data

                let sample;
                for (sample in newArchiverData) {
                    // eslint-disable-next-line eqeqeq 
                    if (sample == 0) {
                        x.push(props.from);
                        y.push(newArchiverData[sample].val)
                    }
                    else {
                        if (sample > 0) {
                            x.push(new Date(newArchiverData[sample].secs * 1000));
                            y.push(newArchiverData[sample - 1].val)

                        }
                        x.push(new Date(newArchiverData[sample].secs * 1000));
                        y.push(newArchiverData[sample].val)

                    }
                    // eslint-disable-next-line eqeqeq 
                    if (sample == (newArchiverData.length - 1)) {
                        x.push(props.to);
                        y.push(newArchiverData[sample].val)

                    }

                }


                setDataXY({ x: x, y: y })
            }

        }

    }, [data])


    useEffect(() => {
        props.archData(dataXY);
    }, [dataXY])

    return (
        <div />

    )
}

const ArchiverDataViewer = (props) => {
    const paperRef = useRef(null);
    const classes = useStyles();
    const theme = useTheme();
    const [pvsArchData, setPvsArchData] = useState([]);
    const [showCrosshair, setShowCrosshair] = useState(props.showCrosshair === true ? true : false)
    const [selectedFromDate, setSelectedFromDate] = useState(props.from ? new Date(props.from) : subHours(new Date(), 1))
    const [selectedToDate, setSelectedToDate] = useState(props.to ? new Date(props.to) : new Date())
    const [plotlyData, setPlotlyData] = useState({ x: [], y: [] })
    const [live, setLive] = useState(props.livePolling===true);
    const [liveIntervalId, setLiveIntervalId] = useState(null);
    const archData = { data: null }
    const [fromButton, setFromButton] = useState(props.fromTimeOffset?props.fromTimeOffset:'none');

    useEffect(() => {
        const updateToDate = () => {
            let date = new Date();
            setSelectedToDate(date)

            switch (fromButton) {
                case "30s":
                    setSelectedFromDate(subSeconds(date, 30));
                    break;
                case "1m":
                    setSelectedFromDate(subMinutes(date, 1))
                    break;
                case "5m":
                    setSelectedFromDate(subMinutes(date, 5))
                    break;
                case "30m":
                    setSelectedFromDate(subMinutes(date, 30))
                    break;
                case "1h":
                    setSelectedFromDate(subHours(date, 1))
                    break;
                case "2h":
                    setSelectedFromDate(subHours(date, 2))
                    break;
                case "12h":
                    setSelectedFromDate(subHours(date, 12))
                    break;
                case "1d":
                    setSelectedFromDate(subDays(date, 1))
                    break;
                case "2d":
                    setSelectedFromDate(subDays(date, 2))
                    break;
                case "1w":
                    setSelectedFromDate(subWeeks(date, 1))
                    break;
                default:
            }

        }
        let intervalId;
        if (live) {
            intervalId = setInterval(updateToDate, props.pollingRatePeriod?(props.pollingRatePeriod>1000?props.pollingRatePeriod:1000): 1000);


        }

        return () => {
            clearInterval(intervalId)
        }
    }, [live, fromButton])


    const handleOnClick30s = () => {

        let date = new Date();
        setSelectedFromDate(subSeconds(date, 30))
        setSelectedToDate(date)
        setFromButton("30s");
    }

    const handleOnClick1m = () => {

        let date = new Date();
        setSelectedFromDate(subMinutes(date, 1))
        setSelectedToDate(date)
        setFromButton("1m");
    }
    const handleOnClick5m = () => {
        let date = new Date();
        setSelectedFromDate(subMinutes(date, 5))
        setSelectedToDate(date)
        setFromButton("5m");
    }
    const handleOnClick30m = () => {
        let date = new Date();
        setSelectedFromDate(subMinutes(date, 30))
        setSelectedToDate(date)
        setFromButton("30m");
    }
    const handleOnClick1h = () => {
        let date = new Date();
        setSelectedFromDate(subHours(date, 1))
        setSelectedToDate(date)
        setFromButton("1h");
    }
    const handleOnClick2h = () => {
        let date = new Date();
        setSelectedFromDate(subHours(date, 2))
        setSelectedToDate(date)
        setFromButton("2h");
    }
    const handleOnClick12h = () => {
        let date = new Date();
        setSelectedFromDate(subHours(date, 12))
        setSelectedToDate(date)
        setFromButton("12h");
    }
    const handleOnClick1d = () => {
        let date = new Date();
        setSelectedFromDate(subDays(date, 1))
        setSelectedToDate(date)
        setFromButton("1d");
    }
    const handleOnClick2d = () => {
        let date = new Date();
        setSelectedFromDate(subDays(date, 2))
        setSelectedToDate(date)
        setFromButton("2d");
    }
    const handleOnClick1w = () => {
        let date = new Date();
        setSelectedFromDate(subWeeks(date, 1))
        setSelectedToDate(date)
        setFromButton("1w");
    }
    const data = archData.data;
    const [lineData, setLineData] = useState([]);
    const [crosshairValues, setCrosshairValues] = useState([]);
    const onNearestX = (value, { index }) => {

        setCrosshairValues([lineData[index]]);
    };



    const [anchorEl, setAnchorEl] = useState(null);
    const [openContextMenu, setOpenContextMenu] = useState(false);
    const handleToggleContextMenu = (event) => {

        event.preventDefault();
        event.stopPropagation();
        setAnchorEl(event.target);
        setOpenContextMenu(!openContextMenu);


    }
    const handleContextMenuClose = () => {
        setOpenContextMenu(false);
    }

    const icon2 = (
        <svg width="2048" height="1792" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1728 640q0-80-56-136t-136-56h-64v384h64q80 0 136-56t56-136zm-1664 768h1792q0 106-75 181t-181 75h-1280q-106 0-181-75t-75-181zm1856-768q0 159-112.5 271.5t-271.5 112.5h-64v32q0 92-66 158t-158 66h-704q-92 0-158-66t-66-158v-736q0-26 19-45t45-19h1152q159 0 271.5 112.5t112.5 271.5z" /></svg>
    )
    const DateRangeIcon = {
        'width': '24',
        'height': '24',

        'path': "M9,10H7V12H9V10M13,10H11V12H13V10M17,10H15V12H17V10M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z"
    }
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            if (paperRef.current) {

                setHeight(paperRef.current.offsetHeight)
                setWidth(paperRef.current.offsetWidth)

            }
        }
        // The 'current' property contains info of the reference:
        // align, title, ... , width, height, etc.
        if (paperRef.current) {

            setHeight(paperRef.current.offsetHeight)
            setWidth(paperRef.current.offsetWidth)

        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize);

    }, [paperRef]);

    const [domain, setDomain] = useState([0, 1])
    const [yPositions, setYPositions] = useState([0, 0, 0])
    useEffect(() => {


        if (props.yAxes !== undefined) {
            let numberOfyAxes = props.yAxes.length;
            let newYPositions = [];
            let increment = 100 / width;


            let newDomain = [increment * (numberOfyAxes - 1), 1]
            let i = numberOfyAxes;
            let index = 0;
            for (i = numberOfyAxes; i >= 0, i--;) {
                newYPositions[index] = i * increment;
                index++;

            }
            setYPositions(newYPositions)
            setDomain(newDomain)
        }
        else {
            setYPositions([0])
            setDomain([0, 1])
        }
    }, [width])


    let yAxes = {};
    if (props.yAxes !== undefined) {

        props.yAxes.forEach((item, index) => {
            let key = index == 0 ? 'yaxis' : 'yaxis' + (index + 1)

            if (index > 0) {
                yAxes[key] = {
                    title: item.title ? item.title : "Y-Axis " + (index + 1),
                    titlefont: { color: props.yAxes.length > 1 ? theme.palette.reactVis.lineColors[index] : theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke },
                    tickfont: { color: props.yAxes.length > 1 ? theme.palette.reactVis.lineColors[index] : theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke },
                    gridcolor: theme.palette.reactVis[".rv-xy-plot__grid-lines__line"].stroke,
                    tickcolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
                    zerolinecolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
                    linecolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
                    zeroline: true,
                    showline: true,
                    showgrid: item.showGrid ? item.showGrid : true,

                    side: 'left',
                    position: yPositions[index],
                    anchor: 'free',
                    overlaying: 'y',
                    type: item.type === 'log' ? 'log' : 'linear',
                    tickformat: item.tickFormat ? item.tickFormat : ''
                }
            }
            else {
               
                yAxes['yaxis'] = {
                    title: item.title ? item.title : "Y-Axis " + (index + 1),
                    titlefont: { color: theme.palette.reactVis.lineColors[index], },
                    tickfont: { color: theme.palette.reactVis.lineColors[index], },
                    gridcolor: theme.palette.reactVis[".rv-xy-plot__grid-lines__line"].stroke,
                    tickcolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
                    zerolinecolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
                    linecolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
                    zeroline: true,
                    showline: true,
                    showgrid: true,
                    type: item.type == 'log' ? 'log' : 'linear',
                    tickformat: item.tickFormat ? item.tickFormat : ''
                }
            }
        })
    }
    else {
        yAxes['yaxis'] = {
            title: "Y-Axis ",

            gridcolor: theme.palette.reactVis[".rv-xy-plot__grid-lines__line"].stroke,
            tickcolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
            zerolinecolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
            linecolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
            zeroline: true,
            showline: true,
            showgrid: true,



        }
    }

    let data2 =
        pvsArchData.map((pvData, index) => {
            if (index == 0) {
                return ({
                    x: pvData.x,
                    y: pvData.y,
                    name: props.traces[index].name ? props.traces[index].name : props.traces[index].pv,
                    type: props.traces[index].type ? props.traces[index].type : 'scatter',
                    mode: props.traces[index].mode ? props.traces[index].mode : 'lines',
                    marker: { color: props.traces[index].color ? props.traces[index].color : theme.palette.reactVis.lineColors[index] },



                })
            }
            else {
                return ({
                    x: pvData.x,
                    y: pvData.y,
                    name: props.traces[index].name ? props.traces[index].name : props.traces[index].pv,
                    type: props.traces[index].type ? props.traces[index].type : 'scatter',
                    mode: props.traces[index].mode ? props.traces[index].mode : 'lines',
                    marker: { color: props.traces[index].color ? props.traces[index].color : theme.palette.reactVis.lineColors[index] },
                    // yaxis: 'y2'
                    yaxis: typeof (props.traces[index].yAxis) !== 'undefined' ? (props.traces[index].yAxis == 0 ? undefined : 'y' + (parseInt(props.traces[index].yAxis) + 1)) : 'yaxis',

                })

            }
        })


    let legend = {
        legend: isMobile ? {

            orientation: 'h',
            x: 0,
            y: 1.1
        } : undefined
    }
    let layout =
    {
        title: props.title,
        plot_bgcolor: theme.palette.background.paper,
        xaxis: {
            domain: domain,
            title: props.xAxisTitle ? props.xAxisTitle : '',
            gridcolor: theme.palette.reactVis[".rv-xy-plot__grid-lines__line"].stroke,
            tickcolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
            zerolinecolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
            linecolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
            zeroline: true,
            showline: true,
            showgrid: true,
            range: [selectedFromDate, selectedToDate],


        },
        ...yAxes,

        font: {
            family: 'Roboto,Arial',

            color: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke
        },


        paper_bgcolor: theme.palette.background.paper,
        showlegend: props.showLegend,
        ...legend,


    }
    // if (props.debug) {
    //     console.log(layout)
    // }



    return (
        <Paper ref={paperRef} style={{ width: props.width, paddingBottom: 8 }}>
            {props.traces.map((trace, index) => (
                <ArchiverData
                    key={index.toString()}


                    archiver={props.archiver}
                    pv={trace.pv}
                    from={selectedFromDate}
                    to={selectedToDate}
                    parameters={"&donotchunk"}

                    archData={(data) => setPvsArchData(prevData => {
                        let pvData = [...prevData]
                        pvData[index] = data;
                        return pvData;
                    })}
                />
            ))}
            {props.showButtons && <Accordion elevation={0} defaultExpanded={props.defaultButtonsExpanded}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid
                        container
                        spacing={2}
                        alignItems={'center'}
                        direction={'row'}
                        justify={'center'}


                    >
                        <Grid item xl={6} lg={'auto'} md={12} sm={12} xs={12} >

                            <Grid
                                container
                                spacing={2}
                                alignItems={'center'}
                                direction={'row'}
                                justify={'center'}

                            >

                                <Grid item xs={2} sm={'auto'} md={1} lg={'auto'} >
                                    <Button classes={{ root: classes.buttonRoot }} variant={'outlined'} color={fromButton === "30s" ? "secondary" : "default"} onClick={handleOnClick30s}>
                                        30s
                    </Button>
                                </Grid>
                                <Grid item xs={2} sm={'auto'} md={1} lg={'auto'} >
                                    <Button classes={{ root: classes.buttonRoot }} onClick={handleOnClick1m} variant={'outlined'} color={fromButton === "1m" ? "secondary" : "default"}>
                                        1m
                    </Button>
                                </Grid>
                                <Grid item xs={2} sm={'auto'} md={1} lg={'auto'} >
                                    <Button classes={{ root: classes.buttonRoot }} onClick={handleOnClick5m} variant={'outlined'} color={fromButton === "5m" ? "secondary" : "default"}>
                                        5m
                    </Button>
                                </Grid>
                                <Grid item xs={2} sm={'auto'} md={1} lg={'auto'} >
                                    <Button classes={{ root: classes.buttonRoot }} onClick={handleOnClick30m} variant={'outlined'} color={fromButton === "30m" ? "secondary" : "default"}>
                                        30m
                    </Button>
                                </Grid>
                                <Grid item xs={2} sm={'auto'} md={1} lg={'auto'} >
                                    <Button classes={{ root: classes.buttonRoot }} onClick={handleOnClick1h} variant={'outlined'} color={fromButton === "1h" ? "secondary" : "default"}>
                                        1h
                    </Button>
                                </Grid>
                                <Grid item xs={2} sm={'auto'} md={1} lg={'auto'} >
                                    <Button classes={{ root: classes.buttonRoot }} onClick={handleOnClick2h} variant={'outlined'} color={fromButton === "2h" ? "secondary" : "default"}>
                                        2h
                    </Button>
                                </Grid>
                                <Grid item xs={2} sm={'auto'} md={1} lg={'auto'} >
                                    <Button classes={{ root: classes.buttonRoot }} onClick={handleOnClick1d} variant={'outlined'} color={fromButton === "1d" ? "secondary" : "default"}>
                                        1d
                    </Button>
                                </Grid>
                                <Grid item xs={2} sm={'auto'} md={1} lg={'auto'} >
                                    <Button classes={{ root: classes.buttonRoot }} onClick={handleOnClick2d} variant={'outlined'} color={fromButton === "2d" ? "secondary" : "default"}>
                                        2d
                    </Button>
                                </Grid>
                                <Grid item xs={2} sm={'auto'} md={1} lg={'auto'} >
                                    <Button classes={{ root: classes.buttonRoot }} onClick={handleOnClick1w} variant={'outlined'} color={fromButton === "1w" ? "secondary" : "default"}>
                                        1w
                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xl={2} lg={'auto'} md={4} sm={4} xs={6} style={{ textAlign: 'center' }}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                <DateTimePicker
                                    variant="inline"
                                    ampm={false}
                                    label="From:"
                                    value={selectedFromDate}
                                    onChange={
                                        (newDate) => {
                                            setSelectedFromDate(newDate)
                                            console.log("setSelectedFromDate", newDate)
                                            setFromButton("none")
                                        }
                                    }
                                    //onError={console.log}
                                    //disablePast
                                    format="yyyy/MM/dd HH:mm:ss"
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xl={2} lg={'auto'} md={4} sm={4} xs={6} style={{ textAlign: 'center' }}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker
                                    variant="inline"
                                    ampm={false}
                                    label="To:"
                                    value={selectedToDate}
                                    onChange={
                                        (newDate) => {
                                            //   console.log("selectedToDate",newDate)
                                            setSelectedToDate(newDate)
                                            setFromButton("none")
                                            setLive(false)
                                            //     setSelectedToDate
                                        }
                                    }

                                    //onError={console.log}
                                    //disablePast
                                    format="yyyy/MM/dd HH:mm:ss"
                                />

                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xl={2} lg={'auto'} md={4} sm={4} xs={6}>
                            <Grid
                                container
                                spacing={2}
                                alignItems={'center'}
                                direction={'row'}
                                justify={'center'}

                            >


                                <Grid item xs={1} >
                                    <Button classes={{ root: classes.buttonRoot }} variant={'contained'} color={live ? 'primary' : 'default'} onClick={() => setLive(live === true ? false : true)}>
                                        Live
                    </Button>
                                </Grid>

                            </Grid>
                        </Grid>

                    </Grid>
                </AccordionDetails>
            </Accordion>}

            {(width !== null) && (height !== null) && <div style={{ width: width, height: props.height, background: theme.palette.background.paper, paddingTop: 8, paddingBottom: 8 }}

                onContextMenu={props.disableContextMenu ? undefined : handleToggleContextMenu}
            >
                <Plot
                    config={props.displayModeBar ? {
                        "displaylogo": false,
                        scrollZoom: false,
                        displayModeBar: props.displayModeBar,
                        toImageButtonOptions: {
                            format: 'svg'
                        }
                    } : {
                            "displaylogo": false,
                            scrollZoom: false,
                            toImageButtonOptions: {
                                format: 'svg'
                            }
                        }



                    }
                    useResizeHandler={true}
                    style={{
                        position: 'relative',
                        display: 'inline-block',
                        width: '100%', height: '100%', paddingBottom: 8
                    }}
                    data={pvsArchData.map((pvData, index) => {
                        if (index == 0) {
                            return ({
                                x: pvData.x,
                                y: pvData.y,
                                name: props.traces[index].name ? props.traces[index].name : props.traces[index].pv,
                                type: props.traces[index].type ? props.traces[index].type : 'scatter',
                                mode: props.traces[index].mode ? props.traces[index].mode : 'lines',
                                marker: { color: props.traces[index].color ? props.traces[index].color : theme.palette.reactVis.lineColors[index] },
                                hovertemplate:
                                    "(%{y}) %{x}"
                                //                 "%{yaxis.title.text}: %{y:$,.0f}<br>" +
                                //                 "%{xaxis.title.text}: %{x:.0%}<br>" +
                                //                 "Number Employed: %{marker.size:,}" +
                                //                 "<extra></extra>"


                            })
                        }
                        else {
                            return ({
                                x: pvData.x,
                                y: pvData.y,
                                name: props.traces[index].name ? props.traces[index].name : props.traces[index].pv,
                                type: props.traces[index].type ? props.traces[index].type : 'scatter',
                                mode: props.traces[index].mode ? props.traces[index].mode : 'lines',
                                marker: { color: props.traces[index].color ? props.traces[index].color : theme.palette.reactVis.lineColors[index] },
                                yaxis: typeof (props.traces[index].yAxis) !== 'undefined' ? (props.traces[index].yAxis == 0 ? undefined : 'y' + (parseInt(props.traces[index].yAxis) + 1)) : 'yaxis',
                                hovertemplate:
                                    "(%{y}) %{x}" + "<extra>%{fullData.name}</extra>"
                            })

                        }
                    })}
                    layout={{ ...layout }}


                />
                {/* <ContextMenu
                    disableProbe={props.disableProbe}
                    open={openContextMenu}
                    pvs={props.pvs}
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
                />  */}

            </div>}


        </Paper>
    )
}

ArchiverDataViewer.propTypes = {


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
    legend: PropTypes.bool,
    /**
     * An array of objects with shape that defines each trace
     */
    traces: PropTypes.arrayOf(PropTypes.shape({
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
        yAxisIndex: PropTypes.number,
    })),

    /**
     * 
* An array of objects with shape that defines each Y Axis
*/
    yAxes: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        color: PropTypes.string,
        showgrid: PropTypes.bool,
    })),
/**
* 
* Expand the buttons accordion
*/
    defaultButtonsExpanded: PropTypes.bool,
/**
* 
* Display mode bar, true= display permanently, false=permanently hidden, undefine= auto hide
*/
    displayModeBar:PropTypes.bool,
/**
* 
* Show buttons accordion
*/
showButtons:PropTypes.bool,

/**
* 
* When enabled, new data will be polled at 1Hz. Increments the from and too dates at 1Hz
*/
livePolling:PropTypes.bool,
/**
* 
* Polling Rate Period in ms, minimum=1000 ms
*/
pollingRatePeriod:PropTypes.number,

/**
 * Sets fromTimeOffset button
 */
fromTimeOffset:PropTypes.oneOf(["30s","1m","5m","30m","1h","2h","12h","1d","2d","1w"]),
};


/**
 * Default props.definition 
 */

ArchiverDataViewer.defaultProps = {

    pollingRatePeriod:1000,
    width: '100%',
    height: isMobile ? '150vh' : '40vh',
    legend: false,
    defaultButtonsExpanded: true,


};
export default ArchiverDataViewer