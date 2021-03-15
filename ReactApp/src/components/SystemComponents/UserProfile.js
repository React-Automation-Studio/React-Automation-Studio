import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';



import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


import AppBar from '@material-ui/core/AppBar';

import AccountCircle from '@material-ui/icons/AccountCircleOutlined';
import Settings from '@material-ui/icons/SettingsOutlined';





import withWidth from '@material-ui/core/withWidth';



import TraditionalLayout from '../UI/Layout/ComposedLayouts/TraditionalLayout.js';

import {useLocalPV} from './LocalPV'

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
    setShowAdvancedSettings( value );
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
