import React from 'react'

import DataConnection from '../SystemComponents/DataConnection';
import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';


import ContextMenu from '../SystemComponents/ContextMenu';

import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  makeVisFlexible,

  DiscreteColorLegend
} from 'react-vis';
const FlexibleXYPlot = makeVisFlexible(XYPlot);
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
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
* The GraphXY Component is a wrapper on Uber's React-Vis FlexibleXYPlot lineSeries graph component. The GraphXY component is implemented with zero margins and enabled to grow to the width and height of its parent container.<br/><br/>
* The width and height must be controlled from the parent component.<br/><br/>
* The compoment requires the that X and Y process variables must be defined. The X and Y process variable names are declared in the 'xPVs' and 'yPVs' array props.
* Multiple traces can be plotted at the same time, the index of the 'xPVs' and 'yPVs' array elements define each trace.
* PVs can be scalar or array variables.
* React-vis Demos:
* https://uber.github.io/react-vis/examples/showcases/plots<br/><br/>
* React-vis API:
* http://uber.github.io/react-vis/documentation/series-reference/line-series

*/
class GraphXY extends React.Component {
  constructor(props) {const FlexibleXYPlot = makeVisFlexible(XYPlot);
    super(props);
    let state={}
    let pv;
    let pvname;
    let pvnamesY=[];
    let yPVs={};
    for (pv in this.props.yPVs){
      pvname=this.props.yPVs[pv];
      if (typeof this.props.macros !== 'undefined'){

        let macro;
        for (macro in this.props.macros){
          pvname=pvname.replace(macro.toString(),this.props.macros[macro].toString());
        }
      }
      //    console.log(pvname)

      yPVs[pvname]={label:"", initialized: false,pvname:pvname,value:[],lastValue:"",timestamp:[],char_value:"",alarmColor:"",lower_disp_limit: 0,upper_disp_limit: 10000,lower_warning_limit: 4000,upper_warning_limit: 6000,
      units: "V",precision: 0, ymin:1000000000000000000,ymax:-1000000000000000000 };
      pvnamesY.push(pvname);
    }
    let xPVs={};
    let pvnamesX=[];
    for (pv in this.props.xPVs){
      pvname=this.props.xPVs[pv];
      if (typeof this.props.macros !== 'undefined'){

        let macro;
        for (macro in this.props.macros){
          pvname=pvname.replace(macro.toString(),this.props.macros[macro].toString());
        }
      }
      //    console.log(pvname)

      xPVs[pvname]={label:"", initialized: false,pvname:pvname,value:[],lastValue:"",timestamp:[],char_value:"",alarmColor:"",lower_disp_limit: 0,upper_disp_limit: 10000,lower_warning_limit: 4000,upper_warning_limit: 6000,
      units: "V",precision: 0, xmin:1000000000000000000,xmax:-1000000000000000000 };
      pvnamesX.push(pvname);
    }

    state['pvnamesY']=pvnamesY;
    state['pvnamesX']=pvnamesX;
    state['yPVs']=yPVs;
    state['xPVs']=xPVs;
    //  state['ymin']=1000000000000000000;
    //  state['ymax']=-1000000000000000000;
    state['PollingTimerEnabled']=false;
    state['openContextMenu']= false;
    state['x0']=0;
    state['y0']=0;
    const contextPVs=[];
    for (const item in yPVs){
      contextPVs.push(yPVs[item]);
    }
    for (const item in xPVs){
      contextPVs.push(xPVs[item]);
    }
    state['contextPVs']=contextPVs;

    this.state=state;






    this.handleInputValueY= this.handleInputValueY.bind(this);
    this.handleInputValueYPolled= this.handleInputValueYPolled.bind(this);
    this.handleInputValueYUnpolled= this.handleInputValueYUnpolled.bind(this);
    this.handleInputValueYLabel= this.handleInputValueYLabel.bind(this);
    this.handleMetadataY= this.handleMetadataY.bind(this);

    this.handleInputValueX= this.handleInputValueX.bind(this);
    this.handleInputValueXPolled= this.handleInputValueXPolled.bind(this);
    //this.handleInputValueXUnpolled= this.handleInputValueXUnpolled.bind(this);
    this.handleInputValueXLabel= this.handleInputValueXLabel.bind(this);
    this.handleMetadataX= this.handleMetadataX.bind(this);
    this.multipleDataConnections=this.multipleDataConnections.bind(this);
    this.handleToggleContextMenu=this.handleToggleContextMenu.bind(this);
    this.multipleLineData=this.multipleLineData.bind(this);
  }
  handleInputValueY =index=>(inputValue,pvname,initialized,severity,timestamp)=>{
    //  console.log('handleInputValueY',pvname,index,inputValue)
    if((this.props.updateMode=='updateOnXChange')||this.props.usePolling){
      let yPVs=this.state.yPVs;
      let xPVs=this.state.xPVs;
      yPVs[pvname].initialized=initialized;
      yPVs[pvname].lastValue=inputValue;
      yPVs[pvname].severity=severity;
      this.setState({yPVs:yPVs});
    }
    else if ((this.props.updateMode=='updateOnYChange')||(this.props.updateMode=='updateOnXOrYChange')){
      let yPVs=this.state.yPVs;
      let xPVs=this.state.xPVs;
      yPVs[pvname].initialized=initialized;
      yPVs[pvname].lastValue=inputValue;
      yPVs[pvname].severity=severity;
      this.setState({yPVs:yPVs});
      if(xPVs[this.state.pvnamesX[index]].initialized){
        this.handleLineDataUpdate(yPVs[this.state.pvnamesY[index]],xPVs[this.state.pvnamesX[index]]);
      }
    }


    //  console.log("value: ",inputValue);
    //  console.log("pvname:", pvname);
  }

