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
import SelectionList from '../BaseComponents/SelectionList';

import Grid from '@material-ui/core/Grid';
import EpicsPV from '../SystemComponents/EpicsPV';
import TestComponent from '../BaseComponents/TestComponent';
import SwitchComponent from '../BaseComponents/SwitchComponent';
import SelectionInput from '../BaseComponents/SelectionInput';
import ToggleButton from '../BaseComponents/ToggleButton';
import ActionButton from '../BaseComponents/ActionButton';
import ThumbWheel from '../BaseComponents/ThumbWheel';
import ControlRightEx1 from '../ControlScreens/GridComponents/ControlRightEx1'
import ControlTopEx1 from '../ControlScreens/GridComponents/ControlTopEx1'
import ControlBottomEx1 from '../ControlScreens/GridComponents/ControlBottomEx1'
import GraphMultiplePVs from '../BaseComponents/GraphMultiplePVs';
import SideBar from '../SystemComponents/SideBar';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 0 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 0
  },
  paper: {
    padding: 0,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height:"100%"
  },
  button: {
    //height:'33.33%',
    flexGrow:1,
    //height:"100%",
    color:'primary',
    borderRadius: 4,
    border: 1,

  },
  list: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    height:"80vh",

    borderRadius: 4,
    border: 1,

  },
});
class JustinTest1 extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };


  render() {
    //  console.log("state: ",this.state);
    const { classes } = this.props;
    console.log('classes justin test1',classes)
    const { value } = this.state;
    return (
      <Grid container className={classes.root} direction='row' alignItems='stretch' justify='center' spacing={0}>
        <Grid item xs={6} style={{backgroundColor:"red", height:"100vh"}}>
        </Grid>
        <Grid item xs={6} style={{backgroundColor:"blue"}}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={this.handleChange}
              variant="standard"
              indicatorColor="primary"
              textColor="primary"
              >
                <Tab label="STATE" />
                <Tab label="SDOs" />
              </Tabs>
            </AppBar>
            {/* {value === 0 && <TabContainer key='TabContainer0'>States</TabContainer>} */}
            {value === 0 && <TabContainer key='TabContainer0'>
              <Grid container spacing={0} direction='row' alignItems='stretch' justify='center'>
                <Grid item xs={3} style={{backgroundColor:"green", height:"100%"}}>
                  <div >
                    <SelectionList classes={{button:classes.button, list:classes.list}}  pv='pva://RFPA:IPA_TUNE_MOT:snlState'      macros={this.props['macros']}   usePvLabel={true} useStringValue={true}/>
                  </div>

                </Grid>
                <Grid item xs={9} style={{backgroundColor:"yellow",}}>
                  <Grid container spacing={0} direction='column' alignItems='stretch' justify='center'>
                    <Grid item xs={12} style={{height:"100%"}}>
                      <Paper className={classes.paper} square={true}>POR</Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper className={classes.paper} square={true}>CL</Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper className={classes.paper} square={true}>OL</Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </TabContainer>}
            {value === 1 && <TabContainer key='TabContainer1'>SDOs</TabContainer>}
          </Grid>
        </Grid>

      );
    }
  }

  JustinTest1.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(JustinTest1);
  //export default JustinTest1;
