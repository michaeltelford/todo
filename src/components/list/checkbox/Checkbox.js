import React from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';

const checkboxClassNames = (checked) => {
  let classes = 'mx-3 text-xl font-bold tracking-wide leading-6';
  classes = checked ? classes + ' line-through' : classes;
  return classes;
}

const handleToggle = (target, toggleCallback) => {
  const toggledTodo = {
    name: target.name,
    done: target.checked,
  };

  toggleCallback(toggledTodo);
}

/* Each checkbox will only re-render if its props change. This effectively
 * caches each checkbox in the List component. Given the potentially large
 * amount of checkboxes per list, this should increase performance quite a bit.
 */
const Checkbox = React.memo(function Checkbox(props) {
  const { name, checked, toggleCallback, removeCallback } = props;

  return (
    <div className='flex my-4'>
      <input
        type='checkbox'
        id={name}
        name={name}
        checked={checked}
        onChange={evt => handleToggle(evt.target, toggleCallback)}
        className='flex-none css-checkbox' />
      <label for={name} className='flex-grow css-label'>
        <div className={checkboxClassNames(checked)}>
          {name}
        </div>
      </label>
      <button
        className='flex-none float-right px-4 py-0 bg-red-600 text-white rounded-full shadow-xl hover:bg-red-700'
        onClick={() => removeCallback({ name })}>
        X
      </button>
    </div>
  );
});

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
