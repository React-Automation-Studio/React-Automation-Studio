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

import Grid from '@material-ui/core/Grid';
import DataConnection from '../SystemComponents/DataConnection';
import SwitchComponent from '../BaseComponents/SwitchComponent';
import SelectionInput from '../BaseComponents/SelectionInput';
import SelectionList from '../BaseComponents/SelectionList';
import ToggleButton from '../BaseComponents/ToggleButton';
import ActionButton from '../BaseComponents/ActionButton';
import ArrowButton from '../BaseComponents/ArrowButton';
import ThumbWheel from '../BaseComponents/ThumbWheel';
import Gauge from '../BaseComponents/Gauge';
import StyledIconIndicator from '../BaseComponents/StyledIconIndicator';

import SideBar from '../SystemComponents/SideBar';
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
class MobileTest extends React.Component {


  render() {
    const { classes } = this.props;
    return (



      <div style={{"overflowX": "hidden"}} >
        <SideBar/>
        <div style={{ padding: 24}}>
          <div >
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <div style={{height:'25vh'}}>
                  <GraphMultiplePVs
                    pvs={[
                      'pva://testIOC:test4',



                    ]}
                    maxLength={1000}
                    lineColor={[this.props.theme.palette.secondary.main]}
                  />

                </div>
              </Grid>
              <Grid item xs={12} lg={6}>
                <div style={{height:'25vh'}}>
                  <GraphMultiplePVs
                    pvs={[
                        'pva://testIOC:amplitude',



                    ]}
                    maxLength={1000}
                    lineColor={[this.props.theme.palette.secondary.main]}
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
          <Grid container spacing={2}>

            <Grid item xs={12} lg={2}>
              <TextInput  pv='pva://$(device):amplitude' macros={{'$(device)':'testIOC'}}   usePvLabel={true} usePrecision={true} prec={3} alarmSensitive={true}/>
            </Grid>
            <Grid item xs={12} lg={2}>
              <TextOutput  pv='pva://$(device):test3' macros={{'$(device)':'testIOC'}}   usePvLabel={true} usePrecision={true} prec={3} alarmSensitive={true}/>
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>
              <Gauge  pv='pva://$(device):amplitude' macros={{'$(device)':'testIOC'}}   usePvLabel={true} usePrecision={true} prec={3} usePvMinMax={true} />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <ThumbWheel
                pv='pva://$(device)'
                macros={{'$(device)':'testIOC:amplitude'}}
                prec_integer={3}
                prec_decimal={1}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>
              <Gauge  pv='pva://$(device):test3' macros={{'$(device)':'testIOC'}}   usePvLabel={true} usePrecision={true} prec={3} min={-10000} max={10000} />
            </Grid>
            
            <Grid item xs={6} lg={3}>
              <SelectionInput   pv='pva://$(device)'  macros={{'$(device)':'testIOC:BO1'}} usePvLabel={true}/>
            </Grid>
            <Grid item xs={6} lg={3}>
              <TextOutput pv='pva://$(device)' macros={{'$(device)':'testIOC:BO1'}} usePvLabel={true}/>
            </Grid>
            <Grid item xs={6} lg={3}>

              <SwitchComponent pv='pva://$(device)' macros={{'$(device)':'testIOC:BO1'}} usePvLabel={true}/>
            </Grid>
            <Grid item xs={6} lg={3}>
              <StyledIconIndicator  pv='pva://$(device)' macros={{'$(device)':'testIOC:BO1'}} onColor='primary' offColor='secondary' usePvLabel={true} labelPlacement={'end'}/>
            </Grid>

            <Grid item xs={6} lg={3}>
              <ToggleButton pv='pva://$(device)' macros={{'$(device)':'testIOC:BO1'}} usePvLabel={true} labelPlacement={"top"}/>
            </Grid>
            <Grid item xs={6} lg={3}>
              <ToggleButton pv='pva://$(device)' macros={{'$(device)':'testIOC:BO1'}} label={"Custom Label"} labelPlacement={"top"}/>
            </Grid>
            <Grid item xs={6} lg={3}>
              <ActionButton pv='pva://$(device)' macros={{'$(device)':'testIOC:BO1'}} label={"Action Button1"} labelPlacement={"top"} actionValue={"1"}
                actionString={"Switch  On"}/>
            </Grid>
            <Grid item xs={6} lg={3}>
              <ActionButton pv='pva://$(device)' macros={{'$(device)':'testIOC:BO1'}} label={"Action Button2"} labelPlacement={"top"} actionValue={"0"}
                actionString={"Switch Off"}/>
            </Grid>
            <Grid item xs={6} lg={3}>
              <TextOutput pv='pva://$(device)' macros={{'$(device)':'testIOC:mbboTest1'}} usePvLabel={true}/>
            </Grid>
            <Grid item xs={6} lg={3}>
              <SelectionInput   pv='pva://$(device)'  macros={{'$(device)':'testIOC:mbboTest1'}} usePvLabel={true}/>
            </Grid>
            <Grid item xs={12} lg={3}>
              <SelectionList   pv='pva://$(device)'  macros={{'$(device)':'testIOC:mbboTest1'}} usePvLabel={true}/>
            </Grid>
            <Grid item xs={12} lg={3}>
              <SelectionList   pv='pva://$(device)'  macros={{'$(device)':'testIOC:mbboTest1'}} usePvLabel={true} horizontal={true} />
            </Grid>

          </Grid>

        </div>
      </div>






    );
  }
}

MobileTest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles,{withTheme:true})(MobileTest);
//export default MobileTest;
