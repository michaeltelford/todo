import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Hr from '../Hr';

function ListSummary(props) {
  const { currentUser, list, handleUsers, handleEdit, handleDelete } = props;
  const { id, name, todos, user_email, user_name, created_on } = list;
  const owner = (currentUser === user_email) ? 'you' : user_name;
  const numItemsTodo = todos.filter(todo => !todo.done).length;

  return (
    <div data-cy={name} id={id} key={id}>
      <div className='flex mb-3'>
        <span className='flex-grow mr-3'>
          <Link
            to={`/list/${id}`}
            className='text-xl font-semibold underline tracking-wide hover:text-indigo-800'>
              {name}
          </Link>
        </span>
        <span className='flex-none'>
          <FontAwesomeIcon data-cy='users' icon={faUserPlus} onClick={() => handleUsers(id)}
            className='cursor-pointer mr-4 text-blue-600 hover:text-blue-700' />
          <FontAwesomeIcon data-cy='edit' icon={faEdit} onClick={() => handleEdit(id)}
            className='cursor-pointer mr-4 text-blue-600 hover:text-blue-700' />
          <FontAwesomeIcon data-cy='delete' icon={faTrashAlt} onClick={() => handleDelete(id)}
            className='cursor-pointer mr-3 text-red-600 hover:text-red-700' />
        </span>
      </div>
      <div>
        <p>{todos.length} items (with {numItemsTodo} still to do)</p>
        <p>Created by {owner} on {new Date(created_on).toDateString()}</p>
        <Hr />
      </div>
    </div>
  );
}

ListSummary.propTypes = {
  currentUser: PropTypes.string,
  list: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    todos: PropTypes.array,
    additional_users: PropTypes.array,
  }).isRequired,
  handleUsers: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ListSummary;
