import React from 'react';

class Add extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <input id='name' type='text' />
        <input type='submit' value='Add' />
      </form>
    );
  }

  submitHandler = evt => {
    evt.preventDefault();

    const nameInput = document.getElementById('name');
    const newTodo = {
      name: nameInput.value,
      done: false,
    };
    nameInput.value = '';

    this.props.callback(newTodo);
  }
}

export default Add;
