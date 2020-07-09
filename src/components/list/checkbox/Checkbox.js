import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './Checkbox.css';

const checkboxClassNames = (checked) => {
  let classes = 'flex-grow mx-3 text-xl font-bold tracking-wide leading-6 cursor-pointer';
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

const handleEdit = () => {
  console.log('TODO: Edit TODO item');
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
        htmlFor={name}
        ref={label}
        className='css-label' />
      <p
        className={checkboxClassNames(checked)}
        onClick={() => label.current.click()}>
        {name}
      </p>
      <FontAwesomeIcon icon={faEdit} onClick={handleEdit}
        className='cursor-pointer mr-4 text-blue-600 hover:text-blue-700' />
      <FontAwesomeIcon icon={faTrashAlt} onClick={() => removeCallback({ name })}
        className='cursor-pointer mr-3 text-red-600 hover:text-red-700' />
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
