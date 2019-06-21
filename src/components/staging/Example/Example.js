import React, { Component } from 'react';

import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';

import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import RedirectToLogIn from '../../../components/SystemComponents/RedirectToLogin.js';
import SideBar from '../../../components/SystemComponents/SideBar';
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








class Example extends Component {
  constructor(props) {
    super(props);
    this.logout=this.logout.bind(this);
  }

  logout(){
    localStorage.removeItem('jwt');

  }
  componentDidMount()
  {
    console.log('Example mounted')
  }
  render() {


    const { classes } = this.props;

    return (
      <React.Fragment>
        <SideBar/>
        <div id="test" className={classes.center}>






          <br/>
          <Button className= {classes.button} component={Link} to="/Example1" color="primary" variant='contained'>  Example1 </Button>
          <br/>
          <Button className= {classes.button} component={Link} to="/Example2" color="primary" variant='contained'>  Example2 </Button>
          <br/>
          <Button className= {classes.button} component={Link} to="/Example3" color="primary" variant='contained'>  Example3 </Button>
          <br/>

          <RedirectToLogIn/>




        </div>
      </React.Fragment>
  )
}
}

export default withRouter(withStyles(styles)(Example));
