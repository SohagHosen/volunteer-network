import { Route, Redirect } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function PrivateRoute({ children, ...rest }) {
  let { user, loading } = useAuth();
  if (loading) {
    return null;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
export default PrivateRoute;
