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

  return (
    <Modal isOpen={isOpen} onRequestClose={cancelModal} style={modalStyles}>
      {createList ? (<h2>Create List</h2>) : (<h2>Edit List</h2>)}
      <form>
        <input
          type='text'
          value={currentList?.name || ''}
          onChange={(evt) => {
            currentList.name = evt.target.value;
            setCurrentList(currentList);
          }}
        />
        <button onClick={(evt) => {
          evt.preventDefault();
          submitModal();
        }}>
          Save
        </button>
        <button onClick={(evt) => {
          evt.preventDefault();
          cancelModal();
        }}>
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
