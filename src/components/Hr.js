import React from 'react';
import PropTypes from 'prop-types';

function Hr({ className }) {
  let classNameString = 'border-l my-5 sm:my-6';

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
