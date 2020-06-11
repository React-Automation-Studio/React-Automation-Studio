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
import { withStyles } from '@material-ui/core/styles';
import ContextMenu from '../SystemComponents/ContextMenu';
import Tooltip from '@material-ui/core/Tooltip';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({


  textHarp: {
    fill:theme.palette.text.primary

  },
  textHarpOff: {
    fill:'grey'

  }

});
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
class Harp extends React.Component {
  constructor(props) {
    super(props);
    let xrawScanPV;
    if(typeof this.props.onlyY==='undefined'){
      xrawScanPV='pva://'+this.props.systemName+':xraw.SCAN';
    }
    else{
      xrawScanPV='pva://'+this.props.systemName+':yraw.SCAN';
    }
    let yrawScanPV;
    if(typeof this.props.onlyX==='undefined'){
      yrawScanPV='pva://'+this.props.systemName+':yraw.SCAN';
    }
    else{
      yrawScanPV='pva://'+this.props.systemName+':xraw.SCAN';
    }
    let actuatorName;
    if (typeof this.props.actuatorName==='undefined'){
      actuatorName=this.props.systemName;

    }
    else{
      actuatorName=this.props.actuatorName;
    }

    //console.log(actuatorName)
    const statusPV='pva://'+actuatorName+':get-statusText';
    const commandPV='pva://'+actuatorName+':put-outIn';
    const safetyOkPV='pva://'+actuatorName+':get-status.B1';
    const safetyAlarmPV='pva://'+actuatorName+':get-status.B0';
    const airPressurePV='pva://'+actuatorName+':get-status.B2';
    const HvPV='pva://'+actuatorName+':get-status.B3';
    const opActInPV='pva://'+actuatorName+':get-status.B4';
    const movingPV='pva://'+actuatorName+':get-status.B5';
    const inPV='pva://'+actuatorName+':get-status.B6';
    const outPV='pva://'+actuatorName+':get-status.B7';
    let pvs={};
    pvs['xrawScanPV']={initialized: false,pvname:xrawScanPV,value:"",char_value:""}
    pvs['yrawScanPV']={initialized: false,pvname:yrawScanPV,value:"",char_value:""}
    pvs['statusPV']={initialized: false,pvname:statusPV,value:"",char_value:""}
    pvs['commandPV']={initialized: false,pvname:commandPV,value:"",char_value:""}

    pvs['safetyOkPV']={initialized: false,pvname:safetyOkPV,value:"",char_value:""}
    pvs['safetyAlarmPV']={initialized: false,pvname:safetyAlarmPV,value:"",char_value:""}
    pvs['airPressurePV']={initialized: false,pvname:airPressurePV,value:"",char_value:""}
    pvs['opActInPV']={initialized: false,pvname:opActInPV,value:"",char_value:""}
    pvs['HvPV']={initialized: false,pvname:HvPV,value:"",char_value:""}
    pvs['movingPV']={initialized: false,pvname:movingPV,value:"",char_value:""}
    pvs['inPV']={initialized: false,pvname:inPV,value:"",char_value:""}
    pvs['outPV']={initialized: false,pvname:outPV,value:"",char_value:""}
    let contextPVs=[];
    for (let item in pvs){
      contextPVs.push(pvs[item]);
    }
    this.state={pvs,newCommandTrigger:0,
      'open':false,
      openContextMenu: false,
      contextPVs:contextPVs,
      x0:0,y0:0
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

  componentDidUpdate(prevProps,prevState) {



  }



  handleMetadata=name=>(metadata)=>{

    let pvs=this.state.pvs;
    pvs[name].metadata=metadata;
    this.setState({pvs	 :pvs});


  }

  handleInputValue = name=> (inputValue,pvname,initialized,severity)=>{
    //  console.log("test");
    //  console.log("value: ",inputValue);
    //  console.log("pvname:", pvname);
    //  console.log("inputValue:", inputValue);
    //  console.log("initialized:", initialized);

    let pvs=this.state.pvs;
    if(name=='inPV'){
      if(initialized==true)
      { if (inputValue==1){
        this.props.handleHarpInsertedOrRemoved(true,this.props.systemName);
      }
      else{
        this.props.handleHarpInsertedOrRemoved(false,this.props.systemName);
      }
      //console.log(this.state.pvs['statusPV'].pvname+" has initialized")
    }
  }
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

  this.setState({label:inputValue});

}

handleContextMenuClose = event => {


  this.setState({ openContextMenu: false });
};

handleToggleContextMenu = (event) => {
  //   console.log(event.type)

  event.persist()
  this.setState(state => ({ openContextMenu: !state.openContextMenu,x0:event.pageX,y0:event.pageY }));

  event.preventDefault();
}


handleOnClick =device=> (event) => {
  //  console.log("In Harp: clicked "+device.toString());
  //this.props.handleOnClick(device);
  let pvs=this.state.pvs;
  if((pvs['commandPV'].metadata['write_access']===true)){
  if (pvs['inPV'].value==1){
    pvs['commandPV'].value=0;
    pvs['xrawScanPV'].value=0;
    pvs['yrawScanPV'].value=0;
    this.setState({pvs:pvs,
      newCommandTrigger:this.state.newCommandTrigger+1,
      open:false});
      this.props.handleHarpInsertedOrRemoved(false,this.props.systemName);
    }
    else {
      this.setState({ open:true});
    }
  }
  };


  handleYes = () => {
    let pvs=this.state.pvs;
    pvs['commandPV'].value=1;
    pvs['xrawScanPV'].value=9;
    pvs['yrawScanPV'].value=9;

    this.setState({ pvs:pvs,
      newCommandTrigger:this.state.newCommandTrigger+1,
      open:false});
      this.props.handleHarpInsertedOrRemoved(true,this.props.systemName);

    };

    handleOk = () => {

      this.setState({
        open:false});


      };


      handleNo = () => {
        let pvs=this.state.pvs;
        //pvs['commandPV'].value=0;
        //pvs['xrawScanPV'].value=0;
        //pvs['yrawScanPV'].value=0;
        this.setState({
          //pvs:pvs,
        //  newCommandTrigger:this.state.newCommandTrigger+1,
          open:false});


        };
        render() {
          const pvs=this.state.pvs;
          //  console.log("pvs['xrawScanPV'].pvname",pvs['xrawScanPV'].pvname)
          //  console.log("pvs['xrawScanPV'].initialized",pvs['xrawScanPV'].initialized)
          //  console.log("pvs['xrawScanPV'].value",pvs['xrawScanPV'].value)

          //  console.log("pvs['yrawScanPV'].pvname",pvs['yrawScanPV'].pvname)
          //  console.log("pvs['yrawScanPV'].initialized",pvs['yrawScanPV'].initialized)
          //  console.log("pvs['yrawScanPV'].value",pvs['yrawScanPV'].value)

          //  console.log("pvs['commandPV'].pvname",pvs['commandPV'].pvname)
          //  console.log("pvs['commandPV'].initialized",pvs['commandPV'].initialized)
          //  console.log("pvs['commandPV'].value",pvs['commandPV'].value)
          const {classes}= this.props;

          const severity=this.state.severity;

          const initialized=(pvs['commandPV'].initialized)&&(pvs['statusPV'].initialized)&&(pvs['xrawScanPV'].initialized)
          &&(pvs['yrawScanPV'].initialized)&&(pvs['safetyAlarmPV'].initialized)&&(pvs['safetyOkPV'].initialized)
          &&(pvs['airPressurePV'].initialized)&&(pvs['opActInPV'].initialized)&&pvs['movingPV'].initialized
          &&(pvs['HvPV'].initialized)&&(pvs['inPV'].initialized)&&(pvs['outPV'].initialized);




          let yoffset=0;
          let harpFault=false;
          let harpFaultString=""
          let alarmColor='#133C99';
          //      console.log("pvs['statusPV'].value",pvs['statusPV'].value)
          //      console.log("pvs['movingPV'].value",pvs['movingPV'].value)
          //      console.log("pvs['inPV'].value",pvs['inPV'].value)
          //      console.log("pvs['outPV'].value",pvs['outPV'].value)
          //        console.log("pvs['safetyAlarmPV'].value",pvs['safetyAlarmPV'].value)
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
            harpFault=true;
            harpFaultString+=" [Air pressure]"
          }
          if (pvs['HvPV'].value==1){
            alarmColor='#FF8E53';
            harpFault=true;
            harpFaultString+=" [HV Bias]"
          }

          if (pvs['safetyAlarmPV'].value==1){
            alarmColor='#E20101';
            harpFault=true;
            harpFaultString+=" [Safety Alarm]"

          }
          if (pvs['safetyOkPV'].value==1){
            alarmColor='#E20101';
            harpFault=true;
            harpFaultString+=" [Safety Ok]"

          }
          if(harpFaultString.length>0){
            harpFaultString="Faults: " + harpFaultString;
          }




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
              {(this.props.maxHarpsReached===false) && <Dialog
                open={this.state.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                                                       >
                <DialogTitle id="alert-dialog-slide-title">
                  {"Warning!"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Are you sure you want to insert the harp?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleNo} color="primary">
                    No
                  </Button>
                  <Button onClick={this.handleYes} color="primary">
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
              }

              {(this.props.maxHarpsReached===true) && <Dialog
                open={this.state.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                                                      >
                <DialogTitle id="alert-dialog-slide-title">
                  {"Maximum number of inserted harps reached!"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Please remove a harp from the beam line.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>

                  <Button onClick={this.handleOk} color="primary">
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>
              }
              <Tooltip disableHoverListener={!harpFault} title={harpFaultString}>
                <g  onClick={this.handleOnClick(this.props.systemName)}   onContextMenu={this.handleToggleContextMenu}

                >
                  <DataConnection
                    pv={this.state.pvs['commandPV'].pvname}


                    newValueTrigger={this.state.newCommandTrigger}
                    handleInputValue={this.handleInputValue('commandPV')}
                    handleMetadata={this.handleMetadata('commandPV')}
                    outputValue=  {this.state.pvs['commandPV'].value}

                  />
                  <DataConnection pv={this.state.pvs['statusPV'].pvname} handleInputValue={this.handleInputValue('statusPV')} handleMetadata={this.handleMetadata('statusPV')} />
                  <DataConnection pv={this.state.pvs['xrawScanPV'].pvname} handleInputValue={this.handleInputValue('xrawScanPV')} outputValue=  {this.state.pvs['xrawScanPV'].value} handleMetadata={this.handleMetadata('xrawScanPV')} />
                  <DataConnection pv={this.state.pvs['yrawScanPV'].pvname} handleInputValue={this.handleInputValue('yrawScanPV')} outputValue=  {this.state.pvs['yrawScanPV'].value} handleMetadata={this.handleMetadata('yrawScanPV')}/>
                  <DataConnection pv={this.state.pvs['safetyOkPV'].pvname} handleInputValue={this.handleInputValue('safetyOkPV')} handleMetadata={this.handleMetadata('safetyOkPV')}/>
                  <DataConnection pv={this.state.pvs['safetyAlarmPV'].pvname} handleInputValue={this.handleInputValue('safetyAlarmPV')} handleMetadata={this.handleMetadata('safetyAlarmPV')}/>
                  <DataConnection pv={this.state.pvs['airPressurePV'].pvname} handleInputValue={this.handleInputValue('airPressurePV')} handleMetadata={this.handleMetadata('airPressurePV')}/>
                  <DataConnection pv={this.state.pvs['opActInPV'].pvname} handleInputValue={this.handleInputValue('opActInPV')} handleMetadata={this.handleMetadata('opActInPV')}/>
                  <DataConnection pv={this.state.pvs['HvPV'].pvname} handleInputValue={this.handleInputValue('HvPV')} handleMetadata={this.handleMetadata('HvPV')}/>
                  <DataConnection pv={this.state.pvs['movingPV'].pvname} handleInputValue={this.handleInputValue('movingPV')} useStringValue={false} handleMetadata={this.handleMetadata('movingPV')}/>
                  <DataConnection pv={this.state.pvs['inPV'].pvname} handleInputValue={this.handleInputValue('inPV')} handleMetadata={this.handleMetadata('inPV')} />
                  <DataConnection pv={this.state.pvs['outPV'].pvname} handleInputValue={this.handleInputValue('outPV')} handleMetadata={this.handleMetadata('outPV')} />

                  {/*  { this.props.usePvLabel===true && <DataConnection

                    pv={pv.toString()+".DESC"}
                    macros={macros}
                    handleInputValue={this.handleInputValueLabel}

                    />    }
                  */}
                  {initialized===true &&

                    <g>




                      <linearGradient id={this.props.systemName+'Harp-gradient'} gradientTransform="rotate(0)">
                        <stop offset="0%" stopColor='grey' />
                        <stop offset="100%" stopColor={alarmColor} />
                      </linearGradient>
                      <defs>
                        <filter id={this.props.systemName+"HarpShadow"} x="0" y="0" width="600%" height="500%">
                          <feOffset result="offOut" in="SourceGraphic" dx="2" dy="2" />
                          <feColorMatrix result="matrixOut" in="offOut" type="matrix"
                          values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
                          <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="1" />
                          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                        </filter>
                      </defs>
                      <g transform={'translate('+this.props.cx+','+this.props.cy+')'}


                      >
                        {yoffset!==0&&
                          <g  transform='scale (0.3996 1.25)'>
                            <rect width='36' height='36' fill={alarmColor} x={-18} y={ +yoffset-17.5} transform='rotate(15,0,0) ' fillOpacity="0"/>
                            <g
                              fill={this.props.componentGradient===true?'url(#'+this.props.systemName+'Harp-gradient)':alarmColor}
                              filter={this.props.componentShadow===true?"url(#"+this.props.systemName+"HarpShadow)":"" }
                              transform='rotate(15,0,0) '
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
                          </g>
                        }
                        {yoffset===0&&
                          <g  transform='scale (0.3996 1.25)'>
                            <rect width='36' height='36' fill={alarmColor} x={-18} y={ +yoffset-17.5} transform='rotate(15,0,0) ' fillOpacity="0"/>
                            <g
                              fill={this.props.componentGradient===true?'url(#'+this.props.systemName+'Harp-gradient)':alarmColor}
                              filter={this.props.componentShadow===true?"url(#"+this.props.systemName+"HarpShadow)":"" }
                              transform='rotate(15,0,0) '
                            >
                              <rect width="3" height="12" x={-9}  y={ +yoffset+6.5} />"
                              <rect width="3" height="14" x={-3}  y={ +yoffset+4.5} />"
                              <rect width="3" height="16" x={+3}  y={ +yoffset+2.5} />"
                              <rect width="3" height="16" x={-9}  y={ +yoffset-17.5} />"
                              <rect width="3" height="14" x={-3}  y={ +yoffset-17.5} />"
                              <rect width="3" height="16" x={+3}  y={ +yoffset-17.5} />"
                              <rect width="3" height="36" x={9}   y={ +yoffset-17.5} />"
                              <rect width="36" height="3" x={-18}  y={ +yoffset+9} />"
                              <rect width="36" height="3" x={-18}  y={ +yoffset-9} />"
                              <rect width="18" height="3" x={0}  y={ +yoffset-3} />"
                              <rect width="18" height="3" x={0}  y={ +yoffset+3} />"
                            </g>
                          </g>
                        }

                        <text className={classes.textHarp}
                          x={0}
                          y={+yoffset-40}
                          textAnchor='middle'
                          filter={this.props.textShadow===true?"url(#"+this.props.systemName+"HarpShadow)":"" }
                        >
                          {this.props.usePvLabel===true? this.state.label:this.props.label}
                        </text>
                      </g>
                    </g>
                  }
                  {(initialized===false||initialized==='undefined') &&
                    <g transform={'translate('+this.props.cx+','+this.props.cy+')'}>
                      <linearGradient id={this.props.systemName+'Harp-gradient'} gradientTransform="rotate(0)">
                        <stop offset="0%" stopOpacity="0" />
                        <stop offset="90%" stopColor={'grey'} />
                      </linearGradient>
                      <g  transform='scale (0.3996 1.25)'>
                        <rect width='36' height='36' fill={alarmColor} x={-18} y={ +yoffset-17.5} transform='rotate(15,0,0) ' fillOpacity="0"/>
                        <g
                          fill={'grey'}
                          filter={this.props.componentShadow===true?"url(#"+this.props.systemName+"HarpShadow)":"" }
                          transform='rotate(15,0,0) '
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
                      </g>

                      <text className={classes.textHarpOff}
                        x={0}
                        y={+yoffset-40}
                        textAnchor='middle'
                        filter={this.props.textShadow===true?"url(#"+this.props.systemName+"HarpShadow)":"" }
                      >
                        {this.props.usePvLabel===true? this.state.label:this.props.label}
                      </text>
                    </g>
                  }
                </g>
              </Tooltip>
              </g>



                        );
                      }
                    }

                    Harp.contextType=AutomationStudioContext;
                    export default withStyles(styles)( Harp)
