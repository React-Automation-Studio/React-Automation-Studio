
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
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
import GraphMultiplePVs from '../BaseComponents/GraphMultiplePVs';
import ThumbWheel from '../BaseComponents/ThumbWheel';
import Grid from '@material-ui/core/Grid';
import DataConnection from '../SystemComponents/DataConnection';
import Container from '@material-ui/core/Container';
import SwitchComponent from '../BaseComponents/SwitchComponent';
import StyledIconButton from '../BaseComponents/StyledIconButton';
import SideBar from '../SystemComponents/SideBar';


import {Link} from 'react-router-dom'
import fs from 'fs'
import {parse} from 'react-docgen';
//var docs = require("!!react-docgen!../BaseComponents/MyComponent.js");


//const componentDocs = parse(txt);
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
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
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

const hiddenstyle ={
  display:'none'
}

class Help extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    //  console.log('txt',txt);
    //  console.log('componentDocs',componentDocs);
    return (

      <React.Fragment>
        <SideBar/>
        <Container maxWidth="md">
          <h1>React Automation Studio Help</h1>
          <p style={{textAlign:'justify'}}>
            React Automation Studio is a new software platform to enable the control of large scientific equipment through EPICS.
          </p>
          <p style={{textAlign:'justify'}}>
            The system implements a modern tool chain with a React frontend with integrated Material-UI and ReactVis components and real time Socket-IO data transfer to a Python based PyEpics backend.
            Installation occurs as a progressive web application. This enables efficient and responsive cross platform and cross device operation.
          </p>
          <p style={{textAlign:'justify'}}>
            The system is built in 4 components:
          </p>
          <ul>
            <li>pvServer</li>
            <p style={{textAlign:'justify'}}>
              This is the python process variable server. Process variable requests are made from the multiple connected clients, the pvServer makes a connection to the EPICS process variable and serves the process variable meta data and live values to clients through socket-IO events.

              The pvServer support user login and authentication and can be enabledby altering the environment variables.
            </p>
            <li>React frontend</li>
            <p style={{textAlign:'justify'}}>
              The React frontend is  integrated with Material-UI and ReactVis components that have data a connection wrapper around them that allow connection to the pvServer through a single socket.

              Some components can handle multiple PVs such as the graph or single PVs such as text inputs. For each of the components the PVs name can me declared using macros. The macros are replaced at run time.
              This allows  the complex design of user interfaces that can be reused by simply grouping the components and changing the global macro to point to another system.

              By using Material-UI's grid layout system responsive UI's can be implemented  across platforms and across multiple devices.

              A lot of effort was put into the documentation and the style guide should be launched to view how to use and instantiate the components.
            </p>
            <li>Styleguide</li>
            <p style={{textAlign:'justify'}}>
              The style guide is based on Reactstyleguidedist and is used to document the use of all the components from the source files. The current style guide is interactive with the demo IOC.
            </p>
            <li>Demo Epics IOC</li>
            <p style={{textAlign:'justify'}}>
              The repository comes with a demonstration IOC that enables the frontend demos to connect live to a real time system.

            </p>
          </ul>

        </Container>
      </React.Fragment>
    );
  }
}

Help.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Help);
