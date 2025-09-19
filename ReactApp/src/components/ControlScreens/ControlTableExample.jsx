//This example is deprecated and will be removed in a future release
import React, { useState } from "react";

import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/GridLegacy';
import ControlRightEx1 from "../ControlScreens/GridComponents/ControlRightEx1";
import ControlRightSteererXY from "../ControlScreens/GridComponents/ControlRightSteererXY";
import ControlRightSlitXY from "../ControlScreens/GridComponents/ControlRightSlitXY";
import ControlRightSinglePS from "../ControlScreens/GridComponents/ControlRightSinglePS";
import ControlCenterTable from "../ControlScreens/GridComponents/ControlCenterTable";
import AppBar from "@mui/material/AppBar";
import TraditionalLayout from "../UI/Layout/ComposedLayouts/TraditionalLayout";

console.warn(
  "This example is deprecated and will be removed in a future release"
);

const VerticalTabs = (props) => (
  <Tabs
    {...props}
    sx={{
      '& .MuiTabs-flexContainer': {
        flexDirection: 'column',
      },
      '& .MuiTabs-indicator': {
        display: 'none',
      },
    }}
  />
);
const systems = {
  BeamLine: {
    PowerSupplies: [
      {
        systemName: "testIOC:PS1",
        displayName: "Q1",
        editorType: "oldPS",
        devices: {
          device: {
            deviceName: "testIOC:PS1",
            readback: "Readback",
            setpoint: "Setpoint",
            statusText: "On",
          },
        },
        props: { prec: 3, units: "A", useStatus: true },
      },
      {
        systemName: "testIOC:PS2",
        displayName: "Q2",
        editorType: "oldPS",
        devices: {
          device: {
            deviceName: "testIOC:PS2",
            readback: "Readback",
            setpoint: "Setpoint",
            statusText: "On",
          },
        },
        props: { prec: 3, units: "A", useStatus: true },
      },
      {
        systemName: "testIOC:PS3",
        displayName: "Q3",
        editorType: "oldPS",
        devices: {
          device: {
            deviceName: "testIOC:PS3",
            readback: "Readback",
            setpoint: "Setpoint",
            statusText: "On",
          },
        },
        props: { prec: 3, units: "A", useStatus: true },
      },
      {
        systemName: "testIOC:PS4",
        displayName: "BM1",
        editorType: "oldPS",
        devices: {
          device: {
            deviceName: "testIOC:PS4",
            readback: "Readback",
            setpoint: "Setpoint",
            statusText: "On",
          },
        },
        props: { prec: 3, units: "A", useStatus: true },
      },
      {
        systemName: "testIOC:STR1:X",
        displayName: "STR1XY:X",
        editorType: "singlePS",
        devices: {
          device: {
            deviceName: "testIOC:STR1:X",
            readback: "Readback",
            setpoint: "Setpoint",
            statusText: "On",
          },
        },
        props: { prec: 3, units: "A", useStatus: true },
      },
      {
        systemName: "testIOC:STR1:Y",
        displayName: "STR1XY:Y",
        editorType: "singlePS",
        devices: {
          device: {
            deviceName: "testIOC:STR1:Y",
            readback: "Readback",
            setpoint: "Setpoint",
            statusText: "On",
          },
        },
        props: { prec: 3, units: "A", useStatus: true },
      },

      {
        systemName: "testIOC:STR2:X",
        displayName: "STR2XY:X",
        editorType: "singlePS",
        devices: {
          device: {
            deviceName: "testIOC:STR2:X",
            readback: "Readback",
            setpoint: "Setpoint",
            statusText: "On",
          },
        },
        props: { prec: 3, units: "A", useStatus: true },
      },
      {
        systemName: "testIOC:STR2:Y",
        displayName: "STR2XY:Y",
        editorType: "singlePS",
        devices: {
          device: {
            deviceName: "testIOC:STR2:Y",
            readback: "Readback",
            setpoint: "Setpoint",
            statusText: "On",
          },
        },
        props: { prec: 3, units: "A", useStatus: true },
      },

      {
        systemName: "testIOC:STR3:Y",
        displayName: "STR3:Y",
        editorType: "singlePS",
        devices: {
          device: {
            deviceName: "testIOC:STR3:Y",
            readback: "Readback",
            setpoint: "Setpoint",
            statusText: "On",
          },
        },
        props: { prec: 3, units: "A", useStatus: true },
      },
      {
        systemName: "testIOC:STR4:X",
        displayName: "STR4:X",
        editorType: "singlePS",
        devices: {
          device: {
            deviceName: "testIOC:STR4:X",
            readback: "Readback",
            setpoint: "Setpoint",
            statusText: "On",
          },
        },
        props: { prec: 3, units: "A", useStatus: true },
      },
    ],
    Slits: [
      {
        systemName: "testIOC:SLITXY1",
        displayName: "SLITXY1 X Gap",
        editorType: "slitxy",

        devices: {
          device: {
            deviceName: "testIOC:SLITXY1:X",
            readback: "Gap:Readback",
            setpoint: "Gap:Setpoint",
            statusText: "Drive:On",
          },

          xGapDevice: {
            deviceName: "testIOC:SLITXY1:X",
            readback: "Gap:Readback",
            setpoint: "Gap:Setpoint",
          },
          xOffsetDevice: {
            deviceName: "testIOC:SLITXY1:X",
            readback: "Offset:Readback",
            setpoint: "Offset:Setpoint",
          },
          yGapDevice: {
            deviceName: "testIOC:SLITXY1:Y",
            readback: "Gap:Readback",
            setpoint: "Gap:Setpoint",
          },
          yOffsetDevice: {
            deviceName: "testIOC:SLITXY1:Y",
            readback: "Offset:Readback",
            setpoint: "Offset:Setpoint",
          },
        },
        props: { prec: 2, units: "mm", useStatus: true },
      },
      {
        systemName: "testIOC:SLITXY1",
        displayName: "SLITXY1 X Offset",
        editorType: "slitxy",

        devices: {
          device: {
            deviceName: "testIOC:SLITXY1:X",
            readback: "Offset:Readback",
            setpoint: "Offset:Setpoint",
            statusText: "Drive:On",
          },

          xGapDevice: {
            deviceName: "testIOC:SLITXY1:X",
            readback: "Gap:Readback",
            setpoint: "Gap:Setpoint",
          },
          xOffsetDevice: {
            deviceName: "testIOC:SLITXY1:X",
            readback: "Offset:Readback",
            setpoint: "Offset:Setpoint",
          },
          yGapDevice: {
            deviceName: "testIOC:SLITXY1:Y",
            readback: "Gap:Readback",
            setpoint: "Gap:Setpoint",
          },
          yOffsetDevice: {
            deviceName: "testIOC:SLITXY1:Y",
            readback: "Offset:Readback",
            setpoint: "Offset:Setpoint",
          },
        },
        props: { prec: 2, units: "mm", useStatus: true },
      },
      {
        systemName: "testIOC:SLITXY1",
        displayName: "SLITXY1 Y Gap",
        editorType: "slitxy",

        devices: {
          device: {
            deviceName: "testIOC:SLITXY1:Y",
            readback: "Gap:Readback",
            setpoint: "Gap:Setpoint",
            statusText: "Drive:On",
          },

          xGapDevice: {
            deviceName: "testIOC:SLITXY1:X",
            readback: "Gap:Readback",
            setpoint: "Gap:Setpoint",
          },
          xOffsetDevice: {
            deviceName: "testIOC:SLITXY1:X",
            readback: "Offset:Readback",
            setpoint: "Offset:Setpoint",
          },
          yGapDevice: {
            deviceName: "testIOC:SLITXY1:Y",
            readback: "Gap:Readback",
            setpoint: "Gap:Setpoint",
          },
          yOffsetDevice: {
            deviceName: "testIOC:SLITXY1:Y",
            readback: "Offset:Readback",
            setpoint: "Offset:Setpoint",
          },
        },
        props: { prec: 2, units: "mm", useStatus: true },
      },
      {
        systemName: "testIOC:SLITXY1",
        displayName: "SLITXY1 Y Offset",
        editorType: "slitxy",

        devices: {
          device: {
            deviceName: "testIOC:SLITXY1:Y",
            readback: "Offset:Readback",
            setpoint: "Offset:Setpoint",
            statusText: "Drive:On",
          },

          xGapDevice: {
            deviceName: "testIOC:SLITXY1:X",
            readback: "Gap:Readback",
            setpoint: "Gap:Setpoint",
          },
          xOffsetDevice: {
            deviceName: "testIOC:SLITXY1:X",
            readback: "Offset:Readback",
            setpoint: "Offset:Setpoint",
          },
          yGapDevice: {
            deviceName: "testIOC:SLITXY1:Y",
            readback: "Gap:Readback",
            setpoint: "Gap:Setpoint",
          },
          yOffsetDevice: {
            deviceName: "testIOC:SLITXY1:Y",
            readback: "Offset:Readback",
            setpoint: "Offset:Setpoint",
          },
        },
        props: { prec: 2, units: "mm", useStatus: true },
      },
      {
        systemName: "testIOC:SLITXY2",
        displayName: "SLITXY2 X Gap",
        editorType: "slitxy",

        devices: {
          device: {
            deviceName: "testIOC:SLITXY2:X",
            readback: "Gap:Readback",
            setpoint: "Gap:Setpoint",
            statusText: "Drive:On",
          },

          xGapDevice: {
            deviceName: "testIOC:SLITXY2:X",
            readback: "Gap:Readback",
            setpoint: "Gap:Setpoint",
          },
          xOffsetDevice: {
            deviceName: "testIOC:SLITXY2:X",
            readback: "Offset:Readback",
            setpoint: "Offset:Setpoint",
          },
          yGapDevice: {
            deviceName: "testIOC:SLITXY2:Y",
            readback: "Gap:Readback",
            setpoint: "Gap:Setpoint",
          },
          yOffsetDevice: {
            deviceName: "testIOC:SLITXY2:Y",
            readback: "Offset:Readback",
            setpoint: "Offset:Setpoint",
          },
        },
        props: { prec: 2, units: "mm", useStatus: true },
      },
      {
        systemName: "testIOC:SLITXY2",
        displayName: "SLITXY2 X Offset",
        editorType: "slitxy",

        devices: {
          device: {
            deviceName: "testIOC:SLITXY2:X",
            readback: "Offset:Readback",
            setpoint: "Offset:Setpoint",
            statusText: "Drive:On",
          },

          xGapDevice: {
            deviceName: "testIOC:SLITXY2:X",
            readback: "Gap:Readback",
            setpoint: "Gap:Setpoint",
          },
          xOffsetDevice: {
            deviceName: "testIOC:SLITXY2:X",
            readback: "Offset:Readback",
            setpoint: "Offset:Setpoint",
          },
          yGapDevice: {
            deviceName: "testIOC:SLITXY2:Y",
            readback: "Gap:Readback",
            setpoint: "Gap:Setpoint",
          },
          yOffsetDevice: {
            deviceName: "testIOC:SLITXY2:Y",
            readback: "Offset:Readback",
            setpoint: "Offset:Setpoint",
          },
        },
        props: { prec: 2, units: "mm", useStatus: true },
      },
      {
        systemName: "testIOC:SLITXY2",
        displayName: "SLITXY2 Y Gap",
        editorType: "slitxy",

        devices: {
          device: {
            deviceName: "testIOC:SLITXY2:Y",
            readback: "Gap:Readback",
            setpoint: "Gap:Setpoint",
            statusText: "Drive:On",
          },

          xGapDevice: {
            deviceName: "testIOC:SLITXY2:X",
            readback: "Gap:Readback",
            setpoint: "Gap:Setpoint",
          },
          xOffsetDevice: {
            deviceName: "testIOC:SLITXY2:X",
            readback: "Offset:Readback",
            setpoint: "Offset:Setpoint",
          },
          yGapDevice: {
            deviceName: "testIOC:SLITXY2:Y",
            readback: "Gap:Readback",
            setpoint: "Gap:Setpoint",
          },
          yOffsetDevice: {
            deviceName: "testIOC:SLITXY2:Y",
            readback: "Offset:Readback",
            setpoint: "Offset:Setpoint",
          },
        },
        props: { prec: 2, units: "mm", useStatus: true },
      },
      {
        systemName: "testIOC:SLITXY2",
        displayName: "SLITXY2 Y Offset",
        editorType: "slitxy",

        devices: {
          device: {
            deviceName: "testIOC:SLITXY2:Y",
            readback: "Offset:Readback",
            setpoint: "Offset:Setpoint",
            statusText: "Drive:On",
          },

          xGapDevice: {
            deviceName: "testIOC:SLITXY2:X",
            readback: "Gap:Readback",
            setpoint: "Gap:Setpoint",
          },
          xOffsetDevice: {
            deviceName: "testIOC:SLITXY2:X",
            readback: "Offset:Readback",
            setpoint: "Offset:Setpoint",
          },
          yGapDevice: {
            deviceName: "testIOC:SLITXY2:Y",
            readback: "Gap:Readback",
            setpoint: "Gap:Setpoint",
          },
          yOffsetDevice: {
            deviceName: "testIOC:SLITXY2:Y",
            readback: "Offset:Readback",
            setpoint: "Offset:Setpoint",
          },
        },
        props: { prec: 2, units: "mm", useStatus: true },
      },
    ],
  },
};

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 0 }}>
      {props.children}
    </Typography>
  );
}

