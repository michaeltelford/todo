import React from 'react';
import { handleLogout } from './Auth';

function Logout() {
  if (localStorage.getItem('token')) {
    return (
      <div className='max-w-screen-sm mx-auto'>
        <button
          onClick={handleLogout}
          className='text-gray-800 hover:text-indigo-800 text-lg font-medium tracking-wide underline'>
          Logout
        </button>
      </div>
    );
  }
  return null;
}

export default Logout;
