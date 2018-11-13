import React from "react";
import { Router, Route, Switch } from "dva/router";
import IndexPage from "./routes/IndexPage";
import LoginPage from "./routes/LoginPage";
import RegistrationPage from "./routes/RegistrationPage";
import ExampleAPICall from "./routes/ExampleAPICall";
import ViewProfilePage from "./routes/ViewProfilePage";
import UpdateProfilePage from "./routes/UpdateProfilePage";
import ReportIssuePage from "./routes/ReportIssuePage";

function RouterConfig({ history }) {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={IndexPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegistrationPage} />
                <Route path="/api" component={ExampleAPICall} />
                <Route path="/profile" component={ViewProfilePage} />
                <Route path="/update" component={UpdateProfilePage} />
                <Route path="/report" component={ReportIssuePage} />
            </Switch>
        </Router>
    );
}

export default RouterConfig;
