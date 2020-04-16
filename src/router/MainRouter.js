import React from 'react';
import AdminRouter from './AdminRouter'
import CheckInPage from "../component/pages/CheckIn"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
    
} from "react-router-dom";
function MainRouter() {
    return (
        <Router>
            <div >
                <Switch>
                    <Route exact path="/">
                        <CheckInPage />
                    </Route>
                    <Route path="/admin">
                        <AdminRouter />
                    </Route>
                    <Route path="*" render={() => <Redirect to path="/"/>}/>

                </Switch>
            </div>
        </Router>
    );
}

export default MainRouter;