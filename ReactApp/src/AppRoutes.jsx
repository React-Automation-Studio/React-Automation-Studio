import React from "react";

import { Route, BrowserRouter, Routes } from "react-router-dom";
// demos
import EpicsDemos from "./components/Examples/EpicsDemos";
import MobileDemo1 from "./components/Examples/Mobile/MobileDemo1";
import EditableMobileDemo1 from "./components/ExperimentalExamples/Mobile/EditableMobileDemo1";
import MobileDemo2 from "./components/Examples/Mobile/MobileDemo2";
import BeamlineControlSystem from "./components/ControlScreens/BeamlineControlSystem";
import TableControlSystem from "./components/ControlScreens/TableControlSystem";
import Test3D from "./components/Experimental/Test3D";
import AlarmHandlerDemo from "./components/Examples/AlarmHandlerDemo";
import LoadSaveExample from "./components/ExperimentalExamples/LoadSaveExample";
import ArchiverDataViewerDemo from "./components/ArchiverDataViewer/ArchiverDataViewerDemo";
import SettingsSteererXY from "./components/SettingsPages/SettingsSteererXY";
import SettingsSinglePS from "./components/SettingsPages/SettingsSinglePS";
import AdvancedSettingsSinglePS from "./components/ExperimentalControlScreens/SettingsPages/AdvancedSettingsSinglePS";
import AreaDetectorSimExample from "./components/Examples/AreaDetectorSimExample";
//staging
import Staging from "./components/staging/Staging";
import Example from "./components/staging/Example/Example";
import Example1 from "./components/staging/Example/Example1";
import Example2 from "./components/staging/Example/Example2";
import Example3 from "./components/staging/Example/Example3";
//system
import MainDashboard from "./components/UI/MainDashboard";
import Login from "./components/SystemComponents/Login";
import Probe from "./components/SettingsPages/Probe";
import Vault from "./components/AlarmHandler/Vault";
import Help from "./components/docs/Help";
import Administrator from "./components/Administrator/Administrator";
import UserProfile from "./components/SystemComponents/userProfiles/UserProfile";
import ProtectedRoute from "./components/SystemComponents/ProtectedRoute";
const AppRoutes = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        {/*system start*/}
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <MainDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/MainDashboard"
          element={
            <ProtectedRoute>
              <MainDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/Administrator"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Administrator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/UserProfile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        {import.meta.env.VITE_EnableLogin === "true" && (
          <Route
            exact
            path="/Login"
            element={<Login version="V7.0.0" timeout={5000} />}
          />
        )}

        <Route
          path="/Probe"
          element={
            <ProtectedRoute>
              <Probe />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Help"
          element={
            <ProtectedRoute>
              <Help />
            </ProtectedRoute>
          }
        />
        {/*system end*/}

        {/*demos start*/}
        <Route
          path="/MobileDemo1"
          element={
            <ProtectedRoute>
              <MobileDemo1 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/EditableMobileDemo1"
          element={
            <ProtectedRoute>
              <EditableMobileDemo1 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/MobileDemo2"
          element={
            <ProtectedRoute>
              <MobileDemo2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/EpicsDemos"
          element={
            <ProtectedRoute>
              <EpicsDemos />
            </ProtectedRoute>
          }
        />
        {/* new Beamline and table control System routes start*/}
        <Route
          path="/BeamlineControlSystem"
          element={
            <ProtectedRoute>
              <BeamlineControlSystem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AdvancedSettingsSinglePS"
          element={
            <ProtectedRoute>
              <AdvancedSettingsSinglePS />
            </ProtectedRoute>
          }
        />
        <Route
          path="/TableControlSystem"
          element={
            <ProtectedRoute>
              <TableControlSystem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SettingsSinglePS"
          element={
            <ProtectedRoute>
              <SettingsSinglePS />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SettingsSteererXY"
          element={
            <ProtectedRoute>
              <SettingsSteererXY />
            </ProtectedRoute>
          }
        />
        {/* new Beamline and table control System routes end*/}

        {/*demos end*/}

        {/*staging start*/}
        <Route
          path="/Staging"
          element={
            <ProtectedRoute>
              <Staging />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Example"
          element={
            <ProtectedRoute>
              <Example />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Example1"
          element={
            <ProtectedRoute>
              <Example1 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Example2"
          element={
            <ProtectedRoute>
              <Example2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Example3"
          element={
            <ProtectedRoute>
              <Example3 />
            </ProtectedRoute>
          }
        />
        {/*staging end*/}

        <Route
          path="/Test3D"
          element={
            <ProtectedRoute>
              <Test3D />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AlarmHandlerDemo"
          element={
            <ProtectedRoute>
              <AlarmHandlerDemo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ArchiverDataViewerDemo"
          element={
            <ProtectedRoute>
              <ArchiverDataViewerDemo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/VaultDemo"
          element={
            <ProtectedRoute>
              <Vault />
            </ProtectedRoute>
          }
        />
        <Route
          path="/LoadSaveExample"
          element={
            <ProtectedRoute>
              <LoadSaveExample />
            </ProtectedRoute>
          }
        />

        {/* new Beamline and table control System routes start */}
        <Route
          path="/BeamlineControlSystem"
          element={
            <ProtectedRoute>
              <BeamlineControlSystem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AdvancedSettingsSinglePS"
          element={
            <ProtectedRoute>
              <AdvancedSettingsSinglePS />
            </ProtectedRoute>
          }
        />
        <Route
          path="/TableControlSystem"
          element={
            <ProtectedRoute>
              <TableControlSystem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SettingsSinglePS"
          element={
            <ProtectedRoute>
              <SettingsSinglePS />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SettingsSteererXY"
          element={
            <ProtectedRoute>
              <SettingsSteererXY />
            </ProtectedRoute>
          }
        />
        {/* new Beamline and table control System routes end*/}
        <Route
          path="/AreaDetectorSimExample"
          element={
            <ProtectedRoute>
              <AreaDetectorSimExample />
            </ProtectedRoute>
          }
        />
        {/*demos end*/}
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
