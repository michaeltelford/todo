import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

function Loading({ message, title }) {
  return (
    <>
      <Header title={title} />
      <p className='text-center'>{message}</p>

    </>
  );
}

Loading.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string,
};

Loading.defaultProps = {
  message: '',
};

export default Loading;
