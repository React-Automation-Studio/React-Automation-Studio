import React from 'react'

import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import TextInput from '../ExperimentalBaseComponents/TextInput';
import TextOutput from '../ExperimentalBaseComponents/TextOutput';
import SwitchComponent from '../ExperimentalBaseComponents/SwitchComponent';
import StyledIconButton from '../ExperimentalBaseComponents/StyledIconButton';
import StyledIconIndicator from '../ExperimentalBaseComponents/StyledIconIndicator';
import SelectionInput from '../ExperimentalBaseComponents/SelectionInput';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '../ExperimentalBaseComponents/ToggleButton';
import RadioButton from '../ExperimentalBaseComponents/RadioButton';
import CheckBox from '../ExperimentalBaseComponents/CheckBox';
//import MenuItem from '@material-ui/core/MenuItem';



class EpicsBinaryOutDebug extends React.Component {
  constructor(props) {
    super(props);
    this.state={}

  }




  render() {


    return (

      <Grid spacing={2} container direction="row"  justify="flex-start"  alignItems="center" >
        <Grid item  xs={12}>
          <TextOutput  pv='pva://$(device).NAME' macros={this.props['macros']}  label={'EPICS PV Name:'}/>
        </Grid>
        <Grid item  xs={12}>
          <TextOutput  pv='pva://$(device).DESC' macros={this.props['macros']}  label={'EPICS PV DESC:'}/>
        </Grid>
        <Grid item  xs={12}>
          <TextOutput  pv='pva://$(device)'      macros={this.props['macros']}  label={'EPICS PV Value:'}/>
        </Grid>
        <Grid item  xs={12}>
          <TextInput   pv='pva://$(device)'      macros={this.props['macros']}  label={'EPICS PV Setpoint:'}/>
        </Grid>
        <Grid item  xs={12}>
          <TextOutput  pv='pva://$(device).ZNAM'      macros={this.props['macros']}  label={'EPICS PV ZNAM:'}/>
        </Grid>
        <Grid item  xs={12}>
          <TextOutput  pv='pva://$(device).ONAM'      macros={this.props['macros']}  label={'EPICS PV ONAM:'}/>
        </Grid>
        <Grid item xs={12}  >
          <TextOutput  pv='pva://$(device)'      macros={this.props['macros']}  label={'EPICS PV Timestamp:'} displayTimeStamp />
        </Grid>
        <Grid item xs={12} >
          <TextOutput  pv='pva://$(device)'      macros={this.props['macros']}  label={'EPICS PV Host:'} displayMetaData={'host'} />
        </Grid>
        <Grid item  xs={6}>

          <SwitchComponent pv='pva://$(device)' macros={this.props['macros']} label={'Toggle Switch:'}/>

        </Grid>
        <Grid item  xs={6}>

          <CheckBox pv='pva://$(device)' macros={this.props['macros']} label={'Check Box:'}/>
        </Grid>
        <Grid item  xs={6}>

          <RadioButton pv='pva://$(device)' macros={this.props['macros']} label={'Radio Button:'} />
        </Grid>

        <Grid item  xs={6}>
          <StyledIconButton  pv='pva://$(device)'macros={this.props['macros']} label={'Indicator button'} labelPlacement={'start'}/>
        </Grid>
        <Grid item  xs={6}>
          <SelectionInput   pv='pva://$(device)'      macros={this.props['macros']}    usePvLabel={true} useStringValue={true}/>
        </Grid>
        <Grid item  xs={6}>
          <ToggleButton  pv='pva://$(device)'macros={this.props['macros']}  labelPlacement={'end'} />
        </Grid>
        <Grid item  xs={12}>
          <StyledIconIndicator  pv='pva://$(device)'macros={this.props['macros']} label={'Indicator'} labelPlacement={'end'} onColor='green' offColor='red'/>
        </Grid>



        <Grid item  xs={12}>
          <StyledIconIndicator  pv='pva://$(device)'macros={this.props['macros']} label={'Indicator'} labelPlacement={'end'} onColor='primary' offColor='secondary'/>
        </Grid>
        <Grid item  xs={12}>
          <StyledIconIndicator  pv='pva://$(device)'macros={this.props['macros']} label={'Indicator'} labelPlacement={'end'} onColor='lightgreen' offColor='red'/>
        </Grid>

      </Grid>
















    );
  }
}

EpicsBinaryOutDebug.contextType=AutomationStudioContext;
export default EpicsBinaryOutDebug