  handleInputValueX =index=>(inputValue,pvname,initialized,severity,timestamp)=>{
    //console.log('handleInputValueX',pvname,index,inputValue)
    if((this.props.updateMode=='updateOnYChange')||this.props.usePolling){
      let xPVs=this.state.xPVs;
      xPVs[pvname].initialized=initialized;
      xPVs[pvname].lastValue=inputValue;
      xPVs[pvname].severity=severity;
      this.setState({xPVs:xPVs});
    }
    else if ((this.props.updateMode=='updateOnXChange')||(this.props.updateMode=='updateOnXOrYChange')){
      let xPVs=this.state.xPVs;
      let yPVs=this.state.yPVs;
      xPVs[pvname].initialized=initialized;
      xPVs[pvname].lastValue=inputValue;
      xPVs[pvname].severity=severity;
      this.setState({xPVs:xPVs});
      if(yPVs[this.state.pvnamesY[index]].initialized){
        this.handleLineDataUpdate(yPVs[this.state.pvnamesY[index]],xPVs[this.state.pvnamesX[index]]);
      }
    }


    //  console.log("value: ",inputValue);
    //  console.log("pvname:", pvname);
  }


  handleInputValueYPolled =()=>{
    let pv;
    let d = new Date();
    let timestamp=d.getTime()/1000;
    let index=0;
    for(pv in this.state.pvnamesY){

      if((this.state.yPVs[this.state.pvnamesY[index]].initialized)&&(this.state.xPVs[this.state.pvnamesX[index]].initialized)){

        this.handleLineDataUpdate(this.state.yPVs[this.state.pvnamesY[index]],this.state.xPVs[this.state.pvnamesX[index]]);
        //    console.log(timestamp,this.state.pvnamesY[pv],this.state.yPVs[this.state.pvnamesY[pv]].lastValue);
        //  this.handleInputValueYUnpolled(this.state.yPVs[this.state.pvnamesY[pv]].lastValue,this.state.pvnamesY[pv],this.state.yPVs[this.state.pvnamesY[pv]].initialized,this.state.yPVs[this.state.pvnamesY[pv]].severity,timestamp)
      }
      index++;
    }
    //  console.log("value: ",inputValue);
    //  console.log("pvname:", pvname);
  }

