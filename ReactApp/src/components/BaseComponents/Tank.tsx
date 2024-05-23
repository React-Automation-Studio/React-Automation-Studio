import React, { useEffect, useState, useRef,ReactElement } from "react";
import { v4 as uuidv4 } from "uuid";
import Widget from "../SystemComponents/Widgets/Widget";
import { FormControlLabel, useTheme } from "@mui/material";
import { create, all } from "mathjs";
import { styled } from "@mui/material/styles";

const config = {};
const math = create(all, config);

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
  y0,
  x1,
  x2,
  y1,
  y2,
  xOffset,
  yOffset,
  value
):ReactElement[] {
  let units = props.units ? " " + props.units : "";

  let ticks:ReactElement[] = [];

  let i = 0;
  if (props.initialized === true) {
    if (props.showTicks === true) {
      for (i = 0; i < numberOfTicks; i++) {
        let tickValue = (i * (max - min)) / (numberOfTicks - 1) + min;
        if (typeof props.numberFormat !== "undefined") {
          tickValue = math.format(parseFloat(tickValue), props.numberFormat);
        }
        ticks.push(
          <g key={i}>
            <TextTicks
              x={xOffset - 3}
              y={y2 - (i * (y2 - y0 - yOffset)) / (numberOfTicks - 1) - 3}
              textAnchor={"end"}
            >
              {tickValue + units}
            </TextTicks>
          </g>
        );
      }
    }
  }

  if (props.showValue === true) {
    ticks.push(
      <g key={(i = i + 1)}>
        <TextTicks x={x0 + (x2 - x0) / 2} y={yOffset - 4} textAnchor={"middle"}>
          {props.disabled === false ? value + units : ""}
          {}
        </TextTicks>
      </g>
    );
  }
  return ticks;
}

interface TankComponentProps {
  height: number;
  width: number;
  aspectRatio: number;
  lockAspectRatio: boolean;
  showTicks: boolean;
  showValue: boolean;
  initialized: boolean;
  value: number;
  min: number;
  max: number;
  disabled: boolean;
  alarmSensitive: boolean;
  alarmSeverity: number;
  formControlLabel: string;
  labelPlacement: "start" | "top" | "bottom" | "end";
  pvName: string;
}

