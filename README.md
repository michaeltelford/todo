# TODO Checklist

A React JS front end application allowing users to create TODO checklist's. This repo is a standalone UI app that interacts with an [API](https://github.com/michaeltelford/todo_api) to persist data to a database.

The actual application can be used by visiting:

https://todo-checklist.surge.sh

![iPhone 5 SE](https://github.com/michaeltelford/todo/raw/assets/assets/TODO.png)

The app is accessible on any device/viewport. Auth is handled by Auth0. You can login using your Github or Google account. Or you can sign up for an Auth0 account. You are limited to 5 lists (with unlimited TODO's) per account. Enjoy :-)

## Local Usage

### Node

The currently supported version of node is `v14.5`.

### `npm install`

Install the dependencies with:

    $ npm i

### ENV

In a file called `.env.development.local`, set the following ENV vars:

```sh
REACT_APP_API_URL
REACT_APP_AUTH0_APP_NAME
REACT_APP_AUTH0_CLIENT_ID
```

### `npm start`

Run the app in development mode with:

    $ npm start

Now browse to [http://127.0.0.1:3000](http://127.0.0.1:3000) in a web browser.<br />
**Note**: Using `localhost` will not allow `auth0` to work with the API, so always use `127.0.0.1`.

The page will reload automatically on save of any code changes. You will also see any lint errors in the console.

## Testing

### `npm test`

The tests are system wide (requiring an API) and written using [Cypress](https://cypress.io).

First, you'll need to set the `CYPRESS_JWT_TOKEN` ENV var in your shell (to bypass auth). **Or** you can create a `cypress.env.json` file at the root of the repo and set token value in there:

```json
{
  "JWT_TOKEN": "Bearer xyz"
}
```

You can grab a new token by visiting the app, logging into Auth0 and then copying the contents of your auth `token` from the browser's `localStorage`. Each token is valid for **60 minutes**.

First start the web app with:

    $ npm start

Then run the tests with:

    $ npm test

During development of tests, open the Cypress test runner with:

    $ npm run cypress

By default, the tests will run against `127.0.0.1:3000`. Set the `CYPRESS_BASE_URL` ENV var to override this.

### Manual Testing

The automated tests are great (and essential) but they can't catch everything so some manual testing is required. Manually test any features you write and then code the scenarios into the automated tests.

The following are some guidelines/scenarios to manually test with in addition to writing automated tests:

| State/Scenario       | How To Test                                                | Expected Result                 |
| -------------------- | ---------------------------------------------------------- | ------------------------------- |
| Error boundary       | `throw new Error('test error');` from a component's render | ErrorBoundary component renders |
| Error state          | API returns a 500 response                                 | Error component renders         |
| Loading state        | API sleeps for 2 seconds and then responds                 | Loading component renders       |
| Page not found state | Navigate to an invalid path e.g. `/billing`                | NotFound component renders      |
| List not found state | Navigate to an invalid list e.g. `/list/hello`             | ListNotFound component renders  |

Remember to:

- Write automated tests
- Refactor the code to make it correct, readable and efficient (in that order)
- Lint the code with `npm run lint`

## Deployment

Ensure you have a `.env.production.local` file at the root of the repository with the correct [ENV](#ENV) vars set.

Install the `surge` CLI tool with:

```sh
npm i -g surge
```

To deploy to surge.sh, run the following at the root of the repo:

```sh
./deploy.sh
```

## Credits

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
