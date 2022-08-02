import React from 'react';


import { Route, BrowserRouter, Switch } from 'react-router-dom'
// demos
import EpicsDemos from './components/Examples/EpicsDemos';
import MobileDemo1 from './components/Examples/Mobile/MobileDemo1';
import MobileDemo2 from './components/Examples/Mobile/MobileDemo2';
import BeamlineControlSystem from './components/ControlScreens/BeamlineControlSystem';
import TableControlSystem from './components/ControlScreens/TableControlSystem';
import Test3D from './components/Experimental/Test3D';
// import AlarmHandlerDemo from './components/Examples/AlarmHandlerDemo';
import LoadSaveExample from './components/ExperimentalExamples/LoadSaveExample';
import ArchiverDataViewerDemo from './components/ArchiverDataViewer/ArchiverDataViewerDemo';
import SettingsSteererXY from './components/SettingsPages/SettingsSteererXY';
import SettingsSinglePS from './components/SettingsPages/SettingsSinglePS';
import AdvancedSettingsSinglePS from './components/ExperimentalControlScreens/SettingsPages/AdvancedSettingsSinglePS';
//staging
import Staging from './components/staging/Staging';
import Example from './components/staging/Example/Example';
import Example1 from './components/staging/Example/Example1';
import Example2 from './components/staging/Example/Example2';
import Example3 from './components/staging/Example/Example3';
//system
import MainDashboard from './components/UI/MainDashboard';
import Login from './components/SystemComponents/Login';
import Probe from './components/SettingsPages/Probe';
import Vault from './components/AlarmHandler/Vault';
import Help from './components/docs/Help';
import Administrator from './components/Administrator/Administrator.js';
import UserProfile from './components/SystemComponents/userProfiles/UserProfile';
import ProtectedRoute from './components/SystemComponents/ProtectedRoute';
const Routes = (props) => {
  return (
    <BrowserRouter >
      <Switch>
        {/*system start*/}
        <ProtectedRoute exact path="/" component={MainDashboard} />
        <ProtectedRoute exact path="/MainDashboard" component={MainDashboard} />
        <ProtectedRoute exact path="/Administrator" component={Administrator} roles={['admin']} />
        <ProtectedRoute path="/UserProfile" component={UserProfile} />
        {process.env.REACT_APP_EnableLogin === 'true' &&
          <Route
            exact 
            path="/Login"
            component={() =>
              <Login 
               
               footerString= "Login is now customizable"
               version="V3.0.1"
               timeout={5000}
               />
            }
          />
        }

        <ProtectedRoute path="/Probe" component={Probe} />
        <ProtectedRoute path="/Help" component={Help} />
        {/*system end*/}

        {/*demos start*/}
        <ProtectedRoute path="/MobileDemo1" component={MobileDemo1} />
        <ProtectedRoute path="/MobileDemo2" component={MobileDemo2} />
        <ProtectedRoute path="/EpicsDemos" component={EpicsDemos} />
        <ProtectedRoute path="/Test3D" component={Test3D} />
        {/* <ProtectedRoute path="/AlarmHandlerDemo" component={AlarmHandlerDemo} /> */}
        <ProtectedRoute path="/ArchiverDataViewerDemo" component={ArchiverDataViewerDemo} />
        <ProtectedRoute path="/VaultDemo" component={Vault} />
        <ProtectedRoute path="/LoadSaveExample" component={LoadSaveExample} />
        {/* new Beamline and table control System routes start*/}
        <ProtectedRoute path="/BeamlineControlSystem" component={BeamlineControlSystem} />
        <ProtectedRoute path="/AdvancedSettingsSinglePS" component={AdvancedSettingsSinglePS} />
        <ProtectedRoute path="/TableControlSystem" component={TableControlSystem} />
        <ProtectedRoute path="/SettingsSinglePS" component={SettingsSinglePS} />
        <ProtectedRoute path="/SettingsSteererXY" component={SettingsSteererXY} />
        {/* new Beamline and table control System routes end*/}

        {/*demos end*/}

        {/*staging start*/}
        <ProtectedRoute path="/Staging" component={Staging} />
        <ProtectedRoute path="/Example" component={Example} />
        <ProtectedRoute path="/Example1" component={Example1} />
        <ProtectedRoute path="/Example2" component={Example2} />
        <ProtectedRoute path="/Example3" component={Example3} />
        {/*staging end*/}
      </Switch>
    </BrowserRouter>
  )
}
export default Routes;