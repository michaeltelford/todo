import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from "redux-zero/react";
import store from '../store/store';
import ErrorBoundary from './ErrorBoundary';
import Auth from './Auth';
import Wrapper from './Wrapper';
import Lists from './lists/Lists';
import List from './list/List';

// Router provides URL path/routes. Place the most specific at the top.
function Router() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </Provider>
  );
}

export default Router;
