import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';

import Grid from '@mui/material/Grid';

import CheckCircle from '@mui/icons-material/CheckCircle';
import Cancel from '@mui/icons-material/Cancel';

import TextOutput from '../../../components/BaseComponents/TextOutput';
import ToggleButton from '../../../components/BaseComponents/ToggleButton';
import Gauge from '../../../components/BaseComponents/Gauge';
import Slider from '../../../components/BaseComponents/Slider';
import GraphY from '../../../components/BaseComponents/GraphY';
import StyledIconIndicator from '../../../components/BaseComponents/StyledIconIndicator';
import SelectionInput from '../../../components/BaseComponents/SelectionInput';
import ThumbWheel from '../../../components/BaseComponents/ThumbWheel';


/**
* 
* When creating more complex layouts or mobile layouts we recommend you stack the grid as a column of rows. This ensures that each row expands to the height of the highest component in that row. This is illustrated below.
*/
class Mobile extends React.Component {
 

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
      <Grid container sx={{flexGrow: 1,}} spacing={2}>
        <Grid item xs={12}>
          <div style={{height:'15vh'}}>
            <GraphY
              pvs={['testIOC:test4','testIOC:test5'] }
              legend={['Sine Wave ','Amplitude ']}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <ToggleButton  pv='$(device)' macros={{'$(device)':'testIOC:BO1'}}  custom_selection_strings={["OFF","ON"]} />
        </Grid>
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={1}>
          <StyledIconIndicator  pv='$(device)' macros={{'$(device)':'testIOC:BO1'}}  onColor='lime' offColor='grey'>
            <CheckCircle/>
          </StyledIconIndicator>
        </Grid>
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={1}>
          <StyledIconIndicator  pv='$(device)' macros={{'$(device)':'testIOC:BO1'}}  onColor='grey' offColor='red'>
            <Cancel/>
          </StyledIconIndicator>
        </Grid>


        <Grid item xs={6}>
          <TextOutput   pv='$(device)'  macros={{'$(device)':'testIOC:mbboTest1'}}/>
        </Grid>
        <Grid item xs={6}>
          <SelectionInput  pv='$(device)'  macros={{'$(device)':'testIOC:mbboTest1'}}  />
        </Grid>


        <Grid item xs={12}>
          <Gauge
            pv='$(device)'
            macros={{'$(device)':'testIOC:amplitude'}}
            usePvMinMax={true}/>
        </Grid>


        <Grid item xs={12}>   {/* FIFTH ROW */}
          <ThumbWheel
            pv='$(device)'
            macros={{'$(device)':'testIOC:amplitude'}}
            prec_integer={3}
            prec_decimal={1}
            usePvMinMax={true}
          />
        </Grid>
        <Grid item xs={12}>  {/* SIXTH ROW */}
          <Slider pv='$(device):amplitude' macros={{'$(device)':'testIOC'}} usePvMinMax={true}  usePvLabel={true}  />
        </Grid>

      </Grid>
      </React.Fragment>
    );
  }
}


export default Mobile;
