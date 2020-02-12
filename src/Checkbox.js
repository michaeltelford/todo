import React from 'react';

class Checkbox extends React.Component {
  render() {
    return (
      <>
        <input type='checkbox' name={this.props.name}
          checked={this.props.checked} onChange={this.toggleHandler} />
        <label>{this.props.name}</label>
        <button onClick={this.removeHandler}>X</button>
      </>
    );
  }

  toggleHandler = () => {
    let toggledTodo = this.getTodo();
    toggledTodo.done = !toggledTodo.done;

    this.props.toggleCallback(toggledTodo);
  }

  removeHandler = () => {
    const obsoleteTodo = this.getTodo();

    this.props.removeCallback(obsoleteTodo);
  }

  getTodo = () => {
    return {
      name: this.props.name,
      done: this.props.checked,
    }
  }
}

export default Checkbox;
