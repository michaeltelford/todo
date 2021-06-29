import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'redux-zero/react';
import actions from '../../store/actions';
import ListSummary from './ListSummary';
import Modal from '../Modal';
import CreateList from './CreateList';
import Footer from '../Footer';
import Hr from '../Hr';

/*
 * The Lists component is used to perform CRUD operations on a user's lists.
 *
 * You can create new (empty) list, delete or edit an existing list. The edit
 * applies only to the list name, not its TODO items (the List component is
 * used for this instead).
 */
class Lists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      modalAction: 'Edit',
      currentList: null,
    };
  }

  componentDidMount() {
    const { getLists } = this.props;

    getLists();
  }

  handleNew = emptyList => {
    this.setState({
      currentList: emptyList,
      modalAction: 'Create',
      showModal: true,
    });
  }

  handleEdit = id => {
    const { lists } = this.props;
    const list = lists.find(l => l.id === id);

    this.setState({
      // Copy list by value, not reference - so it can be updated safely.
      currentList: { ...list },
      modalAction: 'Edit',
      showModal: true,
    });
  }

  handleDelete = id => {
    const { deleteList, lists } = this.props;
    const list = lists.find(l => l.id === id);
    const msg = 'All todo items will be deleted forever, are you sure?';

    if (list.todos.length > 0 && !window.confirm(msg)) return;

    deleteList(id);
  }

  handleModalSubmit = () => {
    const { createList, editList, lists } = this.props;
    const { currentList, modalAction } = this.state;

    if (currentList.name === '') {
      alert('You must enter a list name');
      return;
    }

    if (lists.find(l => l.name.toLowerCase() === currentList.name.toLowerCase())) {
      alert('List name already taken');
      return;
    }

    (modalAction === 'Create')
      ? createList(currentList)
      : editList(currentList);

    this.setState({ showModal: false });
  }

  render() {
    const { loadingText, errored, lists } = this.props;
    const { currentList, showModal, modalAction } = this.state;

    if (errored) return (
      <p className='text-center'>An error occurred, please try again later.</p>
    );

    if (loadingText) return (
      <p className='text-center'>{loadingText}</p>
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
          handleInputChange={evt => {
            currentList.name = evt.target.value;
            this.setState({ currentList });
          }}
          handleSubmit={this.handleModalSubmit}
          handleCancel={() => this.setState({ showModal: false })} />
      </div>
    );
  }
}

Lists.propTypes = {
  loadingText: PropTypes.string,
  errored: PropTypes.bool.isRequired,
  lists: PropTypes.array.isRequired,
  getLists: PropTypes.func.isRequired,
  createList: PropTypes.func.isRequired,
  editList: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
};

const mapToProps = ({ loadingText, errored, lists }) => ({
  loadingText,
  errored,
  lists,
  // listNames is used to get around the shallow comparison of this object and
  // re-render if a list name changes.
  listNames: lists?.map(l => l.name),
});

export default connect(mapToProps, actions)(Lists);
