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
                    pvs={['loc://testVariable1',]}
                    legend={['loc://testVariable1',]}
                    maxLength={100}
                  />
                </div>
              </Grid>
              <Grid item >   {/* SECOND ROW */}
                <Grid container direction="row" justify="center" spacing={2} alignItems="stretch">
                  <Grid item xs={6}>
                    <ToggleButton  pv='loc://testVariable'  custom_selection_strings={["OFF","ON"]} />
                  </Grid>
                  <Grid item xs={1}>
                  </Grid>
                  <Grid item xs={1}>
                    <StyledIconIndicator  pv='loc://testVariable'  onColor='lime' offColor='grey'>
                      <CheckCircle/>
                    </StyledIconIndicator>
                  </Grid>
                  <Grid item xs={1}>
                  </Grid>
                  <Grid item xs={1}>
                    <StyledIconIndicator  pv='loc://testVariable'  onColor='grey' offColor='red'>
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
                    <TextOutput  pv='loc://testVariable3'   label='Mode' intialLocalVariableValue='Mode 1'/>
                  </Grid>
                  <Grid item xs={6}>
                    <SelectionInput  pv='loc://testVariable3'   label='Mode Selection'  custom_selection_strings={['Mode 1','Mode 2']}/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item> {/* FOURTH ROW */}
                <Grid container direction="row" justify="center" spacing={2} alignItems="stretch">
                  <Grid item xs={8}>
                    <Gauge  pv='loc://testVariable1'/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>   {/* FIFTH ROW */}
                <ThumbWheel  pv='loc://testVariable1' prec_integer={2} prec_decimal={3}  min={0} max={100}/>
              </Grid>
              <Grid item>  {/* SIXTH ROW */}
                <SimpleSlider pv='loc://testVariable1' min={0} max={100} label="loc://testVariable1:"/>
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
