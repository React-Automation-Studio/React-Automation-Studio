import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import EpicsBinaryOutDebug from '../GroupedComponents/EpicsBinaryOutDebug';
import EpicsAnalogOutDebug from '../GroupedComponents/EpicsAnalogOutDebug';
import EpicsMbboDebug from '../GroupedComponents/EpicsMbboDebug';
import TextUpdate from '../BaseComponents/TextUpdate';
import TextInput from '../BaseComponents/TextInput';
import TextOutput from '../BaseComponents/TextOutput';
import SimpleSlider from '../BaseComponents/SimpleSlider';
import GraphTest from '../william/GraphTest';

import Grid from '@material-ui/core/Grid';
import EpicsPV from '../SystemComponents/EpicsPV';

import SwitchComponent from '../BaseComponents/SwitchComponent';
import SelectionInput from '../BaseComponents/SelectionInput';
import ToggleButton from '../BaseComponents/ToggleButton';
import ActionButton from '../BaseComponents/ActionButton';
import ArrowButton from '../BaseComponents/ArrowButton';
import ControlRightEx1 from '../ControlScreens/GridComponents/ControlRightEx1'
import ControlTopEx1 from '../ControlScreens/GridComponents/ControlTopEx1'
import ControlBottomEx1 from '../ControlScreens/GridComponents/ControlBottomEx1'
import GraphMultiplePVs from '../BaseComponents/GraphMultiplePVs';
import SideBar from '../SystemComponents/SideBar';
import AppBar from '@material-ui/core/AppBar';
const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1) * 2
  },
  paper: {
    padding: theme.spacing(1) * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});
class ControlTest1 extends React.Component {
  constructor(props) {
    super(props);
    this.state={'editorType':'PS',
    'displayEditor':false,
    'editorMacros':{'$(device)':""}
  }
  this.handlePsOnClick= this.handlePsOnClick.bind(this);
}

handlePsOnClick(name){

  //  console.log("in control test1 clicked "+name.toString());
  this.setState({['editorType']:'PS',
  ['displayEditor']:true,
  ['editorMacros']:{'$(device)':name}});

  //  this.setState({ ['clicked']: 1});
}
render() {
  //  console.log("state: ",this.state);
  const { classes } = this.props;
  return (
    <div>
      <SideBar/>
      <Grid container spacing={3}>

        <Grid item sm={9}>
          <div style={{height:'25vh'}}>



            <ControlTopEx1
              macros={{
                '$(PS1)':'testIOC:PS1',
                '$(PS2)':'testIOC:PS2',
                '$(PS3)':'testIOC:PS3'
              }}
              handlePsOnClick={this.handlePsOnClick}
            />


          </div>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item sm={6}>
              <div style={{height:'50vh'}}>
                <GraphMultiplePVs
                  pvs={['pva://testIOC:PS1:Readback','pva://testIOC:PS2:Readback','pva://testIOC:PS3:Readback'  ]}
                  maxLength={600}
                  legend = {[
                    'Q1 readback',
                    'Q2 readback',
                    'Q3 readback',
                  ]}
                  yUnits={' A'}
useTimeStamp={true}
usePolling={true}
pollingRate={100}
                />
                {/*}<GraphTest style pv='pva://testIOC:test4'  />*/}
              </div>
            </Grid>
            <Grid item sm={6}>
              <div style={{height:'50vh'}}>
                {/*}  <GraphMultiplePVs
                  pvs={[
                  'pva://testIOC:PS1:Readback:History',
                  'pva://testIOC:PS2:Readback:History',
                  'pva://testIOC:PS3:Readback:History',
                  'pva://testIOC:PS4:Readback:History',
                  'pva://testIOC:STR1:X:Readback:History'

                  ]}

                  legend = {[
                  'PS1',
                  'PS2',
                  'PS3',
                  'PS4',
                  'STR1:X',

                  ]}

                />*/}
                <GraphMultiplePVs
                  pvs={[
                    'pva://testIOC:PS1:Setpoint',
                    'pva://testIOC:PS2:Setpoint',
                    'pva://testIOC:PS3:Setpoint',

                  ]}

                  maxLength={600}
                  usePolling={true}
                  pollingRate={100}
                  legend = {[
                    'Q1 setpoint',
                    'Q2 setpoint',
                    'Q3 setpoint',


                  ]}
                  yUnits={' A'}
                  useTimeStamp={true}

                />
                  {/*  <GraphTest style pv='pva://testIOC:PS1:Readback:History'  />*/}
                </div>
              </Grid>
            </Grid>
            <div style={{height:'25vh'}}>
              <ControlBottomEx1/>
            </div>
          </Grid>

          <Grid item sm={3} >
            {((this.state['displayEditor']===true) &&(this.state['editorMacros']['$(device)']==='testIOC:PS1'))&&<ControlRightEx1 macros={this.state['editorMacros']}/>}
            {((this.state['displayEditor']===true) &&(this.state['editorMacros']['$(device)']==='testIOC:PS2'))&&<ControlRightEx1 macros={this.state['editorMacros']}/>}
            {((this.state['displayEditor']===true) &&(this.state['editorMacros']['$(device)']==='testIOC:PS3'))&&<ControlRightEx1 macros={this.state['editorMacros']}/>}
            {((this.state['displayEditor']===true) &&(this.state['editorMacros']['$(device)']==='testIOC:PS4'))&&<ControlRightEx1 macros={this.state['editorMacros']}/>}
            {((this.state['displayEditor']===true) &&(this.state['editorMacros']['$(device)']==='testIOC:STR1:X'))&&<ControlRightEx1 macros={this.state['editorMacros']}/>}
          </Grid>
        </Grid>




      </div>





      );
      }
      }

      ControlTest1.propTypes = {
        classes: PropTypes.object.isRequired,
      };

      export default withStyles(styles)(ControlTest1);
      //export default ControlTest1;
