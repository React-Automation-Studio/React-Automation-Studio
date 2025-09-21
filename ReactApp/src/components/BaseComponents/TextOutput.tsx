import React from "react";
import { alpha, useTheme } from "@mui/material/styles";
import { InputAdornment, TextField } from "@mui/material";
import Widget from "../SystemComponents/Widgets/Widget";

function TextOutputComponent(props) {
  const theme = useTheme();

  // Create sx objects for styling
  const inputSx = {
    color:
      theme.palette.mode === "dark"
        ? theme.palette.grey[400]
        : theme.palette.grey[700],
  };

  const cssLabelSx = {
    "&.Mui-focused": {
      color: theme.palette.grey[500],
    },
  };

  const cssOutlinedInputSx = {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.grey[500],
    },
  };

  const textFieldSeverity0Sx = {
    width: "100%",
    borderRadius: 1,
  };

  const textFieldSeverity1Sx = {
    width: "100%",
    borderRadius: 1,
    background:
      "linear-gradient(45deg," +
      alpha(
        (theme.palette as any).alarm?.minor?.dark || theme.palette.warning.main,
        theme.palette.mode === "dark" ? 0.1 : 0.1
      ) +
      " 0%, " +
      ((theme.palette as any).alarm?.minor?.dark || theme.palette.warning.main) +
      " 100%)",
  };

  const textFieldSeverity2Sx = {
    width: "100%",
    borderRadius: 1,
    background:
      "linear-gradient(45deg," +
      alpha(
        (theme.palette as any).alarm?.major?.dark || theme.palette.error.main,
        theme.palette.mode === "dark" ? 0.2 : 0.1
      ) +
      " 0%, " +
      ((theme.palette as any).alarm?.major?.dark || theme.palette.error.main) +
      " 100%)",
  };

  let inputProps = {
    sx: {
      ...cssOutlinedInputSx,
      ...inputSx,
    },
    endAdornment: (
      <InputAdornment position="end">
        {props.units} {props.children}
      </InputAdornment>
    ),
    readOnly: true,
  };

  let inputLabelProps = {
    sx: cssLabelSx,
  };

  let textFieldSx;
  if (typeof props.alarmSensitive !== "undefined") {
    if (props.alarmSensitive === true) {
      if (props.alarmSeverity === 1) {
        textFieldSx = textFieldSeverity1Sx;
      } else if (props.alarmSeverity === 2) {
        textFieldSx = textFieldSeverity2Sx;
      } else {
        textFieldSx = textFieldSeverity0Sx;
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
      sx={textFieldSx}
      key={props.pvName}
      aria-haspopup="true"
      label={props.editMode ? props.label : !props.initialized ? props.disconnectedIcon : props.label}
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
 *  https://mui.com/demos/text-fields<br/><br/>
 *  Material-UI TextField API:
 *  https://mui.com/api/text-field
 */
const TextOutput = ({
  debug = false,
  variant = "outlined",
  margin = "none",
  alarmSensitive = false,
  showTooltip = false,
  ...others
}: TextOutputProps) => {
  return (
    <Widget
      {...others}
      component={TextOutputComponent}
      pvs={undefined}
      debug={debug}
      alarmSensitive={alarmSensitive}
      showTooltip={showTooltip}
      componentProps={{
        variant,
        margin
      }}
    />
  );
};
/**
 * Props for the TextOutput component.
 */
interface TextOutputProps {
  /**
 * If true, the TextInput will be in edit mode.
 */
  editMode?: boolean;

  /**
   * Directive to use the alarm severity status to alter the field's background color.
   */
  alarmSensitive?: boolean;
  /**
   * Custom PV to define the alarm severity to be used. alarmSensitive must be set to `true` and useMetadata to `false`, e.g. '$(device):test$(id)'.
   */
  alarmPv?: string;
  /**
   * If defined, then the DataConnection and the widget debugging information will be displayed.
   */
  debug?: boolean;
  /**
   * Local variable initialization value. When using loc:// type PVs.
   */
  initialLocalVariableValue?: string;
  /**
   * Custom label to be used if usePvLabel is not defined.
   */
  label?: string;
  /**
   * Custom PV to define the units to be used. usePvLabel must be set to `true` and useMetadata to `false`, e.g. '$(device):test$(id)'.
   */
  labelPv?: string;
  /**
   * Values of macros that will be substituted in the PV name. e.g. {{'$(device)':'testIOC','$(id)':'2'}}
   */
  macros?: object;
  /**
   * Custom precision to round the value.
   */
  prec?: number;
  /**
   * Custom PV to define the precision to be used. usePvPrecision must be set to `true` and useMetadata to `false`, e.g. '$(device):test$(id)'.
   */
  precPv?: string;
  /**
   * Custom units to be used if usePvUnits is not defined.
   */
  units?: string;
  /**
   * Custom PV to define the units to be used. usePvUnits must be set to `true` and useMetadata to `false`, e.g. '$(device):test$(id)'.
   */
  unitsPv?: string;
  /**
   * Directive to fill the component's label with the value contained in the PV metadata's DESC field or the labelPv value.
   * If not defined, it uses the custom label as defined by the label prop.
   */
  usePvLabel?: boolean;
  /**
   * When using EPICS, the RAS PV's metadata is conventionally derived from the pyEpics PV in the pvserver.
   * The pyEpics metadata is unfortunately static, and the values used will be the initial values that pvserver receives when it connects the first time.
   * This is sufficient in most cases except when the user wants to dynamically update the metaData.
   * In this case, a direct connection can be made to all the pv fields by setting useMetadata to false.
   * If any of the metadata PVs are defined, i.e. unitsPv, then the PV makes a new data connection to this alternate PV and will use the value provided by this PV as the units.
   * The same is the case for the precPV, labelPv, alarmPv, unitsPv, and minPv.
   * By setting useMetadata to false, it also enables connection to other variables as defined by different protocols.
   */
  useMetadata?: boolean;
  /**
   * Directive to round the value using the precision field of the PV metadata or precPv.
   * If not defined, it uses the custom precision as defined by the prec prop.
   */
  usePvPrecision?: boolean;
  /**
   * Directive to use the units contained in the PV metadata's EGU field or unitsPv.
   * If not defined, it uses the custom units as defined by the units prop.
   */
  usePvUnits?: boolean;
  /**
   * Directive to use PV's string values.
   */
  useStringValue?: boolean;
  /**
   * If defined, then the string representation of the number can be formatted using the mathjs format function.
   * e.g. numberFormat={{notation: 'engineering', precision: 3}}.
   * See https://mathjs.org/docs/reference/functions/format.html for more examples.
   */
  numberFormat?: object;
  /**
   * Name of the process variable, e.g. '$(device):test$(id)'.
   */
  pv?: string;
  /**
   * Object with a string and the corresponding severity value.
   * When PV value is equal to the string, set the corresponding severity in the widget's severity.
   * Example: { stringMatch: '1', severity: 2 }.
   */
  stringSeverity?: object;
  /**
   * Directive to override the alarm severity with the rules defined in the stringSeverity.
   */
  useStringSeverityMatch?: boolean;
  /**
   * Any of the MUI TextField Props can be applied by defining them as an object.
   */
  muiTextFieldProps?: object;
  /**
   * Tooltip Text.
   */
  tooltip?: string;
  /**
   * Directive to show the tooltip.
   */
  showTooltip?: boolean;
  /**
   * Any of the MUI Tooltip props can be applied by defining them as an object.
   */
  tooltipProps?: object;
  /**
   * If defined, then the timestamp of the PV will be displayed instead of its value.
   */
  displayTimeStamp?: boolean;
  /**
   * If defined, then the Metadata property of the pyEPICS PV will be displayed instead of its value as defined by the input string e.g. displayMetaData={'lower_disp_limit'}.
   * Valid options are:
   * - pvname
   * - value
   * - char_value
   * - enum_strs
   * - lower_disp_limit
   * - upper_disp_limit
   * - lower_warning_limit
   * - upper_warning_limit
   * - lower_ctrl_limit
   * - upper_ctrl_limit
   * - units
   * - precision
   * - severity
   * - write_access
   * - read_access
   * - host
   */
  displayMetaData?:
  | "pvname"
  | "value"
  | "char_value"
  | "enum_strs"
  | "lower_disp_limit"
  | "upper_disp_limit"
  | "lower_warning_limit"
  | "upper_warning_limit"
  | "lower_ctrl_limit"
  | "upper_ctrl_limit"
  | "units"
  | "precision"
  | "severity"
  | "write_access"
  | "read_access"
  | "host";
  /**
   * MUI TextField variant.
   */
  variant?: "standard" | "filled" | "outlined";
  /**
   * MUI TextField margin.
   * - none: No margin.
   * - dense: Smaller margin.
   * - normal: Default margin.
   */

  margin?: "none" | "dense" | "normal";
}

export default TextOutput;
