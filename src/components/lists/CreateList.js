import React from 'react';
import PropTypes, { object } from 'prop-types';

const MAX_LISTS = 5;

const buildEmptyList = () => ({
  name: '',
  todos: [{
    name: 'Add some TODOs',
    done: false,
  }],
});

function CreateList(props) {
  const { lists, handleNew } = props;

  let createNewLink = null;
  if (lists.length < MAX_LISTS) createNewLink = (
    <p>
      <button onClick={() => handleNew(buildEmptyList())}>Create</button> a new list.
    </p>
  );

  return (
    <div>
      <p>You've created {lists.length} out of {MAX_LISTS} lists.</p>
      {createNewLink}
    </div>
  );
}

CreateList.propTypes = {
  lists: PropTypes.arrayOf(object).isRequired,
  handleNew: PropTypes.func.isRequired,
};

export default CreateList;
