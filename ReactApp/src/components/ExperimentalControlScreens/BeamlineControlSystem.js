import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import HarpRangeSelection from '../SiteSpecificComponents/iThembaLABS/CompoundComponents/HarpRangeSelection';
import ToggleButton from '../BaseComponents/ToggleButton';
import ActionButton from '../BaseComponents/ActionButton';

import EditorSinglePS from './Components/EditorSinglePS'
import EditorSlitXY from './Components/EditorSlitXY'
import EditorSteererXY from './Components/EditorSteererXY'

import HarpGraph from '../SiteSpecificComponents/iThembaLABS/CompoundComponents/HarpGraph';
import AppBar from '@material-ui/core/AppBar';
import GraphY from '../BaseComponents/GraphY';
import ControlTable from './Components/ControlTable'
import TraditionalLayout from '../UI/Layout/ComposedLayouts/TraditionalLayout.js';
import BeamLineCanvas from '../SvgBeamlineComponents/BeamLineCanvas';
import HorizontalBeamline from '../SvgBeamlineComponents/HorizontalBeamline';
import QuadrapoleMagnet from '../SvgBeamlineComponents/QuadrapoleMagnet';
import BendingMagnet from '../SvgBeamlineComponents/BendingMagnet';
import SteererYMagnet from '../SvgBeamlineComponents/SteererYMagnet';
import SteererXYMagnet from '../SvgBeamlineComponents/SteererXYMagnet';
import SlitXY from '../SvgBeamlineComponents/SlitXY';
import Harp from '../SvgBeamlineComponents/Harp';
import FC from '../SvgBeamlineComponents/FC';
import PV from '../SystemComponents/PV'
import { replaceMacros } from '../SystemComponents/Utils/macroReplacement';

/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
const VerticalTabs = withStyles(theme => ({
  flexContainer: {
    flexDirection: 'column'
  },
  indicator: {
    display: 'none',
  }
}))(Tabs)
const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1) * 2
  },
  paper: {
    padding: theme.spacing(1) * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 0, ...props.style }}>
      {props.children}
    </Typography>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
