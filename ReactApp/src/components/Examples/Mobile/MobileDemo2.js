import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';

import TextInput from '../../BaseComponents/TextInput';
import TextOutput from '../../BaseComponents/TextOutput';
import Slider from '../../BaseComponents/Slider';
import GraphY from '../../BaseComponents/GraphY';

import Grid from '@mui/material/Grid';

import Switch from '../../BaseComponents/Switch';
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
                  <GraphY  pvs={['testIOC:test4','testIOC:test5'] } legend={['Sine Wave ','Amplitude']} />
                </div>
              </Grid>
              <Grid item xs={12} lg={6}>
                <div style={{height:'25vh'}}>
                  <GraphY
                    pvs={[
                        'testIOC:amplitude',
                    ]}
                    legend={['Instantaneous Amplitude']}
                    maxLength={1000}
                    lineColor={[this.props.theme.palette.reactVis.lineColors[1]]}
                  />
                </div>
              </Grid>
              <Grid item xs={12} lg={12}>
                <Slider pv='$(device):amplitude' macros={{'$(device)':'testIOC'}} usePvMinMax={true} min={1000} max={500} usePvLabel={true}  />
              </Grid>
            </Grid>
          </div>
        </div>
        <div className={classes.root}>
          <Grid container spacing={2}  direction="row"  justifyContent="flex-start"  alignItems="center">

            <Grid item xs={12} lg={2}>
              <TextInput  pv='$(device):amplitude' macros={{'$(device)':'testIOC'}}   usePvLabel={true}  prec={3} alarmSensitive={true}/>
            </Grid>
            <Grid item xs={12} lg={2}>
              <TextOutput  pv='$(device):test3' macros={{'$(device)':'testIOC'}}   usePvLabel={true}  prec={3} alarmSensitive={true}/>
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>
              <Gauge  pv='$(device):amplitude' macros={{'$(device)':'testIOC'}}   usePvLabel={true}  prec={3} usePvMinMax={true} />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <ThumbWheel
                pv='$(device)'
                macros={{'$(device)':'testIOC:amplitude'}}
                prec_integer={3}
                prec_decimal={1}
              />
            </Grid>
            <Grid item xs={12} sm={3} lg={2}>
              <Gauge  pv='$(device):test3' macros={{'$(device)':'testIOC'}}   usePvLabel={true}  prec={3} min={-10000} max={10000} />
            </Grid>
            <Grid item xs={6} sm={3}  md= {3} lg={2} xl={1}>
              <ProgressBar  pv='$(device):test3' macros={{'$(device)':'testIOC'}} units={'V'}  usePvLabel={true}  prec={0} min={-10000} max={10000} />
            </Grid>
            <Grid item xs={6} sm={3}  md= {3} lg={2} xl={1}>
                <ProgressBar  pv='$(device):amplitude' macros={{'$(device)':'testIOC'}}   usePvLabel={true}  prec={0} usePvMinMax={true} alarmSensitive={true}/>
            </Grid>
            <Grid item xs={6} sm={3}  md= {3} lg={2} xl={1}>
              <Tank  pv='$(device):test3' macros={{'$(device)':'testIOC'}} units={'V'}  usePvLabel={true}  prec={0} min={-10000} max={10000} />
            </Grid>
            <Grid item xs={6} sm={3}  md= {3} lg={2} xl={1}>
                <Tank  pv='$(device):amplitude' macros={{'$(device)':'testIOC'}}   usePvLabel={true}  prec={0} usePvMinMax={true} alarmSensitive={true}/>
            </Grid>

            <Grid item xs={6} lg={2}>
              <SelectionInput   pv='$(device)'  macros={{'$(device)':'testIOC:BO1'}} usePvLabel={true}/>
            </Grid>
            <Grid item xs={6} lg={2}>
              <TextOutput pv='$(device)' macros={{'$(device)':'testIOC:BO1'}} usePvLabel={true}/>
            </Grid>
            <Grid item xs={6} lg={1}>

              <Switch pv='$(device)' macros={{'$(device)':'testIOC:BO1'}} usePvLabel={true}/>
            </Grid>
            <Grid item xs={6} lg={1}>
              <CheckBox pv='$(device)' macros={{'$(device)':'testIOC:BO1'}} usePvLabel={true}/>
            </Grid>
            <Grid item xs={6} lg={1}>
              <RadioButton pv='$(device)' macros={{'$(device)':'testIOC:BO1'}} usePvLabel={true}/>
            </Grid>
            <Grid item xs={6} lg={1}>
              <StyledIconIndicator  pv='$(device)' macros={{'$(device)':'testIOC:BO1'}} onColor={this.props.theme.palette.ok.main} offColor={this.props.theme.palette.error.main} usePvLabel={true} labelPlacement={'end'}/>
            </Grid>

            <Grid item xs={6} lg={1}>
              <ToggleButton pv='$(device)' macros={{'$(device)':'testIOC:BO1'}} usePvLabel={true} labelPlacement={"top"}/>
            </Grid>
            <Grid item xs={6} lg={1}>
              <ToggleButton pv='$(device)' macros={{'$(device)':'testIOC:BO1'}} label={"Custom Label"} labelPlacement={"top"}/>
            </Grid>
            <Grid item xs={6} lg={1}>
              <ActionButton pv='$(device)' macros={{'$(device)':'testIOC:BO1'}} label={"Action Button1"} labelPlacement={"top"} actionValue={"1"}
                actionString={"Switch  On"}/>
            </Grid>
            <Grid item xs={6} lg={1}>
              <ActionButton pv='$(device)' macros={{'$(device)':'testIOC:BO1'}} label={"Action Button2"} labelPlacement={"top"} actionValue={"0"}
                actionString={"Switch Off"}/>
            </Grid>
            <Grid item xs={6} lg={2}>
              <TextOutput pv='$(device)' macros={{'$(device)':'testIOC:mbboTest1'}} usePvLabel={true}/>
            </Grid>
            <Grid item xs={6} lg={2}>
              <SelectionInput   pv='$(device)'  macros={{'$(device)':'testIOC:mbboTest1'}} usePvLabel={true}/>
            </Grid>
            <Grid item xs={6} lg={2}>
              <RadioButtonGroup   pv='$(device)'  macros={{'$(device)':'testIOC:mbboTest1'}} usePvLabel={true}/>
            </Grid>
            <Grid item xs={12} lg={2}>
              <SelectionList   pv='$(device)'  macros={{'$(device)':'testIOC:mbboTest1'}} usePvLabel={true}/>
            </Grid>
            <Grid item xs={12} lg={4}>
              <SelectionList   pv='$(device)'  macros={{'$(device)':'testIOC:mbboTest1'}} usePvLabel={true} horizontal={true} />
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
