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


import Grid from '@material-ui/core/Grid';
import EpicsPV from '../SystemComponents/EpicsPV';

import SwitchComponent from '../BaseComponents/SwitchComponent';
import SelectionInput from '../BaseComponents/SelectionInput';
import ToggleButton from '../BaseComponents/ToggleButton';
import ActionButton from '../BaseComponents/ActionButton';
import ThumbWheel from '../BaseComponents/ThumbWheel';

import SideBar from '../SystemComponents/SideBar';
import ThreeScene from '../Experimental/ThreeScene';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';

import {

  makeVisFlexible,

} from 'react-vis';
const FlexibleThreeScene = makeVisFlexible(ThreeScene);
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
class Test3D extends React.Component {
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

      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={1} >
          <SideBar/>
        </Grid>
        <Grid item xs={10} >
          <div style={{textAlign: 'center'}}>
            Epics Control of a 3D Object
            </div>
        </Grid>
        <Grid item xs={1} >

        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} style={{width: '100%', height: '100%' }} >




          <FlexibleThreeScene />

        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} >
          <Card style={{ padding: 12}} >
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              spacing={2}
            >  <Grid item xs={6}  >
              <TextInput   pv='pva://testIOC:Cube1:xRotation'      macros={this.props['macros']} usePvMinMax={true} label="xRotation" usePrecision={true} step={0.01} prec={3}  units={'rad'}/>

            </Grid>
              <Grid item xs={6}  >
                <TextInput   pv='pva://testIOC:Cube1:yRotation'      macros={this.props['macros']} usePvMinMax={true} label="yRotation" usePrecision={true} step={0.01} prec={3}  units={'rad'}/>

              </Grid>
              <Grid item xs={6} >
                <SimpleSlider  pv='pva://testIOC:Cube1:xRotation'      macros={this.props['macros']} usePvMinMax={true} label="xRotation:" usePrecision={true} step={0.01} prec={3} />
              </Grid>

              <Grid item xs={6} >
                <SimpleSlider  pv='pva://testIOC:Cube1:yRotation'      macros={this.props['macros']} usePvMinMax={true}label="yRotation:"  usePrecision={true} step={0.01} prec={3}  />
              </Grid>
            </Grid>
          </Card>
          </Grid>
        </Grid>




      </div>





      );
      }
      }

      Test3D.propTypes = {
        classes: PropTypes.object.isRequired,
      };

      export default withStyles(styles)(Test3D);
      //export default Test3D;
