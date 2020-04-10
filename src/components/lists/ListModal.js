import React from 'react';
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
    <Modal isOpen={isOpen} style={modalStyles}>
      <h2>{`${createList ? 'Create' : 'Edit'} List`}</h2>
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

export default ListModal;
