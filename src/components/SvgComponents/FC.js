import React from 'react'
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import DataConnection from '../SystemComponents/DataConnection';
import { withStyles } from '@material-ui/core/styles';
//import MenuItem from '@material-ui/core/MenuItem';


const styles = theme => ({


  textFC: {
    fill:theme.palette.text.primary

  }

});


class FC extends React.Component {
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
    //console.log("In FC: clicked "+device.toString());
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
            <linearGradient id={this.state.pvname+'FC-gradient'} gradientTransform="rotate(0)">
              <stop offset="0%" stopColor={'silver'} />
              <stop offset="65%" stopColor={color} />
            </linearGradient>
            <defs>
              <filter id={this.state.pvname+"FCShadow"} x="0" y="0" width="600%" height="500%">
                <feOffset result="offOut" in="SourceGraphic" dx="2.5" dy="2.5" />
                <feColorMatrix result="matrixOut" in="offOut" type="matrix"
                values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
                <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2.5" />
                <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
              </filter>
            </defs>

            <g
              fill={this.props.componentGradient===true?'url(#'+this.state.pvname+'FC-gradient)':color}
              filter={this.props.componentShadow===true?"url(#"+this.state.pvname+"FCShadow)":"" }
              transform={'translate('+this.props.cx+','+yoffset+')'}
            >
              {yoffset!==0&&  <g transform={'translate(0,-1016)'}>
                <path
                  d="m 3.2879796,1122.4204 c -1.2852323,-0.084 -1.5029316,-0.1209 -1.1719195,-0.2014 0.1791184,-0.043 0.5666595,-0.2704 0.7975976,-0.4662 1.6785753,-1.4252 3.0788061,-5.7048 3.6656823,-11.2038 0.195042,-1.8277 0.2763907,-3.29 0.297677,-5.351 0.036502,-3.535 -0.1932037,-6.6349 -0.7107832,-9.5922 -0.3826264,-2.1864 -0.8317616,-3.8473 -1.4551449,-5.3815 -0.7283328,-1.7928 -1.587264,-2.9311 -2.4746797,-3.2803 -0.1952031,-0.078 -0.2017864,-0.084 -0.1106923,-0.1093 0.1205222,-0.035 1.2221931,-0.1066 2.1584862,-0.1411 1.1404741,-0.043 2.8140282,0.053 4.2616262,0.2503 5.8683487,0.7943 11.1733747,3.604 14.5144387,7.6873 0.570693,0.6973 0.880617,1.1339 1.370907,1.931 1.558755,2.5337 2.323424,5.1761 2.323424,8.0286 0,2.2956 -0.525865,4.5248 -1.575169,6.6774 -0.209551,0.4298 -0.747136,1.3504 -1.095266,1.8757 -2.376667,3.5854 -6.32174,6.4653 -10.9765,8.0124 -2.645862,0.8797 -5.4712766,1.3212 -8.3253487,1.3007 -0.5555337,0 -1.2279842,-0.029 -1.4943364,-0.037 z"
                />
                <ellipse
                  cx="1.4687502"
                  cy="1104.5706"
                  rx="5.3938155"
                ry="17.737566" />




              </g>
              }

