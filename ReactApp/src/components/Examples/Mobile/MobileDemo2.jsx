import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Fade from "@mui/material/Fade";
import { alpha, useTheme } from "@mui/material/styles";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SpeedIcon from "@mui/icons-material/Speed";
import TuneIcon from "@mui/icons-material/Tune";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ListAltIcon from "@mui/icons-material/ListAlt";

import TextInput from "../../BaseComponents/TextInput";
import TextOutput from "../../BaseComponents/TextOutput";
import Slider from "../../BaseComponents/Slider";
import GraphY from "../../BaseComponents/GraphY";
import Switch from "../../BaseComponents/Switch";
import SelectionInput from "../../BaseComponents/SelectionInput";
import SelectionList from "../../BaseComponents/SelectionList";
import ToggleButton from "../../BaseComponents/ToggleButton";
import ActionButton from "../../BaseComponents/ActionButton";
import RadioButtonGroup from "../../BaseComponents/RadioButtonGroup";
import RadioButton from "../../BaseComponents/RadioButton";
import CheckBox from "../../BaseComponents/CheckBox";
import ThumbWheel from "../../BaseComponents/ThumbWheel";
import Gauge from "../../BaseComponents/Gauge";
import Tank from "../../BaseComponents/Tank";
import ProgressBar from "../../BaseComponents/ProgressBar";
import StyledIconIndicator from "../../BaseComponents/StyledIconIndicator";

import TraditionalLayout from "../../UI/Layout/ComposedLayouts/TraditionalLayout";
import SectionCard, { SubSection } from "../../UI/SectionCard";

const deviceMacros = { "$(device)": "testIOC" };
const bo1Macros = { "$(device)": "testIOC:BO1" };
const mbboMacros = { "$(device)": "testIOC:mbboTest1" };

