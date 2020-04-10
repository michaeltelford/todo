import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const handleSubmit = (evt, textInput, callback) => {
  evt.preventDefault();

  const nameInput = textInput.current;
  const newTodo = {
    name: nameInput.value,
    done: false,
  };

  callback(newTodo);
  nameInput.value = '';
}

function AddTodo(props) {
  const { callback } = props;
  const textInput = useRef(null);

  return (
    <form onSubmit={evt => handleSubmit(evt, textInput, callback)}>
      <input className='inputAddName' type='text' ref={textInput} />
      <input className='inputAddSubmit' type='submit' value='Add' />
    </form>
  );
}

AddTodo.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default AddTodo;
