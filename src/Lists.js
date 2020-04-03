import React from 'react';
import { Link } from 'react-router-dom';
import ListModal from './ListModal';

const MAX_LISTS = 5;

/*
 * Lists component is used for performing CRUD operations on a user's lists.
 *
 * You can create new (empty) list, delete or edit an existing list. The edit
 * applies only to the list name, not its TODO items (the List component is
 * used for this instead).
 */
class Lists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      errored: false,
      lists: [],
      showModal: false,
      currentList: null,
      createList: false,
    }
  }

  componentDidMount() {
    this.apiGetLists();
  }

  buildEmptyList = () => ({
    name: '',
    todos: [{
      name: 'Add some TODOs',
      done: false,
    }],
  });

  handleNew = (evt) => {
    evt.preventDefault();

    this.setState({
      currentList: this.buildEmptyList(),
      createList: true,
      showModal: true,
    });
  }

  handleEdit = (evt) => {
    evt.preventDefault();

    const { lists } = this.state;
    const { id } = evt.target.parentElement.parentElement;
    const list = lists.find(list => list.id.toString() === id);

    this.setState({
      // Copy list by value, not reference - so it can be updated safely.
      currentList: { ...list },
      createList: false,
      showModal: true,
    });
  }

  handleDelete = (evt) => {
    evt.preventDefault();

    const { lists } = this.state;
    const { id } = evt.target.parentElement.parentElement;
    const list = lists.find(list => list.id.toString() === id);
    const msg = 'All todo items will be deleted forever, are you sure?';

    if (list.todos.length > 0 && !window.confirm(msg)) return;

    this.apiDeleteList(id);
  }

  handleModalSubmit = () => {
    const { lists, currentList, createList } = this.state;

    if (currentList.name === '') {
      alert('You must enter a list name');
      return;
    }

    if (lists.find(list => list.name.toLowerCase() === currentList.name.toLowerCase())) {
      alert('List name already taken');
      return;
    }

    if (createList) {
      this.apiCreateList(currentList);
    } else {
      const index = lists.findIndex(list => list.id === currentList.id);
      this.apiEditList(currentList, index);
    }
  }

  handleApiError = (error) => {
    if (error.status === 401) {
      window.location.replace(window.location.origin + '/auth');
    }
    console.error(error);

    const { loading, errored } = this.state;

    if (loading || !errored) {
      this.setState({
        loading: false,
        errored: true,
      });
    }
  }

  apiGetLists = () => {
    const { api } = this.props;

    fetch(api(`/lists`), {
      credentials: 'include',
    }).then((resp) => {
      if (resp.ok) resp.json().then((data) => {
        this.setState({
          loading: false,
          lists: data.lists,
          showModal: false,
        });
      });
      else this.handleApiError(resp);
    }, (error) => this.handleApiError(error))
    .catch((error) => this.handleApiError(error));
  }

  apiCreateList = (list) => {
    const { api } = this.props;

    fetch(api(`/list`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      credentials: 'include',
      body: JSON.stringify({ list }),
    }).then((resp) => {
      // Normally if resp.ok, we add list to state but a bug in the API tech stack
      // means we don't receive the created list ID; so we call apiGetLists instead.
      if (resp.ok) this.apiGetLists();
      else this.handleApiError(resp);
    }, (error) => this.handleApiError(error))
    .catch((error) => this.handleApiError(error));
  }

  apiEditList = (updatedList, index) => {
    const { api } = this.props;
    const { id } = updatedList;

    fetch(api(`/list/${id}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      credentials: 'include',
      body: JSON.stringify({ list: updatedList }),
    }).then((resp) => {
      if (resp.ok) {
        this.setState((prevState) => {
          prevState.lists.splice(index, 1, updatedList);
          return {
            lists: prevState.lists,
            showModal: false,
          }
        });
      }
      else this.handleApiError(resp);
    }, (error) => this.handleApiError(error))
    .catch((error) => this.handleApiError(error));
  }

  apiDeleteList = (id) => {
    const { api } = this.props;

    fetch(api(`/list/${id}`), {
      method: 'DELETE',
      credentials: 'include',
    }).then((resp) => {
      if (resp.ok) {
        this.setState((prevState) => ({
          lists: prevState.lists.filter(list => list.id.toString() !== id),
        }));
      }
      else this.handleApiError(resp);
    }, (error) => this.handleApiError(error))
    .catch((error) => this.handleApiError(error));
  }

  renderCreate = () => {
    const { lists } = this.state;

    if (lists.length < MAX_LISTS) {
      return <p><a href='#' onClick={this.handleNew}>Create</a> a new list.</p>;
    }
  }

  render() {
    const {
      loading, errored, lists, currentList, showModal, createList,
    } = this.state;

    if (loading) return <p>Loading data...</p>;
    if (errored) return <p>An error occurred, please try again later.</p>;

    return (
      <>
        <div>
          <p>You're using {lists.length} of {MAX_LISTS} lists.</p>
          { this.renderCreate() }
        </div>
        <hr />

        {lists.map((list) => {
          const numItems     = list.todos.length;
          const numItemsTodo = list.todos.filter(todo => !todo.done).length;

          return (
            <div id={list.id} key={list.id}>
              <span>
                <Link to={`/list/${list.id}`}>{list.name}</Link>{' '}
                <a href='#' onClick={this.handleEdit}>Edit</a>{' '}
                <a href='#' onClick={this.handleDelete}>Delete</a>
              </span>
              <p>{`${numItems} items (with ${numItemsTodo} still to do)`}</p>
              <hr />
            </div>
          );
        })}

        <ListModal
          isOpen={showModal}
          createList={createList}
          currentList={currentList}
          setCurrentList={(list) => this.setState({ currentList: list })}
          submitModal={this.handleModalSubmit}
          cancelModal={() => this.setState({ showModal: false })} />
      </>
    );
  }
}

export default Lists;
