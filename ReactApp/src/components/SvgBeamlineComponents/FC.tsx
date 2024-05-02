import React, { useState } from "react";
import Button from "@mui/material/Button";
import Widget from "../SystemComponents/Widgets/Widget";
import withStyles from "@mui/styles/withStyles";
import {
  svgHeight,
  svgCenterY,
  svgWidth,
  svgCenterX,
} from "../SystemComponents/svgConstants";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/system";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TextLabel = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
}));

/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
const FCComponent = (props) => {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleYes = () => {
    let newValue = props.value == 1 ? 0 : 1;
    props.handleImmediateChange(newValue);
    setDialogOpen(false);
  };

  const handleOnClick = () => {
    let newValue = props.value == 1 ? 0 : 1;
    props.handleImmediateChange(newValue);
  };

  let yOffset = 0;
  const { classes } = props;
  const { initialized } = props;

  const { alarmSeverity } = props;
  const { value } = props;
  const { pvsData } = props;
  let isIn = true;
  let isOut = false;
  let isMoving = false;
  let inLimitPvIndex;
  let inLimitPv;
  if (props.inLimitPv) {
    inLimitPvIndex = 0;
    inLimitPv = pvsData[inLimitPvIndex];
  } else {
    inLimitPvIndex = -1;
  }

  let outLimitPvIndex;
  let outLimitPv;
  if (props.inLimitPv) {
    outLimitPvIndex = 1;
    outLimitPv = pvsData[inLimitPvIndex + outLimitPvIndex];
  } else {
    outLimitPvIndex = -1;
  }

  let isMovingPvIndex;
  let isMovingPv;
  if (props.inLimitPv) {
    isMovingPvIndex = 2;
    isMovingPv = pvsData[inLimitPvIndex + outLimitPvIndex + outLimitPvIndex];
  } else {
    outLimitPvIndex = -1;
  }

  if (initialized) {
    let inValue = props.inLimitPv ? inLimitPv.value : value;
    let inLimitValue = props.inLimitValue ? props.inLimitValue : 1;

    isIn = inValue == inLimitValue;
    let outValue = props.outLimitPv ? outLimitPv.value : value;
    let outLimitValue = props.outLimitValue ? props.outLimitValue : 1;
    isOut = outValue == outLimitValue;

    let isMovingValue = props.isMovingPv ? isMovingPv.value : value;
    let isMovingValueValid = props.isMovingValue ? props.isMovingValue : 1;

    isMoving = props.isMovingValue
      ? isMovingValue == isMovingValueValid
      : !(isIn || isOut);
    yOffset = isIn ? 0 : -35;
  } else {
    yOffset = 0;
  }

  let color = "";
  if (initialized) {
    if (props.alarmSensitive !== "undefined") {
      if (props.alarmSensitive == true) {
        if (alarmSeverity == 1) {
          color = theme.palette.alarm.minor.main;
        } else if (alarmSeverity == 2) {
          color = theme.palette.alarm.major.main;
        } else {
          if (isMoving) {
            color = "#f9e500";
          } else {
            color = theme.palette.beamLineComponent.main;
          }
        }
      }
    }
  } else {
    color = "grey";
  }

  const componentId = uuidv4();

  return (
    <svg x={props.x} y={props.y} width={svgWidth} height={svgHeight}>
      <g transform={"translate(" + svgCenterX + "," + (svgCenterY - 2.5) + ")"}>
        <g>
          <Dialog
            open={dialogOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setDialogOpen(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Warning!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to remove the FC?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)} color="primary">
                No
              </Button>
              <Button onClick={handleYes} color="primary">
                Yes
              </Button>
            </DialogActions>
          </Dialog>

          <linearGradient
            id={componentId + "FC-gradient"}
            gradientTransform="rotate(0)"
          >
            <stop offset="0%" stopColor={"silver"} />
            <stop offset="65%" stopColor={color} />
          </linearGradient>
          <defs>
            <filter
              id={componentId + "FCShadow"}
              x="0"
              y="0"
              width="600%"
              height="500%"
            >
              <feOffset result="offOut" in="SourceGraphic" dx="2" dy="2" />
              <feColorMatrix
                result="matrixOut"
                in="offOut"
                type="matrix"
                values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0"
              />
              <feGaussianBlur
                result="blurOut"
                in="matrixOut"
                stdDeviation="1"
              />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
          </defs>
          <g
            fill={
              props.componentGradient === true
                ? "url(#" + componentId + "FC-gradient)"
                : color
            }
            filter={
              props.componentShadow === true
                ? "url(#" + componentId + "FCShadow)"
                : ""
            }
            onClick={isIn ? () => setDialogOpen(true) : handleOnClick}
          >
            {yOffset !== 0 && (
              <g transform={"translate(-11,-1140)"}>
                <path d="m 3.2879796,1122.4204 c -1.2852323,-0.084 -1.5029316,-0.1209 -1.1719195,-0.2014 0.1791184,-0.043 0.5666595,-0.2704 0.7975976,-0.4662 1.6785753,-1.4252 3.0788061,-5.7048 3.6656823,-11.2038 0.195042,-1.8277 0.2763907,-3.29 0.297677,-5.351 0.036502,-3.535 -0.1932037,-6.6349 -0.7107832,-9.5922 -0.3826264,-2.1864 -0.8317616,-3.8473 -1.4551449,-5.3815 -0.7283328,-1.7928 -1.587264,-2.9311 -2.4746797,-3.2803 -0.1952031,-0.078 -0.2017864,-0.084 -0.1106923,-0.1093 0.1205222,-0.035 1.2221931,-0.1066 2.1584862,-0.1411 1.1404741,-0.043 2.8140282,0.053 4.2616262,0.2503 5.8683487,0.7943 11.1733747,3.604 14.5144387,7.6873 0.570693,0.6973 0.880617,1.1339 1.370907,1.931 1.558755,2.5337 2.323424,5.1761 2.323424,8.0286 0,2.2956 -0.525865,4.5248 -1.575169,6.6774 -0.209551,0.4298 -0.747136,1.3504 -1.095266,1.8757 -2.376667,3.5854 -6.32174,6.4653 -10.9765,8.0124 -2.645862,0.8797 -5.4712766,1.3212 -8.3253487,1.3007 -0.5555337,0 -1.2279842,-0.029 -1.4943364,-0.037 z" />
                <ellipse
                  cx="1.4687502"
                  cy="1104.5706"
                  rx="5.3938155"
                  ry="17.737566"
                />
              </g>
            )}
            {yOffset === 0 && (
              <g transform={"translate(-11,-1102.5)"}>
                <path d="m 3.2879796,1122.4204 c -1.2852323,-0.084 -1.5029316,-0.1209 -1.1719195,-0.2014 0.1791184,-0.043 0.5666595,-0.2704 0.7975976,-0.4662 1.6785753,-1.4252 3.0788061,-5.7048 3.6656823,-11.2038 0.195042,-1.8277 0.2763907,-3.29 0.297677,-5.351 0.036502,-3.535 -0.1932037,-6.6349 -0.7107832,-9.5922 -0.3826264,-2.1864 -0.8317616,-3.8473 -1.4551449,-5.3815 -0.7283328,-1.7928 -1.587264,-2.9311 -2.4746797,-3.2803 -0.1952031,-0.078 -0.2017864,-0.084 -0.1106923,-0.1093 0.1205222,-0.035 1.2221931,-0.1066 2.1584862,-0.1411 1.1404741,-0.043 2.8140282,0.053 4.2616262,0.2503 5.8683487,0.7943 11.1733747,3.604 14.5144387,7.6873 0.570693,0.6973 0.880617,1.1339 1.370907,1.931 1.558755,2.5337 2.323424,5.1761 2.323424,8.0286 0,2.2956 -0.525865,4.5248 -1.575169,6.6774 -0.209551,0.4298 -0.747136,1.3504 -1.095266,1.8757 -2.376667,3.5854 -6.32174,6.4653 -10.9765,8.0124 -2.645862,0.8797 -5.4712766,1.3212 -8.3253487,1.3007 -0.5555337,0 -1.2279842,-0.029 -1.4943364,-0.037 z" />

                <path d="m -3.4638833,1099.367 c 0.01624,-0.077 0.059926,-0.436 0.09708,-0.7969 0.1854184,-1.8013 0.5258377,-3.7387 0.9499126,-5.4062 1.0059446,-3.9555 2.51391862,-6.281 4.072973,-6.2813 0.7660926,-10e-5 1.7048315,0.7373 2.3701022,1.8616 1.1741882,1.9845 2.0908626,5.3614 2.5739082,9.4821 0.052385,0.4469 0.0955,0.918 0.095813,1.0469 l 5.669e-4,0.2344 h -5.094941 -5.094941 z" />
                <path d="m 0.8923237,1122.0693 c -1.9504533,-0.9228 -3.6344723,-5.5142 -4.280598,-11.6711 l -0.080348,-0.7656 h 5.082547 5.0825471 l -5.625e-4,0.2031 c -3.125e-4,0.1117 -0.043324,0.5688 -0.095583,1.0156 -0.7019438,6.0025 -2.2939508,10.2889 -4.1370302,11.1386 -0.1798115,0.083 -0.34319,0.1771 -0.3630636,0.2092 -0.019874,0.032 -0.210255,0.058 -0.42307,0.058 -0.3004544,0 -0.4758687,-0.042 -0.7848344,-0.1882 z" />
              </g>
            )}
          </g>
          <TextLabel
            x={0}
            y={+yOffset - 30}
            textAnchor="middle"
            filter={
              props.textShadow === true
                ? "url(#" + componentId + "FCShadow)"
                : ""
            }
          >
            {props.label}
          </TextLabel>
        </g>
      </g>
    </svg>
  );
};

