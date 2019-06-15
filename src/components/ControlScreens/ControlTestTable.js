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
import ArrowButton from '../BaseComponents/ArrowButton';
import ControlRightEx1 from '../ControlScreens/GridComponents/ControlRightEx1'
import ControlRightSteererXY from '../ControlScreens/GridComponents/ControlRightSteererXY'
import ControlRightSinglePS from '../ControlScreens/GridComponents/ControlRightSinglePS'
import ControlRightSinglePSVarTable from '../ControlScreens/GridComponents/ControlRightSinglePSVarTable'
import ControlRightPsSingleIgor from '../ControlScreens/GridComponents/ControlRightPsSingleIgor'

import ControlTopHarpEx1 from '../ControlScreens/GridComponents/ControlTopHarpEx1'
import ControlCenterTable from '../ControlScreens/GridComponents/ControlCenterTable'
import ControlBottomHarp1 from '../ControlScreens/GridComponents/ControlBottomHarp1'
import HarpGraph from '../SiteSpecificComponents/iThembaLABS/CompoundComponents/HarpGraph';

import AppBar from '@material-ui/core/AppBar';

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

class ControlTestTable extends React.Component {
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
    s
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

            <Grid container spacing={0}>
              <Grid item sm={1} >
                <AppBar position="static" color="default" >
                  <VerticalTabs
                    value={sideTabValue}
                    onChange={this.handleSideTabChange}

                    indicatorColor="primary"
                    textColor="primary"
                    classes={{flexContainer: {  flexDirection: 'column'  }}}


                  >

                    <Tab label="SPC1" />
                    <Tab label="SPC2" />
                    <Tab label="K-Line" />
                    <Tab label="J-Line" />
                    <Tab label="I-Line" />
                    <Tab label="Test" />


