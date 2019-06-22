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

import QuadrapoleMagnet from '../../SvgComponents/QuadrapoleMagnet';
import Harp from '../../SvgComponents/Harp';
import FC from '../../SvgComponents/FC';
import SvgElementTest from '../../SvgComponents/SvgElementTest';
//import MenuItem from '@material-ui/core/MenuItem';
import HorizontalBeamline from '../../SvgComponents/HorizontalBeamline';


class ControlBottomHarp1 extends React.Component {
  constructor(props) {
    super(props);
    this.state={}


    this.handleOnClick= this.handleOnClick.bind(this);
  }


  handleOnClick(device){
//  console.log("in control top clicked "+device.toString());
    this.props.handlePsOnClick(device);
    //this.props.handlePsOnClick(device);
    //  this.setState({ ['clicked']: 1});
  };
  render() {


    return (
      <Grid   container  justify="flex-start" direction="row"    alignItems="center" spacing={0}>
        <Grid item xs={3} sm={3}>


          <div style={{height:'60px','width':'200px'}}>

            <ToggleButton pv='pva://$(device)$(number)$(line):put-outIn'  macros={{'$(device)':'harp','$(number)':'5','$(line)':'p'}} usePvLabel={true} labelPlacement={"top"}/>
            <br/>
            <ActionButton   pv='pva://$(device)$(number)$(line):$(xOrY)_store_offset'  macros={{'$(device)':'harp','$(number)':'5','$(line)':'p','$(xOrY)':'x'}}   label={"Store Offset"} labelPlacement={"top"} actionValue={"1"} actionString={"Store Offset"}/>
              <SelectionInput  pv='pva://$(device)$(number)$(line):$(xOrY)raw.SCAN'   macros={{'$(device)':'harp','$(number)':'5','$(line)':'p','$(xOrY)':'x'}} label={'Scan rate'} useStringValue={true}/>
              <br/>
              <TextInput   pv='pva://$(device)$(number)$(line):$(xOrY)range'  macros={{'$(device)':'harp','$(number)':'5','$(line)':'p','$(xOrY)':'x'}}   usePvLabel={true}/>
              <SelectionInput   pv='pva://$(device)$(number)$(line):$(xOrY)range'  macros={{'$(device)':'harp','$(number)':'5','$(line)':'p','$(xOrY)':'x'}}      useStringValue={true} custom_selection_strings={['1','2','3','4','5','6']}/>
            <br/>
            <div>
              Command:
              <TextUpdate pv='pva://$(device)$(number)$(line):put-outIn'  macros={{'$(device)':'harp','$(number)':'5','$(line)':'p'}}   usePvLabel={true} useStringValue={true}/>
              Status:
              <TextUpdate pv='pva://$(device)$(number)$(line):get-statusText' macros={{'$(device)':'harp','$(number)':'5','$(line)':'p'}}  usePvLabel={true} useStringValue={true}/>
            </div>
          </div>

        </Grid>
        <Grid item xs={3} sm={2}>

        <div style={{height:'60px','width':'200px'}}>
          <ToggleButton pv='pva://$(device)$(number)$(line):put-outIn'  macros={{'$(device)':'harp','$(number)':'5','$(line)':'p'}} usePvLabel={true} labelPlacement={"top"}/>
          <br/>
            <SelectionInput  pv='pva://$(device)$(number)$(line):$(xOrY)raw.SCAN'   macros={{'$(device)':'harp','$(number)':'5','$(line)':'p','$(xOrY)':'y'}} label={'Scan rate'} useStringValue={true}/>
            <br/>
            <TextInput   pv='pva://$(device)$(number)$(line):$(xOrY)range'  macros={{'$(device)':'harp','$(number)':'5','$(line)':'p','$(xOrY)':'y'}}   usePvLabel={true}/>
            <SelectionInput   pv='pva://$(device)$(number)$(line):$(xOrY)range'  macros={{'$(device)':'harp','$(number)':'5','$(line)':'p','$(xOrY)':'y'}}      useStringValue={true} custom_selection_strings={['1','2','3','4','5','6']}/>
          <br/>
          <div>
            Command:
            <TextUpdate pv='pva://$(device)$(number)$(line):put-outIn'  macros={{'$(device)':'harp','$(number)':'5','$(line)':'p'}}   usePvLabel={true} useStringValue={true}/>
            Status:
            <TextUpdate pv='pva://$(device)$(number)$(line):get-statusText' macros={{'$(device)':'harp','$(number)':'5','$(line)':'p'}}  usePvLabel={true} useStringValue={true}/>
          </div>
        </div>

        </Grid>
        <Grid item xs={3} sm={2}>


          <div style={{height:'60px','width':'100px'}}>
            <ToggleButton pv='pva://testIOC:BeamlineA:InUse'  label={"BL A in use"} labelPlacement={"top"}/>
          </div>
          <div style={{height:'60px','width':'100px'}}>
            <ToggleButton pv='pva://testIOC:BeamlineB:InUse'  label={"BL B in use"}  labelPlacement={"top"}/>
          </div>
          <div style={{height:'60px','width':'100px'}}>
            <ToggleButton pv='pva://testIOC:BeamlineC:InUse'  label={"BL C in use"} labelPlacement={"top"}/>
          </div>
          <div style={{height:'60px','width':'100px'}}>
            <ToggleButton pv='pva://testIOC:BeamlineD:InUse'  label={"BL D in use"} labelPlacement={"top"}/>
          </div>
        </Grid>
        <Grid item xs={3} sm={2}>


          <div style={{height:'60px','width':'100px'}}>
            <ToggleButton pv='pva://testIOC:BeamlineA:BeamOn'  label={"Beam On"} labelPlacement={"top"}/>
          </div>


        </Grid>
        </Grid>

);
}
}

ControlBottomHarp1.contextType=AutomationStudioContext;
export default ControlBottomHarp1
