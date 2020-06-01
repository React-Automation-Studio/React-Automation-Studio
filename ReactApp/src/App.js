
import React, { Component } from 'react';

//import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';


//import './App.css';
//import io from 'socket.io-client';
import Routes from './routes'

import 'typeface-roboto';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import AutomationStudioContext from './components/SystemComponents/AutomationStudioContext';
import { blue, indigo,pink, red, green,cyan,lime } from '@material-ui/core/colors'
import io from 'socket.io-client';
import { Redirect } from 'react-router-dom'
import LogIn from './LogIn';

import { lightTheme, darkTheme } from './components/UI/Themes/DefaultTheme'

// const socket = io('https://172.16.5.52:5000/test',{
//   transports: ['websocket'],
//   secure:true
// })


//console.log('process.env',process.env)
let port;
if(typeof process.env.REACT_APP_PyEpicsServerPORT==='undefined'){
  port= 5000;
}
else{
  port=process.env.REACT_APP_PyEpicsServerPORT;
}

let pvServerBASEURL;
if(typeof process.env.REACT_APP_PyEpicsServerBASEURL==='undefined'){
  pvServerBASEURL= "http://127.0.0.1";
}
else{
  pvServerBASEURL=process.env.REACT_APP_PyEpicsServerBASEURL;
}

let pvServerNamespace;
if(typeof process.env.REACT_APP_PyEpicsServerNamespace==='undefined'){
  pvServerNamespace= "pvServer";
}
else{
  pvServerNamespace=process.env.REACT_APP_PyEpicsServerNamespace;
}

let PyEpicsServerURL=pvServerBASEURL+":"+port+"/"+pvServerNamespace;



let socket = io(PyEpicsServerURL,{
  transports: ['websocket'],
})



/*
const socket = io('127.0.0.1:5000/test',{
transports: ['websocket']
})*/
let themeStyle='dark';
class App extends Component {
  constructor(props) {
    super(props);

    let theme = null

    let themeStyle = JSON.parse(localStorage.getItem('themeStyle'));

    //console.log('jwt',jwt);
    if (themeStyle == 'light') {
      themeStyle = 'light'
      theme = createMuiTheme(lightTheme)
      localStorage.setItem('themeStyle', JSON.stringify(themeStyle));
    }
    else {
      themeStyle = 'dark'
      theme = createMuiTheme(darkTheme)
      localStorage.setItem('themeStyle', JSON.stringify(themeStyle));
    }



    this.updateLocalVariable = (name,data) => {
      let system=this.state.system;
      let localVariables=system.localVariables;

      localVariables[name]=data;
      system.localVariables=localVariables
      this.setState({
        system:system,

      });
      //console.log('name',name)
      //console.log('data',data)
    };

    let localVariables={};
    let system={socket:socket,localVariables:localVariables,updateLocalVariable:this.updateLocalVariable,enableProbe:true,styleGuideRedirect:true}
    this.state={
      theme :theme,
      system:system,
      redirectToLoginPage:false,
      Authenticated:false,
      AuthenticationFailed:false,


    }
    this.handleConnect=this.handleConnect.bind(this);

    this.handleClientAuthorisation=this.handleClientAuthorisation.bind(this);
  }


  handleConnect(){

    //  console.log('soceket connecting');
    let jwt = JSON.parse(localStorage.getItem('jwt'));

    //console.log('jwt',jwt);
    if(jwt){
      let socket=this.state.system.socket;
      socket.emit('AuthoriseClient', jwt);
    }


  }
  handleClientAuthorisation(msg){

    this.setState({'Authorised':msg.successful,'AuthorisationFailed':msg.successful!==true});


  }
  componentDidMount(){

    let jwt = JSON.parse(localStorage.getItem('jwt'));

    if(jwt){
      this.setState({'redirectToLoginPage':false});
      let socket=this.state.system.socket;
      socket.on('connect',this.handleConnect);
      //socket.on('redirectToLogIn', this.handleRedirectToLogIn);
      socket.on('clientAuthorisation',this.handleClientAuthorisation);


    }



  }
  componentWillUnmount(){
    console.log('unmounted')
    let socket=this.state.system.socket;
    socket.removeListener('connect',this.handleConnect);
    //  socket.removeListener('redirectToLogIn', this.handleRedirectToLogIn);
    socket.removeListener('clientAuthorisation',this.handleClientAuthorisation);
  }
  render() {
    //  console.log('node env',process.env.NODE_ENV)
    //  console.log(this.state.theme)

  //  console.log(this.state)
    return (

      <AutomationStudioContext.Provider value={this.state.system}>
        <MuiThemeProvider theme={this.state.theme}>
          <CssBaseline />
          <Routes limitRoutes={false}>
            {/*<Routes limitRoutes={this.state.AuthenticationFailed}/>*/}


          </Routes>
        </MuiThemeProvider>
      </AutomationStudioContext.Provider>
    );
  }
}


export default App;
