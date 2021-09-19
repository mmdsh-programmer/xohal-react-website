import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "./../helpers/Auth";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const userDetails = useAuthState();
  console.log();
  return (
    <Route
      {...rest}
      render={(props) =>
        Boolean(userDetails.token) &&
        JSON.parse(localStorage.getItem("currentUser")).token ===
          userDetails.token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};
