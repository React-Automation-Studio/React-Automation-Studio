import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import EpicsBinaryOutDebug from '../../ExperimentalGroupedComponents/EpicsBinaryOutDebug';
import EpicsAnalogOutDebug from '../../ExperimentalGroupedComponents/EpicsAnalogOutDebug';
import EpicsMbboDebug from '../../ExperimentalGroupedComponents/EpicsMbboDebug';
import TextUpdate from '../../ExperimentalBaseComponents/TextUpdate';
import TextInput from '../../ExperimentalBaseComponents/TextInput';
import TextOutput from '../../ExperimentalBaseComponents/TextOutput';
import SimpleSlider from '../../ExperimentalBaseComponents/SimpleSlider';
import GraphY from '../../BaseComponents/GraphY';

import Grid from '@material-ui/core/Grid';
import DataConnection from '../../SystemComponents/DataConnection';
import SwitchComponent from '../../ExperimentalBaseComponents/SwitchComponent';
import SelectionInput from '../../ExperimentalBaseComponents/SelectionInput';
import SelectionList from '../../ExperimentalBaseComponents/SelectionList';
import ToggleButton from '../../ExperimentalBaseComponents/ToggleButton';
import ActionButton from '../../ExperimentalBaseComponents/ActionButton';
import RadioButtonGroup from '../../ExperimentalBaseComponents/RadioButtonGroup';
import RadioButton from '../../ExperimentalBaseComponents/RadioButton';
import CheckBox from '../../ExperimentalBaseComponents/CheckBox';
import ThumbWheel from '../../ExperimentalBaseComponents/ThumbWheel';
import Gauge from '../../ExperimentalBaseComponents/Gauge';
import Tank from '../../ExperimentalBaseComponents/Tank';
import ProgressBar from '../../BaseComponents/ProgressBar';
import StyledIconIndicator from '../../ExperimentalBaseComponents/StyledIconIndicator';
import lime from '@material-ui/core/colors/lime';
import SideBar from '../../SystemComponents/SideBar';
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
        {typeof this.props.nosidebar==='undefined' &&<SideBar/>}
        <div style={{ padding: 24}}>
          <div >
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <div style={{height:'25vh'}}>
                  <GraphY  pvs={['pva://testIOC:test4','pva://testIOC:test5'] } legend={['Sine Wave ','Amplitude']} lineColor={[this.props.theme.palette.secondary.main,lime['400']]}/>
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

                    lineColor={[lime['400']]}
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
              <Gauge  pv='pva://$(device):amplitude' macros={{'$(device)':'testIOC'}}   prec={3} usePvMinMax={true} />
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
              <Gauge  pv='pva://$(device):test3' macros={{'$(device)':'testIOC'}}     prec={3} min={-10000} max={10000}  />
            </Grid>
            <Grid item xs={6} sm={3}  md= {3} lg={2} xl={1}>
              <ProgressBar  pv='pva://$(device):test3' macros={{'$(device)':'testIOC'}} units={'V'}  usePvLabel={true}  prec={3} min={-10000} max={10000} />
            </Grid>
            <Grid item xs={6} sm={3}  md= {3} lg={2} xl={1}>
                <ProgressBar  pv='pva://$(device):amplitude' macros={{'$(device)':'testIOC'}}     prec={3} usePvMinMax={true} alarmSensitive={true}/>
            </Grid>
            <Grid item xs={6} sm={3}  md= {3} lg={2} xl={1}>
              <Tank  pv='pva://$(device):test3' macros={{'$(device)':'testIOC'}} units={'V'}    prec={3} min={-10000} max={10000} />
            </Grid>
            <Grid item xs={6} sm={3}  md= {3} lg={2} xl={1}>
                <Tank  pv='pva://$(device):amplitude' macros={{'$(device)':'testIOC'}}    prec={3} usePvMinMax={true} alarmSensitive={true}/>
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
              <StyledIconIndicator  pv='pva://$(device)' macros={{'$(device)':'testIOC:BO1'}} onColor='primary' offColor='secondary' usePvLabel={true} labelPlacement={'start'}/>
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
