import React,{useState} from 'react'

import Widget from "../SystemComponents/Widgets/Widget";
import { withStyles } from '@material-ui/core/styles';
import {replaceSystemMacros} from '../SystemComponents/Utils/macroReplacement';
import { v4 as uuidv4 } from 'uuid';
const styles = theme => ({


  textBMLabel: {
    fill: theme.palette.text.primary

  },
  textBMValue: {
    fill: theme.palette.text.primary

  },
  textBMLabelDisconneted: {
    fill: 'dimgrey'

  },
});
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
const BendingMagnetComponent = (props) => {


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
  let color_side = '';
  if (initialized ){
    if (props.alarmSensitive !== 'undefined') {
      if (props.alarmSensitive == true) {
        if (alarmSeverity == 1) {
          color_side = props.theme.palette.alarm.minor.main;

        }
        else if (alarmSeverity == 2) {
          color_side = props.theme.palette.alarm.major.main;

        }
        else {
          color_side =props.theme.palette.beamLineComponent.main;

        }

      }

    }

  }
  else{
    color_side = 'grey';
  }

  return (



    <svg 
    x={0}
    y={props.y}
    
    width={60} 
    height= {props.y+100}
   >
   
          <g transform={'translate(' + 25 + ',' + props.y + ')'}  onClick={handleOnClick(props.system)}>
            <linearGradient id={pvName + 'elipse-gradient'} gradientTransform="rotate(0)">
              <stop offset="0%" stopOpacity="30" stopColor={'silver'} />
              <stop offset="75%" stopColor={color_side} />
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
            <g transform="translate(-10,-1086)"
              fill={props.componentGradient === true ? 'url(#' + pvName + 'elipse-gradient)' : color_side}
              style={{
                'strokeWidth': '0.3',
                'stroke': 'black'
              }}
            >
              <g filter={props.componentShadow === true ? "url(#" + pvName + "elipseShadow)" : ""}>
                <path
                  id="path8478"
                  d="M 24.149959,1064.5524 5.135178,1049.0529 h 10.000004 l 19.014781,15.4995 z"
                />
                <path
                  id="path8480"
                  d="m 0.04018281,1106.8979 1.41294219,-16.1439 10.578125,-0.016 1.208307,1.0171 0.837821,-9.512 -3.126797,-2.5487 -0.106831,1.0124 h -8.5625 l 2.853928,-31.6543 19.014781,15.4995 -5.094995,57.845 z"
                />
                <path
                  id="path8484"
                  d="m 12.03125,1090.738 1.34375,0.032 -0.135443,0.9854 -1.208307,-1.0171"
                />
                <path
                  id="path8486"
                  d="m 10.950581,1079.6944 1.268169,0.9815 -1.375,0.031 z" />

                <path
                  id="path8488"
                  d="m 24.149959,1064.5524 h 10.000004 l -5.094995,57.845 -10.000004,-4e-4 z"
                />

              </g>
            </g>


            <text className={classes.textBMValue}
              x={7.5}
              y={57.5}
              textAnchor='middle'
              filter={props.textShadow === true ? "url(#" + pvName + "elipseShadow)" : ""}
            >
              {value + " " + props.units}

            </text>
            <text className={classes.textBMLabel}
              x={7.5}
              y={-40}
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
* BendingMagnet Beam line component
 * */

const BendingMagnet = (props) => {
  const [system,setSystem]=useState(replaceSystemMacros(props.system,props.system.macros))
  return (
    <Widget svgWidget={true}  {...props} component={BendingMagnetComponent}  pv={system.readbackPv} label={system.displayName} />

  )
}


export default withStyles(styles,{withTheme:true})(BendingMagnet)


