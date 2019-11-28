import React from 'react'
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import DataConnection from '../SystemComponents/DataConnection';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';
//import classNames from 'classnames';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Loadable from 'react-loadable';
import ContextMenu from '../SystemComponents/ContextMenu';



//import '../../../node_modules/react-vis/dist/style.css';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  makeVisFlexible,
  makeWidthFlexible,
  makeHeightFlexible,
  DiscreteColorLegend
} from 'react-vis';
const FlexibleXYPlot = makeVisFlexible(XYPlot);

const LoadableReactVisLightCompoment = Loadable({
  loader: () => import('../../CSS/ReactVisLightCompoment'),
  loading() {
    return <div>Loading LoadableReactVisLightCompoment</div>
  }
});

const LoadableReactVisDarkCompoment = Loadable({
  loader: () => import('../../CSS/ReactVisDarkCompoment'),
  loading() {
    return <div>Loading LoadableReactVisLightCompoment</div>
  }
});

function calcTimeFormat(timestamp) {
  let mydate = new Date(timestamp * 1000);
  //  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  //  let year = mydate.getFullYear();
  // let month = months[mydate.getMonth()];
  //let date = mydate.getDate();
  let hour = mydate.getHours();
  let min = mydate.getMinutes();
  let sec = mydate.getSeconds();
  //let ms = mydate.getMilliseconds()
  //let value= hour + ':' + min + ':' + sec +':' + ms;
  let value;
  if( min<10){
    min='0'+min;

  }

  if( sec<10){
    sec='0'+sec;

  }
  value=hour + ':' + min + ':' + sec ;

  return value;
}

const styles = theme => ({

  lineSeries: {

    stroke:theme.palette.type==='dark'?'orange':'default'


  },
});


/**
* The GraphY Component is a wrapper on Uber's React-Vis FlexibleXYPlot lineSeries graph component. The GraphY component is implemented with zero margins and enabled to grow to the width and height of its parent container.<br/><br/>
* The width and height must be controlled from the parent component.<br/><br/>
* React-vis Demos:
* https://uber.github.io/react-vis/examples/showcases/plots<br/><br/>
* React-vis API:
* http://uber.github.io/react-vis/documentation/series-reference/line-series

*/
class GraphY extends React.Component {
  constructor(props) {const FlexibleXYPlot = makeVisFlexible(XYPlot);
    super(props);
    let state={}
    let pv;
    let pvname;
    let pvnames=[];
    let pvs={};
    for (pv in this.props.pvs){
      pvname=this.props.pvs[pv];
      if (typeof this.props.macros !== 'undefined'){

        let macro;
        for (macro in this.props.macros){
          pvname=pvname.replace(macro.toString(),this.props.macros[macro].toString());
        }
      }
      //    console.log(pvname)

      pvs[pvname]={label:"", initialized: false,pvname:pvname,value:[],lastValue:"",timestamp:[],char_value:"",alarmColor:"",lower_disp_limit: 0,upper_disp_limit: 10000,lower_warning_limit: 4000,upper_warning_limit: 6000,
      units: "V",precision: 0, ymin:1000000000000000000,ymax:-1000000000000000000 };
      pvnames.push(pvname);
    }
    state['pvnames']=pvnames;
    state['pvs']=pvs;
    //  state['ymin']=1000000000000000000;
    //  state['ymax']=-1000000000000000000;
    state['PollingTimerEnabled']=false;
    state['openContextMenu']= false;
    state['x0']=0;
    state['y0']=0;
    const contextPVs=[];
    for (const item in pvs){
      contextPVs.push(pvs[item]);
    }
    state['contextPVs']=contextPVs;

    this.state=state;






    this.handleInputValue= this.handleInputValue.bind(this);
    this.handleInputValuePolled= this.handleInputValuePolled.bind(this);
    this.handleInputValueUnpolled= this.handleInputValueUnpolled.bind(this);
    this.handleInputValueLabel= this.handleInputValueLabel.bind(this);
    this.handleMetadata= this.handleMetadata.bind(this);
    this.multipleDataConnections=this.multipleDataConnections.bind(this);
    this.handleToggleContextMenu=this.handleToggleContextMenu.bind(this);
    this.multipleLineData=this.multipleLineData.bind(this);
  }
  handleInputValue = (inputValue,pvname,initialized,severity,timestamp)=>{

    if(this.props.usePolling){
      let pvs=this.state.pvs;
      pvs[pvname].initialized=initialized;
      pvs[pvname].lastValue=inputValue;
      pvs[pvname].severity=severity;
      this.setState({pvs:pvs});
    }
    else{
      let pvs=this.state.pvs;
      pvs[pvname].initialized=initialized;
      this.setState({pvs:pvs});
      this.handleInputValueUnpolled(inputValue,pvname,initialized,severity,timestamp);
    }


    //  console.log("value: ",inputValue);
    //  console.log("pvname:", pvname);
  }



