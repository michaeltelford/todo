import React from 'react';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';
import { appendBreakClass } from '../utils';

function Header({ title }) {
  return (
    <h1 className={
        appendBreakClass('max-w-screen-sm mx-auto text-center font-light tracking-widest text-3xl my-6 sm:text-4xl sm:my-8 lg:my-10', title)
      }>
      <Link to='/lists'>
        { title }
      </Link>
    </h1>
  );
}

Header.propTypes = {
  title: string,
};

Header.defaultProps = {
  title: 'TODO Checklist',
};

export default Header;
