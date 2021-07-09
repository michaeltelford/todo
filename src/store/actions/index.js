import { TOLERABLE_DELAY } from '../../constants';
import { getState, setState } from '../store';
import {
  getUser,
  getLists,
  createList,
  editList,
  deleteList,
} from './actions';

const actions = _store => ({
  getUser,
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
