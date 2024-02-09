import React,{useState} from 'react'
import Button from '@mui/material/Button';
import Widget from "../SystemComponents/Widgets/Widget";
import withStyles from '@mui/styles/withStyles';
import { svgHeight, svgCenterY, svgWidth, svgCenterX } from "../SystemComponents/svgConstants";
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { styled } from "@mui/material/styles";
import { useTheme } from '@mui/system';


const TextLabel = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary
}));



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
const HarpComponent = (props) => {
  const theme=useTheme();
  const [dialogOpen,setDialogOpen]=useState(false);

  const handleYes = () => {
    let newValue=props.value==1?0:1;
    props.handleImmediateChange(newValue);
    setDialogOpen(false);
  };

  const handleOnClick = () => {
    let newValue=props.value==1?0:1;
    props.handleImmediateChange(newValue)
  };

  let yOffset = 0;
  const { classes } = props;
  const { initialized } = props;

  const { alarmSeverity } = props;
  const {value}=props;
  const {pvsData}=props;
  let isIn=true;
  let isOut=false;
  let isMoving=false;
  let inLimitPvIndex;
  let inLimitPv;
  if (props.inLimitPv){
    inLimitPvIndex=0;
    inLimitPv=pvsData[inLimitPvIndex];
  }
  else {
    inLimitPvIndex=-1;
  }

  let outLimitPvIndex;
  let outLimitPv;
  if (props.inLimitPv){
    outLimitPvIndex=1;
    outLimitPv=pvsData[inLimitPvIndex+outLimitPvIndex];
  }
  else {
    outLimitPvIndex=-1;
  }

  let isMovingPvIndex;
  let isMovingPv;
  if (props.inLimitPv){
    isMovingPvIndex=2;
    isMovingPv=pvsData[inLimitPvIndex+outLimitPvIndex+outLimitPvIndex];
  }
  else {
    outLimitPvIndex=-1;
  }

  if (initialized) {
    let inValue=props.inLimitPv?inLimitPv.value:value;
    let inLimitValue=props.inLimitValue?props.inLimitValue:1;

    isIn = inValue==inLimitValue;
    let outValue=props.outLimitPv?outLimitPv.value:value;
    let outLimitValue=props.outLimitValue?props.outLimitValue:1;
    isOut = outValue==outLimitValue;

    let isMovingValue=props.isMovingPv?isMovingPv.value:value;
    let isMovingValueValid=props.isMovingValue?props.isMovingValue:1;

    isMoving=props.isMovingValue?isMovingValue==isMovingValueValid:(!(isIn||isOut));
    yOffset =isIn?0:-35;
  }
  else {
    yOffset = 0;
  }

  let color = '';
  if (initialized) {
    if (props.alarmSensitive !== 'undefined') {
      if (props.alarmSensitive == true) {
        if (alarmSeverity == 1) {
          color = theme.palette.alarm.minor.main;
        }
        else if (alarmSeverity == 2) {
          color = theme.palette.alarm.major.main;
        }
        else {
          if (isMoving) {
            color='#f9e500';
          }
          else {
            color = theme.palette.beamLineComponent.main;
          }
        }
      }
    }
  }
  else {
    color = 'grey';
  }

  const componentId = uuidv4();

  return (
    <svg
      x={props.x}
      y={props.y}

      width={svgWidth}
      height={svgHeight}
    >
      <g
        transform={'translate(' + svgCenterX + ',' + (svgCenterY) + ')'}
      >
        <g>
          {(props.maxHarpsReached === false) &&
            <Dialog
              open={dialogOpen}
              TransitionComponent={Transition}
              keepMounted
              onClose={()=>setDialogOpen(false)}
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
                <Button onClick={()=>setDialogOpen(false)} color="primary">
                  No
                      </Button>
                <Button onClick={handleYes} color="primary">
                  Yes
                      </Button>
              </DialogActions>
            </Dialog>
          }
          {(props.maxHarpsReached === true) && <Dialog
              open={dialogOpen}
              TransitionComponent={Transition}
              keepMounted
              onClose={()=>setDialogOpen(false)}
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

                <Button onClick={()=>setDialogOpen(false)} color="primary">
                  Ok
                    </Button>
              </DialogActions>
            </Dialog>
          }
          <linearGradient id={componentId + 'Harp-gradient'} gradientTransform="rotate(0)">
            <stop offset="0%" stopColor='grey' />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
          <defs>
            <filter id={componentId + "HarpShadow"} x="0" y="0" width="600%" height="500%">
              <feOffset result="offOut" in="SourceGraphic" dx="2" dy="2" />
              <feColorMatrix result="matrixOut" in="offOut" type="matrix"
                values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
              <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="1" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
          </defs>
          <g
            onClick={isIn?handleOnClick:()=>setDialogOpen(true)}
          >
            {yOffset !== 0 &&
              <g transform='scale (0.3996 1.25)'>
                <rect width='36' height='36' fill={color} x={-18} y={+yOffset - 17.5} transform='rotate(15,0,0) ' fillOpacity="0" />
                <g
                  fill={props.componentGradient === true ? 'url(#' + componentId + 'Harp-gradient)' : color}
                  filter={props.componentShadow === true ? "url(#" + componentId + "HarpShadow)" : ""}
                  transform='rotate(15,0,0) '
                >
                  <rect width="3" height="36" x={-9} y={+yOffset - 17.5} />"
                  <rect width="3" height="36" x={-3} y={+yOffset - 17.5} />"
                  <rect width="3" height="36" x={+3} y={+yOffset - 17.5} />"
                  <rect width="3" height="36" x={9} y={+yOffset - 17.5} />"
                  <rect width="36" height="3" x={-18} y={+yOffset + 9} />"
                  <rect width="36" height="3" x={-18} y={+yOffset - 9} />"
                  <rect width="36" height="3" x={-18} y={+yOffset - 3} />"
                  <rect width="36" height="3" x={-18} y={+yOffset + 3} />"
                </g>
              </g>
            }
            {yOffset === 0 &&
              <g transform='scale (0.3996 1.25)'>
                <rect width='36' height='36' fill={color} x={-18} y={+yOffset - 17.5} transform='rotate(15,0,0) ' fillOpacity="0" />
                <g
                  fill={props.componentGradient === true ? 'url(#' + componentId + 'Harp-gradient)' : color}
                  filter={props.componentShadow === true ? "url(#" + componentId + "HarpShadow)" : ""}
                  transform='rotate(15,0,0) '
                >
                  <rect width="3" height="12" x={-9} y={+yOffset + 6.5} />"
                  <rect width="3" height="14" x={-3} y={+yOffset + 4.5} />"
                  <rect width="3" height="16" x={+3} y={+yOffset + 2.5} />"
                  <rect width="3" height="16" x={-9} y={+yOffset - 17.5} />"
                  <rect width="3" height="14" x={-3} y={+yOffset - 17.5} />"
                  <rect width="3" height="16" x={+3} y={+yOffset - 17.5} />"
                  <rect width="3" height="36" x={9} y={+yOffset - 17.5} />"
                  <rect width="36" height="3" x={-18} y={+yOffset + 9} />"
                  <rect width="36" height="3" x={-18} y={+yOffset - 9} />"
                  <rect width="18" height="3" x={0} y={+yOffset - 3} />"
                  <rect width="18" height="3" x={0} y={+yOffset + 3} />"
                </g>
              </g>
            }

            <TextLabel
              x={0}
              y={+yOffset - 40+ props.labelOffsetY}
              textAnchor='middle'
              filter={props.textShadow === true ? "url(#" + componentId + "HarpShadow)" : ""}
            >
              {props.label}
            </TextLabel>
          </g>
        </g>
      </g>
    </svg>
  );
}

