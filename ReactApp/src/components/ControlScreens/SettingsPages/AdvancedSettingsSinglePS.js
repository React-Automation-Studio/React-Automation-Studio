import React from 'react'

import TextInput from '../../BaseComponents/TextInput';

import TextOutput from '../../BaseComponents/TextOutput';

import Grid from '@material-ui/core/Grid';

import ToggleButton from '../../BaseComponents/ToggleButton';

import ThumbWheel from '../../BaseComponents/ThumbWheel';


import { withStyles } from '@material-ui/core/styles';

import Slider from '../../BaseComponents/Slider';
import Paper from '@material-ui/core/Paper';
const styles = theme => ({
  body1: theme.typography.body1,


});

const AdvancedSettingsSinglePS=(props)=>{





  
   
    const system = JSON.parse(decodeURIComponent(props.location.search.substr(1)));
    return (


      <Grid container
        direction="row"
        justifyContent="flex-start"
        alignItems="center" spacing={1}>
        <Grid item lg={3} xs={12} md={6} >


          <Grid style={{ paddingLeft: 12, paddingRight: 24, }} container spacing={2}>
            <Grid item xs={11}>

              {system.displayName + ": Steerer"}

            </Grid>
            <Grid item xs={1}>




            </Grid>
          </Grid>

          <Paper style={{ padding: 12 }} elevation={props.theme.palette.paperElevation} >



            <Grid container
              direction="row"
              justifyContent="flex-start"
              alignItems="center" spacing={1}>
              <Grid item xs={6}  >
                <TextInput pv={system.devices.device.setpointPv} prec={3} label={'Setpoint:'} alarmSensitive={true} usePvUnits={true} usePvMinMax={true} />

              </Grid>
              <Grid item xs={6}  >
                <TextOutput style={{ marginRight: 10 }} pv={system.devices.device.readbackPv} prec={3} usePvUnits={true} alarmSensitive={true} label={'Readback'} />


              </Grid>

              <Grid item xs={12}  >

                <Slider pv={system.devices.device.setpointPv} prec={3} label={'Setpoint:'} alarmSensitive={true} usePvUnits={true} usePvMinMax={true} />
              </Grid>
              <Grid item xs={6}  >

              </Grid>
              <Grid item xs={12}  >

              </Grid>






              <Grid item xs={12}  >
                <Grid container justifyContent="flex-start" direction="row" alignItems="center" spacing={1}>
                  <Grid item xs={12} sm={12} >
                    <ThumbWheel
                      pv={system.devices.device.setpointPv}
                      macros={props['macros']}
                      prec_integer={2}
                      prec_decimal={2}
                    />

                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}  >
                <ToggleButton pv={system.devices.device.onOffPv} macros={props['macros']} labelPlacement={"top"} />





              </Grid>
              <Grid item xs={4}  >





              </Grid>



            </Grid>

          </Paper>

        </Grid>
      </Grid>
    );
  }


export default withStyles(styles, { withTheme: true })(AdvancedSettingsSinglePS)
