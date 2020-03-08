import React from 'react';
import Checkbox from './Checkbox';

function CheckboxGroup(props) {
  const { todos, toggleCallback, removeCallback } = props;

  return (
    <>
      {todos.map(todo => {
        return (
          <>
            <Checkbox name={todo.name} checked={todo.done}
              toggleCallback={toggleCallback}
              removeCallback={removeCallback} />
            <br />
          </>
        )
      })}
    </>
  );
}

export default CheckboxGroup;
