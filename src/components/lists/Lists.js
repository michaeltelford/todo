import React from 'react';
import { AppContext } from '../../context';
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
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      errored: false,
      lists: [{
        id: 1, name: 'Development Days to Delay until Destruction', todos: [1,2,3],
      }, {
        id: 2, name: 'Daily Tasks', todos: [1,2,3,4,5],
      }],
      showModal: false,
      currentList: null,
      createList: false,
    };
  }

  componentDidMount() {
    // this.apiGetLists();
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
        lists: prevState.lists.filter(list => list.id.toString() !== id),
      }));
    });
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
        <hr className='my-4' />

        {lists.map(list => (
          <ListSummary
            key={list.id}
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
