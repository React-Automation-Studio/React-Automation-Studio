import React from 'react'

import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

import uuid from 'uuid';


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

        color = props.theme.palette.alarm.minor.dark;
      }
      else if (props.alarmSeverity == 2) {
        color = props.theme.palette.alarm.major.dark;
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
 
  showValue: PropTypes.bool,
  /** Directive to show the tick values */
  showTicks: PropTypes.bool,
  /** Lock the aspect ratio, if true,`height=width/aspectRatio`, otherwise the height will grow to the height of the parent container */
  lockAspectRatio: PropTypes.bool,
  /** Width to height aspect ratio, */
  aspectRatio: PropTypes.number,
   /**
   * Directive to use the  alarm severity status to alter the fields backgorund color.
   */

  alarmSensitive: PropTypes.bool,
  /**
   * Custom PV to define the alarm severity to be used, alarmSensitive must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
   */
  alarmPv: PropTypes.string,
  /**
   * If defined, then the DataConnection and
   * the widget debugging information will be displayed.
   */
  debug: PropTypes.bool,

  /**
   * Local variable intialization value.
   * When using loc:// type PVs.
   */
  initialLocalVariableValue: PropTypes.string,
  /**
   * Custom label to be used, if  usePvLabel is not defined.
   */
  label: PropTypes.string,
  /**
  * Custom PV to define the units to be used, usePvLabel must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
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
   * Custom PV to define the maximum to be used, usePvMinMax must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
   */
  maxPv: PropTypes.string,
  /**
   * Custom minimum value to be used, if usePvMinMax is not defined.
   */
  min: PropTypes.number,
  /**
   * Custom PV to define the minimum to be used, usePvMinMax must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
   */
  minPv: PropTypes.string,
  
  /**
   * Custom precision to round the value.
   */
  prec: PropTypes.number,
  /**
   * Custom PV to define the precision to be used, usePvPrecision must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
   */
  precPv: PropTypes.string,
 

  
  /**
   * Custom units to be used, if usePvUnits is not defined.
   */

  units: PropTypes.string,
  /**
   * Custom PV to define the units to be used, usePvUnits must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
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
   * The pyEpics metadata is unfortunately static and the values used will be the intial values that pvserver receives when it connects the first time. 
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
   * If not defined it uses the custom mina nd max as defined by the min and max prop.
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
   * If defined, then the string representaion of the number can be formatted
   * using the mathjs format function
   * eg. numberFormat={{notation: 'engineering',precision: 3}}.
   * See https://mathjs.org/docs/reference/functions/format.html for more examples
   */
  numberFormat: PropTypes.object,
  /**
   * Custom on color to be used, must be derived from Material UI theme color's.
   */
  onColor: PropTypes.string,
  /**
   * Custom off color to be used, must be derived from Material UI theme color's.
   */
  offColor: PropTypes.string,
  
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string,
  
 

};

ProgressBar.defaultProps = {

  debug: false,
  alarmSensitive: false,
  min: 0,
  max: 100,
  showValue: true,
  showTicks: true,
  aspectRatio: 1.75,
  lockAspectRatio: true,
  labelPlacement: 'top'

};


export default withStyles(styles, { withTheme: true })(ProgressBar)
