import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Widget from "../SystemComponents/Widgets/Widget";
import { FormControlLabel, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";

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
  y1,
  xOffset,
  radialTextOffset
) {
  const { classes } = props;
  let ticks = [];
  let i = 0;
  for (i = 0; i < numberOfTicks; i++) {
    const rotation = (i * 180) / (numberOfTicks - 1);
    const value = (i * (max - min)) / (numberOfTicks - 1) + min;
    ticks.push(
      <g
        key={i}
        transform={"rotate(" + rotation + " " + (x0 + x1) / 2 + " " + y1 + ")"}
      >
        <TextTicks
          x={xOffset - radialTextOffset}
          y={y1}
          textAnchor="middle"
          transform={
            "rotate(" +
            270 +
            "," +
            (xOffset - radialTextOffset) +
            "," +
            y1 +
            ")"
          }
        >
          {parseFloat(value).toFixed(0)}
        </TextTicks>
      </g>
    );
  }
  return ticks;
}

interface GaugeComponentProps {
  /**
   * Represents a Gauge component.
   * @param width - The width of the gauge.
   * @param min - The minimum value of the gauge.
   * @param max - The maximum value of the gauge.
   * @param units - The units of measurement for the gauge.
   * @param value - The current value of the gauge.
   * @param ringWidth - The width of the gauge ring.
   * @param disabled - Specifies whether the gauge is disabled or not.
   */
  width: number;
  min: number;
  max: number;
  units: string;
  value: number;
  ringWidth: number;
  disabled: boolean;
}
function GaugeComponent({ ...props }: GaugeComponentProps) {
  const theme = useTheme();
  const gradientId = uuidv4();
  const units = props.units;
  const value = props.value;
  const min = props.min;
  const max = props.max;

  const ringWidth =
    typeof props.ringWidth !== "undefined"
      ? props.ringWidth
      : 0.16667 * props.width;
  const xOffset = 24;
  const radialTextOffset = 8;
  const yOffset = 20;
  const radius = (props.width - 2 * xOffset - ringWidth) / 2;
  const x0 = ringWidth / 2 + xOffset;
  const x1 = radius * 2 + x0;
  const y0 = ringWidth / 2 + radius + yOffset;
  const y1 = y0;
  const valueOffsetY = 18;
  const needleRotation = (180 * (value - min)) / (max - min);
  return (
    <svg width={props.width} height={xOffset + props.width / 2}>
      {
        <TextTicks x={(x0 + x1) / 2} y={y1 + valueOffsetY} textAnchor="middle">
          {typeof props.disabled === "undefined"
            ? value.toString() + units
            : ""}
        </TextTicks>
      }
      <linearGradient id={gradientId}>
        <stop
          offset="0%"
          stopColor={
            typeof props.disabled === "undefined"
              ? theme.palette.primary.main
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
      <path
        style={{
          opacity: 1,
          fill: "none",
          fillOpacity: 1,
          stroke: "url(#" + gradientId + ")",
          strokeWidth: ringWidth,
          strokeMiterlimit: 4,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
        d={
          "M " +
          x0 +
          " " +
          y0 +
          " A " +
          radius +
          " " +
          radius +
          " 0 0 1 " +
          x1 +
          " " +
          y1
        }
      />
      <path
        fill={theme.palette.svgComponentSecondary.main}
        transform={
          "rotate(" + needleRotation + " " + (x0 + x1) / 2 + " " + y1 + ")"
        }
        d={
          "M " +
          (xOffset - 6) +
          " " +
          (y0 - 1) +
          " " +
          (xOffset + y1 - yOffset) +
          " " +
          (y0 - 4) +
          " " +
          (xOffset + y1 - yOffset) +
          " " +
          (y0 + 4) +
          " " +
          (xOffset - 6) +
          " " +
          (y0 + 1) +
          " " +
          (xOffset - 6) +
          " " +
          (y0 - 1)
        }
      />
      {getTickValues(props, min, max, 6, x0, x1, y1, xOffset, radialTextOffset)}
    </svg>
  );
}

/**
 * The Gauge Component is an Automation-studio component.
 */
const GaugeInternalComponent = (props) => {
  const theme = useTheme();
  const ref = useRef(null);
  const [width, setWidth] = useState(null);
  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setWidth(props.width ? props.width : ref.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [ref, props.width, props.height, props.aspectRatio]);
  const { initialized } = props;
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

  return (
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
      label={props.formControlLabel}
      labelPlacement={props.labelPlacement}
      control={
        <div ref={ref} style={{ height: "100%", width: "100%" }}>
          <GaugeComponent
            theme={theme}
            width={width}
            min={min}
            max={max}
            units={units}
            value={value}
            ringWidth={props.ringWidth}
            disabled={props.initialized === true ? undefined : true}
          />
        </div>
      }
    />
  );
};

/**
 * The Gauge is an React-Automation-studio component useful for displaying levels or progress.
 */
const Gauge = ({
  debug = false,
  min = 0,
  max = 100,
  usePvPrecision = false,
  labelPlacement = "top",
  showTooltip = false,
  ...props
}: GaugeProps) => {
  return (
    <Widget
      {...props}
      component={GaugeInternalComponent}
      debug={debug}
      min={min}
      max={max}
      usePvPrecision={usePvPrecision}
      labelPlacement={labelPlacement}
      showTooltip={showTooltip}
    />
  );
};

/**
 * Props for the Gauge component.
 */
interface GaugeProps {
  /**
   * Custom gauge ring width to be used.
   */
  ringWidth?: number;
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
   * If defined, then the string representation of the number can be formatted using the mathjs format function.
   * eg. numberFormat={{notation: 'engineering',precision: 3}}.
   * See https://mathjs.org/docs/reference/functions/format.html for more examples.
   */
  numberFormat?: object;
  /**
   * Name of the process variable, eg. '$(device):test$(id)'.
   */
  pv?: string;
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
   * Label placement.
   */
  labelPlacement?: "start" | "top" | "bottom" | "end";
}

export default Gauge;
