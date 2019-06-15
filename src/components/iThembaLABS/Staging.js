import React, { Component } from 'react';

import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';

import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import RedirectToLogIn from '../SystemComponents/RedirectToLogin.js';
import SideBar from '../SystemComponents/SideBar';
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








class Staging extends Component {
  constructor(props) {
    super(props);
    this.logout=this.logout.bind(this);
  }

  logout(){
    localStorage.removeItem('jwt');

  }
  componentDidMount()
  {
    console.log('Staging mounted')
  }
  render() {


    const { classes } = this.props;

    return (
      <React.Fragment>
        <SideBar/>
        <div id="test" className={classes.center}>






          <br/>
          <Button className= {classes.button} component={Link} to="/Justin" color="primary" variant='contained'>  Justin </Button>
          <br/>
          <Button className= {classes.button} component={Link} to="/William" color="primary" variant='contained'>  William </Button>
          <br/>
          <Button className= {classes.button} component={Link} to="/Mike" color="primary" variant='contained'>  Mike </Button>
          <br/>
          <Button className= {classes.button} component={Link} to="/Amien" color="primary" variant='contained'>  Amien </Button>
          <br/>
          <Button className= {classes.button} component={Link} to="/Cheslin" color="primary" variant='contained'>  Cheslin </Button>
          <br/>

          <RedirectToLogIn/>




        </div>
      </React.Fragment>
  )
}
}

export default withRouter(withStyles(styles)(Staging));
