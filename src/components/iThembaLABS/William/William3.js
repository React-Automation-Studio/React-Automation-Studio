import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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
import SimpleSlider from '../../BaseComponents/SimpleSlider';
import GraphMultiplePVs from '../../BaseComponents/GraphMultiplePVs';
import SelectionList from '../../BaseComponents/SelectionList';
import StyledIconIndicator from '../../BaseComponents/StyledIconIndicator';

import Grid from '@material-ui/core/Grid';
import DataConnection from '../../SystemComponents/DataConnection';

import SwitchComponent from '../../BaseComponents/SwitchComponent';
import SelectionInput from '../../BaseComponents/SelectionInput';
import ToggleButton from '../../BaseComponents/ToggleButton';
import ActionButton from '../../BaseComponents/ActionButton';

import ThumbWheel from '../../BaseComponents/ThumbWheel';
import ControlRightEx1 from '../../ControlScreens/GridComponents/ControlRightEx1'
import ControlTopEx1 from '../../ControlScreens/GridComponents/ControlTopEx1'
import ControlBottomEx1 from '../../ControlScreens/GridComponents/ControlBottomEx1'
import Card from '@material-ui/core/Card';
import SideBar from '../../SystemComponents/SideBar';
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
class William3 extends React.Component {


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

William3.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles,{withTheme:true})(William3);
//export default William3;
