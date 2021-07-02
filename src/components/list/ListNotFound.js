import React from 'react';
import PropTypes from 'prop-types';
import NotFound from '../NotFound';

function ListNotFound({ id }) {
  return (
    <>
      <p className='text-center'>{`Can't find the list with ID: ${id}`}</p>
      <NotFound />
    </>
  );
}

ListNotFound.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ListNotFound;
