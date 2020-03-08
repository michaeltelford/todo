import React from 'react';

class Add extends React.Component {
  submitHandler = (evt) => {
    evt.preventDefault();

    const nameInput = document.getElementById('input_add_name');
    const newTodo = {
      name: nameInput.value,
      done: false,
    };

    this.props.callback(newTodo);
    nameInput.value = '';
  }

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <input id='input_add_name' type='text' />
        <input id='input_add_submit' type='submit' value='Add' />
      </form>
    );
  }
}

export default Add;
