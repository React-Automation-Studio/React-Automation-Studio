import React, { useState, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import DataConnection from '../SystemComponents/DataConnection';
import ContextMenu from '../SystemComponents/ContextMenu';

/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
const SteererYMagnet = (props) => {
  console.warn(
      "This component is deprecated and will be removed in RAS in V8.0.0."
    );
  const context = useContext(AutomationStudioContext);
  const theme = useTheme();

  let initialPvs={};
  initialPvs['readback']={initialized: false, pvname:props.system.devices.device.deviceName+":"+props.system.devices.device.readback,value:"",char_value:"",metadata:{}};

  let contextPVs=[];
  for (let item in initialPvs){
    contextPVs.push(initialPvs[item]);
  }
  
  const [state, setState] = useState({
    pvs:initialPvs,contextPVs:contextPVs,  openContextMenu: false,
    'open':false,x0:0,y0:0
  });

  const handleContextMenuClose = (event) => {
    setState(prev => ({ ...prev, openContextMenu: false }));
  };

  const handleToggleContextMenu = (event) => {
    console.log(event.type)
    event.persist()
    setState(prev => ({ ...prev, openContextMenu: !prev.openContextMenu,x0:event.pageX,y0:event.pageY }));
    event.preventDefault();
  };

  const handleMetadata = readback => (metadata) => {
    let pvs=state.pvs;
    pvs[readback].metadata=metadata;
    setState(prev => ({ ...prev, pvs:pvs }));
  };

  const handleInputValue = readback => (inputValue,pvname,initialized,severity)=>{
    let pvs=state.pvs;
    pvs[readback].value=inputValue;
    pvs[readback].initialized=initialized;
    pvs[readback].severity=severity;
    setState(prev => ({ ...prev, pvs:pvs }));
  };

  const handleOnClick = system => event => {
    props.handleOnClick(system);
  };

  const pvs=state.pvs;
  
  const usePrecision= props.prec;

  let units="";

  const initialized=pvs.readback.initialized;
  let readbackValue=pvs.readback.value;

  if(initialized){
    if(props.usePvUnits===true){
      units=pvs.readback.metadata.units;
    }
    else {
      units=props.units;
    }

    if (typeof props.usePrecision !== 'undefined'){
      if (props.usePrecision==true){
        if (typeof props.prec !== 'undefined'){
          readbackValue=parseFloat(readbackValue).toFixed(props.prec);
        }
        else
          readbackValue=parseFloat(readbackValue).toFixed(parseInt(pvs.readback.metadata.precision));
      }
    }
  }

  let severity=pvs.readback.severity;

  let color_side='';
  let color_face='';
  let color_top='';
  if (typeof props.alarmSensitive !== 'undefined'){
    if (props.alarmSensitive==true){
      if (severity==1){
        color_side='#FF8E53';
        color_face='#FF8E43';
        color_top='#FF8E63';
      }
      else if(severity==2){
        color_side='#E20101';
        color_face='#E20901';
        color_top='#E20111';
      }
      else {
          color_side='#133CA9';
          color_face='#133C99';
          color_top='#133CA3';
      }
    }
  }

  return (
    <g onContextMenu={handleToggleContextMenu} >
      <ContextMenu
        disableProbe={props.disableProbe}
        open={state.openContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={{ top: +state.y0, left: +state.x0 }}
        probeType={'simple'}
        pvs={state.contextPVs}
        handleClose={handleContextMenuClose}

        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      />
      <DataConnection
        pv={state.pvs['readback'].pvname}
        usePrecision={usePrecision}
        handleInputValue={handleInputValue('readback')}
        handleMetadata={handleMetadata('readback')}
      />

      {initialized === true &&
        <g transform={'translate(' + props.cx + ',' + props.cy + ')'} onClick={handleOnClick(props.system)}>
          <linearGradient id={props.system.systemName + 'elipse-gradient'} gradientTransform="rotate(0)">
            <stop offset="0%" stopOpacity="30" stopColor={'silver'} />
            <stop offset="75%" stopColor={color_side} />
          </linearGradient>
          <defs>
            <filter id={props.system.systemName + "elipseShadow"} x="0" y="0" width="600%" height="500%">
              <feOffset result="offOut" in="SourceGraphic" dx="2.5" dy="2.5" />
              <feColorMatrix result="matrixOut" in="offOut" type="matrix"
                values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
              <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2.5" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
          </defs>
          <g filter={props.componentShadow === true ? "url(#" + props.system.systemName + "elipseShadow)" : ""}
          >
            <g>
              <g transform="translate(-10,-1097)"
                fill={props.componentGradient === true ? 'url(#' + props.system.systemName + 'elipse-gradient)' : color_side}
                style={{
                  'strokeWidth': '0.3',
                  'stroke': 'black'
                }}
              >
                  <path
                    d="m 6.4368595,1102.6622 3.5963725,0.049 -0.2955921,2.6603 z"
                    id="innerbottom"
                  />
                  <path
                    d="m 3.7272638,1073.1029 12.6612032,10.3458 -3.429518,38.5135 -12.81960547,-10.3114 1.02612037,-9.0872 8.8924011,0.049 0.886777,-9.4836 -0.665083,-0.5665 -8.3258489,-0.049 z"
                    id="side" />

                  <path
                    d="m 6.7324518,1089.7546 3.3993112,2.7589 -3.5963727,0.049 0.2955922,-2.6111"
                    id="innertop"
                  />
                  <path
                    d="m 16.339201,1083.3994 5.048858,0.5453 -3.396665,38.5633 -5.009394,-0.4183 z"
                    id="rigthfront"
                  />
                  <path
                    d="m 3.6926037,1072.983 5.0189326,0.6287 12.5383527,10.2401 -4.910688,-0.4524 z"
                    id="top"
                  />
                </g>
                <g transform="translate(-10,-1097)"
                  fill={'#b87333'}
                  style={{ 'strokeWidth': '0.3', 'stroke': 'orange' }}
                >
                  <path
                    id="path9504-2"
                    d="m 13.978012,1108.8976 c -1.261676,-0.2824 -2.797214,-1.6683 -4.4811427,-3.6527 v 0" />

                  <path
                    id="path9504-7-1"
                    d="m 14.113735,1107.3567 c -1.261716,-0.2823 -2.797214,-1.6683 -4.4811427,-3.6527 v 0"
                  />
                  <path
                    id="path9504-5-6"
                    d="m 14.24945,1105.8159 c -1.261708,-0.2824 -2.797206,-1.6684 -4.4811432,-3.6527 v 0"
                  />
                  <path
                    id="path9504-7-9-4"
                    d="m 14.385141,1104.2749 c -1.261676,-0.2823 -2.797174,-1.6683 -4.4811111,-3.6526 v 0"
                  />
                  <path

                    id="path9504-0-4"
                    d="m 14.520864,1102.734 c -1.261684,-0.2823 -2.79715,-1.6682 -4.481143,-3.6527 v 0"
                  />
                  <path
                    id="path9504-7-5-3"
                    d="m 14.656579,1101.1932 c -1.261676,-0.2824 -2.797142,-1.6683 -4.481143,-3.6527 v 0"
                  />
                  <path
                    id="path9504-6-2"
                    d="m 14.792302,1099.6523 c -1.261676,-0.2824 -2.797142,-1.6683 -4.481143,-3.6527 v 0"
                  />
                  <path
                    id="path9504-7-91-7"
                    d="m 14.928025,1098.1114 c -1.261676,-0.2824 -2.797151,-1.6682 -4.481143,-3.6527 v 0"
                  />
                  <path
                    id="path9504-0-4-0-8"
                    d="m 19.997828,1098.1255 c -1.850938,0.1788 -2.983041,0.2052 -5.135825,0 v 0"
                  />
                  <path
                    id="path9504-0-4-0-8-4"
                    d="m 19.880923,1099.6494 c -1.850938,0.1974 -2.983041,0.2265 -5.135825,0 v 0"
                  />
                  <path
                    id="path9504-0-4-0-8-5"
                    d="m 19.699703,1101.221 c -1.845863,0.1819 -2.974862,0.2088 -5.121742,0 v 0"
                  />
                  <path
                    id="path9504-0-4-0-8-2"
                    d="m 19.546426,1102.7243 c -1.848374,0.2345 -2.97891,0.2691 -5.128711,0 v 0"
                  />
                  <path
                    id="path9504-0-4-0-8-3"
                    d="m 19.358384,1104.2616 c -1.850938,0.2233 -2.983041,0.2563 -5.135825,0 v 0"
                  />
                  <path
                    id="path9504-0-4-0-8-35"
                    d="m 19.382817,1105.8159 c -1.850052,0.2272 -2.981613,0.2607 -5.133367,0 v 0"
                  />
                  <path
                    id="path9504-0-4-0-8-35-3"
                    d="m 19.223154,1107.2827 c -1.853798,0.2132 -2.987651,0.2446 -5.143761,0 v 0"
                  />
                  <path
                    id="path9504-0-4-0-8-35-9"
                    d="m 19.075285,1108.9595 c -1.853745,0.2113 -2.987565,0.2425 -5.143614,0 v 0"
                  />

                  <path
                    d="m 2.7316557,1092.9946 c -0.2156088,-0.2387 -0.6311204,-0.686 -0.8521282,-0.9464 v 0"
                    id="path9504-0-4-1"
                  />

                  <path
                    d="m 4.4126497,1092.9301 c -0.3135113,-0.2605 -0.6014918,-0.4885 -0.9323105,-0.819 -0.5592372,-0.5586 -1.3069859,-1.3559 -1.4651117,-1.6037 l -0.1393435,-0.1742"
                    id="path9504-7-5-3-4"
                  />

                  <path
                    d="m 6.6321275,1092.6192 c -1.2617,-0.2824 -2.7972,-1.6684 -4.4812,-3.6527 l -0.1393435,-0.1742"
                    id="path9504-6-2-6"
                  />
                  <path
                    d="m 6.7678275,1091.0783 c -1.2617,-0.2824 -2.7971,-1.6683 -4.4811,-3.6527 l -0.1393435,-0.2439"
                    id="path9504-7-91-7-3"
                  />

                  <path
                    d="m 6.7825803,1090.448 c 0.092819,-3.8381 0.5484134,-8.5093 1.2007186,-13.6321 v 0"
                    id="path9504"
                  />
                  <path
                    d="m 7.2890954,1090.8609 c 0.092819,-3.8381 0.548413,-8.5093 1.2007186,-13.6321 v 0"
                    id="path9504-7"
                  />
                  <path
                    d="m 7.7956098,1091.2738 c 0.092819,-3.8382 0.5484131,-8.5093 1.2007187,-13.6321 v 0"
                    id="path9504-5"
                  />

                  <path
                    d="m 8.3021246,1091.6867 c 0.092819,-3.8382 0.5484134,-8.5093 1.2007187,-13.6321 v 0"
                    id="path9504-7-9"
                  />
                  <path
                    d="m 8.8086403,1092.0995 c 0.092819,-3.8381 0.5484131,-8.5093 1.2007187,-13.6321 v 0"
                    id="path9504-0"
                  />
                  <path
                    d="m 9.3151551,1092.5124 c 0.092819,-3.8381 0.5484134,-8.5093 1.2007189,-13.6321 v 0"
                    id="path9504-7-5"
                  />
                  <path
                    d="m 9.8216692,1092.9253 c 0.092819,-3.8382 0.5484128,-8.5093 1.2007188,-13.6321 v 0"
                    id="path9504-6"
                  />
                  <path
                    d="m 10.328184,1093.3382 c 0.09282,-3.8382 0.548414,-8.5093 1.200719,-13.6321 v 0"
                    id="path9504-7-91"
                  />
                  <path
                    d="m 7.8768261,1091.1714 c -0.3418104,-0.023 -0.7077562,-0.054 -1.1089986,-0.093 v 0"
                    id="path9504-0-4-0-8-6"
                  />
                  <path
                    d="m 9.704747,1092.7593 c -0.8000564,0 -2.0300554,-0.084 -3.130704,-0.1747 v 0"
                    id="path9504-0-4-0-8-6-9"
                  />
                  <path
                    d="m 14.538491,1078.8271 c -0.832626,0.099 -1.907412,0.2543 -3.234747,0.8987 v 0"
                    id="path9504-7-91-2"
                  />
                  <path
                    d="m 14.108469,1078.3799 c -0.832626,0.099 -1.907412,0.2543 -3.234747,0.8987 v 0"
                    id="path9504-7-91-2-9"
                  />
                  <path
                    d="m 13.615815,1077.9856 c -0.832626,0.099 -1.907412,0.2543 -3.234747,0.8987 v 0"
                    id="path9504-7-91-2-8"
                  />
                  <path
                    d="m 13.123161,1077.5423 c -0.832626,0.099 -1.907412,0.2543 -3.2347467,0.8987 v 0"
                    id="path9504-7-91-2-6"
                  />
                  <path
                    d="m 12.737591,1077.1559 c -0.832626,0.099 -1.907412,0.2543 -3.2347477,0.8987 v 0"
                    id="path9504-7-91-2-97"
                  />
                  <path
                    d="m 12.187119,1076.7048 c -0.832626,0.099 -1.907412,0.2543 -3.2347472,0.8987 v 0"
                    id="path9504-7-91-2-96"
                  />
                  <path
                    d="m 11.724561,1076.3301 c -0.832626,0.099 -1.907412,0.2543 -3.234747,0.8987 v 0"
                    id="path9504-7-91-2-7"
                  />
                  <path
                    d="m 11.152546,1075.9166 c -0.832626,0.099 -1.9074122,0.2543 -3.2347472,0.8987 v 0"
                    id="path9504-7-91-2-3"
                  />
                  <path
                    d="m 8.4481214,1118.5965 c 0.092826,-3.8382 0.5483889,-8.5093 1.2007186,-13.6322 v 0"
                    id="path9504-7-91-7-36"
                  />

                  <path
                    d="m 9.7854148,1104.3331 c -0.2708485,0.1 -0.5541262,0.2192 -0.8499483,0.3628 v 0"
                    id="path9504-7-91-2-9-8"
                  />

                  <path
                    d="m 9.9319899,1103.59 c -0.3581433,0.1178 -1.0350771,0.3674 -1.4399118,0.5639 v 0"
                    id="path9504-7-91-2-9-0"
                  />

                  <path
                    d="m 9.8588758,1103.0431 c -0.196964,0.047 -0.0082,-0.045 -0.2220216,0.022 -0.3866421,0.1221 -1.1950725,0.4303 -1.6374299,0.6451 v 0"
                    id="path9504-7-91-2-9-06"
                  />

                  <path
                    d="m 4.9024995,1115.7064 c 0.08872,-3.6683 0.508814,-8.0978 1.1153299,-12.955"
                    id="path9504-2-1"
                  />

                  <path
                    d="m 5.4090248,1116.1193 c 0.092803,-3.8383 0.548406,-8.5094 1.2007187,-13.6321 v 0"
                    id="path9504-7-1-1"
                  />
                  <path
                    d="m 5.9155183,1116.5322 c 0.092835,-3.8383 0.5484378,-8.5094 1.2007186,-13.6321 v 0"
                    id="path9504-5-6-77"
                  />
                  <path
                    d="m 6.4220521,1116.945 c 0.092826,-3.8382 0.5484293,-8.5093 1.2007101,-13.6321 v 0"
                    id="path9504-7-9-4-2"
                  />
                  <path
                    d="m 6.9285773,1117.3578 c 0.092795,-3.8381 0.548389,-8.5092 1.2007187,-13.6321 v 0"
                    id="path9504-0-4-0"
                  />

                  <path
                    d="m 7.4350708,1117.7707 c 0.092826,-3.8382 0.5484208,-8.5092 1.2007187,-13.6321 v 0"
                    id="path9504-7-5-3-8"
                  />
                  <path
                    d="m 7.9415961,1118.1836 c 0.092826,-3.8382 0.5484208,-8.5092 1.2007187,-13.6321 v 0"
                    id="path9504-6-2-2"
                  />

                  <path
                    d="m 8.9108981,1102.8382 c -0.2445806,0.093 -1.090297,0.3992 -1.3548622,0.5276 v 0"
                    id="path9504-7-91-2-9-6"
                  />

                  <path
                    d="m 7.834583,1102.6648 c -0.1727024,0.061 -0.35059,0.1296 -0.5336938,0.2075 -0.1417264,0.06 -0.2865778,0.1261 -0.4345687,0.1979 v 0"
                    id="path9504-7-91-2-9-9"
                  />
                </g>
              </g>
            </g>

            <text style={{ fill: theme.palette.text.primary }}
              x={typeof this.props.valueOffsetX !== 'undefined' ? this.props.valueOffsetX : 0}
              y={typeof this.props.valueOffsetY !== 'undefined' ? this.props.valueOffsetY + 57.5 : 57.5}
              textAnchor='middle'
              filter={this.props.textShadow === true ? "url(#" + this.props.system.systemName + "elipseShadow)" : ""}
            >
              {this.props.usePvUnits === true ? readbackValue + " " + pvs.readback.metadata.units : readbackValue + " " + this.props.yUnits}

            </text>
            <text style={{ fill: theme.palette.text.primary }}
              x={typeof this.props.labelOffsetX !== 'undefined' ? this.props.labelOffsetX : 0}
              y={typeof this.props.labelOffsetY !== 'undefined' ? this.props.labelOffsetY - 40 : -40}
              textAnchor='middle'
              filter={this.props.textShadow === true ? "url(#" + this.props.system.systemName + "elipseShadow)" : ""}
            >
              {this.props.system.displayName}
            </text>
          </g>
        }
        {(initialized === false || initialized === 'undefined') &&
          <g transform={'translate(' + this.props.cx + ',' + this.props.cy + ')'}>
            <linearGradient id={this.props.system.systemName + 'elipse-gradient'} gradientTransform="rotate(0)">
              <stop offset="0%" stopOpacity="30" stopColor={'silver'} />
              <stop offset="75%" stopColor={'grey'} />
            </linearGradient>
            <defs>
              <filter id={this.props.system.systemName + "elipseShadow"} x="0" y="0" width="600%" height="500%">
                <feOffset result="offOut" in="SourceGraphic" dx="2.5" dy="2.5" />
                <feColorMatrix result="matrixOut" in="offOut" type="matrix"
                  values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
                <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2.5" />
                <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
              </filter>
            </defs>
            <g filter={this.props.componentShadow === true ? "url(#" + this.props.system.systemName + "elipseShadow)" : ""}
            >
              <g>
                <g transform="translate(-10,-1097)"
                  fill={this.props.componentGradient === true ? 'url(#' + this.props.system.systemName + 'elipse-gradient)' : 'grey'}
                  style={{
                    'strokeWidth': '0.3',
                    'stroke': 'black'
                  }}
                >
                  <path
                    d="m 6.4368595,1102.6622 3.5963725,0.049 -0.2955921,2.6603 z"
                    id="innerbottom"
                  />
                  <path
                    d="m 3.7272638,1073.1029 12.6612032,10.3458 -3.429518,38.5135 -12.81960547,-10.3114 1.02612037,-9.0872 8.8924011,0.049 0.886777,-9.4836 -0.665083,-0.5665 -8.3258489,-0.049 z"
                    id="side" />

                  <path
                    d="m 6.7324518,1089.7546 3.3993112,2.7589 -3.5963727,0.049 0.2955922,-2.6111"
                    id="innertop"
                  />
                  <path
                    d="m 16.339201,1083.3994 5.048858,0.5453 -3.396665,38.5633 -5.009394,-0.4183 z"
                    id="rigthfront"
                  />
                  <path
                    d="m 3.6926037,1072.983 5.0189326,0.6287 12.5383527,10.2401 -4.910688,-0.4524 z"
                    id="top"
                  />
                </g>
                <g transform="translate(-10,-1097)"
                  fill={'grey'}
                  style={{ 'strokeWidth': '0.3', 'stroke': 'silver' }}
                >
                  <path
                    id="path9504-2"
                    d="m 13.978012,1108.8976 c -1.261676,-0.2824 -2.797214,-1.6683 -4.4811427,-3.6527 v 0" />

                  <path
                    id="path9504-7-1"
                    d="m 14.113735,1107.3567 c -1.261716,-0.2823 -2.797214,-1.6683 -4.4811427,-3.6527 v 0"
                  />
                  <path
                    id="path9504-5-6"
                    d="m 14.24945,1105.8159 c -1.261708,-0.2824 -2.797206,-1.6684 -4.4811432,-3.6527 v 0"
                  />
                  <path
                    id="path9504-7-9-4"
                    d="m 14.385141,1104.2749 c -1.261676,-0.2823 -2.797174,-1.6683 -4.4811111,-3.6526 v 0"
                  />
                  <path
                    id="path9504-0-4"
                    d="m 14.520864,1102.734 c -1.261684,-0.2823 -2.79715,-1.6682 -4.481143,-3.6527 v 0"
                  />
                  <path
                    id="path9504-7-5-3"
                    d="m 14.656579,1101.1932 c -1.261676,-0.2824 -2.797142,-1.6683 -4.481143,-3.6527 v 0"
                  />
                  <path
                    id="path9504-6-2"
                    d="m 14.792302,1099.6523 c -1.261676,-0.2824 -2.797142,-1.6683 -4.481143,-3.6527 v 0"
                  />
                  <path
                    id="path9504-7-91-7"
                    d="m 14.928025,1098.1114 c -1.261676,-0.2824 -2.797151,-1.6682 -4.481143,-3.6527 v 0"
                  />
                  <path
                    id="path9504-0-4-0-8"
                    d="m 19.997828,1098.1255 c -1.850938,0.1788 -2.983041,0.2052 -5.135825,0 v 0"
                  />
                  <path
                    id="path9504-0-4-0-8-4"
                    d="m 19.880923,1099.6494 c -1.850938,0.1974 -2.983041,0.2265 -5.135825,0 v 0"
                  />
                  <path
                    id="path9504-0-4-0-8-5"
                    d="m 19.699703,1101.221 c -1.845863,0.1819 -2.974862,0.2088 -5.121742,0 v 0"
                  />
                  <path
                    id="path9504-0-4-0-8-2"
                    d="m 19.546426,1102.7243 c -1.848374,0.2345 -2.97891,0.2691 -5.128711,0 v 0"
                  />
                  <path
                    id="path9504-0-4-0-8-3"
                    d="m 19.358384,1104.2616 c -1.850938,0.2233 -2.983041,0.2563 -5.135825,0 v 0"
                  />
                  <path
                    id="path9504-0-4-0-8-35"
                    d="m 19.382817,1105.8159 c -1.850052,0.2272 -2.981613,0.2607 -5.133367,0 v 0"
                  />
                  <path
                    id="path9504-0-4-0-8-35-3"
                    d="m 19.223154,1107.2827 c -1.853798,0.2132 -2.987651,0.2446 -5.143761,0 v 0"
                  />
                  <path
                    id="path9504-0-4-0-8-35-9"
                    d="m 19.075285,1108.9595 c -1.853745,0.2113 -2.987565,0.2425 -5.143614,0 v 0"
                  />

                  <path
                    d="m 2.7316557,1092.9946 c -0.2156088,-0.2387 -0.6311204,-0.686 -0.8521282,-0.9464 v 0"
                    id="path9504-0-4-1"
                  />

                  <path
                    d="m 4.4126497,1092.9301 c -0.3135113,-0.2605 -0.6014918,-0.4885 -0.9323105,-0.819 -0.5592372,-0.5586 -1.3069859,-1.3559 -1.4651117,-1.6037 l -0.1393435,-0.1742"
                    id="path9504-7-5-3-4"
                  />

                  <path
                    d="m 6.6321275,1092.6192 c -1.2617,-0.2824 -2.7972,-1.6684 -4.4812,-3.6527 l -0.1393435,-0.1742"
                    id="path9504-6-2-6"
                  />
                  <path
                    d="m 6.7678275,1091.0783 c -1.2617,-0.2824 -2.7971,-1.6683 -4.4811,-3.6527 l -0.1393435,-0.2439"
                    id="path9504-7-91-7-3"
                  />

                  <path
                    d="m 6.7825803,1090.448 c 0.092819,-3.8381 0.5484134,-8.5093 1.2007186,-13.6321 v 0"
                    id="path9504"
                  />
                  <path
                    d="m 7.2890954,1090.8609 c 0.092819,-3.8381 0.548413,-8.5093 1.2007186,-13.6321 v 0"
                    id="path9504-7"
                  />
                  <path
                    d="m 7.7956098,1091.2738 c 0.092819,-3.8382 0.5484131,-8.5093 1.2007187,-13.6321 v 0"
                    id="path9504-5"
                  />

                  <path
                    d="m 8.3021246,1091.6867 c 0.092819,-3.8382 0.5484134,-8.5093 1.2007187,-13.6321 v 0"
                    id="path9504-7-9"
                  />
                  <path
                    d="m 8.8086403,1092.0995 c 0.092819,-3.8381 0.5484131,-8.5093 1.2007187,-13.6321 v 0"
                    id="path9504-0"
                  />
                  <path
                    d="m 9.3151551,1092.5124 c 0.092819,-3.8381 0.5484134,-8.5093 1.2007189,-13.6321 v 0"
                    id="path9504-7-5"
                  />
                  <path
                    d="m 9.8216692,1092.9253 c 0.092819,-3.8382 0.5484128,-8.5093 1.2007188,-13.6321 v 0"
                    id="path9504-6"
                  />
                  <path
                    d="m 10.328184,1093.3382 c 0.09282,-3.8382 0.548414,-8.5093 1.200719,-13.6321 v 0"
                    id="path9504-7-91"
                  />
                  <path
                    d="m 7.8768261,1091.1714 c -0.3418104,-0.023 -0.7077562,-0.054 -1.1089986,-0.093 v 0"
                    id="path9504-0-4-0-8-6"
                  />
                  <path
                    d="m 9.704747,1092.7593 c -0.8000564,0 -2.0300554,-0.084 -3.130704,-0.1747 v 0"
                    id="path9504-0-4-0-8-6-9"
                  />
                  <path
                    d="m 14.538491,1078.8271 c -0.832626,0.099 -1.907412,0.2543 -3.234747,0.8987 v 0"
                    id="path9504-7-91-2"
                  />
                  <path
                    d="m 14.108469,1078.3799 c -0.832626,0.099 -1.907412,0.2543 -3.234747,0.8987 v 0"
                    id="path9504-7-91-2-9"
                  />
                  <path
                    d="m 13.615815,1077.9856 c -0.832626,0.099 -1.907412,0.2543 -3.234747,0.8987 v 0"
                    id="path9504-7-91-2-8"
                  />
                  <path
                    d="m 13.123161,1077.5423 c -0.832626,0.099 -1.907412,0.2543 -3.2347467,0.8987 v 0"
                    id="path9504-7-91-2-6"
                  />
                  <path
                    d="m 12.737591,1077.1559 c -0.832626,0.099 -1.907412,0.2543 -3.2347477,0.8987 v 0"
                    id="path9504-7-91-2-97"
                  />
                  <path
                    d="m 12.187119,1076.7048 c -0.832626,0.099 -1.907412,0.2543 -3.2347472,0.8987 v 0"
                    id="path9504-7-91-2-96"
                  />
                  <path
                    d="m 11.724561,1076.3301 c -0.832626,0.099 -1.907412,0.2543 -3.234747,0.8987 v 0"
                    id="path9504-7-91-2-7"
                  />
                  <path
                    d="m 11.152546,1075.9166 c -0.832626,0.099 -1.9074122,0.2543 -3.2347472,0.8987 v 0"
                    id="path9504-7-91-2-3"
                  />
                  <path
                    d="m 8.4481214,1118.5965 c 0.092826,-3.8382 0.5483889,-8.5093 1.2007186,-13.6322 v 0"
                    id="path9504-7-91-7-36"
                  />usePvLabel===true? this.state.label:this.props.label

                  <path
                    d="m 9.7854148,1104.3331 c -0.2708485,0.1 -0.5541262,0.2192 -0.8499483,0.3628 v 0"
                    id="path9504-7-91-2-9-8"
                  />

                  <path
                    d="m 9.9319899,1103.59 c -0.3581433,0.1178 -1.0350771,0.3674 -1.4399118,0.5639 v 0"
                    id="path9504-7-91-2-9-0"
                  />

                  <path
                    d="m 9.8588758,1103.0431 c -0.196964,0.047 -0.0082,-0.045 -0.2220216,0.022 -0.3866421,0.1221 -1.1950725,0.4303 -1.6374299,0.6451 v 0"
                    id="path9504-7-91-2-9-06"
                  />

                  <path
                    d="m 4.9024995,1115.7064 c 0.08872,-3.6683 0.508814,-8.0978 1.1153299,-12.955"
                    id="path9504-2-1"
                  />

                  <path
                    d="m 5.4090248,1116.1193 c 0.092803,-3.8383 0.548406,-8.5094 1.2007187,-13.6321 v 0"
                    id="path9504-7-1-1"
                  />
                  <path
                    d="m 5.9155183,1116.5322 c 0.092835,-3.8383 0.5484378,-8.5094 1.2007186,-13.6321 v 0"
                    id="path9504-5-6-77"
                  />
                  <path
                    d="m 6.4220521,1116.945 c 0.092826,-3.8382 0.5484293,-8.5093 1.2007101,-13.6321 v 0"
                    id="path9504-7-9-4-2"
                  />
                  <path
                    d="m 6.9285773,1117.3578 c 0.092795,-3.8381 0.548389,-8.5092 1.2007187,-13.6321 v 0"
                    id="path9504-0-4-0"
                  />

                  <path
                    d="m 7.4350708,1117.7707 c 0.092826,-3.8382 0.5484208,-8.5092 1.2007187,-13.6321 v 0"
                    id="path9504-7-5-3-8"
                  />
                  <path
                    d="m 7.9415961,1118.1836 c 0.092826,-3.8382 0.5484208,-8.5092 1.2007187,-13.6321 v 0"
                    id="path9504-6-2-2"
                  />

                  <path
                    d="m 8.9108981,1102.8382 c -0.2445806,0.093 -1.090297,0.3992 -1.3548622,0.5276 v 0"
                    id="path9504-7-91-2-9-6"
                  />

                  <path
                    d="m 7.834583,1102.6648 c -0.1727024,0.061 -0.35059,0.1296 -0.5336938,0.2075 -0.1417264,0.06 -0.2865778,0.1261 -0.4345687,0.1979 v 0"
                    id="path9504-7-91-2-9-9"
                  />
                </g>
              </g>
            </g>

            <text style={{ fill: 'dimgrey' }}
              x={typeof this.props.labelOffsetX !== 'undefined' ? this.props.labelOffsetX : 0}
              y={typeof this.props.labelOffsetY !== 'undefined' ? this.props.labelOffsetY - 40 : -40}
              textAnchor='middle'
              filter={this.props.textShadow === true ? "url(#" + this.props.system.systemName + "elipseShadow)" : ""}
            >
              {this.props.system.displayName}
            </text>
          </g>
        }
      </g>
    );
  };

export default SteererYMagnet;
