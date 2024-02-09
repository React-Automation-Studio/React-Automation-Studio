import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  // Strict mode should be permanently enabled once all code conversion to React 18.2 is complete
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA

// switch(process.env.NODE_ENV){
//   case 'production':
//     if(typeof process.env.VITE_PyEpicsServerURL==='undefined'){
//       serviceWorker.unregister();
//     }
//     else{
//       serviceWorker.unregister();
//     }
//     break;
//   case 'development':
//     serviceWorker.unregister();
//     break;
//   case 'test':
//     serviceWorker.unregister();
//     break;
//   default:
    // do nothing
// }
