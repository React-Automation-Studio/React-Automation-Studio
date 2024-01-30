import React from "react";
import RasAppCore from "./components/SystemComponents/RasAppCore";
import themes from "./components/UI/Themes/themes";
import AppRoutes from "./AppRoutes";
const App = (props) => {
  return (
    <RasAppCore themes={themes} defaultTheme={"Navy"}>
      <AppRoutes />
    </RasAppCore>
  );
};

export default App;
