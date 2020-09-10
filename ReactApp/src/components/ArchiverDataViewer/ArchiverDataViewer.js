import React, { useContext, useState, useEffect } from 'react';
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import ContextMenu from "../SystemComponents/ContextMenu";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import formatISO from 'date-fns/formatISO';
import { format, subHours, subSeconds, subMinutes, subDays, subWeeks, subMonths } from 'date-fns';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    LineSeries,
    makeVisFlexible,
    Crosshair,
    DiscreteColorLegend
} from 'react-vis';
import GraphY from '../BaseComponents/GraphY';
import DateFnsAdapter from "@date-io/date-fns";
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import { CrosshairsGps } from "mdi-material-ui/";
import { ArrowLeftRight } from "mdi-material-ui/";
import { ArrowUpDown } from "mdi-material-ui/";
import { Magnify } from "mdi-material-ui/";
import { CarretDownIcon } from 'plotly-icons';
import Plot from 'react-plotly.js';
import Grid from '@material-ui/core/Grid';
import { update } from 'plotly.js';

const dateFns = new DateFnsAdapter();

const FlexibleXYPlot = makeVisFlexible(XYPlot);

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
const calcTimeFormat = (timestamp) => {
    let mydate = new Date(timestamp * 1000);
    // let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // let year = mydate.getFullYear();
    // let month = months[mydate.getMonth()];
    // let date = mydate.getDate();
    // let hour = mydate.getHours();
    // let min = mydate.getMinutes();
    // let sec = mydate.getSeconds();
    // let ms = mydate.getMilliseconds()
    // //let value= hour + ':' + min + ':' + sec +':' + ms;
    // let value;
    // if (hour < 10) {
    //     hour = '0' + hour;

    // }
    // if (min < 10) {
    //     min = '0' + min;

    // }

    // if (sec < 10) {
    //     sec = '0' + sec;

    // }
    // value = hour + ':' + min + ':' + sec + " " + date + " " + month + " " + year;
    let value = format(mydate, 'dd/MM/yyyy HH:mm:ss')
    return value;
}

const useArchiverDataHook = (props) => {

    const context = useContext(AutomationStudioContext);
    const [dbWatchId, setDbWatchId] = useState(null);
    const [data, setData] = useState(null);
    // useEffect(()=>{
    //     setData([{data:[{secs:123123,val:1}]}])

    // },[])
    const [writeAccess, setWriteAccess] = useState(false);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const handleArchiverReadAck = (msg) => {

            if (typeof msg !== 'undefined') {
                setDbWatchId(msg.dbWatchId)
            }
        }
        const handleArchiverReadData = (msg) => {
            // console.log(msg.data)
            //const newData = JSON.parse(msg.data);
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
                // if (dbWatchId !== null) {
                //     socket.emit('remove_dbWatch', { archiverURL: props.archiverURL, dbWatchId: dbWatchId, 'clientAuthorisation': jwt });
                // }
                // socket.removeListener('databaseWatchData:' + props.archiverURL, handleArchiverReadData);
                socket.removeListener('reconnect', reconnect);
                socket.removeListener('disconnect', disconnect);
            }

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.archiverURL])
    console.log("useArchiverDataHook", data)
    return (data)

}
const ArchiverData = (props) => {

    const data = useArchiverDataHook({ archiverURL: 'arch://DEMO_ARCHIVER:request:' + JSON.stringify({
        pv: props.pv,
        options: {
            from: formatISO(props.from),
            to: formatISO(props.to),
            parameters: props.parameters,

        }
    })});
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

                    if (sample==0){
                        x.push(props.from);
                        y.push(newArchiverData[sample].val)
                    }
                    else{
                    if (sample > 0) {
                        x.push(new Date(newArchiverData[sample].secs * 1000));
                        y.push(newArchiverData[sample - 1].val)

                    }
                    x.push(new Date(newArchiverData[sample].secs * 1000));
                    y.push(newArchiverData[sample].val)
                   
                }
               
                if (sample==(newArchiverData.length-1)){
                    x.push(props.to);
                    y.push(newArchiverData[sample].val)

                }

                }


                //        // console.log(ArchiverDataViewer,xYData)

                setDataXY({ x: x, y: y })
            }

        }

    }, [data])


    useEffect(() => {
        props.archData(dataXY);
    }, [dataXY])

    return (
        <div />
        // <Typography> {props.archiverURL}   </Typography>
    )
}

