import React from 'react'
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import DataConnection from '../SystemComponents/DataConnection';
//import MenuItem from '@material-ui/core/MenuItem';



class SvgElementTest extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    'value' : "",
    'hasFocus':false,
    'label':"Undefined",
    'pvname':"Undefined",
    'intialized':false,
    'metadata':{},
    'severity':''
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





handleMetadata(metadata){


  this.setState({['metadata']	 :metadata});


}


handleInputValue(inputValue,pvname,initialized,severity){

  this.setState({['value']	 :inputValue,
  ['pvname']:pvname,
  ['initialized']:initialized,
  ['severity']:severity});

}


handleInputValueLabel(inputValue){

  this.setState({['label']:inputValue});

}


handleOnClick = device => event => {
  console.log("In SvgElementTest: clicked "+device.toString());
  //this.props.handleOnClick(device);
  this.setState({ ['value']: this.state['value']==0?1:0});
};

render() {
  const {classes}= this.props;
  const pv = this.props.pv;
  const macros=  this.props.macros;
  const usePvLabel= this.props.usePvLabel;
  const mylabel= this.props.label;
  const usePrecision= this.props.prec;
  const useStringValue=this.props.useStringValue;
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





  let yoffset=0;
  if (value==1){
    yoffset=0;

  }
  else{
    yoffset=-30;
  }
  const style = {
    background: background_color,
    borderRadius: 4,

  };


  return (
    <g  onClick={this.handleOnClick(this.props.macros['$(device)'])}>
      <DataConnection
        pv={pv}
        macros={macros}
        usePvLabel={usePvLabel}
        usePrecision={usePrecision}
        handleInputValue={this.handleInputValue}
        handleMetadata={this.handleMetadata}
        outputValue=  {this.state.value}
        useStringValue={useStringValue}
      />

      { usePvLabel===true && <DataConnection

        pv={pv.toString()+".DESC"}
        macros={macros}
        handleInputValue={this.handleInputValueLabel}

      />    }

      {initialized===true &&
        <g>
          <linearGradient id={this.state.pvname+'SvgElementTest-gradient'} gradientTransform="rotate(0)">
            <stop offset="0%" stopOpacity="0" />
            <stop offset="90%" stopColor={color} />
          </linearGradient>
          <defs>
            <filter id={this.state.pvname+"SvgElementTestShadow"} x="0" y="0" width="600%" height="500%">
              <feOffset result="offOut" in="SourceGraphic" dx="2" dy="2" />
              <feColorMatrix result="matrixOut" in="offOut" type="matrix"
                values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
                <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="1" />
                <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
              </filter>
            </defs>
            <g transform={'translate('+this.props.cx+','+this.props.cy+')'}


              >
              {yoffset!==0&&  <g
                  fill={this.props.componentGradient===true?'url(#'+this.state.pvname+'SvgElementTest-gradient)':color}
                  filter={this.props.componentShadow===true?"url(#"+this.state.pvname+"SvgElementTestShadow)":"" }
                  style={{'transform': 'rotate3d(0,-1,0,30deg) '}}
                  >
                  <rect width="3" height="36" x={-9}  y={ +yoffset-17.5} />"
                  <rect width="3" height="36" x={-3}  y={ +yoffset-17.5} />"
                  <rect width="3" height="36" x={+3}  y={ +yoffset-17.5} />"
                  <rect width="3" height="36" x={9}   y={ +yoffset-17.5} />"
                  <rect width="36" height="3" x={-18}  y={ +yoffset+9} />"
                  <rect width="36" height="3" x={-18}  y={ +yoffset-9} />"
                  <rect width="36" height="3" x={-18}  y={ +yoffset-3} />"
                  <rect width="36" height="3" x={-18}  y={ +yoffset+3} />"
                </g>
              }
              {yoffset===0&&  <g
                  fill={this.props.componentGradient===true?'url(#'+this.state.pvname+'SvgElementTest-gradient)':color}
                  filter={this.props.componentShadow===true?"url(#"+this.state.pvname+"SvgElementTestShadow)":"" }
                  style={{'transform': 'rotate3d(0,-1,0,30deg) '}}
                  >
                  <rect width="3" height="14" x={-9}  y={ +yoffset+4.5} />"
                  <rect width="3" height="14" x={-3}  y={ +yoffset+4.5} />"
                  <rect width="3" height="14" x={-9}  y={ +yoffset-17.5} />"
                  <rect width="3" height="14" x={-3}  y={ +yoffset-17.5} />"
                  <rect width="3" height="36" x={+3}  y={ +yoffset-17.5} />"
                  <rect width="3" height="36" x={9}   y={ +yoffset-17.5} />"
                  <rect width="36" height="3" x={-18}  y={ +yoffset+9} />"
                  <rect width="36" height="3" x={-18}  y={ +yoffset-9} />"
                  <rect width="20" height="3" x={-2}  y={ +yoffset-3} />"
                  <rect width="20" height="3" x={-2}  y={ +yoffset+3} />"
                </g>
              }

              <text
                x={0}
                y={+yoffset-40}
                text-anchor='middle'
                filter={this.props.textShadow===true?"url(#"+this.state.pvname+"SvgElementTestShadow)":"" }
                >
                  {usePvLabel===true? this.state['label']:this.props.label}
                </text>
              </g>
            </g>
            }
            {(initialized===false||initialized==='undefined') &&
            <g>
              <linearGradient id="SvgElementTest-gradient">
                <stop offset="0%" stopOpacity="0" />

                <stop offset="75%" stopColor={'grey'} />

                {/*}<stop offset="100%" stopOpacity="0" />*/}
              </linearGradient>
              <linearGradient id={this.state.pvname+'SvgElementTest-gradient'} gradientTransform="rotate(0)">
                <stop offset="0%" stopOpacity="0" />
                <stop offset="65%" stopColor={'grey'} />
              </linearGradient>
              <defs>
                <filter id={this.state.pvname+"SvgElementTestShadow"} x="0" y="0" width="600%" height="500%">
                  <feOffset result="offOut" in="SourceGraphic" dx="7.5" dy="7.5" />
                  <feColorMatrix result="matrixOut" in="offOut" type="matrix"
                    values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
                    <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="5" />
                    <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                  </filter>
                </defs>

                <ellipse
                  fill={'url(#'+this.state.pvname+'SvgElementTest-gradient)'}

                  cx={this.props.cx}
                  cy={this.props.cy}
                  rx="10"
                  ry="30"
                  filter={"url(#"+this.state.pvname+"SvgElementTestShadow)" }
                />
                <ellipse
                  fill={'url(#'+this.state.pvname+'SvgElementTest-gradient)'}

                  cx={this.props.cx+15}
                  cy={this.props.cy}
                  rx="10"
                  ry="30"
                  filter={"url(#"+this.state.pvname+"SvgElementTestShadow)" }
                />
                <text
                  x={this.props.cx+7.5}
                  y={this.props.cy+60}
                  text-anchor='middle'
                  filter={"url(#"+this.state.pvname+"SvgElementTestShadow)" }
                  >
                    {"Connecting"}
                  </text>
                  <text
                    x={this.props.cx+7.5}
                    y={this.props.cy+75}
                    text-anchor='middle'
                    filter={"url(#"+this.state.pvname+"SvgElementTestShadow)" }
                    >
                      {"to:"}
                    </text>
                    <text
                      x={this.props.cx+7.5}
                      y={this.props.cy+90}
                      text-anchor='middle'
                      filter={"url(#"+this.state.pvname+"SvgElementTestShadow)" }
                      >
                        {this.state['pvname']}
                      </text>
                    </g>
                  }
                </g>




              );
            }
          }

          SvgElementTest.contextType=AutomationStudioContext;
          export default SvgElementTest
