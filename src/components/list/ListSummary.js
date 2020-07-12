import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ListSummary(props) {
  const { numTodos, numTodosDone } = props;

  return (
    <div className='flex'>
      <small className='hover:text-indigo-800 text-md font-medium tracking-wide underline'>
        <Link to='/lists'>{'<< Lists'}</Link>
      </small>
      <small className='ml-auto text-md font-medium tracking-wide'>
        {numTodosDone} / {numTodos} Done
      </small>
    </div>
  );
}

ListSummary.propTypes = {
  numTodos: PropTypes.number.isRequired,
  numTodosDone: PropTypes.number.isRequired,
};

export default ListSummary;
