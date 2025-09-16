import React, { useState, useContext } from 'react'
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import DataConnection from '../SystemComponents/DataConnection';
import { useTheme } from '@mui/material/styles';
import ContextMenu from '../SystemComponents/ContextMenu';

/* eslint-disable eqeqeq */
const BendingMagnet = (props) => {
   console.warn(
      "This component is deprecated and will be removed in RAS in V8.0.0."
    );
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

  const handleContextMenuClose = (event) => {
    setState(prev => ({ ...prev, openContextMenu: false }));
  };

  const handleToggleContextMenu = (event) => {
    event.persist()
    setState(prev => ({ ...prev, openContextMenu: !prev.openContextMenu, x0: event.pageX, y0: event.pageY }));
    event.preventDefault();
  };

  const handleMetadata = (metadata) => {
    setState(prev => ({ ...prev, metadata: metadata }));
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

  const handleOnClick = (device) => (event) => {
    props.handleOnClick(device);
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

  let color_side = '';

  if (typeof props.alarmSensitive !== 'undefined') {
    if (props.alarmSensitive == true) {
      if (severity == 1) {
        color_side = '#FF8E53';
      }
      else if (severity == 2) {
        color_side = '#E20101';
      }
      else {
        color_side = '#133CA9';
      }
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
          <g transform={'translate(' + props.cx + ',' + props.cy + ')'} onClick={handleOnClick(props.macros['$(device)'])}>
            <linearGradient id={state.pvname + 'elipse-gradient'} gradientTransform="rotate(0)">
              <stop offset="0%" stopOpacity="30" stopColor={'silver'} />
              <stop offset="75%" stopColor={color_side} />
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
            <g transform="translate(-10,-1086)"
              fill={props.componentGradient === true ? 'url(#' + state.pvname + 'elipse-gradient)' : color_side}
              style={{
                'strokeWidth': '0.3',
                'stroke': 'black'
              }}
            >
              <g filter={props.componentShadow === true ? "url(#" + state.pvname + "elipseShadow)" : ""}>
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

            <text style={{ fill: theme.palette.text.primary }}
              x={7.5}
              y={57.5}
              textAnchor='middle'
              filter={props.textShadow === true ? "url(#" + state.pvname + "elipseShadow)" : ""}
            >
              {props.usePvUnits === true ? value + " " + state.metadata.units : value + " " + props.units}
            </text>
            <text style={{ fill: theme.palette.text.primary }}
              x={7.5}
              y={-40}
              textAnchor='middle'
              filter={props.textShadow === true ? "url(#" + state.pvname + "elipseShadow)" : ""}
            >
              {usePvLabel === true ? state.label : props.label}
            </text>
          </g>
        }
        {(initialized === false || initialized === 'undefined') &&
          <g transform={'translate(' + props.cx + ',' + props.cy + ')'}>
            <linearGradient id={state.pvname + 'elipse-gradient'} gradientTransform="rotate(0)">
              <stop offset="0%" stopOpacity="0" stopColor={'grey'} />
              <stop offset="75%" stopColor={'grey'} />
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
            <g filter={props.componentShadow === true ? "url(#" + state.pvname + "elipseShadow)" : ""}
            >
              <g>
                <path d="M 10 25 L 10 25 L 23 25 L 23 -25 L 10 -25 L 10 25 "
                  fill={'grey'}
                  style={{
                    'strokeWidth': '0.5',
                    'stroke': 'dimgrey'
                  }}
                />
                <path d="M -10 -5  L 0, -5   A 2.5 5  0 1,1 0,5 L -10 5 L -10 20 L 10 25 L 10 -25 L -10 -30 L -10 -5"
                  fill={props.componentGradient === true ? 'url(#' + state.pvname + 'elipse-gradient)' : 'grey'}
                  style={{
                    'strokeWidth': '0.3',
                    'stroke': 'dimgrey'
                  }}
                />

                <path d="M 23 -25 L 23 -25 L 8 -30 L -10 -30 L 10 -25 L 23 -25"
                  fill={'grey'}
                  style={{
                    'strokeWidth': '0.3',
                    'stroke': 'dimgrey'
                  }}
                />
              </g>
            </g>

            <text style={{ fill: 'dimgrey' }}
              x={7.5}
              y={-40}
              textAnchor='middle'
              filter={props.textShadow === true ? "url(#" + state.pvname + "elipseShadow)" : ""}
            >
              {usePvLabel === true ? state.label : props.label}
            </text>
          </g>
        }
      </g>
    );
};

export default BendingMagnet;
