import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Hr from '../Hr';

function ListSummary({ list, handleEdit, handleDelete }) {
  const numItems     = list.todos.length;
  const numItemsTodo = list.todos.filter(todo => !todo.done).length;

  return (
    <div data-cy={list.name} id={list.id} key={list.id}>
      <div className='flex mb-3'>
        <span className='flex-grow mr-3'>
          <Link to={`/list/${list.id}`} className='text-xl font-semibold underline tracking-wide hover:text-indigo-800'>
            {list.name}
          </Link>
        </span>
        <span className='flex-none'>
          <FontAwesomeIcon data-cy='edit' icon={faEdit} onClick={() => handleEdit(list.id)}
            className='cursor-pointer mr-4 text-blue-600 hover:text-blue-700' />
          <FontAwesomeIcon data-cy='delete' icon={faTrashAlt} onClick={() => handleDelete(list.id)}
            className='cursor-pointer mr-3 text-red-600 hover:text-red-700' />
        </span>
      </div>
      <div>
        <p>{`${numItems} items (with ${numItemsTodo} still to do)`}</p>
        <Hr />
      </div>
    </div>
  );
}

ListSummary.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ListSummary;
