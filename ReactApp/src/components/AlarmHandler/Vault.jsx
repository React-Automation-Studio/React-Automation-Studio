import { useCallback, useState } from "react";

import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from '@mui/material/GridLegacy';

import Layout from "../UI/Layout/ComposedLayouts/TraditionalLayout";
import SelectionList from "../BaseComponents/SelectionList";
import Slider from "../BaseComponents/Slider";
import PV from "../SystemComponents/PV";

import Floor from "./SVG Components/Floor";

const Vault = () => {
  const theme = useTheme();

  const primary = theme.palette.primary.dark;

 
  const rootSx = {
    padding: theme.spacing(1),
    overflowX: "hidden",
    overflowY: "hidden",
    width: "100%",
    height: "100%",
  };

  const paperSx = {
    padding: theme.spacing(1),
    height: "100%",
    width: "100%",
    overflowX: "default",
    overflowY: "default",
  };

  const [alarmDict, setAlarmDict] = useState({});

  const handlePVChange = useCallback(
    ({ value, pvName, initialized, severity, timestamp }) => {
      setAlarmDict((prev) => {
        const localAlarmDict = { ...prev };

        if (pvName.includes("building_fire")) {
          localAlarmDict["building_fire"] = severity > 0;
        } else if (pvName.includes("building_security")) {
          localAlarmDict["building_security"] = severity > 0;
        } else if (pvName.includes("building_airtemp")) {
          localAlarmDict["building_airtemp_sev"] = severity;
          localAlarmDict["building_airtemp_val"] = value;
        } else if (pvName.includes("building_airhumidity")) {
          localAlarmDict["building_airhumidity_sev"] = severity;
          localAlarmDict["building_airhumidity_val"] = value;
        } else if (pvName.includes("building_airpressure_diff")) {
          localAlarmDict["building_airpressure_diff_sev"] = severity;
          localAlarmDict["building_airpressure_diff_val"] = value;
        } else if (pvName.includes("vault_door")) {
          localAlarmDict["vault_door"] = severity > 0;
        } else if (pvName.includes("vault_clear")) {
          localAlarmDict["vault_clear"] = severity > 0;
        } else if (pvName.includes("vault_radiation")) {
          localAlarmDict["vault_radiation_sev"] = severity;
          localAlarmDict["vault_radiation_val"] = value;
        } else if (pvName.includes("cyclotron_interlocks")) {
          localAlarmDict["cyclotron_interlocks"] = severity > 0;
        } else if (pvName.includes("cyclotron_safety")) {
          localAlarmDict["cyclotron_safety"] = severity > 0;
        } else if (pvName.includes("cyclotron_RF_pickup")) {
          localAlarmDict["cyclotron_RF_pickup"] = severity > 0;
          localAlarmDict["cyclotron_RF_pickup_sev"] = severity;
        } else if (pvName.includes("cyclotron_RF1")) {
          localAlarmDict["cyclotron_RF1"] = severity > 0;
        } else if (pvName.includes("cyclotron_RF2")) {
          localAlarmDict["cyclotron_RF2"] = severity > 0;
        }
        return localAlarmDict;
      });
    },
    [alarmDict]
  );

  const pvArray = [
    "demoAlarmsIOC:building_fire",
    "demoAlarmsIOC:building_airtemp",
    "demoAlarmsIOC:building_airhumidity",
    "demoAlarmsIOC:building_airpressure_diff",
    "demoAlarmsIOC:building_security",
    "demoAlarmsIOC:cyclotron_interlocks",
    "demoAlarmsIOC:cyclotron_airpressure",
    "demoAlarmsIOC:cyclotron_RF1",
    "demoAlarmsIOC:cyclotron_RF2",
    "demoAlarmsIOC:cyclotron_RF_pickup",
    "demoAlarmsIOC:cyclotron_safety",
    "demoAlarmsIOC:cyclotron_vacuum",
    "demoAlarmsIOC:cyclotron_water_flow",
    "demoAlarmsIOC:cyclotron_water_temp",
    "demoAlarmsIOC:vault_radiation",
    "demoAlarmsIOC:vault_door",
    "demoAlarmsIOC:vault_clear",
  ];

  const pvs = pvArray.map((pv) => {
    return (
      <PV
        key={pv}
        pv={pv}
        pvData={(data) => handlePVChange({ ...data, pvName: pv })}
      />
    );
  });

  return (
    <Layout title="VAULT DEMO" denseAppBar alignTitle="center">
      {pvs}
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={2}
        sx={rootSx}
      >
        <Grid item xs={12} lg={6} style={{ textAlign: "center" }}>
          <Paper
            sx={paperSx}
            elevation={theme.palette.paperElevation}
          >
            <svg width="100%" height="100%" viewBox="0 0 1100 900">
              <Floor alarmDict={alarmDict} type={theme.palette.mode} />
            </svg>
          </Paper>
        </Grid>

        <Grid item md={12} lg={6}>
          <Paper
            sx={paperSx}
            elevation={theme.palette.paperElevation}
          >
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={2}
            >
              <Grid item xs={12} md={6}>
                <Paper
                  sx={paperSx}
                  elevation={theme.palette.paperElevation}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    spacing={2}
                  >
                    <Grid item xs={12}>
                      <div
                        style={{
                          textAlign: "center",
                          fontSize: 16,
                          fontWeight: "bold",
                          color: primary,
                        }}
                      >
                        BUILDING
                      </div>
                    </Grid>
                    <Grid item xs={12} lg={5}>
                      <SelectionList
                        pv="$(device):building_fire"
                        macros={{ "$(device)": "demoAlarmsIOC" }}
                        horizontal={true}
                        usePvLabel={true}
                      />
                    </Grid>
                    <Grid item xs={12} lg={5}>
                      <SelectionList
                        pv="$(device):building_security"
                        macros={{ "$(device)": "demoAlarmsIOC" }}
                        horizontal={true}
                        usePvLabel={true}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Slider
                        pv="$(device):building_airtemp"
                        macros={{ "$(device)": "demoAlarmsIOC" }}
                        usePvLabel={true}
                        usePvMinMax={true}
                        usePvUnits={true}
                        step={1}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Slider
                        pv="$(device):building_airhumidity"
                        macros={{ "$(device)": "demoAlarmsIOC" }}
                        usePvLabel={true}
                        usePvMinMax={true}
                        usePvUnits={true}
                        step={1}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Slider
                        pv="$(device):building_airpressure_diff"
                        macros={{ "$(device)": "demoAlarmsIOC" }}
                        usePvLabel={true}
                        usePvMinMax={true}
                        usePvUnits={true}
                        step={1}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={paperSx}
                  elevation={theme.palette.paperElevation}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    spacing={2}
                  >
                    <Grid item xs={12}>
                      <div
                        style={{
                          textAlign: "center",
                          fontSize: 16,
                          fontWeight: "bold",
                          color: primary,
                        }}
                      >
                        VAULT
                      </div>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <SelectionList
                        pv="$(device):vault_door"
                        macros={{ "$(device)": "demoAlarmsIOC" }}
                        horizontal={true}
                        usePvLabel={true}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <SelectionList
                        pv="$(device):vault_clear"
                        macros={{ "$(device)": "demoAlarmsIOC" }}
                        horizontal={true}
                        usePvLabel={true}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Slider
                        pv="$(device):vault_radiation"
                        macros={{ "$(device)": "demoAlarmsIOC" }}
                        usePvLabel={true}
                        usePvMinMax={true}
                        usePvUnits={true}
                        step={0.1}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  sx={paperSx}
                  elevation={theme.palette.paperElevation}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    spacing={2}
                  >
                    <Grid item xs={12}>
                      <div
                        style={{
                          textAlign: "center",
                          fontSize: 16,
                          fontWeight: "bold",
                          color: primary,
                        }}
                      >
                        CYCLOTRON
                      </div>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                      <SelectionList
                        pv="$(device):cyclotron_interlocks"
                        macros={{ "$(device)": "demoAlarmsIOC" }}
                        horizontal={true}
                        usePvLabel={true}
                      />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                      <SelectionList
                        pv="$(device):cyclotron_safety"
                        macros={{ "$(device)": "demoAlarmsIOC" }}
                        horizontal={true}
                        usePvLabel={true}
                      />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                      <Slider
                        pv="$(device):cyclotron_water_flow"
                        macros={{ "$(device)": "demoAlarmsIOC" }}
                        usePvLabel={true}
                        usePvMinMax={true}
                        usePvUnits={true}
                        step={1}
                      />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                      <Slider
                        pv="$(device):cyclotron_water_temp"
                        macros={{ "$(device)": "demoAlarmsIOC" }}
                        usePvLabel={true}
                        usePvMinMax={true}
                        usePvUnits={true}
                        step={1}
                      />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <SelectionList
                        pv="$(device):cyclotron_RF1"
                        macros={{ "$(device)": "demoAlarmsIOC" }}
                        horizontal={true}
                        usePvLabel={true}
                      />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <SelectionList
                        pv="$(device):cyclotron_RF2"
                        macros={{ "$(device)": "demoAlarmsIOC" }}
                        horizontal={true}
                        usePvLabel={true}
                      />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <Slider
                        pv="$(device):cyclotron_RF_pickup"
                        macros={{ "$(device)": "demoAlarmsIOC" }}
                        usePvLabel={true}
                        usePvMinMax={true}
                        usePvUnits={true}
                        step={1}
                      />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <Slider
                        pv="$(device):cyclotron_airpressure"
                        macros={{ "$(device)": "demoAlarmsIOC" }}
                        usePvLabel={true}
                        usePvMinMax={true}
                        usePvUnits={true}
                        step={1}
                      />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <Slider
                        pv="$(device):cyclotron_vacuum"
                        macros={{ "$(device)": "demoAlarmsIOC" }}
                        usePvLabel={true}
                        usePvMinMax={true}
                        usePvUnits={true}
                        step={1}
                      />
                    </Grid>
                    <Grid item xs={12} lg={3}></Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Vault;
