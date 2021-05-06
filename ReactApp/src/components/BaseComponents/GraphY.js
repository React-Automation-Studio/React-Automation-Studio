import React, { useEffect, useState, useRef, useReducer } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import ContextMenu from '../SystemComponents/ContextMenu';
import PV from '../SystemComponents/PV'
import Plot from 'react-plotly.js';
import { isMobileOnly } from 'react-device-detect';
import { replaceMacros } from '../SystemComponents/Utils/macroReplacement';

const useStyles = makeStyles((theme) => ({
  root:{
    paddingRight:8,
    paddingLeft:8,
    paddingTop:8,
  },
  title:{
    margin:8
  },
}));



const PlotData = (props) => {


  const theme = useTheme()

 
  const updateDataReducer = (pvs, newData) => {

    let newPvs = [...pvs];
    let { initialized } = newData.pvData;
    let value = initialized ? newData.pvData.value : [];
    if (!Array.isArray(value)) {
      value = [value]
    }
    let newX = [];
    let newY = [];
    let oldY;
    let oldX;
    if (initialized) {
      if (newPvs[newData.index]) {
        if (newPvs[newData.index].y) {
          oldY = newPvs[newData.index].y;
          if (newPvs[newData.index].x) {
            oldX = newPvs[newData.index].x;
          }
          else {
            oldX = [];
          }
        }
        else {
          oldY = [];
          oldX = [];
        }

        if (typeof props.maxLength !== "undefined") {
          // console.log("maxLength defined")
          newY = oldY.concat(value)
          if (props.useTimeStamp) {
            newX = oldX.concat(new Date(newData.pvData.timestamp * 1000))
            if (newX.length > props.maxLength) {
              newX.splice(0, (newX.length - props.maxLength))
            }
          }
          if (newY.length > props.maxLength) {
            newY.splice(0, (newY.length - props.maxLength))
          }
         

        }
        else {
          newY = value;
        }
        if (props.useTimeStamp !== true) {
          if ((oldX.length !== newY.length)) {

            newX = Array.from(newY.keys());
          }
          else {
            newX = oldX
          }
        }



      }
      else {
        newX = props.useTimeStamp ? new Date(newData.pvData.timestamp * 1000) : Array.from(value.keys());
        newY = value;

      }
    }



    // else {
    //   newPvs = []
    //   newPvs.pvData = []

    // }
    newPvs[newData.index] = {
      x: newX,
      y: newY,
      type: 'scatter',
      mode: 'lines',
      marker: { color: props.lineColor ? props.lineColor[newData.index] : theme.palette.reactVis.lineColors[newData.index] },

      name: typeof props.legend !=="undefined"
        ?
        props.legend[newData.index]
          ?
          props.legend[newData.index]
          :
          replaceMacros(props.pvs[newData.index], props.macros)
        :
        replaceMacros(props.pvs[newData.index], props.macros),
      hovertemplate: props.yHoverFormat ?
        "(%{y:" + props.yHoverFormat + "}) %{x}<extra>%{fullData.name}</extra>"
        : "(%{y}) %{x}<extra>%{fullData.name}</extra>",
     
      
    };
    // newPvs.pvData[newData.index] ={...newPvs.pvData[newData.index],... newData.pvData};
    return newPvs;
  }


  const [data, updateData] = useReducer(updateDataReducer, []);
  const updatePolledDataReducer = (oldPvs, newData) => {
    let pvs = [...oldPvs];
    pvs[newData.index] = newData.pvData;

    return (pvs)

  }
  
  const [polledData, updatePolledData] = useReducer(updatePolledDataReducer, []);
  const polledDataRef=useRef(polledData);
  useEffect(()=>{
    polledDataRef.current=polledData;
  },[polledData])
  const {usePolling, pollingRate } = props;

  useEffect(() => {
   let timer;
   const update=()=>{
   // console.log(polledDataRef.current)
    polledDataRef.current.forEach((item,index)=>{
      // console.log(index,item)
      const timestamp=Date.now()/1000;
      updateData({index,pvData:{...item,timestamp:timestamp}})
    })
   }
   if (usePolling){
    timer=setInterval(update,pollingRate)
   }
   return ()=>{
    if (usePolling){
      clearInterval(timer)
     }
   }
  }, [usePolling,pollingRate])


  const contextInfoReducer = (oldPvs, newData) => {
    let pvs = [...oldPvs];
    pvs[newData.index] = newData.pvs[0];

    return (pvs)

  }
  const [contextInfo, updateContextInfo] = useReducer(contextInfoReducer, []);
  const [delayedData, setDelayedData] = useState([])
  const [delayedContextInfo, setDelayedContextInfo] = useState([])
  // const updateDataDebounced = useRef(debounce(value => setDelayedData(value), 50)).current;
  const [trigger, setTrigger] = useState(0);
  const { updateRate } = props;

  useEffect(() => {

    setTimeout(() => setTrigger(prev => prev + 1), parseInt(updateRate))
    setDelayedData(data)
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [trigger, updateRate])

  const [trigger2, setTrigger2] = useState(0);


  useEffect(() => {

    setTimeout(() => setTrigger2(prev => prev + 1), parseInt(1000))
    setDelayedContextInfo(contextInfo)
      // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [trigger2])

 
  const pvConnections = () => {
    let pvs = [];
    props.pvs.forEach((item, index) => {
      pvs.push(
        <PV
          key={index.toString()}
          pv={item}
          macros={props.macros}
          pvData={(pvData) => props.usePolling?updatePolledData({ index, pvData }):updateData({ index, pvData })}
          contextInfo={(pvs) => updateContextInfo({ index, pvs })}
          makeNewSocketIoConnection={props.makeNewSocketIoConnection}
        />)
    })
    return pvs
  }
  return (
    <React.Fragment>
      {pvConnections()}
      {props.children({ data: delayedData, contextInfo: delayedContextInfo })}
    </React.Fragment>
  )
}
/**
* The GraphY Component has been updated to Plotly.js scatter and line plot. The GraphY component is implemented with zero margins and enabled to grow to the width and height of its parent container.<br/><br/>
* The width and height must be controlled from the parent component.<br/><br/>
  https://plotly.com/javascript/

*/

const GraphY = (props) => {
  const classes = useStyles();
  const theme = useTheme()
  const backgroundColor=props.backgroundColor?props.backgroundColor:theme.palette.background.default;
  const paperRef = useRef(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleToggleContextMenu = (event) => {

    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.target);
    setOpenContextMenu(!openContextMenu);
  }
  const handleContextMenuClose = () => {
    setOpenContextMenu(false);
  }
  const [openContextMenu, setOpenContextMenu] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (paperRef.current) {
        setHeight(props.height?props.height:props.aspectRatio?paperRef.current.offsetWidth*props.aspectRatio:paperRef.current.offsetHeight)
        setWidth(paperRef.current.offsetWidth)
      }
    }
    // The 'current' property contains info of the reference:
    // align, title, ... , width, height, etc.
    if (paperRef.current) {
      setHeight(props.height?props.height:paperRef.current.offsetWidth)
      setWidth(paperRef.current.offsetWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize);
    
  }, [paperRef,props.width,props.height,props.aspectRatio]);

  const [domain, setDomain] = useState([0, 1])
  // const [yPositions, setYPositions] = useState([0, 0, 0])
  useEffect(() => {
    if (props.yAxes !== undefined) {
      let numberOfyAxes = props.yAxes.length;
      let newYPositions = [];
      let increment = 100 / width;
      let newDomain = [increment * (numberOfyAxes - 1), 1]
      let index = 0;
      for (let i = numberOfyAxes - 1; i >= 0; i--) {
        newYPositions[index] = i * increment;
        index++;
      }
      // setYPositions(newYPositions)
      setDomain(newDomain)
    }
    else {
      // setYPositions([0])
      setDomain([0, 1])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])
  const [yAxes] = useState(() => {
    let yAxesInit = {};
    // if (props.yAxes !== undefined) {
    //   props.yAxes.forEach((item, index) => {
    //     let key = index === 0 ? 'yaxis' : 'yaxis' + (index + 1)
    //     if (index > 0) {
    //       yAxesInit[key] = {
    //         title: item.title ? item.title : "Y-Axis " + (index + 1),
    //         titlefont: { color: props.yAxes.length > 1 ? theme.palette.reactVis.lineColors[index] : theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke },
    //         tickfont: { color: props.yAxes.length > 1 ? theme.palette.reactVis.lineColors[index] : theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke },
    //         gridcolor: theme.palette.reactVis[".rv-xy-plot__grid-lines__line"].stroke,
    //         tickcolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
    //         zerolinecolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
    //         linecolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
    //         zeroline: true,
    //         showline: true,
    //         showgrid: item.showGrid ? item.showGrid : true,
    //         side: 'left',
    //         position: yPositions[index],
    //         anchor: 'free',
    //         overlaying: 'y',
    //         type: item.type === 'log' ? 'log' : 'linear',
    //         tickformat: item.tickFormat ? item.tickFormat : ''
    //       }
    //     }
    //     else {
    //       yAxesInit['yaxis'] = {
    //         title: item.title ? item.title : "Y-Axis " + (index + 1),
    //         titlefont: { color: theme.palette.reactVis.lineColors[index], },
    //         tickfont: { color: theme.palette.reactVis.lineColors[index], },
    //         gridcolor: theme.palette.reactVis[".rv-xy-plot__grid-lines__line"].stroke,
    //         tickcolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
    //         zerolinecolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
    //         linecolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
    //         zeroline: true,
    //         showline: true,
    //         showgrid: true,
    //         type: item.type === 'log' ? 'log' : 'linear',
    //         tickformat: item.tickFormat ? item.tickFormat : ''
    //       }
    //     }
    //   })
    // }
    // else {
      yAxesInit['yaxis'] = {
        // title: {
        //   text:props.yAxisTitle,
        // //  standoff:1,
        // },
        gridcolor: theme.palette.reactVis[".rv-xy-plot__grid-lines__line"].stroke,
        tickcolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
        zerolinecolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
        linecolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
        type: props.yScaleLog10 === true ? 'log' : 'linear',
        tickformat: props.yTickFormat ? props.yTickFormat : '',
        zeroline: true,
        showline: true,
        showgrid: true,
        range: [typeof props.yMin !=="undefined"?props.yMin:null, typeof props.yMax !=="undefined"?props.yMax:null],
        automargin:true,
        ticksuffix:props.yUnits?props.yUnits:"",
        nticks:props.yNoOfTicks?props.yNoOfTicks:0
      }
    // }
    return (yAxesInit)
  })
  const [legend] = useState(() => {
    let legendInit = props.showLegend === true ? {
      legend:{
        orientation: 'h',
        x: 1,
        xanchor: 'right',
        y: 0.975,
        bgcolor: "00000000"
      }
    } : {}
    return legendInit
  })

  const [layout, setLayout] = useState({})

  useEffect(() => {
    console.log(backgroundColor)
    setLayout({
      title: {
        text: props.title,
      },
      plot_bgcolor:  backgroundColor,
      xaxis: {
        domain: domain,
        // title: {
        //   text:props.xAxisTitle,
        //   standoff:32,
        // },
        gridcolor: theme.palette.reactVis[".rv-xy-plot__grid-lines__line"].stroke,
        tickcolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
        zerolinecolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
        linecolor: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke,
        zeroline: true,
        showline: true,
        showgrid: true,
        automargin:true,
        range: [typeof props.xMin !=="undefined"?props.xMin:null, typeof props.xMax !=="undefined"?props.xMax:null],
        ticksuffix:props.xUnits?props.xUnits:"",
        nticks:props.xNoOfTicks?props.xNoOfTicks:0,
        tickformat:props.xTickFormat?props.xTickFormat:""

        //  range: [selectedFromDate, selectedToDate],
      },
      ...yAxes,
      font: {
        family: 'Roboto,Arial',
        color: theme.palette.reactVis[".rv-xy-plot__axis__tick__line"].stroke
      },
      paper_bgcolor:  backgroundColor,
      ...legend,
      showlegend: props.showLegend,
      margin: { t: props.title ?24 : 16, r: isMobileOnly?16:0,
         l: 0, 
         b: 0, 
        },
        annotations: [props.yAxisTitle&&{
          xref: 'paper',
          yref: 'paper',
          x: 0,
          xanchor: 'left',
          y: 1,
          yanchor: 'top',
          text: props.yAxisTitle,
          textangle:270,
          showarrow: false,
        }, props.xAxisTitle&&{
          xref: 'paper',
          yref: 'paper',
          x: 1,
          xanchor: 'right',
          y: 0,
          yanchor: 'bottom',
          text: props.xAxisTitle,
          showarrow: false
        }]

    })
  }, [theme, props.showLegend, props.xAxisTitle, props.title,backgroundColor,classes, props.xMin,props.xTickLabels,props.xTickValues,props.yAxisTitle,yAxes,domain,legend,props.xMax,props.xNoOfTicks,props.xTickFormat,props.xUnits])
  
  
  return (
    <div ref={paperRef} className={classes.root} style={{ width: props.width?props.width:width, height: props.height?props.height:height,backgroundColor:backgroundColor}}>

<PlotData {...props} backgroundColor={backgroundColor}>
        {({ data, contextInfo }) => {
          return (
            <div style={{ width: "100%", height: "100%",  }} onContextMenu={
              props.disableContextMenu ? undefined : handleToggleContextMenu
            }

              // onPointerDownCapture={(event) => {
              //   if (event.button !== 0) {
              //     event.preventDefault()
              //     return;
              //   }
              // }}
            >
              {contextInfo && openContextMenu && <ContextMenu
                disableProbe={props.disableProbe}
                open={openContextMenu}
                pvs={contextInfo}
                handleClose={handleContextMenuClose}
                probeType={'readOnly'}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}

              />}


              <Plot
                config={typeof props.displayModeBar !== "undefined" ? {
                  "displaylogo": false,
                  scrollZoom: false,
                  doubleclick: false,
                  displayModeBar: props.displayModeBar,
                  staticPlot:isMobileOnly?true:false,
                  toImageButtonOptions: {
                    format: 'svg'
                  }
                } : {

                  "displaylogo": false,
                  scrollZoom: false,
            
                  staticPlot:(isMobileOnly&&(props.disableMobileStatic===false))?true:false,
                  toImageButtonOptions: {
                    format: 'svg'
                  }
                }
                }
                useResizeHandler={true}
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  width: '100%', height: '100%',
                  
                }}
                data={data}
                layout={{ ...layout, }}
                





              />
            </div>
          )
        }
        }

      </PlotData>

    </div>
  )

}
GraphY.propTypes = {

  /** Array of the process variables, NB must contain correct prefix ie: pva://  eg. ['pva://$(device):test$(id0)','pva://$(device):test$(id1)']*/
  pvs: PropTypes.array.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id0)':'1','$(id1)':'2'}}*/
  macros: PropTypes.object,
  /** Y axis title. */
  yAxisTitle: PropTypes.string,
  /** X axis title. */
  xAxisTitle: PropTypes.string,

  /**
   * Show the plotly mode bar: if true, display permanently, if false hide permanently, if undefined it will display on hover.
   */
  displayModeBar: PropTypes.bool,
  /** Custom y axis minimum to be used,if not defined the graph will auto-scale */
  ymin: PropTypes.number,
  /** Custom y axis maximum to be used,if not defined the graph will auto-scale */
  ymax: PropTypes.number,

  /** If defined, then the DataConnection debugging information will be displayed*/
  debug: PropTypes.bool,
  /** If defined, then a legend will be displayed,using the string items defined in the array*/
  legend: PropTypes.array,
  /** If defined, then the default React-Vis line colors will be overridden using the string items defined in the array*/
  lineColor: PropTypes.array,
  /** If defined then the length of the line graphs will grow up until the value defined*/
  maxLength: PropTypes.number,
  
  /** Directive to sample the PV value, on the client side at the polling rate*/
  usePolling: PropTypes.bool,
  /** Directive to scale the y-axis as a log base 10 value*/
  yScaleLog10: PropTypes.bool,
    /**
         * The plotjs format overide for the tick format. This is derived from the <a href="https://github.com/d3/d3-format/blob/v2.0.0/README.md#format">d3 format specification</a>
         * Example: ".3e" : exponential notaion with 3 digits.
         *
         */
  yTickFormat:PropTypes.string,
  /**
   * Use this prop to make a seperate socket connection for the graph. It is experimental and can be possbily improve performace and for high data rate pv's and prevent slowing down the user interface
   */
  makeNewSocketIoConnection: PropTypes.bool,  
  /** Polling interval in ms used in polling mode*/
  

  
  pollingRate: PropTypes.number,
  // /** If defined then the graph will only update on a value change*/
  // triggerOnSingleValueChange: PropTypes.bool,
  
  /** Directive to use PV timestamp on x-axis*/
  useTimeStamp: PropTypes.bool,
  /** Graph update perdiod in ms, set this higher for larger number of data points */
  updateRate: PropTypes.number,

  /**
         * The plotjs format overide for the y value. This is derived from the <a href="https://github.com/d3/d3-format/blob/v2.0.0/README.md#format">d3 format specification</a>
         * Example: ".3e" : exponential notation with 3 digits.
         *
         */
  yHoverFormat: PropTypes.string,
  /**
   * Directive to show the legend
   */
  showLegend:PropTypes.bool,
  /**
   * Disable Static Graph mode on mobile
   */
  disableMobileStatic:PropTypes.bool,
  /** If the height is undefined then the height will be set to parents height, but if the aspectRatio is defined the the height will be set to the width multplied by the aspect ratio*/
  aspectRatio: PropTypes.number,
   /**
   * The backgorund color defaults to ```theme.palette.background.default```
   * For a Paper or a Card component set it to ```theme.palette.background.paper```
   */
  backgroundColor:PropTypes.string,
  /**
   * Set the width.
   */
  width:PropTypes.string,
   /**
   * Set the height. 
   */
  height:PropTypes.string,
  /** Custom y axis units to be used*/
  yUnits:PropTypes.string,
  /** Custom x axis units to be used*/
  xUnits:PropTypes.string,


};

GraphY.defaultProps = {
  updateRate: 100,
  makeNewSocketIoConnection: false,
  debug: false,
  showLegend:true,
  yAxisTitle: 'Y-axis',
  xAxisTitle: 'X-axis',
  usePolling: false,
  pollingRate: 100,
  width: '100%',
  height: '100%',
  disableMobileStatic:false,
 
  

};



export default GraphY
