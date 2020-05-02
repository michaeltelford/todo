import React from 'react';
import PropTypes, { number, string } from 'prop-types';
import { Link } from 'react-router-dom';

function ListSummary(props) {
  const { list, handleEdit, handleDelete } = props;
  const numItems     = list.todos.length;
  const numItemsTodo = list.todos.filter(todo => !todo.done).length;

  return (
    <div id={list.id} key={list.id}>
      <div className='mb-3 flex'>
        <span className='mr-3 w-full'>
          <Link to={`/list/${list.id}`} className='text-xl underline hover:text-indigo-900'>{list.name}</Link>
        </span>
        <span className='w-auto text-right flex-none'>
          <button onClick={(evt) => {
            const { id } = evt.target.parentElement.parentElement;
            handleEdit(id);
          }} className='mr-3 text-gray-800 text-lg font-medium tracking-wide underline hover:text-indigo-900'>Edit</button>
          <button onClick={(evt) => {
            const { id } = evt.target.parentElement.parentElement;
            handleDelete(id);
          }} className='text-gray-800 text-lg font-medium tracking-wide underline hover:text-indigo-900'>Delete</button>
        </span>
      </div>
      <div>
        <p>{`${numItems} items (with ${numItemsTodo} still to do)`}</p>
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
