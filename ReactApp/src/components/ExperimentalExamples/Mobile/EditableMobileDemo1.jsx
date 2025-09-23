import React, { useState } from "react";
import { AppBar, Divider, GridLegacy as Grid, IconButton, Tab, Tabs, Typography,Stack } from "@mui/material";
import {
  Gauge,
  GraphY,
  SelectionList,
  Slider,
  StyledIconIndicator,
  TextInput,
  TextOutput,
  ThumbWheel,
  ToggleButton,
} from "../../BaseComponents";

import AccountCircle from "@mui/icons-material/AccountCircleOutlined";
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import Settings from "@mui/icons-material/SettingsOutlined";
import TraditionalLayout from "../../UI/Layout/ComposedLayouts/TraditionalLayout";
import { useLocalPV } from "../../SystemComponents/LocalPV";
import { useTheme } from "@mui/material/styles";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 0, flexGrow: 1 }}>
      {props.children}
    </Typography>
  );
}

const MobileDemo1 = (props) => {
  const theme = useTheme();
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const editorType = useLocalPV({ pv: "loc://editorType" });

  const handleChange = (event, value) => {
    setShowAdvancedSettings(value);
  };

  let graphVH = "30vh";

  return (
    <TraditionalLayout
      title="Mobile Layout Example"
      denseAppBar
      alignTitle="center"
    
    >
      <div style={{ paddingBottom: 48 }}>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} marginTop={1}>
        <Typography
          variant="h6"
          align="center"
        >
          Edit mode is {editMode ? "On" : "Off"}
        </Typography>
        <IconButton size="large">
          {editMode ? (
            <ToggleOnIcon
              color="disabled"
              onClick={() => {
                setEditMode(!editMode);
              }}
            />
          ) : (
            <ToggleOffIcon
              color="error"
              onClick={() => {
                setEditMode(!editMode);
              }}
            />
          )}
        </IconButton>
        </Stack>
        {showAdvancedSettings === 0 && (
          <TabContainer key={"tabContainer0"}>
            <Grid
              container
              sx={{
                flexGrow: 1,
                padding: theme.spacing(2),
                overflowX: "hidden",
                overflowY: "hidden",
              }}
            >
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={2}
                  alignItems={"stretch"}
                  direction={"row"}
                  justifyContent={"flex-start"}
                >
                  <Grid item xs={12}>
                    <GraphY
                      key={editMode.toString()}
                      height={graphVH}
                      width="100%"
                      pvs={["testIOC:test4", "testIOC:test5"]}
                      legend={["Sine Wave", "Amplitude"]}
                      editMode={editMode}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction="row"
                      item
                      justifyContent="center"
                      spacing={2}
                      alignItems="stretch"
                    >
                      <Grid item xs={6}>
                        <TextInput
                          key={editMode.toString()}
                          pv={"$(device):amplitude"}
                          macros={{ "$(device)": "testIOC" }}
                          usePvLabel={true}
                          prec={3}
                          alarmSensitive={true}
                          editMode={editMode}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextOutput
                          key={editMode.toString()} 
                          pv={"$(device):test3"}
                          macros={{ "$(device)": "testIOC" }}
                          usePvLabel={true}
                          prec={3}
                          alarmSensitive={true}
                          editMode={editMode}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={6} sm={4} lg={3}>
                    <Gauge
                      key={editMode.toString()}
                      pv={"$(device):amplitude"}
                      macros={{ "$(device)": "testIOC" }}
                      prec={3}
                      usePvMinMax={true}
                      editMode={editMode}
                    />
                  </Grid>

                  <Grid item xs={2} sm={4} lg={5}>
                    <Grid
                      container
                      direction="column"
                      justifyContent="space-evenly"
                      spacing={2}
                      alignItems="stretch"
                    >
                      <Grid item>
                        <StyledIconIndicator
                          key={editMode.toString()}
                          pv={"$(device)"}
                          macros={{ "$(device)": "testIOC:BO1" }}
                          onColor={theme.palette.ok.main}
                          offColor="default"
                          label={"On"}
                          labelPlacement={"end"}
                          editMode={editMode}
                        />
                      </Grid>
                      <Grid item>
                        <StyledIconIndicator
                          key={editMode.toString()}
                          pv={"$(device)"}
                          macros={{ "$(device)": "testIOC:BO1" }}
                          onColor="default"
                          offColor={theme.palette.error.main}
                          label={"Off"}
                          labelPlacement={"end"}
                          editMode={editMode}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4} sm={4} lg={4}>
                    <ToggleButton
                      key={editMode.toString()}
                      pv={"$(device)"}
                      macros={{ "$(device)": "testIOC:BO1" }}
                      custom_selection_strings={["OFF", "ON"]}
                      editMode={editMode}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <SelectionList
                      key={editMode.toString()}
                      debug={false}
                      horizontal={true}
                      pv={"loc://editorType"}
                      useStringValue={true}
                      custom_selection_strings={["ThumbWheel", "Slider"]}
                      initialLocalVariableValue="ThumbWheel"
                      editMode={editMode}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {editorType.value === "None" && (
                      <Grid container direction="row" item xs={12} spacing={2}>
                        <Grid item xs={12}></Grid>
                      </Grid>
                    )}
                    {editorType.value === "ThumbWheel" && (
                      <Grid container direction="row" item xs={12}>
                        <Grid item xs={12}>
                          <div
                            style={{ textAlign: "center", marginTop: "16px" }}
                          >
                            <ThumbWheel
                              key={editMode.toString()}
                              pv={"$(device)"}
                              macros={{ "$(device)": "testIOC:amplitude" }}
                              prec_integer={3}
                              prec_decimal={1}
                              editMode={editMode}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    )}
                    {editorType.value === "Slider" && (
                      <div style={{ marginTop: "16px" }}>
                        <Grid
                          container
                          direction="row"
                          item
                          xs={12}
                          spacing={2}
                        >
                          <Grid item xs={12}>
                            <Slider
                              key={editMode.toString()}
                              pv={"$(device):amplitude"}
                              macros={{ "$(device)": "testIOC" }}
                              usePvMinMax={true}
                               editMode={editMode}
                            />
                          </Grid>
                        </Grid>
                      </div>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </TabContainer>
        )}
        {showAdvancedSettings === 1 && (
          <TabContainer key={"tabContainer1"}>
            <Grid container >
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={2}
                  alignItems={"stretch"}
                  direction={"column"}
                  justifyContent={"flex-start"}
                >
                  <Grid item>
                    <div style={{ marginBottom: 8 }}>Settings</div>
                    <Grid
                      container
                      spacing={2}
                      alignItems={"stretch"}
                      direction={"row"}
                      justifyContent={"flex-start"}
                    >
                      <Grid item xs={12} lg={4}>
                        <TextInput
                          key={editMode.toString()}
                          pv={"$(device):frequency"}
                          macros={{ "$(device)": "testIOC" }}
                          usePvUnits={true}
                          prec={1}
                          usePvLabel={true}
                          editMode={editMode}
                        />
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <TextInput
                          key={editMode.toString()}
                          pv={"$(device):amplitude"}
                          macros={{ "$(device)": "testIOC" }}
                          usePvUnits={true}
                          usePvLabel={true}
                           editMode={editMode}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Divider />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </TabContainer>
        )}
      </div>

      <AppBar
        style={{ position: "fixed", bottom: 0, top: "auto" }}
        color="inherit"
      >
        <Tabs
          value={showAdvancedSettings}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons={false}
        >
          <Tab icon={<AccountCircle />} />
          <Tab icon={<Settings />} />
        </Tabs>
      </AppBar>
    </TraditionalLayout>
  );
};

export default MobileDemo1;
