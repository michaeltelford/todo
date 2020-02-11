import React from 'react';

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <input type='checkbox' name={this.props.name} value={this.props.name}
          onClick={this.clickHandler} checked={this.props.checked} />
        <label for={this.props.name}>{this.props.name}</label>
      </>
    );
  }

  clickHandler = evt => {
    const el = evt.target;
    const updatedTodo = {
      name: el.name,
      done: el.checked,
    };

    this.props.callback(updatedTodo);
  }
}

export default Checkbox;
