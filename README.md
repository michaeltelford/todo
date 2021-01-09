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

This will open a browser on [http://127.0.0.1:3000](http://127.0.0.1:3000).<br />
**Note**: Using `localhost` will not allow `auth0` to work with the API, so always use `127.0.0.1`.

The page will reload automatically on save of any code changes. You will also see any lint errors in the console.

### `npm test`

The tests are system wide and written using [Cypress](https://cypress.io).

First, you'll need to set the `CYPRESS_JWT_TOKEN` ENV var in your shell (to bypass auth). **Or** you can create a `cypress.env.json` file at the root of the repo and set token value in there:

```json
{
  "JWT_TOKEN": "Bearer xyz"
}
```

You can grab a new token by visiting the app, logging into Auth0 as todo.checklist@yahoo.com and then copying the contents of your auth `token` from the browser's `localStorage`. Each token is valid for **60 minutes**.

First start the web app with:

    $ npm start

Then run the tests with:

    $ npm test

During development of tests, open the Cypress test runner with:

    $ npm run cypress

By default, the tests will run against `127.0.0.1:3000`. Set the `CYPRESS_BASE_URL` ENV var to override this.

## Deployment

Ensure you have a `.env.production.local` file at the root of the repository with the correct ENV vars set.

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
