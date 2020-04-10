import React from 'react';
import PropTypes from 'prop-types';

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

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  toggleCallback: PropTypes.func.isRequired,
  removeCallback: PropTypes.func.isRequired,
};

Checkbox.defaultProps = {
  checked: false,
};

export default Checkbox;
