# TODO Checklist

A React JS front end application allowing users to create TODO checklist's. It's a standalone UI app that interacts with an API to persist data to a database.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Usage

First in a file called `.env.development.local`, set the following ENV vars:

```sh
REACT_APP_API_URL
REACT_APP_AUTH0_APP_NAME
REACT_APP_AUTH0_CLIENT_ID
```

Then, in the project root directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://127.0.0.1:3000](http://127.0.0.1:3000) to view it in the browser.<br />
**Note**: Using `localhost` will not allow CORS requests with the API, so always use `127.0.0.1`. Unfortunately `npm start` opens `localhost` automatically, so you'll need to manually change it.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

**TODO**: Run the system tests.

## Deployment

First install the `surge` CLI tool with:

```sh
npm i -g surge
```

To deploy to surge.sh, run the following at the root of the repo:

```sh
npm run build
cd build
ln -s index.html 200.html
surge # requires login credentials
```
