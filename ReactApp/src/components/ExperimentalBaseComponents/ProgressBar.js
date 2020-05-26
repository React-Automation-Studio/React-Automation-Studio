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
import red from '@material-ui/core/colors/red';
import deepOrange from '@material-ui/core/colors/deepOrange';
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

function getTickValues(props, min, max, numberOfTicks, x0, x1, x2, y1, y2, xOffset, yOffset, value) {
  const { classes } = props;
  //this.test("test1");
  //this.handleInputValue();

  let ticks = [];

  let i = 0;
  if (typeof props.disabled === 'undefined') {
    if (props.showTicks === true) {
      for (i = 0; i < (numberOfTicks); i++) {
        const rotation = 0;
        const tickValue = i * (max - min) / (numberOfTicks - 1) + min;
        ticks.push(
          <g key={i}
          >
            <text
              className={classes.textTicks}
              x={i * (x2 - x0 + xOffset) / (numberOfTicks - 1) + xOffset}
              y={y2 + yOffset}
              textAnchor={i == 0 ? 'start' : i == (numberOfTicks - 1) ? 'end' : 'middle'}
            >
              {parseFloat(tickValue).toFixed(0) + props.units}
            </text>
          </g>

        )
      }
    }

  }
  else {

  }
  if (props.showValue === true) {
    ticks.push(
      <g key={i = i + 1}
      >
        <text
          className={classes.textTicks}
          x={xOffset}
          y={yOffset - 4}
          textAnchor={'start'}
        >
          {typeof props.disabled === 'undefined' ? parseFloat(value).toFixed(0) + props.units : ""}{}
        </text>
      </g>

    )
  }




  return ticks;
}




const ProgressBarComponent = (props) => {
  const gradientId = uuid.v4();
  const { classes } = props;
  const units = props.units;
  const value = props.value;
  const min = props.min;
  const max = props.max;
  const xOffset = 0;
  let yOffset;
  if (props.width > 16) {
    yOffset = 16;

  }
  else {
    yOffset = 0;
  }


  const radialTextOffset = 0;
  const width = props.width;
  const aspectRatio = props.aspectRatio;
  let height;
  if (props.lockAspectRatio == true) {
    height = props.width / aspectRatio;
  }
  else {
    height = props.height;
  }
  const y0 = yOffset;
  const y2 = (height - yOffset);
  const y1 = yOffset + (y2 - y0) / 2;
  const x0 = xOffset;
  const x1 = (width - xOffset * 2) / 2;
  const x2 = (width - xOffset * 2);
  const level = x2 * (value - min) / (max - min);

  const color = props.color;
  return (

    <svg width={width} height={height}>


      <linearGradient id={gradientId + 'baseBottom1'} gradientTransform="rotate(90)" >
        <stop offset="0%" stopColor={props.theme.palette.type === 'dark' ? props.theme.palette.grey['300'] : props.theme.palette.grey['200']} />
        <stop offset="100%" stopColor={typeof props.disabled === 'undefined' ? props.theme.palette.grey['200'] : 'default'} />

      </linearGradient>
      <linearGradient id={gradientId + 'baseTop1'} gradientTransform="rotate(90)" >

        <stop offset="0%" stopColor={typeof props.disabled === 'undefined' ? props.theme.palette.grey['200'] : 'default'} />
        <stop offset="100%" stopColor={props.theme.palette.type === 'dark' ? props.theme.palette.grey['300'] : props.theme.palette.grey['200']} />
      </linearGradient>

      <linearGradient id={gradientId + 'bottom1'} gradientTransform="rotate(90)" >
        <stop offset="0%" stopColor={props.theme.palette.type === 'dark' ? props.theme.palette.grey['300'] : props.theme.palette.grey['200']} />
        <stop offset="100%" stopColor={typeof props.disabled === 'undefined' ? color : 'default'} />

      </linearGradient>
      <linearGradient id={gradientId + 'top1'} gradientTransform="rotate(90)" >

        <stop offset="0%" stopColor={typeof props.disabled === 'undefined' ? color : 'default'} />
        <stop offset="100%" stopColor={props.theme.palette.type === 'dark' ? props.theme.palette.grey['300'] : props.theme.palette.grey['200']} />
      </linearGradient>


      <rect x={xOffset} y={y0} width={x2} height={y1 - y0}
        style={{
          opacity: 1,
          strokeWidth: "0",
          fill: 'url(#' + gradientId + 'baseTop1)',
        }}
      />
      <rect x={xOffset} y={y1 - 1} width={x2} height={y2 - y1}
        style={{
          opacity: 1,
          strokeWidth: "0",
          fill: 'url(#' + gradientId + 'baseBottom1)',
        }}

      />


      <rect x={xOffset} y={y0} width={level} height={y1 - y0}
        style={{
          opacity: 1,
          strokeWidth: "0",
          fill: 'url(#' + gradientId + 'top1)',
        }}
      />
      <rect x={xOffset} y={y1 - 1} width={level} height={y2 - y1}
        style={{
          opacity: 1,
          strokeWidth: "0",
          fill: 'url(#' + gradientId + 'bottom1)',
        }}

      />

      {getTickValues(props, min, max, 2, x0, x1, x2, y1, y2, xOffset, yOffset, value)}

    </svg>

  );
}

