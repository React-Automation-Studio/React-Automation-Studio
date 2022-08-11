import React from "react";
import withStyles from '@mui/styles/withStyles';

import Widget from "../SystemComponents/Widgets/Widget";
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { create, all } from 'mathjs';

import { red, deepOrange } from '@mui/material/colors';

const config = { }

const math = create(all, config);

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  TextFieldSeverity0: {
  },
  TextFieldSeverity1: {
    borderRadius: 2,
    padding:1,
    background:deepOrange['400']
  },
  TextFieldSeverity2: {
    borderRadius: 2,
    padding:1,
    background:red['800']
  }
});


const TextUpdateMultiplePVsComponent=(props)=> {
  const {classes}=props;
  const content = (props) => {
    let pvs = props.pvsData;
    let data = [];
    let pv;
    let textFieldClassName;
    for (pv in pvs) {
      if (pvs[pv].initialized) {
        if (props.alarmSensitive === true) {
          if (pvs[pv].severity === 1) {
            textFieldClassName = classes.TextFieldSeverity1;
          }
          else if (pvs[pv].severity === 2) {
            textFieldClassName = classes.TextFieldSeverity2;
          }
          else {
            textFieldClassName = classes.TextFieldSeverity0;
          }
        }

        let units = pvs[pv].units ? " " + pvs[pv].units : "";
        let value;
        if (typeof props.numberFormat !== 'undefined') {
          value = math.format(parseFloat(pvs[pv].value), props.numberFormat)
        }
        else {
          value = pvs[pv].value
        }

        data.push(<Typography className={textFieldClassName} >{pvs[pv].label + ": " + value + units}</Typography>)
      }
      else {
        data.push(<Typography>{props.disconnectedIcon}{" " + pvs[pv].pvName}</Typography>)
      }
    }
    return data;
  }

  return <React.Fragment>{content(props)}</React.Fragment>;
}

/**
 * The TextUpdateMultiplePVs Component is a wrapper on the  <b>Typography</b> container tag.
 * The component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 */
const TextUpdateMultiplePVs =(props)=>{
  return (
    <Widget {...props} component={TextUpdateMultiplePVsComponent} pvs={undefined}/>
  )
}

TextUpdateMultiplePVs.propTypes = {
  /**
   * Directive to use the  alarm severity status to alter the fields backgorund color.
   */
  alarmSensitive: PropTypes.bool,

  /**
   * If defined, then the DataConnection and
   * the widget debugging information will be displayed.
   */
  debug: PropTypes.bool,

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
};

TextUpdateMultiplePVs.defaultProps = {
  debug: false,
  useMetadata: true,
  alarmSensitive: false,
  showTooltip: false
};

export default withStyles(styles, { withTheme: true })(TextUpdateMultiplePVs)
