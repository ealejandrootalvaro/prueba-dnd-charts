import React from "react";
import { Provider } from "react-redux";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Columns from "./components/Columns";
import Charts from "./components/Charts";

import {rawData} from "./components/Charts/raw-data";

import columnData from './components/Columns/data';

import store from "./store";

import "./App.css";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <nav className="navbar navbar-expand-sm bg-light">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Columnas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/graficos">Graficos</Link>
              </li>
            </ul>
        </nav>
        <div className="container-fluid">
          <Switch>
            <Route path="/graficos">
              <Charts rawData={rawData} />
            </Route>
            <Route to="/">
              <Columns initialColumns={columnData} />
            </Route>
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
