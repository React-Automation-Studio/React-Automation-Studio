import React from "react";
import { alpha, useTheme } from "@mui/material/styles";
import Widget from "../SystemComponents/Widgets/Widget";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const TextUpdateComponent = (props) => {
  const theme = useTheme();
  let textFieldSx;
  let label = props.label !== undefined ? props.label + ": " : "";
  let units = props.units !== undefined ? props.units + " " : "";
  let content;
  if (props.initialized) {
    if (props.alarmSensitive === true) {
      if (props.value === "NO_ALARM") {
        textFieldSx = {
          borderRadius: 2,
          padding: 1,
          borderColor: grey[50],
          background: "transparent",
          paddingRight: 5,
          paddingLeft: 5,
        };
      } else if (props.value === "MINOR_ACKED") {
        textFieldSx = {
          borderColor: theme.palette.mode === "dark" ? grey[700] : grey[300],
          borderWidth: 1,
          borderStyle: "solid",
          background: props.fadeTU
            ? "linear-gradient(45deg," +
              alpha(
                (theme.palette as any).alarm?.minorAcked?.dark || theme.palette.warning.dark,
                theme.palette.mode === "dark" ? 0.2 : 0.1
              ) +
              " 0%, " +
              ((theme.palette as any).alarm?.minorAcked?.dark || theme.palette.warning.dark) +
              " 100%)"
            : (theme.palette as any).alarm?.minorAcked?.main || theme.palette.warning.main,
          borderRadius: 2,
          padding: 1,
          paddingRight: 5,
          paddingLeft: 5,
        };
      } else if (props.value === "MINOR_ALARM") {
        textFieldSx = {
          borderColor: theme.palette.mode === "dark" ? grey[700] : grey[300],
          borderWidth: 1,
          borderStyle: "solid",
          background: props.fadeTU
            ? "linear-gradient(45deg," +
              alpha(
                (theme.palette as any).alarm?.minor?.dark || theme.palette.warning.dark,
                theme.palette.mode === "dark" ? 0.2 : 0.1
              ) +
              " 0%, " +
              ((theme.palette as any).alarm?.minor?.dark || theme.palette.warning.dark) +
              " 100%)"
            : (theme.palette as any).alarm?.minor?.main || theme.palette.warning.main,
          borderRadius: 2,
          padding: 1,
          paddingRight: 5,
          paddingLeft: 5,
        };
      } else if (
        props.value === "MAJOR_ACKED" ||
        props.value === "INVALID_ACKED" ||
        props.value === "DISCONN_ACKED"
      ) {
        textFieldSx = {
          borderColor: theme.palette.mode === "dark" ? grey[700] : grey[300],
          borderWidth: 1,
          borderStyle: "solid",
          background: props.fadeTU
            ? "linear-gradient(45deg," +
              alpha(
                (theme.palette as any).alarm?.majorAcked?.dark || theme.palette.error.dark,
                theme.palette.mode === "dark" ? 0.2 : 0.1
              ) +
              " 0%, " +
              ((theme.palette as any).alarm?.majorAcked?.dark || theme.palette.error.dark) +
              " 100%)"
            : (theme.palette as any).alarm?.majorAcked?.main || theme.palette.error.main,
          borderRadius: 2,
          padding: 1,
          paddingRight: 2,
          paddingLeft: 2,
        };
      } else if (
        props.value === "MAJOR_ALARM" ||
        props.value === "INVALID" ||
        props.value === "DISCONNECTED"
      ) {
        textFieldSx = {
          borderColor: theme.palette.mode === "dark" ? grey[700] : grey[300],
          borderWidth: 1,
          borderStyle: "solid",
          background: props.fadeTU
            ? "linear-gradient(45deg," +
              alpha(
                (theme.palette as any).alarm?.major?.dark || theme.palette.error.dark,
                theme.palette.mode === "dark" ? 0.2 : 0.1
              ) +
              " 0%, " +
              ((theme.palette as any).alarm?.major?.dark || theme.palette.error.dark) +
              " 100%)"
            : (theme.palette as any).alarm?.major?.main || theme.palette.error.main,
          borderRadius: 2,
          padding: 1,
          paddingRight: 5,
          paddingLeft: 5,
        };
      }
    }

    content = (
      <Typography variant={props.variant} sx={textFieldSx}>
        {label + props.value + " " + units}
      </Typography>
    );
  } else {
    content = props.formControlLabel;
  }
  return <div>{content}</div>;
};
const TextUpdateStatus = ({
  debug = false,
  variant = "body2",
  alarmSensitive = false,
  showTooltip = false,
  ...props
}: TextUpdateStatusProps) => {
  return (
    <Widget
      {...props}
      component={TextUpdateComponent}
      debug={debug}
      alarmSensitive={alarmSensitive}
      showTooltip={showTooltip}
      componentProps={{
        variant,
      }}
    />
  );
};

