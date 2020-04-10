import React from 'react';

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
    <p><a href='#' onClick={(evt) => {
      evt.preventDefault();
      handleNew(buildEmptyList());
    }}>Create</a> a new list.</p>
  );

  return (
    <div>
      <p>You're using {lists.length} of {MAX_LISTS} lists.</p>
      {createNewLink}
    </div>
  );
}

export default CreateList;