  handleInputValueXPolled = ()=>{
    let pv;
    let d = new Date();
    let timestamp=d.getTime()/1000;

    for(pv in this.state.pvnamesX){

      if(this.state.xPVs[this.state.pvnamesX[pv]].initialized){

        //    console.log(timestamp,this.state.pvnamesY[pv],this.state.xPVs[this.state.pvnamesY[pv]].lastValue);
        //this.handleInputValueYUnpolled(this.state.xPVs[this.state.pvnamesX[pv]].lastValue,this.state.pvnamesX[pv],this.state.xPVs[this.state.pvnamesX[pv]].initialized,this.state.xPVs[this.state.pvnamesX[pv]].severity,timestamp)
      }
    }
    //  console.log("value: ",inputValue);
    //  console.log("pvname:", pvname);
  }

  handleInputValueYUnpolled = (inputValue,pvname,initialized,severity,timestamp)=>{
    //console.log("unpolled");
    //  console.log("test");
    //  console.log("value: ",inputValue);
    //  console.log("pvname:", pvname);
    let yPVs=this.state.yPVs;
    let yDataArray=[];
    let yTimeStampArray=[];
    //let ymax=parseFloat(this.state.ymax);
    //  let ymin=parseFloat(this.state.ymin);
    //  console.log('ymax init',this.state.ymax)
    // console.log('ymin init',this.state.ymin)

    //  console.log('yPVs[pvname].value', yPVs[pvname].value);
    //   console.log('inputValue', inputValue);
    let max;
    if (initialized===true){
      if (typeof this.props.maxLength !== 'undefined'){
        max=this.props.maxLength;
        if (Array.isArray(inputValue)===false){
          //  console.log("not array")
          if ((typeof this.props.triggerOnSingleValueChange !== 'undefined')){
            if (yPVs[pvname].value.length>0){
              if(inputValue!=yPVs[pvname].value[yPVs[pvname].value.length-1]){
                yDataArray=yPVs[pvname].value.concat(inputValue);
                yTimeStampArray=yPVs[pvname].timestamp.concat(timestamp);
              }
              else{
                yDataArray=yPVs[pvname].value;
                yTimeStampArray=yPVs[pvname].timestamp;
              }
            }
            else {
              yDataArray=[inputValue];
              yTimeStampArray=[timestamp];
            }

          }
          else {
            //  console.log(pvname,timestamp)
            if (yPVs[pvname].value.length>0){
              yDataArray=yPVs[pvname].value.concat(inputValue);
              yTimeStampArray=yPVs[pvname].timestamp.concat(timestamp);
            }
            else{
              yDataArray=[inputValue];
              yTimeStampArray=[timestamp];
            }

          }
        }
        else{
          if (yPVs[pvname].value.length>0){
            yDataArray=yPVs[pvname].value.concat(inputValue);
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




      //  console.log('yDataArray=yPVs[pvname].value.concat(inputValue);', yDataArray);
      yPVs[pvname].initialized=initialized;
      yPVs[pvname].severity=severity;

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


      yPVs[pvname].value=yDataArray;
      yPVs[pvname].timestamp=yTimeStampArray;
      yPVs[pvname].linedata=data;
      yPVs[pvname].ymin=ymin;
      yPVs[pvname].ymax=ymax;
      //console.log('yPVs[pvname].linedata', yPVs[pvname].linedata);
      //console.log('yTimeStampArray',yTimeStampArray)
      //  console.log('length3', yPVs[pvname].linedata.length);



      /*  if ((typeof this.props.ymax) !=='undefined'){
      ymax=this.props.ymax;

    }

    if ((typeof this.props.ymin)!=='undefined'){
    ymin=this.props.ymin;

  }
  */
  //   console.log('ymax end',ymax)
  //   console.log('ymin end',ymin)

  this.setState({yPVs:yPVs});//,ymax:ymax,ymin:ymin});


  //state.yPVs[pvname].inputValue=inputValue;
  //pvData.yPVs[pvname].initialized=initialized;
  //pvData.yPVs[pvname].severity=severity;

  //console.log("pvData:",pvData)

  //this.setState(pvData);
}
}
handleLineDataUpdate = (yPV,xPV)=>{

  //console.log(xPV)
  //console.log(yPV)
  //  let yPVs=this.state.yPVs;
  let yDataArray=[];
  let xDataArray=[];
  let max;
  if (yPV.initialized===true){
    if (typeof this.props.maxLength !== 'undefined'){
      max=this.props.maxLength;
      if (Array.isArray(yPV.lastValue)===false){

          //  console.log(pvname,timestamp)
          if (yPV.value.length>0){
            yDataArray=yPV.value.concat(yPV.lastValue);
            xDataArray=xPV.Value.concat(xPV.lastValue);
          }
          else{
            yDataArray=[yPV.lastValue];
            xDataArray=[xPV.lastValue];
          }


      }
      else{
        if (yPV.value.length>0){
          yDataArray=yPV.value.concat(yPV.lastValue);
          xDataArray=xPV.value.concat(xPV.lastValue);
        }
        else{
          yDataArray=yPV.lastValue;
          xDataArray=xPV.lastValue;
        }
      }
    }
    else {
      yDataArray=yPV.lastValue;
      xDataArray=xPV.lastValue;
      max=yPV.lastValue.length;
    }









    if  (yDataArray.length> max){
      yDataArray=yDataArray.slice(yDataArray.length-max);



    }
    if  (xDataArray.length> max){
      xDataArray=xDataArray.slice(xDataArray.length-max);



    }

    let i=0;
    let sample;
    let data=[];
    let n;

    let ymax=-1000000000000000000;
    let ymin=1000000000000000000;
    let xmax=-1000000000000000000;
    let xmin=1000000000000000000;
    for(n in yDataArray){
      let val;
      let valX;
      if (this.props.yScaleLog10===true){
        val=Math.log10(parseFloat(yDataArray[n]))
      }
      else{
        val=yDataArray[n];
      }
      if (this.props.xScaleLog10===true){
        valX=Math.log10(parseFloat(xDataArray[n]))
      }
      else{
        valX=xDataArray[n];
      }

      if(parseFloat(val)>ymax){



        ymax=parseFloat(val);

      }
      if(parseFloat(val)<ymin){
        ymin=parseFloat(val);
      }
      if(parseFloat(valX)>xmax){



        xmax=parseFloat(valX);

      }
      if(parseFloat(valX)<xmin){
        xmin=parseFloat(valX);
      }


      sample={x:xDataArray[n],y:val}



      data[i]=sample;
      i++;

    }


    yPV.value=yDataArray;
    xPV.Value=xDataArray;
    yPV.linedata=data;

    yPV.ymin=ymin;
    yPV.ymax=ymax;
    xPV.xmin=xmin;
    xPV.xmax=xmax;
    let yPVs=this.state.yPVs;
    let xPVs=this.state.xPVs;
    yPVs[yPV.pvname]=yPV;
    xPVs[xPV.pvname]=xPV;
    this.setState({yPVs:yPVs,xPVs:xPVs});
  }
}

handleMetadataY =  pvname=>(metadata) =>{

  let yPVs=this.state.yPVs;
  yPVs[pvname].metadata=metadata;
  this.setState({yPVs:yPVs});
  //  console.log("metadata",metadata)

}

handleMetadataX =  pvname=>(metadata) =>{

  let xPVs=this.state.xPVs;
  xPVs[pvname].metadata=metadata;
  this.setState({xPVs:xPVs});
  //  console.log("metadata",metadata)

}

handleInputValueYLabel=pvname=>(inputValue)=>{

  let yPVs=this.state.yPVs;
  yPVs[pvname].label=inputValue;
  this.setState({yPVs:yPVs});

}

handleInputValueXLabel=pvname=>(inputValue)=>{

  let xPVs=this.state.xPVs;
  xPVs[pvname].label=inputValue;
  this.setState({xPVs:xPVs});

}

componentDidMount() {
  if (this.props.usePolling){
    let intervalId = setInterval(this.handleInputValueYPolled, this.props.pollingRate);
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
  //this.handleInputValueY();
  let pv;
  let DataConnections=[];
  let i=0;
  for (pv in this.state.yPVs){
    const index=i;
    //console.log("linedata: ", this.state.yPVs[pv].linedata);
    DataConnections.push(
      <div key= {pv.toString() +'y'+i}>
        <DataConnection
          pv={this.state.yPVs[pv].pvname }
          handleInputValue={this.handleInputValueY(index)}
          handleMetadata={this.handleMetadataY(this.state.yPVs[pv].pvname)}
          handleInputValueLabel={this.handleInputValueYLabel(this.state.yPVs[pv].pvname)}
          usePvLabel={this.props.usePvLabel}
          debug={this.props.debug}
        />

        {this.props.usePvLabel===true?this.state.yPVs[pv].label+': ':""}
        {/*this.state.yPVs[pv].value*/}
      </div>
    )
    i++;
  }
  i=0;
  for (pv in this.state.xPVs){
    const index=i;
    //console.log("linedata: ", this.state.yPVs[pv].linedata);
    DataConnections.push(
      <div key= {pv.toString() +'x'+i} >
        <DataConnection
          pv={this.state.xPVs[pv].pvname}
          handleInputValue={this.handleInputValueX(index)}
          handleMetadata={this.handleMetadataX(this.state.xPVs[pv].pvname)}
          handleInputValueLabel={this.handleInputValueXLabel(this.state.xPVs[pv].pvname)}
          usePvLabel={this.props.usePvLabel}
          debug={this.props.debug}
        />

        {this.props.usePvLabel===true?this.state.xPVs[pv].label+': ':""}
        {/*this.state.yPVs[pv].value*/}
      </div>

    )
    i++;
  }
  //console.log(DataConnections[0]);
  return DataConnections;
}

multipleLineData = () => {
  //this.test("test1");
  //this.handleInputValueY();
  let pv;
  let lines=[];
  let i=0;
  let lineColor;
  let theme=this.props.theme;
  //    console.log(theme);
  for (pv in this.state.yPVs){
    if(typeof this.props.lineColor !=='undefined'){
      lineColor=this.props.lineColor;
    }
    else{
      lineColor=theme.palette.reactVis.lineColors;

    }
    //console.log("linedata: ", this.state.yPVs[pv].linedata);
    if (this.state.yPVs[pv].initialized===true){
      lines.push(

        <LineSeries

          key={pv.toString()}
          color={lineColor[i]}

          data={this.state.yPVs[this.state.yPVs[pv].pvname].linedata}
          style={{
            strokeLinejoin: 'round',
            strokeWidth: 2

          }}
        />

      )
    }
    else{
      //const data=this.state.yPVs[this.state.yPVs[pv].pvname].linedata;
      const sample={x:0,y:0}
      const data=[];
      data[0]=sample;
      //console.log(data)
      lines.push(

        <LineSeries

          key={pv.toString()}
          color={'grey'}

          data={typeof this.state.yPVs[this.state.yPVs[pv].pvname].linedata==='undefined'?data:this.state.yPVs[this.state.yPVs[pv].pvname].linedata}
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
  let yPVs=this.state.yPVs;
  let xPVs=this.state.xPVs;
  let ymax=-1000000000000000000;
  let ymin=1000000000000000000;
  let xmax=-1000000000000000000;
  let xmin=1000000000000000000;

  for (pv in yPVs){
    if(typeof this.props.lineColor !=='undefined'){
      legendColor=this.props.lineColor;
    }
    else{

      legendColor=theme.palette.reactVis.lineColors;

    }
    //console.log("linedata: ", this.state.yPVs[pv].linedata);

    i++;
    //console.log(yPVs[pv].ymin)
    if(yPVs[pv].ymin<ymin){
      ymin=yPVs[pv].ymin;

    }
    if(yPVs[pv].ymax>ymax){
      ymax=yPVs[pv].ymax
    }

  }
  for (pv in xPVs){

    if(xPVs[pv].xmin<xmin){
      xmin=xPVs[pv].xmin;
    }
    if(xPVs[pv].xmax>xmax){
      xmax=xPVs[pv].xmax
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

let xDomain;
if ((typeof this.props.xmax) !=='undefined'){


  if ((typeof this.props.xmin)!=='undefined'){

    xDomain=[this.props.xmin, this.props.xmax]
  }
  else {
    //xDomain=[xmin, xmax];
    xDomain=[xmin,xmax];
  }
}
else {
  //xDomain=[xmin, xmax];
  xDomain=[xmin, xmax];
}
// console.log('ymax',ymax)
//   console.log('ymin',ymin)
return (

  <React.Fragment >
      {/* <ReactVisLightDarkTheme/> */}
    {this.multipleDataConnections()}
    <div style={{width:'100%',height:'100%'}} onContextMenu={this.handleToggleContextMenu}>
      <FlexibleXYPlot yDomain={yDomain} xDomain={xDomain} margin={{left: 60}} >
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
        <HorizontalGridLines tickValues={this.props.yTickValues}

        />
        <VerticalGridLines  tickValues={this.props.xTickValues} />
        <XAxis
          title={(typeof this.props.xAxisTitle !== 'undefined')?this.props.xAxisTitle:"X Axis"}
          color="white"
          tickFormat={v => typeof this.props.useTimeStamp!=='undefined'? calcTimeFormat(v):(v)+ this.props.xUnits}
          tickTotal={this.props.xTickTotal}
         // tickTotal={4}

        />
        {this.props.children}
        <YAxis
          title={(typeof this.props.yAxisTitle !== 'undefined')?this.props.yAxisTitle:"Y Axis"}
          left={9} tickFormat={this.props.yScaleLog10===true?v => "10E"+(v)+ " "+this.props.yUnits :v => (v)+ " "+this.props.yUnits} tickSize={20}  tickPadding={2}
          tickTotal={this.props.yTickTotal}
          />
        {this.multipleLineData()}


        {(typeof this.props.legend !== 'undefined')&&<DiscreteColorLegend
          color='#e89b02'
          style={{position: 'absolute', right: '50px', top: '10px',}}
          orientation="horizontal" items= {legendItems}/>}

      </FlexibleXYPlot>
    </div>
  </React.Fragment>



    )
  }

}
GraphXY.propTypes = {

  /** Array of the Y process variables, NB must contain correct prefix ie: pva://  eg. ['pva://$(device):test$(id0)','pva://$(device):test$(id1)']*/
  yPVs: PropTypes.array.isRequired,
  /** Array of the X process variables, NB must contain correct prefix ie: pva://  eg. ['pva://$(device):test$(id0)','pva://$(device):test$(id1)']*/
  xPVs: PropTypes.array.isRequired,
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
  /** Custom x axis minimum to be used,if not defined the graph will auto-scale */
  xmin:PropTypes.number,
  /** Custom x axis maximum to be used,if not defined the graph will auto-scale */
  xmax:PropTypes.number,

  /** If defined, then the DataConnection debugging information will be displayed*/
  debug:PropTypes.bool,
  /** If defined, then a legend will be displayed,using the string items defined in the array*/
  legend:PropTypes.array,
  /** If defined, then the default React-Vis line colors will be overridden using the string items defined in the array*/
  lineColor:PropTypes.array,
  /** If defined then the length of the line graphs will grow up until the value defined*/
  maxLength:PropTypes.number,
  /** Custom y axis units to be used*/
  yUnits:PropTypes.string,
  /** Custom x axis units to be used*/
  xUnits:PropTypes.string,
  /** Directive to sample the PV values, on the client side at the polling rate*/
  usePolling:PropTypes.bool,
  /** Directive to scale the y-axis as a log base 10 value*/
  yScaleLog10:PropTypes.bool,
  /** Polling interval in ms used in polling mode*/
  pollingRate:PropTypes.number,

  /** Directive to use PV timestamp on x-axis*/
  useTimeStamp:PropTypes.bool,
  /** Update mode of the graph, Note polling mode will override these settings*/
  updateMode: PropTypes.oneOf(['updateOnXOrYChange', 'updateOnYChange','updateOnXChange']),
};

GraphXY.defaultProps = {
  updateMode:'updateOnXOrYChange',
  debug:false,
  yAxisTitle:'Y-axis',
  xAxisTitle:'X-axis',
  yUnits:"",
  xUnits:"",
  usePolling:false,
  pollingRate:100,

};



export default withStyles(styles,{withTheme:true})(GraphXY)
