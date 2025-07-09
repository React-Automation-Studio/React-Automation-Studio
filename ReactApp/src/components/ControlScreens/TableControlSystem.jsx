import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import EditorSinglePS from "./Components/EditorSinglePS";
import EditorSlitXY from "./Components/EditorSlitXY";
import EditorSteererXY from "./Components/EditorSteererXY";
import AppBar from "@mui/material/AppBar";

import ControlTable from "./Components/ControlTable";
import TraditionalLayout from "../UI/Layout/ComposedLayouts/TraditionalLayout";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 0, ...props.style }}>
      {props.children}
    </Typography>
  );
}

const BeamlineControlSystem = (props) => {
  const theme = useTheme();
  const [sideTabValue, setSideTabValue] = useState(0);
  const [editorType, setEditorType] = useState("");
  const [displayEditor, setDisplayEditor] = useState(false);
  const [editorSystem, setEditorSystem] = useState({});

  const yOffset = 0;

  const handleOnSystemClick = (system) => {
    setEditorType(system.editorType);
    setDisplayEditor(true);
    setEditorSystem(system);
  };

  const [systems, setSystems] = useState({
    BeamLine: {
      PowerSupplies: {
        Q1: {
          systemName: "$(IOC):$(device)",
          displayName: "Q1",
          editorType: "editorSinglePS",
          setpointPv: "$(IOC):$(device):Setpoint",
          readbackPv: "$(IOC):$(device):Readback",
          onOffPv: "$(IOC):$(device):On",
          statusTextPv: "$(IOC):$(device):On",
          scanPv: "$(IOC):$(device):SimReadback.SCAN",
          orocPv: "$(IOC):$(device):SimReadback.OROC",
          rampRatePv: "$(IOC):$(device):RampRate",
          macros: {
            "$(IOC)": "testIOC",
            "$(device)": "PS1",
          },
          svgProps: {
            usePvUnits: true,
            alarmSensitive: true,
            componentShadow: true,
            textShadow: false,
            componentGradient: true,
            x: 100,
            y: yOffset,
            prec: 3,
          },
          tableProps: {
            prec: 3,
            units: "A",
            useStatus: true,
          },
        },
        Q2: {
          systemName: "$(IOC):$(device)",
          displayName: "Q2",
          editorType: "editorSinglePS",
          setpointPv: "$(IOC):$(device):Setpoint",
          readbackPv: "$(IOC):$(device):Readback",
          onOffPv: "$(IOC):$(device):On",
          statusTextPv: "$(IOC):$(device):On",
          scanPv: "$(IOC):$(device):SimReadback.SCAN",
          orocPv: "$(IOC):$(device):SimReadback.OROC",
          rampRatePv: "$(IOC):$(device):RampRate",
          macros: {
            "$(IOC)": "testIOC",
            "$(device)": "PS2",
          },
          svgProps: {
            usePvUnits: true,
            alarmSensitive: true,
            componentShadow: true,
            textShadow: false,
            componentGradient: true,
            x: 250,
            y: yOffset,
            prec: 3,
          },
          tableProps: {
            prec: 3,
            units: "A",
            useStatus: true,
          },
        },
        Q3: {
          systemName: "$(IOC):$(device)",
          displayName: "Q3",
          editorType: "editorSinglePS",
          setpointPv: "$(IOC):$(device):Setpoint",
          readbackPv: "$(IOC):$(device):Readback",
          onOffPv: "$(IOC):$(device):On",
          statusTextPv: "$(IOC):$(device):On",
          scanPv: "$(IOC):$(device):SimReadback.SCAN",
          orocPv: "$(IOC):$(device):SimReadback.OROC",
          rampRatePv: "$(IOC):$(device):RampRate",
          macros: {
            "$(IOC)": "testIOC",
            "$(device)": "PS3",
          },
          svgProps: {
            usePvUnits: true,
            alarmSensitive: true,
            componentShadow: true,
            textShadow: false,
            componentGradient: true,
            x: 400,
            y: yOffset,
            prec: 3,
          },
          tableProps: {
            prec: 3,
            units: "A",
            useStatus: true,
          },
        },
        BM1: {
          systemName: "$(IOC):$(device)",
          displayName: "BM1",
          editorType: "editorSinglePS",
          setpointPv: "$(IOC):$(device):Setpoint",
          readbackPv: "$(IOC):$(device):Readback",
          onOffPv: "$(IOC):$(device):On",
          statusTextPv: "$(IOC):$(device):On",
          scanPv: "$(IOC):$(device):SimReadback.SCAN",
          orocPv: "$(IOC):$(device):SimReadback.OROC",
          rampRatePv: "$(IOC):$(device):RampRate",
          macros: {
            "$(IOC)": "testIOC",
            "$(device)": "PS4",
          },
          svgProps: {
            usePvUnits: true,
            alarmSensitive: true,
            componentShadow: true,
            textShadow: false,
            componentGradient: true,
            x: 600,
            y: yOffset,
            prec: 3,
          },
          tableProps: {
            prec: 3,
            units: "A",
            useStatus: true,
          },
        },
        STR1XY: {
          componentType: "SteererXYMagnet",
          systemName: "$(IOC):$(device)",
          displayName: "$(device)XY",
          editorType: "editorSteererXY",
          ySetpointPv: "$(IOC):$(device):Y:Setpoint",
          yReadbackPv: "$(IOC):$(device):Y:Readback",
          yOnPv: "$(IOC):$(device):Y:On",
          xSetpointPv: "$(IOC):$(device):X:Setpoint",
          xReadbackPv: "$(IOC):$(device):X:Readback",
          xOnPv: "$(IOC):$(device):X:On",
          macros: {
            "$(IOC)": "testIOC",
            "$(device)": "STR1",
          },
          svgProps: {
            x: 785,
            y: yOffset,
            usePvUnits: true,
            prec: 1,
            alarmSensitive: true,
            labelOffsetY: 0,
            labelOffsetX: 0,
            valueOffsetY: 0,
            valueOffsetX: 0,
            componentShadow: true,
            textShadow: false,
            componentGradient: true,
          },
          tableProps: {
            prec: 3,
            units: "A",
            useStatus: true,
          },
        },
        STR2XY: {
          componentType: "SteererXYMagnet",
          systemName: "$(IOC):$(device)",
          displayName: "$(device)XY",
          editorType: "editorSteererXY",
          ySetpointPv: "$(IOC):$(device):Y:Setpoint",
          yReadbackPv: "$(IOC):$(device):Y:Readback",
          yOnPv: "$(IOC):$(device):Y:On",
          xSetpointPv: "$(IOC):$(device):X:Setpoint",
          xReadbackPv: "$(IOC):$(device):X:Readback",
          xOnPv: "$(IOC):$(device):X:On",
          macros: {
            "$(IOC)": "testIOC",
            "$(device)": "STR2",
          },
          svgProps: {
            x: 800,
            y: yOffset,
            usePvUnits: true,
            prec: 1,
            alarmSensitive: true,
            labelOffsetX: 0,
            valueOffsetX: 0,
            componentShadow: true,
            textShadow: false,
            componentGradient: true,
            valueOffsetY: 30,
            labelOffsetY: -15,
          },
          tableProps: {
            prec: 3,
            units: "A",
            useStatus: true,
          },
        },
        STR2: {
          componentType: "SteererYMagnet",
          systemName: "$(IOC):$(device)",
          displayName: "$(device)$(XorY)",
          editorType: "editorSinglePS",
          setpointPv: "$(IOC):$(device):$(XorY):Setpoint",
          readbackPv: "$(IOC):$(device):$(XorY):Readback",
          statusTextPv: "$(IOC):$(device):$(XorY):On",
          statusOnPv: "$(IOC):$(device):$(XorY):On",

          onOffPv: "$(IOC):$(device):$(XorY):On",
          macros: {
            "$(IOC)": "testIOC",
            "$(device)": "STR2",
            "$(XorY)": "Y",
          },
          svgProps: {
            x: 1100,
            y: yOffset,
            usePvUnits: true,
            prec: 1,
            alarmSensitive: true,
            labelOffsetY: 0,
            labelOffsetX: 0,
            valueOffsetY: 0,
            valueOffsetX: 0,
            componentShadow: true,
            textShadow: false,
            componentGradient: true,
          },
          tableProps: {
            prec: 3,
            units: "A",
            useStatus: true,
          },
        },
        STR3: {
          componentType: "SteererYMagnet",
          systemName: "$(IOC):$(device)",
          displayName: "$(device)$(XorY)",
          editorType: "editorSinglePS",
          setpointPv: "$(IOC):$(device):$(XorY):Setpoint",
          readbackPv: "$(IOC):$(device):$(XorY):Readback",
          statusTextPv: "$(IOC):$(device):$(XorY):On",

          onOffPv: "$(IOC):$(device):$(XorY):On",
          macros: {
            "$(IOC)": "testIOC",
            "$(device)": "STR3",
            "$(XorY)": "Y",
          },
          svgProps: {
            x: 1200,
            y: yOffset,
            usePvUnits: true,
            prec: 1,
            alarmSensitive: true,
            labelOffsetY: 0,
            labelOffsetX: 0,
            valueOffsetY: 0,
            valueOffsetX: 0,
            componentShadow: true,
            textShadow: false,
            componentGradient: true,
          },
          tableProps: {
            prec: 3,
            units: "A",
            useStatus: true,
          },
        },
      },
      Slits: {
        SLITXY1: {
          componentType: "SlitXY",
          systemName: "$(IOC):$(device)",
          displayName: "$(device)",
          editorType: "editorSlitXY",
          xDriveOnPv: "$(IOC):$(device):X:Drive:On",
          yDriveOnPv: "$(IOC):$(device):Y:Drive:On",
          xGapReadbackPv: "$(IOC):$(device):X:Gap:Readback",
          yGapReadbackPv: "$(IOC):$(device):Y:Gap:Readback",
          xOffsetReadbackPv: "$(IOC):$(device):X:Offset:Readback",
          yOffsetReadbackPv: "$(IOC):$(device):Y:Offset:Readback",
          xGapSetpointPv: "$(IOC):$(device):X:Gap:Setpoint",
          yGapSetpointPv: "$(IOC):$(device):Y:Gap:Setpoint",
          xOffsetSetpointPv: "$(IOC):$(device):X:Offset:Setpoint",
          yOffsetSetpointPv: "$(IOC):$(device):Y:Offset:Setpoint",
          label: "$(device)",
          macros: {
            "$(IOC)": "testIOC",
            "$(device)": "SLITXY1",
          },
          svgProps: {
            x: 900,
            y: yOffset,
            usePvUnits: true,
            prec: 1,
            alarmSensitive: true,
            labelOffsetY: 0,
            labelOffsetX: 0,
            valueOffsetY: 0,
            valueOffsetX: 0,
            componentShadow: true,
            textShadow: false,
            componentGradient: true,
          },
          tableProps: {
            prec: 1,
            units: "mm",
            useStatus: true,
          },
        },
        SLITXY2: {
          componentType: "SlitXY",
          systemName: "$(IOC):$(device)",
          displayName: "$(device)",
          editorType: "editorSlitXY",
          xDriveOnPv: "$(IOC):$(device):X:Drive:On",
          yDriveOnPv: "$(IOC):$(device):Y:Drive:On",
          xGapReadbackPv: "$(IOC):$(device):X:Gap:Readback",
          yGapReadbackPv: "$(IOC):$(device):Y:Gap:Readback",
          xOffsetReadbackPv: "$(IOC):$(device):X:Offset:Readback",
          yOffsetReadbackPv: "$(IOC):$(device):Y:Offset:Readback",
          xGapSetpointPv: "$(IOC):$(device):X:Gap:Setpoint",
          yGapSetpointPv: "$(IOC):$(device):Y:Gap:Setpoint",
          xOffsetSetpointPv: "$(IOC):$(device):X:Offset:Setpoint",
          yOffsetSetpointPv: "$(IOC):$(device):Y:Offset:Setpoint",
          label: "$(device)",
          macros: {
            "$(IOC)": "testIOC",
            "$(device)": "SLITXY2",
          },
          svgProps: {
            x: 1280,
            y: yOffset,
            usePvUnits: true,
            prec: 1,
            alarmSensitive: true,
            labelOffsetY: 0,
            labelOffsetX: 0,
            valueOffsetY: 0,
            valueOffsetX: 0,
            componentShadow: true,
            textShadow: false,
            componentGradient: true,
          },
          tableProps: {
            prec: 1,
            units: "mm",
            useStatus: true,
          },
        },
      },
      Harps: {
        Harp1: {
          x: 140,
          y: yOffset,
          alarmSensitive: true,
          textShadow: false,
          componentGradient: true,
          pv: "$(IOC):$(actuatorName):put-outIn",
          isMovingPv: "$(IOC):$(actuatorName):get-status.B5",
          inLimitPv: "$(IOC):$(actuatorName):get-status.B6",
          outLimitPv: "$(IOC):$(actuatorName):get-status.B7",
          inLimitValue: 1,
          outLimitValue: 1,
          isMovingValue: 1,
          label: "$(actuatorName)",
          systemName: "$(IOC):$(actuatorName)",
          macros: {
            "$(IOC)": "testIOC",
            "$(actuatorName)": "Harp1",
          },
        },
        Harp2: {
          x: 295,
          y: yOffset,
          alarmSensitive: true,
          textShadow: false,
          componentGradient: true,
          pv: "$(IOC):$(actuatorName):put-outIn",
          isMovingPv: "$(IOC):$(actuatorName):get-status.B5",
          inLimitPv: "$(IOC):$(actuatorName):get-status.B6",
          outLimitPv: "$(IOC):$(actuatorName):get-status.B7",
          inLimitValue: 1,
          outLimitValue: 1,
          isMovingValue: 1,
          label: "$(actuatorName)",
          systemName: "$(IOC):$(actuatorName)",
          macros: {
            "$(IOC)": "testIOC",
            "$(actuatorName)": "Harp2",
          },
        },
        Harp3: {
          x: 445,
          y: yOffset,
          alarmSensitive: true,
          textShadow: false,
          componentGradient: true,
          pv: "$(IOC):$(actuatorName):put-outIn",
          isMovingPv: "$(IOC):$(actuatorName):get-status.B5",
          inLimitPv: "$(IOC):$(actuatorName):get-status.B6",
          outLimitPv: "$(IOC):$(actuatorName):get-status.B7",
          inLimitValue: 1,
          outLimitValue: 1,
          isMovingValue: 1,
          label: "$(actuatorName)",
          systemName: "$(IOC):$(actuatorName)",
          macros: {
            "$(IOC)": "testIOC",
            "$(actuatorName)": "Harp3",
          },
        },
        Harp4: {
          x: 1150,
          y: yOffset,
          alarmSensitive: true,
          textShadow: false,
          componentGradient: true,
          pv: "$(IOC):$(actuatorName):put-outIn",
          isMovingPv: "$(IOC):$(actuatorName):get-status.B5",
          inLimitPv: "$(IOC):$(actuatorName):get-status.B6",
          outLimitPv: "$(IOC):$(actuatorName):get-status.B7",
          inLimitValue: 1,
          outLimitValue: 1,
          isMovingValue: 1,
          systemName: "$(IOC):$(actuatorName)",
          label: "$(actuatorName)",
          macros: {
            "$(IOC)": "testIOC",
            "$(actuatorName)": "Harp4",
          },
        },
      },
      FCs: {
        FC1: {
          pv: "$(IOC):$(actuatorName)$(sim):put-outIn",
          isMovingPv: "$(IOC):$(actuatorName)$(sim):get-status.B5",
          inLimitPv: "$(IOC):$(actuatorName)$(sim):get-status.B6",
          outLimitPv: "$(IOC):$(actuatorName)$(sim):get-status.B7",
          inLimitValue: 1,
          outLimitValue: 1,
          isMovingValue: 1,

          label: "$(actuatorName)",
          macros: {
            "$(IOC)": "testIOC",
            "$(sim)": "sim",
            "$(actuatorName)": "FC1",
          },
          x: 38,
          y: yOffset,
          alarmSensitive: true,
          componentGradient: true,
        },
        FC2: {
          pv: "$(IOC):$(actuatorName)$(sim):put-outIn",
          isMovingPv: "$(IOC):$(actuatorName)$(sim):get-status.B5",
          inLimitPv: "$(IOC):$(actuatorName)$(sim):get-status.B6",
          outLimitPv: "$(IOC):$(actuatorName)$(sim):get-status.B7",
          inLimitValue: 1,
          outLimitValue: 1,
          isMovingValue: 1,

          label: "$(actuatorName)",
          macros: {
            "$(IOC)": "testIOC",
            "$(sim)": "sim",
            "$(actuatorName)": "FC2",
          },
          x: 180,
          y: yOffset,
          alarmSensitive: true,
          componentGradient: true,
        },
        FC3: {
          pv: "$(IOC):$(actuatorName)$(sim):put-outIn",
          isMovingPv: "$(IOC):$(actuatorName)$(sim):get-status.B5",
          inLimitPv: "$(IOC):$(actuatorName)$(sim):get-status.B6",
          outLimitPv: "$(IOC):$(actuatorName)$(sim):get-status.B7",
          inLimitValue: 1,
          outLimitValue: 1,
          isMovingValue: 1,

          label: "$(actuatorName)",
          macros: {
            "$(IOC)": "testIOC",
            "$(sim)": "sim",
            "$(actuatorName)": "FC3",
          },
          x: 335,
          y: yOffset,
          alarmSensitive: true,
          componentGradient: true,
        },
        FC4: {
          pv: "$(IOC):$(actuatorName)$(sim):put-outIn",
          isMovingPv: "$(IOC):$(actuatorName)$(sim):get-status.B5",
          inLimitPv: "$(IOC):$(actuatorName)$(sim):get-status.B6",
          outLimitPv: "$(IOC):$(actuatorName)$(sim):get-status.B7",
          inLimitValue: 1,
          outLimitValue: 1,
          isMovingValue: 1,

          label: "$(actuatorName)",
          macros: {
            "$(IOC)": "testIOC",
            "$(sim)": "sim",
            "$(actuatorName)": "FC4",
          },
          x: 485,
          y: yOffset,
          alarmSensitive: true,
          componentGradient: true,
        },
      },
    },
  });
  const allSystems = {
    ...systems.BeamLine.PowerSupplies,
    ...systems.BeamLine.Slits,
  };

  const footerContents = (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Grid item xs={12} style={{ paddingLeft: "1em" }}>
        <Typography>This demo now uses hooks components !</Typography>
      </Grid>
    </Grid>
  );

  const handleSideTabChange = (event, value) => {
    setSideTabValue(value);
  };

  return (
    <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
      <TraditionalLayout title="Table Control System Example" denseAppBar>
        <Grid container spacing={3} style={{ paddingTop: 16 }}>
          <Grid item sm={9}>
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Grid item sm={2}>
                    <AppBar position="static" color="inherit">
                      <Tabs
                        value={sideTabValue}
                        onChange={handleSideTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        sx={{
                          '& .MuiTabs-flexContainer': {
                            flexDirection: 'column',
                          },
                          '& .MuiTabs-indicator': {
                            display: 'none',
                          },
                        }}
                      >
                        <Tab label="All" />
                        <Tab label="Power Supplies" />
                        <Tab label="Slits" />
                      </Tabs>
                    </AppBar>
                  </Grid>
                  <Grid item sm={10}>
                    {sideTabValue === 0 && (
                      <TabContainer>
                        <ControlTable
                          style={{ overflowY: "scroll", maxHeight: "85vh" }}
                          handleOnSystemClick={handleOnSystemClick}
                          systems={allSystems}
                        />
                      </TabContainer>
                    )}
                    {sideTabValue === 1 && (
                      <TabContainer>
                        <ControlTable
                          handleOnSystemClick={handleOnSystemClick}
                          systems={systems["BeamLine"]["PowerSupplies"]}
                        />
                      </TabContainer>
                    )}
                    {sideTabValue === 2 && (
                      <TabContainer>
                        <ControlTable
                          handleOnSystemClick={handleOnSystemClick}
                          systems={systems["BeamLine"]["Slits"]}
                        />
                      </TabContainer>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={3}>
            {displayEditor === true && editorType === "editorSteererXY" && (
              <EditorSteererXY
                key={"editor-key" + editorSystem.systemName}
                system={editorSystem}
                handleCloseEditor={() => setDisplayEditor(false)}
              />
            )}
            {displayEditor === true && editorType === "editorSinglePS" && (
              <EditorSinglePS
                key={"editor-key" + editorSystem.systemName}
                system={editorSystem}
                handleCloseEditor={() => setDisplayEditor(false)}
              />
            )}
            {displayEditor === true && editorType === "editorSlitXY" && (
              <EditorSlitXY
                key={"editor-key" + editorSystem.systemName}
                system={editorSystem}
                handleCloseEditor={() => setDisplayEditor(false)}
              />
            )}
          </Grid>
        </Grid>
        <AppBar
          style={{ position: "fixed", bottom: 0, top: "auto", height: 40 }}
          color={theme.palette.mode === "dark" ? "inherit" : "primary"}
        >
          {footerContents}
        </AppBar>
      </TraditionalLayout>
    </div>
  );
};

export default BeamlineControlSystem;
