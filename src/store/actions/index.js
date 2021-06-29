/*
 * Import and use your actions below. Each action is a function that takes the current
 * state and sets/returns a new state. Actions must change the state immutably to avoid bugs!
 *
 * The first parameter will always be 'state' (passed from redux-zero), but you can add your
 * own parameters in after it and pass them when calling the action e.g.
 *
 * increment: (state, i = 1) => ({ count: state.count + i }),
 * increment(5); // Calling the action from your component...
 *
 * Async actions are the same as sync one's. Just set/return the new state object from the
 * Promise's 'then()' block. You can call 'setState()' to set a loading state etc.
 *
 * Think about performance, needless renders should be prevented and re-rendering should occur
 * ASAP for UI feedback e.g. update the store (and re-render) first, *then* sync the API. You
 * should only call the API first if you're waiting on its resp to update the store with e.g.
 * getLists() sets the API resp directly into the store.
 */

import { TOLERABLE_DELAY } from '../../constants';
import { getState, setState } from '../store';
import {
  getLists,
  createList,
  editList,
  deleteList,
} from './actions';

const actions = _store => ({
  getLists,
  createList,
  editList,
  deleteList,
});

const loadingState = (prevState, newState) => ({
  ...prevState,
  loading: true,
  loadingText: null,
  errored: false,
  ...newState,
});

const successState = (prevState, newState) => ({
  ...prevState,
  loading: false,
  loadingText: null,
  errored: false,
  ...newState,
});

const errorState = (prevState, newState) => ({
  ...prevState,
  loading: false,
  loadingText: null,
  errored: true,
  ...newState,
});

const setLoadingState = state => {
  // Set loadingText for long lived API responses.
  setTimeout(() => {
    const prevState = getState();

    if (prevState?.loading) {
      setState({
        ...prevState,
        loadingText: 'Loading...',
      });
    }
  }, TOLERABLE_DELAY);

  setState(loadingState(getState(), state));
}

const setSuccessState = state => setState(successState(getState(), state));

const setErrorState = state => setState(errorState(getState(), state));

export {
  loadingState,
  successState,
  errorState,
  setLoadingState,
  setSuccessState,
  setErrorState,
}
export default actions;
