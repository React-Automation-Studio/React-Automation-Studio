import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import EpicsBinaryOutDebug from '../../GroupedComponents/EpicsBinaryOutDebug';
import EpicsAnalogOutDebug from '../../GroupedComponents/EpicsAnalogOutDebug';
import EpicsMbboDebug from '../../GroupedComponents/EpicsMbboDebug';
import TextUpdate from '../../BaseComponents/TextUpdate';
import TextInput from '../../BaseComponents/TextInput';
import TextOutput from '../../BaseComponents/TextOutput';
import SimpleSlider from '../../BaseComponents/SimpleSlider';
import GraphY from '../../BaseComponents/GraphY';

import Grid from '@material-ui/core/Grid';
import DataConnection from '../../SystemComponents/DataConnection';
import SwitchComponent from '../../BaseComponents/SwitchComponent';
import SelectionInput from '../../BaseComponents/SelectionInput';
import SelectionList from '../../BaseComponents/SelectionList';
import ToggleButton from '../../BaseComponents/ToggleButton';
import ActionButton from '../../BaseComponents/ActionButton';
import RadioButtonGroup from '../../BaseComponents/RadioButtonGroup';
import RadioButton from '../../BaseComponents/RadioButton';
import CheckBox from '../../BaseComponents/CheckBox';
import ThumbWheel from '../../BaseComponents/ThumbWheel';
import Gauge from '../../BaseComponents/Gauge';
import Tank from '../../BaseComponents/Tank';
import ProgressBar from '../../BaseComponents/ProgressBar';
import StyledIconIndicator from '../../BaseComponents/StyledIconIndicator';
import lime from '@material-ui/core/colors/lime';
import SideBar from '../../SystemComponents/SideBar';
import TraditionalLayout from '../../UI/Layout/ComposedLayouts/TraditionalLayout.js';
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
class MobileDemo2 extends React.Component {


