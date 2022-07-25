import React from 'react'

import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import TextInput from '../BaseComponents/TextInput';
import TextOutput from '../BaseComponents/TextOutput';
import Switch from '../BaseComponents/Switch';
import StyledIconButton from '../BaseComponents/StyledIconButton';
import StyledIconIndicator from '../BaseComponents/StyledIconIndicator';
import SelectionInput from '../BaseComponents/SelectionInput';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '../BaseComponents/ToggleButton';
import RadioButton from '../BaseComponents/RadioButton';
import CheckBox from '../BaseComponents/CheckBox';


class EpicsBinaryOutDebug extends React.Component {
  constructor(props) {
    super(props);
    this.state={}
  }

  render() {
    return (

      <Grid spacing={2} container direction="row"  justifyContent="flex-start"  alignItems="center" >
        <Grid item  xs={12}>
          <TextOutput  pv='$(device).NAME' macros={this.props['macros']}  label={'EPICS PV Name:'}/>
        </Grid>
        <Grid item  xs={12}>
          <TextOutput  pv='$(device).DESC' macros={this.props['macros']}  label={'EPICS PV DESC:'}/>
        </Grid>
        <Grid item  xs={12}>
          <TextOutput  pv='$(device)'      macros={this.props['macros']}  label={'EPICS PV Value:'}/>
        </Grid>
        <Grid item  xs={12}>
          <TextInput   pv='$(device)'      macros={this.props['macros']}  label={'EPICS PV Setpoint:'}/>
        </Grid>
        <Grid item  xs={12}>
          <TextOutput  pv='$(device).ZNAM'      macros={this.props['macros']}  label={'EPICS PV ZNAM:'}/>
        </Grid>
        <Grid item  xs={12}>
          <TextOutput  pv='$(device).ONAM'      macros={this.props['macros']}  label={'EPICS PV ONAM:'}/>
        </Grid>
        <Grid item xs={12}  >
          <TextOutput  pv='$(device)'      macros={this.props['macros']}  label={'EPICS PV Timestamp:'} displayTimeStamp />
        </Grid>
        <Grid item xs={12} >
          <TextOutput  pv='$(device)'      macros={this.props['macros']}  label={'EPICS PV Host:'} displayMetaData={'host'} />
        </Grid>
        <Grid item  xs={6}>
          <Switch pv='$(device)' macros={this.props['macros']} label={'Toggle Switch:'}/>
        </Grid>
        <Grid item  xs={6}>
          <CheckBox pv='$(device)' macros={this.props['macros']} label={'Check Box:'}/>
        </Grid>
        <Grid item  xs={6}>
          <RadioButton pv='$(device)' macros={this.props['macros']} label={'Radio Button:'} />
        </Grid>

        <Grid item  xs={6}>
          <StyledIconButton  pv='$(device)'macros={this.props['macros']} label={'Indicator button'} labelPlacement={'start'} onColor='primary' offColor='secondary'/>
        </Grid>
        <Grid item  xs={6}>
          <SelectionInput   pv='$(device)'      macros={this.props['macros']}    usePvLabel={true} useStringValue={true}/>
        </Grid>
        <Grid item  xs={6}>
          <ToggleButton  pv='$(device)'macros={this.props['macros']}  labelPlacement={'end'} />
        </Grid>
        <Grid item  xs={12}>
          <StyledIconIndicator  pv='$(device)'macros={this.props['macros']} label={'Indicator'} labelPlacement={'end'} onColor='green' offColor='red'/>
        </Grid>

        <Grid item  xs={12}>
          <StyledIconIndicator  pv='$(device)'macros={this.props['macros']} label={'Indicator'} labelPlacement={'end'} onColor='primary' offColor='secondary'/>
        </Grid>
        <Grid item  xs={12}>
          <StyledIconIndicator  pv='$(device)'macros={this.props['macros']} label={'Indicator'} labelPlacement={'end'} onColor='lightgreen' offColor='red'/>
        </Grid>
      </Grid>
    );
  }
}

EpicsBinaryOutDebug.contextType=AutomationStudioContext;
export default EpicsBinaryOutDebug
