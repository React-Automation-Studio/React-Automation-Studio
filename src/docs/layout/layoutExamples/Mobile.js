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
import GraphMultiplePVs from '../../../components/BaseComponents/GraphMultiplePVs';
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
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems={'stretch'} direction={'column'} justify={'flex-start'}>
              <Grid item>    {/* TOP ROW */}
                <div style={{height:'15vh'}}>
                  <GraphMultiplePVs
                   pvs={['pva://testIOC:test4','pva://testIOC:test5'] }
                   legend={['Sine Wave ','Amplitude ']}
                  />
                </div>
              </Grid>
              <Grid item >   {/* SECOND ROW */}
                <Grid container direction="row" justify="center" spacing={2} alignItems="stretch">
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
                  <Grid item xs={2}>
                  </Grid>

                </Grid>
              </Grid>
              <Grid item>   {/* THIRD ROW */}
                <Grid container direction="row" justify="center" spacing={2} alignItems="stretch">
                  <Grid item xs={6}>
                    <TextOutput   pv='pva://$(device)'  macros={{'$(device)':'testIOC:mbboTest1'}}/>
                  </Grid>
                  <Grid item xs={6}>
                    <SelectionInput  pv='pva://$(device)'  macros={{'$(device)':'testIOC:mbboTest1'}}  />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item> {/* FOURTH ROW */}
                <Grid container direction="row" justify="center" spacing={2} alignItems="stretch">
                  <Grid item xs={8}>
                    <Gauge
                      pv='pva://$(device)'
                      macros={{'$(device)':'testIOC:amplitude'}}
                      usePvMinMax={true}/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>   {/* FIFTH ROW */}
              <ThumbWheel
                pv='pva://$(device)'
                macros={{'$(device)':'testIOC:amplitude'}}
                prec_integer={3}
                prec_decimal={1}
                usePvMinMax={true}
              />
              </Grid>
              <Grid item>  {/* SIXTH ROW */}
              <SimpleSlider pv='pva://$(device):amplitude' macros={{'$(device)':'testIOC'}} usePvMinMax={true}  usePvLabel={true}  />
              </Grid>
            </Grid>
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
