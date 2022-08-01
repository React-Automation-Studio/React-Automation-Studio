import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';

import Grid from '@mui/material/Grid';
import TextInput from '../../BaseComponents/TextInput';
import TextOutput from '../../BaseComponents/TextOutput';
import Slider from '../../BaseComponents/Slider';
import SideBar from '../../SystemComponents/SideBar';
import AppBar from '@mui/material/AppBar';

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;

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

class ExperimentalMobileDemo1 extends React.Component {
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
    const { width } = this.props;

    const { classes } = this.props;

    let graphVH;
    if (width == 'xs') {
      graphVH = '25vh';
    } else if (width == 'sm') {
      graphVH = '30vh'
    } else {
      graphVH = '30vh'
    }

    return (
      <React.Fragment>
        <AppBar style={{ position: 'fixed', bottom: 'auto', top: '0' }} color='inherit' >
          <Grid container direction="row" item justifyContent="center" spacing={2} alignItems="center">
            <Grid item xs={2}  >
              <SideBar />
            </Grid>
            <Grid item xs={10} >
              <div className={classes.body1}>Hooks debugging</div>
            </Grid>
          </Grid>
        </AppBar>

        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={6}>
            <TextInput
              pv='$(device):amplitude'
              macros={{ '$(device)': 'testIOC' }}
              label={'edas'}
              usePvUnits={true}
              usePvLabel={true}
              usePvMinMax={true}
              prec={3}
              alarmSensitive={true}
              useMetadata={true}
            />
          </Grid>
          <Grid item xs={6}>
            <TextOutput
              pv='$(device):amplitude'
              macros={{ '$(device)': 'testIOC' }}
              label={'edas'}
              units={'h'}
              usePvMinMax={true}
              prec={1}
              alarmSensitive={true}
              useMetadata={true}
            />
          </Grid>
          <Grid item xs={6}  >
            <Slider
              pv='$(device):amplitude'
              macros={{ '$(device)': 'testIOC' }}
              usePvMinMax={true}
              units={"V"}
              min={0}
              max={500}
              prec={3}
              useMetadata={true}
            />
          </Grid>
          <Grid item xs={6}  >
            <Slider
              pv='$(device):amplitude'
              macros={{ '$(device)': 'testIOC' }}
              units={"V"}
              min={2000}
              max={5000}
              prec={3}
              useMetadata={true}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

ExperimentalMobileDemo1.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withWidth()(withStyles(styles, { withTheme: true })(ExperimentalMobileDemo1));
