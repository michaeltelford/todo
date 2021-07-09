import api from '../../api';
import { setLoadingState, setErrorState, successState } from '.';

const getUser = _state => {
  setLoadingState();

  return api.fetch(
    '/session',
    undefined,
    ({ session }) => (
      session
        ? successState({
            user: {
              email: session.email,
              name: session.name,
              picture: session.picture,
            },
          })
        : setErrorState()
    ),
    () => setErrorState(),
  );
}

const getLists = _state => {
  setLoadingState();

  return api.fetch(
    '/lists',
    undefined,
    ({ lists }) => (
      lists
        ? successState({ lists })
        : setErrorState()
    ),
    () => setErrorState(),
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
    () => setErrorState(),
  );
}

const editList = (state, updatedList) => {
  const { lists: prevLists } = state;
  const { id, name, todos, additional_users } = updatedList;
  const index = prevLists.findIndex(l => l.id === updatedList.id);

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

  // For instant UI feedback, we don't wait around for the API response.
  prevLists.splice(index, 1, updatedList);
  return successState({ lists: prevLists });
}

const deleteList = (state, id) => {
  const { lists: prevLists } = state;
  const lists = prevLists.filter(l => l.id !== id);

  api.fetch(
    `/list/${id}`,
    { method: 'DELETE' },
    () => null,
    () => setErrorState(),
  );

  // For instant UI feedback, we don't wait around for the API response.
  return successState({ lists });
}

export {
  getUser,
  getLists,
  createList,
  editList,
  deleteList,
}
