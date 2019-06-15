import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import EpicsBinaryOutDebug from '../../GroupedComponents/EpicsBinaryOutDebug';
import EpicsAnalogOutDebug from '../../GroupedComponents/EpicsAnalogOutDebug';
import EpicsMbboDebug from '../../GroupedComponents/EpicsMbboDebug';
import TextUpdate from '../../BaseComponents/TextUpdate';
import TextInput from '../../BaseComponents/TextInput';
import TextOutput from '../../BaseComponents/TextOutput';
import Meter from '../../BaseComponents/Gauge';
import SimpleSlider from '../../BaseComponents/SimpleSlider';
import GraphMultiplePVs from '../../BaseComponents/GraphMultiplePVs';
import SelectionList from '../../BaseComponents/SelectionList';
import ThumbWheel from '../../BaseComponents/ThumbWheel';


import DataConnection from '../../SystemComponents/DataConnection';

import SwitchComponent from '../../BaseComponents/SwitchComponent';
import SelectionInput from '../../BaseComponents/SelectionInput';
import ToggleButton from '../../BaseComponents/ToggleButton';
import ActionButton from '../../BaseComponents/ActionButton';
import ArrowButton from '../../BaseComponents/ArrowButton';
import ControlRightEx1 from '../../ControlScreens/GridComponents/ControlRightEx1'
import ControlTopEx1 from '../../ControlScreens/GridComponents/ControlTopEx1'
import ControlBottomEx1 from '../../ControlScreens/GridComponents/ControlBottomEx1'
import Card from '@material-ui/core/Card';
import SideBar from '../../SystemComponents/SideBar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';

import SupervisorAccount from '@material-ui/icons/SupervisorAccountOutlined';
import AccountCircle from '@material-ui/icons/AccountCircleOutlined';
import Settings from '@material-ui/icons/SettingsOutlined';

import Divider from '@material-ui/core/Divider';



import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import withWidth from '@material-ui/core/withWidth';

import {Link} from 'react-router-dom'
import StyledIconIndicator from '../../BaseComponents/StyledIconIndicator';
import Home from '@material-ui/icons/Home';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 0, flexGrow:1 }}>
      {props.children}
    </Typography>
  );
}

const styles = theme => ({
  body1: theme.typography.body1,
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    //width:'100%',
    overflowX: "hidden",
    overflowY: "hidden",
    marginTop:40,
    marginBottom:100,

  },
  paper: {
    padding: theme.spacing(1) * 0,
    margin: theme.spacing(1) * 0,
    height: '100%',
    color: theme.palette.text.secondary,
  },
  control: {
    padding: theme.spacing(1) * 2,
  },
});

