import React, { Component } from 'react';

import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';

import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import RedirectToLogIn from './components/SystemComponents/RedirectToLogin.js';
import SideBar from './components/SystemComponents/SideBar';
// Styles




const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,



  },
  center: {
    margin: 'auto',

    width: '15%',
    height:'50%'

  },
  button:{
    marginTop:'10px',
    paddingTop:'10px'
  }

});



let pvServerBASEURL;
 if(typeof process.env.REACT_APP_PyEpicsServerBASEURL==='undefined'){
  pvServerBASEURL= "http://127.0.0.1";
 }
 else{
  pvServerBASEURL=process.env.REACT_APP_PyEpicsServerBASEURL;
 }

 let port;
  if(typeof process.env.REACT_APP_StyleguideServerPORT==='undefined'){
   port= 6060;
  }
  else{
   port=process.env.REACT_APP_StyleguideServerPORT;
  }

let AutomationStudioStyleGuideBuildURL=pvServerBASEURL+":"+port;

class Main extends Component {
  constructor(props) {
    super(props);
    this.logout=this.logout.bind(this);
  }

  logout(){
    localStorage.removeItem('jwt');

  }
  componentDidMount()
  {
    console.log('main mounted')
  }
  render() {


    const { classes } = this.props;

    return (
      <React.Fragment>
        <SideBar/>
        <div id="test" className={classes.center}>





          <Button className= {classes.button} component={Link} to="/rfoverlay" color="primary" variant='contained'>  rfoverlay </Button>
          <br/>
          <Button className= {classes.button} component={Link} to="/MobileTest" color="primary" variant='contained'>  MobileTest </Button>
          <br/>

          <Button className= {classes.button} component={Link} to="/ControlTest1" color="primary" variant='contained'>  ControlTest1 </Button>
          <br/>
          <Button className= {classes.button} component={Link} to="/Demos" color="primary" variant='contained'>  Demos </Button>
          <br/>
          <Button className= {classes.button} component={Link} to="/Staging" color="primary" variant='contained'>  Staging </Button>
          <br/>
          <Button className= {classes.button} component={Link} to="/ControlTest3D" color="primary" variant='contained'>  ControlTest3D </Button>
          <br/>
          <Button className= {classes.button} component={Link} to="/ComponentsWithMultiplePVs" color="primary" variant='contained'>  ComponentsWithMultiplePVs </Button>
          <br/>
          <Button className= {classes.button} component={Link} to="/ControlTestHarp1" color="primary" variant='contained'>  ControlTestHarp1 </Button>
          <br/>
          <Button className= {classes.button} component={Link} to="/ControlTestTable" color="primary" variant='contained'>  ControlTestTable </Button>
          <br/>
          <Button className= {classes.button} component={Link} to="/IvanControlTable" color="primary" variant='contained'>  IvanControlTable </Button>
          <br/>
          <Button className= {classes.button} component={Link} to="/Help" color="secondary" variant='contained'>  Help </Button>
          <br/>
          <Button className= {classes.button} target="_blank" href={AutomationStudioStyleGuideBuildURL} color="secondary" variant='contained'>  StyleGuide </Button>
          <RedirectToLogIn/>




        </div>
      </React.Fragment>
  )
}
}

export default withRouter(withStyles(styles)(Main));
