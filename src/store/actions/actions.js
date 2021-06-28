import api from '../../api';
import { setLoadingState, successState, errorState } from '.';

const getLists = state => {
  setLoadingState(state);

  return api.fetch(
    '/lists',
    undefined,
    ({ lists }) => {
      if (!lists) throw new Error('Empty response body from API');

      return successState(state, { lists });
    },
    () => errorState(state),
  );
}

const createList = (state, list) => {
  setLoadingState(state);

  return api.fetch(
    '/list',
    {
      method: 'POST',
      body: { list },
    },
    // Normally if resp.ok, we push the new list into state but a bug in the API tech stack
    // means we don't receive the created list ID; so we call getLists() again instead.
    () => getLists(state),
    () => errorState(state),
  );
}

const editList = (state, updatedList) => {
  const { lists: prevLists } = state;
  const { id, name, todos } = updatedList;

  setLoadingState(state);

  return api.fetch(
    `/list/${id}`,
    {
      method: 'PUT',
      body: { list: { name, todos } }, // Omit the timestamps etc.
    },
    () => {
      const index = prevLists.findIndex(l => l.id === updatedList.id);
      prevLists.splice(index, 1, updatedList);
      return successState(state, { lists: prevLists });
    },
    () => errorState(state),
  );
}

const deleteList = (state, id) => {
  const { lists: prevLists } = state;

  setLoadingState(state);

  return api.fetch(
    `/list/${id}`,
    { method: 'DELETE' },
    () => {
      const lists = prevLists.filter(l => l.id !== id);
      return successState(state, { lists });
    },
    () => errorState(state),
  );
}

export {
  getLists,
  createList,
  editList,
  deleteList,
}
