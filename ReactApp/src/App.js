
import React, { Component } from 'react';

//import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';


//import './App.css';
//import io from 'socket.io-client';
import Routes from './routes'

import 'typeface-roboto';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReactVisCssBaseline from './components/SystemComponents/ReactVisCssBaseline';
import AutomationStudioContext from './components/SystemComponents/AutomationStudioContext';
import io from 'socket.io-client';

import { lightTheme, darkTheme, themes } from './components/UI/Themes/DefaultTheme'

// const socket = io('https://172.16.5.52:5000/test',{
//   transports: ['websocket'],
//   secure:true
// })


//console.log('process.env',process.env)
let port;
if (typeof process.env.REACT_APP_PyEpicsServerPORT === 'undefined') {
  port = 5000;
}
else {
  port = process.env.REACT_APP_PyEpicsServerPORT;
}

let pvServerBASEURL;
if (typeof process.env.REACT_APP_PyEpicsServerBASEURL === 'undefined') {
  pvServerBASEURL = "http://127.0.0.1";
}
else {
  pvServerBASEURL = process.env.REACT_APP_PyEpicsServerBASEURL;
}

let pvServerNamespace;
if (typeof process.env.REACT_APP_PyEpicsServerNamespace === 'undefined') {
  pvServerNamespace = "pvServer";
}
else {
  pvServerNamespace = process.env.REACT_APP_PyEpicsServerNamespace;
}

let PyEpicsServerURL = pvServerBASEURL + ":" + port + "/" + pvServerNamespace;



let socket = io(PyEpicsServerURL, {
  transports: ['websocket'],
})



/*
const socket = io('127.0.0.1:5000/test',{
transports: ['websocket']
})*/
let themeStyle = 'dark';
class App extends Component {
  constructor(props) {
    super(props);

    let theme = null

    let themeStyle = JSON.parse(localStorage.getItem('themeStyle'));
    let themeKeys = Object.keys(themes);
    if (themeKeys.includes(themeStyle)) {
      theme = createMuiTheme(themes[themeStyle])
      //   localStorage.setItem('themeStyle', JSON.stringify(themeStyle));
    }
    else {
      themeStyle = themeKeys[0];
      theme = createMuiTheme(themes[themeStyle])
      localStorage.setItem('themeStyle', JSON.stringify(themeStyle));
    }

    //   themeStyle = 'light'
    //   theme = createMuiTheme(lightTheme)
    //   localStorage.setItem('themeStyle', JSON.stringify(themeStyle));
    // }
    // else {
    //   themeStyle = 'dark'
    //   theme = createMuiTheme(darkTheme)
    //   localStorage.setItem('themeStyle', JSON.stringify(themeStyle));
    // }
    //console.log('jwt',jwt);
    // if (themeStyle == 'light') {
    //   themeStyle = 'light'
    //   theme = createMuiTheme(lightTheme)
    //   localStorage.setItem('themeStyle', JSON.stringify(themeStyle));
    // }
    // else {
    //   themeStyle = 'dark'
    //   theme = createMuiTheme(darkTheme)
    //   localStorage.setItem('themeStyle', JSON.stringify(themeStyle));
    // }

    //console.log(themeStyle)
    this.changeTheme = (event) => {
      let themeStyle = event.target.value;

      let theme = null
      let themeStyles = this.state.system.themeStyles;
      if (themeStyles.includes(themeStyle)) {
        theme = createMuiTheme(themes[themeStyle])
        //   localStorage.setItem('themeStyle', JSON.stringify(themeStyle));
      }
      else {
        themeStyle = themeStyles[0];
        theme = createMuiTheme(themes[themeStyle])
        localStorage.setItem('themeStyle', JSON.stringify(themeStyle));
      }

      let system = this.state.system;
      system.themeStyle = themeStyle
      this.setState({ system: system, theme: theme })
      localStorage.setItem('themeStyle', JSON.stringify(themeStyle));
    }

    // this.toggleTheme = () => {
    //   let theme = null
    //   let themeStyle = this.state.themeStyle;

    //   if (themeStyle == 'dark') {
    //     themeStyle = 'light'
    //     theme = createMuiTheme(lightTheme)
    //   }
    //   else {
    //     themeStyle = 'dark'
    //     theme = createMuiTheme(darkTheme)
    //   }

    //   this.setState({ themeStyle: themeStyle, theme: theme })
    //   localStorage.setItem('themeStyle', JSON.stringify(themeStyle));
    // }
    this.setUserData = (username, roles) => {
      let system = this.state.system;
      let userData = {
        username: username,
        roles: roles
      };
      system.userData = userData;

      this.setState({ system: system })
    }
    this.logout = () => {
      localStorage.removeItem('jwt');
      let system = this.state.system;
      let userData = {
        username: '',
        roles: []
      };
      system.userData = userData;

      this.setState({ system: system })
    }
    this.updateLocalVariable = (name, data) => {
      let system = this.state.system;
      let localVariables = system.localVariables;

      localVariables[name] = data;
      system.localVariables = localVariables
      this.setState({
        system: system,

      });
      //console.log('name',name)
      //console.log('data',data)
    };
    let userData = {
      username: '',
      roles: []
    };

    let localVariables = {};
    let system = { socket: socket, changeTheme: this.changeTheme, themeStyles: themeKeys, themeStyle: themeStyle, localVariables: localVariables, updateLocalVariable: this.updateLocalVariable, userData: userData, setUserData: this.setUserData, logout: this.logout, enableProbe: true, styleGuideRedirect: true }
    this.state = {
      theme: theme,
      system: system,
      redirectToLoginPage: false,
      Authenticated: false,
      AuthenticationFailed: false,


    }
    this.handleConnect = this.handleConnect.bind(this);

    this.handleClientAuthorisation = this.handleClientAuthorisation.bind(this);
  }


