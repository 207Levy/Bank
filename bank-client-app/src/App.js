import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const state = this.state;
    return (
      <Router>
        <div className="App">
          <div className="header">
            <ResponsiveAppBar />
          </div>
        </div>

        {/* <Route
            exact
            path="/"
            render={() => (
              <Home
                state={state}
                logIn={this.logIn}
                logOut={this.logOut}
                addNewUser={this.addNewUser}
              />
            )}
          /> */}
      </Router>
    );
  }
}