/**
* Harp Beam line component
*
*  The label, min, max, units, pv and tooltip all accept macros that can be replaced by the values defined in the macros prop.
*/
const Harp = (props) => {
  let pvs=[];
  if( typeof props.isMovingPv!=='undefined'){
    pvs=[props.inLimitPv, props.outLimitPv, props.isMovingPv]
  }
  else{
    pvs=[props.inLimitPv, props.outLimitPv]
  }

  return (
    <Widget svgWidget={true}  {...props} component={HarpComponent}
      pvs={pvs}
      label={props.label} />

  )
}

Harp.propTypes = {
  /**
  * Directive to use the  alarm severity status to alter the fields background color.
  */
  alarmSensitive: PropTypes.bool,
  /**
   * Custom PV to define the alarm severity to be used, alarmSensitive must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  alarmPv: PropTypes.string,
  /**
   * If defined, then the DataConnection and
   * the widget debugging information will be displayed.
   */
  debug: PropTypes.bool,

  /**
   * Local variable initialization value.
   * When using loc:// type PVs.
   */
  initialLocalVariableValue: PropTypes.string,
  /**
   * Custom label to be used, if  usePvLabel is not defined.
   */
  label: PropTypes.string,
  /**
  * Custom PV to define the units to be used, usePvLabel must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
  */
  labelPv: PropTypes.string,
  /**
   * Values of macros that will be substituted in the pv name.
   * eg. {{'$(device)':'testIOC','$(id)':'2'}}
   */
  macros: PropTypes.object,

  /**
   * Directive to prevent more harps being inserted if the maximum is reached.
   */
  maxHarpsReached: PropTypes.bool,

  /**
   * Directive to fill the component's label with
   * the value contained in the  pv metadata's DESC field or the labelPv value.
   * If not defined it uses the custom label as defined by the label prop.
   */
  usePvLabel: PropTypes.bool,
  /**
   * When using EPICS, the RAS pv's metadata is conventionally derived from the pyEpics PV in the pvserver.
   * The pyEpics metadata is unfortunately static and the values used will be the initial values that pvserver receives when it connects the first time.
   * This is sufficient in most cases except when the user wants to dynamically update the metaData.
   * In this case a direct connection can be made to all the pv fields by setting useMetadata to false.
   * If any of the metadata pvs are defined i.e unitsPv then the PV makes a new data  connection to this alternate pv and will
   * use the value provided by this pv as the units.
   * The same is the case for the precPV, labelPv, alarmPv, unitsPv and minPv.
   * By setting useMetadata to false also enables connection to other variables as defined by different protocols.
   */
  useMetadata: PropTypes.bool,

  /**
   * Directive to use PV's string values.
   */
  useStringValue: PropTypes.bool,

  /** Name of the pv process variable that sends the command 1 for out and 0 for in, eg. '$(device):test$(id)'*/
  pv: PropTypes.string,
  /** Name of the `in` limit pv process variable, if not defined the pv value==0 is used , eg. '$(device):test$(id)'*/
  inLimitPv: PropTypes.string,
  /** Value to override the default value inLimitPv value is compared too. Valid values: `1` or `0` */
  inLimitValue: PropTypes.number,
  /** Name of the `out` limit pv process variable, if not defined the pv value==1 is used , eg. '$(device):test$(id)'*/
  outLimitPv: PropTypes.string,
  /** Value to override the default value outLimitPv value is compared too. Valid values: `1` or `0` */
  outLimitValue: PropTypes.number,
  /** Name of the `is Moving` pv process variable, if not defined it is not used , eg. '$(device):test$(id)'*/
  isMovingPv: PropTypes.string,
  /** Value to override the default value isMovingPv value is compared too. Valid values: `1` or `0` */
  isMovingValue: PropTypes.number,
  /**
   * Tooltip Text
   */
  tooltip: PropTypes.string,
  /**
   * Directive to show the tooltip
   */
  showTooltip: PropTypes.bool,
  /**
   *  Any of the MUI Tooltip props can applied by defining them as an object
   */
  tooltipProps: PropTypes.object,
  /**
   *  A System description object the passed to the callback function when the item is clicked on
   */
  system: PropTypes.object,
  /**
   *  A callback function when the item is clicked on, returns the system object
   */
  handleOnClick: PropTypes.func,
  /**
   * Y Offset for the label
   */
  labelOffsetY: PropTypes.number,
  /**
   * X Offset for the label
   */
  labelOffsetX: PropTypes.number,
  /**
   * Y Offset for the pv value
   */
  valueOffsetY: PropTypes.number,
  /**
   * X Offset for the pv value
   */
  valueOffsetX: PropTypes.number,
  /**
   * enable a shadow behind the text
   */
  textShadow: PropTypes.bool,
  /**
   * use a gradient fil on the component
   */
  componentGradient: PropTypes.bool,
  /**
   * enable a shadow behind the component
   */
  componentShadow: PropTypes.bool,
  /**
   * Direct to show the label
   */
  showLabel: PropTypes.bool,
  /**
   * Direct to show the value
   */
  showValue: PropTypes.bool,
};

Harp.defaultProps = {
  debug: false,
  showLabel: true,
  showValue: true,
  alarmSensitive: false,
  showTooltip: false,
  labelOffsetY: 0,
  labelOffsetX: 0,
  valueOffsetY: 0,
  valueOffsetX: 0,
  componentShadow: false,
  textShadow: false,
  componentGradient: true,
};

export default Harp;
