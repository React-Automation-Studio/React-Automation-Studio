import React from 'react';
import ReactDOM from 'react-dom';

import { Route, BrowserRouter, Switch } from 'react-router-dom'
import App from './App';
//import * as serviceWorker from './serviceWorker';
import RfOverlay from './components/william/RfOverlay';
import Demos from './components/Examples/Demos';
import Help from './components/docs/Help';
import MobileTest from './components/Examples/MobileTest';
import ControlTest1 from './components/ControlScreens/ControlTest1';
import Main from './Main';
import ControlTestHarp1 from './components/ControlScreens/ControlTestHarp1';
import ControlTestTable from './components/ControlScreens/ControlTestTable';
import IvanControlTable from './components/ControlScreens/IvanControlTable';
import ComponentsWithMultiplePVs from './components/Examples/ComponentsWithMultiplePVs';


import ControlTest3D from './components/ControlScreens/ControlTest3D';
import JustinTest1 from './components/iThembaLABS/Justin/JustinTest1';
import JustinTest2 from './components/iThembaLABS/Justin/JustinTest2';
import JustinTest3 from './components/iThembaLABS/Justin/JustinTest3';
import Probe from './components/SettingsPages/Probe';
import SettingsSteererXY from './components/SettingsPages/SettingsSteererXY';
import SettingsSinglePS from './components/SettingsPages/SettingsSinglePS';
import LogIn from './LogIn';
import { Redirect } from 'react-router-dom'
export default props=>(
  <BrowserRouter>

    <Switch>

      <Route exact path="/" component={ Main } />


      {process.env.REACT_APP_EnableLogin==='true'&&
      <Route exact path="/LogIn" component={ LogIn } />
    }

    </Switch>

  </BrowserRouter>
)
