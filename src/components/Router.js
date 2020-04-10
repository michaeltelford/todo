import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Auth } from './Auth';
import Wrapper from './Wrapper';
import Lists from './lists/Lists';
import List from './list/List';

// TODO: Move API_URL into config.
const API_URL = 'http://127.0.0.1:8080';

// Builds an API URL given an endpoint/path.
const api = endpoint => API_URL + endpoint;

// Error handler for components with a 'loading' & 'errored' state.
const handleApiError = (error, container) => {
  if (error.status === 401) {
    window.location.replace(window.location.origin + '/auth');
  }
  console.error(error);

  const { loading, errored } = container.state;

  if (loading || !errored) {
    container.setState({
      loading: false,
      errored: true,
    });
  }
}

// Router provides URL path/routes. Place the most specific at the top.
function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/list/:id'>
          <Wrapper api={api}>
            <List api={api} handleApiError={handleApiError} />
          </Wrapper>
        </Route>
        <Route exact path='/lists'>
          <Wrapper api={api}>
            <Lists api={api} handleApiError={handleApiError} />
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
