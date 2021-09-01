// Empty (default) callback function.
const empty = () => null;

// Default error handler which handles 401's and logs the error.
const handleError = (err, callback = empty) => {
  if (err?.status === 401) {
    window.location.replace(window.location.origin + '/auth');
    return;
  }

  // Log the error for devs, as only a generic error message is displayed on the UI.
  console.error(err);

  return callback(err);
}

// Class for interacting with the API via HTTP calls.
class API {
  constructor(origin) {
    if (origin.endsWith('/')) {
      origin = origin.slice(0, -1);
    }

    this.origin = origin;
  }

  // Builds an API URL given an endpoint/path.
  url = endpoint => {
    const separator = endpoint.startsWith('/') ? '' : '/';

    return this.origin + separator + endpoint;
  }

  // Send a HTTP request to the API and handle the response via callbacks.
  // The return value from the success/error callback is returned here also.
  getResponse = async (url, request, success, error) => {
    try {
      try {
        const resp = await fetch(url, request);

        return (
          resp.ok
            ? resp.json()
                .then(json => success(json, resp))
                .catch(_err => success({}, resp))
            : handleError(resp, error)
        );
      } catch (err1) {
        return handleError(err1, error);
      }
    } catch (err2) {
      return handleError(err2, error);
    }
  }

  // Fetch from the API. This method is the only way you should interact with the API.
  fetch = (endpoint, fetchOpts, success = empty, error = empty) => {
    const url = this.url(endpoint);
    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
      ...fetchOpts,
    }
    const isGetOrHeadRequest = ['GET', 'HEAD'].find(m => m === request.method);

    // HEAD/GET requests can't contain a request body.
    if (!isGetOrHeadRequest && typeof fetchOpts?.body === 'object') {
      request.body = JSON.stringify(fetchOpts.body);
    }

    return this.getResponse(url, request, success, error);
  }
}

const initApi = () => {
  const { REACT_APP_API_URL } = process.env;

  if (!REACT_APP_API_URL) {
    throw new Error('Environment variable REACT_APP_API_URL is missing');
  }

  return new API(REACT_APP_API_URL);
}

export default initApi();
