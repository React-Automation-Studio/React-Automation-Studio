import React, { useState, useContext } from 'react'
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import DataConnection from '../SystemComponents/DataConnection';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useTheme } from '@mui/material/styles';
import ContextMenu from '../SystemComponents/ContextMenu';
import Tooltip from '@mui/material/Tooltip';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
const Harp = (props) => {
  const context = useContext(AutomationStudioContext);
  const theme = useTheme();

  let xrawScanPV;
  if (typeof props.onlyY === 'undefined') {
    xrawScanPV = props.systemName + ':xraw.SCAN';
  }
  else {
    xrawScanPV = props.systemName + ':yraw.SCAN';
  }
  let yrawScanPV;
  if (typeof props.onlyX === 'undefined') {
    yrawScanPV = props.systemName + ':yraw.SCAN';
  }
  else {
    yrawScanPV = props.systemName + ':xraw.SCAN';
  }
  let actuatorName;
  if (typeof props.actuatorName === 'undefined') {
    actuatorName = props.systemName;
  }
  else {
    actuatorName = props.actuatorName;
  }

  const statusPV = actuatorName + ':get-statusText';
  const commandPV = actuatorName + ':put-outIn';
  const safetyOkPV = actuatorName + ':get-status.B1';
  const safetyAlarmPV = actuatorName + ':get-status.B0';
  const airPressurePV = actuatorName + ':get-status.B2';
  const HvPV = actuatorName + ':get-status.B3';
  const opActInPV = actuatorName + ':get-status.B4';
  const movingPV = actuatorName + ':get-status.B5';
  const inPV = actuatorName + ':get-status.B6';
  const outPV = actuatorName + ':get-status.B7';
  let initialPvs = {};
  initialPvs['xrawScanPV'] = { initialized: false, pvname: xrawScanPV, value: "", char_value: "" }
  initialPvs['yrawScanPV'] = { initialized: false, pvname: yrawScanPV, value: "", char_value: "" }
  initialPvs['statusPV'] = { initialized: false, pvname: statusPV, value: "", char_value: "" }
  initialPvs['commandPV'] = { initialized: false, pvname: commandPV, value: "", char_value: "" }

  initialPvs['safetyOkPV'] = { initialized: false, pvname: safetyOkPV, value: "", char_value: "" }
  initialPvs['safetyAlarmPV'] = { initialized: false, pvname: safetyAlarmPV, value: "", char_value: "" }
  initialPvs['airPressurePV'] = { initialized: false, pvname: airPressurePV, value: "", char_value: "" }
  initialPvs['opActInPV'] = { initialized: false, pvname: opActInPV, value: "", char_value: "" }
  initialPvs['HvPV'] = { initialized: false, pvname: HvPV, value: "", char_value: "" }
  initialPvs['movingPV'] = { initialized: false, pvname: movingPV, value: "", char_value: "" }
  initialPvs['inPV'] = { initialized: false, pvname: inPV, value: "", char_value: "" }
  initialPvs['outPV'] = { initialized: false, pvname: outPV, value: "", char_value: "" }
  let contextPVs = [];
  for (let item in initialPvs) {
    contextPVs.push(initialPvs[item]);
  }

  const [state, setState] = useState({
    pvs: initialPvs,
    newCommandTrigger: 0,
    'open': false,
    openContextMenu: false,
    contextPVs: contextPVs,
    x0: 0,
    y0: 0
  });

  const handleMetadata = (name) => (metadata) => {
    setState(prev => {
      let pvs = { ...prev.pvs };
      pvs[name].metadata = metadata;
      return { ...prev, pvs: pvs };
    });
  };

  const handleInputValue = (name) => (inputValue, pvname, initialized, severity) => {
    setState(prev => {
      let pvs = { ...prev.pvs };
      if (name == 'inPV') {
        if (initialized == true) {
          if (inputValue == 1) {
            props.handleHarpInsertedOrRemoved(true, props.systemName);
          }
          else {
            props.handleHarpInsertedOrRemoved(false, props.systemName);
          }
        }
      }
      pvs[name].value = inputValue;
      pvs[name].initialized = initialized;
      pvs[name].severity = severity;
      pvs[name].pvname = pvname;

      return { ...prev, pvs: pvs };
    });
  };

  const handleInputValueLabel = (inputValue) => {
    setState(prev => ({ ...prev, label: inputValue }));
  };

  const handleContextMenuClose = (event) => {
    setState(prev => ({ ...prev, openContextMenu: false }));
  };

  const handleToggleContextMenu = (event) => {
    event.persist()
    setState(prev => ({ ...prev, openContextMenu: !prev.openContextMenu, x0: event.pageX, y0: event.pageY }));
    event.preventDefault();
  };

  const handleOnClick = (device) => (event) => {
    let pvs = state.pvs;
    if ((pvs['commandPV'].metadata['write_access'] === true)) {
      if (pvs['inPV'].value == 1) {
        setState(prev => {
          let newPvs = { ...prev.pvs };
          newPvs['commandPV'].value = 0;
          newPvs['xrawScanPV'].value = 0;
          newPvs['yrawScanPV'].value = 0;
          return {
            ...prev,
            pvs: newPvs,
            newCommandTrigger: prev.newCommandTrigger + 1,
            open: false
          };
        });
        props.handleHarpInsertedOrRemoved(false, props.systemName);
      }
      else {
        setState(prev => ({ ...prev, open: true }));
      }
    }
  };

  const handleYes = () => {
    setState(prev => {
      let pvs = { ...prev.pvs };
      pvs['commandPV'].value = 1;
      pvs['xrawScanPV'].value = 9;
      pvs['yrawScanPV'].value = 9;
      return {
        ...prev,
        pvs: pvs,
        newCommandTrigger: prev.newCommandTrigger + 1,
        open: false
      };
    });
    props.handleHarpInsertedOrRemoved(true, props.systemName);
  };

  const handleOk = () => {
    setState(prev => ({ ...prev, open: false }));
  };

  const handleNo = () => {
    setState(prev => ({ ...prev, open: false }));
  };

  const pvs = state.pvs;

  const initialized = (pvs['commandPV'].initialized) && (pvs['statusPV'].initialized) && (pvs['xrawScanPV'].initialized)
    && (pvs['yrawScanPV'].initialized) && (pvs['safetyAlarmPV'].initialized) && (pvs['safetyOkPV'].initialized)
    && (pvs['airPressurePV'].initialized) && (pvs['opActInPV'].initialized) && pvs['movingPV'].initialized
    && (pvs['HvPV'].initialized) && (pvs['inPV'].initialized) && (pvs['outPV'].initialized);

  let yoffset = 0;
  let harpFault = false;
  let harpFaultString = ""
  let alarmColor = '#133C99';

  if (pvs['inPV'].value == 1) {
    yoffset = 0;
  }

  if (pvs['outPV'].value == 1) {
    yoffset = -30;
  }

  if (pvs['movingPV'].value == 1) {
    alarmColor = '#f9e500';
  }

  if (pvs['airPressurePV'].value == 1) {
    alarmColor = '#FF8E53';
    harpFault = true;
    harpFaultString += " [Air pressure]"
  }
  if (pvs['HvPV'].value == 1) {
    alarmColor = '#FF8E53';
    harpFault = true;
    harpFaultString += " [HV Bias]"
  }

  if (pvs['safetyAlarmPV'].value == 1) {
    alarmColor = '#E20101';
    harpFault = true;
    harpFaultString += " [Safety Alarm]"
  }
  if (pvs['safetyOkPV'].value == 1) {
    alarmColor = '#E20101';
    harpFault = true;
    harpFaultString += " [Safety Ok]"
  }
  if (harpFaultString.length > 0) {
    harpFaultString = "Faults: " + harpFaultString;
  }

  return (
    <g>
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
      {(props.maxHarpsReached === false) && <Dialog
        open={state.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Warning!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to insert the harp?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNo} color="primary">
            No
          </Button>
          <Button onClick={handleYes} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      }

      {(props.maxHarpsReached === true) && <Dialog
        open={state.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Maximum number of inserted harps reached!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please remove a harp from the beam line.
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Button onClick={handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      }
      <Tooltip disableHoverListener={!harpFault} title={harpFaultString}>
        <g onClick={handleOnClick(props.systemName)} onContextMenu={handleToggleContextMenu}

        >
          <DataConnection
            pv={state.pvs['commandPV'].pvname}


            newValueTrigger={state.newCommandTrigger}
            handleInputValue={handleInputValue('commandPV')}
            handleMetadata={handleMetadata('commandPV')}
            outputValue={state.pvs['commandPV'].value}

          />
          <DataConnection pv={state.pvs['statusPV'].pvname} handleInputValue={handleInputValue('statusPV')} handleMetadata={handleMetadata('statusPV')} />
          <DataConnection pv={state.pvs['xrawScanPV'].pvname} handleInputValue={handleInputValue('xrawScanPV')} outputValue={state.pvs['xrawScanPV'].value} handleMetadata={handleMetadata('xrawScanPV')} />
          <DataConnection pv={state.pvs['yrawScanPV'].pvname} handleInputValue={handleInputValue('yrawScanPV')} outputValue={state.pvs['yrawScanPV'].value} handleMetadata={handleMetadata('yrawScanPV')} />
          <DataConnection pv={state.pvs['safetyOkPV'].pvname} handleInputValue={handleInputValue('safetyOkPV')} handleMetadata={handleMetadata('safetyOkPV')} />
          <DataConnection pv={state.pvs['safetyAlarmPV'].pvname} handleInputValue={handleInputValue('safetyAlarmPV')} handleMetadata={handleMetadata('safetyAlarmPV')} />
          <DataConnection pv={state.pvs['airPressurePV'].pvname} handleInputValue={handleInputValue('airPressurePV')} handleMetadata={handleMetadata('airPressurePV')} />
          <DataConnection pv={state.pvs['opActInPV'].pvname} handleInputValue={handleInputValue('opActInPV')} handleMetadata={handleMetadata('opActInPV')} />
          <DataConnection pv={state.pvs['HvPV'].pvname} handleInputValue={handleInputValue('HvPV')} handleMetadata={handleMetadata('HvPV')} />
          <DataConnection pv={state.pvs['movingPV'].pvname} handleInputValue={handleInputValue('movingPV')} useStringValue={false} handleMetadata={handleMetadata('movingPV')} />
          <DataConnection pv={state.pvs['inPV'].pvname} handleInputValue={handleInputValue('inPV')} handleMetadata={handleMetadata('inPV')} />
          <DataConnection pv={state.pvs['outPV'].pvname} handleInputValue={handleInputValue('outPV')} handleMetadata={handleMetadata('outPV')} />
          {initialized === true &&
            <g>
              <linearGradient id={props.systemName + 'Harp-gradient'} gradientTransform="rotate(0)">
                <stop offset="0%" stopColor='grey' />
                <stop offset="100%" stopColor={alarmColor} />
              </linearGradient>
              <defs>
                <filter id={props.systemName + "HarpShadow"} x="0" y="0" width="600%" height="500%">
                  <feOffset result="offOut" in="SourceGraphic" dx="2" dy="2" />
                  <feColorMatrix result="matrixOut" in="offOut" type="matrix"
                    values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
                  <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="1" />
                  <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                </filter>
              </defs>
              <g transform={'translate(' + props.cx + ',' + props.cy + ')'}
              >
                {yoffset !== 0 &&
                  <g transform='scale (0.3996 1.25)'>
                    <rect width='36' height='36' fill={alarmColor} x={-18} y={+yoffset - 17.5} transform='rotate(15,0,0) ' fillOpacity="0" />
                    <g
                      fill={props.componentGradient === true ? 'url(#' + props.systemName + 'Harp-gradient)' : alarmColor}
                      filter={props.componentShadow === true ? "url(#" + props.systemName + "HarpShadow)" : ""}
                      transform='rotate(15,0,0) '
                    >
                      <rect width="3" height="36" x={-9} y={+yoffset - 17.5} />"
                      <rect width="3" height="36" x={-3} y={+yoffset - 17.5} />"
                      <rect width="3" height="36" x={+3} y={+yoffset - 17.5} />"
                      <rect width="3" height="36" x={9} y={+yoffset - 17.5} />"
                      <rect width="36" height="3" x={-18} y={+yoffset + 9} />"
                      <rect width="36" height="3" x={-18} y={+yoffset - 9} />"
                      <rect width="36" height="3" x={-18} y={+yoffset - 3} />"
                      <rect width="36" height="3" x={-18} y={+yoffset + 3} />"
                    </g>
                  </g>
                }
                {yoffset === 0 &&
                  <g transform='scale (0.3996 1.25)'>
                    <rect width='36' height='36' fill={alarmColor} x={-18} y={+yoffset - 17.5} transform='rotate(15,0,0) ' fillOpacity="0" />
                    <g
                      fill={props.componentGradient === true ? 'url(#' + props.systemName + 'Harp-gradient)' : alarmColor}
                      filter={props.componentShadow === true ? "url(#" + props.systemName + "HarpShadow)" : ""}
                      transform='rotate(15,0,0) '
                    >
                      <rect width="3" height="12" x={-9} y={+yoffset + 6.5} />"
                      <rect width="3" height="14" x={-3} y={+yoffset + 4.5} />"
                      <rect width="3" height="16" x={+3} y={+yoffset + 2.5} />"
                      <rect width="3" height="16" x={-9} y={+yoffset - 17.5} />"
                      <rect width="3" height="14" x={-3} y={+yoffset - 17.5} />"
                      <rect width="3" height="16" x={+3} y={+yoffset - 17.5} />"
                      <rect width="3" height="36" x={9} y={+yoffset - 17.5} />"
                      <rect width="36" height="3" x={-18} y={+yoffset + 9} />"
                      <rect width="36" height="3" x={-18} y={+yoffset - 9} />"
                      <rect width="18" height="3" x={0} y={+yoffset - 3} />"
                      <rect width="18" height="3" x={0} y={+yoffset + 3} />"
                    </g>
                  </g>
                }

                <text style={{ fill: theme.palette.text.primary }}
                  x={0}
                  y={+yoffset - 40}
                  textAnchor='middle'
                  filter={props.textShadow === true ? "url(#" + props.systemName + "HarpShadow)" : ""}
                >
                  {props.usePvLabel === true ? state.label : props.label}
                </text>
              </g>
            </g>
          }
          {(initialized === false || initialized === 'undefined') &&
            <g transform={'translate(' + props.cx + ',' + props.cy + ')'}>
              <linearGradient id={props.systemName + 'Harp-gradient'} gradientTransform="rotate(0)">
                <stop offset="0%" stopOpacity="0" />
                <stop offset="90%" stopColor={'grey'} />
              </linearGradient>
              <g transform='scale (0.3996 1.25)'>
                <rect width='36' height='36' fill={alarmColor} x={-18} y={+yoffset - 17.5} transform='rotate(15,0,0) ' fillOpacity="0" />
                <g
                  fill={'grey'}
                  filter={props.componentShadow === true ? "url(#" + props.systemName + "HarpShadow)" : ""}
                  transform='rotate(15,0,0) '
                >
                  <rect width="3" height="36" x={-9} y={+yoffset - 17.5} />"
                  <rect width="3" height="36" x={-3} y={+yoffset - 17.5} />"
                  <rect width="3" height="36" x={+3} y={+yoffset - 17.5} />"
                  <rect width="3" height="36" x={9} y={+yoffset - 17.5} />"
                  <rect width="36" height="3" x={-18} y={+yoffset + 9} />"
                  <rect width="36" height="3" x={-18} y={+yoffset - 9} />"
                  <rect width="36" height="3" x={-18} y={+yoffset - 3} />"
                  <rect width="36" height="3" x={-18} y={+yoffset + 3} />"
                </g>
              </g>

              <text style={{ fill: 'grey' }}
                x={0}
                y={+yoffset - 40}
                textAnchor='middle'
                filter={props.textShadow === true ? "url(#" + props.systemName + "HarpShadow)" : ""}
              >
                {props.usePvLabel === true ? state.label : props.label}
              </text>
            </g>
          }
        </g>
      </Tooltip>
    </g>
  );
};

export default Harp;
