import React, { Component } from 'react';

import 'typeface-roboto';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import AutomationStudioContext from '../components/SystemComponents/AutomationStudioContext';

import { io } from 'socket.io-client';
import   lightTheme  from '../components/UI/Themes/lightTheme'
import ReactVisCssBaseline from '../components/SystemComponents/ReactVisCssBaseline';

if (typeof window.socket === 'undefined') {
  window.socket = io("/pvServer", {
    transports: ['websocket'],
  })
}

const themes={Light:lightTheme};
class Wrapper extends Component {
  constructor(props) {
    super(props);
    let theme = null
    let storedThemeStyle=localStorage.getItem('themeStyle')
    const defaultTheme='Light';
    
    let themeStyle = storedThemeStyle===null?defaultTheme:JSON.parse(storedThemeStyle);
    let themeKeys = Object.keys(themes);
    if (themeKeys.includes(themeStyle)) {
      theme = createMuiTheme(themes[themeStyle])
    }
    else {
      themeStyle = themeKeys[0];
      theme = createMuiTheme(themes[themeStyle])
      localStorage.setItem('themeStyle', JSON.stringify(themeStyle));
    }

    this.changeTheme = (event) => {
      let themeStyle = event.target.value;

      let theme = null
      let themeStyles = this.state.system.themeStyles;
      if (themeStyles.includes(themeStyle)) {
        theme = createMuiTheme(themes[themeStyle])
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

    this.updateLocalVariable = (name, data) => {
      let system = this.state.system;
      let localVariables = system.localVariables;

      localVariables[name] = data;
      system.localVariables = localVariables

      this.setState({
        system: system,
        key: this.state.key + 1
      });
    };

    let localVariables = {};
    let userTokens = {
      accessToken: 'unauthenticated'
    }
    let system = {
      socket: window.socket,
      userTokens:userTokens,
      localVariables: localVariables,
      updateLocalVariable: this.updateLocalVariable,
      enableProbe: false,
      styleGuideRedirect: false,
      themeStyles: themeKeys,
      changeTheme: this.changeTheme,
    }
    this.state = {
      theme: theme,
      system: system,
      key: 1,
    }
  }
  render() {
    return (
      <AutomationStudioContext.Provider value={this.state.system}>
        <MuiThemeProvider theme={this.state.theme}>
          <CssBaseline >
            <ReactVisCssBaseline>
              {this.props.children}
            </ReactVisCssBaseline>
          </CssBaseline>
        </MuiThemeProvider>
      </AutomationStudioContext.Provider>
    );
  }
}

export default Wrapper;
