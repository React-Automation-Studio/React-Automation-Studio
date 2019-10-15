import React from 'react'

import AutomationStudioContext from '../../SystemComponents/AutomationStudioContext';
import TextInput from '../../BaseComponents/TextInput';
import SelectionInput from '../../BaseComponents/SelectionInput';
import TextOutput from '../../BaseComponents/TextOutput';
import SimpleSlider from '../../BaseComponents/SimpleSlider';
import TextUpdate from '../../BaseComponents/TextUpdate';
import Grid from '@material-ui/core/Grid';
import SwitchComponent from '../../BaseComponents/SwitchComponent';
import ToggleButton from '../../BaseComponents/ToggleButton';
import ActionButton from '../../BaseComponents/ActionButton';

import ThumbWheel from '../../BaseComponents/ThumbWheel';
import Card from '@material-ui/core/Card';
import Close from '@material-ui/icons/Close';
//import MenuItem from '@material-ui/core/MenuItem';



class ControlRightEx1 extends React.Component {
  constructor(props) {
    super(props);
    this.state={}

  }




  render() {


    return (
      <div>

      <Grid style={{ paddingLeft: 12,paddingRight: 24,}} container spacing={2}>
        <Grid item xs={11}>

            <TextUpdate  pv='pva://$(device):Setpoint.NAME' macros={this.props['macros']}  />

        </Grid>
        <Grid item xs={1}>


            <Close  fontSize="small" onClick= {this.props.handleCloseEditor}/>

        </Grid>
      </Grid>

      <Card style={{ paddingLeft: 12,paddingTop: 12,paddingRight: 12, marginRight:12}}>
        <div style={{ "overflowX": "hidden", paddingTop:6}}>

          <Grid container spacing={2}>

            <Grid item xs={6}>
              <TextInput   pv='pva://$(device):Setpoint'      macros={this.props['macros']}  label={'Setpoint:'} alarmSensitive={true}  usePvUnits={true}/>
            </Grid>
            <Grid item xs={6}>
              <TextOutput  pv='pva://$(device):Readback'      macros={this.props['macros']}   usePrecision={true} prec={3} usePvUnits={true} alarmSensitive={true} label={'Readback'}/>
            </Grid>
            <Grid item xs={6}>
              <SelectionInput  pv='pva://$(device):SimReadback.SCAN' macros={this.props['macros']}  label={'Scan rate'} useStringValue={true}/>
            </Grid>
            <Grid item xs={6}>
              <TextOutput  pv='pva://$(device):SimReadback.OROC' macros={this.props['macros']} usePrecision={true}   label={'OROC'}/>
            </Grid>

            <Grid item xs={12}>
              <SimpleSlider  pv='pva://$(device):Setpoint'      macros={this.props['macros']} usePvMinMax={true} min={1000} max={500} label={""} usePrecision={true} prec={3} />
            </Grid>





            <Grid item xs={12}>

              <ThumbWheel
                pv='pva://$(device):Setpoint'
                macros={this.props['macros']}
                prec_integer={3}
                prec_decimal={2}
              />
            </Grid>



            <Grid item xs={12}>
          <ToggleButton pv='pva://$(device):On' macros={this.props['macros']} label={"Device Power"} labelPlacement={"top"}  />
            </Grid>

          <Grid item xs={12}>
          <SelectionInput   pv='pva://$(device):RampRate'  macros={this.props['macros']} label={'OROC'} />
          </Grid>
          <Grid item xs={12}>
            <TextOutput  pv='pva://$(device):Setpoint'      macros={this.props['macros']}  displayTimeStamp label={'Setpoint timestamp'}/>
          </Grid>
          </Grid>
        <br/>
        </div>
      </Card>
 </div>
    );
  }
}

ControlRightEx1.contextType=AutomationStudioContext;
export default ControlRightEx1
