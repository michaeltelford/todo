import { useEffect } from 'react';
import api from '../api';

const { origin, href: callbackUrl } = window.location;
const appName                       = process.env.REACT_APP_AUTH0_APP_NAME;
const clientId                      = process.env.REACT_APP_AUTH0_CLIENT_ID;
const authState                     = 'spagolemongrass231';

const auth0LoginUrl  =
  'https://APP_NAME.auth0.com/authorize' +
  '?response_type=code&client_id=CLIENT_ID' +
  '&redirect_uri=CALLBACK_URL&scope=SCOPE&state=STATE';
const auth0LogoutUrl =
  'https://APP_NAME.auth0.com/v2/logout' +
  '?client_id=CLIENT_ID&returnTo=CALLBACK_URL';

const buildLoginUrl = () => {
  return auth0LoginUrl
    .replace('APP_NAME', appName)
    .replace('CLIENT_ID', clientId)
    .replace('CALLBACK_URL', callbackUrl)
    .replace('SCOPE', 'openid profile email')
    .replace('STATE', authState);
}

const buildLogoutUrl = () => {
  const authUrl = `${window.location.origin}/auth`;

  return auth0LogoutUrl
    .replace('APP_NAME', appName)
    .replace('CLIENT_ID', clientId)
    .replace('CALLBACK_URL', authUrl);
}

const handleLogin = (code, state) => {
  if (authState !== state) {
    console.error('The auth state did not match');
    window.location.replace(origin + '/auth');
    return;
  }

  // Auth against the API, verifying the auth code & retrieve a JWT token.
  api.fetch('/session', {
      method: 'POST',
      body: { authorization_code: code },
    },
    json => {
      const token = `Bearer ${json?.session?.token}`;
      localStorage.setItem('token', token);
      window.location.replace(origin + '/lists');
    },
  );
}

// Destroy the current JWT token and logout of auth0.
const handleLogout = async () => {
  localStorage.clear();
  window.location.replace(buildLogoutUrl());
}

const hasToken = () => (localStorage.getItem('token') !== null);

/* The Auth component does two things:
 * 1) Redirects to the 3rd party auth service.
 * 2) Provides a callback for the auth service to call (upon successful user login).
 *    This callback then verifies the login against our API server.
 */
function Auth() {
  useEffect(() => {
    const url   = new URL(window.location);
    const code  = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    (code && state)
      ? handleLogin(code, state)
      : window.location.replace(buildLoginUrl());
  }, []);

  return null;
}

export { handleLogout, hasToken };
export default Auth;
