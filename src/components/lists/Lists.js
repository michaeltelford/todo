import React from 'react';
import ListSummary from './ListSummary';
import ListModal from './ListModal';
import CreateList from './CreateList';

/*
 * Lists component is used for performing CRUD operations on a user's lists.
 * Child components are passed callbacks to update state accordingly.
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
    };
  }

  componentDidMount() {
    this.apiGetLists();
  }

  /* State Modifiers */

  handleNew = (emptyList) => {
    this.setState({
      currentList: emptyList,
      createList: true,
      showModal: true,
    });
  }

  handleEdit = (id) => {
    const { lists } = this.state;
    const list = lists.find(list => list.id.toString() === id);

    this.setState({
      // Copy list by value, not reference - so it can be updated safely.
      currentList: { ...list },
      createList: false,
      showModal: true,
    });
  }

  handleDelete = (id) => {
    const { lists } = this.state;
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

  /* API Helpers */

  apiGetLists = () => {
    const { api, handleApiError } = this.props;

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
      else handleApiError(resp, this);
    }, (error) => handleApiError(error, this))
    .catch((error) => handleApiError(error, this));
  }

  apiCreateList = (list) => {
    const { api, handleApiError } = this.props;

    fetch(api(`/list`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      credentials: 'include',
      body: JSON.stringify({ list }),
    }).then((resp) => {
      // Normally if resp.ok, we add list to state but a bug in the API tech stack
      // means we don't receive the created list ID; so we call apiGetLists instead.
      if (resp.ok) this.apiGetLists();
      else handleApiError(resp, this);
    }, (error) => handleApiError(error, this))
    .catch((error) => handleApiError(error, this));
  }

  apiEditList = (updatedList, index) => {
    const { api, handleApiError } = this.props;
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
      else handleApiError(resp, this);
    }, (error) => handleApiError(error, this))
    .catch((error) => handleApiError(error, this));
  }

  apiDeleteList = (id) => {
    const { api, handleApiError } = this.props;

    fetch(api(`/list/${id}`), {
      method: 'DELETE',
      credentials: 'include',
    }).then((resp) => {
      if (resp.ok) {
        this.setState(prevState => ({
          lists: prevState.lists.filter(list => list.id.toString() !== id),
        }));
      }
      else handleApiError(resp, this);
    }, (error) => handleApiError(error, this))
    .catch((error) => handleApiError(error, this));
  }

  render() {
    const {
      loading, errored, lists, currentList, showModal, createList,
    } = this.state;

    if (loading) return <p>Loading data...</p>;
    if (errored) return <p>An error occurred, please try again later.</p>;

    return (
      <>
        <CreateList
          lists={lists}
          handleNew={this.handleNew} />
        <hr />

        {lists.map(list => (
          <ListSummary
            list={list}
            handleEdit={this.handleEdit}
            handleDelete={this.handleDelete} />
        ))}

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
