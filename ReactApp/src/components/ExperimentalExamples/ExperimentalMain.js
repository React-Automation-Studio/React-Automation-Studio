import React, { Component } from 'react';

import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';

import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import RedirectToLogIn from '../../components/SystemComponents/RedirectToLogin.js';
import SideBar from '../../components/SystemComponents/SideBar';
import ToggleButton from '../../components/BaseComponents/ToggleButton';

import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom'
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
  Button: {
    width:'100%',
    height:'100%',
    marginTop:'auto',
    marginBottom:'auto',
    marginLeft:'auto',
    marginRight:'auto',
    //  width:'100%',
    //    marginTop:'auto',
    //    marginLeft:'auto',
    //    marginRight:'auto',
    //    marginBottom:'auto',

  },

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


let AutomationStudioStyleGuideBuildURL;

if(typeof process.env.REACT_APP_StyleguideServerURL==='undefined'){
  AutomationStudioStyleGuideBuildURL=pvServerBASEURL+":"+port;
}
else{
  AutomationStudioStyleGuideBuildURL=process.env.REACT_APP_StyleguideServerURL+":"+port;
}

class ExperimentalMain extends Component {
  constructor(props) {
    super(props);
    this.logout=this.logout.bind(this);
    this.state={redirectToLoginPage:false}
  }

  logout(){
    localStorage.removeItem('jwt');

  }
  componentDidMount()
  {
  //  console.log('ExperimentalMain mounted')
  }
  render() {


    const { classes } = this.props;

    return (
      <React.Fragment>

        <Grid container direction="row" item justify="center" spacing={1} alignItems="center">
          <Grid item lg={4} sm={4} xs={2}>
            <SideBar/>
          </Grid>

          <Grid  item lg={2} sm={4}  xs={8}>

            <div style={{textAlign: 'center'}} className={classes.body1}>React Automation Studio V2.0.1</div>

          </Grid>
          <Grid item lg={4} sm={4} xs={2}>

          </Grid>
          <Grid item lg={4} sm={4} xs={2}>
            
          </Grid>

          <Grid  item lg={2} sm={4}  xs={8}>

            <div style={{textAlign: 'center'}} className={classes.body1}>Experimental Components</div>

          </Grid>
          <Grid item lg={4} sm={4} xs={2}>

          </Grid>
        </Grid>
        <Grid container direction="row" item justify="center" spacing={1} alignItems="center">
          <Grid item lg={4} sm={4} xs={2}>

          </Grid>
          <Grid item lg={2} sm={4}  xs={8}>
            <Grid container direction="row" justify="center" spacing={3} alignItems="stretch">
              <Grid item xs={12}  >
                <Button  fullWidth  fullWidth className= {classes.button} component={Link} to="/ExperimentalMobileDemo1" color="primary" variant='contained'>Experimental Mobile Demo 1 </Button>
              </Grid>
              {/* <Grid item xs={12}  >
                <Button  fullWidth className= {classes.button} component={Link} to="/ExperimentalMobileDemo2" color="primary" variant='contained'>Experimental  Mobile Demo 2 </Button>
              </Grid> */}



              <Grid item xs={12}  >
                <Button  fullWidth  className= {classes.button} component={Link} to="/ExperimentalEpicsDemos" color="primary" variant='contained'>Experimental  Epics Demos </Button>
              </Grid>
              <Grid item xs={12}  >
                <Button  fullWidth  className= {classes.button} component={Link} to="/HooksDebuging" color="primary" variant='contained'>HooksDebuging</Button>
              </Grid>

              {/* <Grid item xs={12}  >
                <Button  fullWidth  className= {classes.button} component={Link} to="/ExperimentalStaging" color="primary" variant='contained'>Experimental  Staging </Button>
              </Grid>

              <Grid item xs={12}  >
                <Button  fullWidth className= {classes.button} component={Link} to="/ExperimentalTest3D" color="primary" variant='contained'>Experimental  3D Demos </Button>

              </Grid>

              <Grid item xs={12}  >
                <Button  fullWidth className= {classes.button} component={Link} to="/ExperimentalControlTestHarp1" color="primary" variant='contained'>Experimental Beam Line Control Demo </Button>
              </Grid>



              <Grid item xs={12}  >
                <Button  fullWidth className= {classes.button} component={Link} to="/ExperimentalControlTableExample" color="primary" variant='contained'>Experimental Control Table Example</Button>
              </Grid> */}
              {/* <Grid item xs={12}  >
                <Button  fullWidth className= {classes.button} component={Link} to="/Help" color="secondary" variant='contained'>Experimental  Help </Button>
              </Grid> */}
              <Grid item xs={12}  >
                <Button  fullWidth className= {classes.button} target="_blank" href={AutomationStudioStyleGuideBuildURL} color="secondary" variant='contained'> Help and Style Guide </Button>
              </Grid>

            </Grid>
          </Grid>

          <Grid item lg={4} sm={4} xs={2}>


            </Grid>
          </Grid>

          <RedirectToLogIn/>
        </React.Fragment>
        )
        }
        }

        export default withRouter(withStyles(styles)(ExperimentalMain));
