import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

switch(process.env.NODE_ENV){
  case 'production':
    if(typeof process.env.REACT_APP_PyEpicsServerURL==='undefined'){
      serviceWorker.unregister();
    }
    else{
      serviceWorker.unregister();
    }
    break;
  case 'development':
    serviceWorker.unregister();
    break;
  case 'test':
    serviceWorker.unregister();
    break;
  default:
    // do nothing
}
