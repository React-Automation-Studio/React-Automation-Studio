import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

import Grid from '@mui/material/GridLegacy';

import HarpRangeSelection from "../SiteSpecificComponents/iThembaLABS/CompoundComponents/HarpRangeSelection";
import ToggleButton from "../BaseComponents/ToggleButton";
import ActionButton from "../BaseComponents/ActionButton";

import ControlRightEx1 from "../ControlScreens/GridComponents/ControlRightEx1";
import ControlRightSteererXY from "../ControlScreens/GridComponents/ControlRightSteererXY";
import ControlRightSlitXY from "../ControlScreens/GridComponents/ControlRightSlitXY";
import ControlRightSinglePS from "../ControlScreens/GridComponents/ControlRightSinglePS";
import ControlTopHarpEx1 from "../ControlScreens/GridComponents/ControlTopHarpEx1";

import HarpGraph from "../SiteSpecificComponents/iThembaLABS/CompoundComponents/HarpGraph";

import AppBar from "@mui/material/AppBar";

import GraphY from "../BaseComponents/GraphY";
import ControlCenterTable from "../ControlScreens/GridComponents/ControlCenterTable";
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

const ControlTestHarp1 = (props) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [sideTabValue, setSideTabValue] = useState(0);
  const [editorType, setEditorType] = useState("PS");
  const [displayEditor, setDisplayEditor] = useState(false);
  const [editorMacros, setEditorMacros] = useState({ "$(device)": "" });
  const [editorSystem, setEditorSystem] = useState({});
  const [displayHarps, setDisplayHarps] = useState([
    { systemName: "testIOC:Harp1", displayName: "Harp 1", inserted: false },
    { systemName: "testIOC:Harp2", displayName: "Harp 2", inserted: false },
    { systemName: "testIOC:Harp3", displayName: "Harp 3", inserted: false },
    { systemName: "testIOC:Harp4", displayName: "Harp 4", inserted: false },
  ]);
  const [maxHarpsReached, setMaxHarpsReached] = useState(false);
  const [x0GraphPVs, setX0GraphPVs] = useState([]);
  const [y0GraphPVs, setY0GraphPVs] = useState([]);
  const [x0legend, setX0legend] = useState([]);
  const [y0legend, setY0legend] = useState([]);
  const [x0GraphKey, setX0GraphKey] = useState("");
  const [onlyY0, setOnlyY0] = useState(false);
  const [onlyX0, setOnlyX0] = useState(false);
  const [x1GraphPVs, setX1GraphPVs] = useState([]);
  const [y1GraphPVs, setY1GraphPVs] = useState([]);
  const [x1legend, setX1legend] = useState([]);
  const [y1legend, setY1legend] = useState([]);
  const [x1GraphKey, setX1GraphKey] = useState("");
  const [onlyY1, setOnlyY1] = useState(false);
  const [onlyX1, setOnlyX1] = useState(false);
  const [TopYgraphYmax, setTopYgraphYmax] = useState();
  const [TopXgraphYmax, setTopXgraphYmax] = useState();
  const [BottomYgraphYmax, setBottomYgraphYmax] = useState();
  const [BottomXgraphYmax, setBottomXgraphYmax] = useState();
  const [x0RangePV, setX0RangePV] = useState();
  const [y0RangePV, setY0RangePV] = useState();
  const [x1RangePV, setX1RangePV] = useState();
  const [y1RangePV, setY1RangePV] = useState();
  const [x0SystemName, setX0SystemName] = useState();
  const [x1SystemName, setX1SystemName] = useState();

  const handleCloseEditor = () => {
    setDisplayEditor(false);
  };

  const handlePsOnClick = (name) => {
    setEditorType("PS");
    setDisplayEditor(true);
    setEditorMacros({ "$(device)": name });
  };

  const changeTopYgraphYmax = (ymax) => {
    setTopYgraphYmax(ymax);
  };

  const changeTopXgraphYmax = (ymax) => {
    setTopXgraphYmax(ymax);
  };

  const changeBottomYgraphYmax = (ymax) => {
    setBottomYgraphYmax(ymax);
  };

  const changeBottomXgraphYmax = (ymax) => {
    setBottomXgraphYmax(ymax);
  };

  const handleTabChange = (event, value) => {
    setTabValue(value);
  };

  const handleOnSystemClick = (system) => {
    setEditorType(system.editorType);
    setDisplayEditor(true);
    setEditorSystem(system);
    setEditorMacros({ "$(device)": "" });
  };

  const handleSideTabChange = (event, value) => {
    setSideTabValue(value);
  };

  return (
    <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
      <TraditionalLayout title="Beamline Control System Example" denseAppBar>
        <Grid container spacing={3} style={{ paddingTop: 16 }}>
          <Grid item sm={9}>
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <div style={{ height: "20vh" }}>
                  <ControlTopHarpEx1
                    handleOnSystemClick={handleOnSystemClick}
                    handlePsOnClick={handlePsOnClick}
                    maxHarpsReached={maxHarpsReached}
                  />
                </div>
              </Grid>
              <Grid item sm={12}>
                <AppBar
                  position="static"
                  color="inherit"
                  indicatorcolor="secondary"
                >
                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons
                    indicatorColor="primary"
                    textColor="primary"
                    allowScrollButtonsMobile
                  >
                    <Tab label="Beam Diagnostics" />
                    <Tab label="Power Supplies Diagnostics" />
                    <Tab label="Ion Source" />
                    <Tab label="Table" />
                  </Tabs>
                </AppBar>
              </Grid>
              {tabValue === 1 && (
                <React.Fragment>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Grid item sm={6}>
                      <div
                        style={{
                          height: "50vh",
                          marginLeft: 10,
                          marginRight: 10,
                          marginTop: 20,
                        }}
                      >
                        <GraphY
                          pvs={[
                            "testIOC:PS1:Readback",
                            "testIOC:PS2:Readback",
                            "testIOC:PS3:Readback",
                          ]}
                          maxLength={600}
                          legend={[
                            "Q1 readback",
                            "Q2 readback",
                            "Q3 readback",
                          ]}
                          yUnits={" A"}
                          useTimeStamp={true}
                          usePolling={true}
                          pollingRate={100}
                        />
                      </div>
                    </Grid>
                    <Grid item sm={6}>
                      <div
                        style={{
                          height: "50vh",
                          marginLeft: 10,
                          marginRight: 10,
                          marginTop: 20,
                        }}
                      >
                        <GraphY
                          pvs={[
                            "testIOC:PS1:Setpoint",
                            "testIOC:PS2:Setpoint",
                            "testIOC:PS3:Setpoint",
                          ]}
                          maxLength={600}
                          usePolling={true}
                          pollingRate={100}
                          legend={[
                            "Q1 setpoint",
                            "Q2 setpoint",
                            "Q3 setpoint",
                          ]}
                          yUnits={" A"}
                          useTimeStamp={true}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </React.Fragment>
              )}
              {tabValue === 2 && (
                <React.Fragment>
                  <Grid item sm={12}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Grid item sm={2} style={{ marginLeft: 10 }}>
                        <ToggleButton
                          pv="testIOC:BeamlineA:BeamOn"
                          label={"Beam On"}
                          labelPlacement={"top"}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </React.Fragment>
              )}
              {tabValue === 3 && (
                <Grid item sm={12}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item sm={2}>
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
                    <Grid item sm={10}>
                      {sideTabValue === 0 && (
                        <TabContainer>
                          <ControlCenterTable
                            handleOnSystemClick={handleOnSystemClick}
                            systems={systems["BeamLine"]["PowerSupplies"]}
                          />
                        </TabContainer>
                      )}
                      {sideTabValue === 1 && (
                        <TabContainer>
                          <ControlCenterTable
                            handleOnSystemClick={handleOnSystemClick}
                            systems={systems["BeamLine"]["Slits"]}
                          />
                        </TabContainer>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item sm={3}>
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
    </div>
  );
};

export default ControlTestHarp1;
