import React from "react";
import { alpha } from "@mui/material/styles";
import { InputAdornment, TextField } from "@mui/material";
import Widget from "../SystemComponents/Widgets/Widget";

const TextInputComponent = (props) => {
  const handleChange = (event) => {
    let value = event.target.value;
    props.handleChange(value);
  };
  const handleCatchReturn = (event) => {
    if (event.key === "Enter") {
      props.handleCommitChange();
    }
  };
  const { initialized } = props;
  const { value } = props;

  let inputProps;

  if (initialized) {
    inputProps = {
      endAdornment: (
        <InputAdornment position="end">
          {props.units} {props.children}
        </InputAdornment>
      ),
      readOnly: props.readOnly,
    };
  } else {
    inputProps = { readOnly: true };
  }

  return (
    <TextField
      sx={(theme) => {
        let alarmSxProp = {
          width: "100%",
          borderRadius: 1.5,
        };

        if (typeof props.alarmSensitive !== "undefined") {
          if (props.alarmSensitive === true) {
            if (props.alarmSeverity === 1) {
              alarmSxProp = {
                ...alarmSxProp,
                background:
                  "linear-gradient(45deg," +
                  alpha(
                    theme.palette.alarm.minor.dark,
                    theme.palette.mode === "dark" ? 0.1 : 0.1
                  ) +
                  " 0%, " +
                  theme.palette.alarm.minor.dark +
                  " 100%)",
              };
            } else if (props.alarmSeverity === 2) {
              alarmSxProp = {
                ...alarmSxProp,
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
            }
          }
        }
        return alarmSxProp;
      }}
      key={props.pvName}
      aria-haspopup="true"
      value={!props.initialized ? props.pvName : value}
      onKeyDown={handleCatchReturn}
      onFocus={props.handleFocus}
      onBlur={props.handleBlur}
      onChange={handleChange}
      label={!props.initialized ? props.disconnectedIcon : props.label}
      fullWidth={true}
      margin={props.margin}
      variant={props.variant}
      disabled={props.disabled}
      InputProps={inputProps}
      {...props.muiTextFieldProps}
    />
  );
};

/**
 * Props for the TextInput component.
 */
interface TextInputProps {
  /** Material-UI TextField variant */
  variant?: string;
  /** Material-UI TextField margin */
  margin?: string;
  /**
   * Directive to use the alarm severity status to alter the field's background color.
   */
  alarmSensitive?: boolean;
  /**
   * Custom PV to define the alarm severity to be used, alarmSensitive must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
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
   * Custom label to be used, if usePvLabel is not defined.
   */
  label?: string;
  /**
   * Custom PV to define the units to be used, usePvLabel must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  labelPv?: string;
  /**
   * Values of macros that will be substituted in the pv name. eg. {{'$(device)':'testIOC','$(id)':'2'}}
   */
  macros?: object;
  /**
   * Custom maximum to be used, if usePvMinMax is not defined.
   */
  max?: number;
  /**
   * Custom PV to define the maximum to be used, usePvMinMax must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  maxPv?: string;
  /**
   * Custom minimum value to be used, if usePvMinMax is not defined.
   */
  min?: number;
  /**
   * Custom PV to define the minimum to be used, usePvMinMax must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  minPv?: string;
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
   * Directive to fill the component's label with the value contained in the pv metadata's DESC field or the labelPv value.
   * If not defined, it uses the custom label as defined by the label prop.
   */
  usePvLabel?: boolean;
  /**
   * When using EPICS, the RAS pv's metadata is conventionally derived from the pyEpics PV in the pvserver.
   * The pyEpics metadata is unfortunately static and the values used will be the initial values that pvserver receives when it connects the first time.
   * This is sufficient in most cases except when the user wants to dynamically update the metaData.
   * In this case, a direct connection can be made to all the pv fields by setting useMetadata to false.
   * If any of the metadata pvs are defined i.e unitsPv then the PV makes a new data connection to this alternate pv and will
   * use the value provided by this pv as the units.
   * The same is the case for the precPV, labelPv, alarmPv, unitsPv, and minPv.
   * By setting useMetadata to false also enables connection to other variables as defined by different protocols.
   */
  useMetadata?: boolean;
  /**
   * Directive to use the pv metadata's HOPR and LOPR fields or the minPv and maxPv values
   * to limit the maximum and minimum values that can be contained in the value.
   * If not defined, it uses the custom min and max as defined by the min and max prop.
   */
  usePvMinMax?: boolean;
  /**
   * Directive to round the value using the precision field of the PV metadata or precPv.
   * If not defined, it uses the custom precision as defined by the prec prop.
   */
  usePvPrecision?: boolean;
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
   * If defined, then the string representation of the number can be formatted using the mathjs format function.
   * eg. numberFormat={{notation: 'engineering',precision: 3}}.
   * See https://mathjs.org/docs/reference/functions/format.html for more examples.
   */
  numberFormat?: object;
  /** Name of the process variable, eg. '$(device):test$(id)' */
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
  /** Any of the MUI TextField Props can be applied by defining them as an object. */
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
}

/**
 * The TextInput Component is a wrapper on the Material-UI contained TextField component.
 * The TextField component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI TextField Demos:
 * https://mui.com/demos/text-fields<br/><br/>
 * Material-UI TextField API:
 * https://mui.com/api/text-field
 */
const TextInput = ({
  debug = false,
  variant = "outlined",
  margin = "none",
  alarmSensitive = false,
  showTooltip = false,
  ...props
}: TextInputProps) => {
  return <Widget {...props} component={TextInputComponent} pvs={undefined} />;
};

export default TextInput;
