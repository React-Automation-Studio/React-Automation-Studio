import React from 'react'
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import DataConnection from '../SystemComponents/DataConnection';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import ContextMenu from '../SystemComponents/ContextMenu';


import { withStyles } from '@material-ui/core/styles';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({


  textFC: {
    fill:theme.palette.text.primary

  },

  textFCOff: {
    fill:'grey'

  },
  contextMenu:{
    position:'relative'
  }

});
/* eslint-disable eqeqeq */
class FC extends React.Component {
  constructor(props) {
    super(props);

    //  const  xrawScanPV='pva://'+this.props.systemName+':xraw.SCAN';
    //    const yrawScanPV='pva://'+this.props.systemName+':yraw.SCAN';
    const safetyOkPV='pva://'+this.props.systemName+':get-status.B1';
    const safetyAlarmPV='pva://'+this.props.systemName+':get-status.B0';
    const airPressurePV='pva://'+this.props.systemName+':get-status.B2';
    const HvPV='pva://'+this.props.systemName+':get-status.B3';
    const opActInPV='pva://'+this.props.systemName+':get-status.B4';
    const movingPV='pva://'+this.props.systemName+':get-status.B5';
    const inPV='pva://'+this.props.systemName+':get-status.B6';
    const outPV='pva://'+this.props.systemName+':get-status.B7';
    const statusPV='pva://'+this.props.systemName+':get-statusText';
    const commandPV='pva://'+this.props.systemName+':put-outIn';
    let pvs={};
    //    pvs['xrawScanPV']={initialized: false,pvname:xrawScanPV,value:"",char_value:""}
    //    pvs['yrawScanPV']={initialized: false,pvname:yrawScanPV,value:"",char_value:""}

    pvs['safetyOkPV']={initialized: false,pvname:safetyOkPV,value:"",char_value:""}
    pvs['safetyAlarmPV']={initialized: false,pvname:safetyAlarmPV,value:"",char_value:""}
    pvs['airPressurePV']={initialized: false,pvname:airPressurePV,value:"",char_value:""}
    pvs['opActInPV']={initialized: false,pvname:opActInPV,value:"",char_value:""}
    pvs['HvPV']={initialized: false,pvname:HvPV,value:"",char_value:""}
    pvs['movingPV']={initialized: false,pvname:movingPV,value:"",char_value:""}
    pvs['inPV']={initialized: false,pvname:inPV,value:"",char_value:""}
    pvs['outPV']={initialized: false,pvname:outPV,value:"",char_value:""}

    pvs['statusPV']={initialized: false,pvname:statusPV,value:"",char_value:""}
    pvs['commandPV']={initialized: false,pvname:commandPV,value:"",char_value:""}
    let contextPVs=[];
    for (let item in pvs){
      contextPVs.push(pvs[item]);
    }
    this.state={pvs,
      newCommandTrigger:0,contextPVs:contextPVs,openContextMenu: false,
      'open':false,x0:0,y0:0
    }
    this.handleOnClick= this.handleOnClick.bind(this);
    this.handleInputValue= this.handleInputValue.bind(this);
    this.handleInputValueLabel= this.handleInputValueLabel.bind(this);
    this.handleMetadata= this.handleMetadata.bind(this);
  }



  componentDidMount() {

// console.log( bbox.x ) ;
// console.log( bbox.y ) ;
// console.log( bbox.width ) ;
// console.log( bbox.height ) ;

  }


  componentWillUnmount() {

  }

  componentDidUpdate(prevProps,prevState) {



  }


  handleMetadata=name=>(metadata)=>{

    let pvs=this.state.pvs;
    pvs[name]['metadata']=metadata;
    this.setState({pvs	 :pvs});


  }

  handleInputValue = name=> (inputValue,pvname,initialized,severity)=>{
    //  console.log("test");
    //  console.log("value: ",inputValue);
    //      console.log("name:", name,"pvname",pvname);
    //      console.log("inputValue:", inputValue);
    //  console.log("initialized:", initialized);
    let pvs=this.state.pvs;

    pvs[name].value=inputValue;
    pvs[name].initialized=initialized;
    pvs[name].severity=severity;
    pvs[name].pvname=pvname;


    this.setState({pvs:pvs});


    //state.pvs[pvname].inputValue=inputValue;
    //pvData.pvs[pvname].initialized=initialized;
    //pvData.pvs[pvname].severity=severity;

    //console.log("pvData:",pvData)

    //this.setState(pvData);

  }
  /*
  handleInputValue(inputValue,pvname,initialized,severity){

  this.setState({'value'	 :inputValue,
  'pvname':pvname,
  'initialized':initialized,
  'severity':severity});

}
*/

handleInputValueLabel(inputValue){

  this.setState({['label']:inputValue});

}


handleOnClick =device=> (event) => {
  console.log("In FC: clicked "+device.toString());
  //this.props.handleOnClick(device);
  let pvs=this.state.pvs;
  if ((pvs['inPV'].value==1)){
    const status= pvs['statusPV'].value;
    if(status==='In') {
      pvs['commandPV'].value=0;
      //    pvs['xrawScanPV'].value=0;
      //    pvs['yrawScanPV'].value=0;
      this.setState({pvs:pvs,newCommandTrigger:this.state.newCommandTrigger+1,});
    }
    else{
      this.setState({
        open:true});
      }
      //    this.props.handleFCRemoved(this.props.systemName);
    }
    else {
      pvs['commandPV'].value=1;
      //    pvs['xrawScanPV'].value=0;
      //    pvs['yrawScanPV'].value=0;
      this.setState({pvs:pvs,newCommandTrigger:this.state.newCommandTrigger+1,});
    }

  };


