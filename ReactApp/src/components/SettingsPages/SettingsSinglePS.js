import React from 'react'

import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import TextInput from '../BaseComponents/TextInput';
import SelectionInput from '../BaseComponents/SelectionInput';
import TextOutput from '../BaseComponents/TextOutput';

import Grid from '@material-ui/core/Grid';

import ToggleButton from '../BaseComponents/ToggleButton';
import ActionButton from '../BaseComponents/ActionButton';
import ThumbWheel from '../BaseComponents/ThumbWheel';
import Card from '@material-ui/core/Card';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'


const styles = theme => ({
  body1: theme.typography.body1,


});

class SettingsSinglePS extends React.Component {
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
              <div style={{ paddingRight: 12}}>
                <body1 className={classes.body1}>
                  {system.displayName}


                </body1>
                <Card style={{ padding: 12}} >



                  <Grid   container
                    direction="row"
                    justify="flex-start"
                    alignItems="center" spacing={1}>
                    <Grid item xs={6}  >
                      <TextInput   pv={'pva://'+system.devices.device.deviceName+":"+system.devices.device.setpoint}      prec={3}  label={'Setpoint:'} alarmSensitive={true}  usePvUnits={true} usePvMinMax={true}/>

                    </Grid>
                    <Grid item xs={6}  >
                      <TextOutput style={{marginRight:10}} pv={'pva://'+system.devices.device.deviceName+":"+system.devices.device.readback}         prec={3} usePvUnits={true} alarmSensitive={true} label={'Readback'}/>


                    </Grid>

                    <Grid item xs={6}  >

                      <TextOutput  pv={'pva://'+system.devices.device.deviceName+":get-localRemote"}        usePvUnits={true} useStringValue={true} alarmSensitive={true} label={'Loc/Rem'} useStringSeverityMatch={true} StringSeverity={[{'stringMatch':'Local','severity':1}]}/>
                    </Grid>
                    <Grid item xs={6}  >
                      <TextOutput  pv={'pva://'+system.devices.device.deviceName+":get-statusText"}        useStringValue={true} alarmSensitive={true} label={'Status'}  useStringSeverityMatch={true} StringSeverity={[{'stringMatch':'Fault','severity':2}]}/>
                    </Grid>
                    <Grid item xs={12}  >

                    </Grid>
                    <Grid item xs={4}  >

                      <ToggleButton pv={'pva://'+system.devices.device.deviceName+":put-offOn"}  label={' On/Off'} labelPlacement={"End"} custom_selection_strings={["Off","On"]}/>



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
                      <Grid   container  justify="flex-start" direction="row"    alignItems="center" spacing={4}>
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
                    <Grid item xs={6} >
                      <SelectionInput  pv={'pva://'+system.devices.device.deviceName+':put-S&EImmed'} label={'Mode'} useStringValue={true}/>
                    </Grid>
                    <Grid item xs={6}  >
                      <ActionButton pv={'pva://'+system.devices.device.deviceName+":put-enter"} macros={this.props['macros']}   actionValue={"1"}
                        actionString={"Enter"}/>
                    </Grid>

                  </Grid>

                </Card>


                </div>



            </Grid>
          </Grid>



            );
            }
            }

            SettingsSinglePS.contextType=AutomationStudioContext;
            export default withStyles(styles,{withTheme:true})(SettingsSinglePS)
