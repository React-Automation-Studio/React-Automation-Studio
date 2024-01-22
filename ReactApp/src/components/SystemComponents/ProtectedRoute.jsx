import React, { useContext } from "react";
import AutomationStudioContext from "./AutomationStudioContext";
import BusyLoggingIn from "./BusyLoggingIn";
import Forbidden from "./Forbidden";
import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const location = useLocation();
  const Component = props.component;
  const context = useContext(AutomationStudioContext);
  const loggingIn = context.userData.loggingIn;
  const loggedIn =
    context.userData.loggedIn || import.meta.env.VITE_EnableLogin !== "true";
  const userRoles = context.userData.roles;
  const { roles } = props;
  let forbidden;

  if (roles) {
    if (roles.length > 0) {
      let found = userRoles.some((r) => roles.includes(r));
      forbidden = !found;
    } else {
      forbidden = false;
    }
  } else {
    forbidden = false;
  }

  return loggedIn ? (
    forbidden ? (
      <Forbidden />
    ) : (
      props.children
    )
  ) : loggingIn ? (
    <BusyLoggingIn />
  ) : (
    <Navigate
      to={{
        pathname: "/login",
        state: { from: location },
      }}
    />
  );
};

export default ProtectedRoute;
