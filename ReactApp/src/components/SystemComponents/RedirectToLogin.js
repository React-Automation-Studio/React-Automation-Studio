import React, { Component } from 'react';



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
      let loggedIn = this.context.userData.loggedIn;
      console.log(loggedIn)
    if(loggedIn){
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

    //  console.log(socket)
  }


  render() {


    return (
      <React.Fragment>
        {this.state.redirectToLoginPage&&<Redirect  to='/LogIn' />}

      </React.Fragment>
    )
  }
}
RedirectToLogIn.contextType=AutomationStudioContext;
export default RedirectToLogIn;
