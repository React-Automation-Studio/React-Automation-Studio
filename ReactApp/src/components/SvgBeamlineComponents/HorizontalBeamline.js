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
  const { value } = props;
  const { severity } = props;
  const {pvName}=props;

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

  console.log("hello")
  return (



    <svg 
    x={props.x}
    y={props.y}
    
    width="100%" height="100%" 
    //viewBox="0 0 1411 400" 
    //preserveAspectRatio="xMidYMid meet"
    >
    <g>


{/* <text className={classes.textFC}
                        x={10}
                        y={10}
                        textAnchor='middle'
                        
                        

                      >
                        {props.label}
                      </text> */}
      {initialized === true &&
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
            x={props.x}
            y={props.y - 3} />
          <rect
            fill={'white'}

            width={props.width}
            height="5"
            x={props.x}
            y={props.y + 2} />


          <rect
            fill={'url(#' + pvName + 'Beamline-gradient2)'}

            width={props.width}
            height="4"
            x={props.x}
            y={props.y - 3} />
          <rect
            fill={'url(#' + pvName + 'Beamline-gradient)'}

            width={props.width}
            height="4"
            x={props.x}
            y={props.y + 3} />
        </g>

      }
      {/* {(initialized === false || initialized === 'undefined') &&
          <g>
            <linearGradient id={pvName + 'Beamline-gradient'} gradientTransform="rotate(90)">

              <stop offset="0%" stopOpacity="0" stopColor='grey' />
              <stop offset={"75%"} stopColor={'grey'} />
            </linearGradient>
            <linearGradient id={pvName + 'Beamline-gradient2'} gradientTransform="rotate(90)">

              <stop offset="0%" stopColor={'grey'} />
              <stop offset={"75%"} stopOpacity="0" stopColor={'grey'} />
            </linearGradient>
            <filter id={"horizontalBeamlineShadow"} x="0" y="0" width="600%" height="500%">
              <feOffset result="offOut" in="SourceGraphic" dx="1.5" dy="1.5" />
              <feColorMatrix result="matrixOut" in="offOut" type="matrix"
                values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
              <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="1" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
            <rect
              fill={'url(#' + pvName + 'Beamline-gradient2)'}

              width={props.width}
              height="4"
              x={props.cx}
              y={props.cy - 3} />
            <rect
              fill={'url(#' + pvName + 'Beamline-gradient)'}

              width={props.width}
              height="4"
              x={props.cx}
              y={props.cy + 3} />
          </g>
        } */}
    </g>


      </svg>
  );
}




/**
* Horizontal Beam line component
 * */

const HorizontalBeamline = (props) => {

  return (
    <Widget  {...props} component={HorizontalBeamlineComponent} />

  )
}


export default HorizontalBeamline