/**
 * FC Beam line component
 *
 *  The label, min, max, units, pv and tooltip all accept macros that can be replaced by the values defined in the macros prop.
 */
const FC = ({
  debug = false,
  showLabel = true,
  showValue = true,
  alarmSensitive = false,
  showTooltip = false,
  labelOffsetY = 0,
  labelOffsetX = 0,
  valueOffsetY = 0,
  valueOffsetX = 0,
  componentShadow = true,
  textShadow = false,
  componentGradient = true,
  ...props
}: FCProps) => {
  let pvs = [];
  if (typeof props.isMovingPv !== "undefined") {
    pvs = [props.inLimitPv, props.outLimitPv, props.isMovingPv];
  } else {
    pvs = [props.inLimitPv, props.outLimitPv];
  }

  return (
    <Widget
      svgWidget={true}
      {...props}
      component={FCComponent}
      pvs={pvs}
      label={props.label}
      debug={debug}
      showLabel={showLabel}
      showValue={showValue}
      alarmSensitive={alarmSensitive}
      showTooltip={showTooltip}
      labelOffsetY={labelOffsetY}
      labelOffsetX={labelOffsetX}
      valueOffsetY={valueOffsetY}
      valueOffsetX={valueOffsetX}
      componentShadow={componentShadow}
      textShadow={textShadow}
      componentGradient={componentGradient}
    />
  );
};

