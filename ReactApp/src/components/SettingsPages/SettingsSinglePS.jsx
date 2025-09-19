import React, { useContext,useState } from 'react';
import { useTheme } from '@mui/material/styles';
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import TextInput from '../BaseComponents/TextInput';
import SelectionInput from '../BaseComponents/SelectionInput';
import TextOutput from '../BaseComponents/TextOutput';

import Grid from '@mui/material/GridLegacy';

import ToggleButton from '../BaseComponents/ToggleButton';
import ActionButton from '../BaseComponents/ActionButton';
import ThumbWheel from '../BaseComponents/ThumbWheel';
import Card from '@mui/material/Card';

import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import { useLocation } from "react-router-dom";

const SettingsSinglePS = (props) => {
  const context = useContext(AutomationStudioContext);
  const location = useLocation();
  const theme = useTheme();

  const [system] = useState(JSON.parse(decodeURIComponent(location.search.substr(1))) );
  return (
    <Grid container
      direction="row"
      justifyContent="flex-start"
      alignItems="center" spacing={1}>
      <Grid item xs={3}  >
        <div style={{ paddingRight: 12}}>
          <body1 style={theme.typography.body1}>
            {system.displayName}
          </body1>
          <Card style={{ padding: 12}} >
            <Grid container
              direction="row"
              justifyContent="flex-start"
              alignItems="center" spacing={1}>
              <Grid item xs={6}  >
                <TextInput   pv={system.devices.device.deviceName+":"+system.devices.device.setpoint}      prec={3}  label={'Setpoint:'} alarmSensitive={true}  usePvUnits={true} usePvMinMax={true}/>
              </Grid>
              <Grid item xs={6}  >
                <TextOutput style={{marginRight:10}} pv={system.devices.device.deviceName+":"+system.devices.device.readback}         prec={3} usePvUnits={true} alarmSensitive={true} label={'Readback'}/>
              </Grid>

              <Grid item xs={6}  >
                <TextOutput  pv={system.devices.device.deviceName+":get-localRemote"}        usePvUnits={true} useStringValue={true} alarmSensitive={true} label={'Loc/Rem'} useStringSeverityMatch={true} StringSeverity={[{'stringMatch':'Local','severity':1}]}/>
              </Grid>
              <Grid item xs={6}  >
                <TextOutput  pv={system.devices.device.deviceName+":get-statusText"}        useStringValue={true} alarmSensitive={true} label={'Status'}  useStringSeverityMatch={true} StringSeverity={[{'stringMatch':'Fault','severity':2}]}/>
              </Grid>
              <Grid item xs={12}  >
              </Grid>
              <Grid item xs={4}  >
                <ToggleButton pv={system.devices.device.deviceName+":put-offOn"}  label={' On/Off'} labelPlacement={"End"} custom_selection_strings={["Off","On"]}/>
              </Grid>
              <Grid item xs={4}  >
              </Grid>
              <Grid item xs={4}  >
                <Button component={Link} to={{
                  pathname: "/SettingsSteererXY",
                  search:JSON.stringify(system),
                  state: ["sdas"],
                  data:"hello2"
                }} target="_blank" color="primary" variant='contained'>  Settings </Button>
              </Grid>
              <Grid item xs={12}  >
                <Grid container justifyContent="flex-start" direction="row" alignItems="center" spacing={4}>
                  <Grid item xs={12} sm={12} >
                    <ThumbWheel
                      pv={system.devices.device.deviceName+":"+system.devices.device.setpoint}
                      macros={props['macros']}
                      prec_integer={2}
                      prec_decimal={2}
                      />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} >
                <SelectionInput  pv={system.devices.device.deviceName+':put-S&EImmed'} label={'Mode'} useStringValue={true}/>
              </Grid>
              <Grid item xs={6}  >
                <ActionButton pv={system.devices.device.deviceName+":put-enter"} macros={props['macros']}   actionValue={"1"}
                  actionString={"Enter"}/>
              </Grid>
            </Grid>
          </Card>
        </div>
      </Grid>
    </Grid>
  );
};

export default SettingsSinglePS;
