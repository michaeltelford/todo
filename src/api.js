class API {
  constructor(origin) {
    if (origin.endsWith('/')) {
      origin = origin.slice(0, -1);
    }
    this.origin = origin;
  }

  // Builds an API URL given an endpoint/path.
  url = (endpoint) => {
    const separator = endpoint.startsWith('/') ? '' : '/'
    return this.origin + separator + endpoint;
  }

  // Fetch from the API.
  fetch = (
    component, endpoint, fetchOpts={}, success=() => {}, error=handleError,
  ) => {
    const url = this.url(endpoint);
    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': localStorage.getItem('token'),
      },
      ...fetchOpts,
    }

    // HEAD/GET requests can't contain a request body.
    if (request.method !== 'HEAD' && request.method !== 'GET' && fetchOpts.body) {
      request.body = JSON.stringify(fetchOpts.body);
    }

    fetch(url, request)
    .then(
      (resp) => {
        if (resp.ok) success(resp);
        else error(component, resp);
      },
      err => error(component, err),
    )
    .catch(err => error(component, err));
  }
}

// Default error handler which handles 401's and logs the error. If the
// component has a 'loading' & 'errored' state, it will be set appropiately.
const handleError = (component, error) => {
  if (error?.status === 401) {
    window.location.replace(window.location.origin + '/auth');
    return;
  }
  console.error(error);

  const { loading, errored } = component.state;
  if (loading === undefined || errored === undefined) return;

  if (loading || !errored) {
    component.setState({
      loading: false,
      errored: true,
    });
  }
}

export default API;