ProgressBarComponent.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
}
const FlexibleProgressBarComponent = makeVisFlexible(withStyles(styles, { withTheme: true })(ProgressBarComponent));


const ProgressBarInternalComponent = (props) => {
  const { initialized } = props;
  const { classes } = props;
  let units;
  let value;
  let min;
  let max;
  if (initialized) {
    if (props.units) {
      units = ' ' + props.units;
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
  let color = props.theme.palette.primary.main;


  if (typeof props.alarmSensitive !== 'undefined') {
    if (props.alarmSensitive == true) {
      if (props.alarmSeverity == 1) {

        color = deepOrange['400'];
      }
      else if (props.alarmSeverity == 2) {
        color = red['800'];
      }
      else {
        color = props.theme.palette.primary.main;
        //  background_color='white';
      }
    }

  }
  //console.log(value)
  return (
    <FormControlLabel
      key={props.pvName + props.initialized}
      className={classes.FormControl}
      //disabled={props.disabled}
      label={props.formControlLabel}
      labelPlacement={props.labelPlacement}
      control={
        <FlexibleProgressBarComponent

          min={min}
          max={max}
          units={units}
          value={value}
          lockAspectRatio={props.lockAspectRatio}
          aspectRatio={props.aspectRatio}
          color={color}
          showValue={props.showValue}
          showTicks={props.showTicks}
          disabled={props.initialized === true ? undefined : true}
        />
      }
    />

  )



}


const ProgressBar = (props) => {
  return (
    <Widget {...props} component={ProgressBarInternalComponent} />
  )
}


ProgressBar.propTypes = {
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros: PropTypes.object,
  /** Directive to round the value. */
  usePrecision: PropTypes.bool,
  /** Custom precision to round the value too, if not defined then the EPICS PREC field will be used, if `usePrecision` is defined. */
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
  /** Directive to show the istantaneous value */
  showValue: PropTypes.bool,
  /** Directive to show the tick values */
  showTicks: PropTypes.bool,
  /** Lock the aspect ratio, if true,`height=width/aspectRatio`, otherwise the height will grow to the height of the parent container */
  lockAspectRatio: PropTypes.bool,
  /** Width to height aspect ratio, */
  aspectRatio: PropTypes.number,
  /** local variable intialization value*/
  intialLocalVariableValue: PropTypes.string

};

ProgressBar.defaultProps = {

  debug: false,
  alarmSensitive: false,
  min: 0,
  max: 100,
  usePrecision: false,
  showValue: true,
  showTicks: true,
  aspectRatio: 1.75,
  lockAspectRatio: true,
  labelPlacement: 'top'

};

ProgressBar.contextType = AutomationStudioContext;
export default withStyles(styles, { withTheme: true })(ProgressBar)
