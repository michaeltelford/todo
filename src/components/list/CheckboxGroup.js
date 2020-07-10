import React from 'react';
import PropTypes, { shape, string, bool } from 'prop-types';
import Checkbox from './checkbox/Checkbox';

function CheckboxGroup(props) {
  const { todos, toggleCallback, removeCallback, handleEdit } = props;

  return (
    todos.map((todo, i) => {
      return (
        <Checkbox
          key={i}
          name={todo.name}
          checked={todo.done}
          toggleCallback={toggleCallback}
          removeCallback={removeCallback}
          handleEdit={handleEdit} />
      );
    })
  );
}

CheckboxGroup.propTypes = {
  todos: PropTypes.arrayOf(shape({
    name: string,
    done: bool,
  })).isRequired,
  toggleCallback: PropTypes.func.isRequired,
  removeCallback: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default CheckboxGroup;
