import React from 'react';
import PropTypes, { string } from 'prop-types';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const modalStyles = {
  content: {
    top:         '30%',
    left:        '50%',
    right:       'auto',
    bottom:      'auto',
    marginRight: '-50%',
    transform:   'translate(-50%, -50%)',
  },
};

/*
 * ListModal is a modal that can be used to create a new (empty) list, or edit
 * the name of an existing list.
 */
function ListModal(props) {
  const {
    isOpen, createList, currentList, setCurrentList, submitModal, cancelModal,
  } = props;
  const action = createList ? 'Create' : 'Edit';

  return (
    <Modal isOpen={isOpen} onRequestClose={cancelModal} style={modalStyles}>
      <h2 className='mb-4 font-semibold'>{action} List</h2>
      <form>
        <input
          type='text'
          value={currentList?.name || ''}
          onChange={(evt) => {
            currentList.name = evt.target.value;
            setCurrentList(currentList);
          }} className='mb-4 border-2 border-gray-400 rounded-md'
        />
        <br />
        <button onClick={(evt) => {
          evt.preventDefault();
          submitModal();
        }} className='mr-1 px-5 py-1 bg-blue-500 hover:bg-blue-700 text-white uppercase tracking-wider rounded-md shadow-xl'>
          Save
        </button>
        <button onClick={(evt) => {
          evt.preventDefault();
          cancelModal();
        }} className='px-5 py-1 text-gray-700 hover:text-indigo-800 text-lg font-medium tracking-wide underline'>
          Cancel
        </button>
      </form>
    </Modal>
  );
}

ListModal.propTypes = {
  isOpen: PropTypes.bool,
  createList: PropTypes.bool,
  currentList: PropTypes.shape({
    name: string,
  }),
  setCurrentList: PropTypes.func.isRequired,
  submitModal: PropTypes.func.isRequired,
  cancelModal: PropTypes.func.isRequired,
};

ListModal.defaultProps = {
  isOpen: false,
  createList: true,
  currentList: null,
};

export default ListModal;
