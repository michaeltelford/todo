import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const handleSubmit = (evt, textInput, handleAdd) => {
  evt.preventDefault();

  const nameInput = textInput.current;
  const newTodo = {
    name: nameInput.value,
    done: false,
  };

  handleAdd(newTodo);
  nameInput.value = '';
}

function AddTodo(props) {
  const { handleAdd } = props;
  const textInput = useRef(null);

  return (
    <form className='flex mb-4' onSubmit={evt => handleSubmit(evt, textInput, handleAdd)}>
      <input className='flex-grow min-w-0 mr-1 py-1 border-2 border-gray-400 rounded-sm' type='text' ref={textInput} />
      <button type='submit' className='flex-none px-4 py-1 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-sm shadow-xl'>
        +
      </button>
    </form>
  );
}

AddTodo.propTypes = {
  handleAdd: PropTypes.func.isRequired,
};

export default AddTodo;
