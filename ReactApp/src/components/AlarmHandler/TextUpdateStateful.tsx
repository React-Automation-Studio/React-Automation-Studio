import React, { useEffect, useState, useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import Widget from "../SystemComponents/Widgets/Widget";
import { Typography } from "@mui/material";

const TextUpdateComponent = (props) => {
  const theme = useTheme();
  const [displayValue, setDisplayValue] = useState("");

  const { initialized, value, units, alarmSeverity } = props;

  useEffect(() => {
    if (initialized) {
      units
        ? setDisplayValue(`${value} ${units}`)
        : setDisplayValue(`${value}`);
    }
  }, [initialized, value, units]);

  const dispSx = useMemo(() => {
    if (!initialized) {
      return {
        background: "transparent",
        borderRadius: 2,
        padding: 1,
        borderStyle: "solid",
        borderWidth: "thin",
        borderColor:
          theme.palette.mode === "dark"
            ? theme.palette.grey[500]
            : theme.palette.grey[400],
        color:
          theme.palette.mode === "dark"
            ? theme.palette.grey[500]
            : theme.palette.grey[400],
      };
    } else if (alarmSeverity === 1) {
      return {
        background: "transparent",
        borderRadius: 2,
        padding: 1,
        borderStyle: "solid",
        borderWidth: "thin",
        borderColor: (theme.palette as any).alarm?.minor?.main || theme.palette.warning.main,
      };
    } else if (alarmSeverity === 2) {
      return {
        background: "transparent",
        borderRadius: 2,
        padding: 1,
        borderStyle: "solid",
        borderWidth: "thin",
        borderColor: (theme.palette as any).alarm?.major?.main || theme.palette.error.main,
      };
    } else {
      return {
        background: "transparent",
        borderRadius: 2,
        padding: 1,
        borderStyle: "solid",
        borderWidth: "thin",
        borderColor: "rgba(0,0,0,0)",
      };
    }
  }, [initialized, alarmSeverity, theme, theme.palette.mode]);


  const content =
    displayValue !== "" ? (
      <Typography sx={dispSx}>{displayValue}</Typography>
    ) : (
      <Typography sx={{
        background: "transparent",
        borderRadius: 2,
        padding: 1,
        borderStyle: "solid",
        borderWidth: "thin",
        borderColor:
          theme.palette.mode === "dark"
            ? theme.palette.grey[500]
            : theme.palette.grey[400],
        color:
          theme.palette.mode === "dark"
            ? theme.palette.grey[500]
            : theme.palette.grey[400],
      }}>-</Typography>
    );

  return content;
};

const TextUpdateStateful = ({
  debug = false,
  variant = "body2",
  alarmSensitive = false,
  showTooltip = false,
  ...props
}: TextUpdateStatefulProps) => {
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

interface TextUpdateStatefulProps {
  /**
   * Directive to use the alarm severity status to alter the fields background color.
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
   * Custom label to be used, if usePvLabel is not defined.
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
   * the value contained in the pv metadata's DESC field or the labelPv value.
   * If not defined it uses the custom label as defined by the label prop.
   */
  usePvLabel?: boolean;
  /**
   * When using EPICS, the RAS pv's metadata is conventionally derived from the pyEpics PV in the pvserver.
   * The pyEpics metadata is unfortunately static and the values used will be the intial values that pvserver receives when it connects the first time.
   * This is sufficient in most cases except when the user wants to dynamically update the metaData.
   * In this case a direct connection can be made to all the pv fields by setting useMetadata to false.
   * If any of the metadata pvs are defined i.e unitsPv then the PV makes a new data connection to this alternate pv and will
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
   * Directive to use the units contained in the pv metdata's EGU field or unitsPv.
   * If not defined it uses the custom units as defined by the units prop.
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


export default TextUpdateStateful;
