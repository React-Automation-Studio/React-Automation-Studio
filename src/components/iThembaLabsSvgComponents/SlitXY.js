import React from 'react'
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import DataConnection from '../SystemComponents/DataConnection';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({


  textSlitXYLabel: {
    fill:theme.palette.text.primary

  },
  textSlitXYValue: {
    fill:theme.palette.text.primary

  }
});



class SlitXY extends React.Component {
  constructor(props) {
    super(props);
    let pvs={};
    pvs['xGapReadback']={initialized: false, pvname:'pva://'+props.system.devices.xGapDevice.deviceName+":"+props.system.devices.xGapDevice.readback,value:"",char_value:"",metadata:{}};
    pvs['xOffsetReadback']={initialized: false, pvname:'pva://'+props.system.devices.xOffsetDevice.deviceName+":"+props.system.devices.xOffsetDevice.readback,value:"",char_value:"",metadata:{}};
    pvs['yGapReadback']={initialized: false, pvname:'pva://'+props.system.devices.yGapDevice.deviceName+":"+props.system.devices.yGapDevice.readback,value:"",char_value:"",metadata:{}};
    pvs['yOffsetReadback']={initialized: false, pvname:'pva://'+props.system.devices.yOffsetDevice.deviceName+":"+props.system.devices.yOffsetDevice.readback,value:"",char_value:"",metadata:{}};
    this.state={
      pvs:pvs
    }
    this.handleOnClick= this.handleOnClick.bind(this);
    this.handleInputValue= this.handleInputValue.bind(this);
    this.handleInputValueLabel= this.handleInputValueLabel.bind(this);
    this.handleMetadata= this.handleMetadata.bind(this);
  }



  componentDidMount() {
  }


  componentWillUnmount() {

  }






  handleMetadata= readback => (metadata) => {

    let pvs=this.state.pvs;
    pvs[readback].metadata=metadata;
    this.setState({pvs	 :pvs});


  }


  handleInputValue= readback => (inputValue,pvname,initialized,severity)=>{
    let pvs=this.state.pvs;
    pvs[readback].value=inputValue;
    pvs[readback].initialized=initialized;
    pvs[readback].severity=severity;

    this.setState({pvs:pvs});
  }


  handleInputValueLabel(inputValue){

    this.setState({['label']:inputValue});

  }

  handleOnClick = system => event => {
    //console.log("In quad: clicked "+device.toString());
    this.props.handleOnClick(system);
    //  this.setState({ ['clicked']: 1});
  };