const BeamlineControlSystem = (props) => {
  const [tabValue, setTabValue] = useState(0);
  const [sideTabValue, setSideTabValue] = useState(0);
  const [editorType, setEditorType] = useState("");
  const [displayEditor, setDisplayEditor] = useState(false);
  const [editorSystem, setEditorSystem] = useState({});

  const [maxHarpsReached, setMaxHarpsReached] = useState(false);
  const [harpGraphsState,setHarpGraphsState]=useState({
    x0GraphPVs:[],
    y0GraphPVs:[],
    x0legend:[],
    y0legend:[],
    x0GraphKey:"",
    onlyY0:false,
    onlyX0:false,
    x1GraphPVs:[],
    y1GraphPVs:[],
    x1legend:[],
    y1legend:[],
    x1GraphKey:"",
  onlyY1:false,
  onlyX1:false,
  topXgraphYmax:0,
  topYgraphYmax:0, ///
  bottomYgraphYmax:0,
  bottomXgraphYmax:0,
  x0SystemName:undefined,
  x1SystemName:undefined,
  x0RangePV:undefined,
  x1RangePV:undefined,
  y0RangePV:undefined,
  y1RangePV:undefined,
  y0GraphKey:null,
  y1GraphKey:null,
  });
  const [topXgraphYmax, setTopXgraphYmax] = useState(0); ///
  const [topYgraphYmax, setTopYgraphYmax] = useState(0); ///
  const [bottomYgraphYmax, setBottomYgraphYmax] = useState(0);
  const [bottomXgraphYmax, setBottomXgraphYmax] = useState(0);
  const yOffset = 0;
  const handleTabChange = (event, value) => {
    setTabValue(value)
  };
  const handleOnSystemClick = (system) => {
    setEditorType(system.editorType)
    setDisplayEditor(true)
    setEditorSystem(system)
  }
  const harps = [];

  const [systems,setSystems] = useState({
    'BeamLine': {
      'PowerSupplies': {
        'Q1': {
          systemName: '$(IOC):$(device)',
          displayName: 'Q1',
          editorType: 'editorSinglePS',
          setpointPv: '$(IOC):$(device):Setpoint',
          readbackPv: '$(IOC):$(device):Readback',
          onOffPv: '$(IOC):$(device):On',
          statusTextPv: '$(IOC):$(device):On',
          scanPv: '$(IOC):$(device):SimReadback.SCAN',
          orocPv: '$(IOC):$(device):SimReadback.OROC',
          rampRatePv: '$(IOC):$(device):RampRate',
          macros:
          {
            '$(IOC)': 'pva://testIOC',
            '$(device)': 'PS1',
          },
          svgProps: {
            usePvUnits: true,
            alarmSensitive: true,
            componentShadow: true,
            textShadow: false,
            componentGradient: true,
            x: 100,
            y: yOffset,
            prec: 3,
          },
          tableProps: {
            prec: 3, units: "A", useStatus: true
          },
        },
        'Q2': {
          systemName: '$(IOC):$(device)',
          displayName: 'Q2',
          editorType: 'editorSinglePS',
          setpointPv: '$(IOC):$(device):Setpoint',
          readbackPv: '$(IOC):$(device):Readback',
          onOffPv: '$(IOC):$(device):On',
          statusTextPv: '$(IOC):$(device):On',
          scanPv: '$(IOC):$(device):SimReadback.SCAN',
          orocPv: '$(IOC):$(device):SimReadback.OROC',
          rampRatePv: '$(IOC):$(device):RampRate',
          macros:
          {
            '$(IOC)': 'pva://testIOC',
            '$(device)': 'PS2',
          },
          svgProps: {
            usePvUnits: true,
            alarmSensitive: true,
            componentShadow: true,
            textShadow: false,
            componentGradient: true,
            x: 250,
            y: yOffset,
            prec: 3,
          },
          tableProps: {
            prec: 3, units: "A", useStatus: true
          },
        },
        'Q3': {
          systemName: '$(IOC):$(device)',
          displayName: 'Q3',
          editorType: 'editorSinglePS',
          setpointPv: '$(IOC):$(device):Setpoint',
          readbackPv: '$(IOC):$(device):Readback',
          onOffPv: '$(IOC):$(device):On',
          statusTextPv: '$(IOC):$(device):On',
          scanPv: '$(IOC):$(device):SimReadback.SCAN',
          orocPv: '$(IOC):$(device):SimReadback.OROC',
          rampRatePv: '$(IOC):$(device):RampRate',
          macros:
          {
            '$(IOC)': 'pva://testIOC',
            '$(device)': 'PS3',
          },
          svgProps: {
            usePvUnits: true,
            alarmSensitive: true,
            componentShadow: true,
            textShadow: false,
            componentGradient: true,
            x: 450,
            y: yOffset,
            prec: 3,
          },
          tableProps: {
            prec: 3, units: "A", useStatus: true
          },
        },
        'BM1': {
          systemName: '$(IOC):$(device)',
          displayName: 'BM1',
          editorType: 'editorSinglePS',
          setpointPv: '$(IOC):$(device):Setpoint',
          readbackPv: '$(IOC):$(device):Readback',
          onOffPv: '$(IOC):$(device):On',
          statusTextPv: '$(IOC):$(device):On',
          scanPv: '$(IOC):$(device):SimReadback.SCAN',
          orocPv: '$(IOC):$(device):SimReadback.OROC',
          rampRatePv: '$(IOC):$(device):RampRate',
          macros:
          {
            '$(IOC)': 'pva://testIOC',
            '$(device)': 'PS4',
          },
          svgProps: {
            usePvUnits: true,
            alarmSensitive: true,
            componentShadow: true,
            textShadow: false,
            componentGradient: true,
            x: 600,
            y: yOffset,
            prec: 3,
          },
          tableProps: {
            prec: 3, units: "A", useStatus: true
          },
        },
        'STR1XY': {
          componentType: 'SteererXYMagnet',
          systemName: '$(IOC):$(device)',
          displayName: '$(device)XY',
          editorType: 'editorSteererXY',
          ySetpointPv: '$(IOC):$(device):Y:Setpoint',
          yReadbackPv: '$(IOC):$(device):Y:Readback',
          yOnPv: '$(IOC):$(device):Y:On',
          xSetpointPv: '$(IOC):$(device):X:Setpoint',
          xReadbackPv: '$(IOC):$(device):X:Readback',
          xOnPv: '$(IOC):$(device):X:On',
          //scanPv: '$(IOC):$(device):SimReadback.SCAN',
          //orocPv: '$(IOC):$(device):SimReadback.OROC',
          macros: {
            '$(IOC)': 'pva://testIOC',
            '$(device)': 'STR1',
          },
          svgProps: {
            x: 785, y: yOffset,
            usePvUnits: true, prec: 1, alarmSensitive: true,
            labelOffsetY: 0, labelOffsetX: 0, valueOffsetY: 0, valueOffsetX: 0,
            componentShadow: true, textShadow: false, componentGradient: true,
          },
          tableProps: {
            prec: 3, units: "A", useStatus: true
          },
        },
        'STR2XY': {
          componentType: 'SteererXYMagnet',
          systemName: '$(IOC):$(device)',
          displayName: '$(device)XY',
          editorType: 'editorSteererXY',
          ySetpointPv: '$(IOC):$(device):Y:Setpoint',
          yReadbackPv: '$(IOC):$(device):Y:Readback',
          yOnPv: '$(IOC):$(device):Y:On',
          xSetpointPv: '$(IOC):$(device):X:Setpoint',
          xReadbackPv: '$(IOC):$(device):X:Readback',
          xOnPv: '$(IOC):$(device):X:On',
          //scanPv: '$(IOC):$(device):SimReadback.SCAN',
          //orocPv: '$(IOC):$(device):SimReadback.OROC',
          macros: {
            '$(IOC)': 'pva://testIOC',
            '$(device)': 'STR2',
          },
          svgProps: {
            x: 800, y: yOffset,
            usePvUnits: true, prec: 1, alarmSensitive: true,
            labelOffsetY: 0, labelOffsetX: 0, valueOffsetY: 0, valueOffsetX: 0,
            componentShadow: true, textShadow: false, componentGradient: true,
            valueOffsetY: 30,
            labelOffsetY: -15
          },
          tableProps: {
            prec: 3, units: "A", useStatus: true
          },
        },
        'STR2': {
          componentType: 'SteererYMagnet',
          systemName: '$(IOC):$(device)',
          displayName: '$(device)$(XorY)',
          editorType: 'editorSinglePS',
          setpointPv: '$(IOC):$(device):$(XorY):Setpoint',
          readbackPv: '$(IOC):$(device):$(XorY):Readback',
          statusTextPv: '$(IOC):$(device):$(XorY):On',
          statusOnPv: '$(IOC):$(device):$(XorY):On',
      
          onOffPv: '$(IOC):$(device):$(XorY):On',
          macros: {
            '$(IOC)': 'pva://testIOC',
            '$(device)': 'STR2',
            '$(XorY)': 'Y'
          },
          svgProps: {
            x: 1100, y: yOffset,
            usePvUnits: true, prec: 1, alarmSensitive: true,
            labelOffsetY: 0, labelOffsetX: 0, valueOffsetY: 0, valueOffsetX: 0,
            componentShadow: true, textShadow: false, componentGradient: true
          },
          tableProps: {
            prec: 3, units: "A", useStatus: true
          },
        },
        'STR3': {
          componentType: 'SteererYMagnet',
          systemName: '$(IOC):$(device)',
          displayName: '$(device)$(XorY)',
          editorType: 'editorSinglePS',
          setpointPv: '$(IOC):$(device):$(XorY):Setpoint',
          readbackPv: '$(IOC):$(device):$(XorY):Readback',
          statusTextPv: '$(IOC):$(device):$(XorY):On',
         
          onOffPv: '$(IOC):$(device):$(XorY):On',
          macros: {
            '$(IOC)': 'pva://testIOC',
            '$(device)': 'STR3',
            '$(XorY)': 'Y'
          },
          svgProps: {
            x: 1200, y: yOffset,
            usePvUnits: true, prec: 1, alarmSensitive: true,
            labelOffsetY: 0, labelOffsetX: 0, valueOffsetY: 0, valueOffsetX: 0,
            componentShadow: true, textShadow: false, componentGradient: true
          },
          tableProps: {
            prec: 3, units: "A", useStatus: true
          },
        }
      },
      'Slits': {
        'SLITXY1': {
          componentType: 'SlitXY',
          systemName: '$(IOC):$(device)',
          displayName: '$(device)',
          editorType: 'editorSlitXY',
          xDriveOnPv: '$(IOC):$(device):X:Drive:On',
          yDriveOnPv: '$(IOC):$(device):Y:Drive:On',
          xGapReadbackPv: '$(IOC):$(device):X:Gap:Readback',
          yGapReadbackPv: '$(IOC):$(device):Y:Gap:Readback',
          xOffsetReadbackPv: '$(IOC):$(device):X:Offset:Readback',
          yOffsetReadbackPv: '$(IOC):$(device):Y:Offset:Readback',
          xGapSetpointPv: '$(IOC):$(device):X:Gap:Setpoint',
          yGapSetpointPv: '$(IOC):$(device):Y:Gap:Setpoint',
          xOffsetSetpointPv: '$(IOC):$(device):X:Offset:Setpoint',
          yOffsetSetpointPv: '$(IOC):$(device):Y:Offset:Setpoint',
          label: '$(device)',
          macros: {
            '$(IOC)': 'pva://testIOC',
            '$(device)': 'SLITXY1',
          },
          svgProps: {
            x: 900, y: yOffset,
            usePvUnits: true, prec: 1, alarmSensitive: true,
            labelOffsetY: 0, labelOffsetX: 0, valueOffsetY: 0, valueOffsetX: 0,
            componentShadow: true, textShadow: false, componentGradient: true
          },
          tableProps: {
            prec: 1, units: "mm", useStatus: true
          },
        },
        'SLITXY2': {
          componentType: 'SlitXY',
          systemName: '$(IOC):$(device)',
          displayName: '$(device)',
          editorType: 'editorSlitXY',
          xDriveOnPv: '$(IOC):$(device):X:Drive:On',
          yDriveOnPv: '$(IOC):$(device):Y:Drive:On',
          xGapReadbackPv: '$(IOC):$(device):X:Gap:Readback',
          yGapReadbackPv: '$(IOC):$(device):Y:Gap:Readback',
          xOffsetReadbackPv: '$(IOC):$(device):X:Offset:Readback',
          yOffsetReadbackPv: '$(IOC):$(device):Y:Offset:Readback',
          xGapSetpointPv: '$(IOC):$(device):X:Gap:Setpoint',
          yGapSetpointPv: '$(IOC):$(device):Y:Gap:Setpoint',
          xOffsetSetpointPv: '$(IOC):$(device):X:Offset:Setpoint',
          yOffsetSetpointPv: '$(IOC):$(device):Y:Offset:Setpoint',
          label: '$(device)',
          macros: {
            '$(IOC)': 'pva://testIOC',
            '$(device)': 'SLITXY2',
          },
          svgProps: {
            x: 1280, y: yOffset,
            usePvUnits: true, prec: 1, alarmSensitive: true,
            labelOffsetY: 0, labelOffsetX: 0, valueOffsetY: 0, valueOffsetX: 0,
            componentShadow: true, textShadow: false, componentGradient: true
          },
          tableProps: {
            prec: 1, units: "mm", useStatus: true
          },
        },
      },
      'Harps': {
        'Harp1': {
          maxHarpsReached: maxHarpsReached,
          x: 140,
          y: yOffset,
          alarmSensitive: true,
          textShadow: false,
          componentGradient: true,
          pv: 'pva://$(IOC):$(actuatorName):put-outIn',
          isMovingPv: 'pva://$(IOC):$(actuatorName):get-status.B5',
          inLimitPv: 'pva://$(IOC):$(actuatorName):get-status.B6',
          outLimitPv: 'pva://$(IOC):$(actuatorName):get-status.B7',
          inLimitValue: 1,
          outLimitValue: 1,
          isMovingValue: 1,
          label: '$(actuatorName)',
          systemName:'$(IOC):$(actuatorName)',
          macros: {
            '$(IOC)': 'testIOC',
            '$(actuatorName)': 'Harp1',
          }
        },
        Harp2: {
          maxHarpsReached: maxHarpsReached,
          x: 295,
          y: yOffset,
          alarmSensitive: true,
          textShadow: false,
          componentGradient: true,
          pv: 'pva://$(IOC):$(actuatorName):put-outIn',
          isMovingPv: 'pva://$(IOC):$(actuatorName):get-status.B5',
          inLimitPv: 'pva://$(IOC):$(actuatorName):get-status.B6',
          outLimitPv: 'pva://$(IOC):$(actuatorName):get-status.B7',
          inLimitValue: 1,
          outLimitValue: 1,
          isMovingValue: 1,
          label: '$(actuatorName)',
          systemName:'$(IOC):$(actuatorName)',
          macros: {
            '$(IOC)': 'testIOC',
            '$(actuatorName)': 'Harp2',
          }
        },
        Harp3: {
          maxHarpsReached: maxHarpsReached,
          x: 495,
          y: yOffset,
          alarmSensitive: true,
          textShadow: false,
          componentGradient: true,
          pv: 'pva://$(IOC):$(actuatorName):put-outIn',
          isMovingPv: 'pva://$(IOC):$(actuatorName):get-status.B5',
          inLimitPv: 'pva://$(IOC):$(actuatorName):get-status.B6',
          outLimitPv: 'pva://$(IOC):$(actuatorName):get-status.B7',
          inLimitValue: 1,
          outLimitValue: 1,
          isMovingValue: 1,
          label: '$(actuatorName)',
          systemName:'$(IOC):$(actuatorName)',
          macros: {
            '$(IOC)': 'testIOC',
            '$(actuatorName)': 'Harp3',
          }
        },
        Harp4: {
          maxHarpsReached: maxHarpsReached,
          x: 1150,
          y: yOffset,
          alarmSensitive: true,
          textShadow: false,
          componentGradient: true,
          pv: 'pva://$(IOC):$(actuatorName):put-outIn',
          isMovingPv: 'pva://$(IOC):$(actuatorName):get-status.B5',
          inLimitPv: 'pva://$(IOC):$(actuatorName):get-status.B6',
          outLimitPv: 'pva://$(IOC):$(actuatorName):get-status.B7',
          inLimitValue: 1,
          outLimitValue: 1,
          isMovingValue: 1,
          systemName:'$(IOC):$(actuatorName)',
          label: '$(actuatorName)',
          macros: {
            '$(IOC)': 'testIOC',
            '$(actuatorName)': 'Harp4',
          }
        }

      }
    }
  });
  const allSystems = { ...systems.BeamLine.PowerSupplies, ...systems.BeamLine.Slits }

  const [harpPvs, setHarpPvs] = useState({});
  const harpPvConnections = (harpSystems) => {
    let pvs = [];
    let index = 0;
    for (let harp in harpSystems) {
      
      pvs.push(
        <PV
        
          key={index.toString()}
          pv={harpSystems[harp].inLimitPv}
          macros={harpSystems[harp].macros}
          pvData={(pv) => setHarpPvs(prePvs => {
            let pvs = { ...prePvs }
           
            pvs[harp] = pv;
            return pvs

          }
          )}
        />)
      index++;
    }

    return pvs
  }
  useEffect(() => {
    let harp;
    let x0GraphPVs = [];
    let y0GraphPVs = [];
    let x0legend = [];
    let y0legend = [];
    let x0GraphKey = "x0Graph";
    let y0GraphKey = "y0Graph";
    let x1GraphPVs = [];
    let y1GraphPVs = [];
    let x0SystemName;
    let x1SystemName;
    let x0RangePV;
    let y0RangePV;
    let onlyY0 = false;
    let onlyX0 = false;
    let onlyY1 = false;
    let onlyX1 = false;
    let x1RangePV;
    let y1RangePV;
    let x1legend = [];
    let y1legend = [];
    let x1GraphKey = "x1Graph";
    let y1GraphKey = "y1Graph";
    let numberOfInsertedGraphs = 0;
    let numberOfInsertedHarps = 0;
    for (harp in harpPvs) {

      if (harpPvs[harp]) {
        let currentHarp=systems.BeamLine.Harps[harp];
        let systemName= replaceMacros(currentHarp.systemName,currentHarp.macros);
        let label=replaceMacros(currentHarp.label,currentHarp.macros);
        if (harpPvs[harp].value == 1) {
          if (numberOfInsertedGraphs === 0) {
            if (typeof currentHarp.onlyY !== 'undefined') {
              
              x0GraphPVs.push('pva://' + systemName + ':ycur');
              x0RangePV = 'pva://' + systemName + ':yrange';
              onlyY0 = true;
            }
            else {
              x0GraphPVs.push('pva://' + systemName + ':xcur');
              x0RangePV = 'pva://' + systemName + ':xrange';
              onlyY0 = false;
            }
            x0legend.push(label);
            x0GraphKey = x0GraphKey + systemName;
            x0SystemName = systemName;
            //    }
            if (typeof currentHarp.onlyX !== 'undefined') {
              y0GraphPVs.push('pva://' + systemName + ':xcur');
              y0RangePV = 'pva://' + systemName + ':xrange';
              onlyX0 = true;
            }
            else {
              y0GraphPVs.push('pva://' + systemName + ':ycur');
              y0RangePV = 'pva://' + systemName + ':yrange';
              onlyX0 = false;
            }
            y0GraphKey = y0GraphKey + systemName;
            y0legend.push(label);
            numberOfInsertedGraphs++;
          } else {
            if (typeof currentHarp.onlyY !== 'undefined') {
              x1GraphPVs.push('pva://' + systemName + ':ycur');
              x1RangePV = 'pva://' + systemName + ':yrange';
              onlyY1 = true;
            }
            else {
              x1GraphPVs.push('pva://' + systemName + ':xcur');
              x1RangePV = 'pva://' + systemName + ':xrange';
              onlyY1 = false;
            }
            if (typeof currentHarp.onlyX !== 'undefined') {
              y1GraphPVs.push('pva://' + systemName + ':xcur');
              y1RangePV = 'pva://' + systemName + ':xrange';
              onlyX1 = true;
            }
            else {
              y1GraphPVs.push('pva://' + systemName + ':ycur');
              y1RangePV = 'pva://' + systemName + ':yrange';
              onlyX1 = false;
            }
            x1legend.push(label);
            y1legend.push(label);
            x1GraphKey = x1GraphKey + systemName;
            y1GraphKey = y1GraphKey + systemName;
            x1SystemName = systemName;
            numberOfInsertedGraphs++;
          }




          numberOfInsertedHarps++;
        }
      }
    }
    if (numberOfInsertedHarps >= 2) {
      setMaxHarpsReached(true);
    }
    else {
      setMaxHarpsReached(false);
    }
    
    setHarpGraphsState({
          
          x0GraphPVs: x0GraphPVs,
          y0GraphPVs: y0GraphPVs,
          x0legend: x0legend,
          y0legend: y0legend,
          x0GraphKey: x0GraphKey,
          y0GraphKey: y0GraphKey,
          x1GraphPVs: x1GraphPVs,
          y1GraphPVs: y1GraphPVs,
          x1legend: x1legend,
          y1legend: y1legend,
          x1GraphKey: x1GraphKey,
          y1GraphKey: y1GraphKey,
          x0RangePV: x0RangePV,
          x1RangePV: x1RangePV,
          y0RangePV: y0RangePV,
          y1RangePV: y1RangePV,
          x0SystemName: x0SystemName,
          x1SystemName: x1SystemName,
          onlyX0: onlyX0,
          onlyX1: onlyX1,
          onlyY0: onlyY0,
          onlyY1: onlyY1
        })

  }, [harpPvs,systems.BeamLine.Harps])
  
  const footerContents = (
    <Grid container direction="row" justify="flex-start" alignItems="center" >
      <Grid item xs={12} style={{ paddingLeft: "1em" }}>
        <Typography>
          We are in the progress of migrating the original iThemba LABS demo components to reusable hooks components. Watch this space!
        </Typography>
      </Grid>
    </Grid>
   
  )

  const handleSideTabChange = (event, value) => {
    setSideTabValue(value)
  };
  
  return (
    <div style={{ "overflowX": "hidden", 'overflowY': 'hidden' }}>

      <TraditionalLayout
        title="Beamline Control System Example"
        denseAppBar
     

      >
        {harpPvConnections(systems.BeamLine.Harps)}
        <Grid container spacing={3} style={{ paddingTop: 16 }}>
          <Grid item sm={9}>
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <BeamLineCanvas
                  width="100%"
                  height="250"
                  svgProps={{ viewBox: "0 0 1410 250", preserveAspectRatio: "xMidYMid meet" }}
                >
                  <HorizontalBeamline
                    x={0}
                    y={yOffset}
                    pv={'pva://testIOC:BeamlineA:BeamOn'}
                    width={'113px'}
                  />
                  <HorizontalBeamline
                    x={'113px'}
                    y={yOffset}
                    pv={'pva://testIOC:BeamlineB:BeamOn'}
                    width={'148px'}
                  />
                  <HorizontalBeamline
                    x={'261px'}
                    y={yOffset}
                    pv={'pva://testIOC:BeamlineC:BeamOn'}
                    width={'150px'}
                  />
                  <HorizontalBeamline
                    x={'411px'}
                    y={yOffset}
                    pv={'pva://testIOC:BeamlineD:BeamOn'}
                    width={'150px'}
                  />
                  <HorizontalBeamline
                    x={'561px'}
                    y={yOffset}
                    pv={'pva://testIOC:BeamlineE:BeamOn'}
                    width={'850px'}
                  />
                  <FC
                    pv={'pva://$(IOC):$(actuatorName)$(sim):put-outIn'}
                    isMovingPv={'pva://$(IOC):$(actuatorName)$(sim):get-status.B5'}
                    inLimitPv={'pva://$(IOC):$(actuatorName)$(sim):get-status.B6'}
                    outLimitPv={'pva://$(IOC):$(actuatorName)$(sim):get-status.B7'}
                    inLimitValue={1}
                    outLimitValue={1}
                    isMovingValue={1}
                    maxFCsReached={false}
                    label={'$(actuatorName)'}
                    macros={{
                      '$(IOC)': 'testIOC',
                      '$(sim)': 'sim',
                      '$(actuatorName)': 'FC1',
                    }
                    }
                    x={38}
                    y={yOffset}
                    alarmSensitive={true}
                    componentGradient={true}
                  />
                  <Harp

                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.Harps.Harp1}
                    {...systems.BeamLine.Harps.Harp1}

                  />
                  <FC
                    pv={'pva://$(IOC):$(actuatorName)$(sim):put-outIn'}
                    isMovingPv={'pva://$(IOC):$(actuatorName)$(sim):get-status.B5'}
                    inLimitPv={'pva://$(IOC):$(actuatorName)$(sim):get-status.B6'}
                    outLimitPv={'pva://$(IOC):$(actuatorName)$(sim):get-status.B7'}
                    inLimitValue={1}
                    outLimitValue={1}
                    isMovingValue={1}
                    maxFCsReached={false}
                    label={'$(actuatorName)'}
                    macros={{
                      '$(IOC)': 'testIOC',
                      '$(sim)': 'sim',
                      '$(actuatorName)': 'FC2',
                    }
                    }
                    x={180}
                    y={yOffset}
                    alarmSensitive={true}
                    componentGradient={true}
                  />
                  <QuadrapoleMagnet
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.PowerSupplies.Q1}
                    pv={systems.BeamLine.PowerSupplies.Q1.readbackPv}
                    label={systems.BeamLine.PowerSupplies.Q1.displayName}
                    macros={systems.BeamLine.PowerSupplies.Q1.macros}
                    {...systems.BeamLine.PowerSupplies.Q1.svgProps}
                  />
                  <QuadrapoleMagnet
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.PowerSupplies.Q2}
                    pv={systems.BeamLine.PowerSupplies.Q2.readbackPv}
                    label={systems.BeamLine.PowerSupplies.Q2.displayName}
                    macros={systems.BeamLine.PowerSupplies.Q2.macros}
                    {...systems.BeamLine.PowerSupplies.Q2.svgProps}
                  />
                  <QuadrapoleMagnet
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.PowerSupplies.Q3}
                    pv={systems.BeamLine.PowerSupplies.Q3.readbackPv}
                    label={systems.BeamLine.PowerSupplies.Q3.displayName}
                    macros={systems.BeamLine.PowerSupplies.Q3.macros}
                    {...systems.BeamLine.PowerSupplies.Q3.svgProps}
                  />
                  <Harp
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.Harps.Harp2}
                    {...systems.BeamLine.Harps.Harp2}
                  />
                  <FC
                    pv={'pva://$(IOC):$(actuatorName)$(sim):put-outIn'}
                    isMovingPv={'pva://$(IOC):$(actuatorName)$(sim):get-status.B5'}
                    inLimitPv={'pva://$(IOC):$(actuatorName)$(sim):get-status.B6'}
                    outLimitPv={'pva://$(IOC):$(actuatorName)$(sim):get-status.B7'}
                    inLimitValue={1}
                    outLimitValue={1}
                    isMovingValue={1}
                    maxFCsReached={false}
                    label={'$(actuatorName)'}
                    macros={{
                      '$(IOC)': 'testIOC',
                      '$(sim)': 'sim',
                      '$(actuatorName)': 'FC3',
                    }
                    }
                    x={335}
                    y={yOffset}
                    alarmSensitive={true}
                    componentGradient={true}
                  />
                  <Harp
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.Harps.Harp3}
                    {...systems.BeamLine.Harps.Harp3}
                  />
                  <FC
                    pv={'pva://$(IOC):$(actuatorName)$(sim):put-outIn'}
                    isMovingPv={'pva://$(IOC):$(actuatorName)$(sim):get-status.B5'}
                    inLimitPv={'pva://$(IOC):$(actuatorName)$(sim):get-status.B6'}
                    outLimitPv={'pva://$(IOC):$(actuatorName)$(sim):get-status.B7'}
                    inLimitValue={1}
                    outLimitValue={1}
                    isMovingValue={1}
                    maxFCsReached={false}
                    label={'$(actuatorName)'}
                    macros={{
                      '$(IOC)': 'testIOC',
                      '$(sim)': 'sim',
                      '$(actuatorName)': 'FC4',
                    }
                    }
                    x={535}
                    y={yOffset}
                    alarmSensitive={true}
                    componentGradient={true}
                  />
                  <SlitXY
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.Slits.SLITXY1}
                    xGapPv={systems.BeamLine.Slits.SLITXY1.xGapReadbackPv}
                    yGapPv={systems.BeamLine.Slits.SLITXY1.yGapReadbackPv}
                    xOffsetPv={systems.BeamLine.Slits.SLITXY1.xOffsetReadbackPv}
                    yOffsetPv={systems.BeamLine.Slits.SLITXY1.yOffsetReadbackPv}
                    label={systems.BeamLine.Slits.SLITXY1.displayName}
                    macros={systems.BeamLine.Slits.SLITXY1.macros}
                    {...systems.BeamLine.Slits.SLITXY1.svgProps}
                  />
                  <SlitXY
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.Slits.SLITXY2}
                    xGapPv={systems.BeamLine.Slits.SLITXY2.xGapReadbackPv}
                    yGapPv={systems.BeamLine.Slits.SLITXY2.yGapReadbackPv}
                    xOffsetPv={systems.BeamLine.Slits.SLITXY2.xOffsetReadbackPv}
                    yOffsetPv={systems.BeamLine.Slits.SLITXY2.yOffsetReadbackPv}
                    label={systems.BeamLine.Slits.SLITXY2.displayName}
                    macros={systems.BeamLine.Slits.SLITXY2.macros}
                    {...systems.BeamLine.Slits.SLITXY2.svgProps}
                  />
                  <Harp
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.Harps.Harp4}
                    {...systems.BeamLine.Harps.Harp4}
                  />
                  <SteererXYMagnet
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.PowerSupplies.STR2XY}
                    xPv={systems.BeamLine.PowerSupplies.STR2XY.xReadbackPv}
                    yPv={systems.BeamLine.PowerSupplies.STR2XY.yReadbackPv}
                    label={systems.BeamLine.PowerSupplies.STR2XY.displayName}
                    macros={systems.BeamLine.PowerSupplies.STR2XY.macros}
                    {...systems.BeamLine.PowerSupplies.STR2XY.svgProps}
                  />
                  <SteererXYMagnet
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.PowerSupplies.STR1XY}
                    xPv={systems.BeamLine.PowerSupplies.STR1XY.xReadbackPv}
                    yPv={systems.BeamLine.PowerSupplies.STR1XY.yReadbackPv}
                    label={systems.BeamLine.PowerSupplies.STR1XY.displayName}
                    macros={systems.BeamLine.PowerSupplies.STR1XY.macros}
                    {...systems.BeamLine.PowerSupplies.STR1XY.svgProps}
                  />
                  <SteererYMagnet
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.PowerSupplies.STR2}
                    pv={systems.BeamLine.PowerSupplies.STR2.readbackPv}
                    label={systems.BeamLine.PowerSupplies.STR2.displayName}
                    macros={systems.BeamLine.PowerSupplies.STR2.macros}
                    {...systems.BeamLine.PowerSupplies.STR2.svgProps}
                  />
                  <SteererYMagnet
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.PowerSupplies.STR3}
                    pv={systems.BeamLine.PowerSupplies.STR3.readbackPv}
                    label={systems.BeamLine.PowerSupplies.STR3.displayName}
                    macros={systems.BeamLine.PowerSupplies.STR3.macros}
                    {...systems.BeamLine.PowerSupplies.STR3.svgProps}
                  />
                  <BendingMagnet
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.PowerSupplies.BM1}
                    pv={systems.BeamLine.PowerSupplies.BM1.readbackPv}
                    label={systems.BeamLine.PowerSupplies.BM1.displayName}
                    macros={systems.BeamLine.PowerSupplies.BM1.macros}
                    {...systems.BeamLine.PowerSupplies.BM1.svgProps}
                  />
                </BeamLineCanvas>
              </Grid>
              <Grid item sm={12}>
                <AppBar position="static" color='inherit' indicatorcolor="secondary">
                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                  >
                    <Tab label="Table" />
                    <Tab label="Power Supplies Diagnostics" />
                    <Tab label="Ion Source" />
                    <Tab label="Beam Diagnostics" />
                  </Tabs>
                </AppBar>
              </Grid>
              {tabValue === 3 &&
                <React.Fragment>
                  <Grid item sm={12}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item sm={2} >
                        <div style={{ height: '25vh', marginLeft: 10, marginRight: 10, marginTop: 20 }}>
                          {(harpGraphsState.x0SystemName !== undefined) && <React.Fragment>
                            <HarpRangeSelection onlyX={harpGraphsState.onlyX0} onlyY={harpGraphsState.onlyY0} key={'harpRangeSelectionx0' + harpGraphsState.x0SystemName} systemName={harpGraphsState.x0SystemName} label={'Range'} />
                            <div style={{ marginBottom: 8 }}>
                              {((harpGraphsState.onlyY0 === false) && (harpGraphsState.onlyX0 === false)) &&
                                <ActionButton key={'storex0' +harpGraphsState.x0SystemName} pvs={['pva://$(device):x_store_offset', 'pva://$(device):y_store_offset']} macros={{ '$(device)': harpGraphsState.x0SystemName }} actionValue={"1"} actionString={"Store Offset"} />
                              }
                              {((harpGraphsState.onlyY0 === true) && (harpGraphsState.onlyX0 === false)) &&
                                <ActionButton key={'storex0' + harpGraphsState.x0SystemName} pvs={['pva://$(device):y_store_offset']} macros={{ '$(device)': harpGraphsState.x0SystemName }} actionValue={"1"} actionString={"Store Offset"} />
                              }
                              {((harpGraphsState.onlyY0 === false) && (harpGraphsState.onlyX0 === true)) &&
                                <ActionButton key={'storex0' + harpGraphsState.x0SystemName} pvs={['pva://$(device):x_store_offset']} macros={{ '$(device)': harpGraphsState.x0SystemName }} actionValue={"1"} actionString={"Store Offset"} />
                              }
                            </div>
                            <div style={{ marginBottom: 8 }}>
                              {((harpGraphsState.onlyY0 === false) && (harpGraphsState.onlyX0 === false)) &&
                                <ActionButton key={'clearx0' + harpGraphsState.x0SystemName} pvs={['pva://$(device):x_store_offset', 'pva://$(device):y_store_offset']} macros={{ '$(device)': harpGraphsState.x0SystemName }} actionValue={"0"} actionString={"Clear Offset"} />
                              }
                              {((harpGraphsState.onlyY0 === true) && (harpGraphsState.onlyX0 === false)) &&
                                <ActionButton key={'clearx0' + harpGraphsState.x0SystemName} pvs={['pva://$(device):y_store_offset']} macros={{ '$(device)': harpGraphsState.x0SystemName }} actionValue={"0"} actionString={"Clear Offset"} />
                              }
                              {((harpGraphsState.onlyY0 === false) && (harpGraphsState.onlyX0 === true)) &&
                                <ActionButton key={'clearx0' + harpGraphsState.x0SystemName} pvs={['pva://$(device):x_store_offset']} macros={{ '$(device)': harpGraphsState.x0SystemName }} actionValue={"0"} actionString={"Clear Offset"} />
                              }
                            </div>
                          </React.Fragment>}
                        </div>
                      </Grid>
                      <Grid item sm={10}>
                        <Grid
                          container
                          direction="row"
                          justify="flex-start"
                          alignItems="center"
                        >
                          <Grid item sm={6}>
                            <div style={{ height: '25vh' }}>
                              {((harpGraphsState.onlyY0 === false) && harpGraphsState.x0GraphPVs.length > 0) && <HarpGraph
                                ymax={2000}
                                units={'pA'}
                                key={harpGraphsState.x0GraphKey}
                                dataPVs={harpGraphsState.x0GraphPVs}
                                rangePV={harpGraphsState.x0RangePV}
                                legend={harpGraphsState.x0legend}
                                changeOtherGraphYmax={setTopYgraphYmax}
                                ymaxFromOtherGraph={topXgraphYmax}
                                ylabel="X Axis"
                              />}
                              {/*}<GraphTest style pv='pva://testIOC:test4'  />*/}
                            </div>
                          </Grid>
                          <Grid item sm={6}>
                            <div style={{ height: '25vh' }}>
                              {((harpGraphsState.onlyX0 === false) && harpGraphsState.y0GraphPVs.length > 0) && <HarpGraph
                                ymax={2000}
                                units={'pA'}
                                key={harpGraphsState.y0GraphKey}
                                dataPVs={harpGraphsState.y0GraphPVs}
                                rangePV={harpGraphsState.y0RangePV}
                                legend={harpGraphsState.y0legend}
                                changeOtherGraphYmax={setTopXgraphYmax}
                                ymaxFromOtherGraph={topYgraphYmax}
                                ylabel="Y Axis"
                              />}
                              
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sm={12}>
                    <div style={{ height: '25vh' }}>
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                      >
                        <Grid item sm={2}>
                          <div style={{ height: '25vh', marginLeft: 10, marginRight: 10, marginTop: 20 }}>
                            {(harpGraphsState.x1SystemName !== undefined) && <React.Fragment>
                              <HarpRangeSelection onlyX={harpGraphsState.onlyX1} onlyY={harpGraphsState.onlyY1} key={'harpRangeSelectionx1' + harpGraphsState.x1SystemName} systemName={harpGraphsState.x1SystemName} label={'Range'} />
                              <div style={{ marginBottom: 8 }}>
                                {((harpGraphsState.onlyY1 === false) && (harpGraphsState.onlyX1 === false)) &&
                                  <ActionButton key={'storex1' + harpGraphsState.x1SystemName} pvs={['pva://$(device):x_store_offset', 'pva://$(device):y_store_offset']} macros={{ '$(device)': harpGraphsState.x1SystemName }} actionValue={"1"} actionString={"Store Offset"} />
                                }
                                {((harpGraphsState.onlyY1 === true) && (harpGraphsState.onlyX1 === false)) &&
                                  <ActionButton key={'storex1' + harpGraphsState.x1SystemName} pvs={['pva://$(device):y_store_offset']} macros={{ '$(device)': harpGraphsState.x1SystemName }} actionValue={"1"} actionString={"Store Offset"} />
                                }
                                {((harpGraphsState.onlyY1 === false) && (harpGraphsState.onlyX1 === true)) &&
                                  <ActionButton key={'storex1' + harpGraphsState.x1SystemName} pvs={['pva://$(device):x_store_offset']} macros={{ '$(device)': harpGraphsState.x1SystemName }} actionValue={"1"} actionString={"Store Offset"} />
                                }
                              </div>
                              <div style={{ marginBottom: 8 }}>
                                {((harpGraphsState.onlyY1 === false) && (harpGraphsState.onlyX1 === false)) &&
                                  <ActionButton key={'clearx1' + harpGraphsState.x1SystemName} pvs={['pva://$(device):x_store_offset', 'pva://$(device):y_store_offset']} macros={{ '$(device)': harpGraphsState.x1SystemName }} actionValue={"0"} actionString={"Clear Offset"} />
                                }
                                {((harpGraphsState.onlyY1 === true) && (harpGraphsState.onlyX1 === false)) &&
                                  <ActionButton key={'clearx1' + harpGraphsState.x1SystemName} pvs={['pva://$(device):y_store_offset']} macros={{ '$(device)': harpGraphsState.x1SystemName }} actionValue={"0"} actionString={"Clear Offset"} />
                                }
                                {((harpGraphsState.onlyY1 === false) && (harpGraphsState.onlyX1 === true)) &&
                                  <ActionButton key={'clearx1' + harpGraphsState.x1SystemName} pvs={['pva://$(device):x_store_offset']} macros={{ '$(device)': harpGraphsState.x1SystemName }} actionValue={"0"} actionString={"Clear Offset"} />
                                }
                              </div>
                            </React.Fragment>}
                          </div>
                        </Grid>
                        <Grid item sm={10}>
                          <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                          >
                            <Grid
                              container
                              direction="row"
                              justify="flex-start"
                              alignItems="center"
                            >
                              <Grid item sm={6}>
                                <div style={{ height: '25vh' }}>
                                  {((harpGraphsState.onlyY1 === false) && harpGraphsState.x1GraphPVs.length > 0) && <HarpGraph
                                    ymax={2000}
                                    units={'pA'}
                                    key={harpGraphsState.x1GraphKey}
                                    dataPVs={harpGraphsState.x1GraphPVs}
                                    rangePV={harpGraphsState.x1RangePV}
                                    legend={harpGraphsState.x1legend}
                                    ylabel="X Axis"
                                    changeOtherGraphYmax={setBottomYgraphYmax}
                                    ymaxFromOtherGraph={bottomXgraphYmax}
                                  />}
                                  
                                </div>
                              </Grid>
                              <Grid item sm={6}>
                                <div style={{ height: '25vh' }}>
                                  {((harpGraphsState.onlyX1 === false) && harpGraphsState.y1GraphPVs.length > 0) && <HarpGraph
                                    ymax={2000}
                                    units={'pA'}
                                    key={harpGraphsState.y1GraphKey}
                                    dataPVs={harpGraphsState.y1GraphPVs}
                                    rangePV={harpGraphsState.y1RangePV}
                                    legend={harpGraphsState.y1legend}
                                    ylabel="Y Axis"
                                    changeOtherGraphYmax={setBottomXgraphYmax}
                                    ymaxFromOtherGraph={bottomYgraphYmax}
                                  />}
                                 
                                </div>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </React.Fragment>}
              {tabValue === 1 &&
                <React.Fragment>
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                  >
                    <Grid item sm={6}>
                      <div style={{ height: '50vh', marginLeft: 10, marginRight: 10, marginTop: 20 }}>
                        <GraphY
                          pvs={['pva://testIOC:PS1:Readback', 'pva://testIOC:PS2:Readback', 'pva://testIOC:PS3:Readback']}
                          maxLength={600}
                          legend={[
                            'Q1 readback',
                            'Q2 readback',
                            'Q3 readback',
                          ]}
                          yUnits={' A'}
                          useTimeStamp={true}
                          usePolling={true}
                          pollingRate={100}
                        />
                        {/*}<GraphTest style pv='pva://testIOC:test4'  />*/}
                      </div>
                    </Grid>
                    <Grid item sm={6}>
                      <div style={{ height: '50vh', marginLeft: 10, marginRight: 10, marginTop: 20 }}>
                        {/*}  <GraphY
                            pvs={[
                            'pva://testIOC:PS1:Readback:History',
                            'pva://testIOC:PS2:Readback:History',
                            'pva://testIOC:PS3:Readback:History',
                            'pva://testIOC:PS4:Readback:History',
                            'pva://testIOC:STR1:X:Readback:History'
                            ]}
                            legend = {[
                            'PS1',
                            'PS2',
                            'PS3',
                            'PS4',
                            'STR1:X',
                            ]}
                          />*/}
                        <GraphY
                          pvs={[
                            'pva://testIOC:PS1:Setpoint',
                            'pva://testIOC:PS2:Setpoint',
                            'pva://testIOC:PS3:Setpoint',
                          ]}
                          maxLength={600}
                          usePolling={true}
                          pollingRate={100}
                          legend={[
                            'Q1 setpoint',
                            'Q2 setpoint',
                            'Q3 setpoint',
                          ]}
                          yUnits={' A'}
                          useTimeStamp={true}
                        />
                        {/*  <GraphTest style pv='pva://testIOC:PS1:Readback:History'  />*/}
                      </div>
                    </Grid>
                  </Grid>
                </React.Fragment>}
              {tabValue === 2 &&
                <React.Fragment>
                  <Grid item sm={12}>
                    <Grid
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="center"
                    >
                      <Grid item sm={2} style={{ marginLeft: 10 }}>
                        <ToggleButton pv='pva://testIOC:BeamlineA:BeamOn' label={"Beam On"} labelPlacement={"top"} />
                      </Grid>
                    </Grid>
                  </Grid>
                </React.Fragment>}
              {tabValue === 0 &&
                <Grid item sm={12}>
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                  >
                    <Grid item sm={2}>
                      <AppBar position="static" color="inherit" >
                        <VerticalTabs
                          value={sideTabValue}
                          onChange={handleSideTabChange}
                          indicatorColor="primary"
                          textColor="primary"
                        >
                          <Tab label="All" />    {/* side Tab 0*/}
                          <Tab label="Power Supplies" />    {/* side Tab 1*/}
                          <Tab label="Slits" />  {/* side Tab 2*/}
                        </VerticalTabs>
                      </AppBar>
                    </Grid>
                    <Grid item sm={10}>
                      {sideTabValue === 0 && <TabContainer> <ControlTable style={{ overflowY: 'scroll', maxHeight: '50vh' }} handleOnSystemClick={handleOnSystemClick} systems={allSystems} />                            </TabContainer>}
                      {sideTabValue === 1 && <TabContainer> <ControlTable handleOnSystemClick={handleOnSystemClick} systems={systems['BeamLine']['PowerSupplies']} />  </TabContainer>}
                      {sideTabValue === 2 && <TabContainer> <ControlTable handleOnSystemClick={handleOnSystemClick} systems={systems['BeamLine']['Slits']} />         </TabContainer>}
                    </Grid>
                  </Grid>
                </Grid>}
            </Grid>
          </Grid>
          <Grid item sm={3} >
            {((displayEditor === true) && (editorType === 'editorSteererXY')) && <EditorSteererXY key={'editor-key' + editorSystem.systemName} system={editorSystem} handleCloseEditor={() => setDisplayEditor(false)} />}
            {((displayEditor === true) && (editorType === 'editorSinglePS')) && <EditorSinglePS key={'editor-key' + editorSystem.systemName} system={editorSystem} handleCloseEditor={() => setDisplayEditor(false)} />}
            {((displayEditor === true) && (editorType === 'editorSlitXY')) && <EditorSlitXY key={'editor-key' + editorSystem.systemName} system={editorSystem} handleCloseEditor={() => setDisplayEditor(false)} />}
          </Grid>
        </Grid>
        <AppBar style={{ position: 'fixed', bottom: 0, top: 'auto', height: 40 }} color={props.theme.palette.type === 'dark' ? "inherit" : "primary"}>
          {footerContents}
        </AppBar>
      </TraditionalLayout>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(BeamlineControlSystem);

