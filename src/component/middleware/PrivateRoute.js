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
    React.useEffect(()=>{
      console.log("checking token in localStorage")
        if(localStorage.getItem("token")){
        console.log("found token in localStorage")
        authContext.setAuthState((prev)=>{
          return {...prev, token:localStorage.getItem("token"),isAuthenticated:true}
        })
      }
    },[])
    return (
      <Route
        {...rest}
        render={({ location }) =>
        authContext.authState.isAuthenticated||localStorage.getItem("token") ? (
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