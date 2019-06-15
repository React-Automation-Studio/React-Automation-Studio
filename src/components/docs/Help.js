
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

import SwitchComponent from '../BaseComponents/SwitchComponent';
import StyledIconButton from '../BaseComponents/StyledIconButton';



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
          { /*   <TextInput  pv='pva://$(device):amplitude' macros={{'$(device)':'testIOC'}} usePvMinMax={true} min={100} max={500} usePvLabel={true} />*/}
              {<SimpleSlider  pv='pva://$(device):amplitude' macros={{'$(device)':'testIOC'}} usePvMinMax={true} min={1000} max={500} usePvLabel={true} />}
</React.Fragment>
);
}
}

Help.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Help);