              {yoffset===0&&  <g transform={'translate(0,-1003.5)'}>
                <path
                  d="m 3.2879796,1122.4204 c -1.2852323,-0.084 -1.5029316,-0.1209 -1.1719195,-0.2014 0.1791184,-0.043 0.5666595,-0.2704 0.7975976,-0.4662 1.6785753,-1.4252 3.0788061,-5.7048 3.6656823,-11.2038 0.195042,-1.8277 0.2763907,-3.29 0.297677,-5.351 0.036502,-3.535 -0.1932037,-6.6349 -0.7107832,-9.5922 -0.3826264,-2.1864 -0.8317616,-3.8473 -1.4551449,-5.3815 -0.7283328,-1.7928 -1.587264,-2.9311 -2.4746797,-3.2803 -0.1952031,-0.078 -0.2017864,-0.084 -0.1106923,-0.1093 0.1205222,-0.035 1.2221931,-0.1066 2.1584862,-0.1411 1.1404741,-0.043 2.8140282,0.053 4.2616262,0.2503 5.8683487,0.7943 11.1733747,3.604 14.5144387,7.6873 0.570693,0.6973 0.880617,1.1339 1.370907,1.931 1.558755,2.5337 2.323424,5.1761 2.323424,8.0286 0,2.2956 -0.525865,4.5248 -1.575169,6.6774 -0.209551,0.4298 -0.747136,1.3504 -1.095266,1.8757 -2.376667,3.5854 -6.32174,6.4653 -10.9765,8.0124 -2.645862,0.8797 -5.4712766,1.3212 -8.3253487,1.3007 -0.5555337,0 -1.2279842,-0.029 -1.4943364,-0.037 z"
                />

                <path
                  d="m -3.4638833,1099.367 c 0.01624,-0.077 0.059926,-0.436 0.09708,-0.7969 0.1854184,-1.8013 0.5258377,-3.7387 0.9499126,-5.4062 1.0059446,-3.9555 2.51391862,-6.281 4.072973,-6.2813 0.7660926,-10e-5 1.7048315,0.7373 2.3701022,1.8616 1.1741882,1.9845 2.0908626,5.3614 2.5739082,9.4821 0.052385,0.4469 0.0955,0.918 0.095813,1.0469 l 5.669e-4,0.2344 h -5.094941 -5.094941 z"
                />
                <path
                  d="m 0.8923237,1122.0693 c -1.9504533,-0.9228 -3.6344723,-5.5142 -4.280598,-11.6711 l -0.080348,-0.7656 h 5.082547 5.0825471 l -5.625e-4,0.2031 c -3.125e-4,0.1117 -0.043324,0.5688 -0.095583,1.0156 -0.7019438,6.0025 -2.2939508,10.2889 -4.1370302,11.1386 -0.1798115,0.083 -0.34319,0.1771 -0.3630636,0.2092 -0.019874,0.032 -0.210255,0.058 -0.42307,0.058 -0.3004544,0 -0.4758687,-0.042 -0.7848344,-0.1882 z"
                />
              </g>


              }
            </g>
            <text className={classes.textFC}
              x={typeof this.props.labelOffsetX!=='undefined'?this.props.labelOffsetX+this.props.cx+12:this.props.cx+12}
              y={typeof this.props.labelOffsetY!=='undefined'?this.props.labelOffsetY+this.props.cy+yoffset-40:+this.props.cy+yoffset-40}
              textAnchor='middle'
              filter={this.props.textShadow===true?"url(#"+this.state.pvname+"FCShadow)":""
              }

