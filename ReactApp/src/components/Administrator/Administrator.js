import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';



import Grid from '@material-ui/core/Grid';

import SideBar from '../SystemComponents/SideBar';

import AppBar from '@material-ui/core/AppBar';


import Toolbar from '@material-ui/core/Toolbar';

import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
// import AllUsers from "./AllUsers"
import AddUsers from "./AddUsers"
import TraditionalLayout from '../UI/Layout/ComposedLayouts/TraditionalLayout';
import AllUsers from './AllUsers';
const systemName = 'testIOC';




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



const Administrator =(props)=>{
  const [tabValue,setTabValue]=useState(0);
  const tabs=['All Users','Access Control','Add User'];



  


  
    return (
     

    <TraditionalLayout
        title="Admin Page"
        tabs={tabs}
        handleTabChange={(event,value)=>setTabValue(value)}
        tabValue={tabValue}
    >
      <React.Fragment>
        {tabs[tabValue]==='All Users'&&<AllUsers/>
        
        }
        {tabs[tabValue]==='Add User'&&<AddUsers/>
        
      }
      </React.Fragment>

       
    </TraditionalLayout>
    );
  }


Administrator.propTypes = {

};


export default Administrator;