interface FCProps {
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
   * Directive to prevent more FCs being inserted if the maximum is reached.
   */
  maxFCsReached?: boolean;

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

  /**
   * Directive to use PV's string values.
   */
  useStringValue?: boolean;

  /** Name of the pv process variable that sends the command 1 for out and 0 for in, eg. '$(device):test$(id)'*/
  pv?: string;
  /** Name of the `in` limit pv process variable, if not defined the pv value==0 is used , eg. '$(device):test$(id)'*/
  inLimitPv?: string;
  /** Value to override the default value inLimitPv value is compared too. Valid values: `1` or `0` */
  inLimitValue?: number;
  /** Name of the `out` limit pv process variable, if not defined the pv value==1 is used , eg. '$(device):test$(id)'*/
  outLimitPv?: string;
  /** Value to override the default value outLimitPv value is compared too. Valid values: `1` or `0` */
  outLimitValue?: number;
  /** Name of the `is Moving` pv process variable, if not defined it is not used , eg. '$(device):test$(id)'*/
  isMovingPv?: string;
  /** Value to override the default value isMovingPv value is compared too. Valid values: `1` or `0` */
  isMovingValue?: number;
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
  /**
   *  A System description object the passed to the callback function when the item is clicked on
   */

  system?: object;
  /**
   *  A callback function when the item is clicked on, returns the system object
   */
  handleOnClick?: Function;

  /**
   * Y Offset for the label
   */
  labelOffsetY?: number;
  /**
   * X Offset for the label
   */
  labelOffsetX?: number;
  /**
   * Y Offset for the pv value
   */
  valueOffsetY?: number;
  /**
   * X Offset for the pv value
   */
  valueOffsetX?: number;
  /**
   * enable a shadow behind the text
   */
  textShadow?: boolean;
  /**
   * use a gradient fil on the component
   */
  componentGradient?: boolean;
  /**
   * enable a shadow behind the component
   */
  componentShadow?: boolean;
  /**
   * Direct to show the label
   */
  showLabel?: boolean;
  /**
   * Direct to show the value
   */
  showValue?: boolean;
}

export default FC;
