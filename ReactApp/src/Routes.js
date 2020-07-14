import React from 'react';


import { Route, BrowserRouter, Switch } from 'react-router-dom'

import EpicsDemos from './components/Examples/EpicsDemos';
import Help from './components/docs/Help';
import MobileDemo2 from './components/Examples/Mobile/MobileDemo2';
import MobileDemo1 from './components/Examples/Mobile/MobileDemo1';

//import Main from './Main';
import MainDashboard from './components/UI/MainDashboard';

import BeamlineControlSystem from './components/ControlScreens/BeamlineControlSystem';

import TableControlSystem from './components/ControlScreens/TableControlSystem';
import ComponentsWithMultiplePVs from './components/Examples/ComponentsWithMultiplePVs';
import Staging from './components/staging/Staging';
import Example from './components/staging/Example/Example';
import Example1 from './components/staging/Example/Example1';
import Example2 from './components/staging/Example/Example2';
import Example3 from './components/staging/Example/Example3';
import Test3D from './components/Experimental/Test3D';
import Probe from './components/SettingsPages/Probe';
import SettingsSteererXY from './components/SettingsPages/SettingsSteererXY';
import SettingsSinglePS from './components/SettingsPages/SettingsSinglePS';
import AlarmHandler from './components/AlarmHandler/AlarmHandler';
import AlarmHandlerUN from './components/AlarmHandler/UserNotification';
import Vault from './components/AlarmHandler/Vault';
import AdvancedSettingsSinglePS from './components/ExperimentalControlScreens/SettingsPages/AdvancedSettingsSinglePS';
import LogIn from './LogIn';
import LoadSaveExample from './components/ExperimentalExamples/LoadSaveExample';

const Routes = (props) => {
  return (
    <BrowserRouter >

      <Switch>

        <Route exact path="/" component={MainDashboard} />
        <Route exact path="/MainDashboard" component={MainDashboard} />

        {process.env.REACT_APP_EnableLogin === 'true' &&
          <Route exact path="/LogIn" component={LogIn} />
        }
        <Route path="/SettingsSinglePS" component={SettingsSinglePS} />
        <Route path="/SettingsSteererXY" component={SettingsSteererXY} />
        <Route path="/Probe" component={Probe} />

        <Route path="/MobileDemo2" component={MobileDemo2} />
        <Route path="/MobileDemo1" component={MobileDemo1} />

        
        <Route path="/TableControlSystem" component={TableControlSystem} /> 
      
        <Route path="/EpicsDemos" component={EpicsDemos} />
        <Route path="/Help" component={Help} />
        <Route path="/Staging" component={Staging} />

        <Route path="/Test3D" component={Test3D} />
        <Route path="/ComponentsWithMultiplePVs" component={ComponentsWithMultiplePVs} />
        <Route path="/Example" component={Example} />
        <Route path="/Example1" component={Example1} />
        <Route path="/Example2" component={Example2} />
        <Route path="/Example3" component={Example3} />
     

        <Route path="/AlarmHandlerDemo" component={AlarmHandler} />
        <Route path="/AlarmHandlerDemoUN" component={AlarmHandlerUN} />
        <Route path="/VaultDemo" component={Vault} />
        <Route path="/LoadSaveExample" component={LoadSaveExample} />
        {/* new Beamline control System routes start*/}
          <Route path="/BeamlineControlSystem" component={BeamlineControlSystem} />
          <Route path="/AdvancedSettingsSinglePS" component={AdvancedSettingsSinglePS} />
        {/* new Beamline control System routes end*/}


      </Switch>

    </BrowserRouter>
  )
}
export default Routes;