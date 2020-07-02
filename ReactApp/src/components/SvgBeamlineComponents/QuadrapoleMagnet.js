import React from 'react'

import Widget from "../SystemComponents/Widgets/Widget";
import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors'
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


  const handleOnClick = () => {
    
    if (typeof props.handleOnClick !== 'undefined') {
      props.handleOnClick(props.macros['$(device)']);
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
  let xOffset=25;
  
  return (



    <svg onClick={handleOnClick}
    x={0}
    y={props.y}
    
    width={60} 
    height= {props.y+100}
   >
   
          <g  >
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
              cy={props.y}
              rx="10"
              ry="30"
              filter={props.componentShadow === true ? "url(#" + pvName + "elipseShadow)" : ""}
            />
            <ellipse
              fill={props.componentGradient === true ? 'url(#' + pvName + 'elipse-gradient)' : color}
              cx={xOffset}
              cy={props.y}
              rx="10"
              ry="30"
              filter={props.componentShadow === true ? "url(#" + pvName + "elipseShadow)" : ""}
            />

            <text className={classes.Value}
              x={xOffset + 7.5}
              y={props.y + 57.5}
              textAnchor='middle'
              filter={props.textShadow === true ? "url(#" + pvName + "elipseShadow)" : ""}
            >
              {value + " " + props.units}

            </text>
            <text className={classes.Label}
              x={xOffset + 7.5}
              y={props.y - 40}
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

  return (
    <Widget svgWidget={true}  {...props} component={QuadrapoleMagnetComponent} />

  )
}


export default withStyles(styles,{withTheme:true})(QuadrapoleMagnet)


