import React from 'react';
import AdminRouter from './AdminRouter'
import Terminal from "../component/pages/Terminal"
import LoginPage from '../component/pages/Login';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

function MainRouter() {
    return (
        <Router>
            <div >
                <Switch>
                    <Route exact path="/">
                        <Terminal  />
                    </Route>
                    <Route path={`/login`}>
                        <LoginPage />
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