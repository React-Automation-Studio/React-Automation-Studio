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

class ControlRightSlitXY extends React.Component {
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



        <Grid style={{ paddingLeft: 12,paddingRight: 24,}} container spacing={2}>
          <Grid item xs={11}>

            {system.displayName+": X"}

          </Grid>
          <Grid item xs={1}>


            <Close  fontSize="small" onClick= {this.props.handleCloseEditor}/>

          </Grid>
        </Grid>

        <Card style={{ padding: 8}} >



          <Grid   container
            direction="row"
            justify="flex-start"
            alignItems="start" spacing={1}>
            <Grid item xs={3}  >
              <TextInput   pv={'pva://'+system.devices.xGapDevice.deviceName+":"+system.devices.xGapDevice.setpoint}     usePrecision={true} prec={2}  label={'X Gap Setpoint'} alarmSensitive={true}  usePvUnits={true} usePvMinMax={true}/>

            </Grid>
            <Grid item xs={3}  >
              <TextOutput  pv={'pva://'+system.devices.xGapDevice.deviceName+":"+system.devices.xGapDevice.readback}       label={'X Gap Readback'} usePrecision={true} prec={2} usePvUnits={true} alarmSensitive={true} />
            </Grid>
            <Grid item xs={3}  >
              <TextOutput displayMetaData={'lower_disp_limit'}  pv={'pva://'+system.devices.xGapDevice.deviceName+":"+system.devices.xGapDevice.setpoint}       label={'X Gap Min'} usePrecision={true} prec={2} usePvUnits={true}  />


            </Grid>
            <Grid item xs={3}  >
              <TextOutput displayMetaData={'upper_disp_limit'}  pv={'pva://'+system.devices.xGapDevice.deviceName+":"+system.devices.xGapDevice.setpoint}       label={'X Gap Max'} usePrecision={true} prec={2} usePvUnits={true} />


            </Grid>

            <Grid item xs={7}  >

              <ThumbWheel
                pv={'pva://'+system.devices.xGapDevice.deviceName+":"+system.devices.xGapDevice.setpoint}
                macros={this.props['macros']}
                prec_integer={1}
                prec_decimal={2}
              />



            </Grid>
            <Grid item xs={5}  >
              <ToggleButton pv={'pva://'+system.systemName+':X:Drive:On'} macros={this.props['macros']}  labelPlacement={"top"} label={"Drive"}  />
            </Grid>
          </Grid>
        </Card>
      <Card style={{marginTop:6, padding: 8}} >
        <Grid   container
          direction="row"
          justify="flex-start"
          alignItems="start" spacing={1}>

            <Grid item xs={3}  >
              <TextInput   pv={'pva://'+system.devices.xOffsetDevice.deviceName+":"+system.devices.xOffsetDevice.setpoint}     usePrecision={true} prec={2}  label={'X Offset Setpoint'} alarmSensitive={true}  usePvUnits={true} usePvMinMax={true}/>

            </Grid>
            <Grid item xs={3}  >
              <TextOutput  pv={'pva://'+system.devices.xOffsetDevice.deviceName+":"+system.devices.xOffsetDevice.readback}       label={'X Offset Readback'} usePrecision={true} prec={2} usePvUnits={true} alarmSensitive={true} />
            </Grid>
            <Grid item xs={3}  >
              <TextOutput displayMetaData={'lower_disp_limit'}  pv={'pva://'+system.devices.xOffsetDevice.deviceName+":"+system.devices.xOffsetDevice.setpoint}       label={'X Offset Min'} usePrecision={true} prec={2} usePvUnits={true}  />


            </Grid>
            <Grid item xs={3}  >
              <TextOutput displayMetaData={'upper_disp_limit'}  pv={'pva://'+system.devices.xOffsetDevice.deviceName+":"+system.devices.xOffsetDevice.setpoint}       label={'X Offset Max'} usePrecision={true} prec={2} usePvUnits={true} />


            </Grid>
            <Grid item xs={7}  >

              <ThumbWheel
                pv={'pva://'+system.devices.xOffsetDevice.deviceName+":"+system.devices.xOffsetDevice.setpoint}
                macros={this.props['macros']}
                prec_integer={1}
                prec_decimal={2}
              />



            </Grid>



          </Grid>

        </Card>
        <div className={classes.body1}  style={{marginTop:12}}>

