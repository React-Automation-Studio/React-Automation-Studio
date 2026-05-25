import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useTheme } from "@mui/material/styles";

import AccountCircleIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

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

import TraditionalLayout from "../../UI/Layout/ComposedLayouts/TraditionalLayout";
import SectionCard, { SubSection } from "../../UI/SectionCard";
import { useLocalPV } from "../../SystemComponents/LocalPV";

const deviceMacros = { "$(device)": "testIOC" };
const bo1Macros = { "$(device)": "testIOC:BO1" };
const amplitudeMacros = { "$(device)": "testIOC:amplitude" };

const MainView = () => {
  const theme = useTheme();
  const elevation = theme.palette.paperElevation;
  const graphBg = theme.palette.background.paper;
  const editorType = useLocalPV({ pv: "loc://editorType" });

  return (
    <SectionCard elevation={elevation}>
      <Stack spacing={2}>
        <SubSection title="Trend">
          <Box
            sx={{
              height: "30vh",
              borderRadius: 1.5,
              overflow: "hidden",
            }}
          >
            <GraphY
              pvs={["testIOC:test4", "testIOC:test5"]}
              legend={["Sine Wave", "Amplitude"]}
              backgroundColor={graphBg}
            />
          </Box>
        </SubSection>

        <SubSection title="Readouts">
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, sm: 4, md: 3 }}>
              <Box sx={{ maxWidth: 340, mx: "auto" }}>
                <Gauge
                  pv="$(device):amplitude"
                  macros={deviceMacros}
                  prec={3}
                  usePvMinMax
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 4, md: 2 }}>
              <Stack spacing={2}>
                <TextInput
                  pv="$(device):amplitude"
                  macros={deviceMacros}
                  usePvLabel
                  prec={3}
                  alarmSensitive
                />
                <TextOutput
                  pv="$(device):test3"
                  macros={deviceMacros}
                  usePvLabel
                  prec={3}
                  alarmSensitive
                />
              </Stack>
            </Grid>
            <Grid size={{ xs: 6, sm: 2, md: 2 }}>
              <Stack spacing={1}>
                <StyledIconIndicator
                  pv="$(device)"
                  macros={bo1Macros}
                  onColor={theme.palette.ok.main}
                  offColor="default"
                  label="On"
                  labelPlacement="end"
                />
                <StyledIconIndicator
                  pv="$(device)"
                  macros={bo1Macros}
                  onColor="default"
                  offColor={theme.palette.error.main}
                  label="Off"
                  labelPlacement="end"
                />
              </Stack>
            </Grid>
            <Grid
              size={{ xs: 6, sm: 2, md: "grow" }}
              sx={{ alignSelf: "stretch", display: "flex" }}
            >
              <ToggleButton
                pv="$(device)"
                macros={bo1Macros}
                custom_selection_strings={["OFF", "ON"]}
              />
            </Grid>
          </Grid>
        </SubSection>

        <SubSection title="Editor">
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, sm: 3, md: 2 }}>
              <SelectionList
                pv="loc://editorType"
                useStringValue
                custom_selection_strings={["ThumbWheel", "Slider"]}
                initialLocalVariableValue="ThumbWheel"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 9, md: 10 }}>
              {editorType.value === "ThumbWheel" && (
                <Box sx={{ textAlign: "center" }}>
                  <ThumbWheel
                    pv="$(device)"
                    macros={amplitudeMacros}
                    prec_integer={3}
                    prec_decimal={1}
                  />
                </Box>
              )}
              {editorType.value === "Slider" && (
                <Box>
                  <Slider
                    pv="$(device):amplitude"
                    macros={deviceMacros}
                    usePvMinMax
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        </SubSection>
      </Stack>
    </SectionCard>
  );
};

const SettingsView = () => {
  const theme = useTheme();
  const elevation = theme.palette.paperElevation;

  return (
    <SectionCard
      icon={SettingsOutlinedIcon}
      title="Signal Generator Settings"
      subtitle="Tune the test waveform"
      elevation={elevation}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextInput
            pv="$(device):frequency"
            macros={deviceMacros}
            usePvUnits
            prec={1}
            usePvLabel
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextInput
            pv="$(device):amplitude"
            macros={deviceMacros}
            usePvUnits
            usePvLabel
          />
        </Grid>
      </Grid>
    </SectionCard>
  );
};

const MobileDemo1 = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <TraditionalLayout
      title="Mobile Layout Example"
      denseAppBar
      alignTitle="center"
    >
      <Box sx={{ p: 2, pb: 7, overflowX: "hidden" }}>
        {tabIndex === 0 && <MainView />}
        {tabIndex === 1 && <SettingsView />}
      </Box>

      <AppBar
        position="fixed"
        color="inherit"
        elevation={3}
        sx={{ top: "auto", bottom: 0 }}
      >
        <Tabs
          value={tabIndex}
          onChange={(_e, value) => setTabIndex(value)}
          variant="fullWidth"
          scrollButtons={false}
          textColor="primary"
          indicatorColor="primary"
          sx={{ minHeight: 44, "& .MuiTab-root": { minHeight: 44, py: 0.5 } }}
        >
          <Tab
            icon={<AccountCircleIcon />}
            iconPosition="start"
            label="Main"
            aria-label="Main"
          />
          <Tab
            icon={<SettingsOutlinedIcon />}
            iconPosition="start"
            label="Settings"
            aria-label="Settings"
          />
        </Tabs>
      </AppBar>
    </TraditionalLayout>
  );
};

export default MobileDemo1;
