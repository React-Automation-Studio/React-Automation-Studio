import React from 'react'

import Widget from "../SystemComponents/Widgets/Widget";

/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
const HorizontalBeamlineComponent = (props) => {


  const handleOnClick = device => event => {
    if (typeof props.handleOnClick !== 'undefined') {
      props.handleOnClick(device);
    }

  };


  const { classes } = props;
  const { initialized } = props;
 
  const { severity } = props;
  const {pvName}=props;
  let value;
  if (initialized ){
    value=props.value;
  }
  else{
    value=0;
  }
  let background_color = '';
  if (typeof props.alarmSensitive !== 'undefined') {
    if (props.alarmSensitive == true) {
      if (severity == 1) {
        background_color = 'linear-gradient(45deg, #FFFFFF 1%, #FF8E53 99%)';
      }
      else if (severity == 2) {
        background_color = 'linear-gradient(45deg, #FFFFFF 1%, #E20101 99%)';
      }
      else background_color = 'white';
    }

  }

  let color = '';
  if (typeof props.alarmSensitive !== 'undefined') {
    if (props.alarmSensitive == true) {
      if (severity == 1) {
        color = '#FF8E53';
      }
      else if (severity == 2) {
        color = '#E20101';
      }
      else color = '#133C99';
    }

  }









  const style = {
    background: background_color,
    borderRadius: 4,

  };

  let offsetY=-2;
  return (


    
    <svg 
    x={0}
    y={props.y}
    
    width={props.width} 
    height= {props.y+10}
   >
    <g>


      
       
          <linearGradient id={pvName + 'Beamline-gradient'} gradientTransform="rotate(90)">

            <stop offset="0%" stopOpacity="0" stopColor={value == 0 ? 'grey' : 'red'} />
            <stop offset={value == 0 ? "75%" : "75%"} stopColor={value == 0 ? 'grey' : 'red'} />
          </linearGradient>
          <linearGradient id={pvName + 'Beamline-gradient2'} gradientTransform="rotate(90)">

            <stop offset="0%" stopColor={value == 0 ? 'grey' : 'red'} />
            <stop offset={value == 0 ? "75%" : "75%"} stopOpacity="0" stopColor={value == 0 ? 'grey' : 'red'} />
          </linearGradient>
          <filter id={"horizontalBeamlineShadow"} x="0" y="0" width="600%" height="500%">
            <feOffset result="offOut" in="SourceGraphic" dx="1.5" dy="1.5" />
            <feColorMatrix result="matrixOut" in="offOut" type="matrix"
              values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
            <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="1" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
          <rect
            fill={'white'}

            width={props.width}
            height="5"
            x={0}
            y={props.y+offsetY - 3} />
          <rect
            fill={'white'}

            width={props.width}
            height="5"
            x={0}
            y={props.y+offsetY + 2} />


          <rect
            fill={'url(#' + pvName + 'Beamline-gradient2)'}

            width={props.width}
            height="4"
            x={0}
            y={props.y+offsetY - 3} />
          <rect
            fill={'url(#' + pvName + 'Beamline-gradient)'}

            width={props.width}
            height="4"
            x={0}
            y={props.y+offsetY + 3} />
        </g>

      
     


      </svg>
  );
}




/**
* Horizontal Beam line component
 * */

const HorizontalBeamline = (props) => {

  return (
    <Widget svgWidget={true}  {...props} component={HorizontalBeamlineComponent} />

  )
}


export default HorizontalBeamline


