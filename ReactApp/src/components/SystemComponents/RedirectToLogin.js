import React, { Component } from 'react';

import PropTypes from 'prop-types';


// Styles



import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import { Redirect } from 'react-router-dom';


class RedirectToLogIn extends Component {
  constructor(props) {
    super(props);
    this.handleRedirectToLogIn=this.handleRedirectToLogIn.bind(this);
    this.state={redirectToLoginPage:false};
  }

  handleRedirectToLogIn=()=>{
    //console.log('redirectToLogIn')

    //setTimeout(() => {
    this.setState({redirectToLoginPage:true});
    //      }, 1000)
  }
  componentDidMount() {
    //  this.handleRedirectToLogIn();
    let socket=this.context.socket;
    socket.on('redirectToLogIn', this.handleRedirectToLogIn);

    if (process.env.REACT_APP_EnableLogin==='true'){
    let jwt = JSON.parse(localStorage.getItem('jwt'));

    if(jwt){
      this.setState({'redirectToLoginPage':false});



    }
    else{
      this.setState({'redirectToLoginPage':true});
    }
  }

    //  let jwt = JSON.parse(localStorage.getItem('jwt'));
    //  console.log('jwt',jwt);
    //  socket.emit('AuthoriseClient', jwt);
  }
  componentWillUnmount() {
    let socket=this.context.socket;
    socket.removeListener('redirectToLogIn', this.handleRedirectToLogIn);

    //  console.log(socket)
  }


  render() {

//console.log("redirectToLogIn",this.state.redirectToLoginPage)
    const { classes } = this.props;

    return (
      <React.Fragment>
        {this.state.redirectToLoginPage&&<Redirect  to='/LogIn' />}

      </React.Fragment>
    )
  }
}
RedirectToLogIn.contextType=AutomationStudioContext;
export default RedirectToLogIn;
