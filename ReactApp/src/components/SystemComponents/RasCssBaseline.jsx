import React from 'react';
import { useTheme } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';

const RasCssBaseline = (props) => {
  const { children = null } = props;
 const inputGlobalStyles=<GlobalStyles
       styles={(theme) => ({
          '::-webkit-scrollbar': {
            width: '0.2em',
            height: '0.2em',
          },
          '::-webkit-scrollbar-track': {
            boxShadow: theme.palette.mode === 'light' ? 'inset 0 0 6px rgba(0,0,0,0.075)' : 'inset 0 0 6px rgba(255,255,255,0.075)',
            webkitBoxShadow: theme.palette.mode === 'light' ? 'inset 0 0 6px rgba(0,0,0,0.075)' : 'inset 0 0 6px rgba(255,255,255,0.075)'
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,.15)' : 'rgba(255,255,255,.1)',
            outline: '1px solid slategrey'
          }
        })}
      />
  return (
    <React.Fragment>
      {inputGlobalStyles}
      {children}
    </React.Fragment>
  );
}

export default RasCssBaseline
