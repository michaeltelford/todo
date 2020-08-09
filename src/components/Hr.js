import React from 'react';
import PropTypes from 'prop-types';

function Hr(props) {
  let classNameString = 'border-l my-5 sm:my-6';
  const { className } = props;

  if (className && className.length > 0) {
    classNameString += (' ' + className);
  }

  return (
    <hr className={classNameString} />
  );
}

Hr.propTypes = {
  className: PropTypes.string,
};

Hr.defaultProps = {
  className: '',
};

export default Hr;
