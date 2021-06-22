import React from 'react';

const CONTACT_EMAIL = 'michael.telford@live.com';

function Contact() {
  return (
    <a
      className='text-gray-800 hover:text-indigo-800 text-lg font-medium tracking-wide underline'
      href={`mailto:${CONTACT_EMAIL}`}>
        Contact
    </a>
  );
}

export default Contact;
