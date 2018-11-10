import React from "react";
import { Router, Route, Switch } from "dva/router";
import IndexPage from "./routes/IndexPage";
import LoginPage from "./routes/LoginPage";
import ExampleAPICall from "./routes/ExampleAPICall";
function RouterConfig({ history }) {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={IndexPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/api" component={ExampleAPICall} />
            </Switch>
        </Router>
    );
}

export default RouterConfig;