class JustinTest2 extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      value: 0,
      stateValue:0,
      left: false,
      FSEnable:0,
      softLim:0,
      macros:{},
      systems: [
        {name:'IPA Tune Motor',           device:'RFPA:IPA_TUNE_MOT',           motor:'RFPA:16',  pot:'RFPA:14'},
        {name:'DVR Tune Inductor',  device:'RFPA:DVR_TUNE_INDUCTOR_MOT',  motor:'RFPA:17',  pot:'RFPA:14'},
        {name:'DVR Tune Capacitor', device:'RFPA:DVR_TUNE_CAPACITOR_MOT', motor:'RFPA:18',  pot:'RFPA:14'},
        {name:'PA Tune Capacitor',  device:'RFPA:PA_TUNE_CAPACITOR_MOT',  motor:'RFPA:19',  pot:'RFPA:14'},
        {name:'PA Tune Plunger 1',  device:'RFPA:PA_TUNE_PLUNGER1_MOT',   motor:'RFPA:20',  pot:'RFPA:14'},
        {name:'PA Tune Plunger 2',  device:'RFPA:PA_TUNE_PLUNGER2_MOT',   motor:'RFPA:22',  pot:'RFPA:15'},
        {name:'PA Tune Plunger 3',  device:'RFPA:PA_TUNE_PLUNGER3_MOT',   motor:'RFPA:23',  pot:'RFPA:15'},
        {name:'LOAD Capacitor',     device:'RFPA:LOAD_CAPACITOR_MOT',     motor:'RFPA:24',  pot:'RFPA:15'},
        {name:'LOAD Inductor',      device:'RFPA:LOAD_INDUCTOR_MOT',      motor:'RFPA:25',  pot:'RFPA:15'}
      ],
      selectedSystem:0,
      showAdvancedSettings:0,
    };
    this.handleStateChange= this.handleStateChange.bind(this);
    this.handleFSEnableChange= this.handleFSEnableChange.bind(this);
    this.handleSoftLimitChange= this.handleSoftLimitChange.bind(this);

  }


  handleChange = (event, value) => {
    this.setState({ value });
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handleStateChange(stateValue){
    // console.log(stateValue)
    this.setState({ stateValue })
  };

  handleFSEnableChange(FSEnable){
    // console.log(stateValue)
    this.setState({ FSEnable })
  };

  handleSoftLimitChange(softLim){
    // console.log(stateValue)
    this.setState({ softLim })
  };

  handleNewMotor = (index) => () => {
    const newMacro = {'$(device)':this.state.systems[index].device,'$(motor)':this.state.systems[index].motor,'$(pot)':this.state.systems[index].pot};
    this.setState({ macros: newMacro });
    this.setState({ selectedSystem: index});
  };

  logout(){
    localStorage.removeItem('jwt');

  }
  render() {
    const { width } = this.props;
    //console.log('width',width)

    const { classes } = this.props;
    // console.log('classes justin test1',classes)
    const { value } = this.state;
    const { stateValue } = this.state;
    const { FSEnable } = this.state;
    const { softLim } = this.state;
    const { alignItems, direction, justify } = this.state;

    const {systems} = this.state;
    if(Object.keys(this.state.macros).length<1){
      this.state.macros={'$(device)':systems[0].device,'$(motor)':systems[0].motor,'$(pot)':systems[0].pot};
    }
    const {macros} = this.state;
    const {selectedSystem} = this.state;

    //console.log(softLim);

    const sideList = (
      <div className={classes.list}>
        <List>
        <ListItem button key={"Home"} component={Link} to="/" >
          <ListItemIcon><Home/></ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
        </List>
        <Divider />
        <List>
          {systems.map((objectMapped, index) => (
            <ListItem button key={objectMapped.name} onClick={this.handleNewMotor(index)}>
              <ListItemIcon><ExploreIcon /></ListItemIcon>
              <ListItemText primary={objectMapped.name} />
            </ListItem>
          ))}
        </List>
        {process.env.REACT_APP_EnableLogin==='true'&&<React.Fragment>
      <Divider />
      <ListItem button key={"Log Out"} onClick={this.logout} component={Link} to="/LogIn" >
        <ListItemIcon><AccountCircle/></ListItemIcon>
        <ListItemText primary={"Log Out"} />
      </ListItem>
      </React.Fragment>}

      </div>
    );
    let graphVH;
    let ThumbWheelVH;
    let ThumbWheelSize;

    if(width=='xs'){
      graphVH='25vh';
    }else if(width=='sm'){
      graphVH='50vh'
    }else{
      graphVH='50vh'
    }

    if(window.innerHeight>=1024){

      ThumbWheelVH='15vh';
    }else if(window.innerHeight>=768){
      ThumbWheelVH='12vh';
    }
    else {
      ThumbWheelVH='13vh';
    }


    //console.log('window.innerHeight',window.innerHeight)
    return (

      <React.Fragment>
        <AppBar style={{position:'fixed',bottom:'auto',top:'0'}} color='inherit' >
          <Grid container direction="row" item justify="center" spacing={2} alignItems="center">
            <Grid item xs={2}  >
              <IconButton className={classes.menuButton} onClick={this.toggleDrawer('left', true)}  aria-label="Menu">
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs={10} >
              <div className={classes.body1}>{systems[selectedSystem].name}</div>
            </Grid>
          </Grid>
        </AppBar>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
            >
              {sideList}
            </div>
          </Drawer>
          {value === 0 && <TabContainer key={'tabContainer0'+macros['$(device)']}>
            <Grid   container className={classes.root}>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={2}
                  alignItems={'stretch'}
                  direction={'column'}
                  justify={'flex-start'}
                  >


                    <Grid item >
                      <div style={{ height: graphVH, width:'96vw',}}>
                        <GraphMultiplePVs
                          pvs={['pva://$(device):display_ENG'  ]}
                          macros={macros}
                          maxLength={256}
                          lineColor={[this.props.theme.palette.secondary.main]}
                            useTimeStamp={true}
                        />
                      </div>
                    </Grid>
                    <Grid item >
                      <Grid container direction="row" item justify="center" spacing={2} alignItems="stretch">
                        <Grid item xs={6}  >
                          <TextInput   pv='pva://$(device):CL_setpoint_dist'  macros={macros}  label={'Setpoint'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={0}/>
                        </Grid>
                        <Grid item  xs={6}>
                          <TextOutput   pv='pva://$(device):display_ENG' macros={macros}  label={'Readback'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={0}/>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container direction="row" item justify="space-evenly" spacing={2} alignItems="stretch">
                        <Grid item xs={4} sm={4} >

                          <TextOutput   pv='pva://$(motor):STMVELOCITY:VELOCITY' macros={macros}  label={'Velocity'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={0}/>

                        </Grid>

                        <Grid item xs={4} sm={4}  >
                          <Grid container direction="column" item justify="space-evenly" spacing={2} alignItems="stretch">
                            <Grid item>
                              <StyledIconIndicator  pv='pva://$(device):upMoveDisable' macros={macros} label={'Upper Limit'} labelPlacement={'end'} onColor='secondary' offColor='default'/>
                            </Grid>
                            <Grid item>
                              <StyledIconIndicator  pv='pva://$(device):lowMoveDisable' macros={macros} label={'Lower Limit'} labelPlacement={'end'} onColor='secondary' offColor='default'/>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={4} sm={4}  >
                          <ToggleButton  pv='pva://$(device):driveEnable' macros={macros} custom_selection_strings={["DRIVE OFF","DRIVE ON"]}  />
                        </Grid>
                      </Grid>
                    </Grid>


                    <Grid item>
                      <Grid container direction="row" item justify="center" spacing={0} alignItems="stretch">
                        <Grid item xs={12}  >

                          <React.Fragment>
                            <DataConnection
                              pv='pva://$(device):snlState'
                              macros={macros}
                              useStringValue={false}
                              handleInputValue={this.handleStateChange}
                            />
                          </React.Fragment>
                          <SelectionList  horizontal pv='pva://$(device):snlState' macros={macros}   usePvLabel={true} useStringValue={true} />

                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      {stateValue == 0&&
                        <Grid container direction="row" item xs={12} spacing={2}>
                          <Grid item xs={12} >
                          </Grid>
                        </Grid>}
                        {stateValue == 1&&
                          <Grid container direction="row" item xs={12} >
                            <Grid item xs={12}>
                              <div style={{textAlign:'center',marginTop:'16px',}}>
                                <ThumbWheel pv={'pva://$(device):CL_setpoint_dist'} macros={macros} prec_integer={4} prec_decimal={0} buttonSize='medium'/>
                              </div>
                            </Grid>
                          </Grid>}
                          {stateValue == 2&&
                            <div style={{marginTop:'16px'}}>
                              <Grid container direction="row" item xs={12} spacing={2}>
                                <Grid item xs={12}  >
                                  <Grid container direction="row" justify="center" alignItems="center" spacing={5} style={{paddingLeft:16,paddingRight:16}}>
                                    <Grid item xs={3} >
                                      <ToggleButton pv='pva://$(device):jog_fb' macros={macros} momentary={true} custom_selection_strings={["--","--"]} />
                                    </Grid>
                                    <Grid item xs={3}>
                                      <ToggleButton pv='pva://$(device):jog_sb' macros={macros}  momentary={true} custom_selection_strings={["-","-"]} />
                                    </Grid>
                                    <Grid item xs={3}>
                                      <ToggleButton pv='pva://$(device):jog_sf' macros={macros}  momentary={true} custom_selection_strings={["+","+"]} />
                                    </Grid>
                                    <Grid item xs={3}>
                                      <ToggleButton pv='pva://$(device):jog_ff' macros={macros}  momentary={true} custom_selection_strings={["++","++"]} />
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </div>}
                          </Grid>
                        </Grid>
                      </Grid>

                    </Grid>
                  </TabContainer>}
                  {value === 1 && <TabContainer key={'tabContainer1'+macros['$(device)']}>
                    <Grid   container className={classes.root}>
                      <Grid item xs={12}>
                        <Grid container spacing={2} alignItems={'stretch'} direction={'column'} justify={'flex-start'}>
                          <Grid item >
                            <div style={{marginBottom:8}}>APPROACH DIRECTION</div>
                            <Grid container spacing={2} alignItems={'stretch'} direction={'row'} justify={'space-evenly'}>
                              <Grid item xs={6}>
                                <SelectionList  horizontal pv='pva://$(device):CL_approach_dir' macros={macros}   usePvLabel={true} useStringValue={true} />
                              </Grid>
                              <Grid item xs={6}>
                                <TextInput   pv='pva://$(device):CL_offset_val'  macros={macros}  label={'Steps'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={0}/>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item ><Divider/></Grid>
                          <Grid item >
                            <div style={{marginBottom:8}}>CLOSED LOOP PARAMETERS</div>
                            <Grid container spacing={2} alignItems={'stretch'} direction={'row'} justify={'flex-start'}>
                              <Grid item xs={4}>
                                <TextInput   pv='pva://$(device):CL_Kp'  macros={macros}  label={'Kp'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={3}/>
                              </Grid>
                              <Grid item xs={4}>
                                <TextInput   pv='pva://$(device):CL_Ki'  macros={macros}  label={'Ki'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={3}/>
                              </Grid>
                              <Grid item xs={4}>
                                <TextInput   pv='pva://$(device):CL_Kd'  macros={macros}  label={'Kd'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={3}/>
                              </Grid>
                              <Grid item xs={4}>
                                <TextInput   pv='pva://$(device):CL_error'  macros={macros}  label={'P Error'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={0}/>
                              </Grid>
                              <Grid item xs={4}>
                                <TextInput   pv='pva://$(device):CL_integral'  macros={macros}  label={'I Error'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={0}/>
                              </Grid>
                              <Grid item xs={4}>
                                <TextInput   pv='pva://$(device):CL_derivative'  macros={macros}  label={'D Error'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={0}/>
                              </Grid>
                              <Grid item xs={4}>
                                <TextInput   pv='pva://$(device):CL_deadband'  macros={macros}  label={'Deadband'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={0}/>
                              </Grid>
                              <Grid item xs={4}>
                                <TextInput   pv='pva://$(device):CL_windGuard'  macros={macros}  label={'Windguard'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={0}/>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item ><Divider/></Grid>
                          <Grid item >
                            <div style={{marginBottom:8}}>DRIVE PARAMETERS</div>
                            <Grid container spacing={2} alignItems={'stretch'} direction={'row'} justify={'flex-start'}>
                              <Grid item xs={12}>
                                <Grid container spacing={2} alignItems={'stretch'} direction={'row'} justify={'space-evenly'}>
                                  <Grid item xs={5}>
                                    <StyledIconIndicator  pv='pva://$(motor):STMSTATUS:STATUS__READYTOENABLE' macros={macros} label={'Ready to Enable'} labelPlacement={'end'} onColor='lightgreen' offColor='default'/>
                                  </Grid>
                                  <Grid item xs={5}>
                                    <StyledIconIndicator  pv='pva://$(motor):STMSTATUS:STATUS__READY' macros={macros} label={'Ready'} labelPlacement={'end'} onColor='lightgreen' offColor='default'/>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item xs={4}>
                                <TextInput   pv='pva://$(motor):MaximalCurrent'  macros={macros}  label={'Maximal Current'} alarmSensitive={true}  units={'mA'} usePrecision={true} prec={0}/>
                              </Grid>
                              <Grid item xs={4}>
                                <TextInput   pv='pva://$(motor):ReducedCurrent'  macros={macros}  label={'Reduced Current'} alarmSensitive={true}  units={'mA'} usePrecision={true} prec={0}/>
                              </Grid>
                              <Grid item xs={4}>
                                <TextInput   pv='pva://$(motor):NominalVoltage'  macros={macros}  label={'Nominal Voltage'} alarmSensitive={true}  units={'mV'} usePrecision={true} prec={0}/>
                              </Grid>
                              <Grid item xs={4}>
                                <TextInput   pv='pva://$(device):CL_velocity.DRVH'  macros={macros}  label={'Velocity Pos Max'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={0}/>
                              </Grid>
                              <Grid item xs={4}>
                                <TextInput   pv='pva://$(device):CL_velocity.DRVL'  macros={macros}  label={'Velocity Neg Max'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={0}/>
                              </Grid>
                              <Grid item xs={4}>
                                <TextInput   pv='pva://$(device):CL_velocity.OROC'  macros={macros}  label={'Velocity OROC'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={0}/>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item ><Divider/></Grid>
                          <Grid item >
                            <div style={{marginBottom:8}}>FAILSAFE SETTINGS</div>
                            <React.Fragment>
                              <DataConnection
                                pv='pva://$(device):FSErrorLimEnable'
                                macros={macros}
                                useStringValue={false}
                                handleInputValue={this.handleFSEnableChange}
                              />
                            </React.Fragment>
                            <Grid container spacing={2} alignItems={'stretch'} direction={'row'} justify={'flex-start'}>
                              <Grid item xs={4}>
                                <ToggleButton  pv='pva://$(device):FSErrorLimEnable' macros={macros} custom_selection_strings={["FailSafe OFF","FailSafe ON"]}  />
                              </Grid>
                              {FSEnable == 1 &&<Grid item xs={4}>
                                <TextInput   pv='pva://$(device):FSErrorLim'  macros={macros}  label={'FailSafe Limit'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={0}/>
                              </Grid>}
                              {FSEnable == 1 &&<Grid item xs={4}>
                                <TextOutput   pv='pva://$(device):FSError' macros={macros}  label={'FailSafe Error'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={3}/>
                              </Grid>}
                            </Grid>
                          </Grid>
                          <Grid item ><Divider/></Grid>
                          <Grid item >
                            <div style={{marginBottom:8}}>LIMIT SETTINGS</div>
                            <React.Fragment>
                              <DataConnection
                                pv='pva://$(device):softLimEnable'
                                macros={macros}
                                useStringValue={false}
                                handleInputValue={this.handleSoftLimitChange}
                              />
                            </React.Fragment>
                            <Grid container spacing={2} alignItems={'stretch'} direction={'row'} justify={'flex-start'}>
                              <Grid item xs={8}>
                                <ToggleButton  pv='pva://$(device):softLimEnable' macros={macros} custom_selection_strings={["Soft Limits OFF","Soft Limits ON"]}  />
                              </Grid>
                              <Grid item xs={4}>
                                <ToggleButton  pv='pva://$(device):hardLimEnable' macros={macros} custom_selection_strings={["Hard Limits OFF","Hard Limits ON"]}  />
                              </Grid>
                              {softLim == 1 &&<Grid item xs={4}>
                                <TextInput   pv='pva://$(device):lowerLim'  macros={macros}  label={'Lower Limit'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={0}/>
                              </Grid>}
                              {softLim == 1 &&<Grid item xs={4}>
                                <TextInput   pv='pva://$(device):upperLim'  macros={macros}  label={'Upper Limit'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={0}/>
                              </Grid>}
                            </Grid>
                          </Grid>
                          <Grid item ><Divider/></Grid>
                          <Grid item >
                            <div style={{marginBottom:8}}>OPEN LOOP VELOCITY</div>
                            <Grid container spacing={2} alignItems={'stretch'} direction={'row'} justify={'flex-start'}>
                              <Grid item xs={6}>
                                <TextInput   pv='pva://$(device):fastJogVel'  macros={macros}  label={'Fast Jog Velocity'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={0}/>
                              </Grid>
                              <Grid item xs={6}>
                                <TextInput   pv='pva://$(device):slowJogVel'  macros={macros}  label={'Slow Jog Velocity'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={0}/>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item ><Divider/></Grid>
                          <Grid item >
                            <div style={{marginBottom:8}}>POSITION CALIBRATION</div>
                            <Grid container spacing={2} alignItems={'stretch'} direction={'row'} justify={'flex-start'}>
                              <Grid item xs={6}>
                                <SelectionInput   pv='pva://$(device):snlCLFeedback' macros={macros}  label={'Closed Loop Sensor'} useStringValue={true}/>
                              </Grid>
                              {FSEnable == 1 &&<Grid item xs={6}>
                                <SelectionInput   pv='pva://$(device):snlFailSafe' macros={macros}  label={'FailSafe Sensor'} useStringValue={true}/>
                              </Grid>}
                              {FSEnable == 0 &&<Grid item xs={6}>

                              </Grid>}
                              <Grid item xs={4} style={{textAlign:'center', borderRight:1,borderRightStyle:'solid',borderBottom:1,borderBottomStyle:'solid', borderColor:this.props.theme.palette.grey[700]}}>
                                Mech Encoder
                              </Grid>
                              <Grid item xs={4} style={{textAlign:'center', borderRight:1,borderRightStyle:'solid',borderBottom:1,borderBottomStyle:'solid', borderColor:this.props.theme.palette.grey[700]}}>
                                Potentiometer
                              </Grid>
                              <Grid item xs={4} style={{textAlign:'center', borderBottom:1,borderBottomStyle:'solid', borderColor:this.props.theme.palette.grey[700]}}>
                                Int Counter
                              </Grid>
                              <Grid item xs={4} style={{borderRight:1,borderRightStyle:'solid',borderBottom:1,borderBottomStyle:'solid', borderColor:this.props.theme.palette.grey[700]}}>
                                <SelectionInput   pv='pva://$(device):isInstalled_Encoder' macros={macros}  label={'Installed'} useStringValue={true}/>
                              </Grid>
                              <Grid item xs={4} style={{borderRight:1,borderRightStyle:'solid',borderBottom:1,borderBottomStyle:'solid', borderColor:this.props.theme.palette.grey[700]}}>
                                <SelectionInput   pv='pva://$(device):isInstalled_Pot' macros={macros}  label={'Installed'} useStringValue={true}/>
                              </Grid>
                              <Grid item xs={4} style={{borderBottom:1,borderBottomStyle:'solid', borderColor:this.props.theme.palette.grey[700]}}>
                              </Grid>
                              <Grid item xs={4} style={{borderRight:1,borderRightStyle:'solid',borderBottom:1,borderBottomStyle:'solid', borderColor:this.props.theme.palette.grey[700]}}>
                                <TextInput   pv='pva://$(device):dist_Encoder'  macros={macros}  label={'1 ENG unit steps'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={3}/>
                              </Grid>
                              <Grid item xs={4} style={{borderRight:1,borderRightStyle:'solid',borderBottom:1,borderBottomStyle:'solid', borderColor:this.props.theme.palette.grey[700]}}>
                                <TextInput   pv='pva://$(device):dist_Pot'  macros={macros}  label={'1 ENG unit steps'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={3}/>
                              </Grid>
                              <Grid item xs={4} style={{borderBottom:1,borderBottomStyle:'solid', borderColor:this.props.theme.palette.grey[700]}}>
                                <TextInput   pv='pva://$(device):dist_Counter'  macros={macros}  label={'1 ENG unit steps'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={5}/>
                              </Grid>
                              <Grid item xs={4} style={{borderRight:1,borderRightStyle:'solid',borderBottom:1,borderBottomStyle:'solid', borderColor:this.props.theme.palette.grey[700]}}>
                                <TextInput   pv='pva://$(device):offset_Encoder'  macros={macros}  label={'Offset (ENG unit)'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={3}/>
                              </Grid>
                              <Grid item xs={4} style={{borderRight:1,borderRightStyle:'solid',borderBottom:1,borderBottomStyle:'solid', borderColor:this.props.theme.palette.grey[700]}}>
                                <TextInput   pv='pva://$(device):offset_Pot'  macros={macros}  label={'Offset (ENG unit)'} alarmSensitive={true}  usePvUnits={true} usePrecision={true} prec={3}/>
                              </Grid>
                              <Grid item xs={4} style={{borderBottom:1,borderBottomStyle:'solid', borderColor:this.props.theme.palette.grey[700]}}>
                              </Grid>
                              <Grid item xs={8}>
                                <ToggleButton pv='pva://$(device):startCal' macros={macros} momentary={true} custom_selection_strings={["Set current position to","Set current position to"]} />
                              </Grid>
                              <Grid item xs={4}>
                                <TextInput   pv='pva://$(device):setPos_ENG_val'  macros={macros}  label={'ENG units'} alarmSensitive={true} usePrecision={true} prec={3}/>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item ><Divider/></Grid>
                          <Grid item >
                            <div style={{marginBottom:8}}>HARDWARE SDOs</div>
                            <Grid container spacing={2} alignItems={'stretch'} direction={'row'} justify={'flex-start'}>
                              <Grid item xs={12}>
                                <div style={{marginBottom:8}}>EL7031/EL7041 (Stepper Motor Drive)</div>
                              </Grid>
                              <Grid item xs={4}>
                                <TextInput   pv='pva://$(motor):MaximalCurrent'  macros={macros}  label={'Maximal Current'} alarmSensitive={true}  units={'mA'} usePrecision={true} prec={0}/>
                              </Grid>
                              <Grid item xs={4}>
                                <TextInput   pv='pva://$(motor):ReducedCurrent'  macros={macros}  label={'Reduced Current'} alarmSensitive={true}  units={'mA'} usePrecision={true} prec={0}/>
                              </Grid>
                              <Grid item xs={4}>
                                <TextInput   pv='pva://$(motor):NominalVoltage'  macros={macros}  label={'Nominal Voltage'} alarmSensitive={true}  units={'mV'} usePrecision={true} prec={0}/>
                              </Grid>
                              <Grid item xs={4}>
                                <TextInput   pv='pva://$(motor):MotorCoilResistance'  macros={macros}  label={'Motor Coil Resistance'} alarmSensitive={true}  units={'mohm'} usePrecision={true} prec={0}/>
                              </Grid>
                              <Grid item xs={4}>
                                <TextInput   pv='pva://$(motor):MotorEMF'  macros={macros}  label={'Motor EMF'} alarmSensitive={true}  units={'mV'} usePrecision={true} prec={0}/>
                              </Grid>
                              <Grid item xs={4}>
                                <TextInput   pv='pva://$(motor):MotorFullsteps'  macros={macros}  label={'Motor Fullsteps'} alarmSensitive={true}  units={''} usePrecision={true} prec={0}/>
                              </Grid>
                              <Grid item xs={6}>
                                <SelectionInput   pv='pva://$(motor):OperationMode' macros={macros}  label={'Operation Mode'} useStringValue={true}/>
                              </Grid>
                              <Grid item xs={6}>
                                <SelectionInput   pv='pva://$(motor):SpeedRange' macros={macros}  label={'Speed Range'} useStringValue={true}/>
                              </Grid>
                              <Grid item xs={6}>
                                <SelectionInput   pv='pva://$(motor):InvertMotorPolarity' macros={macros}  label={'Invert Motor Polarity'} useStringValue={true}/>
                              </Grid>
                              <Grid item xs={6}>
                                <SelectionInput   pv='pva://$(motor):InvertDigitalInput1' macros={macros}  label={'Invert Digital Input1'} useStringValue={true}/>
                              </Grid>
                              <Grid item xs={6}>
                                <SelectionInput   pv='pva://$(motor):InvertDigitalInput2' macros={macros}  label={'Invert Digital Input2'} useStringValue={true}/>
                              </Grid>
                              <Grid item xs={6}>
                                <SelectionInput   pv='pva://$(motor):FunctionInput1' macros={macros}  label={'Function Input1'} useStringValue={true}/>
                              </Grid>
                              <Grid item xs={6}>
                                <SelectionInput   pv='pva://$(motor):FunctionInput2' macros={macros}  label={'Function Input2'} useStringValue={true}/>
                              </Grid>
                              <Grid item xs={6}></Grid>
                              <Grid item xs={12}>
                                <div style={{marginBottom:8}}>EL3255 (Potentiometer Module)</div>
                              </Grid>
                              <Grid item xs={6}>
                                <SelectionInput   pv='pva://$(pot):EnableFilterCh1' macros={macros}  label={'Enable Input Filter'} useStringValue={true}/>
                              </Grid>
                              <Grid item xs={6}>
                                <SelectionInput   pv='pva://$(pot):FilterSettingsGlobal' macros={macros}  label={'Filter Settings'} useStringValue={true}/>
                              </Grid>


                            </Grid>
                          </Grid>
                          <Grid item ><Divider/></Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </TabContainer>}


                  <AppBar className={classes.body1} style={{position:'fixed',bottom:0,top:'auto'}} color='inherit'>
                    <Tabs value={value} onChange={this.handleChange} variant="fullWidth" scrollButtons="off">
                      {/* <Tab icon={<SupervisorAccount />} /> */}
                      <Tab icon={<AccountCircle />} />
                      <Tab icon={<Settings />} />
                    </Tabs>
                  </AppBar>

                </React.Fragment>

              );
            }
          }

          JustinTest2.propTypes = {
            classes: PropTypes.object.isRequired,
          };

          export default withWidth()(withStyles(styles,{withTheme:true})(JustinTest2));
