import React from 'react';
import PropTypes, { number, string } from 'prop-types';
import { Link } from 'react-router-dom';

function ListSummary(props) {
  const { list, handleEdit, handleDelete } = props;
  const numItems     = list.todos.length;
  const numItemsTodo = list.todos.filter(todo => !todo.done).length;

  return (
    <div id={list.id} key={list.id}>
      <span>
        <Link to={`/list/${list.id}`}>
          <strong>{list.name}</strong>
        </Link>
        {' '}
        <button onClick={(evt) => {
          const { id } = evt.target.parentElement.parentElement;
          handleEdit(id);
        }}>Edit</button>
        {' '}
        <button onClick={(evt) => {
          const { id } = evt.target.parentElement.parentElement;
          handleDelete(id);
        }}>Delete</button>
      </span>
      <p>{`${numItems} items (with ${numItemsTodo} still to do)`}</p>
      <hr />
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