            >
              {usePvLabel===true? this.state['label']:this.props.label}
            </text>
          </g>
        }
        {(initialized===false||initialized==='undefined') &&
          <g>
            <linearGradient id="FC-gradient">
              <stop offset="0%" stopOpacity="0" />

              <stop offset="75%" stopColor={'grey'} />

              {/*}<stop offset="100%" stopOpacity="0" />*/}
            </linearGradient>
            <linearGradient id={this.state.pvname+'FC-gradient'} gradientTransform="rotate(0)">
              <stop offset="0%" stopColor='silver' />
              <stop offset="65%" stopColor={'grey'} />
            </linearGradient>
            <defs>
              <filter id={this.state.pvname+"FCShadow"} x="0" y="0" width="600%" height="500%">
                <feOffset result="offOut" in="SourceGraphic" dx="7.5" dy="7.5" />
                <feColorMatrix result="matrixOut" in="offOut" type="matrix"
                values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
                <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="5" />
                <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
              </filter>
            </defs>

            <g
              fill={this.props.componentGradient===true?'url(#'+this.state.pvname+'FC-gradient)':'grey'}
              filter={this.props.componentShadow===true?"url(#"+this.state.pvname+"FCShadow)":"" }
              transform={'translate('+this.props.cx+',0)'}
            >

              <g transform={'translate(0,-1003.5)'}>
                <path
                  d="m 3.2879796,1122.4204 c -1.2852323,-0.084 -1.5029316,-0.1209 -1.1719195,-0.2014 0.1791184,-0.043 0.5666595,-0.2704 0.7975976,-0.4662 1.6785753,-1.4252 3.0788061,-5.7048 3.6656823,-11.2038 0.195042,-1.8277 0.2763907,-3.29 0.297677,-5.351 0.036502,-3.535 -0.1932037,-6.6349 -0.7107832,-9.5922 -0.3826264,-2.1864 -0.8317616,-3.8473 -1.4551449,-5.3815 -0.7283328,-1.7928 -1.587264,-2.9311 -2.4746797,-3.2803 -0.1952031,-0.078 -0.2017864,-0.084 -0.1106923,-0.1093 0.1205222,-0.035 1.2221931,-0.1066 2.1584862,-0.1411 1.1404741,-0.043 2.8140282,0.053 4.2616262,0.2503 5.8683487,0.7943 11.1733747,3.604 14.5144387,7.6873 0.570693,0.6973 0.880617,1.1339 1.370907,1.931 1.558755,2.5337 2.323424,5.1761 2.323424,8.0286 0,2.2956 -0.525865,4.5248 -1.575169,6.6774 -0.209551,0.4298 -0.747136,1.3504 -1.095266,1.8757 -2.376667,3.5854 -6.32174,6.4653 -10.9765,8.0124 -2.645862,0.8797 -5.4712766,1.3212 -8.3253487,1.3007 -0.5555337,0 -1.2279842,-0.029 -1.4943364,-0.037 z"
                />

                <path
                  d="m -3.4638833,1099.367 c 0.01624,-0.077 0.059926,-0.436 0.09708,-0.7969 0.1854184,-1.8013 0.5258377,-3.7387 0.9499126,-5.4062 1.0059446,-3.9555 2.51391862,-6.281 4.072973,-6.2813 0.7660926,-10e-5 1.7048315,0.7373 2.3701022,1.8616 1.1741882,1.9845 2.0908626,5.3614 2.5739082,9.4821 0.052385,0.4469 0.0955,0.918 0.095813,1.0469 l 5.669e-4,0.2344 h -5.094941 -5.094941 z"
                />
                <path
                  d="m 0.8923237,1122.0693 c -1.9504533,-0.9228 -3.6344723,-5.5142 -4.280598,-11.6711 l -0.080348,-0.7656 h 5.082547 5.0825471 l -5.625e-4,0.2031 c -3.125e-4,0.1117 -0.043324,0.5688 -0.095583,1.0156 -0.7019438,6.0025 -2.2939508,10.2889 -4.1370302,11.1386 -0.1798115,0.083 -0.34319,0.1771 -0.3630636,0.2092 -0.019874,0.032 -0.210255,0.058 -0.42307,0.058 -0.3004544,0 -0.4758687,-0.042 -0.7848344,-0.1882 z"
                />
              </g>


            </g>
            <text
              x={this.props.cx+7.5}
              y={this.props.cy+60}
              textAnchor='middle'
              filter={"url(#"+this.state.pvname+"FCShadow)" }
            >
              {"Connecting"}
            </text>
            <text
              x={this.props.cx+7.5}
              y={this.props.cy+75}
              textAnchor='middle'
              filter={"url(#"+this.state.pvname+"FCShadow)" }
            >
              {"to:"}
            </text>
            <text
              x={this.props.cx+7.5}
              y={this.props.cy+90}
              textAnchor='middle'
              filter={"url(#"+this.state.pvname+"FCShadow)" }
            >
              {this.state['pvname']}
            </text>
          </g>
        }
      </g>




              );
            }
          }

          FC.contextType=AutomationStudioContext;
          export default withStyles(styles)(FC)
