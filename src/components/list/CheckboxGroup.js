import React from 'react';
import PropTypes, { shape, string, bool } from 'prop-types';
import Checkbox from './checkbox/Checkbox';

function CheckboxGroup(props) {
  const { todos, handleToggle, handleDelete, handleEdit } = props;

  return (
    <div className='xl:w-1/2'>
      {todos.map((todo, i) => {
        return (
          <Checkbox
            key={i}
            name={todo.name}
            checked={todo.done}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
            handleEdit={handleEdit} />
        );
      })}
    </div>
  );
}

CheckboxGroup.propTypes = {
  todos: PropTypes.arrayOf(shape({
    name: string,
    done: bool,
  })).isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default CheckboxGroup;
