import React from 'react'

import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';


import { v4 as uuidv4 } from 'uuid';
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
  const gradientId = uuidv4();
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
 /**
  * Custom gauge ring withd to be used
  */
  ringWidth: PropTypes.number,
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
  
  
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string,
 
  /**
   * Tooltip Text
   */
  tooltip:PropTypes.string,
  /**
   * Directive to show the tooltip
   */
  showTooltip:PropTypes.bool,
  /**
   *  Any of the MUI Tooltip props can applied by defining them as an object
   */

  tooltipProps:PropTypes.object,


};

Gauge.defaultProps = {
  debug: false,
  
  min: 0,
  max: 100,
  usePvPrecision: false,
  labelPlacement:'top',
  showTooltip:false
};

export default withStyles(styles, { withTheme: true })(Gauge)
