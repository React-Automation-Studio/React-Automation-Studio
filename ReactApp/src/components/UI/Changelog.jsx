import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";

const ChangelogEntry = ({ version, date, children }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        pb: 2,
        mb: 2,
        borderBottom: `1px dashed ${alpha(theme.palette.divider, 0.6)}`,
        "&:last-of-type": { mb: 0, pb: 0, borderBottom: "none" },
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ mb: 0.75, flexWrap: "wrap", rowGap: 0.5 }}
      >
        <Chip
          label={version}
          size="small"
          color="primary"
          sx={{
            fontWeight: 700,
            letterSpacing: 0.3,
            height: 22,
            "& .MuiChip-label": { px: 1.25 },
          }}
        />
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontStyle: "italic" }}
        >
          {date}
        </Typography>
      </Stack>
      <Typography
        variant="body2"
        component="div"
        sx={{
          color: "text.primary",
          "& ul": { mt: 0.25, mb: 1, pl: 2.5 },
          "& ul:last-child": { mb: 0 },
          "& li": { mb: 0.25 },
          "& li::marker": { color: theme.palette.primary.main },
          "& a": { color: "primary.main", textDecoration: "underline" },
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

const Changelog = () => (
  <>
    <ChangelogEntry version="V8.0.1" date="Tuesday 5 May 2026">
      Minor Updates:
      <ul>
        <li>Updated to the latest Node LTS 24.15.0</li>
        <li>Updated to pnpm 10.33.3</li>
        <li>Package updates to frontend modules</li>
        <li>
          Switched UV install in epicsBase Dockerfile from ADD to RUN curl to
          improve build cache stability
        </li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry version="V8.0.0" date="Wednesday 18 February 2026">
      Major Updates:
      <ul>
        <li>Updated to the latest Node LTS 24.13.1</li>
        <li>Switched to UV Python package management</li>
        <li>Updated to Python 3.13.11</li>
        <li>Updated to PyEpics 3.5.9</li>
        <li>Updated to MongoDb 8.2.3</li>
        <li>Updated docker compose organisation</li>
        <li>Package updates to frontend modules</li>
        <li>Package updates to backend modules</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry version="V7.0.0" date="Tuesday 16 September 2025">
      Major Updates:
      <ul>
        <li>Updated to MUI V7</li>
        <li>Updated to the latest Node LTS 22.19.0</li>
        <li>Package updates to frontend modules</li>
        <li>Removed legacy MUI styling</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry version="V6.1.0" date="Monday 17 February 2025">
      Minor Updates:
      <ul>
        <li>Updated to React 19</li>
        <li>Updated to the latest Node LTS 22.14.0</li>
        <li>Package updates to frontend modules</li>
        <li>Updated to MongoDB 8.0.4</li>
        <li>Migrate to Poetry 2.0.1</li>
        <li>Package updates to the backend modules</li>
        <li>Update to Nginx 1.27.4</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry version="V6.0.1" date="Monday 20 January 2025">
      Minor Updates:
      <ul>
        <li>Fix installation failure due to Poetry 2.x (quick fix)</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry version="V6.0.0" date="Monday 25 November 2024">
      Major Updates:
      <ul>
        <li>Updated to MUI 6</li>
        <li>Moved from npm to pnpm package manager</li>
        <li>Updated to MongoDB 8.0.3</li>
        <li>Speed improvements to the GraphY component</li>
        <li>Speed improvements to the Area Detector Appliance</li>
      </ul>
      Minor Updates:
      <ul>
        <li>Package updates to the frontend modules</li>
        <li>Updated to the latest Node LTS 22.11.0</li>
        <li>Updated to Python 3.12.7</li>
        <li>Updated to PyEpics 3.5.7</li>
        <li>Package updates to the backend modules</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry version="V5.2.1" date="Wednesday 17 July 2024">
      Minor Updates:
      <ul>
        <li>Package updates to the frontend modules</li>
        <li>Updated to the latest Node LTS 20.15.1</li>
        <li>Updated to Python 3.12.4</li>
        <li>Package updates to the backend modules</li>
        <li>Minor bug fix to Toggle Button component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry version="V5.2.0" date="Thursday 15 May 2024">
      Minor Updates:
      <ul>
        <li>Update to React 18.3.1</li>
        <li>
          Conversion of all base and system components to Typescript, and
          function default parameters, due to React deprecation of defaultProps
        </li>
        <li>Package updates to the frontend modules</li>
        <li>Updated to the latest Node LTS 20.13.1</li>
        <li>Updates to the documentation</li>
      </ul>
      Deprecation warning:
      <ul>
        <li>
          React 19.0.0 will deprecate the use of defaultProps, please use the
          default value in the function signature instead. See{" "}
          <a href="https://react.dev/blog/2024/04/25/react-19-upgrade-guide">
            here
          </a>{" "}
          for more information. The proptypes package will also be removed in
          the release 6.0.0 of RAS.
        </li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry version="V5.1.0" date="Thursday 18 April 2024">
      Minor Updates:
      <ul>
        <li>Package updates to backend modules</li>
        <li>Updated to Python 3.12.3</li>
        <li>Package updates to all Node modules</li>
        <li>Updated to the latest Node LTS 20.12.2</li>
        <li>Updates to the documentation</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry version="V5.0.1" date="Friday 08 March 2024">
      Minor Updates:
      <ul>
        <li>Package updates to backend modules</li>
        <li>Updated to Epics 7.0.8 and Python 3.12.1</li>
        <li>Package updates to all Node modules</li>
        <li>Updated to the latest Node LTS</li>
        <li>Minor bug fix to EPICS socketIO connections, PR#128</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry version="V5.0.0" date="Friday 02 February 2024">
      Major Updates:
      <ul>
        <li>Package updates to backend modules</li>
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
          Preview of an AreaDetector Appliance user interface with included
          simulation
        </li>
        <li>Named MongoDb volumes for easier management</li>
      </ul>
      Breaking Changes:
      <ul>
        <li>
          See the migration guide to migrate from V4.0.3 to V5.0.0:{" "}
          <a href="https://github.com/React-Automation-Studio/React-Automation-Studio/blob/master/docs/migrate-from-V4-to-V5.md">
            here
          </a>
        </li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry version="V4.0.3" date="Friday 20 October 2023">
      Minor Updates:
      <ul>
        <li>Package updates to all Node modules</li>
        <li>Updated to the latest Node LTS</li>
        <li>MUI has been updated to the latest packages</li>
        <li>Package updates to pvServer Python packages</li>
      </ul>
      Minor Bug Fixes and Updates:
      <ul>
        <li>Fixed pvServer Flask, Werkzeug dependencies.</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry version="V4.0.2" date="Thursday 13 July 2023">
      Minor Updates:
      <ul>
        <li>Package updates to all Node modules</li>
        <li>Updated to the latest Node LTS</li>
        <li>MUI has been updated to the latest packages</li>
      </ul>
      Minor Bug Fixes and Updates:
      <ul>
        <li>A few minor bug fixes to the pvServer</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry version="V4.0.1" date="Friday 24 March 2023">
      Minor Updates:
      <ul>
        <li>Package updates to all Node modules</li>
        <li>Updated to the latest Node LTS</li>
        <li>MUI has been updated to the latest packages</li>
        <li>
          Changed the contact information to GitHub Discussions:
          https://github.com/React-Automation-Studio/React-Automation-Studio/discussions
        </li>
      </ul>
      Minor Bug Fixes and Updates:
      <ul>
        <li>A few minor bug fixes to the slider and the context menu</li>
      </ul>
      Minor Breaking Changes:
      <ul>
        <li>
          Previous version of Google sign in is being deprecated (see
          https://developers.googleblog.com/2021/08/gsi-jsweb-deprecation.html).
          Solution is to replace "react-google-login" with @react-oauth/google
        </li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry version="V4.0.0" date="Wednesday 3 August 2022">
      Major Updates:
      <ul>
        <li>Update to React 18.2.0</li>
        <li>
          Update to MUI 5.9.2, see the section on breaking changes below
        </li>
        <li>
          All NodeJs packages have been updated to latest versions except
          react-router-dom which is kept at V5.3.3 for now.
        </li>
        <li>
          ReactVis was dropped and components have been updated to use Plotly.js
        </li>
      </ul>
      Minor Bug Fixes and Updates:
      <ul>
        <li>Minor formatting and theme changes due to MUI update</li>
        <li>
          General clean up of code formatting in both pvServer and React (prior
          to upgrading the MUI library)
        </li>
        <li>Addition of Poetry as Python package manager</li>
        <li>
          Addition of Black as a formatting tool for Python. A merge request
          will fail if Python is not formatted accordingly. The tool Black is
          included into the development section of Poetry.
        </li>
        <li>
          Restoration of GitHub pages build. The build excludes documents used
          with the style guide due to use of {`"{{"`} in examples.
        </li>
        <li>
          Minor documentation clean up: links to repositories / projects up to
          date.
        </li>
      </ul>
      Breaking Changes:
      <ul>
        <li>ReactVis was dropped</li>
        <li>
          Update to MUI 5.9.2 from Material UI 4. Follow the migration guide at
          https://mui.com/material-ui/migration/migration-v4/ and apply the
          preset-safe code mods
          https://mui.com/material-ui/migration/migration-v4/#preset-safe
        </li>
        <li>
          If you customized any of the themes be sure to update it in line with
          the base themes that come with the master repo
        </li>
        <li>
          Removed deprecated ActionFanoutButton — use ActionButton instead
        </li>
        <li>Removed deprecated SwitchComponent — use Switch instead</li>
        <li>Removed deprecated SimpleSlider — use Slider instead</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry version="V3.1.0" date="Wednesday 25 August 2021">
      Minor Bug Fixes and Updates:
      <ul>
        <li>
          Hot fix in NodeJs Docker files for new npm registry requirements;
          previous releases will fail after 1 October 2021
        </li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry version="V3.0.2" date="Monday 23 August 2021">
      Minor Bug Fixes and Updates:
      <ul>
        <li>pvServer: minor bug fix</li>
        <li>StyledIconIndicator: non-zero values default to onColor</li>
        <li>Docker: standardised to Python 3.8.7 in all Python images</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry version="V3.0.1" date="Monday 28 June 2021">
      Minor Bug Fixes and Updates:
      <ul>
        <li>GraphY: fixed timestamp issue</li>
        <li>
          AlarmHandler: minor bug fixes — implemented non-blocking queue to
          improve Signal notification throughput
        </li>
        <li>Nginx: fixed a warning on a script</li>
        <li>pvServer: minor bug fix</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry version="V3.0.0" date="Monday 24 May 2021">
      Improvements and new features:
      <ul>
        <li>New web-based administration</li>
        <li>
          Nginx now serves the static files, performs the transport layer
          security and load balancing
        </li>
        <li>
          AlarmHandler now supports Signal notifications, improvements to the
          user interface
        </li>
        <li>Simplification of environment variables</li>
        <li>
          Improvement of security features, with move from Access tokens to
          short-lived Access tokens with Refresh tokens
        </li>
        <li>
          External authentication via Active Directory or Google authentication
        </li>
        <li>
          Removal of the requirement for the prefix for EPICS process variables
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
        <li>Minor bug fixes</li>
      </ul>
      Breaking changes:
      <ul>
        <li>Removal of the old file-based administration</li>
        <li>Environment variable names have been simplified</li>
        <li>
          GraphY and GraphXY background now defaults to the
          theme.palette.background.default value
        </li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry version="V2.2.0" date="Wednesday 20 January 2021">
      Improvements and new features:
      <ul>
        <li>AlarmHandler now supports email notifications</li>
        <li>
          New components:
          <ul>
            <li>New ArrayContainer</li>
            <li>New LightPanel</li>
          </ul>
        </li>
        <li>Upgraded to Socket.IO 3.1.0</li>
        <li>Upgraded pvServer to Flask-SocketIO 5.0.1</li>
        <li>Package updates</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry version="V2.1.0" date="Tuesday 20 October 2020">
      Improvements and new features:
      <ul>
        <li>Added Epics Archiver Viewer component</li>
        <li>Package updates</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry version="V2.0.1" date="Tuesday 29 September 2020">
      Improvements and new features:
      <ul>
        <li>Added logging to pvServer</li>
        <li>Minor bug fix to pvServer</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry version="V2.0.0" date="Wednesday 5 August 2020">
      Improvements and new features:
      <ul>
        <li>Updated to React Hooks based components</li>
        <li>
          Introduction of new RasAppCore component; the logic in App.js is
          replaced by this component
        </li>
        <li>
          Created the new component Widget that is the base component for all
          Widgets
        </li>
        <li>PV component substitutes old DataConnection component</li>
        <li>
          Dynamic connection: when useMetadata prop is false some fields, such
          as min, max, prec, alarm and units, are read from external PVs or an
          additional connection with those fields is established. By default
          useMetadata prop is false.
        </li>
        <li>New layout with new themes</li>
        <li>All buttons can receive an icon</li>
        <li>
          All components extending MUI components can pass MUI props to the MUI
          components through a special prop (it changes based on the component)
        </li>
        <li>All components can have a tooltip</li>
        <li>
          Widget base components now accept macros in the label and units
        </li>
        <li>
          Integration with MongoDb database with the addition of MongoDb hooks
          to set up a watch, and perform an update and insert a MongoDb
          document
        </li>
        <li>Update of all demos to Hooks based components</li>
        <li>
          Update of all beam line components to Hooks based components, with
          new documentation
        </li>
        <li>
          Created new experimental sections to host previews of new components
        </li>
        <li>
          Preview components:
          <ul>
            <li>Preview release of the AlarmHandler server and client UI</li>
            <li>Preview release of the Load/Save client UI</li>
          </ul>
        </li>
        <li>
          Deprecated components (will be removed in future releases):
          <ul>
            <li>SimpleSlider — use Slider</li>
            <li>ActionFanoutButton — use ActionButton</li>
            <li>SwitchComponent — use Switch</li>
          </ul>
        </li>
        <li>
          Removed component:
          <ul>
            <li>GraphMultiplePVs</li>
          </ul>
        </li>
        <li>
          Breaking changes:
          <ul>
            <li>
              routes.js was renamed Routes.js and now contains extra logic to
              enable dynamic or isolated routes based on the user role
            </li>
            <li>
              If you added extra logic to the App.js you will need to adapt to
              the new RasAppCore component
            </li>
          </ul>
        </li>
        <li>Packages updated in both RAS and RAS-Example-Project-1</li>
      </ul>
    </ChangelogEntry>
  </>
);

export default Changelog;
