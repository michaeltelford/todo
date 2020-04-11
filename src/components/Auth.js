import { useEffect, useContext } from 'react';
import { AppContext } from '../context';

const clientId       = process.env.REACT_APP_AUTH0_CLIENT_ID;
const authState      = 'spagolemongrass231';
const callbackUrl    = window.location.href; // This page/component.
const unbuiltAuthUrl =
  'https://todo-checklist.auth0.com/authorize' +
  '?response_type=code&client_id=CLIENT_ID' +
  '&redirect_uri=YOUR_CALLBACK_URL&scope=SCOPE&state=STATE';

const buildAuthUrl = () => {
  return unbuiltAuthUrl
    .replace('CLIENT_ID', clientId)
    .replace('YOUR_CALLBACK_URL', callbackUrl)
    .replace('SCOPE', 'openid profile email')
    .replace('STATE', authState);
}

const handleLogin = async (apiAuthUrl, code, state) => {
  const origin = window.location.origin;

  if (authState !== state) {
    window.location.replace(origin);
    return;
  }

  // Auth against the API, verifying the auth code & start a session.
  await fetch(apiAuthUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    credentials: 'include',
    body: JSON.stringify({ authorizationCode: code }),
  }).then( // Login complete, redirect to index.
    () => window.location.replace(origin),
    error => console.error(error)
  ).catch(error => console.error(error));
}

const handleLogout = (apiAuthUrl) => {
  fetch(apiAuthUrl, {
    method: 'DELETE',
    credentials: 'include',
  }).then(() => window.location.replace(window.location.origin + '/auth'));
}

/* The Auth component does two things:
 * 1) Redirects to the 3rd party auth service.
 * 2) Provides a callback for the auth service to call (upon user login).
 *    This callback verifies the login against our API server.
 */
function Auth() {
  const { api } = useContext(AppContext);

  useEffect(() => {
    const url   = new URL(window.location);
    const code  = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (code && state) handleLogin(api('/session'), code, state);
    else window.location.replace(buildAuthUrl());
  });

  return null;
}

export { handleLogout };
export default Auth;