          {system.displayName+": Y"}
          {/*<TextUpdate  pv='pva://$(device):Setpoint.NAME' macros={this.props['macros']}  />*/}


                  <Card style={{ padding: 12}} >



                    <Grid   container
                      direction="row"
                      justify="flex-start"
                      alignItems="start" spacing={1}>
                      <Grid item xs={3}  >
                        <TextInput   pv={'pva://'+system.devices.yGapDevice.deviceName+":"+system.devices.yGapDevice.setpoint}     usePrecision={true} prec={2}  label={'Y Gap Setpoint'} alarmSensitive={true}  usePvUnits={true} usePvMinMax={true}/>

                      </Grid>
                      <Grid item xs={3}  >
                        <TextOutput  pv={'pva://'+system.devices.yGapDevice.deviceName+":"+system.devices.yGapDevice.readback}       label={'Y Gap Readback'} usePrecision={true} prec={2} usePvUnits={true} alarmSensitive={true} />
                      </Grid>
                      <Grid item xs={3}  >
                        <TextOutput displayMetaData={'lower_disp_limit'}  pv={'pva://'+system.devices.yGapDevice.deviceName+":"+system.devices.yGapDevice.setpoint}       label={'Y Gap Min'} usePrecision={true} prec={2} usePvUnits={true}  />


                      </Grid>
                      <Grid item xs={3}  >
                        <TextOutput displayMetaData={'upper_disp_limit'}  pv={'pva://'+system.devices.yGapDevice.deviceName+":"+system.devices.yGapDevice.setpoint}       label={'Y Gap Max'} usePrecision={true} prec={2} usePvUnits={true} />


                      </Grid>

                      <Grid item xs={7}  >

                        <ThumbWheel
                          pv={'pva://'+system.devices.yGapDevice.deviceName+":"+system.devices.yGapDevice.setpoint}
                          macros={this.props['macros']}
                          prec_integer={1}
                          prec_decimal={2}
                        />



                      </Grid>
                      <Grid item xs={5}  >
                        <ToggleButton pv={'pva://'+system.systemName+':Y:Drive:On'} macros={this.props['macros']}  labelPlacement={"top"} label={"Drive"}  />
                      </Grid>
                    </Grid>
                  </Card>
                <Card style={{marginTop:6, padding: 12}} >
                  <Grid   container
                    direction="row"
                    justify="flex-start"
                    alignItems="start" spacing={1}>

                      <Grid item xs={3}  >
                        <TextInput   pv={'pva://'+system.devices.yOffsetDevice.deviceName+":"+system.devices.yOffsetDevice.setpoint}     usePrecision={true} prec={2}  label={'Y Offset Setpoint'} alarmSensitive={true}  usePvUnits={true} usePvMinMax={true}/>

                      </Grid>
                      <Grid item xs={3}  >
                        <TextOutput  pv={'pva://'+system.devices.yOffsetDevice.deviceName+":"+system.devices.yOffsetDevice.readback}       label={'Y Offset Readback'} usePrecision={true} prec={2} usePvUnits={true} alarmSensitive={true} />
                      </Grid>
                      <Grid item xs={3}  >
                        <TextOutput displayMetaData={'lower_disp_limit'}  pv={'pva://'+system.devices.yOffsetDevice.deviceName+":"+system.devices.yOffsetDevice.setpoint}       label={'Y Offset Min'} usePrecision={true} prec={2} usePvUnits={true}  />


                      </Grid>
                      <Grid item xs={3}  >
                        <TextOutput displayMetaData={'upper_disp_limit'}  pv={'pva://'+system.devices.yOffsetDevice.deviceName+":"+system.devices.yOffsetDevice.setpoint}       label={'Y Offset Max'} usePrecision={true} prec={2} usePvUnits={true}/>


                      </Grid>
                      <Grid item xs={7}  >

                        <ThumbWheel
                          pv={'pva://'+system.devices.yOffsetDevice.deviceName+":"+system.devices.yOffsetDevice.setpoint}
                          macros={this.props['macros']}
                          prec_integer={1}
                          prec_decimal={2}
                        />



                      </Grid>



                    </Grid>

                  </Card>
        </div>

      </div>


    );
  }
}

ControlRightSlitXY.contextType=AutomationStudioContext;
export default withStyles(styles,{withTheme:true})(ControlRightSlitXY)
