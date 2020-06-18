import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import EpicsBinaryOutDebug from '../../GroupedComponents/EpicsBinaryOutDebug';
import EpicsAnalogOutDebug from '../../GroupedComponents/EpicsAnalogOutDebug';
import EpicsMbboDebug from '../../GroupedComponents/EpicsMbboDebug';
import TextUpdate from '../../BaseComponents/TextUpdate';
import TextInput from '../../BaseComponents/TextInput';
import TextOutput from '../../BaseComponents/TextOutput';
import Meter from '../../BaseComponents/Gauge';
import Slider from '../../BaseComponents/Slider';
import GraphY from '../../BaseComponents/GraphY';
import SelectionList from '../../BaseComponents/SelectionList';
import ThumbWheel from '../../BaseComponents/ThumbWheel';


import DataConnection from '../../SystemComponents/DataConnection';

import Switch from '../../BaseComponents/Switch';
import SelectionInput from '../../BaseComponents/SelectionInput';
import ToggleButton from '../../BaseComponents/ToggleButton';
import ActionButton from '../../BaseComponents/ActionButton';


import Gauge from '../../BaseComponents/Gauge';
import Card from '@material-ui/core/Card';
import SideBar from '../../SystemComponents/SideBar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';

import SupervisorAccount from '@material-ui/icons/SupervisorAccountOutlined';
import AccountCircle from '@material-ui/icons/AccountCircleOutlined';
import Settings from '@material-ui/icons/SettingsOutlined';

import Divider from '@material-ui/core/Divider';



import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import withWidth from '@material-ui/core/withWidth';

import { Link } from 'react-router-dom'
import StyledIconIndicator from '../../BaseComponents/StyledIconIndicator';
import Home from '@material-ui/icons/Home';
import lime from '@material-ui/core/colors/lime';
//import HooksWidget from '../../SystemComponents/Widgets/HooksWidget';
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 0, flexGrow: 1 }}>
      {props.children}
    </Typography>
  );
}

const styles = theme => ({
  body1: theme.typography.body1,
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    //width:'100%',
    overflowX: "hidden",
    overflowY: "hidden",
    marginTop: 40,
    marginBottom: 100,

  },
  paper: {
    padding: theme.spacing(1) * 0,
    margin: theme.spacing(1) * 0,
    height: '100%',
    color: theme.palette.text.secondary,
  },
  control: {
    padding: theme.spacing(1) * 2,
  },
});

class DynamicPvFieldExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      stateValue: 0,



      showAdvancedSettings: 0,
    };
    this.handleStateChange = this.handleStateChange.bind(this);

  }


  handleChange = (event, value) => {
    this.setState({ value });
  };



  handleStateChange(stateValue) {
    //console.log(stateValue)
    this.setState({ stateValue })
  };





  render() {
    const { width } = this.props;
    //console.log('width',width)

    const { classes } = this.props;
    // console.log('classes justin test1',classes)
    const { value } = this.state;
    const { stateValue } = this.state;



    //console.log(softLim);

    let graphVH;


    if (width == 'xs') {
      graphVH = '25vh';
    } else if (width == 'sm') {
      graphVH = '30vh'
    } else {
      graphVH = '30vh'
    }



    //console.log('window.innerHeight',window.innerHeight)
    return (

      <React.Fragment>
        <AppBar style={{ position: 'fixed', bottom: 'auto', top: '0' }} color='inherit' >
          <Grid container direction="row" item justify="center" spacing={2} alignItems="center">
            <Grid item xs={2}  >

              <SideBar />
            </Grid>
            <Grid item xs={10} >
              <div className={classes.body1}>Hooks debugging</div>
            </Grid>
          </Grid>
        </AppBar>





        <Grid container className={classes.root} spacing={2}>

          <Grid item xs={6}>
            <Typography style={{ paddingBottom: 0 }}> Example with prop useMetadata=true</Typography>
            <Card>
              <Grid container className={classes.root} spacing={2}>
                
                <Grid item xs={12}>

                  <TextInput
                    pv='pva://$(device):dynamicPvFields'
                    macros={{ '$(device)': 'testIOC' }}
                    label={'edas'}
                    usePvUnits={true}
                    usePvLabel={true}
                    usePvMinMax={true}
                    usePvPrecision={true}
                    alarmSensitive={true}
                    //debug={true}

                    useMetadata={true}
                  />
                </Grid>
                <Grid item xs={12}  >
                  <Slider
                    pv='pva://$(device):dynamicPvFields'
                    macros={{ '$(device)': 'testIOC' }}
                    label={'edas'}
                    usePvUnits={true}
                    usePvLabel={true}
                    usePvMinMax={true}
                    usePvPrecision={true}
                    alarmSensitive={true}
                    useMetadata={true}

                  />

                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Typography style={{ paddingBottom: 0 }}> Dynamic example with prop useMetadata=false</Typography>
            <Card>
              <Grid container className={classes.root} spacing={2}>
              
                <Grid item xs={12}>

                  <TextInput
                    pv='pva://$(device):dynamicPvFields'
                    macros={{ '$(device)': 'testIOC' }}
                    label={'edas'}
                    usePvUnits={true}
                    usePvLabel={true}
                    usePvMinMax={true}
                    usePvPrecision={true}
                    alarmSensitive={true}
                    useMetadata={false}
                  />
                </Grid>
                <Grid item xs={12}  >
                  <Slider
                    pv='pva://$(device):dynamicPvFields'
                    macros={{ '$(device)': 'testIOC' }}
                    label={'edas'}
                    usePvUnits={true}
                    usePvLabel={true}
                    usePvMinMax={true}
                    usePvPrecision={true}
                    alarmSensitive={true}
                    useMetadata={false}
                  />

                </Grid>
                <Grid item xs={6}>
                  <TextInput
                    pv='pva://$(device):dynamicPvFields:LOPR'
                    macros={{ '$(device)': 'testIOC' }}
                    usePvMinMax={true}
                    usePvLabel={true}
                    useMetadata={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextInput
                    pv='pva://$(device):dynamicPvFields:HOPR'
                    macros={{ '$(device)': 'testIOC' }}
                    usePvMinMax={true}
                    usePvLabel={true}
                    useMetadata={true}
                  />
                </Grid>
                <Grid item xs={6}>

                  <TextInput
                    pv='pva://$(device):dynamicPvFields:EGU'
                    macros={{ '$(device)': 'testIOC' }}
                    usePvLabel={true}
                    useMetadata={true}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextInput
                    pv='pva://$(device):dynamicPvFields:PREC'
                    macros={{ '$(device)': 'testIOC' }}
                    usePvMinMax={true}
                    usePvLabel={true}
                    usePvPrecision={true}


                    useMetadata={true}
                  />
                </Grid>
                <Grid item xs={6}>

                  <TextInput
                    pv='pva://$(device):dynamicPvFields:DESC'
                    macros={{ '$(device)': 'testIOC' }}

                    usePvLabel={true}
                    


                    useMetadata={true}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
          



        </Grid>



      </React.Fragment>

    );
  }
}



export default withStyles(styles, { withTheme: true })(DynamicPvFieldExample);
