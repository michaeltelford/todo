import React from 'react';

class Checkbox extends React.Component {
  render() {
    return (
      <div>
        <label>
          <input type='checkbox' name={this.props.name}
          checked={this.props.checked} onChange={this.toggleHandler} />
          {' ' + this.props.name + ' '}
        </label>
        <input class='input_remove_todo' type='button' value='X'
        onClick={this.removeHandler} />
      </div>
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
