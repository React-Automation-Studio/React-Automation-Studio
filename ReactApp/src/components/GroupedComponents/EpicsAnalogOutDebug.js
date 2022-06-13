import React from 'react'

import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import TextInput from '../BaseComponents/TextInput';
import TextOutput from '../BaseComponents/TextOutput';
import Grid from '@material-ui/core/Grid';


class EpicsAnalogOutDebug extends React.Component {
  constructor(props) {
    super(props);
    this.state={}
  }

  render() {
    return (
      <Grid container direction='row' spacing={2}>
        <Grid item  xs={12}>
          <TextOutput  pv='$(device).NAME' macros={this.props['macros']}  label={'EPICS PV Name:'}/>
        </Grid>
        <Grid item  xs={12}>
          <TextOutput  pv='$(device)'      macros={this.props['macros']}  label={'EPICS PV Value:'} alarmSensitive={true}/>
        </Grid>
          <Grid item  xs={12}>
        <TextInput   pv='$(device)'      macros={this.props['macros']}  label={'EPICS PV Setpoint:'} alarmSensitive={true}/>
        </Grid>
          <Grid item  xs={12}>
              <TextOutput  pv='$(device).DRVH'      macros={this.props['macros']}  label={'EPICS PV DRVH:'}/>
        </Grid>
        <Grid item  xs={12}>
          <TextOutput  pv='$(device).DRVL'      macros={this.props['macros']}  label={'EPICS PV DRVL:'}/>
        </Grid>
        <Grid item xs={12}  >
          <TextOutput  pv='$(device)'      macros={this.props['macros']}  label={'EPICS PV Timestamp:'} displayTimeStamp />
        </Grid>
        <Grid item xs={12} >
          <TextOutput  pv='$(device)'      macros={this.props['macros']}  label={'EPICS PV Host:'} displayMetaData={'host'} />
        </Grid>
      </Grid>
    );
  }
}

EpicsAnalogOutDebug.contextType=AutomationStudioContext;
export default EpicsAnalogOutDebug
