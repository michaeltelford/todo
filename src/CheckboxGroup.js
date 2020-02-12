import React from 'react';
import Checkbox from './Checkbox';

class CheckboxGroup extends React.Component {
  render() {
    return (
      <>
        {this.props.todos.map(todo => {
          return (
            <>
              <Checkbox name={todo.name} checked={todo.done}
                toggleCallback={this.props.toggleCallback}
                removeCallback={this.props.removeCallback} />
              <br />
            </>
          )
        })}
      </>
    );
  }
}

export default CheckboxGroup;
