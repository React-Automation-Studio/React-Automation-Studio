import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import HelpIcon from "@mui/icons-material/Help";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
// Per-link icons
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import MemoryIcon from "@mui/icons-material/Memory";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import TableViewIcon from "@mui/icons-material/TableView";
import TimelineIcon from "@mui/icons-material/Timeline";
import ConstructionIcon from "@mui/icons-material/Construction";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LockIcon from "@mui/icons-material/Lock";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import InsightsIcon from "@mui/icons-material/Insights";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import TraditionalLayout from "./Layout/ComposedLayouts/TraditionalLayout";
import Changelog from "./Changelog";

const DashboardCard = ({
  icon: Icon,
  title,
  elevation,
  scrollable = false,
  children,
}) => {
  const theme = useTheme();
  const hoverShadow = theme.shadows[Math.min((elevation ?? 1) + 2, 24)];
  return (
    <Paper
      elevation={elevation}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: { xs: 2.5, sm: 3 },
        gap: 2.5,
        borderRadius: 2,
        transition: theme.transitions.create("box-shadow", {
          duration: theme.transitions.duration.shortest,
        }),
        "&:hover": { boxShadow: hoverShadow },
      }}
    >
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        justifyContent="center"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: "50%",
            color: "primary.main",
            bgcolor: alpha(theme.palette.primary.main, 0.12),
          }}
        >
          <Icon />
        </Box>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: 600, letterSpacing: 0.3 }}
        >
          {title}
        </Typography>
      </Stack>
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          ...(scrollable && {
            maxHeight: "42vh",
            overflowY: "auto",
            pr: 1,
            mr: -1,
            "&::-webkit-scrollbar": { width: 6 },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: alpha(theme.palette.text.primary, 0.2),
              borderRadius: 3,
            },
            "&::-webkit-scrollbar-thumb:hover": {
              bgcolor: alpha(theme.palette.text.primary, 0.35),
            },
          }),
        }}
      >
        {children}
      </Box>
    </Paper>
  );
};

const NavButton = ({ link }) => {
  const theme = useTheme();
  const isExternal = Boolean(link.href);
  const LeadingIcon = link.icon;
  return (
    <Button
      fullWidth
      variant="outlined"
      component={isExternal ? "a" : Link}
      startIcon={LeadingIcon ? <LeadingIcon /> : null}
      endIcon={
        isExternal ? (
          <OpenInNewIcon
            fontSize="small"
            sx={{ opacity: 0.55, fontSize: "1rem" }}
          />
        ) : null
      }
      {...(isExternal
        ? { href: link.href, target: "_blank", rel: "noopener noreferrer" }
        : { to: link.to })}
      sx={{
        justifyContent: "flex-start",
        textAlign: "left",
        textTransform: "none",
        fontWeight: 500,
        fontSize: "0.95rem",
        letterSpacing: 0.2,
        py: 1.1,
        px: 1.75,
        borderRadius: 1.5,
        borderColor: alpha(theme.palette.primary.main, 0.35),
        bgcolor: alpha(theme.palette.primary.main, 0.06),
        color: "text.primary",
        transition: theme.transitions.create(
          ["background-color", "border-color", "color"],
          { duration: theme.transitions.duration.shortest }
        ),
        "& .MuiButton-startIcon": {
          color: "primary.main",
          mr: 1.25,
          transition: theme.transitions.create("color", {
            duration: theme.transitions.duration.shortest,
          }),
        },
        "& .MuiButton-endIcon": {
          marginLeft: "auto",
        },
        "&:hover": {
          bgcolor: "primary.main",
          borderColor: "primary.main",
          color: "primary.contrastText",
          "& .MuiButton-startIcon": { color: "inherit" },
        },
      }}
    >
      <Box component="span" sx={{ flex: 1 }}>
        {link.label}
      </Box>
    </Button>
  );
};

const NavButtonStack = ({ links }) => (
  <Stack spacing={1.25}>
    {links.map((link) => (
      <NavButton key={link.label} link={link} />
    ))}
  </Stack>
);

