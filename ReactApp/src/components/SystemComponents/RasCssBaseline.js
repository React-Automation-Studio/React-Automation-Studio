import React from 'react';
import withStyles from '@mui/styles/withStyles';


const styles = theme => ({
  '@global':{
    '::-webkit-scrollbar': {
      width: '0.2em',
      height: '0.2em',
     
    },
    '::-webkit-scrollbar-track': {
      boxShadow: theme.palette.mode==='light'?'inset 0 0 6px rgba(0,0,0,0.075)':'inset 0 0 6px rgba(255,255,255,0.075)',
      webkitBoxShadow: theme.palette.mode==='light'?'inset 0 0 6px rgba(0,0,0,0.075)':'inset 0 0 6px rgba(255,255,255,0.075)'
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.mode==='light'?'rgba(0,0,0,.15)':'rgba(255,255,255,.1)',
      outline: '1px solid slategrey'
    }
  }
});

/**
 * This component injects CSS baseline for the React-Vis graph librbary.
 * The React-Vis scss styles were convereted using https://github.com/olavim/sass2jss
 * The styles are valid for react-vis 1.11.6
 * @param {*} props 
 */
const RasCssBaseline=(props)=> {
  /* eslint-disable no-unused-vars */
  const { children = null} = props;
  /* eslint-enable no-unused-vars */
  return <React.Fragment>{children}</React.Fragment>;
}

export default withStyles(styles,{withTheme:true})(RasCssBaseline)
