import React from 'react';
import ReactDOM from 'react-dom';

import { Route, BrowserRouter, Switch } from 'react-router-dom'
import App from './App';
//import * as serviceWorker from './serviceWorker';
import EpicsDemos from './components/Examples/EpicsDemos';
import Help from './components/docs/Help';
import MobileDemo2 from './components/Examples/Mobile/MobileDemo2';
import MobileDemo1 from './components/Examples/Mobile/MobileDemo1';
import ControlTest1 from './components/ControlScreens/ControlTest1';
import Main from './Main';
import ControlTestHarp1 from './components/ControlScreens/ControlTestHarp1';
import ControlTestTable from './components/ControlScreens/ControlTestTable';
import IvanControlTable from './components/ControlScreens/IvanControlTable';
import ComponentsWithMultiplePVs from './components/Examples/ComponentsWithMultiplePVs';

import Staging from './components/staging/Staging';
import Example from './components/staging/Example/Example';
import Example1 from './components/staging/Example/Example1';
import Example2 from './components/staging/Example/Example2';
import Example3 from './components/staging/Example/Example3';

import ControlTest3D from './components/ControlScreens/ControlTest3D';

// import Justin from './components/iThembaLABS/Justin/Justin';
// import JustinTest1 from './components/iThembaLABS/Justin/JustinTest1';
// import JustinTest2 from './components/iThembaLABS/Justin/JustinTest2';
// import JustinTest3 from './components/iThembaLABS/Justin/JustinTest3';
// import William from './components/iThembaLABS/William/William';
// import William1 from './components/iThembaLABS/William/William1';
// import William2 from './components/iThembaLABS/William/William2';
// import William3 from './components/iThembaLABS/William/William3';
// import Cheslin from './components/iThembaLABS/Cheslin/Cheslin';
// import Cheslin1 from './components/iThembaLABS/Cheslin/Cheslin1';
// import Cheslin2 from './components/iThembaLABS/Cheslin/Cheslin2';
// import Cheslin3 from './components/iThembaLABS/Cheslin/Cheslin3';
// import Mike from './components/iThembaLABS/Mike/Mike';
// import Mike1 from './components/iThembaLABS/Mike/Mike1';
// import Mike2 from './components/iThembaLABS/Mike/Mike2';
// import Mike3 from './components/iThembaLABS/Mike/Mike3';
// import ControlTable from './components/iThembaLABS/Mike/ControlTable';
// import Amien from './components/iThembaLABS/Amien/Amien';
// import Amien1 from './components/iThembaLABS/Amien/Amien1';
// import Amien2 from './components/iThembaLABS/Amien/Amien2';
// import Amien3 from './components/iThembaLABS/Amien/Amien3';
// import AmienHarps1 from './components/iThembaLABS/Amien/AmienHarps1';
import Probe from './components/SettingsPages/Probe';
import SettingsSteererXY from './components/SettingsPages/SettingsSteererXY';
import SettingsSinglePS from './components/SettingsPages/SettingsSinglePS';
import LogIn from './LogIn';
import { Redirect } from 'react-router-dom'
export default props=>(
  <BrowserRouter >

    <Switch>

      <Route exact path="/" component={ Main } />


      {process.env.REACT_APP_EnableLogin==='true'&&
        <Route exact path="/LogIn" component={ LogIn } />
      }
      {props.limitRoutes===false&&<Route path="/SettingsSinglePS" component={SettingsSinglePS} />}
      {props.limitRoutes===false&&<Route path="/SettingsSteererXY" component={SettingsSteererXY} />}
      {props.limitRoutes===false&&<Route path="/Probe" component={Probe} />}

      {props.limitRoutes===false&&<Route path="/MobileDemo2" component={MobileDemo2} />}
        {props.limitRoutes===false&&<Route path="/MobileDemo1" component={MobileDemo1} />}
      {props.limitRoutes===false&&<Route path="/ControlTest1" component={ControlTest1} />}
      {props.limitRoutes===false&&<Route path="/ControlTestHarp1" component={ControlTestHarp1} />}
      {props.limitRoutes===false&&<Route path="/ControlTestTable" component={ControlTestTable} />}
      {props.limitRoutes===false&&<Route path="/IvanControlTable" component={IvanControlTable} />}
      {props.limitRoutes===false&&<Route path="/EpicsDemos" component={EpicsDemos} />}
      {props.limitRoutes===false&&<Route path="/Help" component={Help} />}
      {props.limitRoutes===false&&<Route path="/Staging" component={Staging} />}
    {/*  // {props.limitRoutes===false&&<Route path="/Justin" component={Justin} />}
      // {props.limitRoutes===false&&<Route path="/JustinTest1" component={JustinTest1} />}
      // {props.limitRoutes===false&&<Route path="/JustinTest2" component={JustinTest2} />}
      // {props.limitRoutes===false&&<Route path="/JustinTest3" component={JustinTest3} />}
      // {props.limitRoutes===false&&<Route path="/William" component={William} />}
      // {props.limitRoutes===false&&<Route path="/William1" component={William1} />}
      // {props.limitRoutes===false&&<Route path="/William2" component={William2} />}
      // {props.limitRoutes===false&&<Route path="/William3" component={William3} />}
      // {props.limitRoutes===false&&<Route path="/Cheslin" component={Cheslin} />}
      // {props.limitRoutes===false&&<Route path="/Cheslin1" component={Cheslin1} />}
      // {props.limitRoutes===false&&<Route path="/Cheslin2" component={Cheslin2} />}
      // {props.limitRoutes===false&&<Route path="/Cheslin3" component={Cheslin3} />}
      // {props.limitRoutes===false&&<Route path="/Mike" component={Mike} />}
      // {props.limitRoutes===false&&<Route path="/Mike1" component={Mike1} />}
      // {props.limitRoutes===false&&<Route path="/Mike2" component={Mike2} />}
      // {props.limitRoutes===false&&<Route path="/Mike3" component={Mike3} />}*/}
  {/*}    {props.limitRoutes===false&&<Route path="/ControlTable" component={ControlTable} />}
      // {props.limitRoutes===false&&<Route path="/Amien" component={Amien} />}
      // {props.limitRoutes===false&&<Route path="/Amien1" component={Amien1} />}
      // {props.limitRoutes===false&&<Route path="/Amien2" component={Amien2} />}
      // {props.limitRoutes===false&&<Route path="/Amien3" component={Amien3} />}
      // {props.limitRoutes===false&&<Route path="/AmienHarps1" component={AmienHarps1} />}*/}
      {props.limitRoutes===false&&<Route path="/ControlTest3D" component={ControlTest3D} />}
      {props.limitRoutes===false&&<Route path="/ComponentsWithMultiplePVs" component={ComponentsWithMultiplePVs} />}
      {props.limitRoutes===false&&<Route path="/Example" component={Example} />}
      {props.limitRoutes===false&&<Route path="/Example1" component={Example1} />}
      {props.limitRoutes===false&&<Route path="/Example2" component={Example2} />}
      {props.limitRoutes===false&&<Route path="/Example3" component={Example3} />}






    </Switch>

  </BrowserRouter>
)
