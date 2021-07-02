import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'redux-zero/react';
import actions from '../../store/actions';
import { withRouter } from 'react-router';
import AddTodo from './AddTodo';
import CheckboxGroup from './CheckboxGroup';
import Modal from '../Modal';
import Footer from '../Footer';
import Loading from '../Loading';
import Error from '../Error';
import ListSummary from './ListSummary';
import Hr from '../Hr';
import ListNotFound from './ListNotFound';

/*
 * List is the main container component for interacting with a list's TODO
 * items. It represents a single list belonging to the user. On mount, the
 * lists's todos are fetched from the API and displayed.
 *
 * All todo list logic is stored in List, not in its child components. Child
 * components are passed handler functions which manipulate the state when
 * fired. This of course causes a re-render of List and the UI gets updated.
 */
class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      currentTodo: null,
    };
  }

  componentDidMount() {
    const { getLists, lists } = this.props;

    if (!lists || lists?.length <= 0) getLists();
  }

  // Select todos by their `done` status.
  filterTodos = (todos, done) => todos.filter(t => done ? t.done : !t.done);

  // Get the todo item with the matching `name`.
  getTodo = todo => {
    const { list: { todos } } = this.props;

    return todos.find(t => t.name.toLowerCase() === todo.name.toLowerCase());
  }

  handleAddTodo = newTodo => {
    const { editList, list } = this.props;
    const { todos } = list;

    if (newTodo.name === '') {
      alert('TODO item must have a name');
      return;
    }

    if (this.getTodo(newTodo)) {
      alert('TODO item already exists');
      return;
    }

    todos.push(newTodo);
    editList({
      ...list,
      todos,
    });
  }

  handleRemoveTodo = obsoleteTodo => {
    const { editList, list } = this.props;
    const { todos } = list;
    const filteredTodos = todos.filter(t => t.name !== obsoleteTodo.name);

    editList({
      ...list,
      todos: filteredTodos,
    });
  }

  handleUpdateTodo = updatedTodo => {
    const { editList, list } = this.props;
    const { todos } = list;
    const index = todos.findIndex(t => t.name === updatedTodo.name);

    todos.splice(index, 1, updatedTodo);
    editList({
      ...list,
      todos,
    });
  }

  handleEdit = name => {
    const todo = this.getTodo({ name });

    this.editTodoName = name;
    this.setState({
      // Copy todo by value, not reference - so it can be updated safely.
      currentTodo: { ...todo },
      showModal: true,
    });
  }

  handleModalSubmit = () => {
    const { editList, list } = this.props;
    const { todos } = list;
    const { currentTodo } = this.state;
    const { name: newName } = currentTodo;
    const index = todos.findIndex(t => t.name === this.editTodoName);

    if (newName === '') {
      alert('You must enter a TODO item name');
      return;
    }

    if (todos.find(t => t.name.toLowerCase() === newName.toLowerCase())) {
      alert('TODO item name already taken');
      return;
    }

    todos.splice(index, 1, currentTodo);
    editList({
      ...list,
      todos,
    });

    this.setState({ showModal: false });
  }

  render() {
    const { loadingText, errored, lists, list, listId } = this.props;
    const { showModal, currentTodo } = this.state;

    if (errored) {
      return <Error />;
    }

    if (loadingText) {
      return <Loading message={loadingText} />;
    }

    // For the initialState.lists value of [].
    if ((lists?.length || 0) <= 0) {
      return null;
    }

    // If the URL's listId is invalid.
    if (!list) {
      return <ListNotFound id={listId} />;
    }

    const { todos } = list;
    const todosNotDone = this.filterTodos(todos, false);
    const todosDone = this.filterTodos(todos, true);

    return (
      <>
        <div className='max-w-screen-sm mx-auto'>
          <AddTodo handleAdd={this.handleAddTodo} />
          <ListSummary
            numTodos={todos.length}
            numTodosDone={todosDone.length} />
        </div>
        <Hr className='max-w-screen-sm mx-auto xl:max-w-full xl:w-4/5' />
        <div className='max-w-screen-sm mx-auto xl:flex xl:max-w-full xl:w-4/5'>
          <CheckboxGroup
            type='todos-not-done'
            todos={todosNotDone}
            handleToggle={this.handleUpdateTodo}
            handleDelete={this.handleRemoveTodo}
            handleEdit={this.handleEdit} />
          {todosNotDone.length > 0 && <Hr />}
          <span className='border-l border-grey ml-2 mr-5 hidden xl:inline' />
          <CheckboxGroup
            type='todos-done'
            todos={todosDone}
            handleToggle={this.handleUpdateTodo}
            handleDelete={this.handleRemoveTodo}
            handleEdit={this.handleEdit} />
          {todosDone.length > 0 && <Hr />}
        </div>
        {todos.length > 0 && <Hr className='w-4/5 mx-auto hidden xl:block' />}
        <div className='max-w-screen-sm mx-auto xl:max-w-full xl:w-4/5'>
          <Footer />
        </div>

        <Modal
          isOpen={showModal}
          action='Edit'
          entity={currentTodo}
          entityType='Item'
          handleInputChange={evt => {
            currentTodo.name = evt.target.value;
            this.setState({ currentTodo });
          }}
          handleSubmit={this.handleModalSubmit}
          handleCancel={() => this.setState({ showModal: false })} />
      </>
    );
  }
}

List.propTypes = {
  loadingText: PropTypes.string,
  errored: PropTypes.bool.isRequired,
  lists: PropTypes.array,
  list: PropTypes.object,
  listId: PropTypes.string,
  getLists: PropTypes.func.isRequired,
  editList: PropTypes.func.isRequired,
};

const mapToProps = (state, ownProps) => {
  const { loadingText, errored, lists } = state;
  const { id: listId } = ownProps.match.params; // from withRouter()
  let list;

  // Find the list being displayed by this component.
  if (lists && listId) {
    list = lists.find(l => l.id.toString() === listId);
  }

  return {
    loadingText,
    errored,
    lists,
    list,
    listId,
  };
}

export default withRouter(connect(mapToProps, actions)(List));