  handleInputValuePolled = ()=>{
    let pv;
    let d = new Date();
    let timestamp=d.getTime()/1000;

    for(pv in this.state.pvnames){

      if(this.state.pvs[this.state.pvnames[pv]].initialized){

        //    console.log(timestamp,this.state.pvnames[pv],this.state.pvs[this.state.pvnames[pv]].lastValue);
        this.handleInputValueUnpolled(this.state.pvs[this.state.pvnames[pv]].lastValue,this.state.pvnames[pv],this.state.pvs[this.state.pvnames[pv]].initialized,this.state.pvs[this.state.pvnames[pv]].severity,timestamp)
      }
    }
    //  console.log("value: ",inputValue);
    //  console.log("pvname:", pvname);
  }
  handleInputValueUnpolled = (inputValue,pvname,initialized,severity,timestamp)=>{
    //console.log("unpolled");
    //  console.log("test");
    //  console.log("value: ",inputValue);
    //  console.log("pvname:", pvname);
    let pvs=this.state.pvs;
    let yDataArray=[];
    let yTimeStampArray=[];
    //let ymax=parseFloat(this.state.ymax);
    //  let ymin=parseFloat(this.state.ymin);
    //  console.log('ymax init',this.state.ymax)
    // console.log('ymin init',this.state.ymin)

    //  console.log('pvs[pvname].value', pvs[pvname].value);
    //   console.log('inputValue', inputValue);
    let max;
    if (initialized===true){
      if (typeof this.props.maxLength !== 'undefined'){
        max=this.props.maxLength;
        if (Array.isArray(inputValue)===false){
          //  console.log("not array")
          if ((typeof this.props.triggerOnSingleValueChange !== 'undefined')){
            if (pvs[pvname].value.length>0){
              if(inputValue!=pvs[pvname].value[pvs[pvname].value.length-1]){
                yDataArray=pvs[pvname].value.concat(inputValue);
                yTimeStampArray=pvs[pvname].timestamp.concat(timestamp);
              }
              else{
                yDataArray=pvs[pvname].value;
                yTimeStampArray=pvs[pvname].timestamp;
              }
            }
            else {
              yDataArray=[inputValue];
              yTimeStampArray=[timestamp];
            }

          }
          else {
            //  console.log(pvname,timestamp)
            if (pvs[pvname].value.length>0){
              yDataArray=pvs[pvname].value.concat(inputValue);
              yTimeStampArray=pvs[pvname].timestamp.concat(timestamp);
            }
            else{
              yDataArray=[inputValue];
              yTimeStampArray=[timestamp];
            }

          }
        }
        else{
          if (pvs[pvname].value.length>0){
            yDataArray=pvs[pvname].value.concat(inputValue);
          }
          else{
            yDataArray=inputValue;
          }
        }
      }
      else {
        yDataArray=inputValue;
        max=inputValue.length;
      }




      //  console.log('yDataArray=pvs[pvname].value.concat(inputValue);', yDataArray);
      pvs[pvname].initialized=initialized;
      pvs[pvname].severity=severity;

      let length= yDataArray.length;

      if  (length> max){
        yDataArray=yDataArray.slice(length-max);
        if (this.props.useTimeStamp){
          yTimeStampArray=yTimeStampArray.slice(length-max);

        }
      }
      //    console.log('yDataArray=yDataArray.slice(length-max);', yDataArray);

      let i=0;
      let sample;
      let data=[];
      let n;
      //	console.log("pv.value: ",this.state[this.props.pv].value);
      let ymax=-1000000000000000000;
      let ymin=1000000000000000000;

      for(n in yDataArray){
        let val;
        if (this.props.yScaleLog10===true){
          val=Math.log10(parseFloat(yDataArray[n]))
        }
        else{
          val=yDataArray[n];
        }
        // console.log("value: ",this.state[this.props.pv].value[i]);
        //console.log('n: ',n,' this.state.ymax: ',this.state.ymax,)
        if(parseFloat(val)>ymax){



          ymax=parseFloat(val);
          //console.log('new Ymax',ymax)
        }
        if(parseFloat(val)<ymin){
          ymin=parseFloat(val);
        }


        if (this.props.useTimeStamp){
          sample={x:yTimeStampArray[n],y:val}
        }
        else{
          sample={x:i,y:val}
        }
        // console.log("sample: ",sample)

        data[i]=sample;
        i++;

      }


      pvs[pvname].value=yDataArray;
      pvs[pvname].timestamp=yTimeStampArray;
      pvs[pvname].linedata=data;
      pvs[pvname].ymin=ymin;
      pvs[pvname].ymax=ymax;
      //console.log('pvs[pvname].linedata', pvs[pvname].linedata);
      //console.log('yTimeStampArray',yTimeStampArray)
      //  console.log('length3', pvs[pvname].linedata.length);



      /*  if ((typeof this.props.ymax) !=='undefined'){
      ymax=this.props.ymax;

    }

    if ((typeof this.props.ymin)!=='undefined'){
    ymin=this.props.ymin;

  }
  */
  //   console.log('ymax end',ymax)
  //   console.log('ymin end',ymin)

  this.setState({pvs:pvs});//,ymax:ymax,ymin:ymin});


  //state.pvs[pvname].inputValue=inputValue;
  //pvData.pvs[pvname].initialized=initialized;
  //pvData.pvs[pvname].severity=severity;

  //console.log("pvData:",pvData)

  //this.setState(pvData);
}
}


handleMetadata =  pvname=>(metadata) =>{

  let pvs=this.state.pvs;
  pvs[pvname].metadata=metadata;
  this.setState({pvs:pvs});
  //  console.log("metadata",metadata)

}



handleInputValueLabel=pvname=>(inputValue)=>{

  let pvs=this.state.pvs;
  pvs[pvname].label=inputValue;
  this.setState({pvs:pvs});

}



componentDidMount() {
  if (this.props.usePolling){
    let intervalId = setInterval(this.handleInputValuePolled, this.props.pollingRate);
    // store intervalId in the state so it can be accessed later:
    this.setState({'intervalId': intervalId});
  }
}


componentWillUnmount() {
  if (this.props.usePolling){
    clearInterval(this.state.intervalId);
  }
}













multipleDataConnections = () => {
  //this.test("test1");
  //this.handleInputValue();
  let pv;
  let DataConnections=[];
  for (pv in this.state.pvs){
    //console.log("linedata: ", this.state.pvs[pv].linedata);
    DataConnections.push(
      <div key= {pv.toString()}>
        <DataConnection
          pv={this.state.pvs[pv].pvname}
          handleInputValue={this.handleInputValue}
          handleMetadata={this.handleMetadata(this.state.pvs[pv].pvname)}
          handleInputValueLabel={this.handleInputValueLabel(this.state.pvs[pv].pvname)}
          usePvLabel={this.props.usePvLabel}
          debug={this.props.debug}
        />

        {this.props.usePvLabel===true?this.state.pvs[pv].label+': ':""}
        {/*this.state.pvs[pv].value*/}
      </div>
    )
  }
  //console.log(DataConnections[0]);
  return DataConnections;
}

multipleLineData = () => {
  //this.test("test1");
  //this.handleInputValue();
  let pv;
  let lines=[];
  let i=0;
  let lineColor;
  let theme=this.props.theme;
  //    console.log(theme);
  for (pv in this.state.pvs){
    if(typeof this.props.lineColor !=='undefined'){
      lineColor=this.props.lineColor;
    }
    else{
      if(theme.palette.type==='dark'){
        lineColor=theme.darkLineColors;
      }
      else{
        lineColor=theme.lightLineColors;
      }

    }
    //console.log("linedata: ", this.state.pvs[pv].linedata);
    if (this.state.pvs[pv].initialized===true){
      lines.push(

        <LineSeries

          key={pv.toString()}
          color={lineColor[i]}

          data={this.state.pvs[this.state.pvs[pv].pvname].linedata}
          style={{
            strokeLinejoin: 'round',
            strokeWidth: 2

          }}
        />

      )
    }
    else{
      //const data=this.state.pvs[this.state.pvs[pv].pvname].linedata;
      const sample={x:0,y:0}
      const data=[];
      data[0]=sample;
      //console.log(data)
      lines.push(

        <LineSeries

          key={pv.toString()}
          color={'grey'}

          data={typeof this.state.pvs[this.state.pvs[pv].pvname].linedata==='undefined'?data:this.state.pvs[this.state.pvs[pv].pvname].linedata}
          style={{
            strokeLinejoin: 'round',
            strokeWidth: 2

          }}
        />

      )

    }

    i++;
  }
  //console.log(DataConnections[0]);
  return lines;
}

handleContextMenuClose = event => {


  this.setState({ openContextMenu: false });
};

handleToggleContextMenu = (event) => {
  console.log(event.type)

  event.persist()
  this.setState(state => ({ openContextMenu: !state.openContextMenu,x0:event.pageX,y0:event.pageY }));

  event.preventDefault();
}



render() {
  const {classes}= this.props;
  const theme=this.props.theme;
  //  console.log(this.props.theme);
  //  console.log(this.state.ymax)
  //  console.log(this.state.ymin)
  //  console.log(this.state.rangeUnits)

  let legendTitle="";
  let legendItem;
  let legendItems=[];
  let legendColor=[];
  let pv;
  let i=0;
  let pvs=this.state.pvs;
  let ymax=-1000000000000000000;
  let ymin=1000000000000000000;
  for (pv in pvs){
    if(typeof this.props.lineColor !=='undefined'){
      legendColor=this.props.lineColor;
    }
    else{
      if(theme.palette.type==='dark'){
        legendColor=theme.darkLineColors;
      }
      else{
        legendColor=theme.lightLineColors;
      }

    }
    //console.log("linedata: ", this.state.pvs[pv].linedata);

    i++;

    if(pvs[pv].ymin<ymin){
      ymin=pvs[pv].ymin;
    }
    if(pvs[pv].ymax>ymax){
      ymax=pvs[pv].ymax
    }

  }

  /*  if (ymin>0){
  ymin=0.99*ymin;
}
else{
ymin=1.01*ymin;
}
if(ymax>0){
ymax=1.01*ymax;

}
else{
ymax=0.99*ymax;
}*/




if (typeof this.props.legend !=='undefined'){
  let i=0;
  for(legendItem in this.props.legend){


    legendItems.push({title:this.props.legend[legendItem].toString() ,color:legendColor[i], stroke:theme.palette.type=='dark'?'#80deea':'#dbdbe0'});

    i++
  }
}
//   console.log('ymax: ',this.state.ymax)
//     console.log('ymin: ',this.state.ymin)
let yDomain;
if ((typeof this.props.ymax) !=='undefined'){


  if ((typeof this.props.ymin)!=='undefined'){

    yDomain=[this.props.ymin, this.props.ymax]
  }
  else {
    yDomain=[ymin, ymax];
  }
}
else {
  yDomain=[ymin, ymax];
}
// console.log('ymax',ymax)
//   console.log('ymin',ymin)
return (

  <React.Fragment >
    {theme.palette.type==='dark'&& <LoadableReactVisDarkCompoment/>}
    {theme.palette.type==='light'&& <LoadableReactVisLightCompoment/>}
    {this.multipleDataConnections()}
    <div style={{width:'100%',height:'100%'}} onContextMenu={this.handleToggleContextMenu}>
      <FlexibleXYPlot yDomain={yDomain} margin={{left: 60}} >
        <ContextMenu
          disableProbe={this.props.disableProbe}
          open={this.state.openContextMenu}
          anchorReference="anchorPosition"
          anchorPosition={{ top: +this.state.y0, left: +this.state.x0 }}
          probeType={'readOnly'}
          pvs={this.state.contextPVs}
          handleClose={this.handleContextMenuClose}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        />
        <HorizontalGridLines style={{stroke: theme.palette.type==='dark'?'#0097a7':'#B7E9ED'}} />
        <VerticalGridLines  style={{stroke: theme.palette.type==='dark'?'#0097a7':'#B7E9ED'}} />
        <XAxis
          title={(typeof this.props.xAxisTitle !== 'undefined')?this.props.xAxisTitle:"X Axis"}
          color="white"
          tickFormat={v => typeof this.props.useTimeStamp!=='undefined'? calcTimeFormat(v):(v)+ this.props.xUnits}
          tickTotal={4}
          style={{
            title:{stroke:theme.palette.type==='dark'?'#dbdbe0':'#6b6b76',strokeWidth:0.2},
            line: {stroke: '#ADDDE1'},
            ticks: {stroke: '#ADDDE1'},
            text: {stroke: 'none', fill: theme.palette.type==='dark'?'#a9a9b2':'#6b6b76', fontWeight: 600}
          }}
        />

        <YAxis
          title={(typeof this.props.yAxisTitle !== 'undefined')?this.props.yAxisTitle:"Y Axis"}
          left={9} tickFormat={this.props.yScaleLog10===true?v => "10E"+(v)+ " "+this.props.yUnits :v => (v)+ " "+this.props.yUnits} tickSize={20}  tickPadding={2}
          style={{
            title:{stroke:theme.palette.type==='dark'?'#ccccce':'#dbdbe0',strokeWidth:0.2},
            text: {stroke: 'none', fill: theme.palette.type==='dark'?'#a9a9b2':'#6b6b76', fontWeight: 600}
          }}/>
        {this.multipleLineData()}


        {(typeof this.props.legend !== 'undefined')&&<DiscreteColorLegend
          color='#e89b02'
          style={{position: 'absolute', right: '50px', top: '10px',
            color:theme.palette.type==='dark'?'#ccccce':'#dbdbe0',strokeWidth:0.2}}
          orientation="horizontal" items= {legendItems}/>}

      </FlexibleXYPlot>
    </div>
  </React.Fragment>



    )
  }

}
GraphY.propTypes = {

  /** Array of the process variables, NB must contain correct prefix ie: pva://  eg. ['pva://$(device):test$(id0)','pva://$(device):test$(id1)']*/
  pvs: PropTypes.array.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id0)':'1','$(id1)':'2'}}*/
  macros:PropTypes.object,
  /** Y axis title. */
  yAxisTitle:PropTypes.string,
  /** X axis title. */
  xAxisTitle:PropTypes.string,


  /** Custom y axis minimum to be used,if not defined the graph will auto-scale */
  ymin:PropTypes.number,
  /** Custom y axis maximum to be used,if not defined the graph will auto-scale */
  ymax:PropTypes.number,

  /** If defined, then the DataConnection debugging information will be displayed*/
  debug:PropTypes.bool,
  /** If defined, then a legend will be displayed,using the string items defined in the array*/
  legend:PropTypes.array,
  /** If defined, then the default React-Vis line colors will overided using the string items defined in the array*/
  lineColor:PropTypes.array,
  /** If defined then the length of the line graphs will grow up until the value defined*/
  maxLength:PropTypes.number,
  /** Custom y axis units to be used*/
  yUnits:PropTypes.string,
  /** Custom x axis units to be used*/
  xUnits:PropTypes.string,
  /** Directive to sample the PV value, on the client side at the polling rate*/
  usePolling:PropTypes.bool,
  /** Directive to scale the y-axis as a log base 10 value*/
  yScaleLog10:PropTypes.bool,
  /** Polling interval in ms used in polling mode*/
  pollingRate:PropTypes.number,
  /** If defined then the graph will only update on a value change*/
  triggerOnSingleValueChange:PropTypes.bool,
  /** Directive to use PV tiemstamp on x-axis*/
  useTimeStamp:PropTypes.bool,
};

GraphY.defaultProps = {

  debug:false,
  yAxisTitle:'Y-axis',
  xAxisTitle:'X-axis',
  yUnits:"",
  xUnits:"",
  usePolling:false,
  pollingRate:100,

};



export default withStyles(styles,{withTheme:true})(GraphY)
