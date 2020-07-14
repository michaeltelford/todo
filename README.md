# TODO Checklist

A React JS front end application allowing users to create TODO checklist's. This repo is a standalone UI app that interacts with an [API](https://github.com/michaeltelford/todo_api) to persist data to a database.

The actual application can be used by visiting:

https://todo-checklist.surge.sh

TODO: Add screenshot.

Auth is handled by Auth0. You can login using your Github or Google account. Or you can sign up for an Auth0 account. You are limited to 5 lists (with unlimited TODO's) per account.

## Local Usage

### ENV

First in a file called `.env.development.local`, set the following ENV vars:

```sh
REACT_APP_API_URL
REACT_APP_AUTH0_APP_NAME
REACT_APP_AUTH0_CLIENT_ID
```

### `npm install`

Install the dependencies with:

    $ npm i

### `npm start`

Run the app in development mode with:

    $ npm start

This will open a browser on [http://127.0.0.1:3000](http://127.0.0.1:3000).<br />
**Note**: Using `localhost` will not allow `auth0` to work with the API, so always use `127.0.0.1`.

The page will reload automatically on save of any code changes. You will also see any lint errors in the console.

### `npm test`

The system is tested using Cypress. Run the e2e tests with:

    $ npm test

During development of tests, open Cypress with:

    $ npm run cypress

These will run the tests against localhost. Set the `CYPRESS_BASE_URL` ENV var to override this.

## Deployment

First install the `surge` CLI tool with:

```sh
npm i -g surge
```

To deploy to surge.sh, run the following at the root of the repo:

```sh
./deploy.sh
```

## Credits

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
