import React from "react";
import { alpha } from "@mui/material/styles";
import withStyles from "@mui/styles/withStyles";
import { InputAdornment, TextField } from "@mui/material";
import PropTypes from "prop-types";
import Widget from "../SystemComponents/Widgets/Widget";
import makeStyles from "@mui/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  input: {
    color:
      theme.palette.mode === "dark"
        ? theme.palette.grey[400]
        : theme.palette.grey[700],
  },
  cssLabel: {
    "&$cssFocused": {
      color: theme.palette.grey[500],
    },
  },
  cssFocused: {},
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: theme.palette.grey[500],
    },
  },
  notchedOutline: {},
  bootstrapRoot: {
    "label + &": {
      marginTop: theme.spacing(1) * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
  TextFieldSeverity0: {
    width: "100%",
    borderRadius: 4,
  },
  TextFieldSeverity1: {
    width: "100%",
    borderRadius: 4,
    background:
      "linear-gradient(45deg," +
      alpha(
        theme.palette.alarm.minor.dark,
        theme.palette.mode === "dark" ? 0.1 : 0.1
      ) +
      " 0%, " +
      theme.palette.alarm.minor.dark +
      " 100%)",
  },
  TextFieldSeverity2: {
    width: "100%",
    borderRadius: 4,
    background:
      "linear-gradient(45deg," +
      alpha(
        theme.palette.alarm.major.dark,
        theme.palette.mode === "dark" ? 0.2 : 0.1
      ) +
      " 0%, " +
      theme.palette.alarm.major.dark +
      " 100%)",
  },
}));

function TextOutputComponent(props) {
  const classes = useStyles();

  let inputProps = {
    classes: {
      root: classes.cssOutlinedInput,
      focused: classes.cssFocused,
      input: classes.input,
      notchedOutline: classes.notchedOutline,
    },
    endAdornment: (
      <InputAdornment position="end">
        {props.units} {props.children}
      </InputAdornment>
    ),
    readOnly: true,
  };
  let inputLabelProps = {
    classes: {
      root: classes.cssLabel,
      focused: classes.cssFocused,
    },
  };

  let textFieldClassName;
  if (typeof props.alarmSensitive !== "undefined") {
    if (props.alarmSensitive === true) {
      if (props.alarmSeverity === 1) {
        textFieldClassName = classes.TextFieldSeverity1;
      } else if (props.alarmSeverity === 2) {
        textFieldClassName = classes.TextFieldSeverity2;
      } else {
        textFieldClassName = classes.TextFieldSeverity0;
      }
    }
  }

  let value;

  const { initialized } = props;
  if (initialized) {
    if (typeof props.displayMetaData === "undefined") {
      if (typeof props.displayTimeStamp !== "undefined") {
        let mydate = new Date(props.pvData.timestamp * 1000);
        let months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        let year = mydate.getFullYear();
        let month = months[mydate.getMonth()];
        let date = mydate.getDate();
        let hour = mydate.getHours();
        let min = mydate.getMinutes();
        let sec = mydate.getSeconds();
        let ms = mydate.getMilliseconds();

        if (min < 10) {
          min = "0" + min;
        }
        if (sec < 10) {
          sec = "0" + sec;
        }
        value =
          date +
          " " +
          month +
          " " +
          year +
          " " +
          hour +
          ":" +
          min +
          ":" +
          sec +
          ":" +
          ms;
      } else {
        value = props.value;
      }
    } else {
      value = props.pvData.metadata[props.displayMetaData];
    }
  }

  return (
    <TextField
      className={textFieldClassName}
      key={props.pvName}
      aria-haspopup="true"
      label={!props.initialized ? props.disconnectedIcon : props.label}
      fullWidth={true}
      onFocus={props.handleFocus}
      onBlur={props.handleBlur}
      value={!props.initialized ? props.pvName : value}
      margin={props.margin}
      variant={props.variant}
      InputLabelProps={inputLabelProps}
      InputProps={inputProps}
      {...props.muiTextFieldProps}
    />
  );
}

/**
 *  The TextOutput Component is a wrapper on the Material-UI contained TextField component in read-only mode.
 *  The TextField component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 *  The margins and spacing must be controlled from the parent component.<br/><br/>
 *  Material-UI TextField Demos:
 *  https://material-ui.com/demos/text-fields<br/><br/>
 *  Material-UI TextField API:
 *  https://material-ui.com/api/text-field
 */
const TextOutput = (props) => {
  return <Widget {...props} component={TextOutputComponent} pvs={undefined} />;
};

