import React from 'react'

import AutomationStudioContext from '../../SystemComponents/AutomationStudioContext';
import TextInput from '../../BaseComponents/TextInput';
import SelectionInput from '../../BaseComponents/SelectionInput';
import TextOutput from '../../BaseComponents/TextOutput';
import SimpleSlider from '../../BaseComponents/SimpleSlider';
import TextUpdate from '../../BaseComponents/TextUpdate';
import Grid from '@material-ui/core/Grid';
import SwitchComponent from '../../BaseComponents/SwitchComponent';
import ToggleButton from '../../BaseComponents/ToggleButton';
import ActionButton from '../../BaseComponents/ActionButton';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import MyWindowPortal from '../../SettingsPages/MyWindowPortal';
import SettingsSteererXY from '../../SettingsPages/SettingsSteererXY';
import ThumbWheel from '../../BaseComponents/ThumbWheel';
import Close from '@material-ui/icons/Close';
//import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  body1: theme.typography.body1,


});

class ControlRightSinglePS extends React.Component {
  constructor(props) {
    super(props);
    this.state={'showSettings':false}

  }


  handleSettingsButtonClick=()=>{
    this.setState({'showSettings':true});
  }

  render() {
    const system=this.props.system;
    console.log("json stringify",JSON.stringify(system))
    const {classes}= this.props;

    return (
      <div className={classes.body1} style={{ paddingRight: 12}}>


          {/*<TextUpdate  pv='pva://$(device):Setpoint.NAME' macros={this.props['macros']}  />*/}
          <Grid style={{ paddingLeft: 12,paddingRight: 24,}} container spacing={2}>
            <Grid item xs={11}>

              {system.displayName+": Steerer"}

            </Grid>
            <Grid item xs={1}>


                <Close  fontSize="small" onClick= {this.props.handleCloseEditor}/>

            </Grid>
          </Grid>

        <Card style={{ padding: 12}} >



          <Grid   container
            direction="row"
            justify="flex-start"
            alignItems="center" spacing={1}>
            <Grid item xs={6}  >
              <TextInput   pv={'pva://'+system.devices.device.deviceName+":"+system.devices.device.setpoint}     usePrecision={true} prec={3}  label={'Setpoint:'} alarmSensitive={true}  usePvUnits={true} usePvMinMax={true}/>

            </Grid>
            <Grid item xs={6}  >
              <TextOutput style={{marginRight:10}} pv={'pva://'+system.devices.device.deviceName+":"+system.devices.device.readback}        usePrecision={true} prec={3} usePvUnits={true} alarmSensitive={true} label={'Readback'}/>


            </Grid>

            <Grid item xs={12}  >

              <SimpleSlider   pv={'pva://'+system.devices.device.deviceName+":"+system.devices.device.setpoint}     usePrecision={true} prec={3}  label={'Setpoint:'} alarmSensitive={true}  usePvUnits={true} usePvMinMax={true}/>
            </Grid>
            <Grid item xs={6}  >

            </Grid>
            <Grid item xs={12}  >

            </Grid>






            <Grid item xs={12}  >
              <Grid   container  justify="flex-start" direction="row"    alignItems="center" spacing={1}>
                <Grid item xs={12} sm={12} >
                <ThumbWheel
                  pv={'pva://'+system.devices.device.deviceName+":"+system.devices.device.setpoint}
                  macros={this.props['macros']}
                  prec_integer={2}
                  prec_decimal={2}
                  />

                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}  >
            <ToggleButton pv={'pva://'+system.devices.device.deviceName+':On'} macros={this.props['macros']}  labelPlacement={"top"}  />





            </Grid>
            <Grid item xs={4}  >





            </Grid>
            <Grid item xs={4}  >

              <Button component={Link} to={{
                pathname: "/SettingsSinglePS",
                search:JSON.stringify(system),
                state: ["sdas"],
                data:"hello2"
              }} target="_blank" color="primary" style={{width:"100%"}} variant='contained'>  Settings </Button>

            </Grid>


          </Grid>

        </Card>


      </div>

    );
  }
}

ControlRightSinglePS.contextType=AutomationStudioContext;
export default withStyles(styles,{withTheme:true})(ControlRightSinglePS)
