import React from 'react'

import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import TextInput from '../BaseComponents/TextInput';
import SelectionInput from '../BaseComponents/SelectionInput';
import TextOutput from '../BaseComponents/TextOutput';
import SimpleSlider from '../BaseComponents/SimpleSlider';
import TextUpdate from '../BaseComponents/TextUpdate';
import Grid from '@material-ui/core/Grid';
import SwitchComponent from '../BaseComponents/SwitchComponent';
import ToggleButton from '../BaseComponents/ToggleButton';
import ActionButton from '../BaseComponents/ActionButton';
import ThumbWheel from '../BaseComponents/ThumbWheel';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
//import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  body1: theme.typography.body1,


});

class SettingsSteererXY extends React.Component {
  constructor(props) {
    super(props);

  }




  render() {
    const {classes}= this.props;
    const system=JSON.parse(decodeURIComponent(this.props.location.search.substr(1))) ;
    return (


      <Grid   container
        direction="row"
        justify="flex-start"
        alignItems="center" spacing={1}>
        <Grid item xs={3}  >
          <div className={classes.body1} >


            <Grid style={{ paddingLeft: 12,paddingRight: 24,}} container spacing={2}>
              <Grid item xs={11}>

                {system.displayName+": X-Steerer"}

              </Grid>
              <Grid item xs={1}>



              </Grid>
            </Grid>

            <Card style={{ padding: 12}} >



              <Grid   container
                direction="row"
                justify="flex-start"
                alignItems="center" spacing={1}>
                <Grid item xs={6}  >
                  <TextInput   pv={'pva://'+system.devices.xDevice.deviceName+":"+system.devices.xDevice.setpoint}      prec={3}  label={'X Setpoint:'} alarmSensitive={true}  usePvUnits={true} usePvMinMax={true}/>

                </Grid>
                <Grid item xs={6}  >
                  <TextOutput style={{marginRight:10}} pv={'pva://'+system.devices.xDevice.deviceName+":"+system.devices.xDevice.readback}         prec={3} usePvUnits={true} alarmSensitive={true} label={'X Readback'}/>


                </Grid>

                <Grid item xs={12}  >

                  <SimpleSlider   pv={'pva://'+system.devices.xDevice.deviceName+":"+system.devices.xDevice.setpoint}      prec={3}  label={'X Setpoint:'} alarmSensitive={true}  usePvUnits={true} usePvMinMax={true}/>
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
                <Grid item xs={4}  >
                  <ToggleButton pv={'pva://'+system.devices.xDevice.deviceName+':On'} macros={this.props['macros']}  labelPlacement={"top"}  />





                </Grid>
                <Grid item xs={4}  >





                </Grid>
                <Grid item xs={4}  >



                </Grid>


              </Grid>

            </Card>
          </div>
        </Grid>
        <Grid item xs={3}  >
          <div className={classes.body1} >


            <Grid style={{ paddingLeft: 12,paddingRight: 24,}} container spacing={2}>
              <Grid item xs={11}>

                {system.displayName+": Y-Steerer"}

              </Grid>
              <Grid item xs={1}>



              </Grid>
            </Grid>

            <Card style={{ padding: 12}} >



              <Grid   container
                direction="row"
                justify="flex-start"
                alignItems="center" spacing={1}>
                <Grid item xs={6}  >
                  <TextInput   pv={'pva://'+system.devices.yDevice.deviceName+":"+system.devices.yDevice.setpoint}      prec={3}  label={'X Setpoint:'} alarmSensitive={true}  usePvUnits={true} usePvMinMax={true}/>

                </Grid>
                <Grid item xs={6}  >
                  <TextOutput style={{marginRight:10}} pv={'pva://'+system.devices.yDevice.deviceName+":"+system.devices.yDevice.readback}         prec={3} usePvUnits={true} alarmSensitive={true} label={'X Readback'}/>


                </Grid>

                <Grid item xs={12}  >

                  <SimpleSlider   pv={'pva://'+system.devices.yDevice.deviceName+":"+system.devices.yDevice.setpoint}      prec={3}  label={'X Setpoint:'} alarmSensitive={true}  usePvUnits={true} usePvMinMax={true}/>
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
                <Grid item xs={4}  >
                  <ToggleButton pv={'pva://'+system.devices.yDevice.deviceName+':On'} macros={this.props['macros']}  labelPlacement={"top"}  />





                </Grid>
                <Grid item xs={4}  >





                </Grid>
                <Grid item xs={4}  >



                </Grid>


              </Grid>

            </Card>
          </div>



        </Grid>
      </Grid>



    );
  }
}

SettingsSteererXY.contextType=AutomationStudioContext;
export default withStyles(styles,{withTheme:true})(SettingsSteererXY)
