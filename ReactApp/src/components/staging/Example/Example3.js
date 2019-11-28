import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import EpicsBinaryOutDebug from '../../../components/GroupedComponents/EpicsBinaryOutDebug';
import EpicsAnalogOutDebug from '../../../components/GroupedComponents/EpicsAnalogOutDebug';
import EpicsMbboDebug from '../../../components/GroupedComponents/EpicsMbboDebug';
import TextUpdate from '../../../components/BaseComponents/TextUpdate';
import TextInput from '../../../components/BaseComponents/TextInput';
import TextOutput from '../../../components/BaseComponents/TextOutput';
import Meter from '../../../components/BaseComponents/Gauge';
import SimpleSlider from '../../../components/BaseComponents/SimpleSlider';
import GraphY from '../../../components/BaseComponents/GraphY';
import SelectionList from '../../../components/BaseComponents/SelectionList';
import StyledIconIndicator from '../../../components/BaseComponents/StyledIconIndicator';

import Grid from '@material-ui/core/Grid';
import DataConnection from '../../../components/SystemComponents/DataConnection';

import SwitchComponent from '../../../components/BaseComponents/SwitchComponent';
import SelectionInput from '../../../components/BaseComponents/SelectionInput';
import ToggleButton from '../../../components/BaseComponents/ToggleButton';
import ActionButton from '../../../components/BaseComponents/ActionButton';
import ThumbWheel from '../../../components/BaseComponents/ThumbWheel';

import Card from '@material-ui/core/Card';
import SideBar from '../../../components/SystemComponents/SideBar';
import AppBar from '@material-ui/core/AppBar';








const styles = theme => ({
  root: {
    padding: 0,
    spacing: 0,
    direction: 'row',
    alignItems: 'stretch',
    justify: "flex-start",
    overflowX: "hidden",
    overflowY: "hidden",
  },

});
class Example3 extends React.Component {


  render() {
    //  console.log("state: ",this.state);

    return (
      <React.Fragment>
        <SideBar/>
        <div> Hello World</div>
      </React.Fragment>
    );
  }
}

Example3.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles,{withTheme:true})(Example3);
//export default Example3;
