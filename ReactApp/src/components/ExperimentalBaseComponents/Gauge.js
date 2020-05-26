import React from 'react'
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import DataConnection from '../SystemComponents/DataConnection';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';
//import classNames from 'classnames';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import ContextMenu from '../SystemComponents/ContextMenu';
import uuid from 'uuid';
import { LanDisconnect } from 'mdi-material-ui/';
import Widget from "../SystemComponents/Widgets/Widget";
import { FormControlLabel } from "@material-ui/core";
import {

  makeVisFlexible,

} from 'react-vis';



const styles = theme => ({
  textTicks: {
    fill: theme.palette.type === 'dark' ? theme.palette.grey['300'] : theme.palette.grey['500']

  },
  textValue: {
    fill: theme.palette.type === 'dark' ? theme.palette.grey['300'] : theme.palette.grey['500']

  },

  root: {

    display: 'flex',
    flexWrap: 'wrap',


  },
  FormControl: {
    width: "100%",
    height: "100%",
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
  },
  
});

function getTickValues(props, min, max, numberOfTicks, x0, x1, y1, xOffset, radialTextOffset) {
  const { classes } = props;
  //this.test("test1");
  //this.handleInputValue();

  let ticks = [];

  let i = 0;


  for (i = 0; i < (numberOfTicks); i++) {
    const rotation = i * 180 / (numberOfTicks - 1);
    const value = i * (max - min) / (numberOfTicks - 1) + min;
    ticks.push(
      <g key={i}
        transform={'rotate(' + rotation + " " + (x0 + x1) / 2 + ' ' + y1 + ')'}
      >
        <text
          className={classes.textTicks}
          x={xOffset - radialTextOffset}
          y={y1}
          textAnchor='middle'
          transform={'rotate(' + 270 + ',' + (xOffset - radialTextOffset) + ',' + (y1) + ')'}
        >
          {parseFloat(value).toFixed(0)}
        </text>
      </g>

    )
  }





  //console.log(DataConnections[0]);
  return ticks;
}




function GaugeComponent(props) {
  const gradientId = uuid.v4();
  const { classes } = props;
  const units = props.units;
  const value = props.value;
  const min = props.min;
  const max = props.max;

  const ringWidth = typeof props.ringWidth !== 'undefined' ? props.ringWidth : 0.16667 * props.width;
  const xOffset = 24;
  const radialTextOffset = 8;
  const yOffset = 20;
  const radius = (props.width - 2 * xOffset - ringWidth) / 2;
  const x0 = ringWidth / 2 + xOffset;
  const x1 = radius * 2 + x0;
  const y0 = ringWidth / 2 + radius + yOffset;
  const y1 = y0;
  const valueOffsetY = 18;
  const needleRotation = 180 * (value - min) / (max - min);
  //console.log('props.width',props.width)
  //onsole.log('props.height',props.height)
  //console.log(props)
  return (
    <svg width={props.width} height={xOffset + props.width / 2}>

      {<text
        x={(x0 + x1) / 2}
        y={y1 + valueOffsetY}
        textAnchor='middle'
        className={classes.textValue}
      >
        {typeof props.disabled === 'undefined' ? value.toString() + units : ""}

      </text>}


      <linearGradient id={gradientId} >

        <stop offset="0%" stopColor={typeof props.disabled === 'undefined' ? props.theme.palette.primary.main : 'default'} />
        <stop offset="100%" stopColor={props.theme.palette.type === 'dark' ? props.theme.palette.grey['300'] : props.theme.palette.grey['200']} />
      </linearGradient>

      <path
        style={{
          opacity: 1,
          fill: 'none',
          fillOpacity: 1,
          stroke: 'url(#' + gradientId + ')',
          strokeWidth: ringWidth,
          strokeMiterlimit: 4,
          strokeDasharray: 'none',
          strokeOpacity: 1
        }}



        d={"M " + x0 + " " + y0 + " A " + radius + " " + radius + " 0 0 1 " + x1 + " " + y1} />



      <path
        fill={props.theme.palette.secondary.main}



        transform={'rotate(' + needleRotation + " " + (x0 + x1) / 2 + ' ' + y1 + ')'}

        d={"M " + (xOffset - 6) + " " + (y0 - 1) + " " + (xOffset + y1 - yOffset) + " " + (y0 - 4) + " " + (xOffset + y1 - yOffset) + " " + (y0 + 4) + " " + (xOffset - 6) + " " + (y0 + 1)
          + " " + (xOffset - 6) + " " + (y0 - 1)} />




      {getTickValues(props, min, max, 6, x0, x1, y1, xOffset, radialTextOffset)}
    </svg>

  );
}

GaugeComponent.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
}
const FlexibleGaugeComponent = makeVisFlexible(withStyles(styles, { withTheme: true })(GaugeComponent));

/**
* The Gauge Component is an Automation-studio component.
*/

const GaugeInternalComponent = (props) => {
  const { initialized } = props;
  const {classes}=props;
  let units;
  let value;
  let min;
  let max;
  if (initialized) {
    if (props.units) {
      units = ' '+props.units;
    }
    else {
      units = '';
    }
    value = props.value;
    min = props.min;
    max = props.max;
  } else {
    units = '';
    value = 500;
    min = 0;
    max = 1000;
  }

  return (
    <FormControlLabel
      key={props.pvName}
      className={classes.FormControl}
      //disabled={props.disabled}
      label={props.formControlLabel}
      labelPlacement={props.labelPlacement}
      control={
        <FlexibleGaugeComponent
          min={min}
          max={max}
          units={units}
          value={value}
          ringWidth={props.ringWidth}
          //disabled={props.disabled}
          disabled={props.initialized === true ? undefined : true}
        />
      }
    />


  )

}


const Gauge = (props) => {
  return (
    <Widget {...props} component={GaugeInternalComponent} />
  )
}

Gauge.propTypes = {
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros: PropTypes.object,
  /** Directive to round the value. */
  usePvPrecision: PropTypes.bool,
  /** Custom precision to round the value too, if not defined then the EPICS PREC field will be used, if `usePvPrecision` is defined. */
  prec: PropTypes.number,
  /** Directive to use the HOPR and LOPR EPICS fields to limit the maximum and minimum values that can be contained in the value. */
  usePvMinMax: PropTypes.bool,
  /** Directive to use the EPICS alarm severity status to alter the fields backgorund color  */
  alarmSensitive: PropTypes.bool,
  /** Custom minimum to be used, if `usePvMinMax` is not defined. */
  min: PropTypes.number,
  /** Custom maximum to be used, if `usePvMinMax` is not defined. */
  max: PropTypes.number,
  /** If defined, then the DataConnection debugging information will be displayed*/
  debug: PropTypes.bool,
  /** Custom units to be used, if `usePvUnits` is not defined. */
  units: PropTypes.string,
  /** Directive to fill the label with the value contained in the  EPICS pv's DESC field. */
  usePvLabel: PropTypes.bool,
  /** Custom gauge ring withd to be used */
  ringWidth: PropTypes.number,
  /** local variable intialization value*/
  intialLocalVariableValue: PropTypes.string

};

Gauge.defaultProps = {
  debug: false,
  alarmSensitive: false,
  min: 0,
  max: 100,
  usePvPrecision: false,
  labelPlacement:'top',
};

export default withStyles(styles, { withTheme: true })(Gauge)
