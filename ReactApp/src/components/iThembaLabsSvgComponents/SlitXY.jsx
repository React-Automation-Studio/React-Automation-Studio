import React, { useState, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import DataConnection from '../SystemComponents/DataConnection';
import ContextMenu from '../SystemComponents/ContextMenu';

/* eslint-disable eqeqeq */
const SlitXY = (props) => {
  const context = useContext(AutomationStudioContext);
  const theme = useTheme();

  let initialPvs={};
  initialPvs['xGapReadback']={initialized: false, pvname:props.system.devices.xGapDevice.deviceName+":"+props.system.devices.xGapDevice.readback,value:"",char_value:"",metadata:{}};
  initialPvs['xOffsetReadback']={initialized: false, pvname:props.system.devices.xOffsetDevice.deviceName+":"+props.system.devices.xOffsetDevice.readback,value:"",char_value:"",metadata:{}};
  initialPvs['yGapReadback']={initialized: false, pvname:props.system.devices.yGapDevice.deviceName+":"+props.system.devices.yGapDevice.readback,value:"",char_value:"",metadata:{}};
  initialPvs['yOffsetReadback']={initialized: false, pvname:props.system.devices.yOffsetDevice.deviceName+":"+props.system.devices.yOffsetDevice.readback,value:"",char_value:"",metadata:{}};
  let contextPVs=[];
  for (let item in initialPvs){
    contextPVs.push(initialPvs[item]);
  }
  
  const [state, setState] = useState({
    pvs:initialPvs,contextPVs:contextPVs,  openContextMenu: false,
    'open':false,x0:0,y0:0,label:""
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

  const handleInputValueLabel = (inputValue) => {
    setState(prev => ({ ...prev, label:inputValue }));
  };

  const handleOnClick = system => event => {
    props.handleOnClick(system);
  };

  const pvs=state.pvs;

  const usePrecision= props.prec;

  const initialized=pvs.xGapReadback.initialized&&pvs.yGapReadback.initialized&&pvs.yOffsetReadback.initialized&&pvs.xOffsetReadback.initialized;
  let xGapReadbackValue=pvs.xGapReadback.value;
  let yGapReadbackValue=pvs.yGapReadback.value;
  let xOffsetReadbackValue=pvs.xOffsetReadback.value;
  let yOffsetReadbackValue=pvs.yOffsetReadback.value;
  let severity=0;

  if(initialized){
    if (typeof props.usePrecision !== 'undefined'){
      if (props.usePrecision==true){
        if (typeof props.prec !== 'undefined'){
          xGapReadbackValue=parseFloat(xGapReadbackValue).toFixed(props.prec);
          yGapReadbackValue=parseFloat(yGapReadbackValue).toFixed(props.prec);
          xOffsetReadbackValue=parseFloat(xOffsetReadbackValue).toFixed(props.prec);
          yOffsetReadbackValue=parseFloat(yOffsetReadbackValue).toFixed(props.prec);
        }
        else{
          xGapReadbackValue=parseFloat(xGapReadbackValue).toFixed(parseInt(pvs.xGapReadback.metadata.precision));
          yGapReadbackValue=parseFloat(yGapReadbackValue).toFixed(parseInt(pvs.yGapReadback.metadata.precision));
          xOffsetReadbackValue=parseFloat(xOffsetReadbackValue).toFixed(parseInt(pvs.xOffsetReadback.metadata.precision));
          yOffsetReadbackValue=parseFloat(yOffsetReadbackValue).toFixed(parseInt(pvs.yOffsetReadback.metadata.precision));
        }
      }
    }

    if((pvs.xGapReadback.severity==2)||(pvs.yGapReadback.severity==2)||(pvs.yOffsetReadback.severity==2)||(pvs.xOffsetReadback.severity==2)){
      severity=2;
    }
    else   if((pvs.xGapReadback.severity==1)||(pvs.yGapReadback.severity==1)||(pvs.yOffsetReadback.severity==1)||(pvs.xOffsetReadback.severity==1)){
      severity=1;
    }
  }

  let color_side='';

  if (typeof props.alarmSensitive !== 'undefined'){
    if (props.alarmSensitive==true){
      if (severity==1){
        color_side='#FF8E53';
      }
      else if(severity==2){
        color_side='#E20101';
      }
      else{
        color_side='#133CA9';
      }
    }
  }

  return (
    <g  onContextMenu={handleToggleContextMenu}>
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
        pv={state.pvs['xGapReadback'].pvname}
        usePrecision={usePrecision}
        handleInputValue={handleInputValue('xGapReadback')}
        handleMetadata={handleMetadata('xGapReadback')}
      />
      <DataConnection
        pv={state.pvs['yGapReadback'].pvname}
        usePrecision={usePrecision}
        handleInputValue={handleInputValue('yGapReadback')}
        handleMetadata={handleMetadata('yGapReadback')}
      />
      <DataConnection
        pv={state.pvs['xOffsetReadback'].pvname}
        usePrecision={usePrecision}
        handleInputValue={handleInputValue('xOffsetReadback')}
        handleMetadata={handleMetadata('xOffsetReadback')}
      />
      <DataConnection
        pv={state.pvs['yOffsetReadback'].pvname}
        usePrecision={usePrecision}
        handleInputValue={handleInputValue('yOffsetReadback')}
        handleMetadata={handleMetadata('yOffsetReadback')}
      />
      {initialized===true &&
        <g  id={pvs.xGapReadback.pvname+'slitxy'}transform={'translate('+props.cx+','+props.cy+')'} onClick={handleOnClick(props.system)}>
          <linearGradient id={pvs.xGapReadback.pvname+'elipse-gradient'} gradientTransform="rotate(0)">
            <stop offset="0%" stopOpacity="30" stopColor={'silver'} />
            <stop offset="75%" stopColor={color_side} />
          </linearGradient>
          <defs>
            <filter id={pvs.xGapReadback.pvname+"elipseShadow"} x="0" y="0" width="600%" height="500%">
              <feOffset result="offOut" in="SourceGraphic" dx="2.5" dy="2.5" />
              <feColorMatrix result="matrixOut" in="offOut" type="matrix"
              values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
              <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2.5" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
          </defs>
          <g filter={props.componentShadow===true?"url(#"+pvs.xGapReadback.pvname+"elipseShadow)":"" }
          >
            <g>
              <g transform="translate(-10,-1092.5)"
                fill={props.componentGradient===true?'url(#'+pvs.xGapReadback.pvname+'elipse-gradient)':color_side}
                style={{'strokeWidth':'0.3',
                'stroke':'black'}}
              >
                <g>
                  <path
                    d="m 15.05893,1085.0254 -1.776617,20.1381 0.759263,0.6179 0.51536,-5.8416 5.003912,4.0722 0.745906,-8.4549 -5.003912,-4.0722 0.515351,-5.8416 z"
                  />
                  <path
                    d="m 7.9498012,1076.2957 6.6301368,5.3958 0.203442,-2.3062 -1.923241,-1.565 1.340787,-15.198 -2.783656,-2.2654 -1.340787,15.1979 -1.9232398,-1.5651 z"
                  />
                  <path
                    d="m 6.2770152,1077.8803 -0.513672,5.8398 -5.00390605,-4.0723 -0.728516,8.2461 6.16796905,-0.018 0.837891,-9.3789 z"
                  />
                  <path
                    d="m 5.7589222,1101.1294 6.6301368,5.3958 -0.203451,2.3061 -1.92324,-1.5652 -1.3407868,15.1979 -2.783656,-2.2654 1.340787,-15.1979 -1.92324,-1.5651 z"
                  />
                </g>
              </g>
            </g>
          </g>
          <text style={{ fill: theme.palette.text.primary }}
            x={typeof props.valueOffsetX!=='undefined'?props.valueOffsetX:0}
            y={typeof props.valueOffsetY!=='undefined'?props.valueOffsetY+30:30}
            textAnchor='middle'
            filter={props.textShadow===true?"url(#"+props.system.systemName+"elipseShadow)":"" }
          >
            {props.usePvUnits===true?"XGap: "+  xGapReadbackValue+" "+state.pvs.xGapReadback.metadata.units:"XGap: "+  xGapReadbackValue+" "+props.units}
          </text>
          <text style={{ fill: theme.palette.text.primary }}
            x={typeof props.valueOffsetX!=='undefined'?props.valueOffsetX:0}
            y={typeof props.valueOffsetY!=='undefined'?props.valueOffsetY+46:46}
            textAnchor='middle'
            filter={props.textShadow===true?"url(#"+props.system.systemName+"elipseShadow)":"" }
          >
            {props.usePvUnits===true?"YGap: "+  yGapReadbackValue+" "+state.pvs.xGapReadback.metadata.units:"YGap: "+  yGapReadbackValue+" "+props.units}
          </text>
          <text style={{ fill: theme.palette.text.primary }}
            x={typeof props.valueOffsetX!=='undefined'?props.valueOffsetX:0}
            y={typeof props.valueOffsetY!=='undefined'?props.valueOffsetY+62:62}
            textAnchor='middle'
            filter={props.textShadow===true?"url(#"+props.system.systemName+"elipseShadow)":"" }
          >
            {props.usePvUnits===true?"XOff: "+  xOffsetReadbackValue+" "+state.pvs.xOffsetReadback.metadata.units:"XOff: "+  xOffsetReadbackValue+" "+props.units}
          </text>
          <text style={{ fill: theme.palette.text.primary }}
            x={typeof props.valueOffsetX!=='undefined'?props.valueOffsetX:0}
            y={typeof props.valueOffsetY!=='undefined'?props.valueOffsetY+78:78}
            textAnchor='middle'
            filter={props.textShadow===true?"url(#"+props.system.systemName+"elipseShadow)":"" }
          >
            {props.usePvUnits===true?"YOff: "+  yOffsetReadbackValue+" "+state.pvs.yOffsetReadback.metadata.units:"YOff: "+  yOffsetReadbackValue+" "+props.units}
          </text>
          <text style={{ fill: theme.palette.text.primary }}
            x={typeof props.labelOffsetX!=='undefined'?props.labelOffsetX:0}
            y={typeof props.labelOffsetY!=='undefined'?props.labelOffsetY-40:-40}
            textAnchor='middle'
            filter={props.textShadow===true?"url(#"+props.system.systemName+"elipseShadow)":"" }
          >
            {props.system.displayName}
          </text>
          </g>
        }
        {(initialized===false) &&
          <g transform={'translate('+props.cx+','+props.cy+')'}>
            <linearGradient id={pvs.xGapReadback.pvname+'elipse-gradient'} gradientTransform="rotate(0)">
              <stop offset="0%" stopOpacity="30" stopColor={'silver'} />
              <stop offset="75%" stopColor={'grey'} />
            </linearGradient>
            <defs>
              <filter id={pvs.xGapReadback.pvname+"elipseShadow"} x="0" y="0" width="600%" height="500%">
                <feOffset result="offOut" in="SourceGraphic" dx="2.5" dy="2.5" />
                <feColorMatrix result="matrixOut" in="offOut" type="matrix"
                values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
                <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2.5" />
                <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
              </filter>
            </defs>
            <g filter={props.componentShadow===true?"url(#"+pvs.xGapReadback.pvname+"elipseShadow)":"" }
            >
              <g transform="translate(-10,-1092.5)"
                fill={props.componentGradient===true?'url(#'+pvs.xGapReadback.pvname+'elipse-gradient)':color_side}
                style={{'strokeWidth':'0.3',
                'stroke':'black'}}
              >
                <g>
                  <path
                    d="m 15.05893,1085.0254 -1.776617,20.1381 0.759263,0.6179 0.51536,-5.8416 5.003912,4.0722 0.745906,-8.4549 -5.003912,-4.0722 0.515351,-5.8416 z"
                    id="rect6403"
                  />
                  <path
                    d="m 7.9498012,1076.2957 6.6301368,5.3958 0.203442,-2.3062 -1.923241,-1.565 1.340787,-15.198 -2.783656,-2.2654 -1.340787,15.1979 -1.9232398,-1.5651 z"
                  />
                  <path
                    d="m 6.2770152,1077.8803 -0.513672,5.8398 -5.00390605,-4.0723 -0.728516,8.2461 6.16796905,-0.018 0.837891,-9.3789 z"
                  />
                  <path
                    d="m 5.7589222,1101.1294 6.6301368,5.3958 -0.203451,2.3061 -1.92324,-1.5652 -1.3407868,15.1979 -2.783656,-2.2654 1.340787,-15.1979 -1.92324,-1.5651 z"
                  />
                </g>
              </g>
            </g>
            <text style={{ fill: 'dimgrey' }}
              x={typeof props.labelOffsetX!=='undefined'?props.labelOffsetX:0}
              y={typeof props.labelOffsetY!=='undefined'?props.labelOffsetY-40:-40}
              textAnchor='middle'
              filter={props.textShadow===true?"url(#"+props.system.systemName+"elipseShadow)":"" }
            >
              {props.system.displayName}
            </text>
          </g>
        }
      </g>
    );
  };

export default SlitXY;
