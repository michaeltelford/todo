import React from 'react';
import Logout from './Logout';
import Contact from './Contact';

function Footer() {
  return (
    <div className='flex justify-between'>
      <div className='mr-3'>
        <Logout />
      </div>
      <Contact />
    </div>
  );
}

export default Footer;
