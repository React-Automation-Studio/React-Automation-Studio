//This example is deprecated and will be removed in a future release 
import React, { useContext } from 'react'

import AutomationStudioContext from '../../SystemComponents/AutomationStudioContext';
import TextInput from '../../BaseComponents/TextInput';
import SelectionInput from '../../BaseComponents/SelectionInput';
import TextOutput from '../../BaseComponents/TextOutput';
import Slider from '../../BaseComponents/Slider';
import TextUpdate from '../../BaseComponents/TextUpdate';
import Grid from '@mui/material/GridLegacy';
import ToggleButton from '../../BaseComponents/ToggleButton';
import { useTheme } from '@mui/material/styles';
import ThumbWheel from '../../BaseComponents/ThumbWheel';
import Paper from '@mui/material/Paper';
import Close from '@mui/icons-material/Close';
console.warn("This example is deprecated and will be removed in a future release")

const ControlRightEx1 = (props) => {
  const theme = useTheme();
  const context = useContext(AutomationStudioContext);

  return (
    <div>
      <Grid style={{ paddingLeft: 12,paddingRight: 24,}} container spacing={2}>
        <Grid item xs={11}>
          <TextUpdate  pv='$(device):Setpoint.NAME' macros={props['macros']}  />
        </Grid>
        <Grid item xs={1}>
          <Close  fontSize="small" onClick= {props.handleCloseEditor}/>
        </Grid>
      </Grid>
      <Paper style={{ paddingLeft: 12,paddingTop: 12,paddingRight: 12, marginRight:12}} elevation={theme.palette.paperElevation}>
        <div style={{ "overflowX": "hidden", paddingTop:6}}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextInput   pv='$(device):Setpoint'      macros={props['macros']}  label={'Setpoint:'} alarmSensitive={true}  usePvUnits={true}/>
            </Grid>
            <Grid item xs={6}>
              <TextOutput  pv='$(device):Readback'      macros={props['macros']}    prec={3} usePvUnits={true} alarmSensitive={true} label={'Readback'}/>
            </Grid>
            <Grid item xs={6}>
              <SelectionInput  pv='$(device):SimReadback.SCAN' macros={props['macros']}  label={'Scan rate'} useStringValue={true}/>
            </Grid>
            <Grid item xs={6}>
              <TextOutput  pv='$(device):SimReadback.OROC' macros={props['macros']}    label={'OROC'}/>
            </Grid>
            <Grid item xs={12}>
              <Slider  pv='$(device):Setpoint'      macros={props['macros']} usePvMinMax={true} min={1000} max={500} label={""}  prec={3} />
            </Grid>
            <Grid item xs={12}>
              <ThumbWheel
                pv='$(device):Setpoint'
                macros={props['macros']}
                prec_integer={3}
                prec_decimal={2}
              />
            </Grid>
            <Grid item xs={12}>
              <ToggleButton pv='$(device):On' macros={props['macros']} label={"Device Power"} labelPlacement={"top"}  />
            </Grid>
            <Grid item xs={12}>
              <SelectionInput   pv='$(device):RampRate'  macros={props['macros']} label={'OROC'} />
            </Grid>
            <Grid item xs={12}>
              <TextOutput  pv='$(device):Setpoint'      macros={props['macros']}  displayTimeStamp label={'Setpoint timestamp'}/>
            </Grid>
          </Grid>
          <br/>
        </div>
      </Paper>
    </div>
  );
};

export default ControlRightEx1;
