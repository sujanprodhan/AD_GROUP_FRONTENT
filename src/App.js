import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Menu from "./components/Menu";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Home from "./components/Home";
import IPList from "./components/IPList";
import AddNewIP from "./components/AddNewIP";

import "./styles.css";
class App extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className="ad-group-page">
        <Menu />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <ProtectedRoute path="/add-ip" exact component={AddNewIP} />
          <ProtectedRoute path="/ip-list" exact component={IPList} />
        </Switch>
      </div>
    );
  }
}

export default App;
