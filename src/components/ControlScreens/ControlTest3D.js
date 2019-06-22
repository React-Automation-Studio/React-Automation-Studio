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
import ThumbWheel from '../BaseComponents/ThumbWheel';
import ControlRightEx1 from '../ControlScreens/GridComponents/ControlRightEx1'
import ControlTopEx1 from '../ControlScreens/GridComponents/ControlTopEx1'
import ControlBottomEx1 from '../ControlScreens/GridComponents/ControlBottomEx1'
import SideBar from '../SystemComponents/SideBar';
import ThreeScene from '../..//api/ThreeScene';
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
class ControlTest3D extends React.Component {
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
            <Grid item sm={12}>
              <div style={{height:'50vh',marginLeft:'25px'}}>
                {/*}<GraphTest style pv='pva://testIOC:test4'  />*/}
                <ThreeScene/>
              </div>
            </Grid>

          </Grid>
          <div style={{height:'25vh',marginLeft:'25px'}}>
            <div style={{height:'50px',width:'400px'}}>
              <SimpleSlider  pv='pva://testIOC:Cube1:xRotation'      macros={this.props['macros']} usePvMinMax={true} min={1000} max={500} usePvLabel={true} usePrecision={true} step={0.1} prec={3} />
              <SimpleSlider  pv='pva://testIOC:Cube1:yRotation'      macros={this.props['macros']} usePvMinMax={true} min={1000} max={500} usePvLabel={true} usePrecision={true} step={0.1} prec={3} />
            </div>
          </div>
        </Grid>

        <Grid item sm={3} >
          {((this.state['displayEditor']===true) &&(this.state['editorMacros']['$(device)']==='testIOC:PS1'))&&<ControlRightEx1 macros={this.state['editorMacros']}/>}
          {((this.state['displayEditor']===true) &&(this.state['editorMacros']['$(device)']==='testIOC:PS2'))&&<ControlRightEx1 macros={this.state['editorMacros']}/>}
          {((this.state['displayEditor']===true) &&(this.state['editorMacros']['$(device)']==='testIOC:PS3'))&&<ControlRightEx1 macros={this.state['editorMacros']}/>}
        </Grid>
      </Grid>




    </div>





        );
        }
        }

        ControlTest3D.propTypes = {
          classes: PropTypes.object.isRequired,
        };

        export default withStyles(styles)(ControlTest3D);
        //export default ControlTest3D;
