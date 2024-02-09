//This example is deprecated and will be removed in a future release 
import React from 'react'

import AutomationStudioContext from '../../SystemComponents/AutomationStudioContext';
import TextInput from '../../BaseComponents/TextInput';
import TextOutput from '../../BaseComponents/TextOutput';
import Grid from '@mui/material/Grid';
import ToggleButton from '../../BaseComponents/ToggleButton';

import Paper from '@mui/material/Paper';

import withStyles from '@mui/styles/withStyles';

import ThumbWheel from '../../BaseComponents/ThumbWheel';
import Close from '@mui/icons-material/Close';

console.warn("This example is deprecated and will be removed in a future release")
const styles = theme => ({
  body1: theme.typography.body1,
});

class ControlRightSlitXY extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 'showSettings': false }
  }

  handleSettingsButtonClick = () => {
    this.setState({ 'showSettings': true });
  }

  render() {
    const system = this.props.system;
    const { classes } = this.props;

    return (
      <div className={classes.body1} style={{ paddingRight: 12 }}>
        <Grid style={{ paddingLeft: 12, paddingRight: 24, }} container spacing={2}>
          <Grid item xs={11}>
            {system.displayName + ": X"}
          </Grid>
          <Grid item xs={1}>
            <Close fontSize="small" onClick={this.props.handleCloseEditor} />
          </Grid>
        </Grid>
        <Paper style={{ padding: 8 }} elevation={this.props.theme.palette.paperElevation}>
          <Grid container
            direction="row"
            justifyContent="flex-start"
            alignItems="center" spacing={1}>
            <Grid item xs={3}  >
              <TextInput pv={ system.devices.xGapDevice.deviceName + ":" + system.devices.xGapDevice.setpoint}  prec={2} label={'X Gap Setpoint'} alarmSensitive={true} usePvUnits={true} usePvMinMax={true} />
            </Grid>
            <Grid item xs={3}  >
              <TextOutput pv={ system.devices.xGapDevice.deviceName + ":" + system.devices.xGapDevice.readback} label={'X Gap Readback'}  prec={2} usePvUnits={true} alarmSensitive={true} />
            </Grid>
            <Grid item xs={3}  >
              <TextOutput displayMetaData={'lower_disp_limit'} pv={ system.devices.xGapDevice.deviceName + ":" + system.devices.xGapDevice.setpoint} label={'X Gap Min'}  prec={2} usePvUnits={true} />
            </Grid>
            <Grid item xs={3}  >
              <TextOutput displayMetaData={'upper_disp_limit'} pv={ system.devices.xGapDevice.deviceName + ":" + system.devices.xGapDevice.setpoint} label={'X Gap Max'}  prec={2} usePvUnits={true} />
            </Grid>
            <Grid item xs={7}  >
              <ThumbWheel
                pv={ system.devices.xGapDevice.deviceName + ":" + system.devices.xGapDevice.setpoint}
                macros={this.props['macros']}
                prec_integer={1}
                prec_decimal={2}
              />
            </Grid>
            <Grid item xs={5}  >
              <ToggleButton pv={ system.systemName + ':X:Drive:On'} macros={this.props['macros']} labelPlacement={"top"} label={"Drive"} />
            </Grid>
          </Grid>
        </Paper>
        <Paper style={{ marginTop: 6, padding: 8 }} elevation={this.props.theme.palette.paperElevation} >
          <Grid container
            direction="row"
            justifyContent="flex-start"
            alignItems="center" spacing={1}>
            <Grid item xs={3}  >
              <TextInput pv={ system.devices.xOffsetDevice.deviceName + ":" + system.devices.xOffsetDevice.setpoint}  prec={2} label={'X Offset Setpoint'} alarmSensitive={true} usePvUnits={true} usePvMinMax={true} />
            </Grid>
            <Grid item xs={3}  >
              <TextOutput pv={ system.devices.xOffsetDevice.deviceName + ":" + system.devices.xOffsetDevice.readback} label={'X Offset Readback'}  prec={2} usePvUnits={true} alarmSensitive={true} />
            </Grid>
            <Grid item xs={3}  >
              <TextOutput displayMetaData={'lower_disp_limit'} pv={ system.devices.xOffsetDevice.deviceName + ":" + system.devices.xOffsetDevice.setpoint} label={'X Offset Min'}  prec={2} usePvUnits={true} />
            </Grid>
            <Grid item xs={3}  >
              <TextOutput displayMetaData={'upper_disp_limit'} pv={ system.devices.xOffsetDevice.deviceName + ":" + system.devices.xOffsetDevice.setpoint} label={'X Offset Max'}  prec={2} usePvUnits={true} />
            </Grid>
            <Grid item xs={7}  >
              <ThumbWheel
                pv={ system.devices.xOffsetDevice.deviceName + ":" + system.devices.xOffsetDevice.setpoint}
                macros={this.props['macros']}
                prec_integer={1}
                prec_decimal={2}
              />
            </Grid>
          </Grid>
        </Paper>
        <div className={classes.body1} style={{ marginTop: 12 }}>
          {system.displayName + ": Y"}
          <Paper style={{ padding: 12 }} elevation={this.props.theme.palette.paperElevation}>
            <Grid container
              direction="row"
              justifyContent="flex-start"
              alignItems="center" spacing={1}>
              <Grid item xs={3}  >
                <TextInput pv={ system.devices.yGapDevice.deviceName + ":" + system.devices.yGapDevice.setpoint}  prec={2} label={'Y Gap Setpoint'} alarmSensitive={true} usePvUnits={true} usePvMinMax={true} />
              </Grid>
              <Grid item xs={3}  >
                <TextOutput pv={ system.devices.yGapDevice.deviceName + ":" + system.devices.yGapDevice.readback} label={'Y Gap Readback'}  prec={2} usePvUnits={true} alarmSensitive={true} />
              </Grid>
              <Grid item xs={3}  >
                <TextOutput displayMetaData={'lower_disp_limit'} pv={ system.devices.yGapDevice.deviceName + ":" + system.devices.yGapDevice.setpoint} label={'Y Gap Min'}  prec={2} usePvUnits={true} />
              </Grid>
              <Grid item xs={3}  >
                <TextOutput displayMetaData={'upper_disp_limit'} pv={ system.devices.yGapDevice.deviceName + ":" + system.devices.yGapDevice.setpoint} label={'Y Gap Max'}  prec={2} usePvUnits={true} />
              </Grid>
              <Grid item xs={7}  >
                <ThumbWheel
                  pv={ system.devices.yGapDevice.deviceName + ":" + system.devices.yGapDevice.setpoint}
                  macros={this.props['macros']}
                  prec_integer={1}
                  prec_decimal={2}
                />
              </Grid>
              <Grid item xs={5}  >
                <ToggleButton pv={ system.systemName + ':Y:Drive:On'} macros={this.props['macros']} labelPlacement={"top"} label={"Drive"} />
              </Grid>
            </Grid>
          </Paper>
          <Paper style={{ marginTop: 6, padding: 12 }} elevation={this.props.theme.palette.paperElevation}>
            <Grid container
              direction="row"
              justifyContent="flex-start"
              alignItems="center" spacing={1}>
              <Grid item xs={3}  >
                <TextInput pv={ system.devices.yOffsetDevice.deviceName + ":" + system.devices.yOffsetDevice.setpoint}  prec={2} label={'Y Offset Setpoint'} alarmSensitive={true} usePvUnits={true} usePvMinMax={true} />
              </Grid>
              <Grid item xs={3}  >
                <TextOutput pv={ system.devices.yOffsetDevice.deviceName + ":" + system.devices.yOffsetDevice.readback} label={'Y Offset Readback'}  prec={2} usePvUnits={true} alarmSensitive={true} />
              </Grid>
              <Grid item xs={3}  >
                <TextOutput displayMetaData={'lower_disp_limit'} pv={ system.devices.yOffsetDevice.deviceName + ":" + system.devices.yOffsetDevice.setpoint} label={'Y Offset Min'}  prec={2} usePvUnits={true} />
              </Grid>
              <Grid item xs={3}  >
                <TextOutput displayMetaData={'upper_disp_limit'} pv={ system.devices.yOffsetDevice.deviceName + ":" + system.devices.yOffsetDevice.setpoint} label={'Y Offset Max'}  prec={2} usePvUnits={true} />
              </Grid>
              <Grid item xs={7}  >
                <ThumbWheel
                  pv={ system.devices.yOffsetDevice.deviceName + ":" + system.devices.yOffsetDevice.setpoint}
                  macros={this.props['macros']}
                  prec_integer={1}
                  prec_decimal={2}
                />
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
    );
  }
}

ControlRightSlitXY.contextType = AutomationStudioContext;
export default withStyles(styles, { withTheme: true })(ControlRightSlitXY)
