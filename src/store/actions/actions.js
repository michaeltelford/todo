import api from '../../api';
import { setLoadingState, setSuccessState, setErrorState } from '.';

const getLists = _state => {
  setLoadingState();

  api.fetch(
    '/lists',
    undefined,
    ({ lists }) => (
      lists
        ? setSuccessState({ lists })
        : setErrorState()
    ),
    () => setErrorState(),
  );
}

const createList = (_state, list) => {
  setLoadingState();

  api.fetch(
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
  const { id, name, todos } = updatedList;
  const index = prevLists.findIndex(l => l.id === updatedList.id);

  // For instant UI feedback, we update the state first and *then* sync the API.
  prevLists.splice(index, 1, updatedList);
  setSuccessState({ lists: prevLists });

  api.fetch(
    `/list/${id}`,
    {
      method: 'PUT',
      body: { list: { name, todos } }, // Omit the timestamps etc.
    },
    () => null,
    () => setErrorState(),
  );
}

const deleteList = (state, id) => {
  const { lists: prevLists } = state;
  const lists = prevLists.filter(l => l.id !== id);

  // For instant UI feedback, we update the state first and *then* sync the API.
  setSuccessState({ lists });

  api.fetch(
    `/list/${id}`,
    { method: 'DELETE' },
    () => null,
    () => setErrorState(),
  );
}

export {
  getLists,
  createList,
  editList,
  deleteList,
}
