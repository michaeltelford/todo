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

  return (
    <div>
      <p className='mb-3'>You've created {lists.length} out of {MAX_LISTS} lists</p>
      {lists.length < MAX_LISTS && (
        <p>
          <button onClick={() => handleNew(buildEmptyList())} className='text-gray-800 text-lg font-medium tracking-wide underline hover:text-indigo-800'>Create</button> a new list
        </p>
      )}
    </div>
  );
}

CreateList.propTypes = {
  lists: PropTypes.arrayOf(object).isRequired,
  handleNew: PropTypes.func.isRequired,
};

export default CreateList;
