import React from 'react'

import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import TextInput from '../BaseComponents/TextInput';
import SelectionInput from '../BaseComponents/SelectionInput';
import TextOutput from '../BaseComponents/TextOutput';
import SimpleSlider from '../BaseComponents/SimpleSlider';
import TextUpdate from '../BaseComponents/TextUpdate';
import Grid from '@material-ui/core/Grid';
import SwitchComponent from '../BaseComponents/SwitchComponent';
import ToggleButton from '../BaseComponents/ToggleButton';
import ActionButton from '../BaseComponents/ActionButton';
import ArrowButton from '../BaseComponents/ArrowButton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import GraphMultiplePVs from '../BaseComponents/GraphMultiplePVs';
//import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  body1: theme.typography.body1,


});

class SettingsSinglePS extends React.Component {
  constructor(props) {
    super(props);

  }




  render() {
    const {classes}= this.props;
    const pv=JSON.parse(decodeURIComponent(this.props.location.search.substr(1))) ;
    return (
      <Grid   container
        direction="column"
        justify="stretch"
        spacing={2}>
        <Grid item xs={12} sm ={6} lg={4} >
      <div style={{"overflowX": "hidden"}} >
        <div style={{ padding: 24}}>
          <Grid   container
            direction="row"
            justify="space-evenly"
            spacing={2}>
            <Grid item xs={12}  >
              <TextOutput  pv='$(device).NAME' macros={{'$(device)':pv.pvname}}  label={'EPICS PV Name:'}/>
            </Grid>
            <Grid item xs={12}  >
              <TextOutput  pv='$(device).DESC'  macros={{'$(device)':pv.pvname}}  label={'EPICS PV DESC:'}/>
            </Grid>
            <Grid item xs={12}  >
              <div style={{height:'25vh'}}>
                <GraphMultiplePVs
                  pvs={['$(device)']}  macros={{'$(device)':pv.pvname}}
                  maxLength={1000}
                  triggerOnSingleValueChange

                />
              </div>
            </Grid>
            <Grid item xs={12}  >
              <TextOutput  pv='$(device)'       macros={{'$(device)':pv.pvname}}  label={'EPICS PV Value:'} alarmSensitive={true}/>
            </Grid>
            <Grid item xs={12}  >
              <TextOutput  pv='$(device)'       macros={{'$(device)':pv.pvname}}  label={'EPICS PV Timestamp:'} displayTimeStamp />
            </Grid>
            <Grid item xs={12}  >
              <TextInput   pv='$(device)'       macros={{'$(device)':pv.pvname}}  label={'EPICS PV Setpoint:'} alarmSensitive={true}/>
            </Grid>
            <Grid item xs={12}  >
              <SimpleSlider pv='pva://$(device)'  macros={{'$(device)':pv.pvname}} usePvMinMax={true}  label="EPICS PV Setpoint:"  />
            </Grid>
            <Grid item xs={6} >
              <TextOutput  pv='$(device).DRVH'       macros={{'$(device)':pv.pvname}}  label={'EPICS PV DRVH:'}/>
            </Grid>
            <Grid item xs={6} >
              <TextOutput  pv='$(device).DRVL'      macros={{'$(device)':pv.pvname}}  label={'EPICS PV DRVL:'}/>
            </Grid>
            <Grid item xs={6} >
              <TextOutput  pv='$(device).HOPR'       macros={{'$(device)':pv.pvname}}  label={'EPICS PV HOPR:'}/>
            </Grid>
            <Grid item xs={6}  >
              <TextOutput  pv='$(device).LOPR'      macros={{'$(device)':pv.pvname}}  label={'EPICS PV LOPR:'}/>
            </Grid>
          </Grid>
        </div>
      </div>
      </Grid>
      </Grid>





    );
  }
}

SettingsSinglePS.contextType=AutomationStudioContext;
export default withStyles(styles,{withTheme:true})(SettingsSinglePS)
