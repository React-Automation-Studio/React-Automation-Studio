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
import Gauge from '../BaseComponents/Gauge';
import SwitchComponent from '../BaseComponents/SwitchComponent';
import StyledIconButton from '../BaseComponents/StyledIconButton';
import SideBar from '../SystemComponents/SideBar';
import MobileTest from './MobileTest';

import {Link} from 'react-router-dom'
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

class Demos extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (


      <div >

        <AppBar position="static" color="default">
          <SideBar/>
          <Tabs
            value={value}
            onChange={this.handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"


          >
            <Tab label="Main" />
            <Tab label="Debug Analog Out" />
            <Tab label="Debug Binary Out" />
            <Tab label="Debug MBBO Enumerator" />
            <Tab label="Debug Graph" />
            <Tab label="Mobile" />
            <Tab label="Mobile2" />
            <Tab label="RF Overlay" />
          </Tabs>
        </AppBar>

        {value === 0 && <TabContainer key='TabContainer0' >

        <MobileTest/>
        </TabContainer >
        }

        {value === 1 && <TabContainer key='TabContainer1'>
          <Grid container spacing={1}>
            <Grid item xs={3}>

              <EpicsAnalogOutDebug macros={{'$(device)':'testIOC:amplitude'}}/>
            </Grid>
            <Grid item xs={3}>
              <EpicsAnalogOutDebug macros={{'$(device)':'testIOC:test1'}}/>
            </Grid>
            <Grid item xs={3}>
              <EpicsAnalogOutDebug macros={{'$(device)':'testIOC:test2'}}/>
            </Grid>

            <Grid item xs={3}>
              <EpicsAnalogOutDebug macros={{'$(device)':'testIOC:time'}}/>
            </Grid>
          </Grid>
        </TabContainer>
        }

        {value === 2 &&  <TabContainer key='TabContainer2'>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <EpicsBinaryOutDebug macros={{'$(device)':'testIOC:BO1'}}/>
            </Grid>
            <Grid item xs={2}>
              <EpicsBinaryOutDebug macros={{'$(device)':'testIOC:BO2'}}/>
            </Grid>
            <Grid item xs={2}>

            </Grid>
            <Grid item xs={2}>

            </Grid>
            <Grid item xs={2}>

            </Grid>
            <Grid item xs={2}>

            </Grid>
          </Grid>

        </TabContainer>
        }
        {value === 3 && 	 <TabContainer key='TabContainer3'>
          <Grid container spacing={3}>

            <Grid item xs={3}>
              <EpicsMbboDebug macros={{'$(device)':'testIOC:mbboTest1'}}/>
            </Grid>
            <Grid item xs={3}>
              <EpicsMbboDebug macros={{'$(device)':'testIOC:mbboTest1'}} custom_selection_strings={['text 1','text 4']}/>
            </Grid>


          </Grid>

        </TabContainer>
        }
        {value === 4 &&     <TabContainer key='TabContainer4'>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <div> SPC1 West RF Amplitude </div>
              <GraphMultiplePVs  pvs={['pva://RF_SPC1_WEST:Rf_ADC_A_1_rescaled.AVAL']}  />
              <div> SPC1 East RF Amplitude </div>
              <GraphMultiplePVs  pvs={['pva://RF_SPC1_EAST:Rf_ADC_A_1_rescaled.AVAL']}  />
            </Grid>
            <Grid item xs={3}>
              <div> SPC1 West RF Phase </div>
              <GraphMultiplePVs  pvs={['pva://RF_SPC1_WEST:Rf_ADC_P_1']}  />
              <div> SPC1 East RF Phase </div>
              <GraphMultiplePVs  pvs={['pva://RF_SPC1_EAST:Rf_ADC_P_1']}  />

            </Grid>
          </Grid>

        </TabContainer>
        }
        {value === 5 && <TabContainer key='TabContainer5'>


<SimpleSlider  pv='pva://$(device):gain_lo' macros={{'$(device)':'rf_Test3'}}  min={0} max={32767} usePvLabel={true}  usePrecision={true} prec={0}/>
<TextInput  pv='pva://$(device):gain_lo' macros={{'$(device)':'rf_Test3'}}  min={0} max={32767} usePvLabel={true} usePrecision={true} prec={6}/>
<TextInput  pv='pva://$(device):frequency_lo' macros={{'$(device)':'rf_Test3'}}  min={0} max={50} usePvLabel={true} usePrecision={true} prec={6}/>
  <ThumbWheel pv={'pva://$(device):frequency_lo'} macros={{'$(device)':'rf_Test3'}} prec_integer={2} prec_decimal={6} buttonSize='medium'/>
        </TabContainer>
        }

        {value === 6 && 		<TabContainer key='TabContainer6'>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <GraphMultiplePVs  pvs={['pva://testIOC:test4'] } />
              <GraphMultiplePVs  pvs={['pva://testIOC:test5']}  />
              <SimpleSlider  pv='pva://$(device):amplitude' macros={{'$(device)':'testIOC'}} usePvMinMax={true} min={1000} max={500} usePvLabel={true}  />
              <TextInput  pv='pva://$(device):amplitude' macros={{'$(device)':'testIOC'}}   />
            </Grid>
          </Grid>
        </TabContainer>
        }
        {value === 7 && 		<TabContainer key='TabContainer7'>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <div> 1st quadrant</div>
            </Grid>
            <Grid item xs={6}>

              {/*<div > 2nd quadrant</div>*/}
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  {/* <div> 1st item </div>*/}
                  <div style={{height:'9vh'}}> SPC1 West RF Amplitude
                    <GraphMultiplePVs  pvs={['pva://RF_SPC1_WEST:Rf_ADC_A_1_rescaled.AVAL']}  />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  {/* <div> 2nd item </div>*/}
                  <div style={{height:'9vh'}}> SPC1 East RF Phase
                    <GraphMultiplePVs  pvs={['pva://RF_SPC1_WEST:Rf_ADC_P_1']}  />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  {/*<div> 3rd item </div>*/}
                  <div style={{height:'9vh'}}> SPC1 East RF Amplitude
                    <GraphMultiplePVs  pvs={['pva://RF_SPC1_EAST:Rf_ADC_A_1_rescaled.AVAL']}  />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  {/*<div> 4th item </div>*/}
                  <div style={{height:'9vh'}}> SPC1 East RF Phase
                    <GraphMultiplePVs  pvs={['pva://RF_SPC1_EAST:Rf_ADC_P_1']}  />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  {/* <div> 1st item </div>*/}
                  <div style={{height:'9vh'}}> SPC1 FT West RF Amplitude
                    <GraphMultiplePVs  pvs={['pva://RF_SPC1_FT_WEST:Rf_ADC_A_1_rescaled.AVAL']}  />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  {/* <div> 2nd item </div>*/}
                  <div style={{height:'9vh'}}> SPC1 FT West RF Phase
                    <GraphMultiplePVs  pvs={['pva://RF_SPC1_FT_WEST:Rf_ADC_P_1']}  />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  {/*<div> 3rd item </div>*/}
                  <div style={{height:'9vh'}}> SPC1 FT East RF Amplitude
                    <GraphMultiplePVs  pvs={['pva://RF_SPC1_FT_EAST:Rf_ADC_A_1_rescaled.AVAL']}  />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  {/*<div> 4th item </div>*/}
                  <div style={{height:'9vh'}}> SPC1 FT East RF Phase
                    <GraphMultiplePVs  pvs={['pva://RF_SPC1_FT_EAST:Rf_ADC_P_1']}  />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  {/* <div> 1st item </div>*/}
                  <div style={{height:'9vh'}}> SPC2 North RF Amplitude
                    <GraphMultiplePVs  pvs={['pva://RF_SPC2_NORTH:Rf_ADC_A_1_rescaled.AVAL']}  />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  {/* <div> 2nd item </div>*/}
                  <div style={{height:'9vh'}}> SPC2 North RF Phase
                    <GraphMultiplePVs  pvs={['pva://RF_SPC2_NORTH:Rf_ADC_P_1'] } />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  {/*<div> 3rd item </div>*/}
                  <div style={{height:'9vh'}}> SPC2 South RF Amplitude
                    <GraphMultiplePVs  pvs={['pva://RF_SPC2_SOUTH:Rf_ADC_A_1_rescaled.AVAL']}  />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  {/*<div> 4th item </div>*/}
                  <div style={{height:'9vh'}}> SPC2 South RF Phase
                    <GraphMultiplePVs  pvs={['pva://RF_SPC2_NORTH:Rf_ADC_P_1']}  />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  {/* <div> 1st item </div>*/}
                  <div style={{height:'9vh'}}> AX1 Buncher RF Amplitude
                    <GraphMultiplePVs  pvs={['pva://RF_AX1:Rf_ADC_A_1_rescaled.AVAL']}  />
                  </div>

                </Grid>
                <Grid item xs={3}>
                  {/* <div> 2nd item </div>*/}
                  <div style={{height:'9vh'}}> AX1 Buncher RF Phase
                    <GraphMultiplePVs  pvs={['pva://RF_AX1:Rf_ADC_P_1']}  />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  {/*<div> 3rd item </div>*/}

                </Grid>
                <Grid item xs={3}>
                  {/*<div> 4th item </div>*/}

                </Grid>
                <Grid item xs={3}>
                  {/* <div> 1st item </div>*/}
                  <div style={{height:'9vh'}}> K-line Buncher RF Amplitude
                    <GraphMultiplePVs  pvs={['pva://RF_K_LINE:Rf_ADC_A_1_rescaled.AVAL']}  />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  {/* <div> 2nd item </div>*/}
                  <div style={{height:'9vh'}}> K-line Buncher RF Phase
                    <GraphMultiplePVs  pvs={['pva://RF_K_LINE:Rf_ADC_P_1']}  />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  {/*<div> 3rd item </div>*/}

                </Grid>
                <Grid item xs={3}>
                  {/*<div> 4th item </div>*/}

                </Grid>
                <Grid item xs={3}>
                  {/* <div> 1st item </div>*/}
                  <div style={{height:'9vh'}}> J-line Buncher RF Amplitude
                    <GraphMultiplePVs  pvs={['pva://RF_J_LINE:Rf_ADC_A_1_rescaled.AVAL']}  />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  {/* <div> 2nd item </div>*/}
                  <div style={{height:'9vh'}}> J-line Buncher RF Phase
                    <GraphMultiplePVs  pvs={['pva://RF_J_LINE:Rf_ADC_P_1']}  />
                  </div>

                </Grid>
                <Grid item xs={3}>
                  {/*<div> 3rd item </div>*/}
                  <div style={{height:'9vh'}}> Pulse Selector RF Amplitude
                    <GraphMultiplePVs  pvs={['pva://RF_PULSE_SEL:Rf_ADC_A_1_rescaled.AVAL']}  />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  {/*<div> 4th item </div>*/}
                  <div style={{height:'9vh'}}> Pulse Selector RF Phase
                    <GraphMultiplePVs  pvs={['pva://RF_PULSE_SEL:Rf_ADC_P_1']}  />
                  </div>

                </Grid>
                <Grid item xs={3}>
                  {/* <div> 1st item </div>*/}
                  <div style={{height:'9vh'}}> SSC West RF Amplitude
                    <GraphMultiplePVs  pvs={['pva://RF_SSC_WEST:Rf_ADC_A_1_rescaled.AVAL']}  />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  {/* <div> 2nd item </div>*/}
                  <div style={{height:'9vh'}}> SSC West RF Phase
                    <GraphMultiplePVs  pvs={['pva://RF_SSC_WEST:Rf_ADC_P_1']}  />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  {/*<div> 3rd item </div>*/}
                  <div style={{height:'9vh'}}> SSC East RF Amplitude
                    <GraphMultiplePVs  pvs={['pva://RF_SSC_EAST:Rf_ADC_A_1_rescaled.AVAL']}  />
                  </div>

                </Grid>
                <Grid item xs={3}>
                  {/*<div> 4th item </div>*/}
                  <div style={{height:'9vh'}}> SSC East RF Phase
                    <GraphMultiplePVs  pvs={['pva://RF_SSC_EAST:Rf_ADC_P_1']}  />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  {/* <div> 1st item </div>*/}
                  <div style={{height:'9vh'}}> SSC FT RF Amplitude
                    <GraphMultiplePVs  pvs={['pva://RF_SSC_FT:Rf_ADC_A_1_rescaled.AVAL']}  />
                  </div>

                </Grid>
                <Grid item xs={3}>
                  {/* <div> 2nd item </div>*/}
                  <div style={{height:'9vh'}}> SSC FT RF Phase
                    <GraphMultiplePVs  pvs={['pva://RF_SSC_FT:Rf_ADC_P_1']}  />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  {/*<div> 3rd item </div>*/}
                  <div style={{height:'9vh'}}> SSC FT P/U 2 RF Amplitude
                    <GraphMultiplePVs  pvs={['pva://RF_SSC_FT:A5_rescaled.AVAL']}  />
                  </div>

                </Grid>
                <Grid item xs={3}>
                  {/*<div> 4th item </div>*/}
                  <div style={{height:'9vh'}}> SSC FT P/U 2 RF Phase
                    <GraphMultiplePVs  pvs={['pva://RF_SSC_FT:Rf_ADC_P_5']}  />
                  </div>

                </Grid>







              </Grid>

            </Grid>
            <Grid item xs={6}>
              <div> 3rd quadrant</div>
            </Grid>
            <Grid item xs={6}>
              <div> 4th quadrant</div>



            </Grid>




          </Grid>
        </TabContainer>
        }
      </div>
);
}
}

Demos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Demos);
