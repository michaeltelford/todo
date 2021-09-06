import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

ReactModal.setAppElement('#root');

const modalStyles = {
  content: {
    left:        '50%',
    right:       'auto',
    bottom:      'auto',
    marginRight: '-50%',
    transform:   'translate(-50%, 30px)',
    width:       '95%',
    maxWidth:    '640px',
    maxHeight:   '80%',
    overflowY:   'auto',
  },
};

const buildListDisplayName = list => {
  const { name } = (list || {});
  const suffix = '...';
  const maxChars = (name?.split(' ')?.length === 1) ? 25 : 85;
  const maxLength = maxChars + suffix.length;

  if (!name) {
    return 'List';
  }

  if (name.length <= maxLength) {
    return name;
  }

  return `${name.substring(0, maxChars)}${suffix}`;
}

const buildUserJSX = (email, index, clickHandler) => (
  <div
    data-cy={email}
    key={`${index}_${email}`}
    className='flex justify-between mb-2'>
      <div className='ml-2 mr-3 break-all'>
        {email}
      </div>
      <FontAwesomeIcon
        data-cy='delete-user'
        icon={faTrashAlt}
        onClick={evt => {
          evt.preventDefault();
          clickHandler(email);
        }}
        className='cursor-pointer mt-1 mr-3 text-red-600 hover:text-red-700' />
  </div>
);

/*
 * UserModal can be used to add or remove a list's additional users.
 */
function UserModal(props) {
  const { isOpen, list, handleAdd, handleRemove, handleClose } = props;
  const users = (list?.additional_users || []);
  const textInput = useRef(null);

  return (
    <ReactModal isOpen={isOpen} onRequestClose={handleClose} style={modalStyles}>
      <h2 className='mb-4 font-semibold'>Share {buildListDisplayName(list)}</h2>
      <form className='flex flex-col'>
        <div className='flex mb-5'>
          <input
            data-cy='user-email'
            type='email'
            placeholder='Email address'
            ref={textInput}
            className='flex-grow min-w-0 mr-1 py-1 border-2 border-gray-400 rounded-sm' />
          <button
            type='submit'
            className=
            'flex-none px-4 py-1 bg-blue-500 text-white uppercase tracking-wider rounded-sm shadow-s leading-8 hover:bg-blue-700'
            onClick={evt => {
              evt.preventDefault();
              const email = textInput.current.value;
              textInput.current.value = '';
              handleAdd(email);
            }}>
              Add
          </button>
        </div>
        <div className='mb-2'>
          {
            (users.length > 0)
              ? users.map((user, i) => buildUserJSX(user, i, handleRemove))
              : <p className='ml-2 mb-2'>This list isn't shared with anyone</p>
          }
        </div>
        <button
          onClick={handleClose}
          className='px-2 py-1 uppercase tracking-wider rounded-md shadow-s underline hover:bg-gray-400 hover:no-underline'
          style={{ width: '85px' }}>
            Close
        </button>
      </form>
    </ReactModal>
  );
}

UserModal.propTypes = {
  isOpen: PropTypes.bool,
  list: PropTypes.object,
  handleAdd: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

UserModal.defaultProps = {
  isOpen: false,
  list: null,
};

export default UserModal;
