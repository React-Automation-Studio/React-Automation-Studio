import React from 'react'
import TextInput from '../BaseComponents/TextInput';
import TextOutput from '../BaseComponents/TextOutput';
import TextUpdate from '../BaseComponents/TextUpdate';
import Grid from '@mui/material/GridLegacy';

const EpicsStringOutDebug = (props) => {
  return (
    <Grid container direction='row' spacing={2}>
      <Grid item  xs={12}>
        <TextOutput  pv='$(device).NAME' macros={props['macros']}  label={'EPICS PV Name:'}/>
      </Grid>
      <Grid item  xs={12}>
        <TextOutput  pv='$(device)'      macros={props['macros']}  label={'EPICS PV Value:'} />
      </Grid>
        <Grid item  xs={12}>
      <TextInput   pv='$(device)'      macros={props['macros']}  label={'Type here to change:'}/>
      </Grid>
      <Grid item xs={12}  >
        <TextOutput  pv='$(device)'      macros={props['macros']}  label={'EPICS PV Timestamp:'} displayTimeStamp />
      </Grid>
      <Grid item xs={12} >
        <TextOutput  pv='$(device)'      macros={props['macros']}  label={'EPICS PV Host:'} displayMetaData={'host'} />
      </Grid>
      <Grid item  xs={12}>
        <TextUpdate  pv='$(device)'      macros={props['macros']}  label={'Text Update: '} />
      </Grid>
    </Grid>
  );
}

export default EpicsStringOutDebug
