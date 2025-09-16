import React from 'react'

import TextInput from '../BaseComponents/TextInput';
import TextOutput from '../BaseComponents/TextOutput';
import Grid from '@mui/material/GridLegacy';


const EpicsAnalogOutDebug = (props) => {
  return (
    <Grid container direction='row' spacing={2}>
      <Grid item  xs={12}>
        <TextOutput  pv='$(device).NAME' macros={props['macros']}  label={'EPICS PV Name:'}/>
      </Grid>
      <Grid item  xs={12}>
        <TextOutput  pv='$(device)'      macros={props['macros']}  label={'EPICS PV Value:'} alarmSensitive={true}/>
      </Grid>
        <Grid item  xs={12}>
      <TextInput   pv='$(device)'      macros={props['macros']}  label={'EPICS PV Setpoint:'} alarmSensitive={true}/>
      </Grid>
        <Grid item  xs={12}>
            <TextOutput  pv='$(device).DRVH'      macros={props['macros']}  label={'EPICS PV DRVH:'}/>
      </Grid>
      <Grid item  xs={12}>
        <TextOutput  pv='$(device).DRVL'      macros={props['macros']}  label={'EPICS PV DRVL:'}/>
      </Grid>
      <Grid item xs={12}  >
        <TextOutput  pv='$(device)'      macros={props['macros']}  label={'EPICS PV Timestamp:'} displayTimeStamp />
      </Grid>
      <Grid item xs={12} >
        <TextOutput  pv='$(device)'      macros={props['macros']}  label={'EPICS PV Host:'} displayMetaData={'host'} />
      </Grid>
    </Grid>
  );
}

export default EpicsAnalogOutDebug
