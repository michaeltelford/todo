# Store

[Redux-zero](https://github.com/redux-zero/redux-zero) is used to provide global state. See its `README` for more information but in a nutshell:

- Based on Redux
- Zero dependencies (and < 1KB when gzipped)
- Zero dispatch's or reducers to write :-)
- Much less boiler plate overall, making for much easier to read/maintain code
- Still works with Redux dev tools (lovely jubbly)

## initialState.js

Define the initial store/state shape here. This is the single source of truth (SSOT) for all global state. The shape used here is important! Don't duplicate data across the store and ruin the SSOT. Only data that needs to be global should go here, otherwise keep it solely in the component that needs it. Abusing the store will create bugs!

## actions/index.js

Import and use your actions here. Each action is a function that takes the current state and sets/returns a new state. Actions must change the state immutably to avoid bugs!

Actions can update the state by calling `setState(...)` and/or returning the new state object. If the action doesn't return a new state object, redux dev tools won't work properly but this isn't strictly needed for the app to work, just handy to have during dev.

The first parameter will always be `state` (passed from redux-zero), but you can add your own parameters in after it and pass them when calling the action e.g.

```js
// Define and export the action...
const increment = (state, i = 1) => ({ count: state.count + i });

// Call the action from your component...
increment(5);
```

Async actions are the same as sync one's. Just set/return the new state object from the Promise's `then()` block. You can call `setState()` to set a loading state etc.

Think about performance, needless renders should be prevented and re-rendering should occur ASAP for UI feedback e.g. update the store (and re-render) first, *then* call the API. You should only call the API first if you're waiting on its response to update the store with e.g. `getLists()` sets the API response directly into the store so we must wait.
