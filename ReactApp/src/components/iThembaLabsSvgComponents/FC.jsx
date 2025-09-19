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
import Tooltip from '@mui/material/Tooltip';
import ContextMenu from '../SystemComponents/ContextMenu';
import { useTheme } from '@mui/material/styles';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
const FC = (props) => {
  useEffect(() => {
     console.warn(
        "This component is deprecated and will be removed in RAS in V8.0.0."
      );
    }, []);
  const context = useContext(AutomationStudioContext);
  const theme = useTheme();

  const safetyOkPV = props.systemName + ':get-status.B1';
  const safetyAlarmPV = props.systemName + ':get-status.B0';
  const airPressurePV = props.systemName + ':get-status.B2';
  const HvPV = props.systemName + ':get-status.B3';
  const opActInPV = props.systemName + ':get-status.B4';
  const movingPV = props.systemName + ':get-status.B5';
  const inPV = props.systemName + ':get-status.B6';
  const outPV = props.systemName + ':get-status.B7';
  const statusPV = props.systemName + ':get-statusText';
  const commandPV = props.systemName + ':put-outIn';
  let initialPvs = {};

  initialPvs['safetyOkPV'] = { initialized: false, pvname: safetyOkPV, value: "", char_value: "" }
  initialPvs['safetyAlarmPV'] = { initialized: false, pvname: safetyAlarmPV, value: "", char_value: "" }
  initialPvs['airPressurePV'] = { initialized: false, pvname: airPressurePV, value: "", char_value: "" }
  initialPvs['opActInPV'] = { initialized: false, pvname: opActInPV, value: "", char_value: "" }
  initialPvs['HvPV'] = { initialized: false, pvname: HvPV, value: "", char_value: "" }
  initialPvs['movingPV'] = { initialized: false, pvname: movingPV, value: "", char_value: "" }
  initialPvs['inPV'] = { initialized: false, pvname: inPV, value: "", char_value: "" }
  initialPvs['outPV'] = { initialized: false, pvname: outPV, value: "", char_value: "" }

  initialPvs['statusPV'] = { initialized: false, pvname: statusPV, value: "", char_value: "" }
  initialPvs['commandPV'] = { initialized: false, pvname: commandPV, value: "", char_value: "" }
  let contextPVs = [];
  for (let item in initialPvs) {
    contextPVs.push(initialPvs[item]);
  }

  const [state, setState] = useState({
    pvs: initialPvs,
    newCommandTrigger: 0,
    contextPVs: contextPVs,
    openContextMenu: false,
    'open': false,
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

  const handleOnClick = (device) => (event) => {
    console.log("In FC: clicked " + device.toString());
    let pvs = state.pvs;
    if ((pvs['inPV'].value == 1)) {
      const status = pvs['statusPV'].value;
      if (status === 'In') {
        setState(prev => {
          let newPvs = { ...prev.pvs };
          newPvs['commandPV'].value = 0;
          return {
            ...prev,
            pvs: newPvs,
            newCommandTrigger: prev.newCommandTrigger + 1,
          };
        });
      }
      else {
        setState(prev => ({ ...prev, open: true }));
      }
    }
    else {
      setState(prev => {
        let newPvs = { ...prev.pvs };
        newPvs['commandPV'].value = 1;
        return {
          ...prev,
          pvs: newPvs,
          newCommandTrigger: prev.newCommandTrigger + 1,
        };
      });
    }
  };

  const handleYes = () => {
    setState(prev => {
      let pvs = { ...prev.pvs };
      pvs['commandPV'].value = 1;
      return {
        ...prev,
        pvs: pvs,
        newCommandTrigger: prev.newCommandTrigger + 1,
        open: false
      };
    });
  };

  const handleOk = () => {
    setState(prev => ({ ...prev, open: false }));
  };

  const handleNo = () => {
    setState(prev => ({ ...prev, open: false }));
  };

  const handleContextMenuClose = (event) => {
    setState(prev => ({ ...prev, openContextMenu: false }));
  };

  const handleToggleContextMenu = (event) => {
    event.persist()
    setState(prev => ({ ...prev, openContextMenu: !prev.openContextMenu, x0: event.pageX, y0: event.pageY }));
    event.preventDefault();
  };

  const pvs = state.pvs;
  const severity = state.severity;

  const initialized = ((pvs['commandPV'].initialized) && (pvs['statusPV'].initialized) && (pvs['safetyAlarmPV'].initialized) && (pvs['safetyOkPV'].initialized) && (pvs['airPressurePV'].initialized) && (pvs['opActInPV'].initialized) && pvs['movingPV'].initialized && (pvs['HvPV'].initialized) && (pvs['inPV'].initialized) && (pvs['outPV'].initialized));

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

  let yoffset = 0;
  let fcFault = false;
  let fcFaultString = ""
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
    fcFault = true;
    fcFaultString += " [Air pressure]"
  }
  if (pvs['HvPV'].value == 1) {
    alarmColor = '#FF8E53';
    fcFault = true;
    fcFaultString += " [HV Bias]"
  }

  if (pvs['safetyAlarmPV'].value == 1) {
    alarmColor = '#E20101';
    fcFault = true;
    fcFaultString += " [Safety Alarm]"
  }
  if (pvs['safetyOkPV'].value == 1) {
    alarmColor = '#E20101';
    fcFault = true;
    fcFaultString += " [Safety Ok]"
  }
  if (fcFaultString.length > 0) {
    fcFaultString = "Faults: " + fcFaultString;
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
        <Dialog
          open={state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby={"alert-dialog-slide-title"+props.systemName}
          aria-describedby={"alert-dialog-slide-description"+props.systemName}
        >
          <DialogTitle id={"alert-dialog-slide-title"+props.systemName}>
            "Error!"
          </DialogTitle>
          <DialogContent>
            <DialogContentText id={"alert-dialog-slide-description"+props.systemName}>
              Faraday cup {props.systemName} is interlocked! {fcFaultString}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOk} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Tooltip disableHoverListener={!fcFault} title={fcFaultString}>
          <g  onClick={handleOnClick(props.systemName)}  onContextMenu={handleToggleContextMenu}>
            <DataConnection
              pv={state.pvs['commandPV'].pvname}
              newValueTrigger={state.newCommandTrigger}
              handleInputValue={handleInputValue('commandPV')}
              handleMetadata={handleMetadata('commandPV')}
              outputValue=  {state.pvs['commandPV'].value}
            />
            <DataConnection pv={state.pvs['statusPV'].pvname} handleInputValue={handleInputValue('statusPV')} handleMetadata={handleMetadata('statusPV')} />
            <DataConnection pv={state.pvs['safetyOkPV'].pvname} handleInputValue={handleInputValue('safetyOkPV')} handleMetadata={handleMetadata('safetyOkPV')}/>
            <DataConnection pv={state.pvs['safetyAlarmPV'].pvname} handleInputValue={handleInputValue('safetyAlarmPV')} handleMetadata={handleMetadata('safetyAlarmPV')}/>
            <DataConnection pv={state.pvs['airPressurePV'].pvname} handleInputValue={handleInputValue('airPressurePV')} handleMetadata={handleMetadata('airPressurePV')}/>
            <DataConnection pv={state.pvs['opActInPV'].pvname} handleInputValue={handleInputValue('opActInPV')} handleMetadata={handleMetadata('opActInPV')}/>
            <DataConnection pv={state.pvs['HvPV'].pvname} handleInputValue={handleInputValue('HvPV')} handleMetadata={handleMetadata('HvPV')}/>
            <DataConnection pv={state.pvs['movingPV'].pvname} handleInputValue={handleInputValue('movingPV')} useStringValue={false} handleMetadata={handleMetadata('movingPV')}/>
            <DataConnection pv={state.pvs['inPV'].pvname} handleInputValue={handleInputValue('inPV')} handleMetadata={handleMetadata('inPV')} />
            <DataConnection pv={state.pvs['outPV'].pvname} handleInputValue={handleInputValue('outPV')} handleMetadata={handleMetadata('outPV')} />

            {initialized===true &&
              <g>
                <linearGradient id={props.systemName+'FC-gradient'} gradientTransform="rotate(0)">
                  <stop offset="0%" stopColor={'silver'} />
                  <stop offset="65%" stopColor={alarmColor} />
                </linearGradient>
                <defs>
                  <filter id={props.systemName+"FCShadow"} x="0" y="0" width="600%" height="500%">
                    <feOffset result="offOut" in="SourceGraphic" dx="2.5" dy="2.5" />
                    <feColorMatrix result="matrixOut" in="offOut" type="matrix"
                    values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
                    <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2.5" />
                    <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                  </filter>
                </defs>

                <g
                  fill={props.componentGradient===true?'url(#'+props.systemName+'FC-gradient)':alarmColor}
                  filter={props.componentShadow===true?"url(#"+props.systemName+"FCShadow)":"" }
                  transform={'translate('+props.cx+','+props.cy+')'}
                >
                  {yoffset!==0&&  <g transform={'translate(0,-1140)'}>
                    <path
                      d="m 3.2879796,1122.4204 c -1.2852323,-0.084 -1.5029316,-0.1209 -1.1719195,-0.2014 0.1791184,-0.043 0.5666595,-0.2704 0.7975976,-0.4662 1.6785753,-1.4252 3.0788061,-5.7048 3.6656823,-11.2038 0.195042,-1.8277 0.2763907,-3.29 0.297677,-5.351 0.036502,-3.535 -0.1932037,-6.6349 -0.7107832,-9.5922 -0.3826264,-2.1864 -0.8317616,-3.8473 -1.4551449,-5.3815 -0.7283328,-1.7928 -1.587264,-2.9311 -2.4746797,-3.2803 -0.1952031,-0.078 -0.2017864,-0.084 -0.1106923,-0.1093 0.1205222,-0.035 1.2221931,-0.1066 2.1584862,-0.1411 1.1404741,-0.043 2.8140282,0.053 4.2616262,0.2503 5.8683487,0.7943 11.1733747,3.604 14.5144387,7.6873 0.570693,0.6973 0.880617,1.1339 1.370907,1.931 1.558755,2.5337 2.323424,5.1761 2.323424,8.0286 0,2.2956 -0.525865,4.5248 -1.575169,6.6774 -0.209551,0.4298 -0.747136,1.3504 -1.095266,1.8757 -2.376667,3.5854 -6.32174,6.4653 -10.9765,8.0124 -2.645862,0.8797 -5.4712766,1.3212 -8.3253487,1.3007 -0.5555337,0 -1.2279842,-0.029 -1.4943364,-0.037 z"
                    />
                    <ellipse
                      cx="1.4687502"
                      cy="1104.5706"
                      rx="5.3938155"
                    ry="17.737566" />
                  </g>
                  }

                  {yoffset===0&&  <g transform={'translate(0,-1102.5)'}>
                    <path
                      d="m 3.2879796,1122.4204 c -1.2852323,-0.084 -1.5029316,-0.1209 -1.1719195,-0.2014 0.1791184,-0.043 0.5666595,-0.2704 0.7975976,-0.4662 1.6785753,-1.4252 3.0788061,-5.7048 3.6656823,-11.2038 0.195042,-1.8277 0.2763907,-3.29 0.297677,-5.351 0.036502,-3.535 -0.1932037,-6.6349 -0.7107832,-9.5922 -0.3826264,-2.1864 -0.8317616,-3.8473 -1.4551449,-5.3815 -0.7283328,-1.7928 -1.587264,-2.9311 -2.4746797,-3.2803 -0.1952031,-0.078 -0.2017864,-0.084 -0.1106923,-0.1093 0.1205222,-0.035 1.2221931,-0.1066 2.1584862,-0.1411 1.1404741,-0.043 2.8140282,0.053 4.2616262,0.2503 5.8683487,0.7943 11.1733747,3.604 14.5144387,7.6873 0.570693,0.6973 0.880617,1.1339 1.370907,1.931 1.558755,2.5337 2.323424,5.1761 2.323424,8.0286 0,2.2956 -0.525865,4.5248 -1.575169,6.6774 -0.209551,0.4298 -0.747136,1.3504 -1.095266,1.8757 -2.376667,3.5854 -6.32174,6.4653 -10.9765,8.0124 -2.645862,0.8797 -5.4712766,1.3212 -8.3253487,1.3007 -0.5555337,0 -1.2279842,-0.029 -1.4943364,-0.037 z"
                    />
                    <path
                      d="m -3.4638833,1099.367 c 0.01624,-0.077 0.059926,-0.436 0.09708,-0.7969 0.1854184,-1.8013 0.5258377,-3.7387 0.9499126,-5.4062 1.0059446,-3.9555 2.51391862,-6.281 4.072973,-6.2813 0.7660926,-10e-5 1.7048315,0.7373 2.3701022,1.8616 1.1741882,1.9845 2.0908626,5.3614 2.5739082,9.4821 0.052385,0.4469 0.0955,0.918 0.095813,1.0469 l 5.669e-4,0.2344 h -5.094941 -5.094941 z"
                    />
                    <path
                      d="m 0.8923237,1122.0693 c -1.9504533,-0.9228 -3.6344723,-5.5142 -4.280598,-11.6711 l -0.080348,-0.7656 h 5.082547 5.0825471 l -5.625e-4,0.2031 c -3.125e-4,0.1117 -0.043324,0.5688 -0.095583,1.0156 -0.7019438,6.0025 -2.2939508,10.2889 -4.1370302,11.1386 -0.1798115,0.083 -0.34319,0.1771 -0.3630636,0.2092 -0.019874,0.032 -0.210255,0.058 -0.42307,0.058 -0.3004544,0 -0.4758687,-0.042 -0.7848344,-0.1882 z"
                    />
                  </g>
                  }
                </g>
                <text style={{ fill: theme.palette.text.primary }}
                  x={typeof props.labelOffsetX!=='undefined'?props.labelOffsetX+props.cx+12:props.cx+12}
                  y={typeof props.labelOffsetY!=='undefined'?props.labelOffsetY+props.cy+yoffset-40:+props.cy+yoffset-40}
                  textAnchor='middle'
                  filter={props.textShadow===true?"url(#"+state.pvname+"FCShadow)":""
                  }
                >
                  {props.label}
                </text>
              </g>
            }
            {(initialized===false||initialized==='undefined') &&
              <g>
                <linearGradient id="FC-gradient">
                  <stop offset="0%" stopOpacity="0" />
                  <stop offset="75%" stopColor={'grey'} />
                </linearGradient>
                <linearGradient id={props.systemName+'FC-gradient'} gradientTransform="rotate(0)">
                  <stop offset="0%" stopColor='silver' />
                  <stop offset="65%" stopColor={'grey'} />
                </linearGradient>
                <defs>
                  <filter id={props.systemName+"FCShadow"} x="0" y="0" width="600%" height="500%">
                    <feOffset result="offOut" in="SourceGraphic" dx="7.5" dy="7.5" />
                    <feColorMatrix result="matrixOut" in="offOut" type="matrix"
                    values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
                    <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="5" />
                    <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                  </filter>
                </defs>

                <g
                  fill={props.componentGradient===true?'url(#'+props.systemName+'FC-gradient)':'grey'}
                  filter={props.componentShadow===true?"url(#"+props.systemName+"FCShadow)":"" }
                  transform={'translate('+props.cx+','+props.cy+')'}
                >
                  <g transform={'translate(0,-1102.5)'}>
                    <path
                      d="m 3.2879796,1122.4204 c -1.2852323,-0.084 -1.5029316,-0.1209 -1.1719195,-0.2014 0.1791184,-0.043 0.5666595,-0.2704 0.7975976,-0.4662 1.6785753,-1.4252 3.0788061,-5.7048 3.6656823,-11.2038 0.195042,-1.8277 0.2763907,-3.29 0.297677,-5.351 0.036502,-3.535 -0.1932037,-6.6349 -0.7107832,-9.5922 -0.3826264,-2.1864 -0.8317616,-3.8473 -1.4551449,-5.3815 -0.7283328,-1.7928 -1.587264,-2.9311 -2.4746797,-3.2803 -0.1952031,-0.078 -0.2017864,-0.084 -0.1106923,-0.1093 0.1205222,-0.035 1.2221931,-0.1066 2.1584862,-0.1411 1.1404741,-0.043 2.8140282,0.053 4.2616262,0.2503 5.8683487,0.7943 11.1733747,3.604 14.5144387,7.6873 0.570693,0.6973 0.880617,1.1339 1.370907,1.931 1.558755,2.5337 2.323424,5.1761 2.323424,8.0286 0,2.2956 -0.525865,4.5248 -1.575169,6.6774 -0.209551,0.4298 -0.747136,1.3504 -1.095266,1.8757 -2.376667,3.5854 -6.32174,6.4653 -10.9765,8.0124 -2.645862,0.8797 -5.4712766,1.3212 -8.3253487,1.3007 -0.5555337,0 -1.2279842,-0.029 -1.4943364,-0.037 z"
                    />

                    <path
                      d="m -3.4638833,1099.367 c 0.01624,-0.077 0.059926,-0.436 0.09708,-0.7969 0.1854184,-1.8013 0.5258377,-3.7387 0.9499126,-5.4062 1.0059446,-3.9555 2.51391862,-6.281 4.072973,-6.2813 0.7660926,-10e-5 1.7048315,0.7373 2.3701022,1.8616 1.1741882,1.9845 2.0908626,5.3614 2.5739082,9.4821 0.052385,0.4469 0.0955,0.918 0.095813,1.0469 l 5.669e-4,0.2344 h -5.094941 -5.094941 z"
                    />
                    <path
                      d="m 0.8923237,1122.0693 c -1.9504533,-0.9228 -3.6344723,-5.5142 -4.280598,-11.6711 l -0.080348,-0.7656 h 5.082547 5.0825471 l -5.625e-4,0.2031 c -3.125e-4,0.1117 -0.043324,0.5688 -0.095583,1.0156 -0.7019438,6.0025 -2.2939508,10.2889 -4.1370302,11.1386 -0.1798115,0.083 -0.34319,0.1771 -0.3630636,0.2092 -0.019874,0.032 -0.210255,0.058 -0.42307,0.058 -0.3004544,0 -0.4758687,-0.042 -0.7848344,-0.1882 z"
                    />
                  </g>
                </g>
                <text style={{ fill: 'grey' }}
                  x={typeof props.labelOffsetX!=='undefined'?props.labelOffsetX+props.cx+12:props.cx+12}
                  y={typeof props.labelOffsetY!=='undefined'?props.labelOffsetY+props.cy+yoffset-40:+props.cy+yoffset-40}
                  textAnchor='middle'
                  filter={props.textShadow===true?"url(#"+state.pvname+"FCShadow)":""
                  }
                >
                  {props.label}
                </text>
              </g>
            }
          </g>
        </Tooltip>
      </g>
    );
};

export default FC;
