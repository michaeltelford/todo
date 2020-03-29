import React from 'react';
import { withRouter } from 'react-router';
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

    this.id = props.match.params.id;

    this.state = {
      loading: true,
      errored: false,
      todos: [],
    }
  }

  componentDidMount() {
    this.apiGetTodos();
  }

  componentDidUpdate() {
    this.apiSyncTodos();
  }

  /* State Modifiers */

  addTodo = (newTodo) => {
    if (newTodo.name === '') {
      alert('TODO item must have a name');
      return;
    }

    if (this.getTodo(newTodo)) {
      alert('TODO item already exists');
      return;
    }

    this.setState((prevState) => {
      prevState.todos.push(newTodo);
      return prevState;
    });
  }

  removeTodo = (obsoleteTodo) => {
    this.setState((prevState) => {
      const filteredTodos = prevState.todos.filter(todo => {
        return todo.name !== obsoleteTodo.name;
      });

      return { todos: filteredTodos }
    });
  }

  updateTodo = (updatedTodo) => {
    this.setState((prevState) => {
      const index = prevState.todos.findIndex(todo => {
        return todo.name === updatedTodo.name;
      });

      prevState.todos.splice(index, 1, updatedTodo);
      return prevState;
    });
  }

  filterTodos = (done) => {
    return this.state.todos.filter((todo) => {
      return done ? todo.done : !todo.done;
    });
  }

  getTodo = (todo) => {
    return this.state.todos.find((el) => el.name === todo.name);
  }

  /* API Helpers */

  handleApiError = (error) => {
    console.error(error);

    this.setState({
      loading: false,
      errored: true,
    });
  }

  apiGetTodos = () => {
    const { api } = this.props;

    fetch(api(`/list/${this.id}`), {
      credentials: 'include',
    }).then((resp) => {
      if (resp.ok) resp.json().then((data) => {
        this.setState(() => {
          return {
            loading: false,
            todos: data.list.todos,
          }
        });
      });
      else if (resp.status === 401) {
        window.location.replace(window.location.origin + '/auth');
      }
      else this.handleApiError(resp);
    }, (error) => this.handleApiError(error))
    .catch((error) => this.handleApiError(error));
  }

  apiSyncTodos = () => {
    const { api } = this.props;
    const data = { list: { todos: this.state.todos } }

    fetch(api(`/list/${this.id}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      credentials: 'include',
      body: JSON.stringify(data),
    }).then((resp) => {
      if (!resp.ok) this.handleApiError(resp);
    }, (error) => this.handleApiError(error))
    .catch((error) => this.handleApiError(error));
  }

  render() {
    const { loading, errored } = this.state;

    if (loading) return <p>Loading data...</p>;
    if (errored) return <p>An error occurred, please try again later.</p>;

    return (
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
    );
  }
}

export default withRouter(List);
