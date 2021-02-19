import React, { useContext } from 'react';
import AutomationStudioContext from './AutomationStudioContext';
import BusyLoggingIn from './BusyLoggingIn';
import { Route, Redirect } from 'react-router-dom'
const ProtectedRoute=(props)=>{
    const Component=props.component;
    const context = useContext(AutomationStudioContext);
    const loggingIn=context.userData.loggingIn;
    let loggedIn = context.userData.loggedIn || process.env.REACT_APP_EnableLogin !== 'true';
    return(
        <Route  path={props.path}  >

          {     
          ({ location }) => (
          loggedIn?<Component location={location}/>:(loggingIn?<BusyLoggingIn/>:<Redirect to="/logIn" />)
          )
          }
        </Route>
    )
}
export default ProtectedRoute;