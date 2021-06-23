import createStore from 'redux-zero';
import { applyMiddleware } from 'redux-zero/middleware';
import { connect as devTools } from 'redux-zero/devtools';
import initialState from './initialState';

const { NODE_ENV } = process.env;
const devMode = NODE_ENV === 'development';
const middlewares = (devMode && devTools) ? applyMiddleware(devTools(initialState)) : [];
const store = createStore(initialState, middlewares);

export default store;
