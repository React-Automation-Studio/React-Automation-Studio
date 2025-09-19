import React, { useState, useContext } from 'react'
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import DataConnection from '../SystemComponents/DataConnection';
import { useTheme } from '@mui/material/styles';
import ContextMenu from '../SystemComponents/ContextMenu';

/* eslint-disable eqeqeq */

const QuadrapoleMagnet = (props) => {
  useEffect(() => {
     console.warn(
        "This component is deprecated and will be removed in RAS in V8.0.0."
      );
    }, []);
  const context = useContext(AutomationStudioContext);
  const theme = useTheme();

  let pvname;
  if (typeof props.macros !== 'undefined') {
    let macro;
    pvname = props.pv;
    for (macro in props.macros) {
      pvname = pvname.replace(macro.toString(), props.macros[macro].toString());
    }
  }
  else {
    pvname = props.pv;
  }

  const [state, setState] = useState({
    'value': "",
    'inputValue': "",
    'outputValue': "",
    'hasFocus': false,
    'label': "Undefined",
    'pvname': pvname,
    'initialized': false,
    'metadata': {},
    'severity': '',
    openContextMenu: false,
    'open': false,
    x0: 0,
    y0: 0
  });

  const handleOnClick = () => {
    props.handleOnClick(props.macros['$(device)']);
  };

  const handleInputValue = (inputValue, pvname, initialized, severity) => {
    setState(prev => ({
      ...prev,
      value: inputValue,
      pvname: pvname,
      initialized: initialized,
      severity: severity
    }));
  };

  const handleInputValueLabel = (inputValue) => {
    setState(prev => ({ ...prev, label: inputValue }));
  };

  const handleMetadata = (metadata) => {
    setState(prev => ({ ...prev, metadata: metadata }));
  };

  const handleContextMenuClose = (event) => {
    setState(prev => ({ ...prev, openContextMenu: false }));
  };

  const handleToggleContextMenu = (event) => {
    event.persist()
    setState(prev => ({ ...prev, openContextMenu: !prev.openContextMenu, x0: event.pageX, y0: event.pageY }));
    event.preventDefault();
  };

  const pv = props.pv;
  const macros = props.macros;
  const usePvLabel = props.usePvLabel;

  const usePrecision = props.prec;
  const useStringValue = props.useStringValue;
  const severity = state.severity;

  const initialized = state.initialized;
  let value = state.value;
  if (initialized) {
    if (typeof props.usePrecision !== 'undefined') {
      if (props.usePrecision == true) {
        if (typeof props.prec !== 'undefined') {
          value = parseFloat(value).toFixed(props.prec);
        }
        else
          value = parseFloat(value).toFixed(parseInt(state.metadata.precision));
      }
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

  return (
    <g onContextMenu={handleToggleContextMenu}>
      <ContextMenu
        disableProbe={props.disableProbe}
        open={state.openContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={{ top: +state.y0, left: +state.x0 }}
        probeType={'simple'}
        pvs={[{ pvname: state.pvname, initialized: initialized }]}
        handleClose={handleContextMenuClose}

        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      />
      <DataConnection
        pv={pv}
        macros={macros}
        usePvLabel={usePvLabel}
        usePrecision={usePrecision}
        handleInputValue={handleInputValue}
        handleMetadata={handleMetadata}
        outputValue={state.outputValue}
        useStringValue={useStringValue}
      />

      {usePvLabel === true && <DataConnection
        pv={pv.toString() + ".DESC"}
        macros={macros}
        handleInputValue={handleInputValueLabel}
      />}

      {initialized === true &&
        <g onClick={handleOnClick} >
          <linearGradient id={state.pvname + 'elipse-gradient'} gradientTransform="rotate(0)">
            <stop offset="0%" stopOpacity="0.5" stopColor='silver' />
            <stop offset="65%" stopColor={color} />
          </linearGradient>
          <defs>
            <filter id={state.pvname + "elipseShadow"} x="0" y="0" width="600%" height="500%">
              <feOffset result="offOut" in="SourceGraphic" dx="2.5" dy="2.5" />
              <feColorMatrix result="matrixOut" in="offOut" type="matrix"
                values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
              <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2.5" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
          </defs>
          <ellipse
            fill={props.componentGradient === true ? 'url(#' + state.pvname + 'elipse-gradient)' : color}
            cx={props.cx + 15}
            cy={props.cy}
            rx="10"
            ry="30"
            filter={props.componentShadow === true ? "url(#" + state.pvname + "elipseShadow)" : ""}
          />
          <ellipse
            fill={props.componentGradient === true ? 'url(#' + state.pvname + 'elipse-gradient)' : color}
            cx={props.cx}
            cy={props.cy}
            rx="10"
            ry="30"
            filter={props.componentShadow === true ? "url(#" + state.pvname + "elipseShadow)" : ""}
          />

          <text style={{ fill: theme.palette.text.primary }}
            x={props.cx + 7.5}
            y={props.cy + 57.5}
            textAnchor='middle'
            filter={props.textShadow === true ? "url(#" + state.pvname + "elipseShadow)" : ""}
          >
            {props.usePvUnits === true ? value + " " + state.metadata.units : value + " " + props.units}

          </text>
          <text style={{ fill: theme.palette.text.primary }}
            x={props.cx + 7.5}
            y={props.cy - 40}
            textAnchor='middle'
            filter={props.textShadow === true ? "url(#" + state.pvname + "elipseShadow)" : ""}
          >
            {usePvLabel === true ? state.label : props.label}
          </text>
        </g>
      }
      {(initialized === false || initialized === 'undefined') &&
        <g  >
          <linearGradient id="elipse-gradient">
            <stop offset="0%" stopOpacity="0" />
            <stop offset="75%" stopColor={'grey'} />
          </linearGradient>
          <linearGradient id={state.pvname + 'elipse-gradient'} gradientTransform="rotate(0)">
            <stop offset="0%" stopOpacity="0" />
            <stop offset="65%" stopColor={'silver'} />
          </linearGradient>
          <defs>
            <filter id={state.pvname + "elipseShadow"} x="0" y="0" width="600%" height="500%">
              <feOffset result="offOut" in="SourceGraphic" dx="7.5" dy="7.5" />
              <feColorMatrix result="matrixOut" in="offOut" type="matrix"
                values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
              <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="5" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
          </defs>

          <ellipse
            fill={'url(#' + state.pvname + 'elipse-gradient)'}

            cx={props.cx}
            cy={props.cy}
            rx="10"
            ry="30"
            filter={"url(#" + state.pvname + "elipseShadow)"}
          />
          <ellipse
            fill={'url(#' + state.pvname + 'elipse-gradient)'}

            cx={props.cx + 15}
            cy={props.cy}
            rx="10"
            ry="30"
            filter={"url(#" + state.pvname + "elipseShadow)"}
          />

        </g>
      }
    </g>
  );
};

export default QuadrapoleMagnet;
