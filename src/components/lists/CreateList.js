import React from 'react';
import PropTypes, { object } from 'prop-types';
import { MAX_LISTS } from '../../constants';
import { buildEmptyList } from '../../store/initialState';

function CreateList({ lists, handleNew }) {
  return (
    <div>
      <p className='mb-3'>You have access to {lists.length} / {MAX_LISTS} lists</p>
      {lists.length < MAX_LISTS && (
        <p>
          <button
            onClick={() => handleNew(buildEmptyList())}
            className='text-gray-800 hover:text-indigo-800 text-lg font-medium tracking-wide underline'>Create</button> a new list
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
