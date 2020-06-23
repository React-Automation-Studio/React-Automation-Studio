import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import TextInput from '../../BaseComponents/TextInput';
import TextOutput from '../../BaseComponents/TextOutput';

import Slider from '../../BaseComponents/Slider';
import GraphY from '../../BaseComponents/GraphY';
import SelectionList from '../../BaseComponents/SelectionList';
import ThumbWheel from '../../BaseComponents/ThumbWheel';




import ToggleButton from '../../BaseComponents/ToggleButton';


import Gauge from '../../BaseComponents/Gauge';

import AppBar from '@material-ui/core/AppBar';

import AccountCircle from '@material-ui/icons/AccountCircleOutlined';
import Settings from '@material-ui/icons/SettingsOutlined';

import Divider from '@material-ui/core/Divider';




import withWidth from '@material-ui/core/withWidth';


import StyledIconIndicator from '../../BaseComponents/StyledIconIndicator';

import TraditionalLayout from '../../UI/Layout/ComposedLayouts/TraditionalLayout.js';

import {useLocalPV} from '../../SystemComponents/LocalPV'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 0, flexGrow:1 }}>
      {props.children}
    </Typography>
  );
}

const styles = theme => ({
  body1: theme.typography.body1,
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    overflowX: "hidden",
    overflowY: "hidden",
  },
  paper: {
    padding: theme.spacing(1) * 0,
    margin: theme.spacing(1) * 0,
    height: '100%',
    color: theme.palette.text.secondary,
  },
  control: {
    padding: theme.spacing(1) * 2,
  },
});

