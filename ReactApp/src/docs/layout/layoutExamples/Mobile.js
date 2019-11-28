import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Face from '@material-ui/icons/Face';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Cancel from '@material-ui/icons/Cancel';

import TextInput from '../../../components/BaseComponents/TextInput';
import TextOutput from '../../../components/BaseComponents/TextOutput';
import ToggleButton from '../../../components/BaseComponents/ToggleButton';
import Gauge from '../../../components/BaseComponents/Gauge';
import SimpleSlider from '../../../components/BaseComponents/SimpleSlider';
import GraphY from '../../../components/BaseComponents/GraphY';
import StyledIconIndicator from '../../../components/BaseComponents/StyledIconIndicator';
import SelectionInput from '../../../components/BaseComponents/SelectionInput';
import ThumbWheel from '../../../components/BaseComponents/ThumbWheel';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1) * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});
/**
* @visibleName Mobile Layout
*/
class Mobile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <div style={{height:'15vh'}}>
            <GraphY
              pvs={['pva://testIOC:test4','pva://testIOC:test5'] }
              legend={['Sine Wave ','Amplitude ']}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <ToggleButton  pv='pva://$(device)' macros={{'$(device)':'testIOC:BO1'}}  custom_selection_strings={["OFF","ON"]} />
        </Grid>
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={1}>
          <StyledIconIndicator  pv='pva://$(device)' macros={{'$(device)':'testIOC:BO1'}}  onColor='lime' offColor='grey'>
            <CheckCircle/>
          </StyledIconIndicator>
        </Grid>
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={1}>
          <StyledIconIndicator  pv='pva://$(device)' macros={{'$(device)':'testIOC:BO1'}}  onColor='grey' offColor='red'>
            <Cancel/>
          </StyledIconIndicator>
        </Grid>


        <Grid item xs={6}>
          <TextOutput   pv='pva://$(device)'  macros={{'$(device)':'testIOC:mbboTest1'}}/>
        </Grid>
        <Grid item xs={6}>
          <SelectionInput  pv='pva://$(device)'  macros={{'$(device)':'testIOC:mbboTest1'}}  />
        </Grid>


        <Grid item xs={12}>
          <Gauge
            pv='pva://$(device)'
            macros={{'$(device)':'testIOC:amplitude'}}
            usePvMinMax={true}/>
        </Grid>


        <Grid item xs={12}>   {/* FIFTH ROW */}
          <ThumbWheel
            pv='pva://$(device)'
            macros={{'$(device)':'testIOC:amplitude'}}
            prec_integer={3}
            prec_decimal={1}
            usePvMinMax={true}
          />
        </Grid>
        <Grid item xs={12}>  {/* SIXTH ROW */}
          <SimpleSlider pv='pva://$(device):amplitude' macros={{'$(device)':'testIOC'}} usePvMinMax={true}  usePvLabel={true}  />
        </Grid>

      </Grid>
      </React.Fragment>
    );
  }
}

Mobile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Mobile);
