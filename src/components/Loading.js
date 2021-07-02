import React from 'react';
import PropTypes from 'prop-types';

function Loading({ message }) {
  return (
    <p className='text-center'>{message}</p>
  );
}

Loading.propTypes = {
  message: PropTypes.string,
};

Loading.defaultProps = {
  message: '',
};

export default Loading;
