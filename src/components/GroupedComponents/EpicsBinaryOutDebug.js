import React from 'react'

import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import TextInput from '../BaseComponents/TextInput';
import TextOutput from '../BaseComponents/TextOutput';
import SwitchComponent from '../BaseComponents/SwitchComponent';
import StyledIconButton from '../BaseComponents/StyledIconButton';
import StyledIconIndicator from '../BaseComponents/StyledIconIndicator';
import Grid from '@material-ui/core/Grid';
//import MenuItem from '@material-ui/core/MenuItem';



class EpicsBinaryOutDebug extends React.Component {
  constructor(props) {
    super(props);
    this.state={}

    }




  render() {


    return (

      <Grid container direction='row' spacing={2}>
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
        <Grid item  xs={12}>
        <SwitchComponent pv='pva://$(device)' macros={this.props['macros']} label={'Toggle Switch:'}/>
        </Grid>
        <Grid item  xs={12}>
        <StyledIconButton  pv='pva://$(device)'macros={this.props['macros']} label={'Indicator button'} labelPlacement={'end'}/>
          </Grid>
          <Grid item  xs={12}>
          <StyledIconIndicator  pv='pva://$(device)'macros={this.props['macros']} label={'Indicator'} labelPlacement={'end'} onColor='green' offColor='red'/>
            </Grid>

            <Grid item  xs={12}>
            <StyledIconIndicator  pv='pva://$(device)'macros={this.props['macros']} label={'Indicator'} labelPlacement={'end'} onColor='secondary'/>
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
