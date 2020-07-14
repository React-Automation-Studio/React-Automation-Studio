import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


import Grid from '@material-ui/core/Grid'
//import SideBar from '../SystemComponents/SideBar';
//import Settings from '../SystemComponents/Settings';
import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';

import LoadSave from '../LoadSaveComponent/LoadSave';
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import TraditionalLayout from '../UI/Layout/ComposedLayouts/TraditionalLayout';

const systemName = 'testIOC';




const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const VerticalTabs = withStyles(theme => ({
  flexContainer: {
    flexDirection: 'column'
  },
  indicator: {
    display: 'none',
  }
}))(Tabs)

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 0 }}>
      {props.children}
    </Typography>
  );
}

class LoadSaveExample extends React.Component {
  constructor(props) {
    super(props);
    let systemName = 'testIOC';
    this.state = {
      'editorType': 'PS',
      'displayEditor': false,
      'editorMacros': { '$(systemName)': "" },
      'editorSystem': {},
      systemName: systemName,
      topTabValue: 0,
      sideTabValue: 0,
      displaySettings: false,



    }



  }

  handlePsOnClick(name) {

    //  console.log("in control test1 clicked "+name.toString());
    this.setState({
      ['editorType']: 'PS',
      ['displayEditor']: true,
      ['editorMacros']: { '$(systemName)': name }
    });

    //  this.setState({ ['clicked']: 1});
  }
  handleOnSystemClick = (system) => {
    console.log(system)
    this.setState({
      ['editorType']: system.editorType,
      ['displayEditor']: true,
      ['editorSystem']: system,
      ['editorMacros']: { '$(systemName)': "" }
    });
    //  console.log("in control test1 clicked "+name.toString());
    //    this.setState({['editorType']:'PS',
    //    ['displayEditor']:true,
    //    ['editorMacros']:{'$(systemName)':name}});

    //  this.setState({ ['clicked']: 1});
  }


  handleSideTabChange = (event, value) => {
    this.setState({ sideTabValue: value, displayEditor: false });
  };
  handleCloseEditor = () => {
    this.setState({
      ['displayEditor']: false,
    }
    );

    //  this.setState({ ['clicked']: 1});
  }

  render() {
    //      console.log("state: ",this.state);
    //console.log('displayHarps',this.state.displayHarps)
    console.log(this.context.userData)
    const { classes } = this.props;
    const topTabValue = this.state.topTabValue;
    const sideTabValue = this.state.sideTabValue;
    return (
     
      <TraditionalLayout
      title="Load Save Example"
      denseAppBar
      alignTitle="center"
        >

      

        <div style={{ "overflowX": "hidden", 'overflowY': 'hidden' }}>
          <Grid
            style={{ marginTop: 0, padding: 8 }}
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={0}
          >



            <Grid item xs={12} sm={12} md={12} lg={12} >


              <LoadSave
                key={" " + this.state.systemName}
                database='LOADSAVE_DATABASE'
                collection='testIOCSystems'
                macros={{ '$(systemName)': this.state.systemName }}
                loadEnablePV={'pva://$(systemName):loadSaveEnable'}

                loadEnableLabel={'System On/Off'}
                showLoadEnableButton={true}
                useLoadEnable={true}


              />


            </Grid>

          </Grid>




        </div>
      </TraditionalLayout>




    );
  }
}

LoadSaveExample.propTypes = {
  classes: PropTypes.object.isRequired,
};
LoadSaveExample.contextType = AutomationStudioContext;
export default withStyles(styles)(LoadSaveExample);
//export default LoadSaveExample;
