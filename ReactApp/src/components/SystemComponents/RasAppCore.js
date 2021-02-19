
import React, { Component } from 'react';




import 'typeface-roboto';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReactVisCssBaseline from './ReactVisCssBaseline';
import AutomationStudioContext from './AutomationStudioContext';
import { io } from 'socket.io-client';
import RasCssBaseline from './RasCssBaseline';
import PropTypes from 'prop-types';










class RasAppCore extends Component {
  constructor(props) {
    super(props);

    let theme = null
    let storedThemeStyle = localStorage.getItem('themeStyle')
    console.log(storedThemeStyle)
    const { defaultTheme } = this.props;
    let themeStyle = storedThemeStyle === null ? defaultTheme : JSON.parse(storedThemeStyle);
    let themeKeys = Object.keys(this.props.themes);
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
        const { defaultTheme } = props.defaultTheme;
        themeStyle = defaultTheme;
        theme = createMuiTheme(this.props.themes[themeStyle])
        localStorage.setItem('themeStyle', JSON.stringify(themeStyle));
      }

      let system = this.state.system;
      system.themeStyle = themeStyle
      this.setState({ system: system, theme: theme })
      localStorage.setItem('themeStyle', JSON.stringify(themeStyle));
    }
    this.setUserTokens = (accessToken) => {

      let system = this.state.system;
      let userTokens = {
        accessToken: accessToken,
      };
      system.userTokens = userTokens;
      localStorage.setItem('jwt', JSON.stringify(userTokens.accessToken))
      if (system.socket.disconnected) {
        system.socket.open();

        system.socket.emit('AuthoriseClient', system.userTokens.accessToken); //must authorise client over socket io too
      }
      else {
        system.socket.emit('AuthoriseClient', system.userTokens.accessToken); //must authorise client over socket io too
      }

      this.setState({ system: system })

    }

    this.setUserData = (username, roles) => {

      let system = this.state.system;
      let userData = {
        username: username,
        roles: roles,
        loggedIn: true,
        loggingIn:false,
      };
      system.userData = userData;

      this.setState({ system: system })
    }
    this.logout = () => {
      localStorage.removeItem('jwt');
      let system = this.state.system;
      let userData = {
        username: '',
        roles: [],
        loggedIn: false,
        loggingIn:false,
      };
      let userTokens = { accessToken: "unauthenticated" };
      system.userData = userData;
      system.userTokens = userTokens;
      this.setState({ system: system })
    }
    this.clearLoggingIn=()=>{
      let system = this.state.system;
      system.userData.loggingIn=false;
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
    };
    let userData = {
      username: '',
      roles: [],
      loggedIn:false,
      loggingIn:true,
    };
    let jwt =JSON.parse(localStorage.getItem('jwt'));
    if (jwt===null){
      jwt='unauthenticated'
    }
    let userTokens = {
      accessToken:jwt 
    }
    let localVariables = {};
    let system = { socket: socket, changeTheme: this.changeTheme, themeStyles: themeKeys, themeStyle: themeStyle, localVariables: localVariables, updateLocalVariable: this.updateLocalVariable, userData: userData, userTokens: userTokens, setUserTokens: this.setUserTokens, setUserData: this.setUserData, logout: this.logout, enableProbe: true, styleGuideRedirect: true }
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

    
    let jwt = this.state.system.userTokens.accessToken;
   
    if (jwt) {
      let socket = this.state.system.socket;
      socket.emit('AuthoriseClient', jwt);
    }


  }
  handleClientAuthorisation(msg) {
    if (msg.successful){
    this.state.system.setUserData(msg.username, msg.roles);
    }
    else{
      this.state.system.logout()
    }
    this.setState({ 'Authorised': msg.successful, 'AuthorisationFailed': msg.successful !== true });



  }
  componentDidMount() {
    setTimeout(this.state.system.clearLoggingIn, this.props.loginTimeout)
    let jwt = this.state.system.userTokens.accessToken;
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

    const { system } = this.state;
    console.log("loggingIn",system.userData.loggingIn)
    console.log("loggedIn",system.userData.loggedIn)
    return (

      <AutomationStudioContext.Provider value={{ ...system }}>
        <MuiThemeProvider theme={this.state.theme}>
          <CssBaseline />
          <ReactVisCssBaseline />
          <RasCssBaseline />
          {this.props.children}
        </MuiThemeProvider>
      </AutomationStudioContext.Provider>
    );
  }
}
RasAppCore.propTypes = {
  
  /** login Timeout */
  loginTimeout: PropTypes.number,
  
}

RasAppCore.defaultProps = {
  loginTimeout:10000
}
export default RasAppCore