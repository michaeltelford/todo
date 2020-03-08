import React from 'react';

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.clientId = 'KzfccwIo2mpN9Z0BCHiqEk6fc6SbD94A';
    this.authState = 'spagolemongrass231';
    this.callbackUrl = 'http://localhost:3000/auth';
    this.unbuiltAuthUrl = 'https://todo-checklist.auth0.com/authorize' +
      '?response_type=code&client_id=CLIENT_ID' +
      '&redirect_uri=YOUR_CALLBACK_URL&scope=SCOPE&state=STATE';
  }

  componentDidMount() {
    const url = new URL(window.location);
    const code = url.searchParams.get('code');
    const authState = url.searchParams.get('state');

    if (code && authState) { // Process successful login.
      this.handleLogin(code, authState);
    } else { // Redirect to login page.
      const builtAuthUrl = this.buildAuthUrl();
      window.location.replace(builtAuthUrl);
    }
  }

  handleLogin = (code, authState) => {
    const base = window.location.protocol + '//' + window.location.host;

    if (authState !== this.authState) {
      window.location.replace(base);
      return;
    }

    // Auth against the API.
    //TODO.

    // Login complete, redirect to index.
    //window.location.replace(base);
  }

  buildAuthUrl = () => {
    return this.unbuiltAuthUrl
      .replace('CLIENT_ID', this.clientId)
      .replace('YOUR_CALLBACK_URL', this.callbackUrl)
      .replace('SCOPE', 'openid profile email')
      .replace('STATE', this.authState);
  }

  render() {
    return null;
  }
}

export default Auth;