const mobileDemoLinks = [
  { to: "/MobileDemo1", label: "Mobile Demo 1", icon: SmartphoneIcon },
  { to: "/MobileDemo2", label: "Mobile Demo 2", icon: SmartphoneIcon },
  { to: "/EpicsDemos", label: "Epics Demos", icon: MemoryIcon },
  { to: "/Test3D", label: "3D Demos", icon: ViewInArIcon },
];

const desktopDemoLinks = [
  {
    to: "/TableControlSystem",
    label: "Table Control Demo",
    icon: TableViewIcon,
  },
  {
    to: "/BeamlineControlSystem",
    label: "Beam Line Control Demo",
    icon: TimelineIcon,
  },
  { to: "/MobileDemo1", label: "Mobile Demo 1", icon: SmartphoneIcon },
  { to: "/MobileDemo2", label: "Mobile Demo 2", icon: SmartphoneIcon },
  { to: "/EpicsDemos", label: "Epics Demos", icon: MemoryIcon },
  { to: "/Test3D", label: "3D Demos", icon: ViewInArIcon },
];

const stagingLinks = [
  { to: "/Staging", label: "Staging", icon: ConstructionIcon },
];

const applianceLinks = [
  {
    to: "/AlarmHandlerDemo",
    label: "Alarm Handler Demo",
    icon: NotificationsActiveIcon,
  },
  { to: "/VaultDemo", label: "Vault Demo", icon: LockIcon },
  { to: "/LoadSaveExample", label: "LoadSave Example", icon: SaveAltIcon },
  {
    to: "/ArchiverDataViewerDemo",
    label: "Archiver Data Viewer Demo",
    icon: InsightsIcon,
  },
];

const previewLinks = [
  {
    to: "/AreaDetectorSimExample",
    label: "Area Detector Sim Demo",
    icon: PhotoCameraIcon,
  },
];

const MainDashboard = () => {
  const theme = useTheme();
  const elevation = theme.palette.paperElevation;

  const styleguideURL = `${window.location.protocol}//${window.location.hostname}:6060/`;
  const helpLinks = [
    {
      href: styleguideURL,
      label: "Help and Style Guide",
      icon: MenuBookIcon,
    },
  ];

  return (
    <TraditionalLayout
      title="React Automation Studio"
      denseAppBar
      alignTitle="center"
    >
      <Box
        sx={{
          p: { xs: 2, md: 3 },
          minHeight: "100%",
          backgroundImage: `radial-gradient(ellipse at 50% -10%, ${alpha(
            theme.palette.primary.main,
            0.06
          )}, transparent 55%)`,
        }}
      >
        <Grid container spacing={3} alignItems="stretch">
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <DashboardCard
              icon={PhoneAndroidIcon}
              title="Mobile Demos"
              elevation={elevation}
            >
              <NavButtonStack links={mobileDemoLinks} />
            </DashboardCard>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <DashboardCard
              icon={DesktopWindowsIcon}
              title="Desktop Demos"
              elevation={elevation}
            >
              <NavButtonStack links={desktopDemoLinks} />
            </DashboardCard>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
            <DashboardCard
              icon={NewReleasesIcon}
              title="What's New"
              elevation={elevation}
              scrollable
            >
              <Changelog />
            </DashboardCard>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <DashboardCard
              icon={EditIcon}
              title="Staging"
              elevation={elevation}
            >
              <NavButtonStack links={stagingLinks} />
            </DashboardCard>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <DashboardCard
              icon={VisibilityIcon}
              title="Appliances"
              elevation={elevation}
            >
              <NavButtonStack links={applianceLinks} />
            </DashboardCard>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <DashboardCard
              icon={VisibilityIcon}
              title="Preview"
              elevation={elevation}
            >
              <NavButtonStack links={previewLinks} />
            </DashboardCard>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <DashboardCard
              icon={HelpIcon}
              title="Help"
              elevation={elevation}
            >
              <NavButtonStack links={helpLinks} />
            </DashboardCard>
          </Grid>
        </Grid>
      </Box>
    </TraditionalLayout>
  );
};

export default MainDashboard;
