/* eslint-disable import/no-named-as-default */
import { Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import List from "./ProjectList";
import Search from "./ProjectSearch";
import Page from "./ProjectPage.js";
import Create from "./ProjectCreate.js";
import Notes from "./Notes.js";
import Queries from "./Queries.js";
import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";


// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/list" component={List} />
                    <Route exact path="/search" component={Search} />
                    <Route exact path="/page" component={Page} />
                    <Route exact path="/notes" component={Notes} />
                    <Route exact path="/queries" component={Queries} />
                    <Route exact path="/create" component={Create} />
                    <Route component={NotFoundPage} />
                    
                </Switch>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.element
};

export default hot(module)(App);
