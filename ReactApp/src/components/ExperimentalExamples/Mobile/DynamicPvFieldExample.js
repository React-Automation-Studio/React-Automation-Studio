import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

import TextInput from '../../BaseComponents/TextInput';

import Slider from '../../BaseComponents/Slider';

import Card from '@material-ui/core/Card';


const styles = theme => ({
  body1: theme.typography.body1,
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    overflowX: "hidden",
    overflowY: "hidden",
    marginTop: 40,
    marginBottom: 100,
  },
  paper: {
    padding: theme.spacing(1) * 0,
    margin: theme.spacing(1) * 0,
    height: '100%',
    color: theme.palette.text.secondary,
  },
  control: {
    padding: theme.spacing(1) * 2,
  },
});

class DynamicPvFieldExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      stateValue: 0,
      showAdvancedSettings: 0,
    };
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleStateChange(stateValue) {
    this.setState({ stateValue })
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={6}>
            <Typography style={{ paddingBottom: 0 }}> Example with prop useMetadata=true</Typography>
            <Card>
              <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                  <TextInput
                    pv='$(device):dynamicPvFields'
                    macros={{ '$(device)': 'testIOC' }}
                    label={'edas'}
                    usePvUnits={true}
                    usePvLabel={true}
                    usePvMinMax={true}
                    usePvPrecision={true}
                    alarmSensitive={true}
                    useMetadata={true}
                  />
                </Grid>
                <Grid item xs={12}  >
                  <Slider
                    pv='$(device):dynamicPvFields'
                    macros={{ '$(device)': 'testIOC' }}
                    label={'edas'}
                    usePvUnits={true}
                    usePvLabel={true}
                    usePvMinMax={true}
                    usePvPrecision={true}
                    alarmSensitive={true}
                    useMetadata={true}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Typography style={{ paddingBottom: 0 }}> Dynamic example with prop useMetadata=false</Typography>
            <Card>
              <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                  <TextInput
                    pv='$(device):dynamicPvFields'
                    macros={{ '$(device)': 'testIOC' }}
                    label={'edas'}
                    usePvUnits={true}
                    usePvLabel={true}
                    usePvMinMax={true}
                    usePvPrecision={true}
                    alarmSensitive={true}
                    useMetadata={false}
                  />
                </Grid>
                <Grid item xs={12}  >
                  <Slider
                    pv='$(device):dynamicPvFields'
                    macros={{ '$(device)': 'testIOC' }}
                    label={'edas'}
                    usePvUnits={true}
                    usePvLabel={true}
                    usePvMinMax={true}
                    usePvPrecision={true}
                    alarmSensitive={true}
                    useMetadata={false}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextInput
                    pv='$(device):dynamicPvFields:LOPR'
                    macros={{ '$(device)': 'testIOC' }}
                    usePvMinMax={true}
                    usePvLabel={true}
                    useMetadata={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextInput
                    pv='$(device):dynamicPvFields:HOPR'
                    macros={{ '$(device)': 'testIOC' }}
                    usePvMinMax={true}
                    usePvLabel={true}
                    useMetadata={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextInput
                    pv='$(device):dynamicPvFields:EGU'
                    macros={{ '$(device)': 'testIOC' }}
                    usePvLabel={true}
                    useMetadata={true}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextInput
                    pv='$(device):dynamicPvFields:PREC'
                    macros={{ '$(device)': 'testIOC' }}
                    usePvMinMax={true}
                    usePvLabel={true}
                    usePvPrecision={true}
                    useMetadata={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextInput
                    pv='$(device):dynamicPvFields:DESC'
                    macros={{ '$(device)': 'testIOC' }}
                    usePvLabel={true}
                    useMetadata={true}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DynamicPvFieldExample);
