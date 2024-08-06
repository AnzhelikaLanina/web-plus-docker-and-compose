import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { UserContext } from "../../utils/context";

export const PrivateRoute = ({ children, ...rest }) => {
  const [user] = useContext(UserContext);
  const isAuth = !!user;

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};
