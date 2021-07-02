import React from 'react';
import { handleLogout } from './Auth';

function Logout() {
  if (localStorage.getItem('token')) {
    return (
      <button
        onClick={handleLogout}
        className='text-gray-800 hover:text-indigo-800 text-lg font-medium tracking-wide underline'>
        Logout
      </button>
    );
  }

  return null;
}

export default Logout;
