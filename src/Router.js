import React from 'react';
import List from './List';
import Auth from './Auth';

class Router extends React.Component {
  constructor(props) {
    super(props);

    this.scheme = 'http';
    this.base = this.scheme + '://' + window.location.host;
    this.path = window.location.pathname;
  }

  // Checks with the API if this user is auth'd or not. Returns a boolean.
  isLoggedIn = () => {
    return false;
  }

  // Redirect to the new url, which must start with a slash ('/').
  redirectTo = (newUrl) => {
    const url = this.base + newUrl;
    window.location.replace(url);
  }

  render() {
    switch(this.path) {
      case '':
      case '/':
        this.redirectTo('/list');
        return;
      case '/list':
        if (!this.isLoggedIn()) {
          this.redirectTo('/auth');
          return;
        } else {
          return <List />;
        }
      case '/auth':
        return <Auth />
      default:
        return <p>Page not found. Click <a href="/">here</a> to return to the home page.</p>;
    }
  }
}

export default Router;
