import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'redux-zero/react';
import { handleLogout } from './Auth';

function Logout({ currentUser }) {
  if (localStorage.getItem('token')) {
    return (
      <div>
        <button
          onClick={handleLogout}
          className='text-gray-800 hover:text-indigo-800 text-lg font-medium tracking-wide underline'>
            Logout
        </button>
        {' '}
        ({currentUser})
      </div>
    );
  }

  return null;
}

Logout.propTypes = {
  currentUser: PropTypes.string,
};

const mapToProps = ({ user }) => ({
  currentUser: user?.email,
});

export default connect(mapToProps, null)(Logout);
