import React from 'react';
import List from './List';
import Auth from './Auth';

// TODO: Move API_URL into config.
const API_URL = 'http://127.0.0.1:8080';

class Router extends React.Component {
  constructor(props) {
    super(props);

    this.origin = window.location.origin;
    this.path = window.location.pathname;
  }

  api = (endpoint) => API_URL + endpoint;

  // Redirect to the new url, which must start with a slash ('/').
  redirectTo = (newUrl) => {
    const url = this.origin + newUrl;
    window.location.replace(url);
  }

  // Checks with API if this user is auth'd or not. Returns a Promise<Boolean>.
  isLoggedIn = async () => {
    let loggedIn = false;

    await fetch(this.api('/session'), {
      credentials: "include",
    }).then((resp) => {
        loggedIn = resp.ok;
      }, (error) => {
        console.error(error);
      }
    ).catch((error) => {
      console.error(error);
    });

    return loggedIn;
  }

  render() {
    switch(this.path) {
      case '':
      case '/':
        return this.redirectTo('/list');
      case '/list':
        this.isLoggedIn().then((loggedIn) => {
          return loggedIn ? <List api={this.api} /> : this.redirectTo('/auth');
        });
        return null;
      case '/auth':
        return <Auth api={this.api} />
      default:
        return <p>Page not found. Click <a href="/">here</a> to return to the home page.</p>;
    }
  }
}

export default Router;
