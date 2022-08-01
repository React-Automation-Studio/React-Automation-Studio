import React from 'react'

import Widget from "../SystemComponents/Widgets/Widget";
import withStyles from '@mui/styles/withStyles';
import { v4 as uuidv4 } from 'uuid';
import  {svgHeight,svgCenterY,svgWidth,svgCenterX} from "../SystemComponents/svgConstants";
import PropTypes from 'prop-types';

const styles = theme => ({
  Label: {
    fill: theme.palette.text.primary
  },
  Value: {
    fill: theme.palette.text.primary
  },
  textBMLabelDisconneted: {
    fill: 'dimgrey'
  },
});

/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
const QuadrapoleMagnetComponent = (props) => {
  const handleOnClick = device => event => {
    if (typeof props.handleOnClick !== 'undefined') {
      props.handleOnClick(device);
    }
  };

  const { classes } = props;
  const { initialized } = props;
 
  const { alarmSeverity } = props;

  let value;
  if (initialized ){
    value=props.value;
  }
  else{
    value=0;
  }

  let color = '';
  
  if (initialized ){
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
  else{
    color = 'grey';
  }
  let xOffset=0;
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
          <stop offset="0%" stopOpacity="0.5" stopColor='silver' />
          <stop offset="65%" stopColor={color} />
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
        <ellipse
          fill={props.componentGradient === true ? 'url(#' + componentId + 'elipse-gradient)' : color}
          cx={xOffset + 15}
          cy={0}
          rx="10"
          ry="30"
          filter={props.componentShadow === true ? "url(#" + componentId + "elipseShadow)" : ""}
        />
        <ellipse
          fill={props.componentGradient === true ? 'url(#' + componentId + 'elipse-gradient)' : color}
          cx={xOffset}
          cy={0}
          rx="10"
          ry="30"
          filter={props.componentShadow === true ? "url(#" + componentId + "elipseShadow)" : ""}
        />

        <text className={classes.Value}
            x={typeof props.valueOffsetX !== 'undefined' ? props.valueOffsetX +7.5:7.5}
            y={typeof props.valueOffsetY !== 'undefined' ? props.valueOffsetY +57.5:57.5}
      
          textAnchor='middle'
          filter={props.textShadow === true ? "url(#" + componentId + "elipseShadow)" : ""}
        >
          {value + " " + props.units}
        </text>
        <text className={classes.Label}
          x={typeof props.labelOffsetX !== 'undefined' ? props.labelOffsetX +7.5:7.5}
          y={typeof props.labelOffsetY !== 'undefined' ? props.labelOffsetY -40:-40}
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
 * Quadrapole Magnet Beam line component
 * 
 * The label, min, max, units, pv and tooltip all accept macros that can be replaced by the values defined in the macros prop.  
 */
const QuadrapoleMagnet = (props) => {
  return (
    <Widget svgWidget={true}  {...props} component={QuadrapoleMagnetComponent}  pv={props.pv} />
  )
}

QuadrapoleMagnet.propTypes = {
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

QuadrapoleMagnet.defaultProps = {
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

export default withStyles(styles,{withTheme:true})(QuadrapoleMagnet)
