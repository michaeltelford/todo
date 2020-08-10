import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { AppContext } from '../context';
import API from '../api';
import Auth from './Auth';
import Wrapper from './Wrapper';
import Lists from './lists/Lists';
import List from './list/List';

const apiUrl = process.env.REACT_APP_API_URL;
if (!apiUrl) {
  console.error('Environment variables are missing');
}
const api = new API(apiUrl);

// Router provides URL path/routes. Place the most specific at the top.
function Router() {
  return (
    <AppContext.Provider value={{ api }}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/list/:id'>
            <Wrapper>
              <List />
            </Wrapper>
          </Route>
          <Route exact path='/lists'>
            <Wrapper>
              <Lists />
            </Wrapper>
          </Route>
          <Route exact path='/auth'>
            <Auth />
          </Route>
          <Route exact path='/'>
            <Redirect to='/lists' />
          </Route>
          <Route path='*'>
            <Wrapper>
              <p>Page not found. Click <a href='/'>here</a> to return to the home page.</p>
            </Wrapper>
          </Route>
        </Switch>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default Router;