interface TextUpdateStatusProps {
  /**
   * Directive to use the  alarm severity status to alter the fields background color.
   */
  alarmSensitive?: boolean;
  /**
   * Custom PV to define the alarm severity to be used, alarmSensitive must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  alarmPv?: string;
  /**
   * If defined, then the DataConnection and
   * the widget debugging information will be displayed.
   */
  debug?: boolean;

  /**
   * Local variable initialization value.
   * When using loc:// type PVs.
   */
  initialLocalVariableValue?: string;
  /**
   * Custom label to be used, if  usePvLabel is not defined.
   */
  label?: string;
  /**
   * Custom PV to define the units to be used, usePvLabel must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  labelPv?: string;
  /**
   * Values of macros that will be substituted in the pv name.
   * eg. {{'$(device)':'testIOC','$(id)':'2'}}
   */
  macros?: object;

  /**
   * Custom precision to round the value.
   */
  prec?: number;
  /**
   * Custom PV to define the precision to be used, usePvPrecision must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  precPv?: string;

  /**
   * Custom units to be used, if usePvUnits is not defined.
   */
  units?: string;
  /**
   * Custom PV to define the units to be used, usePvUnits must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  unitsPv?: string;
  /**
   * Directive to fill the component's label with
   * the value contained in the  pv metadata's DESC field or the labelPv value.
   * If not defined it uses the custom label as defined by the label prop.
   */
  usePvLabel?: boolean;
  /**
   * When using EPICS, the RAS pv's metadata is conventionally derived from the pyEpics PV in the pvserver.
   * The pyEpics metadata is unfortunately static and the values used will be the intial values that pvserver receives when it connects the first time.
   * This is sufficient in most cases except when the user wants to dynamically update the metaData.
   * In this case a direct connection can be made to all the pv fields by setting useMetadata to false.
   * If any of the metadata pvs are defined i.e unitsPv then the PV makes a new data  connection to this alternate pv and will
   * use the value provided by this pv as the units.
   * The same is the case for the precPV, labelPv, alarmPv, unitsPv and minPv.
   * By setting useMetadata to false also enables connection to other variables as defined by different protocols.
   */
  useMetadata?: boolean;

  /**
   * Directive to round the value using the precision field of the PV metadata or precPv.
   * If not defined it uses the custom precision as defined by the prec prop.
   */
  usePvPrecision?: boolean;
  /**
   * Directive to use the units contained in the   pv metdata's EGU field or unitsPv.
   *  If not defined it uses the custom units as defined by the units prop.
   */
  usePvUnits?: boolean;
  /**
   * Directive to use PV's string values.
   */
  useStringValue?: boolean;

  /** Name of the process variable,  eg. '$(device):test$(id)'*/
  pv?: string;
  /** Array of the process variables, eg. '$(device):test$(id)'*/
  pvs?: string[];
  /**
   * Object with a string and the corresponding severity value.
   * When PV value is equal to the string, set the corresponding severity
   * in the widget's severity.
   * Example: { stringMatch: '1', severity: 2 }.
   */
  stringSeverity?: object;
  /**
   * Directive to override alarm severity with the rules defined in the stringSeverity
   */
  useStringSeverityMatch?: boolean;
  /**
   * Material UI Typography variant.
   */
  variant?: string;
  /**
   * Tooltip Text
   */
  tooltip?: string;
  /**
   * Directive to show the tooltip
   */
  showTooltip?: boolean;
  /**
   *  Any of the MUI Tooltip props can applied by defining them as an object
   */
  tooltipProps?: object;
}

export default TextUpdateStatus;