const ControlTableExample = (props) => {
  const theme = useTheme();
  const [editorType, setEditorType] = useState("PS");
  const [displayEditor, setDisplayEditor] = useState(false);
  const [editorMacros, setEditorMacros] = useState({ "$(device)": "" });
  const [editorSystem, setEditorSystem] = useState({});
  const [topTabValue, setTopTabValue] = useState(0);
  const [sideTabValue, setSideTabValue] = useState(0);

  const handlePsOnClick = (name) => {
    setEditorType("PS");
    setDisplayEditor(true);
    setEditorMacros({ "$(device)": name });
  };

  const handleOnSystemClick = (system) => {
    setEditorType(system.editorType);
    setDisplayEditor(true);
    setEditorSystem(system);
    setEditorMacros({ "$(device)": "" });
  };

  const handleSideTabChange = (event, value) => {
    setSideTabValue(value);
    setDisplayEditor(false);
  };

  const handleCloseEditor = () => {
    setDisplayEditor(false);
  };

  return (
    <TraditionalLayout title="Control Table Example" denseAppBar>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
        sx={{
          flexGrow: 1,
          padding: theme.spacing(2),
        }}
      >
        <Grid item xs={12} sm={2} md={2} lg={2}>
          <AppBar position="static" color="inherit">
            <VerticalTabs
              value={sideTabValue}
              onChange={handleSideTabChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Power Supplies" />
              <Tab label="Slits" />
            </VerticalTabs>
          </AppBar>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={7} style={{ paddingRight: 16 }}>
          {sideTabValue == 0 && (
            <TabContainer>
              {" "}
              <ControlCenterTable
                handleOnSystemClick={handleOnSystemClick}
                systems={systems["BeamLine"]["PowerSupplies"]}
              />{" "}
            </TabContainer>
          )}
          {sideTabValue == 1 && (
            <TabContainer>
              {" "}
              <ControlCenterTable
                handleOnSystemClick={handleOnSystemClick}
                systems={systems["BeamLine"]["Slits"]}
              />{" "}
            </TabContainer>
          )}
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={3}>
          {displayEditor === true &&
            editorMacros["$(device)"] === "testIOC:PS1" && (
              <ControlRightEx1
                macros={editorMacros}
                handleCloseEditor={handleCloseEditor}
              />
            )}
          {displayEditor === true &&
            editorMacros["$(device)"] === "testIOC:PS2" && (
              <ControlRightEx1
                macros={editorMacros}
                handleCloseEditor={handleCloseEditor}
              />
            )}
          {displayEditor === true &&
            editorMacros["$(device)"] === "testIOC:PS3" && (
              <ControlRightEx1
                macros={editorMacros}
                handleCloseEditor={handleCloseEditor}
              />
            )}
          {displayEditor === true &&
            editorMacros["$(device)"] === "testIOC:PS4" && (
              <ControlRightEx1
                macros={editorMacros}
                handleCloseEditor={handleCloseEditor}
              />
            )}
          {displayEditor === true &&
            editorMacros["$(device)"] === "testIOC:STR1:X" && (
              <ControlRightEx1
                macros={editorMacros}
                handleCloseEditor={handleCloseEditor}
              />
            )}
          {displayEditor === true &&
            editorType === "oldPS" && (
              <ControlRightEx1
                key={"editor-key" + editorSystem.systemName}
                macros={{ "$(device)": editorSystem.systemName }}
                handleCloseEditor={handleCloseEditor}
              />
            )}
          {displayEditor === true &&
            editorType === "steererXY" && (
              <ControlRightSteererXY
                key={"editor-key" + editorSystem.systemName}
                system={editorSystem}
                handleCloseEditor={handleCloseEditor}
              />
            )}
          {displayEditor === true &&
            editorType === "singlePS" && (
              <ControlRightSinglePS
                key={"editor-key" + editorSystem.systemName}
                system={editorSystem}
                handleCloseEditor={handleCloseEditor}
              />
            )}
          {displayEditor === true &&
            editorType === "slitxy" && (
              <ControlRightSlitXY
                key={"editor-key" + editorSystem.systemName}
                system={editorSystem}
                handleCloseEditor={handleCloseEditor}
              />
            )}
        </Grid>
      </Grid>
    </TraditionalLayout>
  );
};

export default ControlTableExample;
