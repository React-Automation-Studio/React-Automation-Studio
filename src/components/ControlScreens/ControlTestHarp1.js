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
import ControlTopHarpEx1 from '../ControlScreens/GridComponents/ControlTopHarpEx1'
import ControlBottomHarp1 from '../ControlScreens/GridComponents/ControlBottomHarp1'
import HarpGraph from '../SiteSpecificComponents/iThembaLABS/CompoundComponents/HarpGraph';
import SideBar from '../SystemComponents/SideBar';
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
class ControlTestHarp1 extends React.Component {
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
      'x1GraphKey':""


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
        return (
          <div style={{"overflowX": "hidden",'overflowY':'hidden'}}>
            <SideBar/>
            <Grid container spacing={3}>

              <Grid item sm={9}>
                <div style={{height:'20vh'}}>



                  <ControlTopHarpEx1
                    macros={{
                      '$(PS1)':'testIOC:PS1',
                      '$(PS2)':'testIOC:PS2',
                      '$(PS3)':'testIOC:PS3'
                    }}
                      handleOnSystemClick={this.handleOnSystemClick}
                    handleHarpInserted={this.handleHarpInserted}
                    handleHarpRemoved={this.handleHarpRemoved}
                    handlePsOnClick={this.handlePsOnClick}
                    maxHarpsReached={this.state.maxHarpsReached}
                  />


                </div>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"

                >
                  <Grid item sm={2} >

                    <div style={{height:'35vh',marginLeft:10,marginRight:10,marginTop:20}}>

                      { (typeof this.state.x0SystemName !=='undefined')&& <React.Fragment>


                        <HarpRangeSelection key={'HarpRangeSelectionx0'+this.state.x0SystemName} systemName={this.state.x0SystemName} label={'Range'}/>


                        <div style={{marginBottom:8}}>
                          <ActionFanoutButton style={{padding :10}}key={'storex0'+this.state.x0SystemName}  dataPVs={['pva://$(device):x_store_offset','pva://$(device):y_store_offset']}  macros={{'$(device)':this.state.x0SystemName}}     actionValue={"1"} actionString={"Store Offset"} />
                        </div>

                        <ActionFanoutButton key={'clearx0'+this.state.x0SystemName}  dataPVs={['pva://$(device):x_store_offset','pva://$(device):y_store_offset']}  macros={{'$(device)':this.state.x0SystemName}}     actionValue={"0"} actionString={"Clear Offset"}/>

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
                        <div style={{height:'35vh'}}>

                          <HarpGraph
                            ymax={2000}
                            units={'pA'}
                            key={this.state.x0GraphKey}
                            dataPVs={this.state.x0GraphPVs}
                            rangePV={this.state.x0RangePV}
                            legend = {this.state.x0legend}
                            ylabel="X Axis"
                          />

                          {/*}<GraphTest style pv='pva://testIOC:test4'  />*/}
                        </div>
                      </Grid>
                      <Grid item sm={6}>
                        <div style={{height:'35vh'}}>

                          <HarpGraph
                            ymax={2000}
                            units={'pA'}
                            key={this.state.y0GraphKey}
                            dataPVs={this.state.y0GraphPVs}
                            rangePV={this.state.y0RangePV}
                            legend = {this.state.y0legend}
                            ylabel="Y Axis"

                          />
                          {/*  <GraphTest style pv='pva://testIOC:PS1:Readback:History'  />*/}
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <div style={{height:'35vh'}}>
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                  >
                    <Grid item sm={2}>
                      <div style={{height:'35vh',marginLeft:10,marginRight:10,marginTop:20}}>

                        { (typeof this.state.x1SystemName !=='undefined')&& <React.Fragment>


                          <HarpRangeSelection key={'HarpRangeSelectionx1'+this.state.x1SystemName} systemName={this.state.x1SystemName} label={'Range'}/>
                          <div style={{marginBottom:8}}>
                            <ActionFanoutButton  key={'storex1'+this.state.x1SystemName} dataPVs={['pva://$(device):x_store_offset','pva://$(device):y_store_offset']}  macros={{'$(device)':this.state.x1SystemName}}     actionValue={"1"} actionString={"Store Offset"}/>
                          </div>
                          <ActionFanoutButton key={'clearx1'+this.state.x1SystemName}  dataPVs={['pva://$(device):x_store_offset','pva://$(device):y_store_offset']}  macros={{'$(device)':this.state.x1SystemName}}     actionValue={"0"} actionString={"Clear Offset"}/>

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
                            <div style={{height:'35vh'}}>

                              <HarpGraph
                                ymax={2000}
                                units={'pA'}
                                key={this.state.x1GraphKey}
                                dataPVs={this.state.x1GraphPVs}
                                rangePV={this.state.x1RangePV}
                                legend = {this.state.x1legend}
                                ylabel="X Axis"
                              />

                              {/*}<GraphTest style pv='pva://testIOC:test4'  />*/}
                            </div>
                          </Grid>
                          <Grid item sm={6}>
                            <div style={{height:'35vh'}}>

                              <HarpGraph
                                ymax={2000}
                                units={'pA'}
                                key={this.state.y1GraphKey}
                                dataPVs={this.state.y1GraphPVs}
                                rangePV={this.state.y1RangePV}
                                legend = {this.state.y1legend}
                                ylabel="Y Axis"
                              />
                              {/*  <GraphTest style pv='pva://testIOC:PS1:Readback:History'  />*/}
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </Grid>

              <Grid item sm={3} >
                {((this.state['displayEditor']===true) &&(this.state['editorMacros']['$(device)']==='testIOC:PS1'))&&<ControlRightEx1 macros={this.state['editorMacros']}/>}
                {((this.state['displayEditor']===true) &&(this.state['editorMacros']['$(device)']==='testIOC:PS2'))&&<ControlRightEx1 macros={this.state['editorMacros']}/>}
                {((this.state['displayEditor']===true) &&(this.state['editorMacros']['$(device)']==='testIOC:PS3'))&&<ControlRightEx1 macros={this.state['editorMacros']}/>}
                {((this.state['displayEditor']===true) &&(this.state['editorMacros']['$(device)']==='testIOC:PS4'))&&<ControlRightEx1 macros={this.state['editorMacros']}/>}
                {((this.state['displayEditor']===true) &&(this.state['editorMacros']['$(device)']==='testIOC:STR1:X'))&&<ControlRightEx1 macros={this.state['editorMacros']}/>}
                {((this.state['displayEditor']===true) &&(this.state['editorType']==='steererXY'))&&<ControlRightSteererXY key={'editor-key'+this.state.editorSystem.systemName} system={this.state.editorSystem}/>}
                {((this.state['displayEditor']===true) &&(this.state['editorType']==='singlePS'))&&<ControlRightSinglePS key={'editor-key'+this.state.editorSystem.systemName} system={this.state.editorSystem}/>}
              </Grid>
            </Grid>




          </div>





                      );
                    }
                  }

                  ControlTestHarp1.propTypes = {
                    classes: PropTypes.object.isRequired,
                  };

                  export default withStyles(styles)(ControlTestHarp1);
                  //export default ControlTestHarp1;
