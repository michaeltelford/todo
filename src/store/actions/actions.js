import api from '../../api';
import { getState } from '../store';
import { setLoadingState, setErrorState, successState, errorState } from '.';

// We ignore the loading state to avoid interfering with getLists().
// We also ignore _state because it goes stale, getState() doesn't.
const getUser = _state => api.fetch(
  '/session',
  undefined,
  ({ session }) => (
    session
      ? {
          ...getState(),
          user: {
            email: session.email,
            name: session.name,
            picture: session.picture,
          },
        }
      : errorState()
  ),
  () => errorState(),
);

const getLists = _state => {
  setLoadingState();

  return api.fetch(
    '/lists',
    undefined,
    ({ lists }) => (
      lists
        ? successState({
            lists,
            list: null,
          })
        : errorState()
    ),
    () => errorState(),
  );
}

const getList = (_state, id) => {
  setLoadingState();

  return api.fetch(
    `/list/${id}`,
    undefined,
    ({ list }) => (
      list
        ? successState({
            lists: null,
            list,
          })
        : errorState()
    ),
    resp => (
      (resp.status === 404)
        ? successState({ list: null })
        : errorState()
    ),
  );
}

const createList = (_state, list) => {
  setLoadingState();

  return api.fetch(
    '/list',
    {
      method: 'POST',
      body: { list },
    },
    // Normally if resp.ok, we push the new list into state but a bug in the API tech stack
    // means we don't receive the created list ID; so we call getLists() again instead.
    () => getLists(),
    () => errorState(),
  );
}

const editList = (state, updatedList, stateKey) => {
  const { id, name, todos, additional_users } = updatedList;

  // For instant UI feedback, we don't wait around for the API response.
  api.fetch(
    `/list/${id}`,
    {
      method: 'PUT',
      body: {
        list: {
          name,
          todos,
          additional_users,
        },
      },
    },
    () => null,
    () => setErrorState(),
  );

  switch (stateKey) {
    case 'list':
      return successState({ list: updatedList });
    case 'lists':
      const { lists } = state;
      const index = lists.findIndex(l => l.id === id);

      lists.splice(index, 1, updatedList);
      return successState({ lists: [ ...lists ] });
    default:
      throw new Error("Missing/incorrect stateKey param, should be 'list' or 'lists'");
  }
}

const deleteList = (state, id) => {
  // For instant UI feedback, we don't wait around for the API response.
  api.fetch(
    `/list/${id}`,
    { method: 'DELETE' },
    () => null,
    () => setErrorState(),
  );

  const { lists: prevLists } = state;
  const lists = prevLists.filter(l => l.id !== id);

  return successState({ lists });
}

export {
  getUser,
  getLists,
  getList,
  createList,
  editList,
  deleteList,
}
