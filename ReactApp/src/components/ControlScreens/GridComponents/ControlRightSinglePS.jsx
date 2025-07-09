//This example is deprecated and will be removed in a future release 
import React, { useState, useContext } from 'react'

import AutomationStudioContext from '../../SystemComponents/AutomationStudioContext';
import TextInput from '../../BaseComponents/TextInput';
import TextOutput from '../../BaseComponents/TextOutput';
import Slider from '../../BaseComponents/Slider';
import Grid from '@mui/material/Grid';
import ToggleButton from '../../BaseComponents/ToggleButton';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import ThumbWheel from '../../BaseComponents/ThumbWheel';
import Close from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';

console.warn("This example is deprecated and will be removed in a future release")

const ControlRightSinglePS = (props) => {
  const theme = useTheme();
  const context = useContext(AutomationStudioContext);
  const [showSettings, setShowSettings] = useState(false);

  const handleSettingsButtonClick = () => {
    setShowSettings(true);
  };

  const system = props.system;
  return (
    <div style={{ paddingRight: 12 }} >
      <Grid style={{ paddingLeft: 12, paddingRight: 24, }} container spacing={2}>
        <Grid item xs={11}>
          {system.displayName + ": Steerer"}
        </Grid>
        <Grid item xs={1}>
          <Close fontSize="small" onClick={props.handleCloseEditor} />
        </Grid>
      </Grid>
      <Paper style={{ padding: 12 }} elevation={theme.palette.paperElevation} >
        <Grid container
          direction="row"
          justifyContent="flex-start"
          alignItems="center" spacing={1}>
          <Grid item xs={6}  >
            <TextInput pv={ system.devices.device.deviceName + ":" + system.devices.device.setpoint}  prec={3} label={'Setpoint:'} alarmSensitive={true} usePvUnits={true} usePvMinMax={true} />
          </Grid>
          <Grid item xs={6}  >
            <TextOutput style={{ marginRight: 10 }} pv={ system.devices.device.deviceName + ":" + system.devices.device.readback}  prec={3} usePvUnits={true} alarmSensitive={true} label={'Readback'} />
          </Grid>
          <Grid item xs={12}  >
            <Slider pv={ system.devices.device.deviceName + ":" + system.devices.device.setpoint}  prec={3} label={'Setpoint:'} alarmSensitive={true} usePvUnits={true} usePvMinMax={true} />
          </Grid>
          <Grid item xs={6}  >
          </Grid>
          <Grid item xs={12}  >
          </Grid>
          <Grid item xs={12}  >
            <Grid container justifyContent="flex-start" direction="row" alignItems="center" spacing={1}>
              <Grid item xs={12} sm={12} >
                <ThumbWheel
                  pv={ system.devices.device.deviceName + ":" + system.devices.device.setpoint}
                  macros={props['macros']}
                  prec_integer={2}
                  prec_decimal={2}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}  >
            <ToggleButton pv={ system.devices.device.deviceName + ':On'} macros={props['macros']} labelPlacement={"top"} />
          </Grid>
          <Grid item xs={4}  >
          </Grid>
          <Grid item xs={4}  >
            <Button component={Link} to={{
              pathname: "/SettingsSinglePS",
              search: JSON.stringify(system),
              state: ["sdas"],
              data: "hello2"
            }} target="_blank" color="primary" style={{ width: "100%" }} variant='contained'>  Settings </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ControlRightSinglePS;
