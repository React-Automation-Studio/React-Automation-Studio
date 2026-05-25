import React, {ReactElement} from "react";

import Widget from "../SystemComponents/Widgets/Widget";
import { Typography } from "@mui/material";
import { create, all } from "mathjs";
import { useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { alpha } from "@mui/material/styles";
const config = {};

const math = create(all, config);

const TextUpdateMultiplePVsComponent = (props) => {
  const theme = useTheme();
  const content = (props) => {
    let pvs = props.pvsData;
    let data:ReactElement[] = [];
    let pv;
    let textFieldSx;
    for (pv in pvs) {
      if (pvs[pv].initialized) {
        if (props.alarmSensitive === true) {
          if (pvs[pv].severity === 1) {
            textFieldSx = {
              borderColor:
                theme.palette.mode === "dark" ? grey[700] : grey[300],
              borderRadius: 2,
              borderWidth: 1,
              borderStyle: "solid",
              padding: 1,
              background:
                "linear-gradient(45deg," +
                alpha(
                  theme.palette.alarm.minor.dark,
                  theme.palette.mode === "dark" ? 0.2 : 0.1
                ) +
                " 0%, " +
                theme.palette.alarm.minor.dark +
                " 100%)",
            };
          } else if (pvs[pv].severity === 2) {
            textFieldSx = {
              borderColor:
                theme.palette.mode === "dark" ? grey[700] : grey[300],
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: 2,
              padding: 1,
              background:
                "linear-gradient(45deg," +
                alpha(
                  theme.palette.alarm.major.dark,
                  theme.palette.mode === "dark" ? 0.2 : 0.1
                ) +
                " 0%, " +
                theme.palette.alarm.major.dark +
                " 100%)",
            };
          } else {
            textFieldSx = {
              borderRadius: 2,
              borderWidth: 1,
              padding: 1,
              borderStyle: "solid",
              borderColor: "rgba(0,0,0,0)",
            };
          }
        }

        let units = pvs[pv].units ? " " + pvs[pv].units : "";
        let value;
        if (typeof props.numberFormat !== "undefined") {
          value = math.format(parseFloat(pvs[pv].value), props.numberFormat);
        } else {
          value = pvs[pv].value;
        }

        data.push(
          <Typography sx={textFieldSx}>
            {pvs[pv].label + ": " + value + units}
          </Typography>
        );
      } else {
        data.push(
          <Typography>
            {props.disconnectedIcon}
            {" " + pvs[pv].pvName}
          </Typography>
        );
      }
    }
    return data;
  };

  return <React.Fragment>{content(props)}</React.Fragment>;
};

/**
 * The TextUpdateMultiplePVs Component is a wrapper on the  <b>Typography</b> container tag.
 * The component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 */
const TextUpdateMultiplePVs = ({
  debug = false,
  useMetadata = true,
  alarmSensitive = false,
  showTooltip = false,
  ...others
}: TextUpdateMultiplePVsProps) => {
  return (
    <Widget
      {...others}
      component={TextUpdateMultiplePVsComponent}
      debug={debug}
      useMetadata={useMetadata}
      alarmSensitive={alarmSensitive}
      showTooltip={showTooltip}
    />
  );
};

interface TextUpdateMultiplePVsProps {
  /**
   * Array of the process variable names.
   */
  pvs: string[];
  /**
   * Values of macros that will be substituted in the pv names.
   * eg. {'$(device)':'testIOC','$(id)':'2'}
   */
  macros?: Record<string, string>;
  /**
   * Directive to use the alarm severity status to alter the field's background color.
   */
  alarmSensitive?: boolean;
  /**
   * Custom PV to define the alarm severity to be used. alarmSensitive must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  alarmPv?: string;
  /**
   * If defined, then the DataConnection and
   * the widget debugging information will be displayed.
   */
  debug?: boolean;
  /**
   * Custom label to be used, if usePvLabel is not defined.
   */
  label?: string;
  /**
   * Custom PV to define the label to be used. usePvLabel must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  labelPv?: string;
  /**
   * Directive to fill the component's label with the value contained in the PV metadata's DESC field or the labelPv value.
   * If not defined, it uses the custom label as defined by the label prop.
   */
  usePvLabel?: boolean;
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
  useMetadata?: boolean;
  /**
   * Directive to use the units contained in the pv metadata's EGU field or unitsPv.
   * If not defined, it uses the custom units as defined by the units prop.
   */
  usePvUnits?: boolean;
  /**
   * Directive to use PV's string values.
   */
  useStringValue?: boolean;
  /**
   * If defined, then the string representation of the number can be formatted
   * using the mathjs format function
   * eg. numberFormat={{notation: 'engineering',precision: 3}}.
   * See https://mathjs.org/docs/reference/functions/format.html for more examples
   */
  numberFormat?: object;
  /**
   * Tooltip Text
   */
  tooltip?: string;
  /**
   * Directive to show the tooltip
   */
  showTooltip?: boolean;
  /**
   * Any of the MUI Tooltip props can be applied by defining them as an object.
   */
  tooltipProps?: object;
}

export default TextUpdateMultiplePVs;
