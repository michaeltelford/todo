import React from 'react';
import { AppContext } from '../../context';
import ListSummary from './ListSummary';
import ListModal from '../ListModal';
import CreateList from './CreateList';
import Logout from '../Logout';

/*
 * Lists component is used for performing CRUD operations on a user's lists.
 * Child components are passed callbacks to update state accordingly.
 *
 * You can create new (empty) list, delete or edit an existing list. The edit
 * applies only to the list name, not its TODO items (the List component is
 * used for this instead).
 */
class Lists extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      errored: false,
      lists: [],
      showModal: false,
      currentList: null,
      modalAction: 'Edit',
    };
  }

  componentDidMount() {
    this.apiGetLists();
  }

  /* State Modifiers */

  handleNew = (emptyList) => {
    this.setState({
      currentList: emptyList,
      modalAction: 'Create',
      showModal: true,
    });
  }

  handleEdit = (id) => {
    const { lists } = this.state;
    const list = lists.find(list => list.id === id);

    this.setState({
      // Copy list by value, not reference - so it can be updated safely.
      currentList: { ...list },
      modalAction: 'Edit',
      showModal: true,
    });
  }

  handleDelete = (id) => {
    const { lists } = this.state;
    const list = lists.find(list => list.id === id);
    const msg = 'All todo items will be deleted forever, are you sure?';

    if (list.todos.length > 0 && !window.confirm(msg)) return;

    this.apiDeleteList(id);
  }

  handleModalSubmit = () => {
    const { lists, currentList, modalAction } = this.state;

    if (currentList.name === '') {
      alert('You must enter a list name');
      return;
    }

    if (lists.find(
      list => list.name.toLowerCase() === currentList.name.toLowerCase()
    )) {
      alert('List name already taken');
      return;
    }

    if (modalAction === 'Create') {
      this.apiCreateList(currentList);
    } else {
      const index = lists.findIndex(list => list.id === currentList.id);
      this.apiEditList(currentList, index);
    }
  }

  /* API Helpers */

  apiGetLists = () => {
    const { api } = this.context;

    api.fetch(this, '/lists', {}, (resp) => {
      resp.json().then((data) => {
        this.setState({
          loading: false,
          lists: data.lists,
          showModal: false,
        });
      });
    });
  }

  apiCreateList = (list) => {
    const { api } = this.context;

    api.fetch(this, '/list', {
      method: 'POST',
      body: { list },
    }, () => {
      // Normally if resp.ok, we add list to state but a bug in the API tech stack
      // means we don't receive the created list ID; so we call apiGetLists instead.
      this.apiGetLists();
    });
  }

  apiEditList = (updatedList, index) => {
    const { api } = this.context;
    const { id } = updatedList;

    api.fetch(this, `/list/${id}`, {
      method: 'PUT',
      body: { list: updatedList },
    }, () => {
      this.setState((prevState) => {
        prevState.lists.splice(index, 1, updatedList);
        return {
          lists: prevState.lists,
          showModal: false,
        }
      });
    });
  }

  apiDeleteList = (id) => {
    const { api } = this.context;

    api.fetch(this, `/list/${id}`, { method: 'DELETE' }, () => {
      this.setState(prevState => ({
        lists: prevState.lists.filter(list => list.id !== id),
      }));
    });
  }

  render() {
    const {
      loading, errored, lists, currentList, showModal, modalAction,
    } = this.state;

    if (loading) return null;
    if (errored) return (
      <p className='text-center'>An error occurred, please try again later.</p>
    );

    return (
      <div className='max-w-screen-sm mx-auto'>
        <CreateList
          lists={lists}
          handleNew={this.handleNew} />
        <hr className='border-l border-grey my-4' />
        {lists.map(list => (
          <ListSummary
            key={list.id}
            list={list}
            handleEdit={() => this.handleEdit(list.id)}
            handleDelete={() => this.handleDelete(list.id)} />
        ))}
        <Logout />

        <ListModal
          isOpen={showModal}
          action={modalAction}
          entity={currentList}
          setEntity={list => this.setState({ currentList: list })}
          submitModal={this.handleModalSubmit}
          cancelModal={() => this.setState({ showModal: false })} />
      </div>
    );
  }
}

export default Lists;
