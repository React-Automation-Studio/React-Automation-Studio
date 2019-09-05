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
    padding: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
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

      topTabValue:0,
      sideTabValue:0


    }
    this.handlePsOnClick= this.handlePsOnClick.bind(this);
    this.handleOnSystemClick= this.handleOnSystemClick.bind(this);

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


    handleSideTabChange = (event, value) => {
      this.setState({ sideTabValue:value,displayEditor:false });
    };
    handleCloseEditor=()=>{
      this.setState({
        ['displayEditor']:false,}
      );

      //  this.setState({ ['clicked']: 1});
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
              justify="flex-start"
              alignItems="flex-start"
              spacing={0}
            >
              <Grid item xs={12} sm={2} md={2} lg={2}style={{paddingTop:24}}>
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
              <Grid item xs={12} sm={6} md={6} lg={7} style={{paddingTop:24,paddingRight:16}}>
                {sideTabValue==0&&<TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['BeamLine']['PowerSupplies']}         /> </TabContainer>}
                {sideTabValue==1&&<TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['BeamLine']['Slits']}         /> </TabContainer>}
              </Grid>

              <Grid item xs={12} sm={4} md={4} lg={3}>
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
