import React, {useState} from 'react'

import AutomationStudioContext from '../../SystemComponents/AutomationStudioContext';
import TextInput from '../../BaseComponents/TextInput';
import TextOutput from '../../BaseComponents/TextOutput';
import Slider from '../../BaseComponents/Slider';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '../../BaseComponents/ToggleButton';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import ThumbWheel from '../../BaseComponents/ThumbWheel';
import Close from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import {replaceSystemMacros} from '../../SystemComponents/Utils/macroReplacement';
import SelectionInput from '../../BaseComponents/SelectionInput';
//import MenuItem from '@material-ui/core/MenuItem';
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
const styles = theme => ({
  body1: theme.typography.body1,


});

const EditorSinglePS =(props)=>{
  const [system,setSystem]=useState(replaceSystemMacros(props.system,props.system.macros))
    const { classes } = props;

    return (
      <div style={{ paddingRight: 12 }} >



        <Grid style={{ paddingLeft: 12, paddingRight: 24, }} container spacing={2}>
          <Grid item xs={11}>

            {system.displayName}

          </Grid>
          <Grid item xs={1}>


            <Close fontSize="small" onClick={props.handleCloseEditor} />

          </Grid>
        </Grid>

        <Paper style={{ padding: 12 }} elevation={props.theme.palette.paperElevation} >



          <Grid container
            direction="row"
            justify="flex-start"
            alignItems="center" spacing={1}>
            <Grid item xs={6}  >
              <TextInput pv={system.setpointPv} prec={3} label={'Setpoint:'} alarmSensitive={true} usePvUnits={true} usePvMinMax={true} />

            </Grid>
            <Grid item xs={6}  >
              <TextOutput style={{ marginRight: 10 }} pv={system.readbackPv} prec={3} usePvUnits={true} alarmSensitive={true} label={'Readback'} />


            </Grid>
            {system.scanPv&&<Grid item xs={6}>
              <SelectionInput  pv={system.scanPv} macros={props['macros']}  label={'Scan rate'} useStringValue={true}/>
            </Grid>}
            {system.orocPv&&<Grid item xs={6}>
              <TextOutput  pv={system.orocPv} macros={props['macros']}    label={'OROC'}/>
            </Grid>}

            <Grid item xs={12}  >

              <Slider pv={system.setpointPv} prec={3} label={'Setpoint:'} alarmSensitive={true} usePvUnits={true} usePvMinMax={true} />
            </Grid>
            <Grid item xs={6}  >

            </Grid>
            <Grid item xs={12}  >

            </Grid>






            <Grid item xs={12}  >
              <Grid container justify="flex-start" direction="row" alignItems="center" spacing={1}>
                <Grid item xs={12} sm={12} >
                  <ThumbWheel
                    pv={system.setpointPv}
                    macros={props['macros']}
                    prec_integer={2}
                    prec_decimal={2}
                  />

                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}  >
             




            </Grid>
            <Grid item xs={4}  >





            </Grid>
            <Grid item xs={4}  >

              <Button component={Link} to={{
                pathname: "/AdvancedSettingsSinglePS",
                search: JSON.stringify(system),
                state: ["sdas"],
                data: "hello2"
              }} target="_blank" color="primary" style={{ width: "100%" }} variant='contained'>  Settings </Button>

            </Grid>
            <Grid item xs={12}  >
              <ToggleButton pv={system.onOffPv} macros={props['macros']} labelPlacement={"top"} label="Device Power"/>





            </Grid>
            {system.rampRatePv&&<Grid item xs={12}>
          <SelectionInput   pv={system.rampRatePv}  macros={props['macros']} label={'OROC'} />
          </Grid>}
            <Grid item xs={12}>
            <TextOutput  pv={system.setpointPv}     macros={props['macros']}  displayTimeStamp label={'Setpoint timestamp'}/>
          </Grid>


          </Grid>

        </Paper>


      </div>

    );
  }



export default withStyles(styles, { withTheme: true })(EditorSinglePS)
