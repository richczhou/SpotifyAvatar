import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './index.css'
import App from './App'
import Notes from "../homepage/Notes";
import Result from '../playlist-created/result';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path='/'>
          <Notes />
        </Route>
        <Route exact path='/create'>
          <App />
        </Route>
        <Route exact path='/result'>
          <Result />
        </Route>
        <Route exact path='/library'>
          <App />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
