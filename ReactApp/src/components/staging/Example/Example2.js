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
import GraphMultiplePVs from '../../../components/BaseComponents/GraphMultiplePVs';
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
import lime from '@material-ui/core/colors/lime';
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
class Example2 extends React.Component {


  render() {
    //  console.log("state: ",this.state);

    return (
      <React.Fragment>
        <SideBar/>
        <div >
        <Grid
           style={{padding:8}}
           container item
           direction="row"
           justify="center"
           spacing={1}
           alignItems="stretch"
        >
          <Grid item xs={6}  >
            <TextInput
                pv='pva://$(device):amplitude'
                macros={{'$(device)':'testIOC'}}
                usePvLabel={true}
                usePrecision={true}
                prec={3}
                alarmSensitive={true}
            />
          </Grid>
          <Grid item  xs={6}>
            <TextOutput
              pv='pva://$(device):test3'
              macros={{'$(device)':'testIOC'}}
              usePvLabel={true} usePrecision={true}
              prec={3} alarmSensitive={true}
            />
          </Grid>
          <Grid item xs={3}  >
            <TextInput
                pv='pva://$(device):amplitude'
                macros={{'$(device)':'testIOC'}}
                usePvLabel={true}
                usePrecision={true}
                prec={3}
                alarmSensitive={true}
            />
          </Grid>
          <Grid item  xs={3}>
            <TextOutput
              pv='pva://$(device):test3'
              macros={{'$(device)':'testIOC'}}
              usePvLabel={true} usePrecision={true}
              prec={3} alarmSensitive={true}
            />
          </Grid>

          <Grid item xs={3}  >
            <TextInput
                pv='pva://$(device):amplitude'
                macros={{'$(device)':'testIOC'}}
                usePvLabel={true}
                usePrecision={true}
                prec={3}
                alarmSensitive={true}
            />
          </Grid>
          <Grid item  xs={3}>
            <TextOutput
              pv='pva://$(device):test3'
              macros={{'$(device)':'testIOC'}}
              usePvLabel={true} usePrecision={true}
              prec={3} alarmSensitive={true}
            />
          </Grid>



          <Grid item xs={12} >
            <div style={{ height: '50vh', width:'96vw',}}>
              <GraphMultiplePVs  pvs={['pva://testIOC:test4','pva://testIOC:test5'] } legend={['Sine Wave','Amplitude']} lineColor={[this.props.theme.palette.secondary.main,lime['400']]}/>
            </div>
          </Grid>
          <Grid item xs={12}  >
            <SimpleSlider
              pv='pva://$(device):amplitude'
              macros={{'$(device)':'testIOC'}}
              usePvMinMax={true}
              min={1000}
              max={500}
              usePvLabel={true}
            />
          </Grid>
        </Grid>
      </div>
      </React.Fragment>
    );
  }
}

Example2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles,{withTheme:true})(Example2);
