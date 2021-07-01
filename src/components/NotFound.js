import React from 'react';
import Header from './Header';

function NotFound() {
  return (
    <>
      <Header />
      <p className='text-center'>Page not found. Click <a className='underline hover:text-indigo-800' href='/'>here</a> to return to the home page.</p>
    </>
  );
}

export default NotFound;
