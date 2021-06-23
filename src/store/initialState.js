/*
 * Define the initial store/state shape below. This is the single source of truth (SSOT) for all
 * global state. The shape used here is important! Let's not duplicate data across the store and
 * ruin the SSOT. Only data that needs to be global should go here, otherwise keep it solely in
 * the component that needs it. Abusing the store will create bugs!
 */

// The shape of a list object is defined by the API.
const initialState = {
  loading: false,
  loadingText: null,
  errored: false,
  lists: [],
};

export default initialState;
