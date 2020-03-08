import React from 'react';

class Checkbox extends React.Component {
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
    const { name, checked } = this.props;

    return {
      name: name,
      done: checked,
    }
  }

  render() {
    const { name, checked } = this.props;

    return (
      <div>
        <label>
          <input type='checkbox' name={name}
            checked={checked} onChange={this.toggleHandler} />
          {' ' + name + ' '}
        </label>
        <input class='input_remove_todo' type='button' value='X'
          onClick={this.removeHandler} />
      </div>
    );
  }
}

export default Checkbox;
