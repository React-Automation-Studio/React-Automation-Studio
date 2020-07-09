import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


import Grid from '@material-ui/core/Grid';


import HarpRangeSelection from '../SiteSpecificComponents/iThembaLABS/CompoundComponents/HarpRangeSelection';
import ToggleButton from '../BaseComponents/ToggleButton';
import ActionButton from '../BaseComponents/ActionButton';

import ControlRightEx1 from '../ControlScreens/GridComponents/ControlRightEx1'
import ControlRightSteererXY from '../ControlScreens/GridComponents/ControlRightSteererXY'
import ControlRightSlitXY from '../ControlScreens/GridComponents/ControlRightSlitXY'
import ControlRightSinglePS from '../ControlScreens/GridComponents/ControlRightSinglePS'
import EditorSinglePS from '../ExperimentalControlScreens/GridComponents/EditorSinglePS'
import EditorSlitXY from '../ExperimentalControlScreens/GridComponents/EditorSlitXY'
import EditorSteererXY from '../ExperimentalControlScreens/GridComponents/EditorSteererXY'
import ControlTopHarpEx1 from '../ControlScreens/GridComponents/ControlTopHarpEx1'

import HarpGraph from '../SiteSpecificComponents/iThembaLABS/CompoundComponents/HarpGraph';

import AppBar from '@material-ui/core/AppBar';

import GraphY from '../BaseComponents/GraphY';
import ControlTable from '../ExperimentalControlScreens/GridComponents/ControlTable'
import TraditionalLayout from '../UI/Layout/ComposedLayouts/TraditionalLayout.js';
import BeamLineCanvas from '../SvgBeamlineComponents/BeamLineCanvas';
import HorizontalBeamline from '../SvgBeamlineComponents/HorizontalBeamline';
import QuadrapoleMagnet from '../SvgBeamlineComponents/QuadrapoleMagnet';
import BendingMagnet from '../SvgBeamlineComponents/BendingMagnet';
import SteererYMagnet from '../SvgBeamlineComponents/SteererYMagnet';
import SteererXYMagnet from '../SvgBeamlineComponents/SteererXYMagnet';
import SlitXY from '../SvgBeamlineComponents/SlitXY';
import Harp from '../SvgBeamlineComponents/Harp';
const VerticalTabs = withStyles(theme => ({
  flexContainer: {
    flexDirection: 'column'
  },
  indicator: {
    display: 'none',
  }
}))(Tabs)

const yOffset = 0;

const systems = {
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
          x: 150,
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
          x: 300,
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
        //scanPv: '$(IOC):$(device):SimReadback.SCAN',
        //orocPv: '$(IOC):$(device):SimReadback.OROC',
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
        //scanPv: '$(IOC):$(device):SimReadback.SCAN',
        //orocPv: '$(IOC):$(device):SimReadback.OROC',
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

    }

  }
}


const allSystems = { ...systems.BeamLine.PowerSupplies, ...systems.BeamLine.Slits }



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
    <Typography component="div" style={{ padding: 8 * 0 ,...props.style}}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
