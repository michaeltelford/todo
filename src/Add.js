import React from 'react';

const handleSubmit = (evt, callback) => {
  evt.preventDefault();

  const nameInput = document.getElementById('input_add_name');
  const newTodo = {
    name: nameInput.value,
    done: false,
  }

  callback(newTodo);
  nameInput.value = '';
}

function Add(props) {
  return (
    <form onSubmit={(evt) => handleSubmit(evt, props.callback)}>
      <input id='input_add_name' type='text' />
      <input id='input_add_submit' type='submit' value='Add' />
    </form>
  );
}

export default Add;
