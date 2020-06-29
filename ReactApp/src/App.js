
import React from 'react';
import RasAppCore from './components/SystemComponents/RasAppCore';
import themes  from './components/UI/Themes/themes';
import Routes from './Routes';

const App = (props) => {
  return (
    <RasAppCore  themes={themes} defaultTheme={'Ocean'}   >
      <Routes />
    </RasAppCore>
  );
}



export default App;
