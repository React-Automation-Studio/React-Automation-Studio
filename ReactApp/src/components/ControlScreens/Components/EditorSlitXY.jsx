import React, {useState} from 'react'

import TextInput from '../../BaseComponents/TextInput';
import TextOutput from '../../BaseComponents/TextOutput';
import Grid from '@mui/material/Grid';
import ToggleButton from '../../BaseComponents/ToggleButton';

import Paper from '@mui/material/Paper';

import withStyles from '@mui/styles/withStyles';

import ThumbWheel from '../../BaseComponents/ThumbWheel';
import Close from '@mui/icons-material/Close';
import {replaceSystemMacros} from '../../SystemComponents/Utils/macroReplacement';

const styles = theme => ({
  body1: theme.typography.body1,
});

const EditorSlitXY = (props) => {
  const [system]=useState(replaceSystemMacros(props.system,props.system.macros))
  const { classes } = props;
  return (
    <div className={classes.body1} style={{ paddingRight: 12 }}>
      <Grid container
        style={{ paddingLeft: 12, paddingRight: 24, }}        
        spacing={2}
      >
        <Grid item xs={11}>
          {system.displayName + ": X"}
        </Grid>
        <Grid item xs={1}>
          <Close fontSize="small" onClick={props.handleCloseEditor} />
        </Grid>
      </Grid>
      <Paper style={{ padding: 8 }} elevation={props.theme.palette.paperElevation}>
        <Grid container
          direction="row"
          justifyContent="flex-start"
          alignItems="center" spacing={1}
        >
          <Grid item xs={3}>
            <TextInput
              pv={system.xGapSetpointPv}
              prec={2}
              label={'X Gap Setpoint'}
              alarmSensitive={true}
              usePvUnits={true}
              usePvMinMax={true}
            />
          </Grid>
          <Grid item xs={3}>
            <TextOutput
              pv={system.xGapReadbackPv}
              label={'X Gap Readback'}
              prec={2}
              usePvUnits={true}
              alarmSensitive={true}
            />
          </Grid>
          <Grid item xs={3}>
            <TextOutput
              displayMetaData={'lower_disp_limit'}
              pv={system.xGapSetpointPv}
              label={'X Gap Min'}
              prec={2}
              usePvUnits={true}
            />
          </Grid>
          <Grid item xs={3}>
            <TextOutput
              displayMetaData={'upper_disp_limit'}
              pv={system.xGapSetpointPv}
              label={'X Gap Max'}
              prec={2}
              usePvUnits={true}
            />
          </Grid>
          <Grid item xs={7}>
            <ThumbWheel
              pv={system.xGapSetpointPv}
              macros={props['macros']}
              prec_integer={1}
              prec_decimal={2}
            />
          </Grid>
          <Grid item xs={5}>
            <ToggleButton
              pv={system.xDriveOnPv}
              macros={props['macros']}
              labelPlacement={"top"}
              label={"Drive"}
            />
          </Grid>
        </Grid>
      </Paper>
      <Paper style={{ marginTop: 6, padding: 8 }} elevation={props.theme.palette.paperElevation} >
        <Grid container
          direction="row"
          justifyContent="flex-start"
          alignItems="center" spacing={1}>
          <Grid item xs={3}>
            <TextInput
              pv={system.xOffsetSetpointPv}
              prec={2}
              label={'X Offset Setpoint'}
              alarmSensitive={true}
              usePvUnits={true}
              usePvMinMax={true}
            />
          </Grid>
          <Grid item xs={3}>
            <TextOutput
              pv={system.xOffsetReadbackPv}
              label={'X Offset Readback'}
              prec={2}
              usePvUnits={true}
              alarmSensitive={true}
            />
          </Grid>
          <Grid item xs={3}>
            <TextOutput
              displayMetaData={'lower_disp_limit'}
              pv={system.xOffsetSetpointPv}
              label={'X Offset Min'}
              prec={2}
              usePvUnits={true}
            />
          </Grid>
          <Grid item xs={3}>
            <TextOutput
              displayMetaData={'upper_disp_limit'}
              pv={system.xOffsetSetpointPv}
              label={'X Offset Max'}
              prec={2}
              usePvUnits={true}
            />
          </Grid>
          <Grid item xs={7}>
            <ThumbWheel
              pv={system.xOffsetSetpointPv}
              macros={props['macros']}
              prec_integer={1}
              prec_decimal={2}
            />
          </Grid>
        </Grid>
      </Paper>
      <div className={classes.body1} style={{ marginTop: 12 }}>
        {system.displayName + ": Y"}
        <Paper style={{ padding: 12 }} elevation={props.theme.palette.paperElevation}>
          <Grid container
            direction="row"
            justifyContent="flex-start"
            alignItems="center" spacing={1}>
            <Grid item xs={3}>
              <TextInput
                pv={system.yGapSetpointPv}
                prec={2}
                label={'Y Gap Setpoint'}
                alarmSensitive={true}
                usePvUnits={true}
                usePvMinMax={true}
              />
            </Grid>
            <Grid item xs={3}>
              <TextOutput
                pv={system.yGapReadbackPv}
                label={'Y Gap Readback'}
                prec={2}
                usePvUnits={true}
                alarmSensitive={true}
              />
            </Grid>
            <Grid item xs={3}>
              <TextOutput
                displayMetaData={'lower_disp_limit'}
                pv={system.yGapSetpointPv}
                label={'Y Gap Min'}
                prec={2}
                usePvUnits={true}
              />
            </Grid>
            <Grid item xs={3}>
              <TextOutput
                displayMetaData={'upper_disp_limit'}
                pv={system.yGapSetpointPv}
                label={'Y Gap Max'}
                prec={2}
                usePvUnits={true}
              />
            </Grid>
            <Grid item xs={7}>
              <ThumbWheel
                pv={system.yGapSetpointPv}
                macros={props['macros']}
                prec_integer={1}
                prec_decimal={2}
              />
            </Grid>
            <Grid item xs={5}>
              <ToggleButton pv={system.yDriveOnPv} macros={props['macros']} labelPlacement={"top"} label={"Drive"} />
            </Grid>
          </Grid>
        </Paper>
        <Paper style={{ marginTop: 6, padding: 8 }} elevation={props.theme.palette.paperElevation} >
          <Grid container
            direction="row"
            justifyContent="flex-start"
            alignItems="center" spacing={1}>
            <Grid item xs={3}>
              <TextInput
                pv={system.yOffsetSetpointPv}
                prec={2}
                label={'Y Offset Setpoint'}
                alarmSensitive={true}
                usePvUnits={true}
                usePvMinMax={true}
              />
            </Grid>
            <Grid item xs={3}>
              <TextOutput
                pv={system.yOffsetReadbackPv}
                label={'Y Offset Readback'}
                prec={2}
                usePvUnits={true}
                alarmSensitive={true}
              />
            </Grid>
            <Grid item xs={3}>
              <TextOutput
                displayMetaData={'lower_disp_limit'}
                pv={system.yOffsetSetpointPv}
                label={'Y Offset Min'}
                prec={2}
                usePvUnits={true}
              />
            </Grid>
            <Grid item xs={3}>
              <TextOutput
                displayMetaData={'upper_disp_limit'}
                pv={system.yOffsetSetpointPv}
                label={'Y Offset Max'}
                prec={2}
                usePvUnits={true}
              />
            </Grid>
            <Grid item xs={7}>
              <ThumbWheel
                pv={system.yOffsetSetpointPv}
                macros={props['macros']}
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

export default withStyles(styles, { withTheme: true })(EditorSlitXY)
