import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { AppContext } from '../context';
import Auth from './Auth';
import Wrapper from './Wrapper';
import Lists from './lists/Lists';
import List from './list/List';

// Builds an API URL given an endpoint/path.
const api = endpoint => process.env.REACT_APP_API_URL + endpoint;

// Error handler for components with a 'loading' & 'errored' state.
const handleApiError = (error, component) => {
  if (error.status === 401) {
    window.location.replace(window.location.origin + '/auth');
  }

  const { loading, errored } = component.state;
  console.error(error);

  if (loading || !errored) {
    component.setState({
      loading: false,
      errored: true,
    });
  }
}

// Router provides URL path/routes. Place the most specific at the top.
function Router() {
  return (
    <AppContext.Provider value={{ api }}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/list/:id'>
            <Wrapper>
              <List handleApiError={handleApiError} />
            </Wrapper>
          </Route>
          <Route exact path='/lists'>
            <Wrapper>
              <Lists handleApiError={handleApiError} />
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
