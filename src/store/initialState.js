const initialState = {
  loading: false,
  loadingText: null,
  errored: false,
  user: null,
  lists: null,
  list: null,
};

const buildEmptyList = () => ({
  name: '',
  todos: [{
    name: 'Add some TODOs',
    done: false,
  }],
  additional_users: [],
});

export default initialState;
export { buildEmptyList };