                  </VerticalTabs>
                </AppBar>
              </Grid>
              <Grid item sm={8}>
                <div style={{height:'95vh',marginRight:'12px'}}>
                  {sideTabValue === 5 && <TabContainer >
                    <AppBar position="static" color="default" >
                      <Tabs
                        value={topTabValue}
                        onChange={this.handleTopTabChange}
                        variant="fullWidth"
                        indicatorColor="primary"
                        textColor="primary"
                        classes={{flexContainer: {  flexDirection: 'column'  }}}


                      >
                        <Tab label="Main" />

                      </Tabs>
                    </AppBar>
                    {topTabValue === 0 && <TabContainer >
                      <ControlCenterTable
                        handleOnSystemClick={this.handleOnSystemClick}
                        systems={[
                          {systemName:'testPSC-X1', displayName:'testPSC X-Steerer',editorType:'singlePS',devices:{device:{deviceName:'testPSC1',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},
                          {systemName:'testPSC-Y2', displayName:'testPSC Y-Steerer',editorType:'singlePS',devices:{device:{deviceName:'testPSC0',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},
                          {systemName:'testPSC-X1', displayName:'testPSC X-Steerer',editorType:'singlePS',devices:{device:{deviceName:'testPSC1',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},
                          {systemName:'testPSC-Y2', displayName:'testPSC Y-Steerer',editorType:'singlePS',devices:{device:{deviceName:'testPSC0',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},
                          {systemName:'testPSC-X1', displayName:'testPSC X-Steerer',editorType:'singlePS',devices:{device:{deviceName:'testPSC1',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},
                          {systemName:'testPSC-Y2', displayName:'testPSC Y-Steerer',editorType:'singlePS',devices:{device:{deviceName:'testPSC0',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},
                        ]}
                      />
                    </TabContainer>
                    }
                  </TabContainer>}

                  {sideTabValue === 0 && <TabContainer >
                    <AppBar position="static" color="default" >
                      <Tabs
                        value={topTabValue}
                        onChange={this.handleTopTabChange}
                        variant="fullWidth"
                        indicatorColor="primary"
                        textColor="primary"
                        classes={{flexContainer: {  flexDirection: 'column'  }}}


                      >
                        <Tab label="SPC1 Power Supplies 1" />
                        <Tab label="SPC1 Power Supplies 2" />
                        <Tab label="Debug Binary Out" />
                        <Tab label="Debug MBBO Enumerator" />

                      </Tabs>
                    </AppBar>
                    {topTabValue === 0 && <TabContainer >
                      <ControlCenterTable
                        handleOnSystemClick={this.handleOnSystemClick}
                        systems={[
                          {systemName:'main01zi', displayName:'main01zi',editorType:'singlePSVarTable',devices:{device:{deviceName:'vartable:main01zi',readback:'actvalue',setpoint:'refvalue',statusText:'actstatustext'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},
                          {systemName:'cone01zi', displayName:'cone01zi',editorType:'singlePSVarTable',devices:{device:{deviceName:'vartable:cone01zi',readback:'actvalue',setpoint:'refvalue',statusText:'actstatustext'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},
                          {systemName:'cone02zi', displayName:'cone02zi',editorType:'singlePSVarTable',devices:{device:{deviceName:'vartable:cone02zi',readback:'actvalue',setpoint:'refvalue',statusText:'actstatustext'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},

                        ]}
                      />
                    </TabContainer>
                    }
                    {topTabValue === 1 && <TabContainer >
                      <ControlCenterTable
                        handleOnSystemClick={this.handleOnSystemClick}
                        systems={[
                          {systemName:'hrmphiz', displayName:'hrmphiz',editorType:'singlePSVarTable',devices:{device:{deviceName:'vartable:hrmphiz',readback:'actvalue',setpoint:'refvalue',statusText:'actstatustext'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},
                          {systemName:'hrmamiz', displayName:'hrmamiz',editorType:'singlePSVarTable',devices:{device:{deviceName:'vartable:hrmamiz',readback:'actvalue',setpoint:'refvalue',statusText:'actstatustext'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},
                          {systemName:'hrmphoz', displayName:'hrmphoz',editorType:'singlePSVarTable',devices:{device:{deviceName:'vartable:hrmphoz',readback:'actvalue',setpoint:'refvalue',statusText:'actstatustext'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},

                        ]}
                      />
                    </TabContainer>
                    }
                  </TabContainer>}
                  {sideTabValue === 4 && <TabContainer >
                    <AppBar position="static" color="default" >
                      <Tabs
                        value={topTabValue}
                        onChange={this.handleTopTabChange}
                        variant="fullWidth"
                        indicatorColor="primary"
                        textColor="primary"
                        classes={{flexContainer: {  flexDirection: 'column'  }}}


                      >
                        <Tab label="I-LINE Power Supplies" />



                      </Tabs>
                    </AppBar>
                    {topTabValue === 0 && <TabContainer >
                      <ControlCenterTable
                        handleOnSystemClick={this.handleOnSystemClick}
                        systems={[
                          {systemName:'quad01i',  displayName:'quad01i',editorType:'singlePsSingleIgor',devices:{device:{deviceName:'quad01i',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},
                          {systemName:'quad02i',  displayName:'quad02i',editorType:'singlePsSingleIgor',devices:{device:{deviceName:'quad02i',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},
                          {systemName:'quad03i',  displayName:'quad03i',editorType:'singlePsSingleIgor',devices:{device:{deviceName:'quad03i',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},
                          {systemName:'quad04i',  displayName:'quad04i',editorType:'singlePsSingleIgor',devices:{device:{deviceName:'quad04i',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},
                          {systemName:'quad05i',  displayName:'quad05i',editorType:'singlePsSingleIgor',devices:{device:{deviceName:'quad05i',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},
                          {systemName:'quad06ii', displayName:'quad06i',editorType:'singlePSVarTable',  devices:{device:{deviceName:'vartable:quad06ii',readback:'actvalue',setpoint:'refvalue',statusText:'actstatustext'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},
                          {systemName:'quad07ii', displayName:'quad07i',editorType:'singlePSVarTable',  devices:{device:{deviceName:'vartable:quad07ii',readback:'actvalue',setpoint:'refvalue',statusText:'actstatustext'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},

                        ]}
                      />
                    </TabContainer>
                    }
                    {topTabValue === 1 && <TabContainer >
                      <ControlCenterTable
                        handleOnSystemClick={this.handleOnSystemClick}
                        systems={[


                        ]}
                      />
                    </TabContainer>
                    }
                  </TabContainer>}

                </div>
              </Grid>
              <Grid item sm={3} >

                {((this.state['displayEditor']===true) &&(this.state['editorType']==='steererXY'))&&<ControlRightSteererXY key={'editor-key'+this.state.editorSystem.systemName} system={this.state.editorSystem}/>}
                {((this.state['displayEditor']===true) &&(this.state['editorType']==='singlePS'))&&<ControlRightSinglePS key={'editor-key'+this.state.editorSystem.systemName} system={this.state.editorSystem}/>}
                {((this.state['displayEditor']===true) &&(this.state['editorType']==='singlePSVarTable'))&&<ControlRightSinglePSVarTable key={'editor-key'+this.state.editorSystem.systemName} system={this.state.editorSystem}/>}
                  {((this.state['displayEditor']===true) &&(this.state['editorType']==='singlePsSingleIgor'))&&<ControlRightPsSingleIgor key={'editor-key'+this.state.editorSystem.systemName} system={this.state.editorSystem}/>}
              </Grid>
            </Grid>




          </div>





          );
        }
      }

      ControlTestTable.propTypes = {
        classes: PropTypes.object.isRequired,
      };

      export default withStyles(styles)(ControlTestTable);
      //export default ControlTestTable;