  render() {

    const {classes}= this.props;
    const pvs=this.state.pvs;
    //  const pv = this.props.pv;
    //  const macros=  this.props.macros;
    //  const usePvLabel= this.props.usePvLabel;
    const mylabel= this.props.label;
    const usePrecision= this.props.prec;

    const useStringValue=this.props.useStringValue;

    let xGapUnits="";
    let yGapUnits="";
    let xOffsetUnits="";
    let yOffsetUnits="";
    const initialized=pvs.xGapReadback.initialized&&pvs.yGapReadback.initialized&&pvs.yOffsetReadback.initialized&&pvs.xOffsetReadback.initialized;
    let xGapReadbackValue=pvs.xGapReadback.value;
    let yGapReadbackValue=pvs.yGapReadback.value;
    let xOffsetReadbackValue=pvs.xOffsetReadback.value;
    let yOffsetReadbackValue=pvs.yOffsetReadback.value;
    let severity=0;
    if(initialized){
      if(this.props.usePvUnits===true){

        xGapUnits=pvs.xGapReadback.metadata.units;
        yGapUnits=pvs.yGapReadback.metadata.units;
        xOffsetUnits=pvs.xOffsetReadback.metadata.units;
        yOffsetUnits=pvs.yOffsetReadback.metadata.units;
      }





      else {
        xGapUnits=this.props.xUnits;
        yGapUnits=this.props.yUnits;
        xOffsetUnits=this.props.xUnits;
        yOffsetUnits=this.props.yUnits;
      }


      if (typeof this.props.usePrecision !== 'undefined'){
        if (this.props.usePrecision==true){
          if (typeof this.props.prec !== 'undefined'){
            xGapReadbackValue=parseFloat(xGapReadbackValue).toFixed(this.props.prec);
            yGapReadbackValue=parseFloat(yGapReadbackValue).toFixed(this.props.prec);
            xOffsetReadbackValue=parseFloat(xOffsetReadbackValue).toFixed(this.props.prec);
            yOffsetReadbackValue=parseFloat(yOffsetReadbackValue).toFixed(this.props.prec);
          }
          else{
            xGapReadbackValue=parseFloat(xGapReadbackValue).toFixed(parseInt(pvs.xGapReadback.metadata.precision));
            yGapReadbackValue=parseFloat(yGapReadbackValue).toFixed(parseInt(pvs.yGapReadback.metadata.precision));
            xOffsetReadbackValue=parseFloat(xOffsetReadbackValue).toFixed(parseInt(pvs.xOffsetReadback.metadata.precision));
            yOffsetReadbackValue=parseFloat(yOffsetReadbackValue).toFixed(parseInt(pvs.yOffsetReadback.metadata.precision));
          }
        }

      }







      if((pvs.xGapReadback.severity==2)||(pvs.yGapReadback.severity==2)||(pvs.yOffsetReadback.severity==2)||(pvs.xOffsetReadback.severity==2)){

        severity=2;
      }
      else   if((pvs.xGapReadback.severity==1)||(pvs.yGapReadback.severity==1)||(pvs.yOffsetReadback.severity==1)||(pvs.xOffsetReadback.severity==1)){
        severity=1;
      }
    }


    let color_side='';
    let color_face='';
    let color_top='';
    if (typeof this.props.alarmSensitive !== 'undefined'){
      if (this.props.alarmSensitive==true){
        if (severity==1){
          color_side='#FF8E53';
          color_face='#FF8E43';
          color_top='#FF8E63';
        }
        else if(severity==2){
          color_side='#E20101';
          color_face='#E20901';
          color_top='#E20111';
        }
        // else {
        //   if((pvs.xOffOn.value==1)||(pvs.yOffOn.value==1)){
        //     color_side='#2e7d32';
        //     color_face='#2e7d32';
        //     color_top='#2e7d32';
        //   }
        else{
          color_side='#133CA9';
          color_face='#133C99';
          color_top='#133CA3';

        }
        // }

      }

    }






    return (
      <g  onClick={this.handleOnClick(this.props.system)}>
      <DataConnection
      pv={this.state.pvs['xGapReadback'].pvname}
      usePrecision={usePrecision}
      handleInputValue={this.handleInputValue('xGapReadback')}
      handleMetadata={this.handleMetadata('xGapReadback')}
      />
      <DataConnection
      pv={this.state.pvs['yGapReadback'].pvname}
      usePrecision={usePrecision}
      handleInputValue={this.handleInputValue('yGapReadback')}
      handleMetadata={this.handleMetadata('yGapReadback')}
      />
      <DataConnection
      pv={this.state.pvs['xOffsetReadback'].pvname}
      usePrecision={usePrecision}
      handleInputValue={this.handleInputValue('xOffsetReadback')}
      handleMetadata={this.handleMetadata('xOffsetReadback')}
      />
      <DataConnection
      pv={this.state.pvs['yOffsetReadback'].pvname}
      usePrecision={usePrecision}
      handleInputValue={this.handleInputValue('yOffsetReadback')}
      handleMetadata={this.handleMetadata('yOffsetReadback')}
      />
      {initialized===true &&
        <g transform={'translate('+this.props.cx+','+this.props.cy+')'}>
        <linearGradient id={this.state.pvname+'elipse-gradient'} gradientTransform="rotate(0)">
        <stop offset="0%" stopOpacity="30" stopColor={'silver'} />
        <stop offset="75%" stopColor={color_side} />
        </linearGradient>
        <defs>
        <filter id={this.state.pvname+"elipseShadow"} x="0" y="0" width="600%" height="500%">
        <feOffset result="offOut" in="SourceGraphic" dx="2.5" dy="2.5" />
        <feColorMatrix result="matrixOut" in="offOut" type="matrix"
        values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
        <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2.5" />
        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
        </defs>
        <g filter={this.props.componentShadow===true?"url(#"+this.state.pvname+"elipseShadow)":"" }
        >
        <g>

        <g transform="translate(-10,-1092.5)"
        fill={this.props.componentGradient===true?'url(#'+this.state.pvname+'elipse-gradient)':color_side}
        style={{'strokeWidth':'0.3',
        'stroke':'black'}}
        >

        <g>
        <path
        d="m 15.05893,1085.0254 -1.776617,20.1381 0.759263,0.6179 0.51536,-5.8416 5.003912,4.0722 0.745906,-8.4549 -5.003912,-4.0722 0.515351,-5.8416 z"
        id="rect6403"
        />
        <path
        d="m 7.9498012,1076.2957 6.6301368,5.3958 0.203442,-2.3062 -1.923241,-1.565 1.340787,-15.198 -2.783656,-2.2654 -1.340787,15.1979 -1.9232398,-1.5651 z"
        />
        <path
        d="m 6.2770152,1077.8803 -0.513672,5.8398 -5.00390605,-4.0723 -0.728516,8.2461 6.16796905,-0.018 0.837891,-9.3789 z"

        />
        <path
        d="m 5.7589222,1101.1294 6.6301368,5.3958 -0.203451,2.3061 -1.92324,-1.5652 -1.3407868,15.1979 -2.783656,-2.2654 1.340787,-15.1979 -1.92324,-1.5651 z"

        />
        </g>
        </g>

        </g>
        </g>
        <text className={classes.textSlitXYValue}
        x={typeof this.props.valueOffsetX!=='undefined'?this.props.valueOffsetX:0}
        y={typeof this.props.valueOffsetY!=='undefined'?this.props.valueOffsetY+30:30}
        textAnchor='middle'
        filter={this.props.textShadow===true?"url(#"+this.props.system.systemName+"elipseShadow)":"" }
        >
        {this.props.usePvUnits===true?"XGap: "+  xGapReadbackValue+" "+this.state.pvs.xGapReadback.metadata.units:"XGap: "+  xGapReadbackValue+" "+this.props.units}
        </text>
        <text className={classes.textSlitXYValue}
        x={typeof this.props.valueOffsetX!=='undefined'?this.props.valueOffsetX:0}
        y={typeof this.props.valueOffsetY!=='undefined'?this.props.valueOffsetY+46:46}
        textAnchor='middle'
        filter={this.props.textShadow===true?"url(#"+this.props.system.systemName+"elipseShadow)":"" }
        >
        {this.props.usePvUnits===true?"YGap: "+  yGapReadbackValue+" "+this.state.pvs.xGapReadback.metadata.units:"YGap: "+  yGapReadbackValue+" "+this.props.units}
        </text>
        <text className={classes.textSlitXYValue}
        x={typeof this.props.valueOffsetX!=='undefined'?this.props.valueOffsetX:0}
        y={typeof this.props.valueOffsetY!=='undefined'?this.props.valueOffsetY+62:62}
        textAnchor='middle'
        filter={this.props.textShadow===true?"url(#"+this.props.system.systemName+"elipseShadow)":"" }
        >
        {this.props.usePvUnits===true?"XOff: "+  xOffsetReadbackValue+" "+this.state.pvs.xOffsetReadback.metadata.units:"XOff: "+  xOffsetReadbackValue+" "+this.props.units}
        </text>
        <text className={classes.textSlitXYValue}
        x={typeof this.props.valueOffsetX!=='undefined'?this.props.valueOffsetX:0}
        y={typeof this.props.valueOffsetY!=='undefined'?this.props.valueOffsetY+78:78}
        textAnchor='middle'
        filter={this.props.textShadow===true?"url(#"+this.props.system.systemName+"elipseShadow)":"" }
        >
        {this.props.usePvUnits===true?"YOff: "+  yOffsetReadbackValue+" "+this.state.pvs.yOffsetReadback.metadata.units:"YOff: "+  yOffsetReadbackValue+" "+this.props.units}
        </text>
        <text className={classes.textSlitXYValue}
        x={typeof this.props.labelOffsetX!=='undefined'?this.props.labelOffsetX:0}
        y={typeof this.props.labelOffsetY!=='undefined'?this.props.labelOffsetY-40:-40}
        textAnchor='middle'
        filter={this.props.textShadow===true?"url(#"+this.props.system.systemName+"elipseShadow)":"" }
        >
        {this.props.system.displayName}
        </text>





        </g>
      }
      {(initialized===false) &&
        <g transform={'translate('+this.props.cx+','+this.props.cy+')'}>
        <linearGradient id={this.state.pvname+'elipse-gradient'} gradientTransform="rotate(0)">
        <stop offset="0%" stopOpacity="30" stopColor={'silver'} />
        <stop offset="75%" stopColor={'grey'} />
        </linearGradient>
        <defs>
        <filter id={this.state.pvname+"elipseShadow"} x="0" y="0" width="600%" height="500%">
        <feOffset result="offOut" in="SourceGraphic" dx="2.5" dy="2.5" />
        <feColorMatrix result="matrixOut" in="offOut" type="matrix"
        values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
        <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2.5" />
        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
        </defs>
        <g filter={this.props.componentShadow===true?"url(#"+this.state.pvname+"elipseShadow)":"" }
        >


        <g transform="translate(-10,-1092.5)"
        fill={this.props.componentGradient===true?'url(#'+this.state.pvname+'elipse-gradient)':color_side}
        style={{'strokeWidth':'0.3',
        'stroke':'black'}}
        >

        <g>
        <path
        d="m 15.05893,1085.0254 -1.776617,20.1381 0.759263,0.6179 0.51536,-5.8416 5.003912,4.0722 0.745906,-8.4549 -5.003912,-4.0722 0.515351,-5.8416 z"
        id="rect6403"
        />
        <path
        d="m 7.9498012,1076.2957 6.6301368,5.3958 0.203442,-2.3062 -1.923241,-1.565 1.340787,-15.198 -2.783656,-2.2654 -1.340787,15.1979 -1.9232398,-1.5651 z"
        />
        <path
        d="m 6.2770152,1077.8803 -0.513672,5.8398 -5.00390605,-4.0723 -0.728516,8.2461 6.16796905,-0.018 0.837891,-9.3789 z"

        />
        <path
        d="m 5.7589222,1101.1294 6.6301368,5.3958 -0.203451,2.3061 -1.92324,-1.5652 -1.3407868,15.1979 -2.783656,-2.2654 1.340787,-15.1979 -1.92324,-1.5651 z"

        />
        </g>
        </g>

        </g>



        <text
        x={7.5}
        y={57.5}
        textAnchor='middle'
        filter={this.props.textShadow===true?"url(#"+this.state.pvname+"elipseShadow)":"" }
        >
        {"Connecting"}

        </text>
        <text
        x={7.5}
        y={-40}
        textAnchor='middle'
        filter={this.props.textShadow===true?"url(#"+this.state.pvname+"elipseShadow)":"" }
        >
        {this.props.label}
        </text>
        </g>
      }
      </g>




    );
  }
}

SlitXY.contextType=AutomationStudioContext;
export default withStyles(styles)(SlitXY)
