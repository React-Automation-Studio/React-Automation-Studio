import React from 'react'
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import DataConnection from '../SystemComponents/DataConnection';
//import MenuItem from '@material-ui/core/MenuItem';



class SteererXMagnet extends React.Component {
  constructor(props) {
    super(props);
    this.state={'value' : "",
    'inputValue' : "",
    'outputValue' : "",
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
  //console.log("In quad: clicked "+device.toString());
  this.props.handleOnClick(device);
  //  this.setState({ ['clicked']: 1});
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
      else {
        color_side='#133CA9';
        color_face='#133C99';
        color_top='#133CA3';
      }

    }

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
        outputValue=  {this.state.outputValue}
        useStringValue={useStringValue}
      />

      { usePvLabel===true && <DataConnection

        pv={pv.toString()+".DESC"}
        macros={macros}
        handleInputValue={this.handleInputValueLabel}

                                  />    }

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
              {/*}
                <path d="M 10 12 L 10 12 L 17 12 L 17 -10 L 10 -10 L 10 12 "
                fill={color_face}
                style={{'stroke-width':'0.5',
                'stroke':'dimgrey'}}

                />
                <path d="M 0 0 L 0, 0   0 10 L 10 12 L 10 -10 L 0 -12 L 0 0"
                fill={color_side}
                style={{'stroke-width':'0.3',
                'stroke':'dimgrey'}}
                />


                <path d="M 10 -10 L 10 -10 L 17 -10 L 11 -12 L 0 -12 L 10 -10 "
                fill={color_top}
                style={{'stroke-width':'0.3',
                'stroke':'dimgrey'}}


              */}
              />
              <g transform="translate(-10,-308)"
                fill={this.props.componentGradient===true?'url(#'+this.state.pvname+'elipse-gradient)':color_side}
                style={{'stroke-width':'0.3',
                'stroke':'black'}}
                >
                <path

                   d="M 8.6513703,303.61567 H 0.44117934 l -0.33870216,-1.3475 1.02966552,-4.66745 2.9907489,-13.55698 8.0629214,6.64171 4.049865,24.71154 -4.013051,18.28351 -7.9892878,-6.73031 -2.2090176,-12.84154 7.8935625,-0.089 0.1178149,-9.25576 z"
                   id="sideMain"
              />
                <path
                   d="m 6.4644379,303.61559 -0.051537,-1.85555 2.3268318,1.85563 z"
                   id="innerTop"
                 />
                <path
                   d="m 7.7530443,313.99743 2.1648285,0.0226 v 1.76755 z"
                   id="innerBottom"
                />
                <path
                   d="m 4.1228803,284.04374 10.0510507,0.0667 7.915636,6.69276 h -9.852225 z"
                   id="top"
                />
                <path
                   d="m 22.200033,290.71546 4.020415,24.74098 -10.102595,-4.9e-4 -3.880511,-24.65268 z"
                   id="topRight"
                />
                <path
                   d="m 26.087892,315.39699 -3.865766,18.18812 -9.99951,0.0958 3.895237,-18.22454 z"
                   id="bottomright"
                 />
              </g>

              </g>
            </g>


            <text
              x={typeof this.props.valueOffsetX!=='undefined'?this.props.valueOffsetX+7.5:7.5}
              y={typeof this.props.valueOffsetY!=='undefined'?this.props.valueOffsetY+57.5:57.5}
              text-anchor='middle'
              filter={this.props.textShadow===true?"url(#"+this.state.pvname+"elipseShadow)":"" }
            >
              {this.props.usePvUnits===true? value+" "+this.state['metadata'].units: value+" "+this.props.units}

        </text>
        <text
          x={typeof this.props.labelOffsetX!=='undefined'?this.props.labelOffsetX+7.5:7.5}
        y={typeof this.props.labelOffsetY!=='undefined'?this.props.labelOffsetY-40:-40}
          text-anchor='middle'
          filter={this.props.textShadow===true?"url(#"+this.state.pvname+"elipseShadow)":"" }
        >
          {usePvLabel===true? this.state['label']:this.props.label}
        </text>
        </g>
      }
      {(initialized===false||initialized==='undefined') &&
        <g transform={'translate('+this.props.cx+','+this.props.cy+')'}>
          <linearGradient id={this.state.pvname+'elipse-gradient'} gradientTransform="rotate(0)">
            <stop offset="0%" stopOpacity="0" stopColor={'grey'} />
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
            <g>

              <path d="M 10 25 L 10 25 L 23 25 L 23 -25 L 10 -25 L 10 25 "
                fill={'grey'}
                style={{'stroke-width':'0.5',
                'stroke':'dimgrey'}}

              />
              <path d="M -10 -5 L -10, -5   -10 20 L 10 25 L 10 -25 L -10 -30 L -10 -5"
                fill={this.props.componentGradient===true?'url(#'+this.state.pvname+'elipse-gradient)':'grey'}
                style={{'stroke-width':'0.3',
                'stroke':'dimgrey'}}
              />


              <path d="M 23 -25 L 23 -25 L 8 -30 L -10 -30 L 10 -25 L 23 -25"
                fill={'grey'}
                style={{'stroke-width':'0.3',
                'stroke':'dimgrey'}}

              />



            </g>
          </g>


          <text
            x={7.5}
            y={57.5}
            text-anchor='middle'
            filter={this.props.textShadow===true?"url(#"+this.state.pvname+"elipseShadow)":"" }
          >
            {this.props.usePvUnits===true? value+" "+this.state['metadata'].units: value+" "+this.props.units}

          </text>
          <text
            x={7.5}
            y={-40}
            text-anchor='middle'
            filter={this.props.textShadow===true?"url(#"+this.state.pvname+"elipseShadow)":"" }
          >
            {usePvLabel===true? this.state['label']:this.props.label}
          </text>
        </g>
      }
    </g>




                            );
                          }
                        }

                        SteererXMagnet.contextType=AutomationStudioContext;
                        export default SteererXMagnet
