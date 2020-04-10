import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Auth } from './Auth';
import Wrapper from './Wrapper';
import Lists from './Lists';
import List from './List';

// TODO: Move API_URL into config.
const API_URL = 'http://127.0.0.1:8080';

const api = endpoint => API_URL + endpoint;

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/list/:id'>
          <Wrapper api={api}>
            <List api={api} />
          </Wrapper>
        </Route>
        <Route exact path='/lists'>
          <Wrapper api={api}>
            <Lists api={api} />
          </Wrapper>
        </Route>
        <Route exact path='/auth'>
          <Auth api={api} />
        </Route>
        <Route exact path='/'>
          <Redirect to='/lists' />
        </Route>
        <Route path='*'>
          <Wrapper api={api}>
            <p>Page not found. Click <a href='/'>here</a> to return to the home page.</p>
          </Wrapper>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
