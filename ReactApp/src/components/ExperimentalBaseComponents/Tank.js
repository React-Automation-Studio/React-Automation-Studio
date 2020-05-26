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

function getTickValues(props, min, max, numberOfTicks, x0, y0, x1, x2, y1, y2, xOffset, yOffset, value) {
  const { classes } = props;
  let units = props.units ? props.units : "";

  //this.test("test1");
  //this.handleInputValue();
  //console.log(props)
  let ticks = [];

  let i = 0;
  if (props.initialized===true) {
    if (props.showTicks === true) {
      for (i = 0; i < (numberOfTicks); i++) {
        const rotation = 0;
        const tickValue = i * (max - min) / (numberOfTicks - 1) + min;
        ticks.push(
          <g key={i}
          >
            <text
              className={classes.textTicks}
              x={xOffset - 3}
              y={y2 - i * (y2 - y0 - yOffset) / (numberOfTicks - 1) - 3}
              textAnchor={'end'}
            >
              {parseFloat(tickValue).toFixed(0) + units}
            </text>
          </g>

        )
      }
    }

  }

  if (props.showValue === true) {
    ticks.push(
      <g key={i = i + 1}
      >
        <text
          className={classes.textTicks}
          x={x0 + (x2 - x0) / 2}
          y={yOffset - 4}
          textAnchor={'middle'}
        >
          {props.disabled == false ? parseFloat(value).toFixed(0) + units : ''}{}
        </text>
      </g>

    )
  }



  //console.log(DataConnections[0]);
  return ticks;
}




function TankComponent(props) {
  const gradientId = uuid.v4();
  const { classes } = props;
  const {initialized}=props;
  let value = initialized?props.value:50;
  let min = initialized?props.min:0;
  let max = initialized?props.max:100;


  let yOffset;
  if (props.width > 16) {
    yOffset = 16;

  }
  else {
    yOffset = 0;
  }
  let xOffset;
  if (props.width > 80) {
    xOffset = 80;

  }
  else {
    xOffset = 0;
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
  const x2 = (width - xOffset * 0);
  const x1 = (x2 - x0) / 2 + x0;

  const level = (y2 - y0) * (value - min) / (max - min);

  let color;
  if (props.initialized) {
    if (props.alarmSensitive == true) {
      if (props.alarmSeverity == 1) {

        color = deepOrange['400'];
      }
      else if (props.alarmSeverity == 2) {
        color = red['800'];
      }
      else {
        color = props.theme.palette.primary.main;

      }
    }
    else {
      color = props.theme.palette.primary.main;
    }
  }

  return (
    <FormControlLabel
      key={props.pvName}
      className={classes.FormControl}
      disabled={props.disabled}
      label={props.formControlLabel}
      labelPlacement={props.labelPlacement}
      control={
        <svg width={width} height={height}>


          <linearGradient id={gradientId + 'baseleft1'}  >
            <stop offset="0%" stopColor={props.theme.palette.type === 'dark' ? props.theme.palette.grey['300'] : props.theme.palette.grey['200']} />
            <stop offset="100%" stopColor={props.initialized===true ? props.theme.palette.grey['200'] : 'default'} />

          </linearGradient>
          <linearGradient id={gradientId + 'baseright1'}  >

            <stop offset="0%" stopColor={props.initialized===true ? props.theme.palette.grey['200'] : 'default'} />
            <stop offset="100%" stopColor={props.theme.palette.type === 'dark' ? props.theme.palette.grey['300'] : props.theme.palette.grey['200']} />
          </linearGradient>

          <linearGradient id={gradientId + 'right1'} >
            <stop offset="0%" stopColor={props.theme.palette.type === 'dark' ? props.theme.palette.grey['300'] : props.theme.palette.grey['200']} />
            <stop offset="100%" stopColor={props.initialized===true ? color : 'default'} />

          </linearGradient>
          <linearGradient id={gradientId + 'left1'}  >

            <stop offset="0%" stopColor={props.initialized===true ? color : 'default'} />
            <stop offset="100%" stopColor={props.theme.palette.type === 'dark' ? props.theme.palette.grey['300'] : props.theme.palette.grey['200']} />
          </linearGradient>

          <g >
            <rect x={x1 - 1} y={y0} width={x2 - x1} height={y2 - y0}
              style={{
                opacity: 1,
                strokeWidth: "0",
                fill: 'url(#' + gradientId + 'baseright1)',
              }}
            />
            <rect x={x0} y={y0} width={x2 - x1} height={y2 - y0}
              style={{
                opacity: 1,
                strokeWidth: "0",
                fill: 'url(#' + gradientId + 'baseleft1)',
              }}

            />


            <rect x={x0} y={y2 - level} width={x1 - x0} height={level}
              style={{
                opacity: 1,
                strokeWidth: "0",
                fill: 'url(#' + gradientId + 'left1)',
              }}
            />
            <rect x={x1 - 1} y={y2 - level} width={x2 - x1} height={level}
              style={{
                opacity: 1,
                strokeWidth: "0",
                fill: 'url(#' + gradientId + 'right1)',
              }}

            />

            {getTickValues(props, min, max, 3, x0, y0, x1, x2, y1, y2, xOffset, yOffset, value)}
          </g>
        </svg>}
    />

  );
}

TankComponent.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
}


/**
* The Tank Component is an Automation-studio component.
*/


const Tank = (props) => {
  return (
    <Widget {...props} component={makeVisFlexible(TankComponent)} />
  )
}
Tank.propTypes = {
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

Tank.defaultProps = {

  debug: false,
  alarmSensitive: false,
  min: 0,
  max: 100,
  
  usePvPrecision: false,
  showValue: true,
  aspectRatio: 1,
  lockAspectRatio: true,
  showTicks: true,
  labelPlacement:'top'

};


export default withStyles(styles, { withTheme: true })(Tank)
