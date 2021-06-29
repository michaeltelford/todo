/*
 * Write and export your actions below. Each action is a function that takes the current
 * state and returns a new state. Actions must change the state immutably to avoid bugs!
 *
 * The first parameter will always be 'state' (passed from redux-zero), but you can add your
 * own parameters in after it and pass them when calling the action e.g.
 *
 * increment: (state, i = 1) => ({ count: state.count + i }),
 * increment(5); // Calling the action in your component...
 *
 * Async actions are the same as sync one's. Just return the new state object from the
 * Promise's 'then()' block. You can call 'store.setState()' to set a loading state etc.
 */

import { TOLERABLE_DELAY } from '../../constants';
import { getState, setState } from '../store';
import {
  getLists,
  createList,
  editList,
  deleteList,
} from './actions';

const setLoadingState = (state) => {
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

  setState({
    ...state,
    loading: true,
    loadingText: null,
    errored: false,
  });
}

const successState = (prevState, newState) => ({
  ...prevState,
  loading: false,
  loadingText: null,
  errored: false,
  ...newState,
});

const errorState = (prevState, newState) => successState(prevState, {
  errored: true,
  ...newState,
});

const actions = _store => ({
  getLists,
  createList,
  editList,
  deleteList,
});

export {
  setLoadingState,
  successState,
  errorState,
}
export default actions;
