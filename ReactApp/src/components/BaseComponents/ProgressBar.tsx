import React, { useEffect, useState, useRef,ReactElement } from "react";
import { v4 as uuidv4 } from "uuid";
import Widget from "../SystemComponents/Widgets/Widget";
import { FormControlLabel, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { create, all } from "mathjs";
const config = {};
const math = create(all, config);
/* eslint-disable eqeqeq */

const TextTicks = styled("text")(({ theme }) => ({
  fill:
    theme.palette.mode === "dark"
      ? theme.palette.grey["300"]
      : theme.palette.grey["500"],
}));
function getTickValues(
  props,
  min,
  max,
  numberOfTicks,
  x0,
  x1,
  x2,
  y1,
  y2,
  xOffset,
  yOffset,
  value
):ReactElement[] {
  const { classes } = props;
  let ticks:ReactElement[] = [];
  let i = 0;
  if (typeof props.disabled === "undefined") {
    if (props.showTicks === true) {
      for (i = 0; i < numberOfTicks; i++) {
        let tickValue = (i * (max - min)) / (numberOfTicks - 1) + min;
        if (typeof props.numberFormat !== "undefined") {
          tickValue = math.format(parseFloat(tickValue), props.numberFormat);
        }
        ticks.push(
          <g key={i}>
            <TextTicks
              x={(i * (x2 - x0 + xOffset)) / (numberOfTicks - 1) + xOffset}
              y={y2 + yOffset}
              textAnchor={
                i == 0 ? "start" : i == numberOfTicks - 1 ? "end" : "middle"
              }
            >
              {tickValue + props.units}
            </TextTicks>
          </g>
        );
      }
    }
  } else {
  }
  if (props.showValue === true) {
    ticks.push(
      <g key={(i = i + 1)}>
        <TextTicks x={xOffset} y={yOffset - 4} textAnchor={"start"}>
          {typeof props.disabled === "undefined" ? value + props.units : ""}
          {}
        </TextTicks>
      </g>
    );
  }

  return ticks;
}
interface ProgressBarComponentProps {
  width: number;
  height: number;
  units: string;
  value: number;
  min: number;
  max: number;
  lockAspectRatio: boolean;
  aspectRatio: number;
  color: string;
  showValue: boolean;
  showTicks: boolean;
  disabled: boolean;
}
const ProgressBarComponent = (props) => {
  const theme = useTheme();
  const gradientId = uuidv4();
  const value = props.value;
  const min = props.min;
  const max = props.max;
  const xOffset = 0;
  let yOffset;
  if (props.width > 16) {
    yOffset = 16;
  } else {
    yOffset = 0;
  }

  const width = props.width;
  const aspectRatio = props.aspectRatio;
  let height;
  if (props.lockAspectRatio == true) {
    height = props.width / aspectRatio;
  } else {
    height = props.height;
  }
  const y0 = yOffset;
  const y2 = height - yOffset;
  const y1 = yOffset + (y2 - y0) / 2;
  const x0 = xOffset;
  const x1 = (width - xOffset * 2) / 2;
  const x2 = width - xOffset * 2;
  const level = (x2 * (value - min)) / (max - min);

  const color = props.color;
  return (
    <svg width={width} height={height}>
      <linearGradient
        id={gradientId + "baseBottom1"}
        gradientTransform="rotate(90)"
      >
        <stop
          offset="0%"
          stopColor={
            theme.palette.mode === "dark"
              ? theme.palette.grey["300"]
              : theme.palette.grey["200"]
          }
        />
        <stop
          offset="100%"
          stopColor={
            typeof props.disabled === "undefined"
              ? theme.palette.grey["200"]
              : "default"
          }
        />
      </linearGradient>
      <linearGradient
        id={gradientId + "baseTop1"}
        gradientTransform="rotate(90)"
      >
        <stop
          offset="0%"
          stopColor={
            typeof props.disabled === "undefined"
              ? theme.palette.grey["200"]
              : "default"
          }
        />
        <stop
          offset="100%"
          stopColor={
            theme.palette.mode === "dark"
              ? theme.palette.grey["300"]
              : theme.palette.grey["200"]
          }
        />
      </linearGradient>

      <linearGradient
        id={gradientId + "bottom1"}
        gradientTransform="rotate(90)"
      >
        <stop
          offset="0%"
          stopColor={
            theme.palette.mode === "dark"
              ? theme.palette.grey["300"]
              : theme.palette.grey["200"]
          }
        />
        <stop
          offset="100%"
          stopColor={typeof props.disabled === "undefined" ? color : "default"}
        />
      </linearGradient>
      <linearGradient id={gradientId + "top1"} gradientTransform="rotate(90)">
        <stop
          offset="0%"
          stopColor={typeof props.disabled === "undefined" ? color : "default"}
        />
        <stop
          offset="100%"
          stopColor={
            theme.palette.mode === "dark"
              ? theme.palette.grey["300"]
              : theme.palette.grey["200"]
          }
        />
      </linearGradient>

      <rect
        x={xOffset}
        y={y0}
        width={x2}
        height={y1 - y0}
        style={{
          opacity: 1,
          strokeWidth: "0",
          fill: "url(#" + gradientId + "baseTop1)",
        }}
      />
      <rect
        x={xOffset}
        y={y1 - 1}
        width={x2}
        height={y2 - y1}
        style={{
          opacity: 1,
          strokeWidth: "0",
          fill: "url(#" + gradientId + "baseBottom1)",
        }}
      />

      <rect
        x={xOffset}
        y={y0}
        width={level}
        height={y1 - y0}
        style={{
          opacity: 1,
          strokeWidth: "0",
          fill: "url(#" + gradientId + "top1)",
        }}
      />
      <rect
        x={xOffset}
        y={y1 - 1}
        width={level}
        height={y2 - y1}
        style={{
          opacity: 1,
          strokeWidth: "0",
          fill: "url(#" + gradientId + "bottom1)",
        }}
      />

      {getTickValues(
        props,
        min,
        max,
        2,
        x0,
        x1,
        x2,
        y1,
        y2,
        xOffset,
        yOffset,
        value
      )}
    </svg>
  );
};

const ProgressBarInternalComponent = (props) => {
  const theme = useTheme();
  const ref = useRef<any>(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setHeight(
          props.height
            ? props.height
            : props.lockAspectRatio
              ? props.aspectRatio
                ? ref.current.offsetWidth * props.aspectRatio
                : ref.current.offsetHeight
              : ref.current.offsetHeight
        );
        setWidth(props.width ? props.width : ref.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [
    ref,
    props.width,
    props.height,
    props.aspectRatio,
    props.lockAspectRatio,
  ]);

  const { initialized } = props;
  const { classes } = props;
  let units;
  let value;
  let min;
  let max;
  if (initialized) {
    if (props.units) {
      units = " " + props.units;
    } else {
      units = "";
    }
    value = props.value;
    min = props.min;
    max = props.max;
  } else {
    units = "";
    value = 500;
    min = 0;
    max = 1000;
  }
  let color: string = theme.palette.primary.main;

  if (typeof props.alarmSensitive !== "undefined") {
    if (props.alarmSensitive == true) {
      if (props.alarmSeverity == 1) {
        color = theme.palette.alarm.minor.dark;
      } else if (props.alarmSeverity == 2) {
        color = theme.palette.alarm.major.dark;
      } else {
        color = theme.palette.primary.main;
      }
    }
  }
  return (
    <FormControlLabel
      key={props.pvName + props.initialized}
      sx={{
        width: "100%",
        height: "100%",
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: "auto",
        marginRight: "auto",
      }}
      label={props.formControlLabel}
      labelPlacement={props.labelPlacement}
      control={
        <div ref={ref} style={{ height: "100%", width: "100%" }}>
          <ProgressBarComponent
            {...props}
            min={min}
            max={max}
            width={width}
            height={height}
            units={units}
            value={value}
            lockAspectRatio={props.lockAspectRatio}
            aspectRatio={props.aspectRatio}
            color={color}
            showValue={props.showValue}
            showTicks={props.showTicks}
            disabled={props.initialized === true ? undefined : true}
          />
        </div>
      }
    />
  );
};
/**
 * The Progress Bar is an React-Automation-studio component useful fo displaying levels or progress.
 */
const ProgressBar = ({
  debug = false,
  alarmSensitive = false,
  min = 0,
  max = 100,
  showValue = true,
  showTicks = true,
  aspectRatio = 1.75,
  lockAspectRatio = true,
  labelPlacement = "top",
  showTooltip = false,

  ...others
}: ProgressBarProps) => {
  return (
    <Widget
      {...others}
      component={ProgressBarInternalComponent}
      debug={debug}
      alarmSensitive={alarmSensitive}
      min={min}
      max={max}
      showTooltip={showTooltip}
      componentProps={{showValue,showTicks,aspectRatio,lockAspectRatio,labelPlacement}}

    />
  );
};

interface ProgressBarProps {
  showValue?: boolean;
  /** Directive to show the tick values */
  showTicks?: boolean;
  /** Lock the aspect ratio, if true,`height=width/aspectRatio`, otherwise the height will grow to the height of the parent container */
  lockAspectRatio?: boolean;
  /** Width to height aspect ratio, */
  aspectRatio?: number;
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
   * Directive to fill the component's label with
   * the value contained in the  pv metadata's DESC field or the labelPv value.
   * If not defined it uses the custom label as defined by the label prop.
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
  /** Directive to control location of the label */
  labelPlacement?: "top" | "bottom" | "start" | "end";

  /**
   * Directive to use the pv metadata's HOPR and LOPR fields or the minPv and maxPv values
   * to limit the maximum and minimum values
   * that can be contained in the value.
   * If not defined it uses the custom min and max as defined by the min and max prop.
   */
  usePvMinMax?: boolean;
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
   * If defined, then the string representation of the number can be formatted
   * using the mathjs format function
   * eg. numberFormat={{notation: 'engineering',precision: 3}}.
   * See https://mathjs.org/docs/reference/functions/format.html for more examples
   */
  numberFormat?: object;
  /**
   * Custom on color to be used, must be derived from Material UI theme color's.
   */
  onColor?: string;
  /**
   * Custom off color to be used, must be derived from Material UI theme color's.
   */
  offColor?: string;

  /** Name of the process variable,  eg. '$(device):test$(id)'*/
  pv?: string;
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

export default ProgressBar;