  handleYes = () => {
    let pvs=this.state.pvs;
    pvs['commandPV'].value=1;
    //  pvs['xrawScanPV'].value=9;
    //  pvs['yrawScanPV'].value=9;

    this.setState({ pvs:pvs,newCommandTrigger:this.state.newCommandTrigger+1,
      open:false});
      //  this.props.handleFCInserted(this.props.systemName);

    };

    handleOk = () => {

      this.setState({
        open:false});


      };


      handleNo = () => {
        let pvs=this.state.pvs;
        //pvs['commandPV'].value=0;
        this.setState({
          //pvs:pvs,
          //newCommandTrigger:this.state.newCommandTrigger+1,
          open:false});


        };

        handleContextMenuClose = event => {


          this.setState({ openContextMenu: false });
        };

        handleToggleContextMenu = (event) => {
          //   console.log(event.type)
          event.persist()
          this.setState(state => ({ openContextMenu: !state.openContextMenu,x0:event.pageX,y0:event.pageY }));

          event.preventDefault();
        }
        render() {
          const pvs=this.state.pvs;
          const {classes}= this.props;

          const severity=this.state.severity;

          const initialized=((pvs['commandPV'].initialized)&&(pvs['statusPV'].initialized)&&(pvs['safetyAlarmPV'].initialized)&&(pvs['safetyOkPV'].initialized)&&(pvs['airPressurePV'].initialized)&&(pvs['opActInPV'].initialized)&&pvs['movingPV'].initialized&&(pvs['HvPV'].initialized)&&(pvs['inPV'].initialized)&&(pvs['outPV'].initialized));






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



          let yoffset=0;
          let fcFault=false;
          let fcFaultString=""
          let alarmColor='#133C99';
          if (pvs['inPV'].value==1){
            yoffset=0;
          }

          if (pvs['outPV'].value==1){
            yoffset=-30;
          }

          if (pvs['movingPV'].value==1){
            alarmColor='#f9e500';

          }




          if (pvs['airPressurePV'].value==1){
            alarmColor='#FF8E53';
            fcFault=true;
            fcFaultString+=" [Air pressure]"
          }
          if (pvs['HvPV'].value==1){
            alarmColor='#FF8E53';
            fcFault=true;
            fcFaultString+=" [HV Bias]"
          }

          if (pvs['safetyAlarmPV'].value==1){
            alarmColor='#E20101';
            fcFault=true;
            fcFaultString+=" [Safety Alarm]"

          }
          if (pvs['safetyOkPV'].value==1){
            alarmColor='#E20101';
            fcFault=true;
            fcFaultString+=" [Safety Ok]"

          }
          if(fcFaultString.length>0){
            fcFaultString="Faults: " + fcFaultString;
          }


    //      let svgElement = document.getElementById('harpsTop');
 //let bbox = svgElement.getBBox();

 //console.log( bbox.x ) ;
 //console.log( bbox.y ) ;
 //console.log( bbox.width ) ;
 //console.log( bbox.height ) ;


          return (
            <g>
              <ContextMenu
                disableProbe={this.props.disableProbe}
                open={this.state.openContextMenu}
                anchorReference="anchorPosition"
                anchorPosition={{ top: +this.state.y0, left: +this.state.x0 }}
                probeType={'simple'}
                pvs={this.state.contextPVs}
                handleClose={this.handleContextMenuClose}

                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              />
              <Dialog
                open={this.state.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                aria-labelledby={"alert-dialog-slide-title"+this.props.systemName}
                aria-describedby={"alert-dialog-slide-description"+this.props.systemName}
              >
                <DialogTitle id={"alert-dialog-slide-title"+this.props.systemName}>
                  "Error!"
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id={"alert-dialog-slide-description"+this.props.systemName}>
                    Faraday cup {this.props.systemName} is interlocked! {fcFaultString}

                  </DialogContentText>
                </DialogContent>
                <DialogActions>

                  <Button onClick={this.handleOk} color="primary">
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>

              <Tooltip disableHoverListener={!fcFault} title={fcFaultString}>
                <g  onClick={this.handleOnClick(this.props.systemName)}  onContextMenu={this.handleToggleContextMenu}>

                <DataConnection
                  pv={this.state.pvs['commandPV'].pvname}


                  newValueTrigger={this.state.newCommandTrigger}
                  handleInputValue={this.handleInputValue('commandPV')}
                  handleMetadata={this.handleMetadata('commandPV')}
                  outputValue=  {this.state.pvs['commandPV'].value}

                />
                <DataConnection pv={this.state.pvs['statusPV'].pvname} handleInputValue={this.handleInputValue('statusPV')} handleMetadata={this.handleMetadata('statusPV')} />
                <DataConnection pv={this.state.pvs['safetyOkPV'].pvname} handleInputValue={this.handleInputValue('safetyOkPV')} handleMetadata={this.handleMetadata('safetyOkPV')}/>
                  <DataConnection pv={this.state.pvs['safetyAlarmPV'].pvname} handleInputValue={this.handleInputValue('safetyAlarmPV')} handleMetadata={this.handleMetadata('safetyAlarmPV')}/>
                  <DataConnection pv={this.state.pvs['airPressurePV'].pvname} handleInputValue={this.handleInputValue('airPressurePV')} handleMetadata={this.handleMetadata('airPressurePV')}/>
                  <DataConnection pv={this.state.pvs['opActInPV'].pvname} handleInputValue={this.handleInputValue('opActInPV')} handleMetadata={this.handleMetadata('opActInPV')}/>
                  <DataConnection pv={this.state.pvs['HvPV'].pvname} handleInputValue={this.handleInputValue('HvPV')} handleMetadata={this.handleMetadata('HvPV')}/>
                  <DataConnection pv={this.state.pvs['movingPV'].pvname} handleInputValue={this.handleInputValue('movingPV')} useStringValue={false} handleMetadata={this.handleMetadata('movingPV')}/>
                  <DataConnection pv={this.state.pvs['inPV'].pvname} handleInputValue={this.handleInputValue('inPV')} handleMetadata={this.handleMetadata('inPV')} />
                  <DataConnection pv={this.state.pvs['outPV'].pvname} handleInputValue={this.handleInputValue('outPV')} handleMetadata={this.handleMetadata('outPV')} />



                  {initialized===true &&
                    <g>
                      <linearGradient id={this.props.systemName+'FC-gradient'} gradientTransform="rotate(0)">
                        <stop offset="0%" stopColor={'silver'} />
                        <stop offset="65%" stopColor={alarmColor} />
                      </linearGradient>
                      <defs>
                        <filter id={this.props.systemName+"FCShadow"} x="0" y="0" width="600%" height="500%">
                          <feOffset result="offOut" in="SourceGraphic" dx="2.5" dy="2.5" />
                          <feColorMatrix result="matrixOut" in="offOut" type="matrix"
                          values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
                          <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2.5" />
                          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                        </filter>
                      </defs>

                      <g
                        fill={this.props.componentGradient===true?'url(#'+this.props.systemName+'FC-gradient)':alarmColor}
                        filter={this.props.componentShadow===true?"url(#"+this.props.systemName+"FCShadow)":"" }
                        transform={'translate('+this.props.cx+','+this.props.cy+')'}
                      >
                        {yoffset!==0&&  <g transform={'translate(0,-1140)'}>
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

                        {yoffset===0&&  <g transform={'translate(0,-1102.5)'}>
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
                        {this.props.label}
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
                      <linearGradient id={this.props.systemName+'FC-gradient'} gradientTransform="rotate(0)">
                        <stop offset="0%" stopColor='silver' />
                        <stop offset="65%" stopColor={'grey'} />
                      </linearGradient>
                      <defs>
                        <filter id={this.props.systemName+"FCShadow"} x="0" y="0" width="600%" height="500%">
                          <feOffset result="offOut" in="SourceGraphic" dx="7.5" dy="7.5" />
                          <feColorMatrix result="matrixOut" in="offOut" type="matrix"
                          values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
                          <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="5" />
                          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                        </filter>
                      </defs>

                      <g
                        fill={this.props.componentGradient===true?'url(#'+this.props.systemName+'FC-gradient)':'grey'}
                        filter={this.props.componentShadow===true?"url(#"+this.props.systemName+"FCShadow)":"" }
                        transform={'translate('+this.props.cx+','+this.props.cy+')'}
                      >

                        <g transform={'translate(0,-1102.5)'}>
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
                      <text className={classes.textFCOff}
                        x={typeof this.props.labelOffsetX!=='undefined'?this.props.labelOffsetX+this.props.cx+12:this.props.cx+12}
                        y={typeof this.props.labelOffsetY!=='undefined'?this.props.labelOffsetY+this.props.cy+yoffset-40:+this.props.cy+yoffset-40}
                        textAnchor='middle'
                        filter={this.props.textShadow===true?"url(#"+this.state.pvname+"FCShadow)":""
                        }

                      >
                        {this.props.label}
                      </text>
                    </g>
                  }
                </g>
              </Tooltip>
            </g>



                );
              }
            }

            FC.contextType=AutomationStudioContext;
            export default withStyles(styles)( FC)
