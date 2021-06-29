import { useEffect } from 'react';
import api from '../api';

const appName         = process.env.REACT_APP_AUTH0_APP_NAME;
const clientId        = process.env.REACT_APP_AUTH0_CLIENT_ID;
const authState       = 'spagolemongrass231';

const callbackUrl     = window.location.href; // This page/component.
const apiAuthEndpoint = '/session';
const auth0LogoutUrl  = `https://${appName}.auth0.com/v2/logout`;
const auth0LoginUrl   =
  `https://${appName}.auth0.com/authorize` +
  '?response_type=code&client_id=CLIENT_ID' +
  '&redirect_uri=YOUR_CALLBACK_URL&scope=SCOPE&state=STATE';

const buildAuthUrl = () => {
  return auth0LoginUrl
    .replace('CLIENT_ID', clientId)
    .replace('YOUR_CALLBACK_URL', callbackUrl)
    .replace('SCOPE', 'openid profile email')
    .replace('STATE', authState);
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
      body: { authorizationCode: code },
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
  // We catch a rogue network error despite a 200 OK from auth0.
  await fetch(auth0LogoutUrl, { credentials: 'include' }).catch(() => null);

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
    else window.location.replace(buildAuthUrl());
  });

  return null;
}

export { handleLogout, hasToken };
export default Auth;
