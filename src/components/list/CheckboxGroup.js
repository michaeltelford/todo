import React from 'react';
import PropTypes, { shape, string, bool } from 'prop-types';
import Checkbox from './checkbox/Checkbox';

function CheckboxGroup(props) {
  const { type, todos, handleToggle, handleDelete, handleEdit } = props;

  return (
    <div data-cy={type} className='xl:w-1/2'>
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
  type: PropTypes.oneOf(['todos-done', 'todos-not-done']),
  todos: PropTypes.arrayOf(shape({
    name: string,
    done: bool,
  })).isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

CheckboxGroup.defaultProps = {
  type: 'todos-not-done',
};

export default CheckboxGroup;
