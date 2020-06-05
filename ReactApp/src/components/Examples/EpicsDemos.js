import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import EpicsBinaryOutDebug from '../GroupedComponents/EpicsBinaryOutDebug';
import EpicsAnalogOutDebug from '../GroupedComponents/EpicsAnalogOutDebug';
import EpicsStringOutDebug from '../GroupedComponents/EpicsStringOutDebug';
import EpicsMbboDebug from '../GroupedComponents/EpicsMbboDebug';
import TextUpdate from '../BaseComponents/TextUpdate';
import TextInput from '../BaseComponents/TextInput';
import TextOutput from '../BaseComponents/TextOutput';
import SimpleSlider from '../BaseComponents/SimpleSlider';
import GraphY from '../BaseComponents/GraphY';
import ThumbWheel from '../BaseComponents/ThumbWheel';
import Grid from '@material-ui/core/Grid';
import DataConnection from '../SystemComponents/DataConnection';
import Gauge from '../BaseComponents/Gauge';
import Card from '@material-ui/core/Card';
import SwitchComponent from '../BaseComponents/SwitchComponent';
import StyledIconButton from '../BaseComponents/StyledIconButton';
import SideBar from '../SystemComponents/SideBar';
import MobileDemo2 from './Mobile/MobileDemo2';
import TraditionalLayout from '../UI/Layout/ComposedLayouts/TraditionalLayout.js';
import lime from '@material-ui/core/colors/lime';
import {Link} from 'react-router-dom'
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 1 ,paddingTop:36}}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    padding: theme.spacing(2),
  },
});

const hiddenstyle ={
  display:'none'
}

class EpicsDemos extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (


      <div >
         <TraditionalLayout
      title="EPICS PV Demos"
      denseAppBar
      alignTitle="center"
      tabs={['Main','Analog PVs','Binary PVs',"MBBO/I PVs","Array PVs","String PVs"]}
      handleTabChange={this.handleChange}
      tabValue={value}
      
        />
        
          {value === 0 &&

              <MobileDemo2 nosidebar/>

          }

          {value === 1 && <TabContainer key='TabContainer1'>
            <Grid container spacing={1}>

              <Grid item xs={12} sm={6} lg={3}>
                <Card className={classes.card}>
                  <EpicsAnalogOutDebug macros={{'$(device)':'testIOC:amplitude'}}/>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} lg={3} >
                <Card className={classes.card}>
                  <EpicsAnalogOutDebug macros={{'$(device)':'testIOC:test1'}}/>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} lg={3} >
                <Card className={classes.card}>
                  <EpicsAnalogOutDebug macros={{'$(device)':'testIOC:test2'}}/>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} lg={3} >
                <Card className={classes.card}>
                  <EpicsAnalogOutDebug macros={{'$(device)':'testIOC:time'}}/>
                </Card>
              </Grid>
            </Grid>
          </TabContainer>
        }

        {value === 2 &&  <TabContainer key='TabContainer2'>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
              <Card className={classes.card}>
                <EpicsBinaryOutDebug macros={{'$(device)':'testIOC:BO1'}}/>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} lg={3} >
              <Card className={classes.card}>
                <EpicsBinaryOutDebug macros={{'$(device)':'testIOC:BO2'}}/>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>

            </Grid>
            <Grid item xs={12} sm={6} lg={3}>

            </Grid>

          </Grid>

        </TabContainer>
      }
      {value === 3 && 	 <TabContainer key='TabContainer3'>
        <Grid container spacing={3}>

          <Grid item xs={12} sm={6} lg={3}>
            <Card className={classes.card}>
              <EpicsMbboDebug macros={{'$(device)':'testIOC:mbboTest1'}}/>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Card className={classes.card}>
              <EpicsMbboDebug macros={{'$(device)':'testIOC:mbboTest1'}} custom_selection_strings={['text 1','text 4']}/>
            </Card>
          </Grid>


        </Grid>

      </TabContainer>
    }
    {value === 4 &&     <TabContainer key='TabContainer4'>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} >
          <div style={{height:'25vh'}}>
            <GraphY  pvs={['pva://testIOC:test4','pva://testIOC:test5'] } legend={['Sine Wave ','Amplitude']} />
          </div>

        </Grid>
        <Grid item xs={12} sm={6} >
          <div style={{height:'25vh'}}>
            <GraphY  pvs={['pva://testIOC:test4'] } legend={['Sine Wave']} lineColor={[this.props.theme.lineColors[1]]}/>
          </div>

        </Grid>
        <Grid item xs={12} sm={6}>
          <div style={{height:'25vh'}}>
            <GraphY  pvs={['pva://testIOC:test5'] } legend={['Amplitude of Sine Wave Circular Buffer']} lineColor={[this.props.theme.lineColors[1]]} />
          </div>

        </Grid>
        <Grid item xs={12} sm={6}>
          <TextOutput  pv='pva://$(device):test4' macros={{'$(device)':'testIOC'}} label={'Sine Wave Circular Buffer'}   />

        </Grid>
        <Grid item xs={12} sm={6} >

          <TextOutput  pv='pva://$(device):test5' macros={{'$(device)':'testIOC'}}label={'Amplitude of Sine Wave Circular Buffer'}  />
        </Grid>

        <Grid item xs={12} >
          <SimpleSlider  pv='pva://$(device):amplitude' macros={{'$(device)':'testIOC'}} usePvMinMax={true} min={1000} max={500} usePvLabel={true}  />
        </Grid>
        <Grid item xs={6} >

        </Grid>
      </Grid>

    </TabContainer>
  }
  {value === 5 && <TabContainer key='TabContainer5'>

    <Grid container spacing={3}>

        <Grid item xs={12} sm={6} lg={3}>
          <Card className={classes.card}>

        <EpicsStringOutDebug macros={{'$(device)':'testIOC:stringtest1'}}/>
      </Card>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Card className={classes.card}>

        <EpicsStringOutDebug macros={{'$(device)':'testIOC:stringtest2'}}/>
      </Card>
      </Grid>
    </Grid>

  </TabContainer>
}







</div>
);
}
}

EpicsDemos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles,{withTheme:true})(EpicsDemos);
