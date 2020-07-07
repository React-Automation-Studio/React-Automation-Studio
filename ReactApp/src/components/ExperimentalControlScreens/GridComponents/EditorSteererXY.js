import React, {useState} from 'react'

import AutomationStudioContext from '../../SystemComponents/AutomationStudioContext';
import TextInput from '../../BaseComponents/TextInput';

import TextOutput from '../../BaseComponents/TextOutput';
import Slider from '../../BaseComponents/Slider';

import Grid from '@material-ui/core/Grid';

import ToggleButton from '../../BaseComponents/ToggleButton';

import Card from '@material-ui/core/Card';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

import ThumbWheel from '../../BaseComponents/ThumbWheel';
import Close from '@material-ui/icons/Close';
//import MenuItem from '@material-ui/core/MenuItem';
import {replaceSystemMacros} from '../../SystemComponents/Utils/macroReplacement';
const styles = theme => ({
  body1: theme.typography.body1,


});

const EditorSteererXY =(props)=>{
  const [system,setSystem]=useState(replaceSystemMacros(props.system,props.system.macros))
    //    console.log("json stringify",JSON.stringify(system))
    const { classes } = props;

    return (

      <div className={classes.body1} style={{ paddingRight: 12 }}>


        {/*<TextUpdate  pv='pva://$(device):Setpoint.NAME' macros={props['macros']}  />*/}
        <Grid style={{ paddingLeft: 12, paddingRight: 24, }} container spacing={2}>
          <Grid item xs={11}>

            {system.displayName + ": X-Steerer"}

          </Grid>
          <Grid item xs={1}>


            <Close fontSize="small" onClick={props.handleCloseEditor} />

          </Grid>
        </Grid>

        <Card style={{ padding: 12 }} >



          <Grid container
            direction="row"
            justify="flex-start"
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
              <Grid container justify="flex-start" direction="row" alignItems="center" spacing={1}>
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

              <Button component={Link} to={{
                pathname: "/SettingsSteererXY",
                search: JSON.stringify(system),
                state: ["sdas"],
                data: "hello2"
              }} target="_blank" color="primary" style={{ width: "100%" }} variant='contained'>  Settings </Button>

            </Grid>


          </Grid>

        </Card>
        <div className={classes.body1} style={{ marginTop: 12 }}>

          {system.displayName + ": Y-Steerer"}
          {/*<TextUpdate  pv='pva://$(device):Setpoint.NAME' macros={props['macros']}  />*/}

          <Card style={{ padding: 12 }} >



            <Grid container
              direction="row"
              justify="flex-start"
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
                <Grid container justify="flex-start" direction="row" alignItems="center" spacing={1}>
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

                <Button component={Link} to={{
                  pathname: "/SettingsSteererXY",
                  search: JSON.stringify(system),
                  state: ["sdas"],
                  data: "hello2"
                }} target="_blank" color="primary" style={{ width: "100%" }} variant='contained'>  Settings </Button>

              </Grid>


            </Grid>

          </Card>
        </div>

      </div>


    );
  }


export default withStyles(styles, { withTheme: true })(EditorSteererXY)