const ArchiverDataViewer = (props) => {

    const classes = useStyles();
    const theme = useTheme();
    const [pvsArchData, setPvsArchData] = useState([]);
    const [showCrosshair, setShowCrosshair] = useState(props.showCrosshair === true ? true : false)
    const [selectedFromDate, setSelectedFromDate] = useState(props.from ? new Date(props.from) : subHours(new Date(), 1))
    const [selectedToDate, setSelectedToDate] = useState(props.to ? new Date(props.to) : new Date())
    const [plotlyData, setPlotlyData] = useState({ x: [], y: [] })
    const [live, setLive] = useState(false);
    const [liveIntervalId, setLiveIntervalId] = useState(null);
    const archData = { data: null }
    const [fromButton, setFromButton] = useState("none");
    // const archData = useArchiverDataHook({ archiverURL: 'arch://DEMO_ARCHIVER:request:'+JSON.stringify({
    //     pv:props.pvs[0],
    //     options:{
    //         from:formatISO(selectedFromDate),
    //         to:  formatISO(selectedToDate),
    //         parameters:"&donotchunk"

    //     }
    // })});
    //const [xYData,setXYData]=useState([]);
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
            intervalId = setInterval(updateToDate, 1000);
            //setLiveIntervalId(intervalId)

        }
        
        return () => {
            clearInterval(intervalId)
        }
    }, [live,fromButton])


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
        console.log(index)
        console.log(lineData[index])

        setCrosshairValues([lineData[index]]);
    };

    // const data = useArchiverData({ archiverURL: "arch://DEMO_ARCHIVER:{pv:testIOC:BO1}" })
    console.log(archData)
    console.log(data)
   // console.log("fromButton",fromButton,"selectedFromDate",selectedFromDate,"selectedToDate",selectedToDate)   
    // useEffect(() => {
    //     if (data !== null) {
    //         let newArchiverData = [];
    //         let newXYData = [];
    //         let x = [];
    //         let y = [];
    //         if (typeof data[0].data !== undefined) {
    //             console.log(data[0].data)
    //             newArchiverData = data[0].data

    //             let sample;
    //             for (sample in newArchiverData) {
    //                 console.log(sample, newArchiverData[sample].secs, calcTimeFormat(newArchiverData[sample].secs, newArchiverData[sample].val))

    //                 if (sample > 0) {
    //                     x.push(new Date(newArchiverData[sample].secs * 1000));
    //                     y.push(newArchiverData[sample - 1].val)
    //                     newXYData.push({ x: newArchiverData[sample].secs, y: newArchiverData[sample - 1].val })
    //                 }
    //                 x.push(new Date(newArchiverData[sample].secs * 1000));
    //                 y.push(newArchiverData[sample].val)

    //                 newXYData.push({ x: newArchiverData[sample].secs, y: newArchiverData[sample].val })
    //             }


    //             //        // console.log(ArchiverDataViewer,xYData)
    //             console.log(newXYData)
    //             setLineData(newXYData);
    //             setPlotlyData({ x: x, y: y })
    //         }

    //     }

    // }, [data])
    // useEffect(() => {

    // }, [])

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

    console.log(lineData)
    // console.log(crosshairValues)
    console.log(CarretDownIcon)
    const icon2 = (
        <svg width="2048" height="1792" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1728 640q0-80-56-136t-136-56h-64v384h64q80 0 136-56t56-136zm-1664 768h1792q0 106-75 181t-181 75h-1280q-106 0-181-75t-75-181zm1856-768q0 159-112.5 271.5t-271.5 112.5h-64v32q0 92-66 158t-158 66h-704q-92 0-158-66t-66-158v-736q0-26 19-45t45-19h1152q159 0 271.5 112.5t112.5 271.5z" /></svg>
    )
    const DateRangeIcon = {
        'width': '24',
        'height': '24',

        'path': "M9,10H7V12H9V10M13,10H11V12H13V10M17,10H15V12H17V10M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z"
    }
    console.log("pvsArchData", pvsArchData)
    const data2 =

        pvsArchData.map((pvData, index) => (
            {
                x: pvData.x,
                y: pvData.y,
                name: props.pvs[index],
                type: 'scatter',
                mode: 'lines',
                marker: { color: theme.palette.reactVis.lineColors[index] },

            }

        ))

    let data3x = [new Date()];
    let data3y = [1];
    console.log(data2, data3x, data3y)
    return (
        <Paper elevation={theme.palette.paperElevation}>
            {props.pvs.map((pv, index) => (
                <ArchiverData
                    key={index.toString()}
                   
                
                    archiver={props.archiver}
                    pv={pv}
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
            {props.showButtons&&<Grid
                container
                spacing={2}
                alignItems={'center'}
                direction={'row'}
                justify={'center'}
                style={{ paddingTop: 32 }}

            >
                <Grid item xl={6} lg={6} md={12} sm={12} xs={12} >
                    <Grid
                        container
                        spacing={2}
                        alignItems={'center'}
                        direction={'row'}
                        justify={'center'}

                    >

                        <Grid item xs={2}  sm={'auto'} md={1} lg={1} >
                            <Button classes={{ root: classes.buttonRoot }} variant={'outlined'} color={fromButton === "30s" ? "secondary" : "default"} onClick={handleOnClick30s}>
                                30s
                    </Button>
                        </Grid>
                        <Grid item xs={2} sm={'auto'} md={1} lg={1} >
                            <Button classes={{ root: classes.buttonRoot }} onClick={handleOnClick1m} variant={'outlined'} color={fromButton === "1m" ? "secondary" : "default"}>
                                1m
                    </Button>
                        </Grid>
                        <Grid item xs={2} sm={'auto'} md={1} lg={1} >
                            <Button classes={{ root: classes.buttonRoot }} onClick={handleOnClick5m} variant={'outlined'} color={fromButton === "5m" ? "secondary" : "default"}>
                                5m
                    </Button>
                        </Grid>
                        <Grid item xs={2} sm={'auto'} md={1} lg={1} >
                            <Button classes={{ root: classes.buttonRoot }} onClick={handleOnClick30m} variant={'outlined'} color={fromButton === "30m" ? "secondary" : "default"}>
                                30m
                    </Button>
                        </Grid>
                        <Grid item xs={2} sm={'auto'} md={1} lg={1} >
                            <Button classes={{ root: classes.buttonRoot }} onClick={handleOnClick1h} variant={'outlined'} color={fromButton === "1h" ? "secondary" : "default"}>
                                1h
                    </Button>
                        </Grid>
                        <Grid item xs={2} sm={'auto'} md={1} lg={1} >
                            <Button classes={{ root: classes.buttonRoot }} onClick={handleOnClick2h} variant={'outlined'} color={fromButton === "2h" ? "secondary" : "default"}>
                                2h
                    </Button>
                        </Grid>
                        <Grid item xs={2} sm={'auto'} md={1} lg={1} >
                            <Button classes={{ root: classes.buttonRoot }} onClick={handleOnClick1d} variant={'outlined'} color={fromButton === "1d" ? "secondary" : "default"}>
                                1d
                    </Button>
                        </Grid>
                        <Grid item xs={2} sm={'auto'} md={1} lg={1} >
                            <Button classes={{ root: classes.buttonRoot }} onClick={handleOnClick2d} variant={'outlined'} color={fromButton === "2d" ? "secondary" : "default"}>
                                2d
                    </Button>
                        </Grid>
                        <Grid item xs={2} sm={'auto'} md={1} lg={1} >
                            <Button classes={{ root: classes.buttonRoot }} onClick={handleOnClick1w} variant={'outlined'} color={fromButton === "1w" ? "secondary" : "default"}>
                                1w
                    </Button>
                        </Grid>
                    </Grid>
                </Grid>
              <Grid item xl={2} lg={2} md={4} sm={4} xs={6} style={{ textAlign: 'center' }}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>

                        <DateTimePicker
                            variant="inline"
                            ampm={false}
                            label="From:"
                            value={selectedFromDate}
                            onChange={
                                (newDate) => {
                                 setSelectedFromDate(newDate)
                                 console.log("setSelectedFromDate",newDate)
                                 setFromButton("none")
                                }
                            }
                            //onError={console.log}
                            //disablePast
                            format="yyyy/MM/dd HH:mm:ss"
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xl={2} lg={2} md={4} sm={4} xs={6} style={{ textAlign: 'center' }}>
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
                <Grid item xl={2} lg={2} md={4} sm={4} xs={6}>
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

            </Grid>}



            <div style={{ width: '100%', height: '35vh', background: theme.palette.background.default }}

                onContextMenu={props.disableContextMenu ? undefined : handleToggleContextMenu}
            >
                <Plot
                    config={props.displayModeBar?{
                        "displaylogo": false,
                        scrollZoom: false,
                        displayModeBar: props.displayModeBar,
                        toImageButtonOptions: {
                            format: 'svg'
                        }}:{
                            "displaylogo": false,
                            scrollZoom: false,
                            toImageButtonOptions: {
                                format: 'svg'
                            }
                        }



                    }                   
                    useResizeHandler={true}
                    style={{ position: 'relative', display: 'inline-block', width: '100%', height: '35vh' }}
                    data={
                        pvsArchData.map((pvData, index) => (
                            {
                                x: pvData.x,
                                y: pvData.y,
                                name: props.pvs[index],
                                type: 'scatter',
                                mode: 'lines',
                                marker: { color: theme.palette.reactVis.lineColors[index] },

                            }

                        ))
                    }

                    layout={
                        {
                            title: props.title,
                            plot_bgcolor: theme.palette.background.paper,
                            xaxis: {
                                title: props.xAxisTitle ? props.xAxisTitle : 'X-Axis',
                                gridcolor: theme.palette.reactVis[".rv-xy-plot__grid-lines__line"].stroke,
                                tickcolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
                                zerolinecolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
                                linecolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
                                zeroline: true,
                                showline: true,
                                showgrid: true,
                                tickformat: "%H:%M:%S \n %a %d %b %Y ",
                                range: [selectedFromDate, selectedToDate],


                            },
                            yaxis: {
                                title: props.yAxisTitle ? props.yAxisTitle : 'Y-Axis',

                                gridcolor: theme.palette.reactVis[".rv-xy-plot__grid-lines__line"].stroke,
                                tickcolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
                                zerolinecolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
                                linecolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
                                zeroline: true,
                                showline: true,
                                showgrid: true,

                            },
                            font: {
                                family: 'Roboto,Arial',
                                //       size: 18,
                                color: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke
                            },

                            //paper_bgcolor: theme.palette.background.default,
                            paper_bgcolor: theme.palette.background.paper,
                            showlegend: props.showLegend,
                            // legend: {
                            //     x: 1,
                            //     xanchor: 'right',
                            //     y: 1
                            // }
                        }}

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

            </div>


        </Paper>
    )
}
export default ArchiverDataViewer