const TrendsSection = () => {
  const theme = useTheme();
  const graphBg = theme.palette.background.paper;
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Box
          sx={{
            height: { xs: "20vh", lg: "22vh" },
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
      </Grid>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Box
          sx={{
            height: { xs: "20vh", lg: "22vh" },
            borderRadius: 1.5,
            overflow: "hidden",
          }}
        >
          <GraphY
            pvs={["testIOC:amplitude"]}
            legend={["Instantaneous Amplitude"]}
            maxLength={1000}
            lineColor={[theme.palette.reactVis.lineColors[1]]}
            backgroundColor={graphBg}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

const GaugesPanel = () => (
  <Grid container spacing={2} alignItems="center" justifyContent="center">
    <Grid size={{ xs: 12, sm: 6 }}>
      <Box sx={{ maxWidth: 280, mx: "auto" }}>
        <Gauge
          pv="$(device):amplitude"
          macros={deviceMacros}
          usePvLabel
          prec={3}
          usePvMinMax
        />
      </Box>
    </Grid>
    <Grid size={{ xs: 12, sm: 6 }}>
      <Box sx={{ maxWidth: 280, mx: "auto" }}>
        <Gauge
          pv="$(device):test3"
          macros={deviceMacros}
          usePvLabel
          prec={3}
          min={-10000}
          max={10000}
        />
      </Box>
    </Grid>
  </Grid>
);

const BargraphsPanel = () => (
  <Stack spacing={2}>
    <Stack direction="row" spacing={2}>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <ProgressBar
          pv="$(device):test3"
          macros={deviceMacros}
          units="V"
          usePvLabel
          prec={0}
          min={-10000}
          max={10000}
          lockAspectRatio={false}
          height={70}
        />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <ProgressBar
          pv="$(device):amplitude"
          macros={deviceMacros}
          usePvLabel
          prec={0}
          usePvMinMax
          alarmSensitive
          lockAspectRatio={false}
          height={70}
        />
      </Box>
    </Stack>
    <Stack direction="row" spacing={2} justifyContent="center">
      <Box sx={{ maxWidth: 280, width: "100%" }}>
        <Tank
          pv="$(device):test3"
          macros={deviceMacros}
          units="V"
          usePvLabel
          prec={0}
          min={-10000}
          max={10000}
          lockAspectRatio={false}
          height={120}
        />
      </Box>
      <Box sx={{ maxWidth: 280, width: "100%" }}>
        <Tank
          pv="$(device):amplitude"
          macros={deviceMacros}
          usePvLabel
          prec={0}
          usePvMinMax
          alarmSensitive
          lockAspectRatio={false}
          height={120}
        />
      </Box>
    </Stack>
  </Stack>
);

const DisplaysTabs = () => {
  const [tab, setTab] = useState("gauges");
  return (
    <Box>
      <Tabs
        value={tab}
        onChange={(_e, v) => setTab(v)}
        textColor="primary"
        indicatorColor="primary"
        sx={{
          minHeight: 36,
          mb: 2,
          "& .MuiTab-root": {
            minHeight: 36,
            textTransform: "none",
            fontWeight: 500,
            letterSpacing: 0.3,
          },
        }}
      >
        <Tab value="gauges" label="Analog gauges" />
        <Tab value="bargraphs" label="Bargraph displays" />
      </Tabs>
      <Fade in key={tab} timeout={200}>
        <Box>{tab === "gauges" ? <GaugesPanel /> : <BargraphsPanel />}</Box>
      </Fade>
    </Box>
  );
};

const NumericSection = () => {
  const theme = useTheme();
  const elevation = theme.palette.paperElevation;
  return (
    <Grid container spacing={3} alignItems="stretch">
      <Grid size={{ xs: 12, md: 6 }}>
        <SectionCard elevation={elevation}>
          <SubSection icon={TuneIcon} title="Controls">
            <Stack spacing={2}>
              <Slider
                pv="$(device):amplitude"
                macros={deviceMacros}
                usePvMinMax
                min={1000}
                max={500}
                usePvLabel
              />
              <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextInput
                    pv="$(device):amplitude"
                    macros={deviceMacros}
                    usePvLabel
                    prec={3}
                    alarmSensitive
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextOutput
                    pv="$(device):test3"
                    macros={deviceMacros}
                    usePvLabel
                    prec={3}
                    alarmSensitive
                  />
                </Grid>
                <Grid size={12} sx={{ textAlign: "center" }}>
                  <ThumbWheel
                    pv="$(device)"
                    macros={{ "$(device)": "testIOC:amplitude" }}
                    prec_integer={3}
                    prec_decimal={1}
                  />
                </Grid>
              </Grid>
            </Stack>
          </SubSection>
        </SectionCard>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <SectionCard elevation={elevation}>
          <SubSection icon={SpeedIcon} title="Displays">
            <DisplaysTabs />
          </SubSection>
        </SectionCard>
      </Grid>
    </Grid>
  );
};

const BinarySection = () => {
  const theme = useTheme();
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid size={{ xs: 12, sm: 6 }}>
        <SelectionInput pv="$(device)" macros={bo1Macros} usePvLabel />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextOutput pv="$(device)" macros={bo1Macros} usePvLabel />
      </Grid>

      <Grid size={{ xs: 6, sm: 3 }}>
        <Switch pv="$(device)" macros={bo1Macros} usePvLabel />
      </Grid>
      <Grid size={{ xs: 6, sm: 3 }}>
        <CheckBox pv="$(device)" macros={bo1Macros} usePvLabel />
      </Grid>
      <Grid size={{ xs: 6, sm: 3 }}>
        <RadioButton pv="$(device)" macros={bo1Macros} usePvLabel />
      </Grid>
      <Grid size={{ xs: 6, sm: 3 }}>
        <StyledIconIndicator
          pv="$(device)"
          macros={bo1Macros}
          onColor={theme.palette.ok.main}
          offColor={theme.palette.error.main}
          usePvLabel
          labelPlacement="end"
        />
      </Grid>

      <Grid size={{ xs: 6, sm: 3 }}>
        <ToggleButton
          pv="$(device)"
          macros={bo1Macros}
          usePvLabel
          labelPlacement="top"
        />
      </Grid>
      <Grid size={{ xs: 6, sm: 3 }}>
        <ToggleButton
          pv="$(device)"
          macros={bo1Macros}
          label="Custom Label"
          labelPlacement="top"
        />
      </Grid>
      <Grid size={{ xs: 6, sm: 3 }}>
        <ActionButton
          pv="$(device)"
          macros={bo1Macros}
          label="Action Button 1"
          labelPlacement="top"
          actionValue="1"
          actionString="Switch On"
        />
      </Grid>
      <Grid size={{ xs: 6, sm: 3 }}>
        <ActionButton
          pv="$(device)"
          macros={bo1Macros}
          label="Action Button 2"
          labelPlacement="top"
          actionValue="0"
          actionString="Switch Off"
        />
      </Grid>
    </Grid>
  );
};

const MbboSection = () => (
  <Grid container spacing={2} alignItems="flex-start">
    <Grid size={{ xs: 12, sm: 6 }}>
      <SelectionInput pv="$(device)" macros={mbboMacros} usePvLabel />
    </Grid>
    <Grid size={{ xs: 12, sm: 6 }}>
      <TextOutput pv="$(device)" macros={mbboMacros} usePvLabel />
    </Grid>
    <Grid size={{ xs: 12, md: 4 }}>
      <RadioButtonGroup pv="$(device)" macros={mbboMacros} usePvLabel />
    </Grid>
    <Grid size={{ xs: 12, md: 4 }}>
      <SelectionList pv="$(device)" macros={mbboMacros} usePvLabel />
    </Grid>
    <Grid size={{ xs: 12, md: 4 }}>
      <SelectionList
        pv="$(device)"
        macros={mbboMacros}
        usePvLabel
        horizontal
      />
    </Grid>
  </Grid>
);

const sections = [
  {
    id: "numeric",
    icon: SpeedIcon,
    label: "Numeric I/O",
    subtitle:
      "Set-point slider, text fields, gauges, thumbwheels, progress bars and tanks",
    Component: NumericSection,
    bare: true,
  },
  {
    id: "binary",
    icon: ToggleOnIcon,
    label: "Binary I/O",
    subtitle: "Switch, toggle, action and indicator widgets bound to a binary PV",
    Component: BinarySection,
  },
  {
    id: "mbbo",
    icon: ListAltIcon,
    label: "Multi-state",
    subtitle: "Selection widgets bound to an mbbo PV",
    Component: MbboSection,
  },
];

const SectionNav = ({ activeId, onSelect }) => {
  const theme = useTheme();
  const tint = theme.palette.primary.main;

  return (
    <Paper
      elevation={theme.palette.paperElevation}
      sx={{
        width: { xs: "100%", md: 260 },
        flexShrink: 0,
        borderRadius: 2,
        p: 1,
        display: "flex",
        flexDirection: { xs: "row", md: "column" },
        gap: 0.5,
        overflowX: { xs: "auto", md: "visible" },
        overflowY: { xs: "hidden", md: "auto" },
        alignSelf: { md: "flex-start" },
      }}
    >
      {sections.map((section) => {
        const isActive = activeId === section.id;
        const Icon = section.icon;
        return (
          <ListItemButton
            key={section.id}
            selected={isActive}
            onClick={() => onSelect(section.id)}
            sx={{
              borderRadius: 1.5,
              flexShrink: 0,
              minWidth: { xs: "max-content", md: "auto" },
              px: 1.5,
              py: 1,
              transition: theme.transitions.create(
                ["background-color", "color"],
                { duration: theme.transitions.duration.shortest }
              ),
              "&.Mui-selected": {
                bgcolor: alpha(tint, 0.18),
                "&:hover": { bgcolor: alpha(tint, 0.24) },
              },
              "&:hover": { bgcolor: alpha(tint, 0.08) },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 36,
                color: isActive ? "primary.main" : "text.secondary",
              }}
            >
              <Icon />
            </ListItemIcon>
            <ListItemText
              primary={section.label}
              primaryTypographyProps={{
                fontWeight: isActive ? 600 : 500,
                noWrap: true,
                fontSize: "0.95rem",
              }}
            />
          </ListItemButton>
        );
      })}
    </Paper>
  );
};

const MobileDemo2 = (props) => {
  const theme = useTheme();
  const elevation = theme.palette.paperElevation;
  const standalone = typeof props.nosidebar === "undefined";

  const [activeId, setActiveId] = useState(sections[0].id);
  const active = sections.find((s) => s.id === activeId) ?? sections[0];
  const ActiveComponent = active.Component;

  const content = (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <SectionCard elevation={elevation}>
        <SubSection icon={ShowChartIcon} title="Live Trends">
          <TrendsSection />
        </SubSection>
      </SectionCard>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          alignItems: "stretch",
        }}
      >
        <SectionNav activeId={activeId} onSelect={setActiveId} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Fade in key={active.id} timeout={250}>
            <Box>
              {active.bare ? (
                <ActiveComponent />
              ) : (
                <SectionCard elevation={elevation}>
                  <SubSection icon={active.icon} title={active.label}>
                    <ActiveComponent />
                  </SubSection>
                </SectionCard>
              )}
            </Box>
          </Fade>
        </Box>
      </Box>
    </Box>
  );

  if (standalone) {
    return (
      <TraditionalLayout
        title="Mobile Demo 2"
        denseAppBar
        alignTitle="center"
      >
        {content}
      </TraditionalLayout>
    );
  }
  return content;
};

export default MobileDemo2;
