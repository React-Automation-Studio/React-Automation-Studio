import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from '@mui/material/GridLegacy';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TraditionalLayout from "./Layout/ComposedLayouts/TraditionalLayout";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import HelpIcon from "@mui/icons-material/Help";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";

const MainDashboard = (props) => {
  const theme = useTheme();
  const paperElevation = theme.palette.paperElevation;
  const buttonVariant = "contained";
  const typographyProps = {
    color: "primary",
    style: {
      display: "inline-flex",
      alignItems: "center",
    },
    variant: "h5",
  };

  const buttonSx = {
    width: "100%",
    height: "100%",
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const mainGridItemSx = {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(2),
  };

  const paperSx = {
    padding: theme.spacing(4),
    height: "100%",
  };

  const styleguideURL =
    window.location.protocol + "//" + window.location.hostname + ":6060/";
  return (
    <TraditionalLayout
      title="React Automation Studio"
      denseAppBar
      alignTitle="center"
    >
      <Grid
        sx={{
          paddingTop: theme.spacing(2),
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          paddingBottom: theme.spacing(2),
          marginBottom: theme.spacing(2),
        }}
        container
        direction="row"
        item
        justifyContent="center"
        spacing={2}
        alignItems="stretch"
      >
        <Grid
          item
          lg={4}
          sm={6}
          xs={12}
          sx={{
            paddingTop: theme.spacing(1),
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            marginBottom: theme.spacing(2),
          }}
        >
          <Paper
            sx={{
              padding: theme.spacing(4),
              height: "100%",
            }}
            elevation={paperElevation}
          >
            <Grid
              container
              direction="row"
              item
              justifyContent="center"
              spacing={4}
              alignItems="center"
            >
              <Grid
                item
                lg={6}
                sm={12}
                xs={12}
              >
                <Grid
                  container
                  direction="row"
                  item
                  justifyContent="center"
                  spacing={4}
                  alignItems="center"
                >
                  <Grid
                    item
                    lg={12}
                    sm={12}
                    xs={12}
                    style={{ textAlign: "center" }}
                  >
                    <Typography {...typographyProps}>
                      <PhoneAndroidIcon
                        sx={{
                          marginRight: theme.spacing(1),
                          fontSize: "inherit",
                        }}
                      />
                      Mobile Demos
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    sm={12}
                    xs={12}
                  >
                    <Button
                      fullWidth
                      sx={buttonSx}
                      component={Link}
                      to="/MobileDemo1"
                      color="primary"
                      variant={buttonVariant}
                    >
                      {" "}
                      Mobile Demo 1{" "}
                    </Button>
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    sm={12}
                    xs={12}
                  >
                    <Button
                      fullWidth
                      sx={buttonSx}
                      component={Link}
                      to="/MobileDemo2"
                      color="primary"
                      variant={buttonVariant}
                    >
                      {" "}
                      Mobile Demo 2{" "}
                    </Button>
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    sm={12}
                    xs={12}
                  >
                    <Button
                      fullWidth
                      sx={buttonSx}
                      component={Link}
                      to="/EpicsDemos"
                      color="primary"
                      variant={buttonVariant}
                    >
                      {" "}
                      Epics Demos{" "}
                    </Button>
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    sm={12}
                    xs={12}
                  >
                    <Button
                      fullWidth
                      sx={buttonSx}
                      component={Link}
                      to="/Test3D"
                      color="primary"
                      variant={buttonVariant}
                    >
                      {" "}
                      3D Demos{" "}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid
          item
          lg={4}
          sm={6}
          xs={12}
          sx={mainGridItemSx}
        >
          <Paper
            sx={paperSx}
            elevation={paperElevation}
          >
            <Grid
              container
              direction="row"
              item
              justifyContent="center"
              spacing={4}
              alignItems="center"
            >
              <Grid
                item
                lg={6}
                sm={12}
                xs={12}
              >
                <Grid
                  container
                  direction="row"
                  item
                  justifyContent="center"
                  spacing={4}
                  alignItems="center"
                >
                  <Grid
                    item
                    lg={12}
                    sm={12}
                    xs={12}
                    style={{ textAlign: "center" }}
                  >
                    <Typography {...typographyProps}>
                      <DesktopWindowsIcon sx={{
                        marginRight: theme.spacing(1),
                        fontSize: "inherit",
                      }} /> Desktop
                      Demos
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    sm={12}
                    xs={12}
                  >
                    <Button
                      fullWidth
                      sx={buttonSx}
                      component={Link}
                      to="/TableControlSystem"
                      color="primary"
                      variant={buttonVariant}
                    >
                      {" "}
                      Table Control Demo
                    </Button>
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    sm={12}
                    xs={12}
                  >
                    <Button
                      fullWidth
                      sx={buttonSx}
                      component={Link}
                      to="/BeamlineControlSystem"
                      color="primary"
                      variant={buttonVariant}
                    >
                      {" "}
                      Beam Line Control Demo{" "}
                    </Button>
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    sm={12}
                    xs={12}
                  >
                    <Button
                      fullWidth
                      sx={buttonSx}
                      component={Link}
                      to="/MobileDemo1"
                      color="primary"
                      variant={buttonVariant}
                    >
                      {" "}
                      Mobile Demo 1{" "}
                    </Button>
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    sm={12}
                    xs={12}
                  >
                    <Button
                      fullWidth
                      sx={buttonSx}
                      component={Link}
                      to="/MobileDemo2"
                      color="primary"
                      variant={buttonVariant}
                    >
                      {" "}
                      Mobile Demo 2{" "}
                    </Button>
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    sm={12}
                    xs={12}
                  >
                    <Button
                      fullWidth
                      sx={buttonSx}
                      component={Link}
                      to="/EpicsDemos"
                      color="primary"
                      variant={buttonVariant}
                    >
                      {" "}
                      Epics Demos{" "}
                    </Button>
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    sm={12}
                    xs={12}
                  >
                    <Button
                      fullWidth
                      sx={buttonSx}
                      component={Link}
                      to="/Test3D"
                      color="primary"
                      variant={buttonVariant}
                    >
                      {" "}
                      3D Demos{" "}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid
          item
          lg={4}
          sm={6}
          xs={12}
          sx={mainGridItemSx}
        >
          <Paper
            sx={paperSx}
            elevation={paperElevation}
          >
            <Grid
              container
              direction="row"
              item
              justifyContent="center"
              spacing={4}
              alignItems="center"
            >
              <Grid
                item
                lg={12}
                sm={12}
                xs={12}
                style={{ textAlign: "center" }}
              >
                <Typography {...typographyProps}>
                  <NewReleasesIcon sx={{
                    marginRight: theme.spacing(1),
                    fontSize: "inherit",
                  }} /> Whats New
                </Typography>
              </Grid>
              <Grid
                item
                lg={12}
                sm={12}
                xs={12}
              >
                <Typography
                  sx={{
                    maxHeight: "35vh",
                    overflowY: "scroll",
                    paddingRight: 1,
                  }}
                  component="div"
                >
                  V7.0.0 Tuesday 16 September 2025
                  <br />
                  Major Updates:
                  <ul>
                    <li>Updated to Updated to MUI V7 </li>
                    <li>Updated to the latest Node LTS 22.19.0 </li>
                    <li>Package updates to frontend modules</li>
                    <li>Removed legacy MUI styling</li>
                  </ul>
                

                  V6.1.0 Monday 17 February 2025
                  <br />
                  Minor Updates:
                  <ul>
                    <li>Updated to React 19 </li>
                    <li>Updated to the latest Node LTS 22.14.0 </li>
                    <li>Package updates to frontend modules</li>
                    <li>Updated to MongoDB 8.0.4 </li>
                    <li>Migrate to Poetry 2.0.1</li>
                    <li>Package updates to the backend modules</li>
                    <li>Update to Nginx 1.27.4</li>
                  </ul>
                  V6.0.1 Monday 20 January 2025
                  <br />
                  Minor Updates:
                  <ul>
                    <li>
                      Fix installation failure due to Poetry 2.x (quick fix)
                    </li>
                  </ul>
                  V6.0.0 Monday 25 November 2024
                  <br />
                  Major Updates:
                  <ul>
                    <li>Updated to the MUI 6</li>
                    <li>Moved from npm to pnpm package manager </li>
                    <li>Updated to MongoDB 8.0.3 </li>
                    <li>Speed improvements to the GraphY component</li>
                    <li>Speed improvements to the Area Detector Appliance</li>
                  </ul>
                  Minor Updates:
                  <ul>
                    <li>Package updates to the frontend modules</li>
                    <li>Updated to the latest Node LTS 22.11.0 </li>
                    <li>Updated to Python 3.12.7</li>
                    <li>Updated to PyEpics 3.5.7</li>
                    <li>Package updates to the backend modules</li>
                  </ul>
                  V5.2.0 Thursday 15 May 2024
                  <br />
                  V5.2.1 Wednesday 17 July 2024
                  <br />
                  Minor Updates:
                  <ul>
                    <li>Package updates to the frontend modules</li>
                    <li>Updated to the latest Node LTS 20.15.1 </li>
                    <li>Updated to Python 3.12.4</li>
                    <li>Package updates to the backend modules</li>
                    <li>Minor Bug fix Toggle Button component</li>
                  </ul>
                  V5.2.0 Thursday 15 May 2024
                  <br />
                  Minor Updates:
                  <ul>
                    <li>Update to React 18.3.1</li>
                    <li>
                      Conversion of all base and system components to
                      Typescript, and function default parameters, due to React
                      deprecation of defaultProps
                    </li>
                    <li>Package updates to the frontend modules</li>
                    <li>Updated to the latest Node LTS 20.13.1 </li>
                    <li>Updates to the documentation </li>
                  </ul>
                  Deprecation warning:
                  <ul>
                    <li>
                      React 19.0.0 will deprecate the use of defaultProps,
                      please use the default value in the function signature
                      instead. See{" "}
                      <a href="https://react.dev/blog/2024/04/25/react-19-upgrade-guide">
                        here
                      </a>{" "}
                      for more information. The proptypes package will also be
                      removed in the release 6.0.0 of RAS.
                    </li>
                  </ul>
                  <br />
                  V5.1.0 Thursday 18 April 2024 Minor Updates:
                  <ul>
                    <li>Package updates to Backend modules</li>
                    <li>Updated to Python 3.12.3</li>
                    <li>Package updates to all Node modules</li>
                    <li>Updated to the latest Node LTS 20.12.2 </li>
                    <li>Updates to the documentation </li>
                  </ul>
                  <br />
                  V5.0.1 Friday 08 March 2024 Minor Updates:
                  <ul>
                    <li>Package updates to Backend modules</li>
                    <li>Updated to Epics 7.0.8 and Python 3.12.1</li>
                    <li>Package updates to all Node modules</li>
                    <li>Updated to the latest Node LTS</li>
                    <li>Minor Bug fix to EPICS socketIO connections, PR#128</li>
                  </ul>
                  <br />
                  V5.0.0 Friday 02 February 2024 Major Updates:
                  <ul>
                    <li>Package updates to Backend modules</li>
                    <li>Updated to Epics 7 and Python 3.12.1</li>
                    <li>Moved from Create-react-app to Vite</li>
                    <li>Package updates to all Node modules</li>
                    <li>Updated to the latest Node LTS</li>
                    <li>MUI has been updated to the latest packages</li>
                  </ul>
                  New Features:
                  <ul>
                    <li>Docker multi-stage builds for speed improvements</li>
                    <li>
                      Preview of an AreaDector Appliance user interface with
                      included simulation
                    </li>
                    <li>Named MongoDb volumes for easier management</li>
                  </ul>
                  Breaking Changes:
                  <ul>
                    <li>
                      See the migration guide to migrate from V4.0.3 to V5.0.0:{" "}
                      <a href="https://github.com/React-Automation-Studio/React-Automation-Studio/blob/master/docs/migrate-from-V4-to-V5.md">
                        Here
                      </a>
                      <br />
                    </li>
                  </ul>
                  <br />
                  V4.0.3 Friday 20 October 2023 Minor Updates:
                  <ul>
                    <li>Package updates to all Node modules</li>
                    <li>Updated to the latest Node LTS</li>
                    <li>MUI has been updated to the latest packages</li>
                    <li>Package updates to pVServer Python packages</li>
                  </ul>
                  Minor Bug Fixes and Updates:
                  <ul>
                    <li>Fixed pvServer Flask, Werkzeug dependencies.</li>
                  </ul>
                  <br />
                  V4.0.2 Thursday 13 July 2023 Minor Updates:
                  <ul>
                    <li>Package updates to all Node modules</li>
                    <li>Updated to the latest Node LTS</li>
                    <li>MUI has been updated to the latest packages</li>
                  </ul>
                  Minor Bug Fixes and Updates:
                  <ul>
                    <li>A few minor bug fixes to the pvServer</li>
                  </ul>
                  <br />
                  V4.0.1 Friday 24 March 2023 Minor Updates:
                  <ul>
                    <li>Package updates to all Node modules</li>
                    <li>Updated to the latest Node LTS</li>
                    <li>MUI has been updated to the latest packages</li>
                    <li>
                      Changed the contact information to Github Discussions:
                      https://github.com/React-Automation-Studio/React-Automation-Studio/discussions
                    </li>
                  </ul>
                  Minor Bug Fixes and Updates:
                  <ul>
                    <li>
                      A few minor bug fixes to the slider and the context menu
                    </li>
                  </ul>
                  Minor Breaking Changes:
                  <ul>
                    <li>
                      Previous version of google sign in is being deprecated
                      (see
                      https://developers.googleblog.com/2021/08/gsi-jsweb-deprecation.html
                      )Solution is to replace "react-google-login" with
                      @react-oauth/google
                    </li>
                  </ul>
                  <br />
                  <br />
                  V4.0.0 Wednesday 3 August 2022 Major Updates:
                  <ul>
                    <li>Update to React 18.2.0 </li>
                    <li>
                      Update to MUI 5.9.2, see the section on breaking changes
                      below
                    </li>
                    <li>
                      All NodeJs packages have been updated to latest versions
                      except react-router-dom which is kept at V5.3.3 for now.
                    </li>
                    <li>
                      ReactVis was dropped and components have been updated to
                      use Plotly.js{" "}
                    </li>
                  </ul>
                  Minor Bug Fixes and Updates:
                  <ul>
                    <li>
                      Minor formatting and theme changes due to MUI update
                    </li>
                    <li>
                      General clean up of code formatting in both pvServer and
                      React (prior upgrading the MUI library)
                    </li>
                    <li>Addition of Poetry as Python package manager</li>
                    <li>
                      Addition of Black as a formating tool for Python. A merge
                      request will fail if Python is not formatted accordingly.
                      The tool Black is included into development section of
                      Poetry.
                    </li>
                    <li>
                      Restoration of GitHub pages build. The build excludes
                      documents used with the style guide due to use of {`"{{"`}
                      in examples.
                    </li>
                    <li>
                      Minor documentation clean up: links to repositories/
                      projects up to date.
                    </li>
                  </ul>
                  Breaking Changes:
                  <ul>
                    <li>ReactVis was dropped</li>
                    <li>
                      Update to MUI 5.9.2 from Material UI 4<br />
                      Follow the migration guide at:
                      https://mui.com/material-ui/migration/migration-v4/ and
                      apply the preset-safe code mods
                      https://mui.com/material-ui/migration/migration-v4/#preset-safe
                    </li>
                    <li>
                      If you customized any of the themes be sure to update it
                      in line with the base themes that come with the master
                      repo
                    </li>
                    <li>
                      Removed Deprecated ActionFanoutButton - use ActionButton
                      instead
                    </li>
                    <li>
                      Removed Deprecated SwitchComponent - use Switch instead
                    </li>
                    <li>
                      Removed Deprecated SimpleSlider - use Slider instead
                    </li>
                  </ul>
                  <br />
                  V3.1.0 Wednesday 25 August 2021
                  <br />
                  <br />
                  Minor Bug Fixes and Updates:
                  <ul>
                    <li>
                      Hot fix in NodeJs Docker files for new npm registry
                      requirements, previous releases will fail after 1 October
                      2021{" "}
                    </li>
                  </ul>
                  <br />
                  V3.0.2 Monday 23 August 2021
                  <br />
                  <br />
                  Minor Bug Fixes and Updates:
                  <ul>
                    <li>pvServer: minor bug fix</li>
                    <li>
                      StyledIconIndicator: non zero values default to onColor
                    </li>
                    <li>
                      Docker: standardised to Python 3.8.7 in all Python images
                    </li>
                  </ul>
                  <br />
                  V3.0.1 Monday 28 June 2021
                  <br />
                  <br />
                  Minor Bug Fixes and Updates:
                  <ul>
                    <li>GraphY: Fixed timestamp issue</li>
                    <li>
                      Alarmhandler: Minor bug fixes- Implemented non blocking
                      queue to improve Signal notification throughput
                    </li>
                    <li>Nginx: Fixed a waring on a script</li>
                    <li>pvServer: minor bug fix</li>
                  </ul>
                  <br />
                  V3.0.0 Monday 24 May 2021
                  <br />
                  <br />
                  Improvements and new features:
                  <br />
                  <ul>
                    <li>New web based administration</li>
                    <li>
                      Nginx now serves the static files, performs the transport
                      layer security and load balancing
                    </li>
                    <li>
                      AlarmHandler now supports Signal notifications,
                      improvements to the user interface
                    </li>
                    <li>Simplification of environment variables</li>
                    <li>
                      Improvement of security features, with move from Access
                      tokens, to short lived Access tokens with Refresh tokens
                    </li>
                    <li>
                      External Authentication via Active Directory or Google
                      Authentication
                    </li>
                    <li>
                      Removal of the requirement for the prefix for EPICS
                      process variables
                    </li>
                    <li>Improvement of the MongoDb hooks</li>
                    <li>
                      Component updates:
                      <ul>
                        <li>GraphY is now based on Plotly</li>
                        <li>GraphXY is now based on Plotly</li>
                      </ul>
                    </li>
                    <li>Package updates</li>
                    <li>Minor Bug Fixes</li>
                  </ul>
                  Breaking changes:
                  <ul>
                    <li>Removal of the old file based administration</li>
                    <li>Environment variable names have been simplified</li>
                    <li>
                      GraphY and GraphXY background now defaults to the
                      theme.palette.background.default value
                    </li>
                  </ul>
                  <br />
                  V2.2.0 Wednesday 20 January 2021
                  <br />
                  Improvements and new features:
                  <br />
                  <ul>
                    <li>AlarmHandler now supports email notifications</li>
                    <li>
                      New Components:
                      <ul>
                        <li>New ArrayContainer</li>
                        <li>New LightPanel</li>
                      </ul>
                    </li>
                    <li>Upgraded to Socket.IO 3.1.0</li>
                    <li>Upgraded pvServer to Flask-SocketIO 5.0.1</li>
                    <li>Package updates</li>
                  </ul>
                  V2.1.0 Tuesday 20 October 2020
                  <br />
                  Improvements and new features:
                  <br />
                  <ul>
                    <li>Added Epics Archiver Viewer component</li>
                    <li>Package updates</li>
                  </ul>
                  V2.0.1 Tuesday 29 September 2020
                  <br />
                  Improvements and new features:
                  <br />
                  <ul>
                    <li>Added logging to pvServer</li>
                    <li>Minor bug fix to pvServer</li>
                  </ul>
                  V2.0.0 Wednesday 5 August 2020
                  <br />
                  Improvements and new features:
                  <br />
                  <ul>
                    <li>Updated to React Hooks based components</li>
                    <li>
                      Introduction of new RasAppCore component, the logic in
                      App.js is replaced by this component
                    </li>
                    <li>
                      Created the new component Widget that is the base
                      component for all Widgets.
                    </li>
                    <li>
                      PV component substitutes old DataConnection component.
                    </li>
                    <li>
                      Dynamic connection: When useMetadata props is false some
                      fields, such as min, max, prec, alarm and units, are read
                      from external PVs or an additional connection with those
                      fields is established. By default useMetadata prop is
                      false.
                    </li>
                    <li>New Layout with new themes.</li>
                    <li>All buttons can receive and icon.</li>
                    <li>
                      All components extending MUI components can pass MUI props
                      to the MUI components through a special prop (it changes
                      based on the component).
                    </li>
                    <li>All components can have a tooltip.</li>
                    <li>
                      Widget base components now accept macros in the label and
                      units
                    </li>
                    <li>
                      Integration with MongoDb database with the addition of
                      Mongodb hooks to setup a watch, and perform an update and
                      insert a MongoDb document.
                    </li>
                    <li>Update of all demos to Hooks based components</li>
                    <li>
                      Update of all beam line components to Hooks based
                      components, with new documentation
                    </li>
                    <li>
                      Create new experimental sections to hose previews of new
                      components
                    </li>
                    <li>
                      Preview Components
                      <ul>
                        <li>
                          Preview release of the Alarm Handler server and client
                          UI
                        </li>
                        <li>Preview release of the Load/Save client UI</li>
                      </ul>
                    </li>

                    <li>
                      {" "}
                      Deprecated Components: These components will be removed in
                      future releases <br />
                      <ul>
                        <li>SimpleSlider -&gt; Use Slider</li>
                        <li>ActionFanoutButton -&gt; Use ActionButton</li>
                        <li>SwitchComponent -&gt; Use Switch</li>
                      </ul>
                    </li>
                    <li>
                      Removed Component:
                      <ul>
                        <li>GraphMultiplePVs</li>
                      </ul>
                    </li>
                    <li>
                      Breaking Changes:
                      <ul>
                        <li>
                          routes.js was renamed Routes.js and now contains extra
                          logic to enable dynamic or isolated routes based on
                          the use role.
                        </li>
                        <li>
                          If you added extra logic to the App.js you will to
                          adapt to the new RasAppCore component.
                        </li>
                      </ul>
                    </li>
                    <li>
                      Packages updated in both RAS and RAS-Example-Project-1
                    </li>
                  </ul>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid
          item
          lg={3}
          sm={6}
          xs={12}
          sx={mainGridItemSx}
        >
          <Paper
            sx={paperSx}
            elevation={paperElevation}
          >
            <Grid
              container
              direction="row"
              item
              justifyContent="center"
              spacing={4}
              alignItems="center"
            >
              <Grid
                item
                lg={12}
                sm={12}
                xs={12}
                style={{ textAlign: "center" }}
              >
                <Typography {...typographyProps}>
                  <EditIcon sx={{
                    marginRight: theme.spacing(1),
                    fontSize: "inherit",
                  }} /> Staging
                </Typography>
              </Grid>
              <Grid
                item
                lg={6}
                sm={12}
                xs={12}
              >
                <Grid
                  container
                  direction="row"
                  item
                  justifyContent="center"
                  spacing={4}
                  alignItems="center"
                >
                  <Grid
                    item
                    lg={12}
                    sm={12}
                    xs={12}
                  >
                    <Button
                      fullWidth
                      sx={buttonSx}
                      component={Link}
                      to="/Staging"
                      color="primary"
                      variant={buttonVariant}
                    >
                      {" "}
                      Staging{" "}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid
          item
          lg={3}
          sm={6}
          xs={12}
          sx={mainGridItemSx}
        >
          <Paper
            sx={paperSx}
            elevation={paperElevation}
            style={{ textAlign: "center" }}
          >
            <Grid
              container
              direction="row"
              item
              justifyContent="center"
              spacing={4}
              alignItems="center"
            >
              <Grid
                item
                lg={12}
                sm={12}
                xs={12}
              >
                <Typography {...typographyProps}>
                  {" "}
                  <VisibilityIcon sx={{
                    marginRight: theme.spacing(1),
                    fontSize: "inherit",
                  }} /> Appliances
                </Typography>
              </Grid>
              <Grid
                item
                lg={6}
                sm={12}
                xs={12}
              >
                <Grid
                  container
                  direction="row"
                  item
                  justifyContent="center"
                  spacing={4}
                  alignItems="center"
                >
                  <Grid
                    item
                    lg={12}
                    sm={12}
                    xs={12}
                  >
                    <Button
                      fullWidth
                      sx={buttonSx}
                      component={Link}
                      to="/AlarmHandlerDemo"
                      color="primary"
                      variant={buttonVariant}
                    >
                      {" "}
                      Alarm Handler Demo{" "}
                    </Button>
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    sm={12}
                    xs={12}
                  >
                    <Button
                      fullWidth
                      sx={buttonSx}
                      component={Link}
                      to="/VaultDemo"
                      color="primary"
                      variant={buttonVariant}
                    >
                      {" "}
                      Vault Demo{" "}
                    </Button>
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    sm={12}
                    xs={12}
                  >
                    <Button
                      fullWidth
                      sx={buttonSx}
                      component={Link}
                      to="/LoadSaveExample"
                      color="primary"
                      variant={buttonVariant}
                    >
                      {" "}
                      LoadSave Example{" "}
                    </Button>
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    sm={12}
                    xs={12}
                  >
                    <Button
                      fullWidth
                      sx={buttonSx}
                      component={Link}
                      to="/ArchiverDataViewerDemo"
                      color="primary"
                      variant={buttonVariant}
                    >
                      {" "}
                      Archiver Data Viewer Demo{" "}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid
          item
          lg={3}
          sm={6}
          xs={12}
          sx={mainGridItemSx}
        >
          <Paper
            sx={paperSx}
            elevation={paperElevation}
            style={{ textAlign: "center" }}
          >
            <Grid
              container
              direction="row"
              item
              justifyContent="center"
              spacing={4}
              alignItems="center"
            >
              <Grid
                item
                lg={12}
                sm={12}
                xs={12}
              >
                <Typography {...typographyProps}>
                  {" "}
                  <VisibilityIcon sx={{
                    marginRight: theme.spacing(1),
                    fontSize: "inherit",
                  }} /> Preview
                </Typography>
              </Grid>
              <Grid
                item
                lg={6}
                sm={12}
                xs={12}
              >
                <Grid
                  container
                  direction="row"
                  item
                  justifyContent="center"
                  spacing={4}
                  alignItems="center"
                >
                  <Grid
                    item
                    lg={12}
                    sm={12}
                    xs={12}
                  >
                    <Button
                      fullWidth
                      sx={buttonSx}
                      component={Link}
                      to="/AreaDetectorSimExample"
                      color="primary"
                      variant={buttonVariant}
                    >
                      {" "}
                      Area Detector Sim Demo{" "}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xs={12}
          sx={mainGridItemSx}
        >
          <Paper
            sx={paperSx}
            elevation={paperElevation}
          >
            <Grid
              container
              direction="row"
              item
              justifyContent="center"
              spacing={4}
              alignItems="center"
            >
              <Grid
                item
                lg={12}
                sm={12}
                xs={12}
                style={{ textAlign: "center" }}
              >
                <Typography {...typographyProps}>
                  <HelpIcon sx={{
                    marginRight: theme.spacing(1),
                    fontSize: "inherit",
                  }} /> Help
                </Typography>
              </Grid>
              <Grid
                item
                lg={6}
                sm={12}
                xs={12}
              >
                <Button
                  fullWidth
                  sx={buttonSx}
                  target="_blank"
                  href={styleguideURL}
                  variant={buttonVariant}
                >
                  {" "}
                  Help and Style Guide{" "}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </TraditionalLayout>
  );
};

export default MainDashboard;
