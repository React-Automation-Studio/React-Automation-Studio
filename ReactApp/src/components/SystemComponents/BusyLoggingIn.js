import React from 'react';


import CircularProgress from '@material-ui/core/CircularProgress';


const BusyLoggingIn = (props) => {
    return (
        <div style={{ textAlign: 'center', paddingTop: '50vh' }}><CircularProgress /></div>
    )
}

export default BusyLoggingIn;