  handleConnect() {

    //  console.log('soceket connecting');
    let jwt = JSON.parse(localStorage.getItem('jwt'));

    //console.log('jwt',jwt);
    if (jwt) {
      let socket = this.state.system.socket;
      socket.emit('AuthoriseClient', jwt);
    }


  }
  handleClientAuthorisation(msg) {
    this.state.system.setUserData(msg.username, msg.roles);
    this.setState({ 'Authorised': msg.successful, 'AuthorisationFailed': msg.successful !== true });



  }
  componentDidMount() {

    let jwt = JSON.parse(localStorage.getItem('jwt'));

    if (jwt) {
      this.setState({ 'redirectToLoginPage': false });
      let socket = this.state.system.socket;
      socket.on('connect', this.handleConnect);
      //socket.on('redirectToLogIn', this.handleRedirectToLogIn);
      socket.on('clientAuthorisation', this.handleClientAuthorisation);


    }



  }
  componentWillUnmount() {
    // console.log('unmounted')
    let socket = this.state.system.socket;
    socket.removeListener('connect', this.handleConnect);
    //  socket.removeListener('redirectToLogIn', this.handleRedirectToLogIn);
    socket.removeListener('clientAuthorisation', this.handleClientAuthorisation);
  }
  render() {
    //  console.log('node env',process.env.NODE_ENV)
    //  console.log(this.state.theme)

    //  console.log(this.state)
    // console.log(this.state.theme)
    return (

      <AutomationStudioContext.Provider value={this.state.system}>
        <MuiThemeProvider theme={this.state.theme}>
          <CssBaseline >
            <ReactVisCssBaseline>
              <Routes limitRoutes={false}>
                {/*<Routes limitRoutes={this.state.AuthenticationFailed}/>*/}


              </Routes>
            </ReactVisCssBaseline>
          </CssBaseline>
        </MuiThemeProvider>
      </AutomationStudioContext.Provider>
    );
  }
}


export default App;
