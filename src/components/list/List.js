import React from 'react';
import { withRouter } from 'react-router';
import { AppContext } from '../../context';
import AddTodo from './AddTodo';
import CheckboxGroup from './CheckboxGroup';
import Modal from '../Modal';
import Logout from '../Logout';
import ListSummary from './ListSummary';

/*
 * List is the main container component for interacting with a list's TODO
 * items. It represents a single list belonging to the user.
 *
 * On mount, the todos are fetched from the API. The user interacts with them,
 * updating the component state. Each state change is persisted to the API
 * after each event update e.g. adding a new todo item to the list.
 *
 * All todo list state is stored in List, not in its child components. Child
 * components are passed handler functions which manipulate the state when
 * fired. This of course causes a re-render of List and the UI gets updated.
 */
class List extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.id = props.match.params.id;

    this.state = {
      loading: true,
      errored: false,
      todos: [],
      showModal: false,
      currentTodo: null,
    };
  }

  componentDidMount() {
    this.apiGetTodos();
  }

  /* State Modifiers */

  handleAddTodo = (newTodo) => {
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
    }, this.apiSyncTodos);
  }

  handleRemoveTodo = (obsoleteTodo) => {
    this.setState((prevState) => {
      const filteredTodos = prevState.todos.filter((todo) => {
        return todo.name !== obsoleteTodo.name;
      });

      return { todos: filteredTodos }
    }, this.apiSyncTodos);
  }

  handleUpdateTodo = (updatedTodo) => {
    this.setState((prevState) => {
      const index = prevState.todos.findIndex((todo) => {
        return todo.name === updatedTodo.name;
      });

      prevState.todos.splice(index, 1, updatedTodo);
      return prevState;
    }, this.apiSyncTodos);
  }

  handleEdit = (name) => {
    this.editTodoName = name;
    const todo = this.getTodo({ name });

    this.setState({
      // Copy todo by value, not reference - so it can be updated safely.
      currentTodo: { ...todo },
      showModal: true,
    });
  }

  handleModalSubmit = () => {
    const { todos, currentTodo } = this.state;
    const newName = currentTodo.name;
    const index = todos.findIndex(todo => todo.name === this.editTodoName);

    if (newName === '') {
      alert('You must enter a TODO item name');
      return;
    }

    if (todos.find(
      todo => todo.name.toLowerCase() === newName.toLowerCase()
    )) {
      alert('TODO item name already taken');
      return;
    }

    this.setState((prevState) => {
      prevState.todos.splice(index, 1, currentTodo);
      return {
        todos: prevState.todos,
        showModal: false,
      }
    }, this.apiSyncTodos);
  }

  /* Generic Helper */

  // Filter todos by their `done` status.
  filterTodos = (done) => {
    const { todos } = this.state;
    return todos.filter(todo => done ? todo.done : !todo.done);
  }

  // Get the todo item with the matching `name`.
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
    const { loading, errored, todos, showModal, currentTodo } = this.state;

    if (loading) return null;
    if (errored) return (
      <p className='text-center'>An error occurred, please try again later.</p>
    );

    const todosNotDone = this.filterTodos(false);
    const todosDone    = this.filterTodos(true);

    return (
      <>
        <div className='max-w-screen-sm mx-auto'>
          <AddTodo handleAdd={this.handleAddTodo} />
          <ListSummary
            numTodos={todos.length}
            numTodosDone={todosDone.length} />
        </div>
        <hr className='border-l border-grey max-w-screen-sm mx-auto my-4 xl:max-w-full xl:w-4/5' />
        <div className='max-w-screen-sm mx-auto xl:flex xl:max-w-full xl:w-4/5'>
          <CheckboxGroup
            type='todos-not-done'
            todos={todosNotDone}
            handleToggle={this.handleUpdateTodo}
            handleDelete={this.handleRemoveTodo}
            handleEdit={this.handleEdit} />
          {todosNotDone.length > 0 && <hr className='border-l border-grey my-4' />}
          <span className='border-l border-grey ml-2 mr-5 hidden xl:inline' />
          <CheckboxGroup
            type='todos-done'
            todos={todosDone}
            handleToggle={this.handleUpdateTodo}
            handleDelete={this.handleRemoveTodo}
            handleEdit={this.handleEdit} />
          {todosDone.length > 0 && <hr className='border-l border-grey my-4' />}
        </div>
        <hr className='border-l border-grey w-4/5 mx-auto my-4 hidden xl:block' />
        <div className='max-w-screen-sm mx-auto xl:max-w-full xl:w-4/5'>
          <Logout />
        </div>

        <Modal
          isOpen={showModal}
          action={'Edit'}
          entity={currentTodo}
          entityType='Item'
          handleInputChange={(evt) => {
            currentTodo.name = evt.target.value;
            this.setState({ currentTodo });
          }}
          handleSubmit={this.handleModalSubmit}
          handleCancel={() => this.setState({ showModal: false })} />
      </>
    );
  }
}

export default withRouter(List);
