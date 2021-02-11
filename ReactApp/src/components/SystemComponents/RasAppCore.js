
import React, { Component } from 'react';




import 'typeface-roboto';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReactVisCssBaseline from './ReactVisCssBaseline';
import AutomationStudioContext from './AutomationStudioContext';
import { io } from 'socket.io-client';
import RasCssBaseline from './RasCssBaseline';




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








class RasAppCore extends Component {
  constructor(props) {
    super(props);

    let theme = null
    let storedThemeStyle=localStorage.getItem('themeStyle')
    console.log(storedThemeStyle)
    const {defaultTheme}=this.props;
    let themeStyle = storedThemeStyle===null?defaultTheme:JSON.parse(storedThemeStyle);
    let themeKeys = Object.keys(this.props.themes);
    // let socket = io(PyEpicsServerURL, {
    //   transports: ['websocket'],
    // })
    let socket = io("/pvServer", {
         transports: ['websocket'],
       })
    if (themeKeys.includes(themeStyle)) {
      theme = createMuiTheme(this.props.themes[themeStyle])
     
    }
    else {
      themeStyle = defaultTheme;
      theme = createMuiTheme(this.props.themes[themeStyle])
      localStorage.setItem('themeStyle', JSON.stringify(themeStyle));
    }

   
    this.changeTheme = (event) => {
      let themeStyle = event.target.value;

      let theme = null
      let themeStyles = this.state.system.themeStyles;
      if (themeStyles.includes(themeStyle)) {
        theme = createMuiTheme(this.props.themes[themeStyle])
       
      }
      else {
        const {defaultTheme}=props.defaultTheme;
        themeStyle = defaultTheme;
        theme = createMuiTheme(this.props.themes[themeStyle])
        localStorage.setItem('themeStyle', JSON.stringify(themeStyle));
      }

      let system = this.state.system;
      system.themeStyle = themeStyle
      this.setState({ system: system, theme: theme })
      localStorage.setItem('themeStyle', JSON.stringify(themeStyle));
    }

    
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

     console.log('socket connecting');
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
      socket.on('clientAuthorisation', this.handleClientAuthorisation);
      socket.on('connect', this.handleConnect);

    }



  }
  componentWillUnmount() {
    let socket = this.state.system.socket;
    socket.removeListener('connect', this.handleConnect);
    socket.removeListener('clientAuthorisation', this.handleClientAuthorisation);
  }
  render() {
    const {system}=this.state;
    return (

      <AutomationStudioContext.Provider value={{...system}}>
        <MuiThemeProvider theme={this.state.theme}>
          <CssBaseline />
            <ReactVisCssBaseline/>
            <RasCssBaseline/>
              {/* <Routes /> */}
               {this.props.children}

            {/* </ReactVisCssBaseline> */}
          {/* </CssBaseline> */}
        </MuiThemeProvider>
      </AutomationStudioContext.Provider>
    );
  }
}

export default RasAppCore