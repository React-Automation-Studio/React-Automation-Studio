import React from 'react'

import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import TextInput from '../ExperimentalBaseComponents/TextInput';
import SelectionInput from '../ExperimentalBaseComponents/SelectionInput';
import SelectionList from '../ExperimentalBaseComponents/SelectionList';
import TextOutput from '../ExperimentalBaseComponents/TextOutput';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import RadioButtonGroup from '../BaseComponents/RadioButtonGroup';
//import MenuItem from '@material-ui/core/MenuItem';


const styles = theme => ({
  root: {
    padding: 0,
    spacing: 0,
    overflowX: "hidden",
    overflowY: "hidden",
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
  },
});

class EpicsMbboDebug extends React.Component {
  constructor(props) {
    super(props);
    this.state={}

    }





  render() {

const {classes}= this.props;
    return (
      <Grid container   spacing={2}       direction="row"  justify="flex-start"  alignItems="center"       >

        <Grid item  xs={12}>
          <TextOutput  pv='pva://$(device).NAME' macros={this.props['macros']}  label={'EPICS PV Name:'}/>
        </Grid>
        <Grid item  xs={12}>
          <TextOutput  pv='pva://$(device).DESC' macros={this.props['macros']}  label={'EPICS PV DESC:'}/>
        </Grid>
        <Grid item  xs={12}>
          <TextOutput  pv='pva://$(device)'      macros={this.props['macros']}  useStringValue={true} label={'EPICS PV String Value:'} />
        </Grid>
        <Grid item  xs={12}>
          <TextOutput  pv='pva://$(device)'      macros={this.props['macros']}  label={'EPICS PV Numerical Value:'}/>
        </Grid>
        <Grid item  xs={12}>
          <TextInput   pv='pva://$(device)'      macros={this.props['macros']}  label={'EPICS PV Numerical Setpoint:'}/>
        </Grid>
        <Grid item  xs={12}>
          <TextInput   pv='pva://$(device)'      macros={this.props['macros']}  useStringValue={true}  label={'EPICS PV String Setpoint:'}/>
        </Grid>
        <Grid item  xs={12}>
          <SelectionInput   pv='pva://$(device)'      macros={this.props['macros']}    usePvLabel={true} useStringValue={true} custom_selection_strings={this.props.custom_selection_strings}/>
        </Grid>
        <Grid item  xs={12}>
          <TextOutput  pv='pva://$(device).ZRST'      macros={this.props['macros']}  label={'EPICS PV ZRST:'}/>
        </Grid>
        <Grid item  xs={12}>
          <TextOutput  pv='pva://$(device).ONST'      macros={this.props['macros']}  label={'EPICS PV ONST:'}/>
        </Grid>
        <Grid item  xs={6}>
          <SelectionList   pv='pva://$(device)'      macros={this.props['macros']}    usePvLabel={true} useStringValue={true} custom_selection_strings={this.props.custom_selection_strings}/>
        </Grid>
        <Grid item  xs={6}>
          <RadioButtonGroup   pv='pva://$(device)'      macros={this.props['macros']}    usePvLabel={true} useStringValue={true} custom_selection_strings={this.props.custom_selection_strings}/>
        </Grid>
        <Grid item  xs={12}>
          <SelectionList horizontal  pv='pva://$(device)'      macros={this.props['macros']}    usePvLabel={true} useStringValue={true} custom_selection_strings={this.props.custom_selection_strings}/>
        </Grid>
        </Grid>












    );
  }
}

EpicsMbboDebug.contextType=AutomationStudioContext;
export default withStyles(styles)(EpicsMbboDebug)
