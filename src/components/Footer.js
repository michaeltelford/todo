import React from 'react';
import Logout from './Logout';
import Contact from './Contact';

function Footer() {
  return (
    <div className='flex justify-between'>
      <Logout />
      <Contact />
    </div>
  );
}

export default Footer;
