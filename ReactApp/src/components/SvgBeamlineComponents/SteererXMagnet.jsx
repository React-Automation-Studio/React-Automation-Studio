import React from 'react'

import Widget from "../SystemComponents/Widgets/Widget";
import withStyles from '@mui/styles/withStyles';
import  {svgHeight,svgCenterY,svgWidth,svgCenterX} from "../SystemComponents/svgConstants";
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const styles = theme => ({
  Label: {
    fill: theme.palette.text.primary
  },
  Value: {
    fill: theme.palette.text.primary
  },
});

/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
const SteererXMagnetComponent = (props) => {
  const handleOnClick = device => event => {
    if (typeof props.handleOnClick !== 'undefined') {
      props.handleOnClick(device);
    }
  };

  const { classes } = props;
  const { initialized } = props;

  const { alarmSeverity } = props;

  let value;
  if (initialized) {
    value = props.value;
  }
  else {
    value = 0;
  }

  let color = '';
  if (initialized) {
    if (props.alarmSensitive !== 'undefined') {
      if (props.alarmSensitive == true) {
        if (alarmSeverity == 1) {
          color = props.theme.palette.alarm.minor.main;
        }
        else if (alarmSeverity == 2) {
          color = props.theme.palette.alarm.major.main;
        }
        else {
          color = props.theme.palette.beamLineComponent.main;
        }
      }
    }
  }
  else {
    color = 'grey';
  }

  const componentId = uuidv4();
  return (
    <svg
      x={props.x}
      y={props.y}

      width={svgWidth}
      height={svgHeight}
    >
      <g transform={'translate(' + svgCenterX + ',' + (svgCenterY) + ')'}
        onClick={handleOnClick(props.system)}
      >
        <linearGradient id={componentId + 'elipse-gradient'} gradientTransform="rotate(0)">
          <stop offset="0%" stopOpacity="30" stopColor={'silver'} />
          <stop offset="75%" stopColor={color} />
        </linearGradient>
        <defs>
          <filter id={componentId + "elipseShadow"} x="0" y="0" width="600%" height="500%">
            <feOffset result="offOut" in="SourceGraphic" dx="2.5" dy="2.5" />
            <feColorMatrix result="matrixOut" in="offOut" type="matrix"
              values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
            <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2.5" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
        </defs>
        <g filter={props.componentShadow === true ? "url(#" + componentId + "elipseShadow)" : ""}
        >
          <g>
            <g transform="translate(-10,-1097)"
              fill={props.componentGradient === true ? 'url(#' + componentId + 'elipse-gradient)' : color}
              style={{
                'strokeWidth': '0.3',
                'stroke': 'black'
              }}
            >
              <path
                d="m 6.4368595,1102.6622 3.5963725,0.049 -0.2955921,2.6603 z"
                id="innerbottom"
              />
              <path
                d="m 3.7272638,1073.1029 12.6612032,10.3458 -3.429518,38.5135 -12.81960547,-10.3114 1.02612037,-9.0872 8.8924011,0.049 0.886777,-9.4836 -0.665083,-0.5665 -8.3258489,-0.049 z"
                id="side" />
              <path
                d="m 6.7324518,1089.7546 3.3993112,2.7589 -3.5963727,0.049 0.2955922,-2.6111"
                id="innertop"
              />
              <path
                d="m 16.339201,1083.3994 5.048858,0.5453 -3.396665,38.5633 -5.009394,-0.4183 z"
                id="rigthfront"
              />
              <path
                d="m 3.6926037,1072.983 5.0189326,0.6287 12.5383527,10.2401 -4.910688,-0.4524 z"
                id="top"
              />
            </g>
            <g transform="translate(-10,-1097)"
              fill={'#b87333'}
              style={{ 'strokeWidth': '0.3', 'stroke': 'orange' }}
            >
              <path
                id="path9504-2"
                d="m 13.978012,1108.8976 c -1.261676,-0.2824 -2.797214,-1.6683 -4.4811427,-3.6527 v 0" />

              <path
                id="path9504-7-1"
                d="m 14.113735,1107.3567 c -1.261716,-0.2823 -2.797214,-1.6683 -4.4811427,-3.6527 v 0"
              />
              <path
                id="path9504-5-6"
                d="m 14.24945,1105.8159 c -1.261708,-0.2824 -2.797206,-1.6684 -4.4811432,-3.6527 v 0"
              />
              <path
                id="path9504-7-9-4"
                d="m 14.385141,1104.2749 c -1.261676,-0.2823 -2.797174,-1.6683 -4.4811111,-3.6526 v 0"
              />
              <path
                id="path9504-0-4"
                d="m 14.520864,1102.734 c -1.261684,-0.2823 -2.79715,-1.6682 -4.481143,-3.6527 v 0"
              /> 
              <path
                id="path9504-7-5-3"
                d="m 14.656579,1101.1932 c -1.261676,-0.2824 -2.797142,-1.6683 -4.481143,-3.6527 v 0"
              />
              <path
                id="path9504-6-2"
                d="m 14.792302,1099.6523 c -1.261676,-0.2824 -2.797142,-1.6683 -4.481143,-3.6527 v 0"
              />
              <path
                id="path9504-7-91-7"
                d="m 14.928025,1098.1114 c -1.261676,-0.2824 -2.797151,-1.6682 -4.481143,-3.6527 v 0"
              />
              <path
                id="path9504-0-4-0-8"
                d="m 19.997828,1098.1255 c -1.850938,0.1788 -2.983041,0.2052 -5.135825,0 v 0"
              />
              <path
                id="path9504-0-4-0-8-4"
                d="m 19.880923,1099.6494 c -1.850938,0.1974 -2.983041,0.2265 -5.135825,0 v 0"
              />
              <path
                id="path9504-0-4-0-8-5"
                d="m 19.699703,1101.221 c -1.845863,0.1819 -2.974862,0.2088 -5.121742,0 v 0"
              />
              <path
                id="path9504-0-4-0-8-2"
                d="m 19.546426,1102.7243 c -1.848374,0.2345 -2.97891,0.2691 -5.128711,0 v 0"
              />
              <path
                id="path9504-0-4-0-8-3"
                d="m 19.358384,1104.2616 c -1.850938,0.2233 -2.983041,0.2563 -5.135825,0 v 0"
              />
              <path
                id="path9504-0-4-0-8-35"
                d="m 19.382817,1105.8159 c -1.850052,0.2272 -2.981613,0.2607 -5.133367,0 v 0"
              />
              <path
                id="path9504-0-4-0-8-35-3"
                d="m 19.223154,1107.2827 c -1.853798,0.2132 -2.987651,0.2446 -5.143761,0 v 0"
              />
              <path
                id="path9504-0-4-0-8-35-9"
                d="m 19.075285,1108.9595 c -1.853745,0.2113 -2.987565,0.2425 -5.143614,0 v 0"
              />
              
              <path
                d="m 2.7316557,1092.9946 c -0.2156088,-0.2387 -0.6311204,-0.686 -0.8521282,-0.9464 v 0"
                id="path9504-0-4-1"
              />

              <path
                d="m 4.4126497,1092.9301 c -0.3135113,-0.2605 -0.6014918,-0.4885 -0.9323105,-0.819 -0.5592372,-0.5586 -1.3069859,-1.3559 -1.4651117,-1.6037 l -0.1393435,-0.1742"
                id="path9504-7-5-3-4"
              />

              <path
                d="m 6.6321275,1092.6192 c -1.2617,-0.2824 -2.7972,-1.6684 -4.4812,-3.6527 l -0.1393435,-0.1742"
                id="path9504-6-2-6"
              />
              <path
                d="m 6.7678275,1091.0783 c -1.2617,-0.2824 -2.7971,-1.6683 -4.4811,-3.6527 l -0.1393435,-0.2439"
                id="path9504-7-91-7-3"
              />
            </g>
          </g>
        </g>

        <text className={classes.Value}
          x={typeof props.valueOffsetX !== 'undefined' ? props.valueOffsetX : 0}
          y={typeof props.valueOffsetY !== 'undefined' ? props.valueOffsetY + 57.5 : 57.5}
          textAnchor='middle'
          filter={props.textShadow === true ? "url(#" + componentId + "elipseShadow)" : ""}
        >
          {value + " " + props.units}
        </text>
        <text className={classes.Label}
          x={typeof props.labelOffsetX !== 'undefined' ? props.labelOffsetX : 0}
          y={typeof props.labelOffsetY !== 'undefined' ? props.labelOffsetY - 30 : -30}
          textAnchor='middle'
          filter={props.textShadow === true ? "url(#" + componentId + "elipseShadow)" : ""}
        >
          {props.label}
        </text>
      </g>
    </svg>
  );
}

