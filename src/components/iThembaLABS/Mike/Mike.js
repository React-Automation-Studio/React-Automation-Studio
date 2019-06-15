import React, { Component } from 'react';

import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';

import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import RedirectToLogIn from '../../SystemComponents/RedirectToLogin.js';
import SideBar from '../../SystemComponents/SideBar';
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








class Mike extends Component {
  constructor(props) {
    super(props);
    this.logout=this.logout.bind(this);
  }

  logout(){
    localStorage.removeItem('jwt');

  }
  componentDidMount()
  {
    console.log('Mike mounted')
  }
  render() {


    const { classes } = this.props;

    return (
      <React.Fragment>
        <SideBar/>
        <div id="test" className={classes.center}>






          <br/>
          <Button className= {classes.button} component={Link} to="/Mike1" color="primary" variant='contained'>  Mike1 </Button>
          <br/>
          <Button className= {classes.button} component={Link} to="/Mike2" color="primary" variant='contained'>  Mike2 </Button>
          <br/>
          <Button className= {classes.button} component={Link} to="/Mike3" color="primary" variant='contained'>  Mike3 </Button>

          <br/>
          <Button className= {classes.button} component={Link} to="/ControlTable" color="primary" variant='contained'>  ControlTable </Button>

          <br/>

          <RedirectToLogIn/>




        </div>
      </React.Fragment>
  )
}
}

export default withRouter(withStyles(styles)(Mike));