  render() {
    const { classes } = this.props;
    return (



      <div style={{"overflowX": "hidden"}} >
     
        {typeof this.props.nosidebar==='undefined' &&    <TraditionalLayout
      title="Mobile Demo 2"
      denseAppBar
      alignTitle="center"
    ></TraditionalLayout>}
        <div style={{ padding: 24}}>
          <div >
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <div style={{height:'25vh'}}>
                  <GraphY  pvs={['pva://testIOC:test4','pva://testIOC:test5'] } legend={['Sine Wave ','Amplitude']} />
                </div>
              </Grid>
              <Grid item xs={12} lg={6}>
                <div style={{height:'25vh'}}>
                  <GraphY
                    pvs={[
                        'pva://testIOC:amplitude',



                    ]}
                    legend={['Instantaneous Amplitude']}
                    maxLength={1000}

                    lineColor={[this.props.theme.palette.reactVis.lineColors[1]]}
                  />
                </div>
              </Grid>
              <Grid item xs={12} lg={12}>
                <SimpleSlider pv='pva://$(device):amplitude' macros={{'$(device)':'testIOC'}} usePvMinMax={true} min={1000} max={500} usePvLabel={true}  />
              </Grid>

            </Grid>
          </div>
        </div>
        <div className={classes.root}>
          <Grid container spacing={2}  direction="row"  justify="flex-start"  alignItems="center">

            <Grid item xs={12} lg={2}>
              <TextInput  pv='pva://$(device):amplitude' macros={{'$(device)':'testIOC'}}   usePvLabel={true}  prec={3} alarmSensitive={true}/>
            </Grid>
            <Grid item xs={12} lg={2}>
              <TextOutput  pv='pva://$(device):test3' macros={{'$(device)':'testIOC'}}   usePvLabel={true}  prec={3} alarmSensitive={true}/>
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>
              <Gauge  pv='pva://$(device):amplitude' macros={{'$(device)':'testIOC'}}   usePvLabel={true}  prec={3} usePvMinMax={true} />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <ThumbWheel
                pv='pva://$(device)'
                macros={{'$(device)':'testIOC:amplitude'}}
                prec_integer={3}
                prec_decimal={1}
              />
            </Grid>
            <Grid item xs={12} sm={3} lg={2}>
              <Gauge  pv='pva://$(device):test3' macros={{'$(device)':'testIOC'}}   usePvLabel={true}  prec={3} min={-10000} max={10000} />
            </Grid>
            <Grid item xs={6} sm={3}  md= {3} lg={2} xl={1}>
              <ProgressBar  pv='pva://$(device):test3' macros={{'$(device)':'testIOC'}} units={'V'}  usePvLabel={true}  prec={3} min={-10000} max={10000} />
            </Grid>
            <Grid item xs={6} sm={3}  md= {3} lg={2} xl={1}>
                <ProgressBar  pv='pva://$(device):amplitude' macros={{'$(device)':'testIOC'}}   usePvLabel={true}  prec={3} usePvMinMax={true} alarmSensitive={true}/>
            </Grid>
            <Grid item xs={6} sm={3}  md= {3} lg={2} xl={1}>
              <Tank  pv='pva://$(device):test3' macros={{'$(device)':'testIOC'}} units={'V'}  usePvLabel={true}  prec={3} min={-10000} max={10000} />
            </Grid>
            <Grid item xs={6} sm={3}  md= {3} lg={2} xl={1}>
                <Tank  pv='pva://$(device):amplitude' macros={{'$(device)':'testIOC'}}   usePvLabel={true}  prec={3} usePvMinMax={true} alarmSensitive={true}/>
            </Grid>

            <Grid item xs={6} lg={2}>
              <SelectionInput   pv='pva://$(device)'  macros={{'$(device)':'testIOC:BO1'}} usePvLabel={true}/>
            </Grid>
            <Grid item xs={6} lg={2}>
              <TextOutput pv='pva://$(device)' macros={{'$(device)':'testIOC:BO1'}} usePvLabel={true}/>
            </Grid>
            <Grid item xs={6} lg={1}>

              <SwitchComponent pv='pva://$(device)' macros={{'$(device)':'testIOC:BO1'}} usePvLabel={true}/>
            </Grid>
            <Grid item xs={6} lg={1}>

              <CheckBox pv='pva://$(device)' macros={{'$(device)':'testIOC:BO1'}} usePvLabel={true}/>
            </Grid>
            <Grid item xs={6} lg={1}>

              <RadioButton pv='pva://$(device)' macros={{'$(device)':'testIOC:BO1'}} usePvLabel={true}/>
            </Grid>
            <Grid item xs={6} lg={1}>
              <StyledIconIndicator  pv='pva://$(device)' macros={{'$(device)':'testIOC:BO1'}} onColor='primary' offColor='secondary' usePvLabel={true} labelPlacement={'end'}/>
            </Grid>

            <Grid item xs={6} lg={1}>
              <ToggleButton pv='pva://$(device)' macros={{'$(device)':'testIOC:BO1'}} usePvLabel={true} labelPlacement={"top"}/>
            </Grid>
            <Grid item xs={6} lg={1}>
              <ToggleButton pv='pva://$(device)' macros={{'$(device)':'testIOC:BO1'}} label={"Custom Label"} labelPlacement={"top"}/>
            </Grid>
            <Grid item xs={6} lg={1}>
              <ActionButton pv='pva://$(device)' macros={{'$(device)':'testIOC:BO1'}} label={"Action Button1"} labelPlacement={"top"} actionValue={"1"}
                actionString={"Switch  On"}/>
            </Grid>
            <Grid item xs={6} lg={1}>
              <ActionButton pv='pva://$(device)' macros={{'$(device)':'testIOC:BO1'}} label={"Action Button2"} labelPlacement={"top"} actionValue={"0"}
                actionString={"Switch Off"}/>
            </Grid>
            <Grid item xs={6} lg={2}>
              <TextOutput pv='pva://$(device)' macros={{'$(device)':'testIOC:mbboTest1'}} usePvLabel={true}/>
            </Grid>
            <Grid item xs={6} lg={2}>
              <SelectionInput   pv='pva://$(device)'  macros={{'$(device)':'testIOC:mbboTest1'}} usePvLabel={true}/>
            </Grid>
            <Grid item xs={6} lg={2}>
              <RadioButtonGroup   pv='pva://$(device)'  macros={{'$(device)':'testIOC:mbboTest1'}} usePvLabel={true}/>
            </Grid>
            <Grid item xs={12} lg={2}>
              <SelectionList   pv='pva://$(device)'  macros={{'$(device)':'testIOC:mbboTest1'}} usePvLabel={true}/>
            </Grid>
            <Grid item xs={12} lg={4}>
              <SelectionList   pv='pva://$(device)'  macros={{'$(device)':'testIOC:mbboTest1'}} usePvLabel={true} horizontal={true} />
            </Grid>

          </Grid>

        </div>
      </div>






    );
  }
}

MobileDemo2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles,{withTheme:true})(MobileDemo2);
//export default MobileDemo2;
