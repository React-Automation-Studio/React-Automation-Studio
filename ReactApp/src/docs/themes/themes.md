React-Automation-Studio provides several themes.

It uses createMuiTheme from https://material-ui.com/customization/theming/ to create the  themes.

The object that is passed to the create the themes is an extended version of the palette they recommend. We have added in extra definitions for the React-Vis graph library and other situations.

The definitions are located in ReactApp/src/components/UI/Themes.

The themes.js exports an  object of the themes, with keys corresponding to theme name.

The theme objects are all defined in separate files and are based on the defaultTheme.js.

The RasAppCore accepts the object exported from themes.js and a prop call defaultTheme. You can change this prop to any of the current supported theme-key names.

The themes can be changed by the user using the more vertical options icon in the top right of the traditional layout.

The currently selected theme is provided to all the components as a context variable

Follow any methods at https://material-ui.com/customization/theming/ to access the the theme object.

To create a custom theme we recommend copying  one of the themes defined in the ReactApp/src/components/UI/Themes folder. and placing it in src for and call it customTheme.js for example.
Import it into the App.js as follows to extend the themes:

```js static
import React from 'react';
import RasAppCore from './components/SystemComponents/RasAppCore';
import themes  from './components/UI/Themes/themes';
import customTheme  from './customThemes';
import Routes from './Routes';

const App = (props) => {
  return (
    <RasAppCore  themes={...themes,"new theme name":customTheme} defaultTheme={'Ocean'}   >
      <Routes />
    </RasAppCore>
  );
}
export default App;

```

Or in the event you want to use your theme only, then:

```js static
import React from 'react';
import RasAppCore from './components/SystemComponents/RasAppCore';
import themes  from './components/UI/Themes/themes';
import customTheme  from './customThemes';
import Routes from './Routes';

const App = (props) => {
  return (
    <RasAppCore  themes={"new theme name":customTheme} defaultTheme={"new theme name"}   >
      <Routes />
    </RasAppCore>
  );
}
export default App;



