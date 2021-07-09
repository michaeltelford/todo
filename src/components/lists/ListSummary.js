import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Hr from '../Hr';

function ListSummary({ list, handleEdit, handleDelete }) {
  const { id, name, todos } = list;
  const numItems            = todos.length;
  const numItemsTodo        = todos.filter(todo => !todo.done).length;

  return (
    <div data-cy={name} id={id} key={id}>
      <div className='flex mb-3'>
        <span className='flex-grow mr-3'>
          <Link to={`/list/${id}`} className='text-xl font-semibold underline tracking-wide hover:text-indigo-800'>
            {name}
          </Link>
        </span>
        <span className='flex-none'>
          <FontAwesomeIcon data-cy='edit' icon={faEdit} onClick={() => handleEdit(id)}
            className='cursor-pointer mr-4 text-blue-600 hover:text-blue-700' />
          <FontAwesomeIcon data-cy='delete' icon={faTrashAlt} onClick={() => handleDelete(id)}
            className='cursor-pointer mr-3 text-red-600 hover:text-red-700' />
        </span>
      </div>
      <div>
        <p>{`${numItems} items (with ${numItemsTodo} still to do)`}</p>
        <p>Created by you on 12/07/2021</p>
        <Hr />
      </div>
    </div>
  );
}

ListSummary.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    todos: PropTypes.array,
  }).isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ListSummary;
