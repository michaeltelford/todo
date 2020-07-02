import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';

const checkboxClassNames = (checked) => {
  let classes = 'mx-3 text-xl font-bold tracking-wide leading-6 cursor-pointer';
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
  const label = useRef();

  /* We use a custom label with a sexy checkbox image using a hard-coded height,
   * requiring the <p> to be outside the label (so it's natural height applies).
   * We make the <p> click perform a label.click() which toggles the checkbox.
   * It's a hack, but it's necessary to properly style the checkbox.
   */
  return (
    <div className='flex my-4'>
      <input
        type='checkbox'
        id={name}
        name={name}
        checked={checked}
        onChange={evt => handleToggle(evt.target, toggleCallback)}
        className='css-checkbox' />
      <label
        for={name}
        ref={label}
        className='css-label' />
      <p
        className={checkboxClassNames(checked)}
        onClick={() => label.current.click()}>
        {name}
      </p>
      <button
        className='px-4 py-0 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-xl ml-auto'
        style={{height: 27}}
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
