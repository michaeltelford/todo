import React from 'react';

class Add extends React.Component {
  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <input id='add_name_input' type='text' />
        <input type='submit' value='Add' />
      </form>
    );
  }

  submitHandler = evt => {
    evt.preventDefault();

    const nameInput = document.getElementById('add_name_input');
    const newTodo = {
      name: nameInput.value,
      done: false,
    };

    this.props.callback(newTodo);
    nameInput.value = '';
  }
}

export default Add;
