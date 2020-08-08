import React from 'react';
import { Link } from 'react-router-dom';

function Wrapper(props) {
  return (
    <div style={{ minWidth: 230 }} className='p-3'>
      <h1 className='text-center font-light tracking-widest text-3xl my-8 sm:text-4xl sm:my-10 lg:my-12 xl:text-5xl'>
        <Link to='/lists'>
          TODO Checklist
        </Link>
      </h1>
      {props.children}
    </div>
  );
}

export default Wrapper;
