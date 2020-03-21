import React from 'react';
import Add from './Add';
import CheckboxGroup from './CheckboxGroup';

/*
 * List is the main container component for the TODO application logic.
 *
 * On mount, the todos are fetched from the API. The user interacts with them,
 * updating the component state. Each state change is persisted to the API
 * after each event e.g. adding a new todo item to the list.
 *
 * All todo list state is stored in List, not in its child components. Child
 * components are passed callback functions which manipulate the state when
 * fired. This of course causes a re-render of List and the UI gets updated.
 */
class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      errored: false,
      todos: [],
    };

    debugger;
  }

  componentDidMount() {
    this.props.getSession()
      .then(
        (resp) => {
          if (resp.ok) this.apiGetTodos();
          else window.location.replace(window.location.origin + '/auth');
        },
        (error) => this.handleApiError(error)
      )
      .catch((error) => this.handleApiError(error));
  }

  /* State Modifiers */

  addTodo = (newTodo) => {
    if (newTodo.name === '') {
      alert('TODO item must have a name');
      return;
    }

    this.setState((prevState) => {
      if (this.getTodo(newTodo, prevState)) {
        alert('TODO item already exists');
      } else {
        prevState.todos.push(newTodo);
        this.apiSyncTodos(prevState);
      }

      return prevState;
    });
  }

  removeTodo = (obsoleteTodo) => {
    this.setState((prevState) => {
      const filteredTodos = prevState.todos.filter(todo => {
        return todo.name !== obsoleteTodo.name;
      });
      const newState = { todos: filteredTodos }
      this.apiSyncTodos(newState);

      return newState;
    });
  }

  updateTodo = (updatedTodo) => {
    this.setState((prevState) => {
      const index = prevState.todos.findIndex(todo => {
        return todo.name === updatedTodo.name;
      });
      prevState.todos.splice(index, 1, updatedTodo);
      this.apiSyncTodos(prevState);

      return prevState;
    });
  }

  filterTodos = (done) => {
    return this.state.todos.filter((todo) => {
      return done ? todo.done : !todo.done;
    });
  }

  getTodo = (todo, prevState) => {
    const state = prevState || this.state;
    return state.todos.find((el) => el.name === todo.name);
  }

  /* API Helpers */

  handleApiError = (err) => {
    console.error(err);

    this.setState({
      loading: false,
      errored: true,
    });
  }

  apiGetTodos = () => {
    fetch(this.props.api('/list/101'))
      .then((res) => res.json())
      .then(
        (data) => {
          this.setState(() => {
            return {
              loading: false,
              todos: data.list.todos,
            };
          });
        },
        (error) => {
          this.handleApiError(error);
        }
      ).catch((error) => {
        this.handleApiError(error);
      });
  }

  apiSyncTodos = (state) => {
    const data = { list: state };

    fetch(this.props.api('/list/101'), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data),
    }).then((resp) => {
      if (!resp.ok) this.handleApiError(resp.body);
    }).catch((error) => this.handleApiError(error));
  }

  render() {
    const { loading, errored } = this.state;

    return (
      <>
        <h1>TODO Checklist</h1>
        { loading ? (
          <p>Loading data...</p>
        ) : errored ? (
          <p>An error occurred, please try again later.</p>
        ) : (
          <>
            <Add callback={this.addTodo} />
            <hr />
            <CheckboxGroup
              todos={this.filterTodos(false)}
              toggleCallback={this.updateTodo}
              removeCallback={this.removeTodo} />
            <hr />
            <CheckboxGroup
              todos={this.filterTodos(true)}
              toggleCallback={this.updateTodo}
              removeCallback={this.removeTodo} />
          </>
        )}
      </>
    );
  }
}

export default List;
