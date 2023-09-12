import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ToggleButton from '../BaseComponents/ToggleButton';
import EditorSinglePS from './Components/EditorSinglePS'
import EditorSlitXY from './Components/EditorSlitXY'
import EditorSteererXY from './Components/EditorSteererXY'
import AppBar from '@mui/material/AppBar';
import GraphY from '../BaseComponents/GraphY';
import ControlTable from './Components/ControlTable'
import TraditionalLayout from '../UI/Layout/ComposedLayouts/TraditionalLayout';
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

import HarpsBeamDiagnostics from './Components/HarpsBeamDiagnostics'

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
  const yOffset = 0;
  const handleTabChange = (event, value) => {
    setTabValue(value)
  };
  const handleOnSystemClick = (system) => {
    setEditorType(system.editorType)
    setDisplayEditor(true)
    setEditorSystem(system)
  }

  const [systems, setSystems] = useState({
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
            '$(IOC)': 'testIOC',
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
            '$(IOC)': 'testIOC',
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
            '$(IOC)': 'testIOC',
            '$(device)': 'PS3',
          },
          svgProps: {
            usePvUnits: true,
            alarmSensitive: true,
            componentShadow: true,
            textShadow: false,
            componentGradient: true,
            x: 400,
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
            '$(IOC)': 'testIOC',
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
          macros: {
            '$(IOC)': 'testIOC',
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
          macros: {
            '$(IOC)': 'testIOC',
            '$(device)': 'STR2',
          },
          svgProps: {
            x: 800, y: yOffset,
            usePvUnits: true, prec: 1, alarmSensitive: true,
            labelOffsetX: 0, valueOffsetX: 0,
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
            '$(IOC)': 'testIOC',
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
            '$(IOC)': 'testIOC',
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
            '$(IOC)': 'testIOC',
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
            '$(IOC)': 'testIOC',
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

          x: 140,
          y: yOffset,
          alarmSensitive: true,
          textShadow: false,
          componentGradient: true,
          pv: '$(IOC):$(actuatorName):put-outIn',
          isMovingPv: '$(IOC):$(actuatorName):get-status.B5',
          inLimitPv: '$(IOC):$(actuatorName):get-status.B6',
          outLimitPv: '$(IOC):$(actuatorName):get-status.B7',
          inLimitValue: 1,
          outLimitValue: 1,
          isMovingValue: 1,
          label: '$(actuatorName)',
          systemName: '$(IOC):$(actuatorName)',
          macros: {
            '$(IOC)': 'testIOC',
            '$(actuatorName)': 'Harp1',
          }
        },
        Harp2: {

          x: 295,
          y: yOffset,
          alarmSensitive: true,
          textShadow: false,
          componentGradient: true,
          pv: '$(IOC):$(actuatorName):put-outIn',
          isMovingPv: '$(IOC):$(actuatorName):get-status.B5',
          inLimitPv: '$(IOC):$(actuatorName):get-status.B6',
          outLimitPv: '$(IOC):$(actuatorName):get-status.B7',
          inLimitValue: 1,
          outLimitValue: 1,
          isMovingValue: 1,
          label: '$(actuatorName)',
          systemName: '$(IOC):$(actuatorName)',
          macros: {
            '$(IOC)': 'testIOC',
            '$(actuatorName)': 'Harp2',
          }
        },
        Harp3: {

          x: 445,
          y: yOffset,
          alarmSensitive: true,
          textShadow: false,
          componentGradient: true,
          pv: '$(IOC):$(actuatorName):put-outIn',
          isMovingPv: '$(IOC):$(actuatorName):get-status.B5',
          inLimitPv: '$(IOC):$(actuatorName):get-status.B6',
          outLimitPv: '$(IOC):$(actuatorName):get-status.B7',
          inLimitValue: 1,
          outLimitValue: 1,
          isMovingValue: 1,
          label: '$(actuatorName)',
          systemName: '$(IOC):$(actuatorName)',
          macros: {
            '$(IOC)': 'testIOC',
            '$(actuatorName)': 'Harp3',
          }
        },
        Harp4: {

          x: 1150,
          y: yOffset,
          alarmSensitive: true,
          textShadow: false,
          componentGradient: true,
          pv: '$(IOC):$(actuatorName):put-outIn',
          isMovingPv: '$(IOC):$(actuatorName):get-status.B5',
          inLimitPv: '$(IOC):$(actuatorName):get-status.B6',
          outLimitPv: '$(IOC):$(actuatorName):get-status.B7',
          inLimitValue: 1,
          outLimitValue: 1,
          isMovingValue: 1,
          systemName: '$(IOC):$(actuatorName)',
          label: '$(actuatorName)',
          macros: {
            '$(IOC)': 'testIOC',
            '$(actuatorName)': 'Harp4',
          }
        },
      },
      FCs: {
        FC1: {
          pv: '$(IOC):$(actuatorName)$(sim):put-outIn',
          isMovingPv: '$(IOC):$(actuatorName)$(sim):get-status.B5',
          inLimitPv: '$(IOC):$(actuatorName)$(sim):get-status.B6',
          outLimitPv: '$(IOC):$(actuatorName)$(sim):get-status.B7',
          inLimitValue: 1,
          outLimitValue: 1,
          isMovingValue: 1,

          label: '$(actuatorName)',
          macros: {
            '$(IOC)': 'testIOC',
            '$(sim)': 'sim',
            '$(actuatorName)': 'FC1',
          },
          x: 38,
          y: yOffset,
          alarmSensitive: true,
          componentGradient: true,
        },
        FC2: {
          pv: '$(IOC):$(actuatorName)$(sim):put-outIn',
          isMovingPv: '$(IOC):$(actuatorName)$(sim):get-status.B5',
          inLimitPv: '$(IOC):$(actuatorName)$(sim):get-status.B6',
          outLimitPv: '$(IOC):$(actuatorName)$(sim):get-status.B7',
          inLimitValue: 1,
          outLimitValue: 1,
          isMovingValue: 1,

          label: '$(actuatorName)',
          macros: {
            '$(IOC)': 'testIOC',
            '$(sim)': 'sim',
            '$(actuatorName)': 'FC2',
          },
          x: 180,
          y: yOffset,
          alarmSensitive: true,
          componentGradient: true,
        },
        FC3: {
          pv: '$(IOC):$(actuatorName)$(sim):put-outIn',
          isMovingPv: '$(IOC):$(actuatorName)$(sim):get-status.B5',
          inLimitPv: '$(IOC):$(actuatorName)$(sim):get-status.B6',
          outLimitPv: '$(IOC):$(actuatorName)$(sim):get-status.B7',
          inLimitValue: 1,
          outLimitValue: 1,
          isMovingValue: 1,

          label: '$(actuatorName)',
          macros: {
            '$(IOC)': 'testIOC',
            '$(sim)': 'sim',
            '$(actuatorName)': 'FC3',
          },
          x: 335,
          y: yOffset,
          alarmSensitive: true,
          componentGradient: true,
        },
        FC4: {
          pv: '$(IOC):$(actuatorName)$(sim):put-outIn',
          isMovingPv: '$(IOC):$(actuatorName)$(sim):get-status.B5',
          inLimitPv: '$(IOC):$(actuatorName)$(sim):get-status.B6',
          outLimitPv: '$(IOC):$(actuatorName)$(sim):get-status.B7',
          inLimitValue: 1,
          outLimitValue: 1,
          isMovingValue: 1,

          label: '$(actuatorName)',
          macros: {
            '$(IOC)': 'testIOC',
            '$(sim)': 'sim',
            '$(actuatorName)': 'FC4',
          },
          x: 485,
          y: yOffset,
          alarmSensitive: true,
          componentGradient: true,
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
    let numberOfInsertedHarps = 0;
    for (harp in harpPvs) {
      if (harpPvs[harp]) {
        if (harpPvs[harp].value == 1) {
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
  }, [harpPvs])

  const footerContents = (
    <Grid container direction="row" justifyContent="flex-start" alignItems="center" >
      <Grid item xs={12} style={{ paddingLeft: "1em" }}>
        <Typography>
          All the components are now reusable hooks components. See the style guide Beamline Components
          section for more details!
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
                    pv={'testIOC:BeamlineA:BeamOn'}
                    width={'113px'}
                  />
                  <HorizontalBeamline
                    x={'113px'}
                    y={yOffset}
                    pv={'testIOC:BeamlineB:BeamOn'}
                    width={'148px'}
                  />
                  <HorizontalBeamline
                    x={'261px'}
                    y={yOffset}
                    pv={'testIOC:BeamlineC:BeamOn'}
                    width={'150px'}
                  />
                  <HorizontalBeamline
                    x={'411px'}
                    y={yOffset}
                    pv={'testIOC:BeamlineD:BeamOn'}
                    width={'150px'}
                  />
                  <HorizontalBeamline
                    x={'561px'}
                    y={yOffset}
                    pv={'testIOC:BeamlineE:BeamOn'}
                    width={'850px'}
                  />
                  <FC
                    {...systems.BeamLine.FCs.FC1}
                  />
                  <Harp
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.Harps.Harp1}
                    {...systems.BeamLine.Harps.Harp1}
                    maxHarpsReached={maxHarpsReached}
                  />
                  <FC
                    {...systems.BeamLine.FCs.FC2}
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
                    maxHarpsReached={maxHarpsReached}
                  />
                  <FC
                    {...systems.BeamLine.FCs.FC3}
                  />
                  <Harp
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.Harps.Harp3}
                    {...systems.BeamLine.Harps.Harp3}
                    maxHarpsReached={maxHarpsReached}
                  />
                  <FC
                    {...systems.BeamLine.FCs.FC4}
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
                    maxHarpsReached={maxHarpsReached}
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
                    scrollButtons
                    indicatorColor="primary"
                    textColor="primary"
                    allowScrollButtonsMobile>
                    <Tab label="Table" />
                    <Tab label="Power Supplies Diagnostics" />
                    <Tab label="Ion Source" />
                    <Tab label="Beam Diagnostics" />
                  </Tabs>
                </AppBar>
              </Grid>
              {tabValue === 3 &&
                <div style={{ padding: 8, width: '100%' }}>
                  <HarpsBeamDiagnostics harps={systems.BeamLine.Harps} />
                </div>
              }
              {tabValue === 1 &&
                <React.Fragment>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Grid item sm={6}>
                      <div style={{ height: '50vh', marginLeft: 10, marginRight: 10, marginTop: 20 }}>
                        <GraphY
                          pvs={['testIOC:PS1:Readback', 'testIOC:PS2:Readback', 'testIOC:PS3:Readback']}
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
                        {/*}<GraphTest style pv='testIOC:test4'  />*/}
                      </div>
                    </Grid>
                    <Grid item sm={6}>
                      <div style={{ height: '50vh', marginLeft: 10, marginRight: 10, marginTop: 20 }}>

                        <GraphY
                          pvs={[
                            'testIOC:PS1:Setpoint',
                            'testIOC:PS2:Setpoint',
                            'testIOC:PS3:Setpoint',
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
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Grid item sm={2} style={{ marginLeft: 10 }}>
                        <ToggleButton pv='testIOC:BeamlineA:BeamOn' label={"Beam On"} labelPlacement={"top"} />
                      </Grid>
                    </Grid>
                  </Grid>
                </React.Fragment>}
              {tabValue === 0 &&
                <Grid item sm={12}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
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
        <AppBar style={{ position: 'fixed', bottom: 0, top: 'auto', height: 40 }} color={props.theme.palette.mode === 'dark' ? "inherit" : "primary"}>
          {footerContents}
        </AppBar>
      </TraditionalLayout>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(BeamlineControlSystem);
