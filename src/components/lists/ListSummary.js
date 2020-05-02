import React from 'react';
import PropTypes, { number, string } from 'prop-types';
import { Link } from 'react-router-dom';

function ListSummary(props) {
  const { list, handleEdit, handleDelete } = props;
  const numItems     = list.todos.length;
  const numItemsTodo = list.todos.filter(todo => !todo.done).length;

  return (
    <div id={list.id} key={list.id}>
      <div className='flex'>
        <span className='w-1/2'>
          <Link to={`/list/${list.id}`}>
            <strong>{list.name}</strong>
          </Link>
        </span>
        <span className='w-1/2 text-right'>
          <button onClick={(evt) => {
            const { id } = evt.target.parentElement.parentElement;
            handleEdit(id);
          }} className='text-gray-800 text-lg font-medium tracking-wide underline'>Edit</button>
          <button onClick={(evt) => {
            const { id } = evt.target.parentElement.parentElement;
            handleDelete(id);
          }} className='text-gray-800 text-lg font-medium tracking-wide underline ml-2'>Delete</button>
        </span>
      </div>
      <div>
        <p className='mt-3'>{`${numItems} items (with ${numItemsTodo} still to do)`}</p>
        <hr className='my-4' />
      </div>
    </div>
  );
}

ListSummary.propTypes = {
  list: PropTypes.shape({
    id: number,
    name: string,
  }).isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ListSummary;
