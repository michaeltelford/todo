import React from 'react';
import Header from './Header';

function Error() {
  return (
    <>
      <Header />
      <p className='text-center'>An error occurred. Click <a className='underline hover:text-indigo-800' href='/'>here</a> to return to the home page.</p>
    </>
  );
}

export default Error;
