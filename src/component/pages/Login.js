import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import AuthContext from "../../data/AuthContext"
import AuthAPI from "../../data/DataAccessService"
export default function CheckIn() {
    let history = useHistory();
    let location = useLocation();
    const authContext = React.useContext(AuthContext);

    let { from } = location.state || { from: { pathname: "/" } };
    let login = async() => {
        let result =await authContext.API.login("xxx@x.com","password")
        if(result.status==200){
            console.log(result)
            localStorage.setItem("token", result.token)
            authContext.setAuthState((prev) => {
            return {
                ...prev,
                isAuthenticated: true
            }
            })
            history.replace(from);
        }else{
            console.log (result)
        }
        
        
        
    };

    return (
        <div>
            <p>You must log in to view the page at {from.pathname}</p>
            <button onClick={login}>test Log in with preset account</button>
        </div>
    );
}