TextOutput.propTypes = {
  /**
   * Directive to use the  alarm severity status to alter the fields background color.
   */
  alarmSensitive: PropTypes.bool,
  /**
   * Custom PV to define the alarm severity to be used, alarmSensitive must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  alarmPv: PropTypes.string,
  /**
   * If defined, then the DataConnection and
   * the widget debugging information will be displayed.
   */
  debug: PropTypes.bool,

  /**
   * Local variable initialization value.
   * When using loc:// type PVs.
   */
  initialLocalVariableValue: PropTypes.string,
  /**
   * Custom label to be used, if  usePvLabel is not defined.
   */
  label: PropTypes.string,
  /**
   * Custom PV to define the units to be used, usePvLabel must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  labelPv: PropTypes.string,
  /**
   * Values of macros that will be substituted in the pv name.
   * eg. {{'$(device)':'testIOC','$(id)':'2'}}
   */
  macros: PropTypes.object,

  /**
   * Custom precision to round the value.
   */
  prec: PropTypes.number,
  /**
   * Custom PV to define the precision to be used, usePvPrecision must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  precPv: PropTypes.string,

  /**
   * Custom units to be used, if usePvUnits is not defined.
   */
  units: PropTypes.string,
  /**
   * Custom PV to define the units to be used, usePvUnits must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  unitsPv: PropTypes.string,
  /**
   * Directive to fill the component's label with
   * the value contained in the  pv metadata's DESC field or the labelPv value.
   * If not defined it uses the custom label as defined by the label prop.
   */
  usePvLabel: PropTypes.bool,
  /**
   * When using EPICS, the RAS pv's metadata is conventionally derived from the pyEpics PV in the pvserver.
   * The pyEpics metadata is unfortunately static and the values used will be the initial values that pvserver receives when it connects the first time.
   * This is sufficient in most cases except when the user wants to dynamically update the metaData.
   * In this case a direct connection can be made to all the pv fields by setting useMetadata to false.
   * If any of the metadata pvs are defined i.e unitsPv then the PV makes a new data  connection to this alternate pv and will
   * use the value provided by this pv as the units.
   * The same is the case for the precPV, labelPv, alarmPv, unitsPv and minPv.
   * By setting useMetadata to false also enables connection to other variables as defined by different protocols.
   */
  useMetadata: PropTypes.bool,

  /**
   * Directive to round the value using the precision field of the PV metadata or precPv.
   * If not defined it uses the custom precision as defined by the prec prop.
   */
  usePvPrecision: PropTypes.bool,
  /**
   * Directive to use the units contained in the   pv metdata's EGU field or unitsPv.
   *  If not defined it uses the custom units as defined by the units prop.
   */
  usePvUnits: PropTypes.bool,
  /**
   * Directive to use PV's string values.
   */
  useStringValue: PropTypes.bool,

  /**
   * If defined, then the string representation of the number can be formatted
   * using the mathjs format function
   * eg. numberFormat={{notation: 'engineering',precision: 3}}.
   * See https://mathjs.org/docs/reference/functions/format.html for more examples
   */
  numberFormat: PropTypes.object,

  /** Name of the process variable,  eg. '$(device):test$(id)'*/
  pv: PropTypes.string,

  /**
   * Object with a string and the corresponding severity value.
   * When PV value is equal to the string, set the corresponding severity
   * in the widget's severity.
   * Example: { stringMatch: '1', severity: 2 }.
   */
  stringSeverity: PropTypes.object,
  /**
   * Directive to override the alarm severity with the rules defined in the stringSeverity
   */
  useStringSeverityMatch: PropTypes.bool,
  /** Any of the MUI TextField Props can applied by defining them as an object
   *
   */
  muiTextFieldProps: PropTypes.object,
  /**
   * Tooltip Text
   */
  tooltip: PropTypes.string,
  /**
   * Directive to show the tooltip
   */
  showTooltip: PropTypes.bool,
  /**
   *  Any of the MUI Tooltip props can applied by defining them as an object
   */
  tooltipProps: PropTypes.object,
  /** If defined, then the timestamp of the PV will be displayed instead of its value*/
  displayTimeStamp: PropTypes.bool,
  /** If defined, then the Metadata property of the pyEPICS PV will be displayed instead of its value as defined by the input string eg. displayMetaData={'lower\_disp\_limit'}
   * Valid options are
   */
  displayMetaData: PropTypes.oneOf([
    "pvname",
    "value",
    "char_value",
    "enum_strs",
    "lower_disp_limit",
    "upper_disp_limit",
    "lower_warning_limit",
    "upper_warning_limit",
    "lower_ctrl_limit",
    "upper_ctrl_limit",
    "units",
    "precision",
    "severity",
    "write_access",
    "read_access",
    "host",
  ]),
};

TextOutput.defaultProps = {
  debug: false,
  variant: "outlined",
  margin: "none",
  alarmSensitive: false,
  showTooltip: false,
};

export default TextOutput;
