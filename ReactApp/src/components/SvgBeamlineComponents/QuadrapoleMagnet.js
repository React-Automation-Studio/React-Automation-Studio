import React,{useState} from 'react'

import Widget from "../SystemComponents/Widgets/Widget";
import { withStyles } from '@material-ui/core/styles';
import {replaceSystemMacros} from '../SystemComponents/Utils/macroReplacement';
import { v4 as uuidv4 } from 'uuid';
import  {svgHeight,svgCenterY,svgWidth,svgCenterX} from "../SystemComponents/svgConstants";
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
  const {pvName}=props;
  let value;
  if (initialized ){
    value=props.value;
  }
  else{
    value=0;
  }
  let color = '';
  console.log(props.theme)
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
          <linearGradient id={pvName + 'elipse-gradient'} gradientTransform="rotate(0)">
              <stop offset="0%" stopOpacity="0.5" stopColor='silver' />
              <stop offset="65%" stopColor={color} />
            </linearGradient>
            <defs>
              <filter id={pvName + "elipseShadow"} x="0" y="0" width="600%" height="500%">
                <feOffset result="offOut" in="SourceGraphic" dx="2.5" dy="2.5" />
                <feColorMatrix result="matrixOut" in="offOut" type="matrix"
                  values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
                <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2.5" />
                <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
              </filter>
            </defs>
            <ellipse
              fill={props.componentGradient === true ? 'url(#' + pvName + 'elipse-gradient)' : color}


              cx={xOffset + 15}
              cy={0}
              rx="10"
              ry="30"
              filter={props.componentShadow === true ? "url(#" + pvName + "elipseShadow)" : ""}
            />
            <ellipse
              fill={props.componentGradient === true ? 'url(#' + pvName + 'elipse-gradient)' : color}
              cx={xOffset}
              cy={0}
              rx="10"
              ry="30"
              filter={props.componentShadow === true ? "url(#" + pvName + "elipseShadow)" : ""}
            />

            <text className={classes.Value}
               x={typeof props.valueOffsetX !== 'undefined' ? props.valueOffsetX +7.5:7.5}
               y={typeof props.valueOffsetY !== 'undefined' ? props.valueOffsetY +57.5:57.5}
          
              textAnchor='middle'
              filter={props.textShadow === true ? "url(#" + pvName + "elipseShadow)" : ""}
            >
              {value + " " + props.units}

            </text>
            <text className={classes.Label}
              x={typeof props.labelOffsetX !== 'undefined' ? props.labelOffsetX +7.5:7.5}
              y={typeof props.labelOffsetY !== 'undefined' ? props.labelOffsetY -40:-40}
              textAnchor='middle'
              filter={props.textShadow === true ? "url(#" + pvName + "elipseShadow)" : ""}
            >
              {props.label}
            </text>
          </g>
        

      
     


      </svg>
  );
}




/**
* QuadrapoleMagnet Beam line component
 * */

const QuadrapoleMagnet = (props) => {
  const [system,setSystem]=useState(replaceSystemMacros(props.system,props.system.macros))
  console.log(system)
  return (
    <Widget svgWidget={true}  {...props} component={QuadrapoleMagnetComponent}  pv={system.readbackPv} label={system.displayName}/>

  )
}


export default withStyles(styles,{withTheme:true})(QuadrapoleMagnet)


