import React, { Component } from 'react';

//import AutomationStudioContext from './api/AutomationStudioContext';


//import './Wrapper.css';
//import io from 'socket.io-client';

import 'typeface-roboto';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import AutomationStudioContext from '../components/SystemComponents/AutomationStudioContext';
import { blue, indigo,pink, red, green,cyan,lime } from '@material-ui/core/colors'
import io from 'socket.io-client';


let socket;
switch(process.env.NODE_ENV){
  case 'production':
  if(typeof process.env.REACT_APP_PyEpicsServerURL==='undefined'){
    console.log('process.env',process.env)
    console.log('process.env.REACT_APP_PyEpicsServerURL!==undefined')
    socket = io('127.0.0.1:5000/test',{
      transports: ['websocket'],
    })
  }
  else{
    socket = io(process.env.REACT_APP_PyEpicsServerURL,{
      transports: ['websocket'],
    })
  }




  break;
  case 'development':
  if(typeof process.env.REACT_APP_PyEpicsServerURL==='undefined'){
    console.log('process.env',process.env)
    console.log('process.env.REACT_APP_PyEpicsServerURL!==undefined')
    socket = io('127.0.0.1:5000/test',{
      transports: ['websocket'],
    })
  }
  else{
    socket = io(process.env.REACT_APP_PyEpicsServerURL,{
      transports: ['websocket'],
    })
  }




  break;
  case 'test':
  if(typeof process.env.REACT_APP_PyEpicsServerURL==='undefined'){
    console.log('process.env',process.env)
    console.log('process.env.REACT_APP_PyEpicsServerURL!==undefined')
    socket = io('127.0.0.1:5000/test',{
      transports: ['websocket'],
    })
  }
  else{
    socket = io(process.env.REACT_APP_PyEpicsServerURL,{
      transports: ['websocket'],
    })
  }








  break;
}




/*
const socket = io('127.0.0.1:5000/test',{
transports: ['websocket']
})*/
class Wrapper extends Component {
  constructor(props) {
    super(props);

    let theme = createMuiTheme({
      palette: {
        type:'light',
        primary: indigo,
        secondary: red,
        error: pink,
        action:green,
        // Used by `getContrastText()` to maximize the contrast between the background and
        // the text.
        contrastThreshold: 3,
        // Used to shift a color's luminance by Wrapperroximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,



      },
      lightLineColors:['#12939A', '#79C7E3', '#1A3177', '#FF9833', '#EF5D28'],
      darkLineColors:['#ff9800', '#f44336', '#9c27b0', '#3f51b5', '#e91e63'],
      typography: {
        useNextVariants: true,
        fontFamily: [

          'Roboto',


        ].join(','),
      },
    });


    this.updateLocalVariable = (name,data) => {
      let system=this.state.system;
      let localVariables=system.localVariables;

      localVariables[name]=data;
      system.localVariables=localVariables
      this.setState({
        system:system,
        key:this.state.key+1
      });
      //console.log('name',name)
      //console.log('data',data)
    };

    let localVariables={};
    let system={socket:socket,
                localVariables:localVariables,
                updateLocalVariable:this.updateLocalVariable,
                enableProbe:false,
                styleGuideRedirect:false}
    this.state={
      theme :theme,
      system:system,
      key :1,
    }


  }
  render() {
    //console.log(this.state.theme)

    return (

      <AutomationStudioContext.Provider  value={this.state.system}>
        <MuiThemeProvider theme={this.state.theme}>
          <CssBaseline />
          {this.props.children}
        </MuiThemeProvider>
      </AutomationStudioContext.Provider>
    );
  }
}


export default Wrapper;
