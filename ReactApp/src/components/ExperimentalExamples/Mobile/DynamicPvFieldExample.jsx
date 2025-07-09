import React from 'react';
import { useTheme } from '@mui/material/styles';

import Grid from '@mui/material/GridLegacy';

import Typography from '@mui/material/Typography';

import TextInput from '../../BaseComponents/TextInput';

import Slider from '../../BaseComponents/Slider';

import Card from '@mui/material/Card';

const DynamicPvFieldExample = (props) => {
  const theme = useTheme();
  const [state, setState] = React.useState({
    value: 0,
    stateValue: 0,
    showAdvancedSettings: 0,
  });

  const handleStateChange = (stateValue) => {
    setState(prevState => ({ ...prevState, stateValue }));
  };

  const handleChange = (event, value) => {
    setState(prevState => ({ ...prevState, value }));
  };

  return (
    <React.Fragment>
      <Grid container sx={{
        flexGrow: 1,
        padding: theme.spacing(1),
        overflowX: "hidden",
        overflowY: "hidden",
        marginTop: 40,
        marginBottom: 100,
      }} spacing={2}>
        <Grid item xs={6}>
          <Typography style={{ paddingBottom: 0 }}> Example with prop useMetadata=true</Typography>
          <Card>
            <Grid container sx={{
              flexGrow: 1,
              padding: theme.spacing(1),
              overflowX: "hidden",
              overflowY: "hidden",
              marginTop: 40,
              marginBottom: 100,
            }} spacing={2}>
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
              <Grid container sx={{
                flexGrow: 1,
                padding: theme.spacing(1),
                overflowX: "hidden",
                overflowY: "hidden",
                marginTop: 40,
                marginBottom: 100,
              }} spacing={2}>
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

export default DynamicPvFieldExample;
