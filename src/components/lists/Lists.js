import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'redux-zero/react';
import actions from '../../store/actions';
import { EMAIL_REGEX } from '../../constants';
import ListSummary from './ListSummary';
import SaveModal from '../modals/SaveModal';
import UserModal from '../modals/UserModal';
import CreateList from './CreateList';
import Footer from '../Footer';
import Loading from '../Loading';
import Error from '../Error';
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
      showSaveModal: false,
      showUserModal: false,
      modalAction: 'Edit',
      currentList: null,
    };
  }

  componentDidMount() {
    const { getLists } = this.props;

    // We getLists everytime to determine the correct order.
    getLists();
  }

  handleNew = emptyList => {
    this.setState({
      currentList: emptyList,
      modalAction: 'Create',
      showSaveModal: true,
      showUserModal: false,
    });
  }

  handleEdit = id => {
    const { lists } = this.props;
    const list = lists.find(l => l.id === id);

    this.setState({
      // Copy list by value, not reference - so it can be updated safely.
      currentList: { ...list },
      modalAction: 'Edit',
      showSaveModal: true,
      showUserModal: false,
    });
  }

  handleDelete = id => {
    const { deleteList, lists } = this.props;
    const list = lists.find(l => l.id === id);
    const msg = 'All todo items will be deleted forever, are you sure?';

    if (list.todos.total_todos > 0 && !window.confirm(msg)) return;

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

    this.setState({ showSaveModal: false });
  }

  closeModals = () => this.setState({
    showSaveModal: false,
    showUserModal: false,
  });

  handleUsers = id => {
    const { lists } = this.props;
    const list = lists.find(l => l.id === id);

    this.setState({
      // Copy list by value, not reference - so it can be updated safely.
      currentList: { ...list },
      showSaveModal: false,
      showUserModal: true,
    });
  }

  handleAddUser = email => {
    email = email?.toLowerCase();
    const { editList, user: { email: currentUser } } = this.props;
    const { currentList } = this.state;
    const updatedList = {
      ...currentList,
      additional_users: [
        ...currentList.additional_users,
        email,
      ]
    }

    if (!email || email === '') {
      alert('You must enter an email address');
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      alert('Email address is invalid');
      return;
    }

    if (currentList.additional_users.find(e => e === email)) {
      alert("You've already added this user");
      return;
    }

    if (email === currentUser) {
      alert('You already have access to this list because you created it');
      return;
    }

    // We use connect's shallow comparison here to our advantage. Connect won't re-render
    // the component so we do it with setState, keeping the modal open for a good UX.
    editList(updatedList);
    this.setState({ currentList: updatedList });
  }

  handleRemoveUser = email => {
    const { editList, user: { email: currentUser } } = this.props;
    const { currentList } = this.state;
    const updatedList = {
      ...currentList,
      additional_users: currentList.additional_users.filter(e => e !== email),
    };

    const prompt = (email === currentUser)
      ? 'Are you sure you want to remove your own access to this list?'
      : `Are you sure you want to remove the user ${email}?`

    if (!window.confirm(prompt)) {
      return;
    }

    // We use connect's shallow comparison here to our advantage. Connect won't re-render
    // the component so we do it with setState, keeping the modal open for a good UX.
    editList(updatedList);
    this.setState({ currentList: updatedList });
  }

  render() {
    const { loadingText, errored, user, lists } = this.props;
    const { currentList, showSaveModal, showUserModal, modalAction } = this.state;

    if (errored) {
      return <Error />;
    }

    if (loadingText) {
      return <Loading message={loadingText} />;
    }

    if (!lists) {
      return null;
    }

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
            currentUser={user?.email}
            handleUsers={() => this.handleUsers(list.id)}
            handleEdit={() => this.handleEdit(list.id)}
            handleDelete={() => this.handleDelete(list.id)} />
        ))}
        <div className='max-w-screen-sm mx-auto'>
          <Footer />
        </div>

        <SaveModal
          isOpen={showSaveModal}
          action={modalAction}
          entity={currentList}
          entityType='List'
          handleInputChange={evt => {
            currentList.name = evt.target.value;
            this.setState({ currentList });
          }}
          handleSubmit={this.handleModalSubmit}
          handleCancel={() => this.closeModals()} />
        <UserModal
          isOpen={showUserModal}
          list={currentList}
          handleInputChange={evt => {
            currentList.name = evt.target.value;
            this.setState({ currentList });
          }}
          handleAdd={this.handleAddUser}
          handleRemove={this.handleRemoveUser}
          handleClose={() => this.closeModals()} />
      </div>
    );
  }
}

Lists.propTypes = {
  loadingText: PropTypes.string,
  errored: PropTypes.bool.isRequired,
  lists: PropTypes.array,
  user: PropTypes.object,
  getLists: PropTypes.func.isRequired,
  createList: PropTypes.func.isRequired,
  editList: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
};

const mapToProps = ({ loadingText, errored, lists, user }) => ({
  loadingText,
  errored,
  lists,
  user,
  // listNames is used to get around the shallow comparison of this object and
  // re-render if a list name changes.
  listNames: btoa(lists?.map(l => l.name)),
});

export default connect(mapToProps, actions)(Lists);
