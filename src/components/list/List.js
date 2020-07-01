import React from 'react';
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

  constructor(props) {
    super(props);

    this.id = props.match.params.id;

    this.state = {
      loading: false,
      errored: false,
      todos: [{
        name: 'Wash car', done: true,
      }, {
        name: 'Buy Records', done: false,
      }, {
        name: 'Get Groceries', done: true,
      }, {
        name: 'Watch Bikes', done: false,
      }, {
        name: 'A long item that takes a while so it does... oh aye it does alright', done: false,
      }],
    };
  }

  componentDidMount() {
    // this.apiGetTodos();
  }

  componentDidUpdate() {
    // this.apiSyncTodos();
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
    const { api } = this.context;

    api.fetch(this, `/list/${this.id}`, {}, (resp) => {
      resp.json().then((data) => {
        const { list } = data;
        this.name = list.name;
        this.setState(() => ({
          loading: false,
          todos: list.todos,
        }));
      });
    });
  }

  apiSyncTodos = () => {
    const { api } = this.context;
    const request = {
      method: 'PUT',
      body: {
        list: {
          name: this.name,
          todos: this.state.todos,
        },
      },
    }

    api.fetch(this, `/list/${this.id}`, request);
  }

  render() {
    const { loading, errored, todos } = this.state;

    if (loading) return <p>Loading data...</p>;
    if (errored) return <p>An error occurred, please try again later.</p>;

    const todosNotDone = this.filterTodos(false);
    const todosDone    = this.filterTodos(true);

    return (
      <>
        <AddTodo callback={this.addTodo} />
        <p>You've completed {todosDone.length} out of {todos.length} items</p>
        <hr className='my-4' />
        <CheckboxGroup
          todos={todosNotDone}
          toggleCallback={this.updateTodo}
          removeCallback={this.removeTodo} />
        {todosNotDone.length > 0 && <hr className='my-4' />}
        <CheckboxGroup
          todos={todosDone}
          toggleCallback={this.updateTodo}
          removeCallback={this.removeTodo} />
        {todosDone.length > 0 && <hr className='my-4' />}
      </>
    );
  }
}

export default withRouter(List);
