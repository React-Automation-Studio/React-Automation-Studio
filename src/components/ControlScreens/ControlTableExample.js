import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import EpicsBinaryOutDebug from '../GroupedComponents/EpicsBinaryOutDebug';
import EpicsAnalogOutDebug from '../GroupedComponents/EpicsAnalogOutDebug';
import EpicsMbboDebug from '../GroupedComponents/EpicsMbboDebug';
import TextUpdate from '../BaseComponents/TextUpdate';
import TextInput from '../BaseComponents/TextInput';
import TextOutput from '../BaseComponents/TextOutput';
import SimpleSlider from '../BaseComponents/SimpleSlider';
import GraphTest from '../william/GraphTest';

import Grid from '@material-ui/core/Grid';
import EpicsPV from '../SystemComponents/EpicsPV';

import SwitchComponent from '../BaseComponents/SwitchComponent';
import SelectionInput from '../BaseComponents/SelectionInput';
import HarpRangeSelection from '../SiteSpecificComponents/iThembaLABS/CompoundComponents/HarpRangeSelection';
import ToggleButton from '../BaseComponents/ToggleButton';
import ActionButton from '../BaseComponents/ActionButton';
import ActionFanoutButton from '../BaseComponents/ActionFanoutButton';
import ThumbWheel from '../BaseComponents/ThumbWheel';
import ControlRightEx1 from '../ControlScreens/GridComponents/ControlRightEx1'
import ControlRightSteererXY from '../ControlScreens/GridComponents/ControlRightSteererXY'
import ControlRightSlitXY from '../ControlScreens/GridComponents/ControlRightSlitXY'
import ControlRightSinglePS from '../ControlScreens/GridComponents/ControlRightSinglePS'