const MobileDemo1 =(props)=> {
  //const [select,setSelect]=useState(null);
  const [showAdvancedSettings,setShowAdvancedSettings]=useState(0);
  const  editorType=useLocalPV({pv:'loc://editorType',})

  const handleChange = (event, value) => {
    setShowAdvancedSettings({ value });
  };



  // const handleStateChange=(stateValue)=>{
  //   //console.log(stateValue)
  //   setSelect(stateValue)
  // };





  
    const { width } = props;
    //console.log('width',width)

    const { classes } = props;
    // console.log('classes justin test1',classes)
    


    //console.log(softLim);

    let graphVH;


    if(width==='xs'){
      graphVH='25vh';
    }else if(width==='sm'){
      graphVH='30vh'
    }else{
      graphVH='30vh'
    }



    //console.log('window.innerHeight',window.innerHeight)
    return (

      <TraditionalLayout
      title="Mobile Layout Example"
      denseAppBar
      alignTitle="center"
        >

      
        <div style={{paddingBottom:48}}>

        {showAdvancedSettings === 0 && <TabContainer key={'tabContainer0'}>
          <Grid   container className={classes.root}>
            <Grid item xs={12}>
              <Grid
                container
                spacing={2}
                alignItems={'stretch'}
                direction={'row'}
                justify={'flex-start'}
              >


                <Grid item xs={12} >
                  <div style={{ height: graphVH, width:'96vw',}}>
                    <GraphY  pvs={['pva://testIOC:test4','pva://testIOC:test5'] } legend={['Sine Wave','Amplitude']}
                     //lineColor={[this.props.theme.palette.secondary.main,lime['400']]}
                     />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Grid container direction="row" item justify="center" spacing={2} alignItems="stretch">
                    <Grid item xs={6}  >
                      <TextInput  pv='pva://$(device):amplitude' macros={{'$(device)':'testIOC'}}   usePvLabel={true} prec={3} alarmSensitive={true}/>
                    </Grid>
                    <Grid item  xs={6}>
                      <TextOutput  pv='pva://$(device):test3' macros={{'$(device)':'testIOC'}}   usePvLabel={true} prec={3} alarmSensitive={true}/>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={6} sm={4} lg={3} >

                  <Gauge  pv='pva://$(device):amplitude' macros={{'$(device)':'testIOC'}}    prec={3} usePvMinMax={true} />

                </Grid>

                <Grid item xs={2} sm={4}  lg={5} >
                  <Grid container direction="column" justify="space-evenly" spacing={2} alignItems="stretch">
                    <Grid item>
                      <StyledIconIndicator  pv='pva://$(device)' macros={{'$(device)':'testIOC:BO1'}} onColor={props.theme.palette.ok.main} offColor='default' label={'On'} labelPlacement={'end'}/>

                    </Grid>
                    <Grid item>
                      <StyledIconIndicator  pv='pva://$(device)' macros={{'$(device)':'testIOC:BO1'}} onColor='default' offColor={props.theme.palette.error.main} label={'Off'} labelPlacement={'end'}/>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4} sm={4} lg={4} >

                  <ToggleButton  pv='pva://$(device)' macros={{'$(device)':'testIOC:BO1'}}  custom_selection_strings={["OFF","ON"]}  />
                </Grid>
                


                <Grid item xs={12} sm={12} md={12}  lg={12}>


                  <SelectionList debug={false} horizontal={true} pv='loc://editorType'    useStringValue={true} custom_selection_strings={['ThumbWheel','Slider']} 
                  initialLocalVariableValue='ThumbWheel' 
                   />





                </Grid>
                <Grid item  xs={12}>
                  {editorType.value === 'None'&&
                    <Grid container direction="row" item xs={12} spacing={2}>
                      <Grid item xs={12} >
                      </Grid>
                    </Grid>}
                  {editorType.value === 'ThumbWheel'&&
                    <Grid container direction="row" item xs={12} >
                      <Grid item xs={12}>
                        <div style={{textAlign:'center',marginTop:'16px',}}>
                          <ThumbWheel
                            pv='pva://$(device)'
                            macros={{'$(device)':'testIOC:amplitude'}}
                            prec_integer={3}
                            prec_decimal={1}
                          />
                        </div>
                      </Grid>
                    </Grid>}
                  {editorType.value === 'Slider'&&
                    <div style={{marginTop:'16px'}}>
                      <Grid container direction="row" item xs={12} spacing={2}>
                        <Grid item xs={12}  >
                          <Slider pv='pva://$(device):amplitude' macros={{'$(device)':'testIOC'}} usePvMinMax={true}  />
                        </Grid>
                      </Grid>
                    </div>}
                </Grid>
              </Grid>
            </Grid>

          </Grid>
        </TabContainer>}
        {showAdvancedSettings === 1 && <TabContainer key={'tabContainer1'}>
          <Grid   container className={classes.root}>
            <Grid item xs={12}>
              <Grid container spacing={2} alignItems={'stretch'} direction={'column'} justify={'flex-start'}>


                <Grid item >
                  <div style={{marginBottom:8}}>Settings</div>
                  <Grid container spacing={2} alignItems={'stretch'} direction={'row'} justify={'flex-start'}>
                    <Grid item xs={12} lg={4}>
                      <TextInput   pv='pva://$(device):frequency' macros={{'$(device)':'testIOC'}}    usePvUnits={true} prec={1} usePvLabel={true}/>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <TextInput   pv='pva://$(device):amplitude' macros={{'$(device)':'testIOC'}}    usePvUnits={true} usePvLabel={true}/>
                    </Grid>
                  </Grid>


                </Grid>
                <Grid item ><Divider/></Grid>
              </Grid>
            </Grid>
          </Grid>
        </TabContainer>}
        </div>

        <AppBar className={classes.body1} style={{position:'fixed',bottom:0,top:'auto'}} color='inherit'>
          <Tabs value={showAdvancedSettings} onChange={handleChange} variant="fullWidth" scrollButtons="off">
            {/* <Tab icon={<SupervisorAccount />} /> */}
            <Tab icon={<AccountCircle />} />
            <Tab icon={<Settings />} />
          </Tabs>
        </AppBar>
        
      </TraditionalLayout>

      );
    }
  

  

  export default withWidth()(withStyles(styles,{withTheme:true})(MobileDemo1));
