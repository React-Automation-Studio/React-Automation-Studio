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


class RfOverlay extends React.Component {


  render() {

    return (



      <Grid container spacing={3}>
        <Grid item xs={6}>
          <div style={{height:'50vh'}}> 1st quadrant</div>
          <div style={{height:'50vh'}}> 2nd quadrant</div>
        </Grid>
        <Grid item xs={6}>

          {/*<div > 2nd quadrant</div>*/}
          <h3 style={{textAlign: 'center'}}>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                {/* <div> 1st item </div>*/}
                <div style={{height:'11.65vh'}}> SPC1 West RF Amplitude
                  <GraphMultiplePVs pvs={['pva://RF_SPC1_WEST:A1_avg'  ]} maxLength={1200}/>
                </div>
              </Grid>
              <Grid item xs={3}>
                {/* <div> 2nd item </div>*/}
                <div style={{height:'11.65vh'}}> SPC1 East RF Phase
                  <GraphMultiplePVs pvs={['pva://RF_SPC1_WEST:P1_avg' ]} maxLength={1200}/>
                </div>
              </Grid>
              <Grid item xs={3}>
                {/*<div> 3rd item </div>*/}
                <div style={{height:'11.65vh'}}> SPC1 East RF Amplitude
                  <GraphMultiplePVs pvs={['pva://RF_SPC1_EAST:A1_avg'  ]} maxLength={1200}/>
                </div>
              </Grid>
              <Grid item xs={3}>
                {/*<div> 4th item </div>*/}
                <div style={{height:'11.65vh'}}> SPC1 East RF Phase
                  <GraphMultiplePVs pvs={['pva://RF_SPC1_EAST:P1_avg' ]} maxLength={1200}/>
                </div>
              </Grid>
              <Grid item xs={3}>
                {/* <div> 1st item </div>*/}
                <div style={{height:'11.65vh'}}> SPC1 FT West RF Amplitude
                  <GraphMultiplePVs pvs={['pva://RF_SPC1_FT_WEST:A1_avg'  ]} maxLength={1200}/>
                </div>
              </Grid>
              <Grid item xs={3}>
                {/* <div> 2nd item </div>*/}
                <div style={{height:'11.65vh'}}> SPC1 FT West RF Phase
                  <GraphMultiplePVs pvs={['pva://RF_SPC1_FT_WEST:P1_avg' ]} maxLength={1200}/>
                </div>
              </Grid>
              <Grid item xs={3}>
                {/*<div> 3rd item </div>*/}
                <div style={{height:'11.65vh'}}> SPC1 FT East RF Amplitude
                  <GraphMultiplePVs pvs={['pva://RF_SPC1_FT_EAST:A1_avg'  ]} maxLength={1200}/>
                </div>
              </Grid>
              <Grid item xs={3}>
                {/*<div> 4th item </div>*/}
                <div style={{height:'11.65vh'}}> SPC1 FT East RF Phase
                  <GraphMultiplePVs pvs={['pva://RF_SPC1_FT_EAST:P1_avg' ]} maxLength={1200}/>
                </div>
              </Grid>
              <Grid item xs={3}>
                {/* <div> 1st item </div>*/}
                <div style={{height:'11.65vh'}}> SPC2 North RF Amplitude
                  <GraphMultiplePVs pvs={['pva://RF_SPC2_NORTH:A1_avg'  ]} maxLength={1200}/>
                </div>
              </Grid>
              <Grid item xs={3}>
                {/* <div> 2nd item </div>*/}
                <div style={{height:'11.65vh'}}> SPC2 North RF Phase
                  <GraphMultiplePVs pvs={['pva://RF_SPC2_NORTH:P1_avg' ]} maxLength={1200}/>
                </div>
              </Grid>
              <Grid item xs={3}>
                {/*<div> 3rd item </div>*/}
                <div style={{height:'11.65vh'}}> SPC2 South RF Amplitude
                  <GraphMultiplePVs pvs={['pva://RF_SPC2_SOUTH:A1_avg'  ]} maxLength={1200}/>
                </div>
              </Grid>
              <Grid item xs={3}>
                {/*<div> 4th item </div>*/}
                <div style={{height:'11.65vh'}}> SPC2 South RF Phase
                  <GraphMultiplePVs pvs={['pva://RF_SPC2_NORTH:P1_avg' ]} maxLength={1200}/>
                </div>
              </Grid>
              <Grid item xs={3}>
                {/* <div> 1st item </div>*/}
                <div style={{height:'11.65vh'}}> AX1 Buncher RF Amplitude
                  <GraphMultiplePVs pvs={['pva://RF_AX1:A1_avg'  ]} maxLength={1200}/>
                </div>

              </Grid>
              <Grid item xs={3}>
                {/* <div> 2nd item </div>*/}
                <div style={{height:'11.65vh'}}> AX1 Buncher RF Phase
                  <GraphMultiplePVs pvs={['pva://RF_AX1:P1_avg' ]} maxLength={1200}/>
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
                <div style={{height:'11.65vh'}}> K-line Buncher RF Amplitude
                  <GraphMultiplePVs pvs={['pva://RF_K_LINE:A1_avg'  ]} maxLength={1200}/>
                </div>
              </Grid>
              <Grid item xs={3}>
                {/* <div> 2nd item </div>*/}
                <div style={{height:'11.65vh'}}> K-line Buncher RF Phase
                  <GraphMultiplePVs pvs={['pva://RF_K_LINE:P1_avg' ]} maxLength={1200}/>
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
                <div style={{height:'11.65vh'}}> J-line Buncher RF Amplitude
                  <GraphMultiplePVs pvs={['pva://RF_J_LINE:A1_avg'  ]} maxLength={1200}/>
                </div>
              </Grid>
              <Grid item xs={3}>
                {/* <div> 2nd item </div>*/}
                <div style={{height:'11.65vh'}}> J-line Buncher RF Phase
                  <GraphMultiplePVs pvs={['pva://RF_J_LINE:P1_avg' ]} maxLength={1200}/>
                </div>

              </Grid>
              <Grid item xs={3}>
                {/*<div> 3rd item </div>*/}
                <div style={{height:'11.65vh'}}> Pulse Selector RF Amplitude
                  <GraphMultiplePVs pvs={['pva://RF_PULSE_SEL:A1_avg'  ]} maxLength={1200}/>
                </div>
              </Grid>
              <Grid item xs={3}>
                {/*<div> 4th item </div>*/}
                <div style={{height:'11.65vh'}}> Pulse Selector RF Phase
                  <GraphMultiplePVs pvs={['pva://RF_PULSE_SEL:P1_avg' ]} maxLength={1200}/>
                </div>

              </Grid>
              <Grid item xs={3}>
                {/* <div> 1st item </div>*/}
                <div style={{height:'11.65vh'}}> SSC West RF Amplitude
                  <GraphMultiplePVs pvs={['pva://RF_SSC_WEST:A1_avg'  ]} maxLength={1200}/>
                </div>
              </Grid>
              <Grid item xs={3}>
                {/* <div> 2nd item </div>*/}
                <div style={{height:'11.65vh'}}> SSC West RF Phase
                  <GraphMultiplePVs pvs={['pva://RF_SSC_WEST:P1_avg' ]} maxLength={1200}/>
                </div>
              </Grid>
              <Grid item xs={3}>
                {/*<div> 3rd item </div>*/}
                <div style={{height:'11.65vh'}}> SSC East RF Amplitude
                  <GraphMultiplePVs pvs={['pva://RF_SSC_EAST:A1_avg'  ]} maxLength={1200}/>
                </div>

              </Grid>
              <Grid item xs={3}>
                {/*<div> 4th item </div>*/}
                <div style={{height:'11.65vh'}}> SSC East RF Phase
                  <GraphMultiplePVs pvs={['pva://RF_SSC_EAST:P1_avg' ]} maxLength={1200}/>
                </div>
              </Grid>
              <Grid item xs={3}>
                {/* <div> 1st item </div>*/}
                <div style={{height:'11.65vh'}}> SSC FT RF Amplitude
                  <GraphMultiplePVs pvs={['pva://RF_SSC_FT:A1_avg','pva://RF_SSC_FT:A5_avg'  ]} maxLength={1200}/>
                </div>

              </Grid>
              <Grid item xs={3}>
                {/* <div> 2nd item </div>*/}
                <div style={{height:'11.65vh'}}> SSC FT RF Phase
                  <GraphMultiplePVs pvs={['pva://RF_SSC_FT:P1_avg','pva://RF_SSC_FT:P5_avg' ]} maxLength={1200}/>
                </div>
              </Grid>
              <Grid item xs={3}>
                {/*<div> 3rd item </div>*/}
                <div style={{height:'11.65vh'}}> SSC FT P/U 2 RF Amplitude
                  <GraphMultiplePVs pvs={['pva://RF_SSC_FT:A5_rescaled.AVAL'  ]}/>
                </div>

              </Grid>
              <Grid item xs={3}>
                {/*<div> 4th item </div>*/}
                <div style={{height:'11.65vh'}}> SSC FT P/U 2 RF Phase
                  <GraphMultiplePVs pvs={['pva://RF_SSC_FT:Rf_ADC_P_5'  ]}/>
                </div>

              </Grid>







            </Grid>
          </h3>
        </Grid>
        {/*<Grid item xs={6}>
            <div> 3rd quadrant</div>
            </Grid>
            <Grid item xs={6}>
            <div> 4th quadrant</div>



            </Grid>

          */}


        </Grid>

        );
        }
        }


        export default RfOverlay;
