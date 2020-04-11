import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { AppContext } from '../../context';
import AddTodo from './AddTodo';
import CheckboxGroup from './CheckboxGroup';

/*
 * List is the main container component for interacting with a list's TODO
 * items. It represents a single list belonging to the user.
 *
 * On mount, the todos are fetched from the API. The user interacts with them,
 * updating the component state. Each state change is persisted to the API
 * after each event update e.g. adding a new todo item to the list.
 *
 * All todo list state is stored in List, not in its child components. Child
 * components are passed callback functions which manipulate the state when
 * fired. This of course causes a re-render of List and the UI gets updated.
 */
class List extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    handleApiError: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.id = props.match.params.id;

    this.state = {
      loading: true,
      errored: false,
      todos: [],
    };
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
      const filteredTodos = prevState.todos.filter((todo) => {
        return todo.name !== obsoleteTodo.name;
      });

      return { todos: filteredTodos }
    });
  }

  updateTodo = (updatedTodo) => {
    this.setState((prevState) => {
      const index = prevState.todos.findIndex((todo) => {
        return todo.name === updatedTodo.name;
      });

      prevState.todos.splice(index, 1, updatedTodo);
      return prevState;
    });
  }

  filterTodos = (done) => {
    const { todos } = this.state;
    return todos.filter(todo => done ? todo.done : !todo.done);
  }

  getTodo = (todo) => {
    const { todos } = this.state;
    return todos.find(el => el.name.toLowerCase() === todo.name.toLowerCase());
  }

  /* API Helpers */

  apiGetTodos = () => {
    const { handleApiError } = this.props;
    const { api } = this.context;

    fetch(api(`/list/${this.id}`), {
      credentials: 'include',
    }).then((resp) => {
      if (resp.ok) resp.json().then((data) => {
        this.name = data.list.name;
        this.setState(() => ({
          loading: false,
          todos: data.list.todos,
        }));
      });
      else handleApiError(resp, this);
    }, (error) => handleApiError(error, this))
    .catch((error) => handleApiError(error, this));
  }

  apiSyncTodos = () => {
    const { handleApiError } = this.props;
    const { api } = this.context;
    const data = {
      list: {
        name: this.name,
        todos: this.state.todos,
      },
    };

    fetch(api(`/list/${this.id}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      credentials: 'include',
      body: JSON.stringify(data),
    }).then((resp) => {
      if (!resp.ok) handleApiError(resp, this);
    }, (error) => handleApiError(error, this))
    .catch((error) => handleApiError(error, this));
  }

  render() {
    const { loading, errored } = this.state;

    if (loading) return <p>Loading data...</p>;
    if (errored) return <p>An error occurred, please try again later.</p>;

    return (
      <>
        <AddTodo callback={this.addTodo} />
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
        <hr />
      </>
    );
  }
}

export default withRouter(List);
