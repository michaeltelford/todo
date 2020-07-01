import React from 'react';
import { Link } from 'react-router-dom';
import { handleLogout } from './Auth';

function Wrapper(props) {
  return (
    <div className='p-3' style={{minWidth: 230}}>
      <h1 className='my-4 text-center text-3xl font-light tracking-widest'>
        <Link to='/lists'>
          TODO Checklist
        </Link>
      </h1>
      {props.children}
      {localStorage.getItem('token') && (
        <button onClick={handleLogout} className='text-gray-800 hover:text-indigo-800 text-lg font-medium tracking-wide underline'>
          Logout
        </button>
      )}
    </div>
  );
}

export default Wrapper;