/**
 * SteererXMagnet Beam line component
 *
 * The label, min, max, units, pv and tooltip all accept macros that can be replaced by the values defined in the macros prop.   
 */
const SteererXMagnet = (props) => {
  return (
    <Widget svgWidget={true}  {...props} component={SteererXMagnetComponent} pv={props.pv} label={props.label} />
  )
}

SteererXMagnet.propTypes = {
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
   * Custom maximum to be used, if usePvMinMax is not defined.
   */
  max: PropTypes.number,
  /**
   * Custom PV to define the maximum to be used, usePvMinMax must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  maxPv: PropTypes.string,
  /**
   * Custom minimum value to be used, if usePvMinMax is not defined.
   */
  min: PropTypes.number,
  /**
   * Custom PV to define the minimum to be used, usePvMinMax must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  minPv: PropTypes.string,

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
   * Directive to use the pv metadata's HOPR and LOPR fields or the minPv and maxPv values
   * to limit the maximum and minimum values
   * that can be contained in the value.
   * If not defined it uses the custom min and max as defined by the min and max prop.
   */
  usePvMinMax: PropTypes.bool,
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

  /** Name of the pv process variable, eg. '$(device):test$(id)'*/
  pv: PropTypes.string,

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
  /**
   *  A System description object the passed to the callback function when the item is clicked on
   */
  system: PropTypes.object,
  /**
   *  A callback function when the item is clicked on, returns the system object
   */
  handleOnClick: PropTypes.func,
  /**
   * Y Offset for the label
   */
  labelOffsetY: PropTypes.number,
  /**
   * X Offset for the label
   */
  labelOffsetX: PropTypes.number,
  /**
  * Y Offset for the pv value
  */
  valueOffsetY: PropTypes.number,
  /**
   * X Offset for the pv value
   */
  valueOffsetX: PropTypes.number,
  /**
   * enable a shadow behind the text
   */
  textShadow: PropTypes.bool,
  /**
   * use a gradient fil on the component
   */
  componentGradient: PropTypes.bool,
  /**
   * enable a shadow behind the component
   */
  componentShadow: PropTypes.bool,
  /**
   * Direct to show the label
   */
  showLabel: PropTypes.bool,
  /**
   * Direct to show the value
   */
  showValue: PropTypes.bool,
};

SteererXMagnet.defaultProps = {
  debug: false,
  showLabel:true,
  showValue:true,
  alarmSensitive: false,
  showTooltip: false,
  labelOffsetY: 0,
  labelOffsetX: 0,
  valueOffsetY: 0,
  valueOffsetX: 0,
  componentShadow: true,
  textShadow: false,
  componentGradient: true,
};

export default withStyles(styles, { withTheme: true })(SteererXMagnet)
