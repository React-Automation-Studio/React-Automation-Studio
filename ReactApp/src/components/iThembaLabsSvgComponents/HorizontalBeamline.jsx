import React from 'react'
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import DataConnection from '../SystemComponents/DataConnection';

/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
class HorizontalBeamline extends React.Component {
  constructor(props) {
    super(props);
    this.state={'value' : "",
      'inputValue' : "",
      'outputValue' : "",
      'hasFocus':false,
      'label':"Undefined",
      'pvname':"Undefined",
      'initialized':false,
      'metadata':{},
      'severity':''
    }
    this.handleOnClick= this.handleOnClick.bind(this);
    this.handleInputValue= this.handleInputValue.bind(this);
    this.handleInputValueLabel= this.handleInputValueLabel.bind(this);
    this.handleMetadata= this.handleMetadata.bind(this);
  }

  componentDidMount() {
    console.warn(
      "This component is deprecated and will be removed in RAS in V8.0.0."
    );
  }

  componentWillUnmount() {
  }

  handleMetadata(metadata){
    this.setState({metadata	 :metadata});
  }

  handleInputValue(inputValue,pvname,initialized,severity){
    this.setState({value	 :inputValue,
    pvname:pvname,
    initialized:initialized,
    severity:severity});
  }

  handleInputValueLabel(inputValue){
    this.setState({label:inputValue});
  }

  handleOnClick = device => event => {
    this.props.handleOnClick(device);
  };

render() {
  const pv = this.props.pv;
  const macros=  this.props.macros;
  const severity=this.state.severity;
  let units="";
  const initialized=this.state.initialized;
  let value=this.state.value;
  if(initialized){
    if(this.props.usePvUnits===true){
      if (typeof this.state.metadata !== 'undefined'){
        if (typeof this.state.metadata.units !== 'undefined'){
          units=this.state.metadata.units;
        }
        else{
          units="";
        }
      }
      else {
        units="";
      }
    }
    else {
      units=this.props.units;
    }

    if (typeof this.props.usePrecision !== 'undefined'){
      if (this.props.usePrecision==true){
        if (typeof this.props.prec !== 'undefined'){
          value=parseFloat(value).toFixed(this.props.prec);
        }
        else
          value=parseFloat(value).toFixed(parseInt(this.state.metadata.precision));
      }
    }
  }

  let background_color='';
  if (typeof this.props.alarmSensitive !== 'undefined'){
    if (this.props.alarmSensitive==true){
      if (severity==1){
        background_color='linear-gradient(45deg, #FFFFFF 1%, #FF8E53 99%)';
      }
      else if(severity==2){
        background_color='linear-gradient(45deg, #FFFFFF 1%, #E20101 99%)';
      }
      else background_color='white';
    }
  }

  let color='';
  if (typeof this.props.alarmSensitive !== 'undefined'){
    if (this.props.alarmSensitive==true){
      if (severity==1){
        color='#FF8E53';
      }
      else if(severity==2){
        color='#E20101';
      }
      else color='#133C99';
    }
  }

  return (
    <g>
      <DataConnection
        pv={pv}
        macros={macros}
        handleInputValue={this.handleInputValue}
      />

      {initialized===true &&
        <g>
          <linearGradient id={this.state.pvname+'Beamline-gradient'} gradientTransform="rotate(90)">
            <stop offset="0%" stopOpacity="0" stopColor={this.state.value==0?'grey':'red'}/>
            <stop offset={this.state.value==0?"75%":"75%"}  stopColor={this.state.value==0?'grey':'red'} />
          </linearGradient>
          <linearGradient id={this.state.pvname+'Beamline-gradient2'} gradientTransform="rotate(90)">
            <stop offset="0%" stopColor={this.state.value==0?'grey':'red'} />
            <stop offset={this.state.value==0?"75%":"75%"} stopOpacity="0" stopColor={this.state.value==0?'grey':'red'} />
          </linearGradient>
          <filter id={"horizontalBeamlineShadow"} x="0" y="0" width="600%" height="500%">
            <feOffset result="offOut" in="SourceGraphic" dx="1.5" dy="1.5" />
            <feColorMatrix result="matrixOut" in="offOut" type="matrix"
            values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
            <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="1" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
          <rect
            fill={'white'}
            width={this.props.width}
            height="5"
            x={this.props.cx}
            y={this.props.cy-3} />
          <rect
            fill={'white'}

            width={this.props.width}
            height="5"
            x={this.props.cx}
            y={this.props.cy+2} />
          <rect
            fill={'url(#'+this.state.pvname+'Beamline-gradient2)'}

            width={this.props.width}
            height="4"
            x={this.props.cx}
            y={this.props.cy-3} />
          <rect
            fill={'url(#'+this.state.pvname+'Beamline-gradient)'}

            width={this.props.width}
            height="4"
            x={this.props.cx}
            y={this.props.cy+3} />
        </g>
      }
      {(initialized===false||initialized==='undefined') &&
      <g>
        <linearGradient id={this.state.pvname+'Beamline-gradient'} gradientTransform="rotate(90)">
          <stop offset="0%" stopOpacity="0" stopColor='grey'/>
          <stop offset={"75%"}  stopColor={'grey'} />
        </linearGradient>
        <linearGradient id={this.state.pvname+'Beamline-gradient2'} gradientTransform="rotate(90)">
          <stop offset="0%" stopColor={'grey'} />
          <stop offset={"75%"} stopOpacity="0" stopColor={'grey'} />
        </linearGradient>
        <filter id={"horizontalBeamlineShadow"} x="0" y="0" width="600%" height="500%">
          <feOffset result="offOut" in="SourceGraphic" dx="1.5" dy="1.5" />
          <feColorMatrix result="matrixOut" in="offOut" type="matrix"
          values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
          <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="1" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
        <rect
          fill={'url(#'+this.state.pvname+'Beamline-gradient2)'}
          width={this.props.width}
          height="4"
          x={this.props.cx}
          y={this.props.cy-3} />
          <rect
            fill={'url(#'+this.state.pvname+'Beamline-gradient)'}
            width={this.props.width}
            height="4"
            x={this.props.cx}
            y={this.props.cy+3} />
      </g>
    }
    </g>
    );
  }
}

HorizontalBeamline.contextType=AutomationStudioContext;
export default HorizontalBeamline
