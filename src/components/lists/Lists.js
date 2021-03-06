import React from 'react';
import { AppContext } from '../../context';
import ListSummary from './ListSummary';
import Modal from '../Modal';
import CreateList from './CreateList';
import Footer from '../Footer';
import Hr from '../Hr';

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
      loadingText: '',
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
          loadingText: '',
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
    const { id, name, todos } = updatedList;

    api.fetch(this, `/list/${id}`, {
      method: 'PUT',
      body: { list: { name, todos } }, // Omit the timestamps etc.
    }, () => {
      this.setState((prevState) => {
        prevState.lists.splice(index, 1, updatedList);
        return {
          loadingText: '',
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
        loadingText: '',
        lists: prevState.lists.filter(list => list.id !== id),
      }));
    });
  }

  render() {
    const {
      loading, loadingText, errored, lists, currentList, showModal, modalAction,
    } = this.state;

    if (loading) return (
      <p className='text-center'>{loadingText || ''}</p>
    )
    if (errored) return (
      <p className='text-center'>An error occurred, please try again later.</p>
    );

    return (
      <div className='max-w-screen-sm mx-auto'>
        <CreateList
          lists={lists}
          handleNew={this.handleNew} />
        <Hr />
        {lists.map(list => (
          <ListSummary
            key={list.id}
            list={list}
            handleEdit={() => this.handleEdit(list.id)}
            handleDelete={() => this.handleDelete(list.id)} />
        ))}
        <div className='max-w-screen-sm mx-auto'>
          <Footer />
        </div>

        <Modal
          isOpen={showModal}
          action={modalAction}
          entity={currentList}
          entityType='List'
          handleInputChange={(evt) => {
            currentList.name = evt.target.value;
            this.setState({ currentList });
          }}
          handleSubmit={this.handleModalSubmit}
          handleCancel={() => this.setState({ showModal: false })} />
      </div>
    );
  }
}

export default Lists;
