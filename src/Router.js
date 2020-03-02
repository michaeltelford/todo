import React from 'react';
import App from './App';

class Router extends React.Component {
  constructor(props) {
    super(props);

    this.scheme = 'http';
    this.base = this.scheme + '://' + window.location.host;
    this.path = window.location.pathname;
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
          return <App />;
        }
      case '/auth':
        document.cookie = "loggedIn=true; expires=Tue, 03 March 2020 12:00:00 UTC; path=/";
        return <p>You're now authenticated. Click <a href="/">here</a> to return to the home page.</p>;
      default:
        return <p>Page not found. Click <a href="/">here</a> to return to the home page.</p>;
    }
  }

  // Checks with the API if this user is auth'd or not. Returns a boolean.
  isLoggedIn() {
    return document.cookie.includes('loggedIn=true');
  }

  // Redirect to the new url, which must start with a slash ('/').
  redirectTo(newUrl) {
    const url = this.base + newUrl;
    window.location.replace(url);
  }
}

export default Router;
