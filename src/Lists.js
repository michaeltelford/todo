import React from 'react';
import { Link } from 'react-router-dom';

class Lists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      errored: false,
      lists: [],
    }
  }

  componentDidMount() {
    // this.apiGetLists();
    this.setState({
      loading: false,
      lists: [
        { id: 1, name: 'Daily Tasks', todos: [
          { name: 'Wash Dishes', done: false }, { name: 'Wash Dishes', done: true },
        ]},
        { id: 2, name: 'API', todos: [
          { name: 'Write Tests', done: false }, { name: 'Deploy', done: false },
        ]},
        { id: 3, name: 'Front End', todos: [
          { name: 'Write Tests', done: false }, { name: 'Deploy', done: false },
          { name: 'Write Code', done: false }, { name: 'Style with CSS', done: true },
        ]},
      ],
    });
  }

  handleApiError = (error) => {
    const { loading, errored } = this.state;
    console.error(error);

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
        this.setState(() => {
          return {
            loading: false,
            lists: data.lists,
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

  handleEdit = (evt) => {
    evt.preventDefault();

    const modalValue = 'TODO';

    const { lists } = this.state;
    const { id } = evt.target.parentElement.parentElement;
    const index = lists.indexOf(list => list.id === id);
    const list = lists[index];
    const updatedList = {
      ...list,
      name: modalValue,
    }

    this.apiEditList(updatedList, index);
  }

  apiEditList = (updatedList, index) => {
    const { api } = this.props;
    const { id } = updatedList;

    fetch(api(`/list/${id}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      credentials: 'include',
      body: JSON.stringify({ updatedList }),
    }).then((resp) => {
      if (resp.ok) {
        this.setState((prevState) => {
          prevState.lists.splice(index, 1, updatedList);
          return { lists: prevState.lists }
        });
      }
      else this.handleApiError(resp);
    }, (error) => this.handleApiError(error))
    .catch((error) => this.handleApiError(error));
  }

  handleDelete = (evt) => {
    evt.preventDefault();

    const { api } = this.props;
    const { id } = evt.target.parentElement.parentElement;
    const msg = 'All todo items will be deleted forever, are you sure?';

    if (!window.confirm(msg)) return;

    fetch(api(`/list/${id}`), {
      method: 'DELETE',
      credentials: 'include',
    }).then((resp) => {
      if (resp.ok) {
        this.setState((prevState) => {
          return { lists: prevState.lists.filter(list => list.id === id) }
        });
      }
      else this.handleApiError(resp);
    }, (error) => this.handleApiError(error))
    .catch((error) => this.handleApiError(error));
  }

  render() {
    const { loading, errored, lists } = this.state;

    if (loading) return <p>Loading data...</p>;
    if (errored) return <p>An error occurred, please try again later.</p>;

    return (
      lists.map((list) => {
        const numItems     = list.todos.length;
        const numItemsTodo = list.todos.filter((todo) => !todo.done).length;

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
      })
    );
  }
}

export default Lists;
