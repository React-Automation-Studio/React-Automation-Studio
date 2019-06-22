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


class ControlBottomEx1 extends React.Component {
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
        <Grid item xs={3} sm={2}>


          <div style={{height:'60px','width':'100px'}}>
            <ToggleButton pv='pva://testIOC:Harp1:InOut'   label={"Harp1"} labelPlacement={"top"}/>
          </div>
          <div style={{height:'60px','width':'100px'}}>
            <ToggleButton pv='pva://testIOC:Harp2:InOut'  label={"Harp2"} labelPlacement={"top"}/>
          </div>
          <div style={{height:'60px','width':'100px'}}>
            <ToggleButton pv='pva://testIOC:Harp3:InOut'  label={"Harp3"} labelPlacement={"top"}/>
          </div>
        </Grid>
        <Grid item xs={3} sm={2}>


          <div style={{height:'60px','width':'100px'}}>
            <ToggleButton pv='pva://testIOC:FC1:InOut'  label={"FC1"} labelPlacement={"top"}/>
          </div>
          <div style={{height:'60px','width':'100px'}}>
            <ToggleButton pv='pva://testIOC:FC2:InOut'  label={"FC2"} labelPlacement={"top"}/>
          </div>
          <div style={{height:'60px','width':'100px'}}>
            <ToggleButton pv='pva://testIOC:FC3:InOut'  label={"FC3"} labelPlacement={"top"}/>
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

ControlBottomEx1.contextType=AutomationStudioContext;
export default ControlBottomEx1
