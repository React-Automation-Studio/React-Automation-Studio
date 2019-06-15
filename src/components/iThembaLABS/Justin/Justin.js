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








class Justin extends Component {
  constructor(props) {
    super(props);
    this.logout=this.logout.bind(this);
  }

  logout(){
    localStorage.removeItem('jwt');

  }
  componentDidMount()
  {
    console.log('Justin mounted')
  }
  render() {


    const { classes } = this.props;

    return (
      <React.Fragment>
        <SideBar/>
        <div id="test" className={classes.center}>






          <br/>
          <Button className= {classes.button} component={Link} to="/JustinTest1" color="primary" variant='contained'>  JustinTest1 </Button>
          <br/>
          <Button className= {classes.button} component={Link} to="/JustinTest2" color="primary" variant='contained'>  JustinTest2 </Button>
          <br/>
          <Button className= {classes.button} component={Link} to="/JustinTest3" color="primary" variant='contained'>  JustinTest3 </Button>
          <br/>

          <RedirectToLogIn/>




        </div>
      </React.Fragment>
  )
}
}

export default withRouter(withStyles(styles)(Justin));
