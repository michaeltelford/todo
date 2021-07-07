const initialState = {
  loading: false,
  loadingText: null,
  errored: false,
  lists: [],
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
