import React from 'react';


import { Route, BrowserRouter, Switch } from 'react-router-dom'
// demos
import EpicsDemos from './components/Examples/EpicsDemos';
import MobileDemo1 from './components/Examples/Mobile/MobileDemo1';
import MobileDemo2 from './components/Examples/Mobile/MobileDemo2';
import BeamlineControlSystem from './components/ControlScreens/BeamlineControlSystem';
import TableControlSystem from './components/ControlScreens/TableControlSystem';
import Test3D from './components/Experimental/Test3D';
import AlarmHandlerDemo from './components/Examples/AlarmHandlerDemo';
import LoadSaveExample from './components/ExperimentalExamples/LoadSaveExample';
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
import LogIn from './LogIn';
import Probe from './components/SettingsPages/Probe';
import Vault from './components/AlarmHandler/Vault';
import Help from './components/docs/Help';
const Routes = (props) => {
  return (
    <BrowserRouter >

      <Switch>
        {/*system start*/}
        <Route exact path="/" component={MainDashboard} />
        <Route exact path="/MainDashboard" component={MainDashboard} />

        {process.env.REACT_APP_EnableLogin === 'true' &&
          <Route exact path="/LogIn" component={LogIn} />
        }

        <Route path="/Probe" component={Probe} />
        <Route path="/Help" component={Help} />
        {/*system end*/}

        {/*demos start*/}
        <Route path="/MobileDemo1" component={MobileDemo1} />
        <Route path="/MobileDemo2" component={MobileDemo2} />
        <Route path="/EpicsDemos" component={EpicsDemos} />
        <Route path="/Test3D" component={Test3D} />
        <Route path="/AlarmHandlerDemo" component={AlarmHandlerDemo} />
        <Route path="/VaultDemo" component={Vault} />
        <Route path="/LoadSaveExample" component={LoadSaveExample} />
        {/* new Beamline and table control System routes start*/}
        <Route path="/BeamlineControlSystem" component={BeamlineControlSystem} />
        <Route path="/AdvancedSettingsSinglePS" component={AdvancedSettingsSinglePS} />
        <Route path="/TableControlSystem" component={TableControlSystem} />
        <Route path="/SettingsSinglePS" component={SettingsSinglePS} />
        <Route path="/SettingsSteererXY" component={SettingsSteererXY} />
        {/* new Beamline and table control System routes end*/}

        {/*demos end*/}

        {/*staging start*/}
        <Route path="/Staging" component={Staging} />
        <Route path="/Example" component={Example} />
        <Route path="/Example1" component={Example1} />
        <Route path="/Example2" component={Example2} />
        <Route path="/Example3" component={Example3} />
        {/*staging end*/}


        

      </Switch>

    </BrowserRouter>
  )
}
export default Routes;