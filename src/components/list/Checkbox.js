import React from 'react';

const handleToggle = (target, toggleCallback) => {
  const toggledTodo = {
    name: target.name,
    done: target.checked,
  };

  toggleCallback(toggledTodo);
}

function Checkbox(props) {
  const { name, checked, toggleCallback, removeCallback } = props;

  return (
    <>
      <div>
        <label>
          <input
            type='checkbox'
            name={name}
            checked={checked}
            onChange={evt => handleToggle(evt.target, toggleCallback)} />
          {' ' + name + ' '}
        </label>
        <button
          className='inputRemoveTodo'
          onClick={() => removeCallback({ name: name })}>
          X
        </button>
      </div>
      <br />
    </>
  );
}

export default Checkbox;
