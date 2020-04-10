import React from 'react';
import Checkbox from './Checkbox';

function CheckboxGroup(props) {
  const { todos, toggleCallback, removeCallback } = props;

  return (
    todos.map((todo, i) => {
      return (
        <Checkbox
          key={i}
          name={todo.name}
          checked={todo.done}
          toggleCallback={toggleCallback}
          removeCallback={removeCallback} />
      );
    })
  );
}

export default CheckboxGroup;
