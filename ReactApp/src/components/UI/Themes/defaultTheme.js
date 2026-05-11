/* eslint-disable no-unused-vars */
import {
  indigo,
  teal,
  lightBlue,
  blueGrey,
  pink,
  red,
  blue,
  green,
  lightGreen,
  cyan,
  deepOrange,
  deepPurple,
  orange,
  amber,
  lime,
  grey,
} from "@mui/material/colors";
import { alpha } from "@mui/material/styles";

const defaultPalette = () => {
  const mode = "dark";
  const primary = { main: "#82C3F8" };
  const secondary = { main: "#C678DD" };
  const defaultColor = { main: grey[600] };
  const ok = { main: "#98C379" };
  const error = pink;
  const major = red;
  const minor = deepOrange;
  const background = {
    default: "#21252B",
    paper: "#282C34",
  };
  const alarm = {
    major: {
      light: major["400"],
      main: major["600"],
      dark: major["800"],
    },
    minor: {
      light: minor["100"],
      main: minor["200"],
      dark: minor["300"],
    },
  };

  alarm.majorAcked = {
    light: alpha(alarm.major.light, 0.4),
    main: alpha(alarm.major.main, 0.4),
    dark: alpha(alarm.major.dark, 0.4),
  };
  alarm.minorAcked = {
    light: alpha(alarm.minor.light, 0.4),
    main: alpha(alarm.minor.main, 0.4),
    dark: alpha(alarm.minor.dark, 0.4),
  };
  const beamLineComponent = { main: indigo[500] };
  const svgComponentPrimary = { main: primary["500"] };
  const svgComponentSecondary = { main: pink["500"] };
  const contrastThreshold = 3;
  const tonalOffset = 0.2;
  const paperElevation = 2;
  const reactVis = {
    ".rv-xy-plot__axis__tick__line": { stroke: grey[500] },
    ".rv-xy-plot__axis__tick__text": { fill: grey[500], fontSize: "11px" },
    ".rv-xy-plot__axis__title text": { fill: grey[500], fontSize: "11px" },
    ".rv-xy-plot__grid-lines__line": { stroke: cyan[700] },
    ".rv-discrete-color-legend-item": {
      color: "#FFFFFF",
      borderRadius: "1px",
      padding: "9px 10px",
    },
    ".rv-xy-plot__axis__line": {
      fill: "none",
      strokeWidth: "2px",
      stroke: grey[500],
    },
    lineColors: ["#82C3F8", "#98C379", "#E5C07B", "#C678DD", "#E06C75"],
  };
  return {
    mode: mode,
    primary: primary,
    secondary: secondary,
    default: defaultColor,
    background: background,
    error: error,
    ok: ok,
    major: major,
    minor: minor,
    alarm: alarm,
    contrastThreshold: contrastThreshold,
    tonalOffset: tonalOffset,
    paperElevation: paperElevation,
    reactVis: reactVis,
    beamLineComponent: beamLineComponent,
    svgComponentPrimary: svgComponentPrimary,
    svgComponentSecondary: svgComponentSecondary,
  };
};

const defaultTheme = {
  palette: { ...defaultPalette() },
};

export default defaultTheme;