class BeamlineControlSystem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'tabValue': 0,
      'sideTabValue': 0,
      'editorType': 'PS',
      'displayEditor': false,
      'editorMacros': { '$(device)': "" },
      'editorSystem': {},
      'displayHarps': [
        { systemName: 'testIOC:Harp1', displayName: 'Harp 1', inserted: false },
        { systemName: 'testIOC:Harp2', displayName: 'Harp 2', inserted: false },
        { systemName: 'testIOC:Harp3', displayName: 'Harp 3', inserted: false },
        { systemName: 'testIOC:Harp4', displayName: 'Harp 4', inserted: false },



      ],
      'maxHarpsReached': false,

      'x0GraphPVs': [],
      'y0GraphPVs': [],
      'x0legend': [],
      'y0legend': [],
      'x0GraphKey': "",
      'onlyY0': false,
      'onlyX0': false,
      'x1GraphPVs': [],
      'y1GraphPVs': [],
      'x1legend': [],
      'y1legend': [],
      'x1GraphKey': "",
      'onlyY1': false,
      'onlyX1': false,



    }
    this.handlePsOnClick = this.handlePsOnClick.bind(this);
    this.handleOnSystemClick = this.handleOnSystemClick.bind(this);

    this.handleHarpInsertedOrRemoved = this.handleHarpInsertedOrRemoved.bind(this);

    this.changeTopYgraphYmax = this.changeTopYgraphYmax.bind(this);
    this.changeTopXgraphYmax = this.changeTopXgraphYmax.bind(this);
    this.changeBottomYgraphYmax = this.changeBottomYgraphYmax.bind(this);
    this.changeBottomXgraphYmax = this.changeBottomXgraphYmax.bind(this);
    this.handleCloseEditor = this.handleCloseEditor.bind(this);

  }

  handleCloseEditor() {
    this.setState({
      displayEditor: false,
    }
    );

    //  this.setState({ ['clicked']: 1});
  }

  handlePsOnClick(name) {

    console.log("in control test1 clicked " + name.toString());
    this.setState({
      editorType: 'PS',
      displayEditor: true,
      editorMacros: { '$(device)': name }
    });

    //  this.setState({ ['clicked']: 1});
  }

  changeTopYgraphYmax = (ymax) => {
    this.setState({ TopYgraphYmax: ymax })
    //    console.log('changeTopYgraphYmax',ymax)
  }
  changeTopXgraphYmax = (ymax) => {
    this.setState({ TopXgraphYmax: ymax })
    //    console.log('changeTopXgraphYmax',ymax)
  }
  changeBottomYgraphYmax = (ymax) => {
    this.setState({ BottomYgraphYmax: ymax })
    //    console.log('changeBottomYgraphYmax',ymax)
  }
  changeBottomXgraphYmax = (ymax) => {
    this.setState({ BottomXgraphYmax: ymax })
    //    console.log('changeBottomXgraphYmax',ymax)
  }
  handleTabChange = (event, value) => {
    this.setState({ tabValue: value });
  };


  handleOnSystemClick = (system) => {
    //  console.log(system)
    this.setState({
      editorType: system.editorType,
      displayEditor: true,
      editorSystem: system,
      editorMacros: { '$(device)': "" }
    });
    //  console.log("in control test1 clicked "+name.toString());
    //    this.setState({editorType:'PS',
    //    displayEditor:true,
    //    editorMacros:{'$(device)':name}});

    //  this.setState({ ['clicked']: 1});
  }

  handleHarpInsertedOrRemoved = (inserted, name) => {
    let displayHarps = this.state.displayHarps;
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
    let maxHarpsReached = false;
    for (harp in displayHarps) {
      if (displayHarps[harp].systemName === name) {
        displayHarps[harp].inserted = inserted;
      }
      if (displayHarps[harp].inserted === true) {
        if (numberOfInsertedGraphs === 0) {
          if (typeof displayHarps[harp].onlyY !== 'undefined') {
            x0GraphPVs.push('pva://' + displayHarps[harp].systemName + ':ycur');
            x0RangePV = 'pva://' + displayHarps[harp].systemName + ':yrange';
            onlyY0 = true;
          }
          else {
            x0GraphPVs.push('pva://' + displayHarps[harp].systemName + ':xcur');
            x0RangePV = 'pva://' + displayHarps[harp].systemName + ':xrange';
            onlyY0 = false;
          }


          x0legend.push(displayHarps[harp].displayName);
          x0GraphKey = x0GraphKey + displayHarps[harp].systemName;
          x0SystemName = displayHarps[harp].systemName;
          //    }
          if (typeof displayHarps[harp].onlyX !== 'undefined') {
            y0GraphPVs.push('pva://' + displayHarps[harp].systemName + ':xcur');
            y0RangePV = 'pva://' + displayHarps[harp].systemName + ':xrange';
            onlyX0 = true;
          }
          else {
            y0GraphPVs.push('pva://' + displayHarps[harp].systemName + ':ycur');
            y0RangePV = 'pva://' + displayHarps[harp].systemName + ':yrange';
            onlyX0 = false;
          }
          y0GraphKey = y0GraphKey + displayHarps[harp].systemName;
          y0legend.push(displayHarps[harp].displayName);

          numberOfInsertedGraphs++;
        } else {
          if (typeof displayHarps[harp].onlyY !== 'undefined') {
            x1GraphPVs.push('pva://' + displayHarps[harp].systemName + ':ycur');
            x1RangePV = 'pva://' + displayHarps[harp].systemName + ':yrange';
            onlyY1 = true;
          }
          else {
            x1GraphPVs.push('pva://' + displayHarps[harp].systemName + ':xcur');
            x1RangePV = 'pva://' + displayHarps[harp].systemName + ':xrange';
            onlyY1 = false;
          }

          if (typeof displayHarps[harp].onlyX !== 'undefined') {
            y1GraphPVs.push('pva://' + displayHarps[harp].systemName + ':xcur');
            y1RangePV = 'pva://' + displayHarps[harp].systemName + ':xrange';
            onlyX1 = true;
          }
          else {
            y1GraphPVs.push('pva://' + displayHarps[harp].systemName + ':ycur');
            y1RangePV = 'pva://' + displayHarps[harp].systemName + ':yrange';
            onlyX1 = false;
          }



          x1legend.push(displayHarps[harp].displayName);
          y1legend.push(displayHarps[harp].displayName);
          x1GraphKey = x1GraphKey + displayHarps[harp].systemName;
          y1GraphKey = y1GraphKey + displayHarps[harp].systemName;
          x1SystemName = displayHarps[harp].systemName;
          numberOfInsertedGraphs++;

        }

      }

    }
    if (numberOfInsertedGraphs >= 2) {
      maxHarpsReached = true;
    }

    this.setState({
      displayHarps: displayHarps, maxHarpsReached: maxHarpsReached,
      x0GraphPVs: x0GraphPVs, y0GraphPVs: y0GraphPVs, x0legend: x0legend, y0legend: y0legend, x0GraphKey: x0GraphKey, y0GraphKey: y0GraphKey,
      x1GraphPVs: x1GraphPVs, y1GraphPVs: y1GraphPVs, x1legend: x1legend, y1legend: y1legend, x1GraphKey: x1GraphKey, y1GraphKey: y1GraphKey,
      x0RangePV: x0RangePV, x1RangePV: x1RangePV, y0RangePV: y0RangePV, y1RangePV: y1RangePV, x0SystemName: x0SystemName, x1SystemName: x1SystemName,
      onlyX0: onlyX0, onlyX1: onlyX1, onlyY0: onlyY0, onlyY1: onlyY1
    })

  }
  handleSideTabChange = (event, value) => {
    this.setState({ sideTabValue: value });
  };


  render() {
    //      console.log("state: ",this.state);
    //console.log('displayHarps',this.state.displayHarps)
    //    console.log('this.state.onlyX0',this.state.onlyX0)

    //    console.log('this.state.onlyY0',this.state.onlyY0)
    //      console.log('this.state.onlyX1',this.state.onlyX1)
    //      console.log('this.state.onlyY1',this.state.onlyY1)


    const { tabValue } = this.state;
    const sideTabValue = this.state.sideTabValue;
    const footerContents = (
      <Grid container direction="row" justify="flex-start" alignItems="center" style={{ color: "white" }} >
        <Grid item xs={12} style={{ paddingLeft: "1em" }}>
          We are in the progress of migrating the original iThemba LABS demo components to reusable hooks components. Watch this space!
          </Grid>

      </Grid>
    )

      ;
    return (
      <div style={{ "overflowX": "hidden", 'overflowY': 'hidden' }}>
        <TraditionalLayout
          title="Beamline Control System Example"
          denseAppBar
          showFooter
          footerHeight={40}
          footerContents={footerContents}
        >
          <Grid container spacing={3} style={{ paddingTop: 16 }}>

            <Grid item sm={9}>
              <Grid container spacing={3}>

                <Grid item sm={12}>


                  <BeamLineCanvas width={'100%'} height={'22.5vh'}  >

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
                    {/* 
        <FC

          cx={100}
          cy={100}
          systemName={'testIOC:FC1sim'}
          usePvUnits={true}
          usePvLabel={false}
          alarmSensitive={true}
          componentGradient={true}
          componentShadow={true}
          label='FC1'
        /> */}
                    {/* <QuadrapoleMagnet
                      handleOnClick={this.handleOnSystemClick}
                      x={150}
                      y={yOffset}
                      macros={
                        {
                          '$(IOC)': 'pva://testIOC',
                          '$(device)': 'PS1',
                        }
                      }
                      system={{
                        systemName: '$(IOC):$(device)',
                        displayName: 'Q1',
                        editorType: 'editorSinglePS',
                        devices:
                        {
                          device: {
                            setpointPv: '$(IOC):$(device):Setpoint',
                            readbackPv: '$(IOC):$(device):Readback',
                            onOffPv: '$(IOC):$(device):On',
                          }

                        }
                      }}
                      usePvUnits={true}
                      usePvLabel={false}
                      alarmSensitive={true}

                      componentShadow={true}
                      textShadow={false}
                      componentGradient={true}
                    /> */}
                    {/* <Harp
          maxHarpsReached={this.props.maxHarpsReached}
          x={200}
          y={yOffset}
          systemName={'testIOC:Harp1'}
          usePvLabel={false}
          alarmSensitive={true}
          label='Harp 1'

          textShadow={false}
          componentGradient={true}
          handleHarpInsertedOrRemoved={this.props.handleHarpInsertedOrRemoved}

                    />*/}
                    <Harp
                      //maxHarpsReached={this.props.maxHarpsReached}
                      maxHarpsReached={false}
                      x={200}
                      y={yOffset}

                      usePvLabel={false}
                      alarmSensitive={true}


                      textShadow={false}
                      componentGradient={true}
                      //handleHarpInsertedOrRemoved={this.props.handleHarpInsertedOrRemoved}
                      pv={'pva://$(IOC):$(actuatorName):put-outIn'}
                      isMovingPv={'pva://$(IOC):$(actuatorName):get-status.B5'}
                      inLimitPv={'pva://$(IOC):$(actuatorName):get-status.B6'}
                      outLimitPv={'pva://$(IOC):$(actuatorName):get-status.B7'}
                      inLimitValue={1}
                      outLimitValue={1}
                      isMovingValue={1}
                      maxHarpsReached={false}

                      label={'$(actuatorName)'}

                      macros={{
                        '$(IOC)': 'testIOC',
                        '$(actuatorName)': 'Harp1',

                      }
                      }
                    />
                    {/* <FC

          x={250}
          y={yOffset}
          systemName={'testIOC:FC2sim'}
          usePvUnits={true}
          usePvLabel={false}
          alarmSensitive={true}
          componentGradient={true}
          componentShadow={true}
          label='FC2'
        /> */}
                    <QuadrapoleMagnet
                      handleOnClick={this.handleOnSystemClick}

                      system={systems.BeamLine.PowerSupplies.Q1}
                      pv={systems.BeamLine.PowerSupplies.Q1.readbackPv}
                      label={systems.BeamLine.PowerSupplies.Q1.displayName}
                      macros={systems.BeamLine.PowerSupplies.Q1.macros}
                      {...systems.BeamLine.PowerSupplies.Q1.svgProps}


                    />
                    <QuadrapoleMagnet
                      handleOnClick={this.handleOnSystemClick}

                      system={systems.BeamLine.PowerSupplies.Q2}
                      pv={systems.BeamLine.PowerSupplies.Q2.readbackPv}
                      label={systems.BeamLine.PowerSupplies.Q2.displayName}
                      macros={systems.BeamLine.PowerSupplies.Q2.macros}
                      {...systems.BeamLine.PowerSupplies.Q2.svgProps}

                    />
                    <QuadrapoleMagnet
                      handleOnClick={this.handleOnSystemClick}

                      system={systems.BeamLine.PowerSupplies.Q3}
                      pv={systems.BeamLine.PowerSupplies.Q3.readbackPv}
                      label={systems.BeamLine.PowerSupplies.Q3.displayName}
                      macros={systems.BeamLine.PowerSupplies.Q3.macros}
                      {...systems.BeamLine.PowerSupplies.Q3.svgProps}
                    />
                    <Harp
                      //maxHarpsReached={this.props.maxHarpsReached}
                      maxHarpsReached={false}
                      x={350}
                      y={yOffset}

                      usePvLabel={false}
                      alarmSensitive={true}


                      textShadow={false}
                      componentGradient={true}
                      //handleHarpInsertedOrRemoved={this.props.handleHarpInsertedOrRemoved}
                      pv={'pva://$(IOC):$(actuatorName):put-outIn'}
                      isMovingPv={'pva://$(IOC):$(actuatorName):get-status.B5'}
                      inLimitPv={'pva://$(IOC):$(actuatorName):get-status.B6'}
                      outLimitPv={'pva://$(IOC):$(actuatorName):get-status.B7'}
                      inLimitValue={1}
                      outLimitValue={1}
                      isMovingValue={1}
                      maxHarpsReached={false}

                      label={'$(actuatorName)'}

                      macros={{
                        '$(IOC)': 'testIOC',
                        '$(actuatorName)': 'Harp2',

                      }
                      }
                    />
                    {/* <FC

          cx={400}
          cy={100}
          systemName={'testIOC:FC3sim'}
          usePvUnits={true}
          usePvLabel={false}
          alarmSensitive={true}
          componentGradient={true}
          componentShadow={true}
          label='FC3'
        /> */}
                    {/* <QuadrapoleMagnet
                      handleOnClick={this.handleOnSystemClick}
                      x={450}
                      y={yOffset}

                      macros={
                        {
                          '$(IOC)': 'pva://testIOC',
                          '$(device)': 'PS3',
                        }
                      }
                      system={{
                        systemName: '$(IOC):$(device)',
                        displayName: 'Q3',
                        editorType: 'editorSinglePS',
                        devices:
                        {
                          device: {
                            setpointPv: '$(IOC):$(device):Setpoint',
                            readbackPv: '$(IOC):$(device):Readback',
                            onOffPv: '$(IOC):$(device):On',
                          }

                        }
                      }}



                      usePvUnits={true}
                      alarmSensitive={true}
                      label='Q3'
                      componentShadow={true}
                      textShadow={false}
                      componentGradient={true}
                    /> */}
                    {/* <FC

          cx={550}
          cy={100}
          systemName={'testIOC:FC4sim'}
          usePvUnits={true}
          usePvLabel={false}
          alarmSensitive={true}
          componentGradient={true}
          componentShadow={true}
          label='FC4'
        />

        <Harp
          maxHarpsReached={this.props.maxHarpsReached}
          cx={500}
          cy={100}
          systemName={'testIOC:Harp3'}
          usePvLabel={false}
          alarmSensitive={true}
          label='Harp 3'

          textShadow={false}
          componentGradient={true}
          handleHarpInsertedOrRemoved={this.props.handleHarpInsertedOrRemoved}

        /> */}
                    <Harp
                      //maxHarpsReached={this.props.maxHarpsReached}
                      maxHarpsReached={false}
                      x={500}
                      y={yOffset}

                      usePvLabel={false}
                      alarmSensitive={true}


                      textShadow={false}
                      componentGradient={true}
                      //handleHarpInsertedOrRemoved={this.props.handleHarpInsertedOrRemoved}
                      pv={'pva://$(IOC):$(actuatorName):put-outIn'}
                      isMovingPv={'pva://$(IOC):$(actuatorName):get-status.B5'}
                      inLimitPv={'pva://$(IOC):$(actuatorName):get-status.B6'}
                      outLimitPv={'pva://$(IOC):$(actuatorName):get-status.B7'}
                      inLimitValue={1}
                      outLimitValue={1}
                      isMovingValue={1}
                      maxHarpsReached={false}

                      label={'$(actuatorName)'}

                      macros={{
                        '$(IOC)': 'testIOC',
                        '$(actuatorName)': 'Harp3',

                      }
                      }
                    />



                    <SteererXYMagnet

                      handleOnClick={this.handleOnSystemClick}
                      system={systems.BeamLine.PowerSupplies.STR2XY}

                      xPv={systems.BeamLine.PowerSupplies.STR2XY.xReadbackPv}
                      yPv={systems.BeamLine.PowerSupplies.STR2XY.yReadbackPv}
                      label={systems.BeamLine.PowerSupplies.STR2XY.displayName}
                      macros={systems.BeamLine.PowerSupplies.STR2XY.macros}
                      {...systems.BeamLine.PowerSupplies.STR2XY.svgProps}



                    />
                    <SteererXYMagnet

                      handleOnClick={this.handleOnSystemClick}
                      system={systems.BeamLine.PowerSupplies.STR1XY}

                      xPv={systems.BeamLine.PowerSupplies.STR1XY.xReadbackPv}
                      yPv={systems.BeamLine.PowerSupplies.STR1XY.yReadbackPv}
                      label={systems.BeamLine.PowerSupplies.STR1XY.displayName}
                      macros={systems.BeamLine.PowerSupplies.STR1XY.macros}
                      {...systems.BeamLine.PowerSupplies.STR1XY.svgProps}



                    />

                    <SteererYMagnet
                      handleOnClick={this.handleOnSystemClick}
                      system={systems.BeamLine.PowerSupplies.STR2}
                      pv={systems.BeamLine.PowerSupplies.STR2.readbackPv}
                      label={systems.BeamLine.PowerSupplies.STR2.displayName}
                      macros={systems.BeamLine.PowerSupplies.STR2.macros}
                      {...systems.BeamLine.PowerSupplies.STR2.svgProps}
                    />

                    <SteererYMagnet
                      handleOnClick={this.handleOnSystemClick}
                      system={systems.BeamLine.PowerSupplies.STR3}
                      pv={systems.BeamLine.PowerSupplies.STR3.readbackPv}
                      label={systems.BeamLine.PowerSupplies.STR3.displayName}
                      macros={systems.BeamLine.PowerSupplies.STR3.macros}
                      {...systems.BeamLine.PowerSupplies.STR3.svgProps}
                    />

                    <BendingMagnet
                      handleOnClick={this.handleOnSystemClick}
                      system={systems.BeamLine.PowerSupplies.BM1}
                      pv={systems.BeamLine.PowerSupplies.BM1.readbackPv}
                      label={systems.BeamLine.PowerSupplies.BM1.displayName}
                      macros={systems.BeamLine.PowerSupplies.BM1.macros}
                      {...systems.BeamLine.PowerSupplies.BM1.svgProps}
                    />

                    {/* 
                    <SlitXY
                      handleOnClick={this.handleOnSystemClick}
                      system={{
                        systemName: 'testIOC:SLITXY1',
                        displayName: 'SLITXY1',
                        editorType: 'slitxy',
                        devices:
                        {
                          xGapDevice: { deviceName: 'testIOC:SLITXY1:X:Gap', readback: 'Readback', setpoint: 'Setpoint' },
                          xOffsetDevice: { deviceName: 'testIOC:SLITXY1:X:Offset', readback: 'Readback', setpoint: 'Setpoint' },
                          yGapDevice: { deviceName: 'testIOC:SLITXY1:Y:Gap', readback: 'Readback', setpoint: 'Setpoint' },
                          yOffsetDevice: { deviceName: 'testIOC:SLITXY1:Y:Offset', readback: 'Readback', setpoint: 'Setpoint' }
                        }
                      }}
                      cx={900}
                      cy={100}
                      prec={2}
                      usePrecision={true}
                      usePvUnits={true}
                      usePvLabel={false}
                      alarmSensitive={true}
                      label='SlitXY 1'
                      labelOffsetY={-14}
                      labelOffsetX={0}
                      valueOffsetY={18}
                      valueOffsetX={0}
                      componentShadow={true}
                      textShadow={false}
                      componentGradient={true}
                    /> */}

                    <SlitXY
                      handleOnClick={this.handleOnSystemClick}
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
                      handleOnClick={this.handleOnSystemClick}
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
                      //maxHarpsReached={this.props.maxHarpsReached}
                      maxHarpsReached={false}
                      x={1150}
                      y={yOffset}

                      usePvLabel={false}
                      alarmSensitive={true}


                      textShadow={false}
                      componentGradient={true}
                      //handleHarpInsertedOrRemoved={this.props.handleHarpInsertedOrRemoved}
                      pv={'pva://$(IOC):$(actuatorName):put-outIn'}
                      isMovingPv={'pva://$(IOC):$(actuatorName):get-status.B5'}
                      inLimitPv={'pva://$(IOC):$(actuatorName):get-status.B6'}
                      outLimitPv={'pva://$(IOC):$(actuatorName):get-status.B7'}
                      inLimitValue={1}
                      outLimitValue={1}
                      isMovingValue={1}
                      maxHarpsReached={false}

                      label={'$(actuatorName)'}

                      macros={{
                        '$(IOC)': 'testIOC',
                        '$(actuatorName)': 'Harp4',

                      }
                      }
                    />

                  </BeamLineCanvas>
                  {/* <ControlTopHarpEx1

                      handleOnSystemClick={this.handleOnSystemClick}
                      handleHarpInsertedOrRemoved={this.handleHarpInsertedOrRemoved}
                      handlePsOnClick={this.handlePsOnClick}
                      maxHarpsReached={this.state.maxHarpsReached}
                    /> */}



                </Grid>

                <Grid item sm={12}>
                  <AppBar position="static" color='inherit' indicatorcolor="secondary">
                    <Tabs
                      value={tabValue}
                      onChange={this.handleTabChange}
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

                          <div style={{ height: '30vh', marginLeft: 10, marginRight: 10, marginTop: 20 }}>

                            {(typeof this.state.x0SystemName !== 'undefined') && <React.Fragment>


                              <HarpRangeSelection onlyX={this.state.onlyX0} onlyY={this.state.onlyY0} key={'harpRangeSelectionx0' + this.state.x0SystemName} systemName={this.state.x0SystemName} label={'Range'} />
                              <div style={{ marginBottom: 8 }}>
                                {((this.state.onlyY0 === false) && (this.state.onlyX0 === false)) &&
                                  <ActionButton key={'storex0' + this.state.x0SystemName} pvs={['pva://$(device):x_store_offset', 'pva://$(device):y_store_offset']} macros={{ '$(device)': this.state.x0SystemName }} actionValue={"1"} actionString={"Store Offset"} />
                                }
                                {((this.state.onlyY0 === true) && (this.state.onlyX0 === false)) &&
                                  <ActionButton key={'storex0' + this.state.x0SystemName} pvs={['pva://$(device):y_store_offset']} macros={{ '$(device)': this.state.x0SystemName }} actionValue={"1"} actionString={"Store Offset"} />
                                }
                                {((this.state.onlyY0 === false) && (this.state.onlyX0 === true)) &&
                                  <ActionButton key={'storex0' + this.state.x0SystemName} pvs={['pva://$(device):x_store_offset']} macros={{ '$(device)': this.state.x0SystemName }} actionValue={"1"} actionString={"Store Offset"} />
                                }
                              </div>
                              <div style={{ marginBottom: 8 }}>
                                {((this.state.onlyY0 === false) && (this.state.onlyX0 === false)) &&
                                  <ActionButton key={'clearx0' + this.state.x0SystemName} pvs={['pva://$(device):x_store_offset', 'pva://$(device):y_store_offset']} macros={{ '$(device)': this.state.x0SystemName }} actionValue={"0"} actionString={"Clear Offset"} />
                                }
                                {((this.state.onlyY0 === true) && (this.state.onlyX0 === false)) &&
                                  <ActionButton key={'clearx0' + this.state.x0SystemName} pvs={['pva://$(device):y_store_offset']} macros={{ '$(device)': this.state.x0SystemName }} actionValue={"0"} actionString={"Clear Offset"} />
                                }
                                {((this.state.onlyY0 === false) && (this.state.onlyX0 === true)) &&
                                  <ActionButton key={'clearx0' + this.state.x0SystemName} pvs={['pva://$(device):x_store_offset']} macros={{ '$(device)': this.state.x0SystemName }} actionValue={"0"} actionString={"Clear Offset"} />
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
                              <div style={{ height: '30vh' }}>

                                {((this.state.onlyY0 === false) && this.state.x0GraphPVs.length > 0) && <HarpGraph
                                  ymax={2000}
                                  units={'pA'}
                                  key={this.state.x0GraphKey}
                                  dataPVs={this.state.x0GraphPVs}
                                  rangePV={this.state.x0RangePV}
                                  legend={this.state.x0legend}
                                  changeOtherGraphYmax={this.changeTopYgraphYmax}
                                  ymaxFromOtherGraph={this.state.TopXgraphYmax}
                                  ylabel="X Axis"
                                />}

                                {/*}<GraphTest style pv='pva://testIOC:test4'  />*/}
                              </div>
                            </Grid>
                            <Grid item sm={6}>
                              <div style={{ height: '30vh' }}>

                                {((this.state.onlyX0 === false) && this.state.y0GraphPVs.length > 0) && <HarpGraph
                                  ymax={2000}
                                  units={'pA'}
                                  key={this.state.y0GraphKey}
                                  dataPVs={this.state.y0GraphPVs}
                                  rangePV={this.state.y0RangePV}
                                  legend={this.state.y0legend}
                                  changeOtherGraphYmax={this.changeTopXgraphYmax}
                                  ymaxFromOtherGraph={this.state.TopYgraphYmax}
                                  ylabel="Y Axis"

                                />}
                                {/*  <GraphTest style pv='pva://testIOC:PS1:Readback:History'  />*/}
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm={12}>
                      <div style={{ height: '30vh' }}>
                        <Grid
                          container
                          direction="row"
                          justify="flex-start"
                          alignItems="center"
                        >
                          <Grid item sm={2}>
                            <div style={{ height: '30vh', marginLeft: 10, marginRight: 10, marginTop: 20 }}>

                              {(typeof this.state.x1SystemName !== 'undefined') && <React.Fragment>


                                <HarpRangeSelection onlyX={this.state.onlyX1} onlyY={this.state.onlyY1} key={'harpRangeSelectionx1' + this.state.x1SystemName} systemName={this.state.x1SystemName} label={'Range'} />
                                <div style={{ marginBottom: 8 }}>
                                  {((this.state.onlyY1 === false) && (this.state.onlyX1 === false)) &&
                                    <ActionButton key={'storex1' + this.state.x1SystemName} pvs={['pva://$(device):x_store_offset', 'pva://$(device):y_store_offset']} macros={{ '$(device)': this.state.x1SystemName }} actionValue={"1"} actionString={"Store Offset"} />
                                  }
                                  {((this.state.onlyY1 === true) && (this.state.onlyX1 === false)) &&
                                    <ActionButton key={'storex1' + this.state.x1SystemName} pvs={['pva://$(device):y_store_offset']} macros={{ '$(device)': this.state.x1SystemName }} actionValue={"1"} actionString={"Store Offset"} />
                                  }
                                  {((this.state.onlyY1 === false) && (this.state.onlyX1 === true)) &&
                                    <ActionButton key={'storex1' + this.state.x1SystemName} pvs={['pva://$(device):x_store_offset']} macros={{ '$(device)': this.state.x1SystemName }} actionValue={"1"} actionString={"Store Offset"} />
                                  }
                                </div>
                                <div style={{ marginBottom: 8 }}>
                                  {((this.state.onlyY1 === false) && (this.state.onlyX1 === false)) &&
                                    <ActionButton key={'clearx1' + this.state.x1SystemName} pvs={['pva://$(device):x_store_offset', 'pva://$(device):y_store_offset']} macros={{ '$(device)': this.state.x1SystemName }} actionValue={"0"} actionString={"Clear Offset"} />
                                  }
                                  {((this.state.onlyY1 === true) && (this.state.onlyX1 === false)) &&
                                    <ActionButton key={'clearx1' + this.state.x1SystemName} pvs={['pva://$(device):y_store_offset']} macros={{ '$(device)': this.state.x1SystemName }} actionValue={"0"} actionString={"Clear Offset"} />
                                  }
                                  {((this.state.onlyY1 === false) && (this.state.onlyX1 === true)) &&
                                    <ActionButton key={'clearx1' + this.state.x1SystemName} pvs={['pva://$(device):x_store_offset']} macros={{ '$(device)': this.state.x1SystemName }} actionValue={"0"} actionString={"Clear Offset"} />
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
                                  <div style={{ height: '30vh' }}>

                                    {((this.state.onlyY1 === false) && this.state.x1GraphPVs.length > 0) && <HarpGraph
                                      ymax={2000}
                                      units={'pA'}
                                      key={this.state.x1GraphKey}
                                      dataPVs={this.state.x1GraphPVs}
                                      rangePV={this.state.x1RangePV}
                                      legend={this.state.x1legend}
                                      ylabel="X Axis"
                                      changeOtherGraphYmax={this.changeBottomYgraphYmax}
                                      ymaxFromOtherGraph={this.state.BottomXgraphYmax}
                                    />}

                                    {/*}<GraphTest style pv='pva://testIOC:test4'  />*/}
                                  </div>
                                </Grid>
                                <Grid item sm={6}>
                                  <div style={{ height: '30vh' }}>

                                    {((this.state.onlyX1 === false) && this.state.y1GraphPVs.length > 0) && <HarpGraph
                                      ymax={2000}
                                      units={'pA'}
                                      key={this.state.y1GraphKey}
                                      dataPVs={this.state.y1GraphPVs}
                                      rangePV={this.state.y1RangePV}
                                      legend={this.state.y1legend}
                                      ylabel="Y Axis"
                                      changeOtherGraphYmax={this.changeBottomXgraphYmax}
                                      ymaxFromOtherGraph={this.state.BottomYgraphYmax}
                                    />}
                                    {/*  <GraphTest style pv='pva://testIOC:PS1:Readback:History'  />*/}
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
                            onChange={this.handleSideTabChange}

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
                        {sideTabValue === 0 && <TabContainer style={{overflowY:'scroll',maxHeight:'50vh'}}> <ControlTable handleOnSystemClick={this.handleOnSystemClick} systems={allSystems}  />                            </TabContainer>}
                        {sideTabValue === 1 && <TabContainer> <ControlTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['BeamLine']['PowerSupplies']} />  </TabContainer>}
                        {sideTabValue === 2 && <TabContainer > <ControlTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['BeamLine']['Slits']} />         </TabContainer>}
                      </Grid>
                    </Grid>
                  </Grid>}


              </Grid>

            </Grid>
            <Grid item sm={3} >
              {((this.state.displayEditor === true) && (this.state.editorType === 'editorSteererXY')) && <EditorSteererXY key={'editor-key' + this.state.editorSystem.systemName} system={this.state.editorSystem} handleCloseEditor={this.handleCloseEditor} />}
              {((this.state.displayEditor === true) && (this.state.editorType === 'editorSinglePS')) && <EditorSinglePS key={'editor-key' + this.state.editorSystem.systemName} system={this.state.editorSystem} handleCloseEditor={this.handleCloseEditor} />}
              {((this.state.displayEditor === true) && (this.state.editorType === 'editorSlitXY')) && <EditorSlitXY key={'editor-key' + this.state.editorSystem.systemName} system={this.state.editorSystem} handleCloseEditor={this.handleCloseEditor} />}
            </Grid>
          </Grid>
        </TraditionalLayout>
      </div>





    );
  }
}

BeamlineControlSystem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BeamlineControlSystem);
                    //export default BeamlineControlSystem;
