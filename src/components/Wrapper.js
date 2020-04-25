import React from 'react';
import { Link } from 'react-router-dom';
import { handleLogout } from './Auth';

function Wrapper(props) {
  return (
    <>
      <h1>
        <Link to='/lists'>TODO Checklist</Link>
      </h1>
      {props.children}
      {localStorage.getItem('token') && (
        <button onClick={handleLogout}>
          Logout
        </button>
      )}
    </>
  );
}

export default Wrapper;
