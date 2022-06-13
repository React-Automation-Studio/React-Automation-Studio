
import React, { Component } from 'react';

import 'typeface-roboto';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReactVisCssBaseline from './ReactVisCssBaseline';
import AutomationStudioContext from './AutomationStudioContext';
import { io } from 'socket.io-client';
import RasCssBaseline from './RasCssBaseline';
import PropTypes from 'prop-types';

import axios from 'axios';

class RasAppCore extends Component {
  constructor(props) {
    super(props);

    let theme = null
    localStorage.removeItem('logoutFlag');
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
    this.setRefreshTokenConfig = (config) => {
      let system = this.state.system;
      system.refreshTokenConfig = config;
      localStorage.setItem('refreshTokenConfig', JSON.stringify(config));

      const timer = setTimeout(this.getRefreshToken, system.refreshTokenConfig.refreshTimeout * 1000)

      this.setState({ system: system, refreshTimer: timer })
    }
    this.setUserTokens = (accessToken) => {
      let system = this.state.system;
      let userTokens = {
        accessToken: accessToken,
      };
      system.userTokens = userTokens;
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
        loggingIn: false,
      };
      system.userData = userData;

      this.setState({ system: system })
    }

    this.logout = () => {
      axios({
        url:'/api/logout',
        method:'GET',
        timeout: 15000
      })
        .then(response => {
          let system = this.state.system;
          let userData = {
            username: '',
            roles: [],
            loggedIn: false,
            loggingIn: false,
          };
          let userTokens = { accessToken: "unauthenticated" };
          system.userData = userData;
          system.userTokens = userTokens;
          system.refreshTokenConfig = {};
          if (this.state.refreshTimer) {
            clearTimeout(this.state.refreshTimer)
          }
          this.setState({ system: system })

          localStorage.removeItem('loggedIn');
          localStorage.removeItem('refreshTokenConfig');
          localStorage.clear();
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }

    this.clearLoggingIn = () => {
      let system = this.state.system;
      system.userData.loggingIn = false;
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
      loggedIn: false,
      loggingIn: true,
    };
    let userTokens = {
      accessToken: 'unauthenticated'
    }

    let refreshTokenConfig = JSON.parse(localStorage.getItem('refreshTokenConfig'));

    if (refreshTokenConfig === null) {
      refreshTokenConfig = {}
    }
    let localVariables = {};
    let system = {
      socket: socket,
      changeTheme: this.changeTheme,
      themeStyles: themeKeys,
      themeStyle: themeStyle,
      localVariables: localVariables,
      updateLocalVariable: this.updateLocalVariable,
      userData: userData, userTokens: userTokens,
      setUserTokens: this.setUserTokens,
      setRefreshTokenConfig: this.setRefreshTokenConfig,
      refreshTokenConfig: refreshTokenConfig,
      setUserData: this.setUserData,
      logout: this.logout,
      enableProbe: true,
      styleGuideRedirect: true
    }
    this.state = {
      theme: theme,
      system: system,
      redirectToLoginPage: false,
      Authenticated: false,
      AuthenticationFailed: false,
    }
    this.handleConnect = this.handleConnect.bind(this);

    this.handleClientAuthorisation = this.handleClientAuthorisation.bind(this);
    this.handleRedirectToLogIn = this.handleRedirectToLogIn.bind(this);
    this.getInitialRefreshToken = this.getInitialRefreshToken.bind(this);
    this.getRefreshToken = this.getRefreshToken.bind(this);
    this.handleLocalStorageChange = this.handleLocalStorageChange.bind(this);
  }

  handleConnect() {
    let jwt = this.state.system.userTokens.accessToken;

    if (jwt) {
      let socket = this.state.system.socket;
      socket.emit('AuthoriseClient', jwt);
    }
  }

  handleClientAuthorisation(msg) {
    if (msg.successful) {
      this.state.system.setUserData(msg.username, msg.roles);
      localStorage.setItem("loggedIn", 'true')
    }
    else {
      this.logout()
    }
    this.setState({ 'Authorised': msg.successful, 'AuthorisationFailed': msg.successful !== true });
  }

  handleRedirectToLogIn() {
    console.log('redirectToLogIn')
    this.state.system.socket.close()
    this.logout();
  }

  getRefreshToken() {
    const options = {
      headers: { 'Content-Type': 'application/json' },
    };
    let body;

    const { useCookie } = this.state.system.refreshTokenConfig;
    if (useCookie === true) {
      body = JSON.stringify({})
    }
    else {
      console.warn("React Automation Studio SECURE mode is not in use, and as a consequence the refresh token will stored in local storage. This mode should not be used in production, see styleguide for correct implementation")
      const { refreshToken } = this.state.system.refreshTokenConfig;
      body = JSON.stringify({ "refreshToken": refreshToken })
    }
    axios.post('/api/refresh', body, options)
      .then(response => {
        // handle success
        const { data } = response;
        if (typeof data.accessToken !== 'undefined') {
          this.setUserTokens(data.accessToken);
        }
        else {
          this.setUserTokens(data.null);
        }
        if (typeof data.refreshTokenConfig !== 'undefined') {
          this.state.system.setRefreshTokenConfig(data.refreshTokenConfig);
        }
        else {
          this.state.system.setRefreshTokenTimeout(data.null);
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
        this.handleRedirectToLogIn()
      })
      .then(function () {
        // always executed
      });
    this.setState({ 'redirectToLoginPage': false });
  }

  getInitialRefreshToken() {
    let refreshTokenConfig = JSON.parse(localStorage.getItem('refreshTokenConfig'));

    if (refreshTokenConfig !== null) {
      this.getRefreshToken();
    }
    else {
      this.clearLoggingIn();
      this.setState({ 'redirectToLoginPage': true });
    }
  }

  handleLocalStorageChange(event) {
    if (event.key === "loggedIn") {
      if (event.newValue === null) {
        this.logout();
      } else if (event.newValue === 'true') {
        let refreshTokenConfig = JSON.parse(localStorage.getItem('refreshTokenConfig'));
        let system = this.state.system;
        if (refreshTokenConfig !== null) {
          system.refreshTokenConfig = refreshTokenConfig;
          this.setState({ system: system }, this.getInitialRefreshToken())
        }
      }
    }
    else if (event.key === "themeStyle"){
      let storedThemeStyle = localStorage.getItem('themeStyle')
      console.log(storedThemeStyle)
      const { defaultTheme } = this.props;
      let themeStyle = storedThemeStyle === null ? defaultTheme : JSON.parse(storedThemeStyle);
      let theme = null
      let themeStyles = this.state.system.themeStyles;
      if (themeStyles.includes(themeStyle)) {
        theme = createMuiTheme(this.props.themes[themeStyle])
        let system = this.state.system;
        system.themeStyle = themeStyle;
        this.setState({ system: system, theme: theme })
      }
    }
  }

  componentDidMount() {
    window.addEventListener('storage', this.handleLocalStorageChange)
    setTimeout(this.clearLoggingIn, this.props.loginTimeout)
    this.getInitialRefreshToken();
    let socket = this.state.system.socket;
    socket.on('redirectToLogIn', this.handleRedirectToLogIn);
    socket.on('clientAuthorisation', this.handleClientAuthorisation);
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.handleLocalStorageChange)
    let socket = this.state.system.socket;
    socket.removeListener('connect', this.handleConnect);
    socket.removeListener('clientAuthorisation', this.handleClientAuthorisation);
    socket.removeListener('redirectToLogIn', this.handleRedirectToLogIn)
    if (this.state.refreshTimer) {
      clearTimeout(this.state.refreshTimer)
    }
  }
  
  render() {
    const { system } = this.state;

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
  loginTimeout: 10000
}

export default RasAppCore