import ControlTopHarpEx1 from '../ControlScreens/GridComponents/ControlTopHarpEx1'
import ControlCenterTable from '../ControlScreens/GridComponents/ControlCenterTable'
import ControlBottomHarp1 from '../ControlScreens/GridComponents/ControlBottomHarp1'
import HarpGraph from '../SiteSpecificComponents/iThembaLABS/CompoundComponents/HarpGraph';
import SideBar from '../SystemComponents/SideBar';
import AppBar from '@material-ui/core/AppBar';


  const systems={

    'BeamLine':{
      'PowerSupplies':[
        {systemName:'testIOC:PS1'     , displayName:'Q1'        ,editorType:'oldPS',devices:{device:{deviceName:'testIOC:PS1'     ,readback:'Readback',setpoint:'Setpoint',statusText:'On'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'testIOC:PS2'     , displayName:'Q2'        ,editorType:'oldPS',devices:{device:{deviceName:'testIOC:PS2'     ,readback:'Readback',setpoint:'Setpoint',statusText:'On'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'testIOC:PS3'     , displayName:'Q3'        ,editorType:'oldPS',devices:{device:{deviceName:'testIOC:PS3'     ,readback:'Readback',setpoint:'Setpoint',statusText:'On'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'testIOC:PS4'     , displayName:'BM1'       ,editorType:'oldPS',devices:{device:{deviceName:'testIOC:PS4'     ,readback:'Readback',setpoint:'Setpoint',statusText:'On'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'testIOC:STR1:X'  , displayName:'STR1XY:X'  ,editorType:'singlePS',devices:{device:{deviceName:'testIOC:STR1:X'     ,readback:'Readback',setpoint:'Setpoint',statusText:'On'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'testIOC:STR1:Y'  , displayName:'STR1XY:Y'  ,editorType:'singlePS',devices:{device:{deviceName:'testIOC:STR1:Y'     ,readback:'Readback',setpoint:'Setpoint',statusText:'On'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},

        {systemName:'testIOC:STR2:X'  , displayName:'STR2XY:X'  ,editorType:'singlePS',devices:{device:{deviceName:'testIOC:STR2:X'     ,readback:'Readback',setpoint:'Setpoint',statusText:'On'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'testIOC:STR2:Y'  , displayName:'STR2XY:Y'  ,editorType:'singlePS',devices:{device:{deviceName:'testIOC:STR2:Y'     ,readback:'Readback',setpoint:'Setpoint',statusText:'On'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},

        {systemName:'testIOC:STR3:Y'  , displayName:'STR3:Y'  ,editorType:'singlePS',devices:{device:{deviceName:'testIOC:STR3:Y'     ,readback:'Readback',setpoint:'Setpoint',statusText:'On'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'testIOC:STR4:X'  , displayName:'STR4:X'  ,editorType:'singlePS',devices:{device:{deviceName:'testIOC:STR4:X'     ,readback:'Readback',setpoint:'Setpoint',statusText:'On'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},

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
          props:{usePrecision:true,prec:2,units:"mm",useStatus:true},
        },
        {systemName:'testIOC:SLITXY1' , displayName:'SLITXY1 X Offset'   ,editorType:'slitxy',

          devices:
          { device:{deviceName:'testIOC:SLITXY1:X',readback:'Offset:Readback',setpoint:'Offset:Setpoint',statusText:'Drive:On'},

            xGapDevice:{deviceName:'testIOC:SLITXY1:X',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
            xOffsetDevice:{deviceName:'testIOC:SLITXY1:X',readback:'Offset:Readback',setpoint:'Offset:Setpoint'},
            yGapDevice:{deviceName:'testIOC:SLITXY1:Y',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
            yOffsetDevice:{deviceName:'testIOC:SLITXY1:Y',readback:'Offset:Readback',setpoint:'Offset:Setpoint'}
          },
          props:{usePrecision:true,prec:2,units:"mm",useStatus:true},
        },
        {systemName:'testIOC:SLITXY1' , displayName:'SLITXY1 Y Gap'   ,editorType:'slitxy',

          devices:
          { device:{deviceName:'testIOC:SLITXY1:Y',readback:'Gap:Readback',setpoint:'Gap:Setpoint',statusText:'Drive:On'},

            xGapDevice:{deviceName:'testIOC:SLITXY1:X',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
            xOffsetDevice:{deviceName:'testIOC:SLITXY1:X',readback:'Offset:Readback',setpoint:'Offset:Setpoint'},
            yGapDevice:{deviceName:'testIOC:SLITXY1:Y',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
            yOffsetDevice:{deviceName:'testIOC:SLITXY1:Y',readback:'Offset:Readback',setpoint:'Offset:Setpoint'}
          },
          props:{usePrecision:true,prec:2,units:"mm",useStatus:true},
        },
        {systemName:'testIOC:SLITXY1' , displayName:'SLITXY1 Y Offset'   ,editorType:'slitxy',

          devices:
          { device:{deviceName:'testIOC:SLITXY1:Y',readback:'Offset:Readback',setpoint:'Offset:Setpoint',statusText:'Drive:On'},

            xGapDevice:{deviceName:'testIOC:SLITXY1:X',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
            xOffsetDevice:{deviceName:'testIOC:SLITXY1:X',readback:'Offset:Readback',setpoint:'Offset:Setpoint'},
            yGapDevice:{deviceName:'testIOC:SLITXY1:Y',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
            yOffsetDevice:{deviceName:'testIOC:SLITXY1:Y',readback:'Offset:Readback',setpoint:'Offset:Setpoint'}
          },
          props:{usePrecision:true,prec:2,units:"mm",useStatus:true},
        },
        {systemName:'testIOC:SLITXY2' , displayName:'SLITXY2 X Gap'   ,editorType:'slitxy',

          devices:
          { device:{deviceName:'testIOC:SLITXY2:X',readback:'Gap:Readback',setpoint:'Gap:Setpoint',statusText:'Drive:On'},

            xGapDevice:{deviceName:'testIOC:SLITXY2:X',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
            xOffsetDevice:{deviceName:'testIOC:SLITXY2:X',readback:'Offset:Readback',setpoint:'Offset:Setpoint'},
            yGapDevice:{deviceName:'testIOC:SLITXY2:Y',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
            yOffsetDevice:{deviceName:'testIOC:SLITXY2:Y',readback:'Offset:Readback',setpoint:'Offset:Setpoint'}
          },
          props:{usePrecision:true,prec:2,units:"mm",useStatus:true},
        },
        {systemName:'testIOC:SLITXY2' , displayName:'SLITXY2 X Offset'   ,editorType:'slitxy',

          devices:
          { device:{deviceName:'testIOC:SLITXY2:X',readback:'Offset:Readback',setpoint:'Offset:Setpoint',statusText:'Drive:On'},

            xGapDevice:{deviceName:'testIOC:SLITXY2:X',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
            xOffsetDevice:{deviceName:'testIOC:SLITXY2:X',readback:'Offset:Readback',setpoint:'Offset:Setpoint'},
            yGapDevice:{deviceName:'testIOC:SLITXY2:Y',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
            yOffsetDevice:{deviceName:'testIOC:SLITXY2:Y',readback:'Offset:Readback',setpoint:'Offset:Setpoint'}
          },
          props:{usePrecision:true,prec:2,units:"mm",useStatus:true},
        },
        {systemName:'testIOC:SLITXY2' , displayName:'SLITXY2 Y Gap'   ,editorType:'slitxy',

          devices:
          { device:{deviceName:'testIOC:SLITXY2:Y',readback:'Gap:Readback',setpoint:'Gap:Setpoint',statusText:'Drive:On'},

            xGapDevice:{deviceName:'testIOC:SLITXY2:X',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
            xOffsetDevice:{deviceName:'testIOC:SLITXY2:X',readback:'Offset:Readback',setpoint:'Offset:Setpoint'},
            yGapDevice:{deviceName:'testIOC:SLITXY2:Y',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
            yOffsetDevice:{deviceName:'testIOC:SLITXY2:Y',readback:'Offset:Readback',setpoint:'Offset:Setpoint'}
          },
          props:{usePrecision:true,prec:2,units:"mm",useStatus:true},
        },
        {systemName:'testIOC:SLITXY2' , displayName:'SLITXY2 Y Offset'   ,editorType:'slitxy',

          devices:
          { device:{deviceName:'testIOC:SLITXY2:Y',readback:'Offset:Readback',setpoint:'Offset:Setpoint',statusText:'Drive:On'},

            xGapDevice:{deviceName:'testIOC:SLITXY2:X',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
            xOffsetDevice:{deviceName:'testIOC:SLITXY2:X',readback:'Offset:Readback',setpoint:'Offset:Setpoint'},
            yGapDevice:{deviceName:'testIOC:SLITXY2:Y',readback:'Gap:Readback',setpoint:'Gap:Setpoint'},
            yOffsetDevice:{deviceName:'testIOC:SLITXY2:Y',readback:'Offset:Readback',setpoint:'Offset:Setpoint'}
          },
          props:{usePrecision:true,prec:2,units:"mm",useStatus:true},
        },



      ]

    },


  }


const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const VerticalTabs = withStyles(theme => ({
  flexContainer: {
    flexDirection: 'column'
  },
  indicator: {
    display: 'none',
  }
}))(Tabs)

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 0 }}>
      {props.children}
    </Typography>
  );
}

class ControlTableExample extends React.Component {
  constructor(props) {
    super(props);
    this.state={'editorType':'PS',
    'displayEditor':false,
    'editorMacros':{'$(device)':""},
    'editorSystem':{},
    'displayHarps':[
      {systemName:'harp5p' ,displayName:'Harp 5P',inserted:false},
      {systemName:'harp6p' ,displayName:'Harp 6P',inserted:false},
      {systemName:'harp7p' ,displayName:'Harp 7P',inserted:false},
      {systemName:'harp8p' ,displayName: 'Harp 8P',inserted:false},
      {systemName:'harp9p' ,displayName: 'Harp 9P',inserted:false}  ],
      'maxHarpsReached':false,

      'x0GraphPVs':[],
      'y0GraphPVs':[],
      'x0legend':[],
      'y0legend':[],
      'x0GraphKey':"",
      'x1GraphPVs':[],
      'y1GraphPVs':[],
      'x1legend':[],
      'y1legend':[],
      'x1GraphKey':"",
      topTabValue:0,
      sideTabValue:0


    }
    this.handlePsOnClick= this.handlePsOnClick.bind(this);
    this.handleOnSystemClick= this.handleOnSystemClick.bind(this);
    this.handleHarpInserted= this.handleHarpInserted.bind(this);
    this.handleHarpRemoved= this.handleHarpRemoved.bind(this);
  }

  handlePsOnClick(name){

    //  console.log("in control test1 clicked "+name.toString());
    this.setState({['editorType']:'PS',
    ['displayEditor']:true,
    ['editorMacros']:{'$(device)':name}});

    //  this.setState({ ['clicked']: 1});
  }
  handleOnSystemClick=(system)=>{
    //  console.log(system)
    this.setState({['editorType']:system.editorType,
    ['displayEditor']:true,
    ['editorSystem']:system,
    ['editorMacros']:{'$(device)':""}});
    //  console.log("in control test1 clicked "+name.toString());
    //    this.setState({['editorType']:'PS',
    //    ['displayEditor']:true,
    //    ['editorMacros']:{'$(device)':name}});

    //  this.setState({ ['clicked']: 1});
  }
  handleHarpInserted=(name)=>{
    let displayHarps=this.state.displayHarps;
    let harp;
    let x0GraphPVs=[];
    let y0GraphPVs=[];
    let x0legend=[];
    let y0legend=[];
    let x0GraphKey="x0Graph";
    let y0GraphKey="y0Graph";
    let x0RangePV;
    let y0RangePV;
    let x1RangePV;
    let x0SystemName;
    let x1SystemName;
    let y1RangePV;
    let x1GraphPVs=[];
    let y1GraphPVs=[];
    let x1legend=[];
    let y1legend=[];
    let x1GraphKey="x1Graph";
    let y1GraphKey="y1Graph";
    let numberOfInsertedGraphs=0;
    let maxHarpsReached=false;
    for (harp in displayHarps){
      if (displayHarps[harp].systemName===name){
        displayHarps[harp].inserted=true;
      }
      if (displayHarps[harp].inserted===true){
        if(numberOfInsertedGraphs===0){
          x0GraphPVs.push('pva://'+displayHarps[harp].systemName+':xcur');
          x0RangePV='pva://'+displayHarps[harp].systemName+':xrange';
          y0GraphPVs.push('pva://'+displayHarps[harp].systemName+':ycur');
          y0RangePV='pva://'+displayHarps[harp].systemName+':yrange';
          x0legend.push(displayHarps[harp].displayName);
          y0legend.push(displayHarps[harp].displayName);
          x0GraphKey=x0GraphKey+displayHarps[harp].systemName;
          y0GraphKey=y0GraphKey+displayHarps[harp].systemName;
          numberOfInsertedGraphs++;
          x0SystemName=displayHarps[harp].systemName;
        }else{
          x1GraphPVs.push('pva://'+displayHarps[harp].systemName+':xcur');
          x1RangePV='pva://'+displayHarps[harp].systemName+':xrange';
          y1GraphPVs.push('pva://'+displayHarps[harp].systemName+':ycur');
          y1RangePV='pva://'+displayHarps[harp].systemName+':yrange';

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
      x0RangePV:x0RangePV,x1RangePV:x1RangePV,y0RangePV:y0RangePV,y1RangePV:y1RangePV,x0SystemName:x0SystemName,x1SystemName:x1SystemName})
      //      console.log("in control test1 Harp inserted "+name.toString());
      //this.setState({['editorType']:'PS',
      //['displayEditor']:true,
      //['editorMacros']:{'$(device)':name}});

      //  this.setState({ ['clicked']: 1});
    }

    handleTopTabChange = (event, value) => {
      this.setState({ topTabValue:value,displayEditor:false });
    };
    handleSideTabChange = (event, value) => {
      this.setState({ sideTabValue:value,displayEditor:false });
    };
    handleCloseEditor=()=>{
      this.setState({
        ['displayEditor']:false,}
      );

      //  this.setState({ ['clicked']: 1});
    }
    handleHarpRemoved=(name)=>{
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
          displayHarps[harp].inserted=false;
        }
        if (displayHarps[harp].inserted===true){
          if(numberOfInsertedGraphs===0){
            x0GraphPVs.push('pva://'+displayHarps[harp].systemName+':xcur');
            x0RangePV='pva://'+displayHarps[harp].systemName+':xrange';
            y0GraphPVs.push('pva://'+displayHarps[harp].systemName+':ycur');
            y0RangePV='pva://'+displayHarps[harp].systemName+':yrange';
            x0legend.push(displayHarps[harp].displayName);
            y0legend.push(displayHarps[harp].displayName);
            x0GraphKey=x0GraphKey+displayHarps[harp].systemName;
            y0GraphKey=y0GraphKey+displayHarps[harp].systemName;
            x0SystemName=displayHarps[harp].systemName;
            numberOfInsertedGraphs++;
          }else{
            x1GraphPVs.push('pva://'+displayHarps[harp].systemName+':xcur');
            x1RangePV='pva://'+displayHarps[harp].systemName+':xrange';
            y1GraphPVs.push('pva://'+displayHarps[harp].systemName+':ycur');
            y1RangePV='pva://'+displayHarps[harp].systemName+':yrange';

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
        x0RangePV:x0RangePV,x1RangePV:x1RangePV,y0RangePV:y0RangePV,y1RangePV:y1RangePV,x0SystemName:x0SystemName,x1SystemName:x1SystemName})

      }
      render() {
        //      console.log("state: ",this.state);
        //console.log('displayHarps',this.state.displayHarps)

        const { classes } = this.props;
        const topTabValue  = this.state.topTabValue;
        const sideTabValue  = this.state.sideTabValue;
        return (
          <div style={{"overflowX": "hidden",'overflowY':'hidden'}}>
            <SideBar/>

            <Grid
              container
              direction="row"
              justify="start"
              alignItems="start"
              spacing={0}
            >
              <Grid item sm={2} style={{paddingTop:24}}>
                <AppBar position="static" color="inherhit" >
                  <VerticalTabs
                    value={sideTabValue}
                    onChange={this.handleSideTabChange}

                    indicatorColor="primary"
                    textColor="primary"
                    classes={{flexContainer: {  flexDirection: 'column'  }}}


                  >
                    <Tab label="Power Supplies" />    {/* side Tab 0*/}
                    <Tab label="Slits" />  {/* side Tab 1*/}


                  </VerticalTabs>

                </AppBar>
              </Grid>
              <Grid item sm={7} style={{paddingTop:24,paddingRight:16}}>
                {sideTabValue==0&&<TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['BeamLine']['PowerSupplies']}         /> </TabContainer>}
                {sideTabValue==1&&<TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['BeamLine']['Slits']}         /> </TabContainer>}
              </Grid>

              <Grid item sm={3} >
                {((this.state['displayEditor']===true) &&(this.state['editorMacros']['$(device)']==='testIOC:PS1'))&&<ControlRightEx1 macros={this.state['editorMacros']} handleCloseEditor={this.handleCloseEditor}/>}
                {((this.state['displayEditor']===true) &&(this.state['editorMacros']['$(device)']==='testIOC:PS2'))&&<ControlRightEx1 macros={this.state['editorMacros']} handleCloseEditor={this.handleCloseEditor}/>}
                {((this.state['displayEditor']===true) &&(this.state['editorMacros']['$(device)']==='testIOC:PS3'))&&<ControlRightEx1 macros={this.state['editorMacros']}  handleCloseEditor={this.handleCloseEditor}/>}
                {((this.state['displayEditor']===true) &&(this.state['editorMacros']['$(device)']==='testIOC:PS4'))&&<ControlRightEx1 macros={this.state['editorMacros']} handleCloseEditor={this.handleCloseEditor} />}
                {((this.state['displayEditor']===true) &&(this.state['editorMacros']['$(device)']==='testIOC:STR1:X'))&&<ControlRightEx1 macros={this.state['editorMacros']}  handleCloseEditor={this.handleCloseEditor}/>}
                {((this.state['displayEditor']===true) &&(this.state['editorType']==='oldPS'))&&<ControlRightEx1  key={'editor-key'+this.state.editorSystem.systemName} macros={{'$(device)':this.state.editorSystem.systemName}} handleCloseEditor={this.handleCloseEditor}/>}
                {((this.state['displayEditor']===true) &&(this.state['editorType']==='steererXY'))&&<ControlRightSteererXY key={'editor-key'+this.state.editorSystem.systemName} system={this.state.editorSystem}  handleCloseEditor={this.handleCloseEditor}/>}
                {((this.state['displayEditor']===true) &&(this.state['editorType']==='singlePS'))&&<ControlRightSinglePS key={'editor-key'+this.state.editorSystem.systemName} system={this.state.editorSystem} handleCloseEditor={this.handleCloseEditor}/>}
                {((this.state['displayEditor']===true) &&(this.state['editorType']==='slitxy'))&&<ControlRightSlitXY key={'editor-key'+this.state.editorSystem.systemName} system={this.state.editorSystem} handleCloseEditor={this.handleCloseEditor}/>}
              </Grid>
      </Grid>




    </div>





  );
}
}

ControlTableExample.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlTableExample);
//export default ControlTableExample;
