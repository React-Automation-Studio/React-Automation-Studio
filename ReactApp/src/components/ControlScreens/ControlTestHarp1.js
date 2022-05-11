//This example is deprecated and will be removed in a future release 
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
import ControlTopHarpEx1 from '../ControlScreens/GridComponents/ControlTopHarpEx1'

import HarpGraph from '../SiteSpecificComponents/iThembaLABS/CompoundComponents/HarpGraph';

import AppBar from '@material-ui/core/AppBar';

import GraphY from '../BaseComponents/GraphY';
import ControlCenterTable from '../ControlScreens/GridComponents/ControlCenterTable'
import TraditionalLayout from '../UI/Layout/ComposedLayouts/TraditionalLayout.js';

console.warn("This example is deprecated and will be removed in a future release")

const VerticalTabs = withStyles(theme => ({
  flexContainer: {
    flexDirection: 'column'
  },
  indicator: {
    display: 'none',
  }
}))(Tabs)

const systems={
  'BeamLine':{
    'PowerSupplies':[
      {systemName:'testIOC:PS1'     , displayName:'Q1'        ,editorType:'oldPS',devices:{device:{deviceName:'testIOC:PS1'     ,readback:'Readback',setpoint:'Setpoint',statusText:'On'}},props:{prec:3,units:"A",useStatus:true}},
      {systemName:'testIOC:PS2'     , displayName:'Q2'        ,editorType:'oldPS',devices:{device:{deviceName:'testIOC:PS2'     ,readback:'Readback',setpoint:'Setpoint',statusText:'On'}},props:{prec:3,units:"A",useStatus:true}},
      {systemName:'testIOC:PS3'     , displayName:'Q3'        ,editorType:'oldPS',devices:{device:{deviceName:'testIOC:PS3'     ,readback:'Readback',setpoint:'Setpoint',statusText:'On'}},props:{prec:3,units:"A",useStatus:true}},
      {systemName:'testIOC:PS4'     , displayName:'BM1'       ,editorType:'oldPS',devices:{device:{deviceName:'testIOC:PS4'     ,readback:'Readback',setpoint:'Setpoint',statusText:'On'}},props:{prec:3,units:"A",useStatus:true}},
      {systemName:'testIOC:STR1:X'  , displayName:'STR1XY:X'  ,editorType:'singlePS',devices:{device:{deviceName:'testIOC:STR1:X'     ,readback:'Readback',setpoint:'Setpoint',statusText:'On'}},props:{prec:3,units:"A",useStatus:true}},
      {systemName:'testIOC:STR1:Y'  , displayName:'STR1XY:Y'  ,editorType:'singlePS',devices:{device:{deviceName:'testIOC:STR1:Y'     ,readback:'Readback',setpoint:'Setpoint',statusText:'On'}},props:{prec:3,units:"A",useStatus:true}},

      {systemName:'testIOC:STR2:X'  , displayName:'STR2XY:X'  ,editorType:'singlePS',devices:{device:{deviceName:'testIOC:STR2:X'     ,readback:'Readback',setpoint:'Setpoint',statusText:'On'}},props:{prec:3,units:"A",useStatus:true}},
      {systemName:'testIOC:STR2:Y'  , displayName:'STR2XY:Y'  ,editorType:'singlePS',devices:{device:{deviceName:'testIOC:STR2:Y'     ,readback:'Readback',setpoint:'Setpoint',statusText:'On'}},props:{prec:3,units:"A",useStatus:true}},

      {systemName:'testIOC:STR3:Y'  , displayName:'STR3:Y'  ,editorType:'singlePS',devices:{device:{deviceName:'testIOC:STR3:Y'     ,readback:'Readback',setpoint:'Setpoint',statusText:'On'}},props:{prec:3,units:"A",useStatus:true}},
      {systemName:'testIOC:STR4:X'  , displayName:'STR4:X'  ,editorType:'singlePS',devices:{device:{deviceName:'testIOC:STR4:X'     ,readback:'Readback',setpoint:'Setpoint',statusText:'On'}},props:{prec:3,units:"A",useStatus:true}},
    ],
    'Slits':[
      {systemName:'testIOC:SLITXY1' , displayName:'SLITXY1 X Gap'   ,editorType:'slitxy',

        devices:
        { device:{deviceName:'testIOC:SLITXY1:X',readback:'Gap:Readback',setpoint:'Gap:Setpoint',statusText:'Drive:On'},

          xGapDevice:{deviceName:'testIOC:SLITXY1:X',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
          xOffsetDevice:{deviceName:'testIOC:SLITXY1:X',readback:'Offset:Readback',setpoint:'Offset:Setpoint'},
          yGapDevice:{deviceName:'testIOC:SLITXY1:Y',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
          yOffsetDevice:{deviceName:'testIOC:SLITXY1:Y',readback:'Offset:Readback',setpoint:'Offset:Setpoint'}
        },
        props:{prec:2,units:"mm",useStatus:true},
      },
      {systemName:'testIOC:SLITXY1' , displayName:'SLITXY1 X Offset'   ,editorType:'slitxy',

        devices:
        { device:{deviceName:'testIOC:SLITXY1:X',readback:'Offset:Readback',setpoint:'Offset:Setpoint',statusText:'Drive:On'},

          xGapDevice:{deviceName:'testIOC:SLITXY1:X',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
          xOffsetDevice:{deviceName:'testIOC:SLITXY1:X',readback:'Offset:Readback',setpoint:'Offset:Setpoint'},
          yGapDevice:{deviceName:'testIOC:SLITXY1:Y',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
          yOffsetDevice:{deviceName:'testIOC:SLITXY1:Y',readback:'Offset:Readback',setpoint:'Offset:Setpoint'}
        },
        props:{prec:2,units:"mm",useStatus:true},
      },
      {systemName:'testIOC:SLITXY1' , displayName:'SLITXY1 Y Gap'   ,editorType:'slitxy',

        devices:
        { device:{deviceName:'testIOC:SLITXY1:Y',readback:'Gap:Readback',setpoint:'Gap:Setpoint',statusText:'Drive:On'},

          xGapDevice:{deviceName:'testIOC:SLITXY1:X',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
          xOffsetDevice:{deviceName:'testIOC:SLITXY1:X',readback:'Offset:Readback',setpoint:'Offset:Setpoint'},
          yGapDevice:{deviceName:'testIOC:SLITXY1:Y',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
          yOffsetDevice:{deviceName:'testIOC:SLITXY1:Y',readback:'Offset:Readback',setpoint:'Offset:Setpoint'}
        },
        props:{prec:2,units:"mm",useStatus:true},
      },
      {systemName:'testIOC:SLITXY1' , displayName:'SLITXY1 Y Offset'   ,editorType:'slitxy',

        devices:
        { device:{deviceName:'testIOC:SLITXY1:Y',readback:'Offset:Readback',setpoint:'Offset:Setpoint',statusText:'Drive:On'},

          xGapDevice:{deviceName:'testIOC:SLITXY1:X',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
          xOffsetDevice:{deviceName:'testIOC:SLITXY1:X',readback:'Offset:Readback',setpoint:'Offset:Setpoint'},
          yGapDevice:{deviceName:'testIOC:SLITXY1:Y',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
          yOffsetDevice:{deviceName:'testIOC:SLITXY1:Y',readback:'Offset:Readback',setpoint:'Offset:Setpoint'}
        },
        props:{prec:2,units:"mm",useStatus:true},
      },
      {systemName:'testIOC:SLITXY2' , displayName:'SLITXY2 X Gap'   ,editorType:'slitxy',

        devices:
        { device:{deviceName:'testIOC:SLITXY2:X',readback:'Gap:Readback',setpoint:'Gap:Setpoint',statusText:'Drive:On'},

          xGapDevice:{deviceName:'testIOC:SLITXY2:X',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
          xOffsetDevice:{deviceName:'testIOC:SLITXY2:X',readback:'Offset:Readback',setpoint:'Offset:Setpoint'},
          yGapDevice:{deviceName:'testIOC:SLITXY2:Y',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
          yOffsetDevice:{deviceName:'testIOC:SLITXY2:Y',readback:'Offset:Readback',setpoint:'Offset:Setpoint'}
        },
        props:{prec:2,units:"mm",useStatus:true},
      },
      {systemName:'testIOC:SLITXY2' , displayName:'SLITXY2 X Offset'   ,editorType:'slitxy',

        devices:
        { device:{deviceName:'testIOC:SLITXY2:X',readback:'Offset:Readback',setpoint:'Offset:Setpoint',statusText:'Drive:On'},

          xGapDevice:{deviceName:'testIOC:SLITXY2:X',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
          xOffsetDevice:{deviceName:'testIOC:SLITXY2:X',readback:'Offset:Readback',setpoint:'Offset:Setpoint'},
          yGapDevice:{deviceName:'testIOC:SLITXY2:Y',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
          yOffsetDevice:{deviceName:'testIOC:SLITXY2:Y',readback:'Offset:Readback',setpoint:'Offset:Setpoint'}
        },
        props:{prec:2,units:"mm",useStatus:true},
      },
      {systemName:'testIOC:SLITXY2' , displayName:'SLITXY2 Y Gap'   ,editorType:'slitxy',

        devices:
        { device:{deviceName:'testIOC:SLITXY2:Y',readback:'Gap:Readback',setpoint:'Gap:Setpoint',statusText:'Drive:On'},

          xGapDevice:{deviceName:'testIOC:SLITXY2:X',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
          xOffsetDevice:{deviceName:'testIOC:SLITXY2:X',readback:'Offset:Readback',setpoint:'Offset:Setpoint'},
          yGapDevice:{deviceName:'testIOC:SLITXY2:Y',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
          yOffsetDevice:{deviceName:'testIOC:SLITXY2:Y',readback:'Offset:Readback',setpoint:'Offset:Setpoint'}
        },
        props:{prec:2,units:"mm",useStatus:true},
      },
      {systemName:'testIOC:SLITXY2' , displayName:'SLITXY2 Y Offset'   ,editorType:'slitxy',

        devices:
        { device:{deviceName:'testIOC:SLITXY2:Y',readback:'Offset:Readback',setpoint:'Offset:Setpoint',statusText:'Drive:On'},

          xGapDevice:{deviceName:'testIOC:SLITXY2:X',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
          xOffsetDevice:{deviceName:'testIOC:SLITXY2:X',readback:'Offset:Readback',setpoint:'Offset:Setpoint'},
          yGapDevice:{deviceName:'testIOC:SLITXY2:Y',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
          yOffsetDevice:{deviceName:'testIOC:SLITXY2:Y',readback:'Offset:Readback',setpoint:'Offset:Setpoint'}
        },
        props:{prec:2,units:"mm",useStatus:true},
      },
    ]
  },
}

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
    <Typography component="div" style={{ padding: 8 * 0 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class ControlTestHarp1 extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      'tabValue':0,
      'sideTabValue':0,
      'editorType':'PS',
      'displayEditor':false,
      'editorMacros':{'$(device)':""},
      'editorSystem':{},
      'displayHarps':[
        {systemName:'testIOC:Harp1' ,displayName:'Harp 1',inserted:false},
        {systemName:'testIOC:Harp2' ,displayName:'Harp 2',inserted:false},
        {systemName:'testIOC:Harp3' ,displayName:'Harp 3',inserted:false},
        {systemName:'testIOC:Harp4' ,displayName: 'Harp 4',inserted:false},
      ],
      'maxHarpsReached':false,

      'x0GraphPVs':[],
      'y0GraphPVs':[],
      'x0legend':[],
      'y0legend':[],
      'x0GraphKey':"",
      'onlyY0':false,
      'onlyX0':false,
      'x1GraphPVs':[],
      'y1GraphPVs':[],
      'x1legend':[],
      'y1legend':[],
      'x1GraphKey':"",
      'onlyY1':false,
      'onlyX1':false,
    }
    this.handlePsOnClick= this.handlePsOnClick.bind(this);
    this.handleOnSystemClick= this.handleOnSystemClick.bind(this);

    this.handleHarpInsertedOrRemoved= this.handleHarpInsertedOrRemoved.bind(this);

    this.changeTopYgraphYmax= this.changeTopYgraphYmax.bind(this);
    this.changeTopXgraphYmax= this.changeTopXgraphYmax.bind(this);
    this.changeBottomYgraphYmax= this.changeBottomYgraphYmax.bind(this);
    this.changeBottomXgraphYmax= this.changeBottomXgraphYmax.bind(this);
    this.handleCloseEditor= this.handleCloseEditor.bind(this);
  }

  handleCloseEditor(){
    this.setState({
      displayEditor:false,}
    );
  }

  handlePsOnClick(name){
    this.setState({editorType:'PS',
      displayEditor:true,
      editorMacros:{'$(device)':name}});
  }

  changeTopYgraphYmax=(ymax)=>{
    this.setState({TopYgraphYmax:ymax})
  }

  changeTopXgraphYmax=(ymax)=>{
    this.setState({TopXgraphYmax:ymax})
  }

  changeBottomYgraphYmax=(ymax)=>{
    this.setState({BottomYgraphYmax:ymax})
  }

  changeBottomXgraphYmax=(ymax)=>{
    this.setState({BottomXgraphYmax:ymax})
  }

  handleTabChange = (event, value) => {
    this.setState({ tabValue:value });
  };

  handleOnSystemClick=(system)=>{
    this.setState({editorType:system.editorType,
    displayEditor:true,
    editorSystem:system,
    editorMacros:{'$(device)':""}});
  }

  handleHarpInsertedOrRemoved=(inserted,name)=>{
    let displayHarps=this.state.displayHarps;
    let harp;
    let x0GraphPVs=[];
    let y0GraphPVs=[];
    let x0legend=[];
    let y0legend=[];
    let x0GraphKey="x0Graph";
    let y0GraphKey="y0Graph";
    let x1GraphPVs=[];
    let y1GraphPVs=[];
    let x0SystemName;
    let x1SystemName;
    let x0RangePV;
    let y0RangePV;
    let onlyY0=false;
    let onlyX0=false;
    let onlyY1=false;
    let onlyX1=false;
    let x1RangePV;
    let y1RangePV;
    let x1legend=[];
    let y1legend=[];
    let x1GraphKey="x1Graph";
    let y1GraphKey="y1Graph";
    let numberOfInsertedGraphs=0;
    let maxHarpsReached=false;
    for (harp in displayHarps){
      if (displayHarps[harp].systemName===name){
        displayHarps[harp].inserted=inserted;
      }
      if (displayHarps[harp].inserted===true){
        if(numberOfInsertedGraphs===0){
          if(typeof displayHarps[harp].onlyY!=='undefined'){
            x0GraphPVs.push(displayHarps[harp].systemName+':ycur');
            x0RangePV=displayHarps[harp].systemName+':yrange';
            onlyY0=true;
          }
          else {
            x0GraphPVs.push(displayHarps[harp].systemName+':xcur');
            x0RangePV=displayHarps[harp].systemName+':xrange';
            onlyY0=false;
          }

          x0legend.push(displayHarps[harp].displayName);
          x0GraphKey=x0GraphKey+displayHarps[harp].systemName;
          x0SystemName=displayHarps[harp].systemName;

          if(typeof displayHarps[harp].onlyX!=='undefined'){
            y0GraphPVs.push(displayHarps[harp].systemName+':xcur');
            y0RangePV=displayHarps[harp].systemName+':xrange';
            onlyX0=true;
          }
          else{
            y0GraphPVs.push(displayHarps[harp].systemName+':ycur');
            y0RangePV=displayHarps[harp].systemName+':yrange';
            onlyX0=false;
          }
          y0GraphKey=y0GraphKey+displayHarps[harp].systemName;
          y0legend.push(displayHarps[harp].displayName);

          numberOfInsertedGraphs++;
        }else{
          if(typeof displayHarps[harp].onlyY!=='undefined'){
            x1GraphPVs.push(displayHarps[harp].systemName+':ycur');
            x1RangePV=displayHarps[harp].systemName+':yrange';
            onlyY1=true;
          }
          else {
            x1GraphPVs.push(displayHarps[harp].systemName+':xcur');
            x1RangePV=displayHarps[harp].systemName+':xrange';
            onlyY1=false;
          }

          if(typeof displayHarps[harp].onlyX!=='undefined'){
            y1GraphPVs.push(displayHarps[harp].systemName+':xcur');
            y1RangePV=displayHarps[harp].systemName+':xrange';
            onlyX1=true;
          }
          else{
            y1GraphPVs.push(displayHarps[harp].systemName+':ycur');
            y1RangePV=displayHarps[harp].systemName+':yrange';
            onlyX1=false;
          }

          x1legend.push(displayHarps[harp].displayName);
          y1legend.push(displayHarps[harp].displayName);
          x1GraphKey=x1GraphKey+displayHarps[harp].systemName;
          y1GraphKey=y1GraphKey+displayHarps[harp].systemName;
          x1SystemName=displayHarps[harp].systemName;
          numberOfInsertedGraphs++;
        }
      }
    }
    if  (numberOfInsertedGraphs>=2){
      maxHarpsReached=true;
    }

    this.setState({displayHarps:displayHarps,maxHarpsReached:maxHarpsReached,
      x0GraphPVs:x0GraphPVs,y0GraphPVs:y0GraphPVs,x0legend:x0legend,y0legend:y0legend,x0GraphKey:x0GraphKey,y0GraphKey:y0GraphKey,
      x1GraphPVs:x1GraphPVs,y1GraphPVs:y1GraphPVs,x1legend:x1legend,y1legend:y1legend,x1GraphKey:x1GraphKey,y1GraphKey:y1GraphKey,
      x0RangePV:x0RangePV,x1RangePV:x1RangePV,y0RangePV:y0RangePV,y1RangePV:y1RangePV,x0SystemName:x0SystemName,x1SystemName:x1SystemName,
      onlyX0:onlyX0,onlyX1:onlyX1,onlyY0:onlyY0,onlyY1:onlyY1})
    }

    handleSideTabChange = (event, value) => {
      this.setState({ sideTabValue:value});
    };

    render() {
      const { tabValue } = this.state;
      const sideTabValue  = this.state.sideTabValue;
      return (
        <div style={{"overflowX": "hidden",'overflowY':'hidden'}}>
          <TraditionalLayout
        title="Beamline Control System Example"
        denseAppBar
      >
          <Grid container spacing={3} style={{paddingTop:16}}>
            <Grid item sm={9}>
              <Grid container spacing={3}>
                <Grid item sm={12}>
                  <div style={{height:'20vh'}}>
                    <ControlTopHarpEx1
                      handleOnSystemClick={this.handleOnSystemClick}
                      handleHarpInsertedOrRemoved={this.handleHarpInsertedOrRemoved}
                      handlePsOnClick={this.handlePsOnClick}
                      maxHarpsReached={this.state.maxHarpsReached}
                    />
                  </div>
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
                      <Tab label="Beam Diagnostics" />
                      <Tab label="Power Supplies Diagnostics" />
                      <Tab label="Ion Source" />
                      <Tab label="Table" />
                    </Tabs>
                  </AppBar>
                </Grid>

                {tabValue===0&&
                  <React.Fragment>
                    <Grid item sm={12}>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <Grid item sm={2} >
                          <div style={{height:'30vh',marginLeft:10,marginRight:10,marginTop:20}}>
                            { (typeof this.state.x0SystemName !=='undefined')&& <React.Fragment>
                              <HarpRangeSelection onlyX={this.state.onlyX0} onlyY={this.state.onlyY0} key={'harpRangeSelectionx0'+this.state.x0SystemName} systemName={this.state.x0SystemName} label={'Range'}/>
                              <div style={{marginBottom:8}}>
                                {((this.state.onlyY0===false)&&(this.state.onlyX0===false))&&
                                  <ActionButton  key={'storex0'+this.state.x0SystemName} pvs={['$(device):x_store_offset','$(device):y_store_offset']}  macros={{'$(device)':this.state.x0SystemName}}     actionValue={"1"} actionString={"Store Offset"}/>
                                }
                                {((this.state.onlyY0===true)&&(this.state.onlyX0===false))&&
                                  <ActionButton  key={'storex0'+this.state.x0SystemName} pvs={['$(device):y_store_offset']}  macros={{'$(device)':this.state.x0SystemName}}     actionValue={"1"} actionString={"Store Offset"}/>
                                }
                                {((this.state.onlyY0===false)&&(this.state.onlyX0===true))&&
                                  <ActionButton  key={'storex0'+this.state.x0SystemName} pvs={['$(device):x_store_offset']}  macros={{'$(device)':this.state.x0SystemName}}     actionValue={"1"} actionString={"Store Offset"}/>
                                }
                              </div>
                              <div style={{marginBottom:8}}>
                              {((this.state.onlyY0===false)&&(this.state.onlyX0===false))&&
                                <ActionButton key={'clearx0'+this.state.x0SystemName}  pvs={['$(device):x_store_offset','$(device):y_store_offset']}  macros={{'$(device)':this.state.x0SystemName}}     actionValue={"0"} actionString={"Clear Offset"}/>
                              }
                              {((this.state.onlyY0===true)&&(this.state.onlyX0===false))&&
                                <ActionButton key={'clearx0'+this.state.x0SystemName}  pvs={['$(device):y_store_offset']}  macros={{'$(device)':this.state.x0SystemName}}     actionValue={"0"} actionString={"Clear Offset"}/>
                              }
                              {((this.state.onlyY0===false)&&(this.state.onlyX0===true))&&
                                <ActionButton key={'clearx0'+this.state.x0SystemName}  pvs={['$(device):x_store_offset']}  macros={{'$(device)':this.state.x0SystemName}}     actionValue={"0"} actionString={"Clear Offset"}/>
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
                              <div style={{height:'30vh'}}>
                                {((this.state.onlyY0===false)&&this.state.x0GraphPVs.length>0)&&<HarpGraph
                                  ymax={2000}
                                  units={'pA'}
                                  key={this.state.x0GraphKey}
                                  dataPVs={this.state.x0GraphPVs}
                                  rangePV={this.state.x0RangePV}
                                  legend = {this.state.x0legend}
                                  changeOtherGraphYmax={this.changeTopYgraphYmax}
                                  ymaxFromOtherGraph={this.state.TopXgraphYmax}
                                  ylabel="X Axis"
                                />}
                              </div>
                            </Grid>
                            <Grid item sm={6}>
                              <div style={{height:'30vh'}}>
                                {((this.state.onlyX0===false)&&this.state.y0GraphPVs.length>0)&&<HarpGraph
                                  ymax={2000}
                                  units={'pA'}
                                  key={this.state.y0GraphKey}
                                  dataPVs={this.state.y0GraphPVs}
                                  rangePV={this.state.y0RangePV}
                                  legend = {this.state.y0legend}
                                  changeOtherGraphYmax={this.changeTopXgraphYmax}
                                  ymaxFromOtherGraph={this.state.TopYgraphYmax}
                                  ylabel="Y Axis"
                                />}
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm={12}>
                      <div style={{height:'30vh'}}>
                        <Grid
                          container
                          direction="row"
                          justify="flex-start"
                          alignItems="center"
                        >
                          <Grid item sm={2}>
                            <div style={{height:'30vh',marginLeft:10,marginRight:10,marginTop:20}}>
                              { (typeof this.state.x1SystemName !=='undefined')&& <React.Fragment>
                                <HarpRangeSelection onlyX={this.state.onlyX1} onlyY={this.state.onlyY1} key={'harpRangeSelectionx1'+this.state.x1SystemName} systemName={this.state.x1SystemName} label={'Range'}/>
                                <div style={{marginBottom:8}}>
                                  {((this.state.onlyY1===false)&&(this.state.onlyX1===false))&&
                                    <ActionButton  key={'storex1'+this.state.x1SystemName} pvs={['$(device):x_store_offset','$(device):y_store_offset']}  macros={{'$(device)':this.state.x1SystemName}}     actionValue={"1"} actionString={"Store Offset"}/>
                                  }
                                  {((this.state.onlyY1===true)&&(this.state.onlyX1===false))&&
                                    <ActionButton  key={'storex1'+this.state.x1SystemName} pvs={['$(device):y_store_offset']}  macros={{'$(device)':this.state.x1SystemName}}     actionValue={"1"} actionString={"Store Offset"}/>
                                  }
                                  {((this.state.onlyY1===false)&&(this.state.onlyX1===true))&&
                                    <ActionButton  key={'storex1'+this.state.x1SystemName} pvs={['$(device):x_store_offset']}  macros={{'$(device)':this.state.x1SystemName}}     actionValue={"1"} actionString={"Store Offset"}/>
                                  }
                                </div>
                                <div style={{marginBottom:8}}>
                                {((this.state.onlyY1===false)&&(this.state.onlyX1===false))&&
                                  <ActionButton key={'clearx1'+this.state.x1SystemName}  pvs={['$(device):x_store_offset','$(device):y_store_offset']}  macros={{'$(device)':this.state.x1SystemName}}     actionValue={"0"} actionString={"Clear Offset"}/>
                                }
                                {((this.state.onlyY1===true)&&(this.state.onlyX1===false))&&
                                  <ActionButton key={'clearx1'+this.state.x1SystemName}  pvs={['$(device):y_store_offset']}  macros={{'$(device)':this.state.x1SystemName}}     actionValue={"0"} actionString={"Clear Offset"}/>
                                }
                                {((this.state.onlyY1===false)&&(this.state.onlyX1===true))&&
                                  <ActionButton key={'clearx1'+this.state.x1SystemName}  pvs={['$(device):x_store_offset']}  macros={{'$(device)':this.state.x1SystemName}}     actionValue={"0"} actionString={"Clear Offset"}/>
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
                                  <div style={{height:'30vh'}}>

                                    {((this.state.onlyY1===false)&&this.state.x1GraphPVs.length>0)&&<HarpGraph
                                      ymax={2000}
                                      units={'pA'}
                                      key={this.state.x1GraphKey}
                                      dataPVs={this.state.x1GraphPVs}
                                      rangePV={this.state.x1RangePV}
                                      legend = {this.state.x1legend}
                                      ylabel="X Axis"
                                      changeOtherGraphYmax={this.changeBottomYgraphYmax}
                                      ymaxFromOtherGraph={this.state.BottomXgraphYmax}
                                    />}
                                  </div>
                                </Grid>
                                <Grid item sm={6}>
                                  <div style={{height:'30vh'}}>
                                    {((this.state.onlyX1===false)&&this.state.y1GraphPVs.length>0)&&<HarpGraph
                                      ymax={2000}
                                      units={'pA'}
                                      key={this.state.y1GraphKey}
                                      dataPVs={this.state.y1GraphPVs}
                                      rangePV={this.state.y1RangePV}
                                      legend = {this.state.y1legend}
                                      ylabel="Y Axis"
                                      changeOtherGraphYmax={this.changeBottomXgraphYmax}
                                      ymaxFromOtherGraph={this.state.BottomYgraphYmax}
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
                {tabValue===1&&
                  <React.Fragment>
                    <Grid
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="center"
                    >
                      <Grid item sm={6}>
                        <div style={{height:'50vh',marginLeft:10,marginRight:10,marginTop:20}}>
                          <GraphY
                            pvs={['testIOC:PS1:Readback','testIOC:PS2:Readback','testIOC:PS3:Readback'  ]}
                            maxLength={600}
                            legend = {[
                              'Q1 readback',
                              'Q2 readback',
                              'Q3 readback',
                            ]}
                            yUnits={' A'}
                            useTimeStamp={true}
                            usePolling={true}
                            pollingRate={100}
                          />
                        </div>
                      </Grid>
                      <Grid item sm={6}>
                        <div style={{height:'50vh',marginLeft:10,marginRight:10,marginTop:20}}>
                          <GraphY
                            pvs={[
                              'testIOC:PS1:Setpoint',
                              'testIOC:PS2:Setpoint',
                              'testIOC:PS3:Setpoint',
                            ]}

                            maxLength={600}
                            usePolling={true}
                            pollingRate={100}
                            legend = {[
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

                {tabValue===2&&
                  <React.Fragment>
                    <Grid item sm={12}>
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                      >
                        <Grid item sm={2} style={{marginLeft:10}}>
                          <ToggleButton pv='testIOC:BeamlineA:BeamOn'  label={"Beam On"} labelPlacement={"top"}/>
                        </Grid>
                      </Grid>
                    </Grid>
                  </React.Fragment>}

                {tabValue===3  &&
                  <Grid item sm={12}>
                    <Grid
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-start"
                    >
                      <Grid item sm={2}>
                        <AppBar position="static" color="inherit" >
                          <VerticalTabs
                            value={sideTabValue}
                            onChange={this.handleSideTabChange}

                            indicatorColor="primary"
                            textColor="primary"
                          >
                            <Tab label="Power Supplies" />    {/* side Tab 0*/}
                            <Tab label="Slits" />  {/* side Tab 1*/}
                          </VerticalTabs>
                        </AppBar>
                      </Grid>
                      <Grid item sm={10}>
                        {sideTabValue===0&&<TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['BeamLine']['PowerSupplies']}         /> </TabContainer>}
                        {sideTabValue===1&&<TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['BeamLine']['Slits']}         /> </TabContainer>}
                      </Grid>
                    </Grid>
                  </Grid>}
              </Grid>
            </Grid>
            <Grid item sm={3} >
              {((this.state.displayEditor===true) &&(this.state.editorMacros['$(device)']==='testIOC:PS1'))&&<ControlRightEx1 macros={this.state.editorMacros} handleCloseEditor={this.handleCloseEditor}/>}
              {((this.state.displayEditor===true) &&(this.state.editorMacros['$(device)']==='testIOC:PS2'))&&<ControlRightEx1 macros={this.state.editorMacros} handleCloseEditor={this.handleCloseEditor}/>}
              {((this.state.displayEditor===true) &&(this.state.editorMacros['$(device)']==='testIOC:PS3'))&&<ControlRightEx1 macros={this.state.editorMacros}  handleCloseEditor={this.handleCloseEditor}/>}
              {((this.state.displayEditor===true) &&(this.state.editorMacros['$(device)']==='testIOC:PS4'))&&<ControlRightEx1 macros={this.state.editorMacros} handleCloseEditor={this.handleCloseEditor} />}
              {((this.state.displayEditor===true) &&(this.state.editorMacros['$(device)']==='testIOC:STR1:X'))&&<ControlRightEx1 macros={this.state.editorMacros}  handleCloseEditor={this.handleCloseEditor}/>}
              {((this.state.displayEditor===true) &&(this.state.editorType==='oldPS'))&&<ControlRightEx1  key={'editor-key'+this.state.editorSystem.systemName} macros={{'$(device)':this.state.editorSystem.systemName}} handleCloseEditor={this.handleCloseEditor}/>}
              {((this.state.displayEditor===true) &&(this.state.editorType==='steererXY'))&&<ControlRightSteererXY key={'editor-key'+this.state.editorSystem.systemName} system={this.state.editorSystem}  handleCloseEditor={this.handleCloseEditor}/>}
              {((this.state.displayEditor===true) &&(this.state.editorType==='singlePS'))&&<ControlRightSinglePS key={'editor-key'+this.state.editorSystem.systemName} system={this.state.editorSystem} handleCloseEditor={this.handleCloseEditor}/>}
              {((this.state.displayEditor===true) &&(this.state.editorType==='slitxy'))&&<ControlRightSlitXY key={'editor-key'+this.state.editorSystem.systemName} system={this.state.editorSystem} handleCloseEditor={this.handleCloseEditor}/>}
            </Grid>
          </Grid>
          </TraditionalLayout>
        </div>
    );
  }
}

ControlTestHarp1.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlTestHarp1);
