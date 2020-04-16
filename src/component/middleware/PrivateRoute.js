import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  useRouteMatch
} from "react-router-dom";
import AuthContext from "../../data/AuthContext"

export default function PrivateRoute({ children, ...rest }) {
    let authContext=React.useContext(AuthContext)
    let { path, url } = useRouteMatch();
    React.useEffect(() => {
      console.log("==========================here")
      // if(localStorage.getItem('token')){
      //   authContext.setAuthState({
      //     isAuthenticated:true,
      //     token:localStorage.getItem('token')
      //   })
    // }
    });
    return (
      <Route
        {...rest}
        render={({ location }) =>
        authContext.authState.isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: `login`,
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }