import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import List from './List';
import Auth from './Auth';

// TODO: Move API_URL into config.
const API_URL = 'http://127.0.0.1:8080';

const api = (endpoint) => API_URL + endpoint;

// Checks with API if this user is auth'd or not. Returns a Promise<Response>.
const getSession = () => {
  return fetch(api('/session'), { credentials: "include" });
}

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/list">
          <List api={api} getSession={getSession} />
        </Route>
        <Route exact path="/auth">
          <Auth api={api} />
        </Route>
        <Route exact path="/">
          <Redirect to="/list" />
        </Route>
        <Route path="*" render={() => (
          <p>Page not found. Click <a href="/">here</a> to return to the home page.</p>
        )} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
