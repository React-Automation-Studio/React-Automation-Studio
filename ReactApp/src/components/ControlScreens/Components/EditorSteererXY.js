import React, {useState} from 'react'

import TextInput from '../../BaseComponents/TextInput';

import TextOutput from '../../BaseComponents/TextOutput';
import Slider from '../../BaseComponents/Slider';

import Grid from '@material-ui/core/Grid';

import ToggleButton from '../../BaseComponents/ToggleButton';

import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';
//import { Link } from 'react-router-dom'

import ThumbWheel from '../../BaseComponents/ThumbWheel';
import Close from '@material-ui/icons/Close';

import {replaceSystemMacros} from '../../SystemComponents/Utils/macroReplacement';
const styles = theme => ({
  body1: theme.typography.body1,


});

const EditorSteererXY =(props)=>{
  const [system]=useState(replaceSystemMacros(props.system,props.system.macros))
    //    console.log("json stringify",JSON.stringify(system))
    const { classes } = props;

    return (

      <div className={classes.body1} style={{ paddingRight: 12 }}>


        {/*<TextUpdate  pv='$(device):Setpoint.NAME' macros={props['macros']}  />*/}
        <Grid style={{ paddingLeft: 12, paddingRight: 24, }} container spacing={2}>
          <Grid item xs={11}>

            {system.displayName + ": X-Steerer"}

          </Grid>
          <Grid item xs={1}>


            <Close fontSize="small" onClick={props.handleCloseEditor} />

          </Grid>
        </Grid>

        <Paper style={{ padding: 12 }}  elevation={props.theme.palette.paperElevation}>



          <Grid container
            direction="row"
            justifyContent="flex-start"
            alignItems="center" spacing={1}>
            <Grid item xs={6}  >
              <TextInput pv={system.xSetpointPv} prec={3} label={'X Setpoint:'} alarmSensitive={true} usePvUnits={true} usePvMinMax={true} />

            </Grid>
            <Grid item xs={6}  >
              <TextOutput style={{ marginRight: 10 }} pv={system.xReadbackPv} prec={3} usePvUnits={true} alarmSensitive={true} label={'X Readback'} />


            </Grid>

            <Grid item xs={12}  >

              <Slider pv={system.xSetpointPv} prec={3} label={'X Setpoint:'} alarmSensitive={true} usePvUnits={true} usePvMinMax={true} />
            </Grid>
            <Grid item xs={6}  >

            </Grid>
            <Grid item xs={12}  >

            </Grid>






            <Grid item xs={12}  >
              <Grid container justifyContent="flex-start" direction="row" alignItems="center" spacing={1}>
                <Grid item xs={12} sm={12} >
                  <ThumbWheel
                    pv={system.xSetpointPv}
                    macros={props['macros']}
                    prec_integer={2}
                    prec_decimal={2}
                  />

                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}  >
              <ToggleButton pv={system.xOnPv} macros={props['macros']} labelPlacement={"top"} />





            </Grid>
            <Grid item xs={4}  >





            </Grid>
            <Grid item xs={4}  >

            {/* {system.disableLink!==true&&   <Button component={Link} to={{
                pathname: "/AdvancedSettingsSinglePS",
                search: JSON.stringify(system),
                state: ["sdas"],
                data: "hello2"
              }} target="_blank" color="primary" style={{ width: "100%" }} variant='contained'>  Settings </Button>
            } */}
            </Grid>


          </Grid>

        </Paper>
        <div className={classes.body1} style={{ marginTop: 12 }}>

          {system.displayName + ": Y-Steerer"}
          {/*<TextUpdate  pv='$(device):Setpoint.NAME' macros={props['macros']}  />*/}

          <Paper style={{ padding: 12 }} elevation={props.theme.palette.paperElevation} >



            <Grid container
              direction="row"
              justifyContent="flex-start"
              alignItems="center" spacing={1}>
              <Grid item xs={6}  >
                <TextInput pv={system.ySetpointPv} prec={3} label={'Y Setpoint:'} alarmSensitive={true} usePvUnits={true} usePvMinMax={true} />

              </Grid>
              <Grid item xs={6}  >
                <TextOutput style={{ marginRight: 10 }} pv={system.yReadbackPv} prec={3} usePvUnits={true} alarmSensitive={true} label={'Y Readback'} />


              </Grid>

              <Grid item xs={12}  >

                <Slider pv={system.ySetpointPv} prec={3} label={'Y Setpoint:'} alarmSensitive={true} usePvUnits={true} usePvMinMax={true} />
              </Grid>
              <Grid item xs={6}  >

              </Grid>
              <Grid item xs={12}  >

              </Grid>






              <Grid item xs={12}  >
                <Grid container justifyContent="flex-start" direction="row" alignItems="center" spacing={1}>
                  <Grid item xs={12} sm={12} >
                    <ThumbWheel
                      pv={system.ySetpointPv}
                      macros={props['macros']}
                      prec_integer={2}
                      prec_decimal={2}
                    />

                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}  >
                <ToggleButton pv={system.yOnPv} macros={props['macros']} labelPlacement={"top"} />





              </Grid>
              <Grid item xs={4}  >





              </Grid>
              <Grid item xs={4}  >

              {/* {system.disableLink!==true&&   <Button component={Link} to={{
                  pathname: "/SettingsSteererXY",
                  search: JSON.stringify(system),
                  state: ["sdas"],
                  data: "hello2"
                }} target="_blank" color="primary" style={{ width: "100%" }} variant='contained'>  Settings </Button>
              } */}
              </Grid>


            </Grid>

          </Paper>
        </div>

      </div>


    );
  }


export default withStyles(styles, { withTheme: true })(EditorSteererXY)
