import { useEffect } from 'react';
import api from '../api';

const appName         = process.env.REACT_APP_AUTH0_APP_NAME;
const clientId        = process.env.REACT_APP_AUTH0_CLIENT_ID;
const authState       = 'spagolemongrass231';
const callbackUrl     = window.location.href; // This page/component.
const apiAuthEndpoint = '/session';
const auth0LoginUrl   =
  'https://APP_NAME.auth0.com/authorize' +
  '?response_type=code&client_id=CLIENT_ID' +
  '&redirect_uri=CALLBACK_URL&scope=SCOPE&state=STATE';
const auth0LogoutUrl  =
  'https://APP_NAME.auth0.com/v2/logout?client_id=CLIENT_ID';

const buildLoginUrl = () => {
  return auth0LoginUrl
    .replace('APP_NAME', appName)
    .replace('CLIENT_ID', clientId)
    .replace('CALLBACK_URL', callbackUrl)
    .replace('SCOPE', 'openid profile email')
    .replace('STATE', authState);
}

const buildLogoutUrl = () => {
  return auth0LogoutUrl
    .replace('APP_NAME', appName)
    .replace('CLIENT_ID', clientId);
}

const handleLogin = (code, state) => {
  const { origin } = window.location;

  if (authState !== state) {
    console.error('The auth state did not match');
    window.location.replace(origin + '/auth');
    return;
  }

  // Auth against the API, verifying the auth code & retrieve a JWT token.
  api.fetch(apiAuthEndpoint, {
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

// Logout of auth0 and destroy the current JWT token.
const handleLogout = async () => {
  // We catch and ignore a CORS error because Auth0 doesn't set the allow-origin response header.
  await fetch(buildLogoutUrl()).catch(_err => null);

  localStorage.clear();
  window.location.replace(window.location.origin + '/auth');
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

    if (code && state) handleLogin(code, state);
    else window.location.replace(buildLoginUrl());
  });

  return null;
}

export { handleLogout, hasToken };
export default Auth;
