import React, { Component } from 'react';

import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import { Redirect } from 'react-router-dom';


class RedirectToLogIn extends Component {
  constructor(props) {
    super(props);
    this.handleRedirectToLogIn=this.handleRedirectToLogIn.bind(this);
    this.state={redirectToLoginPage:false};
  }

  handleRedirectToLogIn=()=>{
    console.log('redirectToLogIn')

    this.context.logout();
    this.setState({redirectToLoginPage:true});
  }

  componentDidMount() {
    let socket=this.context.socket;
    socket.on('redirectToLogIn', this.handleRedirectToLogIn);
    const EnableLogin=import.meta.env?.VITE_EnableLogin?import.meta.env.VITE_EnableLogin==='true':false;
    if (EnableLogin){
      let loggedIn = this.context.userData.loggedIn;
      let loggingIn = this.context.userData.loggingIn;
      if(loggedIn||loggingIn){
        this.setState({'redirectToLoginPage':false});
      }
      else{
        this.setState({'redirectToLoginPage':true});
      }
    }
  }

  componentWillUnmount() {
    let socket=this.context.socket;
    socket.removeListener('redirectToLogIn', this.handleRedirectToLogIn);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.redirectToLoginPage&&<Redirect  to='/Login' />}
      </React.Fragment>
    )
  }
}

RedirectToLogIn.contextType=AutomationStudioContext;

export default RedirectToLogIn;
