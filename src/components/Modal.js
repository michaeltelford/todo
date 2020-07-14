import React from 'react';
import PropTypes, { string } from 'prop-types';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

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
 * Modal can be used to create a new (empty) list, or edit the name of an
 * existing list or todo item.
 */
function Modal(props) {
  const {
    isOpen, action, entity, entityType, handleInputChange, handleSubmit, handleCancel,
  } = props;

  return (
    <ReactModal isOpen={isOpen} onRequestClose={handleCancel} style={modalStyles}>
      <h2 className='mb-4 font-semibold'>{action} {entityType}</h2>
      <form>
        <input
          data-cy='modal-input'
          type='text'
          value={entity?.name || ''}
          onChange={handleInputChange}
          className='mb-4 border-2 border-gray-400 rounded-md'
        />
        <br />
        <button onClick={(evt) => {
          evt.preventDefault();
          handleSubmit();
        }} className='mr-1 px-5 py-1 bg-blue-500 hover:bg-blue-700 text-white uppercase tracking-wider rounded-md shadow-xl'>
          Save
        </button>
        <button onClick={(evt) => {
          evt.preventDefault();
          handleCancel();
        }} className='px-5 py-1 text-gray-700 hover:text-indigo-800 text-lg font-medium tracking-wide underline'>
          Cancel
        </button>
      </form>
    </ReactModal>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  action: PropTypes.oneOf(['Create', 'Edit']),
  entity: PropTypes.shape({
    name: string,
  }),
  entityType: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  isOpen: false,
  action: 'Create',
  entity: null,
  entityType: 'List',
};

export default Modal;