const TankComponent = (props: TankComponentProps) => {
  const ref = useRef<any>(null);
  const theme = useTheme();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
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

  const gradientId = uuidv4();
  const { initialized } = props;
  let value = initialized ? props.value : 50;

  let min = initialized ? props.min : 0;
  let max = initialized ? props.max : 100;

  let yOffset;
  if (props.width > 16) {
    yOffset = 16;
  } else {
    yOffset = props.showTicks || props.showValue ? 16 : 0;
  }
  let xOffset;
  if (props.width > 80) {
    xOffset = 80;
  } else {
    xOffset = props.showTicks ? 80 : 0;
  }

  const y0 = yOffset;
  const y2 = height - yOffset;
  const y1 = yOffset + (y2 - y0) / 2;
  const x0 = xOffset;
  const x2 = width - xOffset * 0;
  const x1 = (x2 - x0) / 2 + x0;

  const level = ((y2 - y0) * (value - min)) / (max - min);

  let color;
  if (props.initialized) {
    if (props.alarmSensitive === true) {
      if (props.alarmSeverity === 1) {
        color = theme.palette.alarm.minor.dark;
      } else if (props.alarmSeverity === 2) {
        color = theme.palette.alarm.major.dark;
      } else {
        color = theme.palette.primary.main;
      }
    } else {
      color = theme.palette.primary.main;
    }
  }

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      <FormControlLabel
        key={props.pvName}
        sx={{
          width: "100%",
          height: "100%",
          marginTop: "auto",
          marginBottom: "auto",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        disabled={props.disabled}
        label={props.formControlLabel}
        labelPlacement={props.labelPlacement}
        control={
          <svg width={width} height={height}>
            <linearGradient id={gradientId + "baseleft1"}>
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
                  props.initialized === true
                    ? theme.palette.grey["200"]
                    : "default"
                }
              />
            </linearGradient>
            <linearGradient id={gradientId + "baseright1"}>
              <stop
                offset="0%"
                stopColor={
                  props.initialized === true
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
            <linearGradient id={gradientId + "right1"}>
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
                stopColor={props.initialized === true ? color : "default"}
              />
            </linearGradient>
            <linearGradient id={gradientId + "left1"}>
              <stop
                offset="0%"
                stopColor={props.initialized === true ? color : "default"}
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
            <g>
              <rect
                x={x1 - 1}
                y={y0}
                width={x2 - x1}
                height={y2 - y0}
                style={{
                  opacity: 1,
                  strokeWidth: "0",
                  fill: "url(#" + gradientId + "baseright1)",
                }}
              />
              <rect
                x={x0}
                y={y0}
                width={x2 - x1}
                height={y2 - y0}
                style={{
                  opacity: 1,
                  strokeWidth: "0",
                  fill: "url(#" + gradientId + "baseleft1)",
                }}
              />
              <rect
                x={x0}
                y={y2 - level}
                width={x1 - x0}
                height={level}
                style={{
                  opacity: 1,
                  strokeWidth: "0",
                  fill: "url(#" + gradientId + "left1)",
                }}
              />
              <rect
                x={x1 - 1}
                y={y2 - level}
                width={x2 - x1}
                height={level}
                style={{
                  opacity: 1,
                  strokeWidth: "0",
                  fill: "url(#" + gradientId + "right1)",
                }}
              />
              {getTickValues(
                props,
                min,
                max,
                3,
                x0,
                y0,
                x1,
                x2,
                y1,
                y2,
                xOffset,
                yOffset,
                value
              )}
            </g>
          </svg>
        }
      />
    </div>
  );
};

/**
 * The Tank Component is an React-Automation-studio component useful fo displaying levels.
 */
const Tank = ({
  debug = false,
  alarmSensitive = false,
  min = 0,
  max = 100,

  usePvPrecision = false,
  showValue = false,
  aspectRatio = 1,
  lockAspectRatio = true,
  showTicks = false,
  labelPlacement = "top",
  showTooltip = false,
  ...others
}: TankProps) => {
  return (
    <Widget
      {...others}
      component={TankComponent}
      debug={debug}
      alarmSensitive={alarmSensitive}
      min={min}
      max={max}
      usePvPrecision={usePvPrecision}
      labelPlacement={labelPlacement}
      showTooltip={showTooltip}
      componentProps={{
        showValue,
        showTicks,
        aspectRatio,
        lockAspectRatio,
      
      }}
    />
  );
};

interface TankProps {
  /** Directive to show the  value */
  showValue?: boolean;
  /** Directive to show the tick values */
  showTicks?: boolean;
  /** Lock the aspect ratio, if true,`height=width/aspectRatio`, otherwise the height will grow to the height of the parent container */
  lockAspectRatio?: boolean;
  /** Width to height aspect ratio, */
  aspectRatio?: number;
  /**
   * Directive to use the  alarm severity status to alter the fields backgorund color.
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
   * Directive to use the pv metadata's HOPR and LOPR fields or the minPv and maxPv values
   * to limit the maximum and minimum values
   * that can be contained in the value.
   * If not defined it uses the custom mina nd max as defined by the min and max prop.
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
   * If defined, then the string representaion of the number can be formatted
   * using the mathjs format function
   * eg. numberFormat={{notation: 'engineering',precision: 3}}.
   * See https://mathjs.org/docs/reference/functions/format.html for more examples
   */
  numberFormat?: object;

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
  /** label placement*/
  labelPlacement?: "start" | "top" | "bottom" | "end";
}

export default Tank;
