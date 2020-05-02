import React from 'react';
import { Link } from 'react-router-dom';
import { handleLogout } from './Auth';

function Wrapper(props) {
  return (
    <div className='p-3'>
      <h1 className='py-2 text-3xl font-light'>
        <Link to='/lists'>
          TODO Checklist
        </Link>
      </h1>
      {props.children}
      {localStorage.getItem('token') && (
        <button onClick={handleLogout} className='text-gray-800 text-lg font-medium tracking-wide underline hover:text-indigo-900'>
          Logout
        </button>
      )}
    </div>
  );
}

export default Wrapper;
