import React from 'react'

import AutomationStudioContext from '../../../SystemComponents/AutomationStudioContext';
import TextInput from '../../../BaseComponents/TextInput';
import SelectionInput from '../../../BaseComponents/SelectionInput';
import TextOutput from '../../../BaseComponents/TextOutput';
import SimpleSlider from '../../../BaseComponents/SimpleSlider';
import TextUpdate from '../../../BaseComponents/TextUpdate';
import Grid from '@material-ui/core/Grid';
import SwitchComponent from '../../../BaseComponents/SwitchComponent';
import ToggleButton from '../../../BaseComponents/ToggleButton';
import ActionButton from '../../../BaseComponents/ActionButton';
import ThumbWheel from '../../../BaseComponents/ThumbWheel';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import MyWindowPortal from '../../../SettingsPages/MyWindowPortal';

//import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  body1: theme.typography.body1,


});

class ControlRightSteererXY extends React.Component {
  constructor(props) {
    super(props);
    this.state={'showSettings':false}

  }


  handleSettingsButtonClick=()=>{
    this.setState({'showSettings':true});
  }

  render() {
    const system=this.props.system;
//    console.log("json stringify",JSON.stringify(system))
    const {classes}= this.props;

    return (

      <div className={classes.body1} style={{ paddingRight: 12}}>

          {system.displayName+": X-Steerer"}
          {/*<TextUpdate  pv='pva://$(device):Setpoint.NAME' macros={this.props['macros']}  />*/}



        <Card style={{ padding: 12}} >



          <Grid   container
            direction="row"
            justify="flex-start"
            alignItems="center" spacing={1}>
            <Grid item xs={6}  >
              <TextInput   pv={'pva://'+system.devices.xDevice.deviceName+":"+system.devices.xDevice.setpoint}     usePrecision={true} prec={3}  label={'X Setpoint:'} alarmSensitive={true}  usePvUnits={true} usePvMinMax={true}/>

            </Grid>
            <Grid item xs={6}  >
              <TextOutput style={{marginRight:10}} pv={'pva://'+system.devices.xDevice.deviceName+":"+system.devices.xDevice.readback}        usePrecision={true} prec={3} usePvUnits={true} alarmSensitive={true} label={'X Readback'}/>


            </Grid>

            <Grid item xs={6}  >

              <TextOutput  pv={'pva://'+system.devices.xDevice.deviceName+":get-localRemote"}        usePvUnits={true} useStringValue={true} alarmSensitive={true} label={'X Loc/Rem'} useStringSeverityMatch={true} StringSeverity={[{'stringMatch':'Local','severity':1}]}/>
            </Grid>
            <Grid item xs={6}  >
              <TextOutput  pv={'pva://'+system.devices.xDevice.deviceName+":get-statusText"}        useStringValue={true} alarmSensitive={true} label={'X Status'}  useStringSeverityMatch={true} StringSeverity={[{'stringMatch':'Fault','severity':2}]}/>
            </Grid>
            <Grid item xs={12}  >

            </Grid>
            <Grid item xs={4}  >

              <ToggleButton pv={'pva://'+system.devices.xDevice.deviceName+":put-offOn"}  label={' On/Off'} labelPlacement={"end"} custom_selection_strings={["Off","On"]}/>



            </Grid>
            <Grid item xs={4}  >





            </Grid>
            <Grid item xs={4}  >

              <Button component={Link} to={{
                pathname: "/SettingsSteererXY",
                search:JSON.stringify(system),
                state: ["sdas"],
                data:"hello2"
              }} target="_blank" color="primary" variant='contained'>  Settings </Button>

            </Grid>





            <Grid item xs={12}  >
              <Grid   container  justify="flex-start" direction="row"    alignItems="center" spacing={1}>
                <Grid item xs={12} sm={12} >
                <ThumbWheel
                  pv={'pva://'+system.devices.xDevice.deviceName+":"+system.devices.xDevice.setpoint}
                  macros={this.props['macros']}
                  prec_integer={2}
                  prec_decimal={2}
                  />

                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} >
              <SelectionInput  pv={'pva://'+system.devices.xDevice.deviceName+':put-S&EImmed'} label={'Mode'} useStringValue={true}/>
            </Grid>
            <Grid item xs={6}  >
              <ActionButton pv={'pva://'+system.devices.xDevice.deviceName+":put-enter"} macros={this.props['macros']}   actionValue={"1"}
                actionString={"Enter"}/>
            </Grid>

          </Grid>

        </Card>
        <div className={classes.body1}  style={{marginTop:12}}>

            {system.displayName+": Y-Steerer"}
            {/*<TextUpdate  pv='pva://$(device):Setpoint.NAME' macros={this.props['macros']}  />*/}

          <Card style={{ padding: 12}} >



            <Grid   container
              direction="row"
              justify="flex-start"
              alignItems="center" spacing={1}>
              <Grid item xs={6}  >
                <TextInput   pv={'pva://'+system.devices.yDevice.deviceName+":"+system.devices.yDevice.setpoint}     usePrecision={true} prec={3}  label={'Y Setpoint:'} alarmSensitive={true}  usePvUnits={true} usePvMinMax={true}/>

              </Grid>
              <Grid item xs={6}  >
                <TextOutput style={{marginRight:10}} pv={'pva://'+system.devices.yDevice.deviceName+":"+system.devices.yDevice.readback}        usePrecision={true} prec={3} usePvUnits={true} alarmSensitive={true} label={'Y Readback'}/>


              </Grid>

              <Grid item xs={6}  >

                <TextOutput  pv={'pva://'+system.devices.yDevice.deviceName+":get-localRemote"}        usePvUnits={true} useStringValue={true} alarmSensitive={true} label={'Y Loc/Rem'} useStringSeverityMatch={true} StringSeverity={[{'stringMatch':'Local','severity':1}]}/>
              </Grid>
              <Grid item xs={6}  >
                <TextOutput  pv={'pva://'+system.devices.yDevice.deviceName+":get-statusText"}        useStringValue={true} alarmSensitive={true} label={'Y Status'}  useStringSeverityMatch={true} StringSeverity={[{'stringMatch':'Fault','severity':2}]}/>
              </Grid>
              <Grid item xs={4}  >

                <ToggleButton pv={'pva://'+system.devices.yDevice.deviceName+":put-offOn"}  label={' On/Off'} labelPlacement={"end"} custom_selection_strings={["Off","On"]}/>



              </Grid>
              <Grid item xs={4}  >




              </Grid>

              <Grid item xs={4}  >
                {/*              <Button color="primary" variant='contained' onClick={this.handleSettingsButtonClick}>  Settings </Button>*/}
                <Button component={Link} to={{
                  pathname: "/SettingsSteererXY",
                  search:JSON.stringify(system),
                  state: ["sdas"],
                  data:"hello2"
                }} target="_blank" color="primary" variant='contained'>  Settings </Button>


              </Grid>





              <Grid item xs={12}  >
                <Grid   container  justify="flex-start" direction="row"    alignItems="center" spacing={1}>
                  <Grid item xs={12} sm={12} >
                  <ThumbWheel
                    pv={'pva://'+system.devices.yDevice.deviceName+":"+system.devices.yDevice.setpoint}
                    macros={this.props['macros']}
                    prec_integer={2}
                    prec_decimal={2}
                    />
              
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} >
                <SelectionInput  pv={'pva://'+system.devices.yDevice.deviceName+':put-S&EImmed'} label={'Mode'} useStringValue={true}/>
              </Grid>
              <Grid item xs={6}  >
                <ActionButton pv={'pva://'+system.devices.yDevice.deviceName+":put-enter"} macros={this.props['macros']}   actionValue={"1"}
                  actionString={"Enter"}/>
              </Grid>

            </Grid>

          </Card>
        </div>

      </div>


    );
  }
}

ControlRightSteererXY.contextType=AutomationStudioContext;
export default withStyles(styles,{withTheme:true})(ControlRightSteererXY)
