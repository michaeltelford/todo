import React from 'react';
import { Link } from 'react-router-dom';

function Wrapper(props) {
  return (
    <div style={{ minWidth: 230 }} className='p-3'>
      <h1 className='my-4 text-center text-3xl font-light tracking-widest'>
        <Link to='/lists'>
          TODO Checklist
        </Link>
      </h1>
      {props.children}
    </div>
  );
}

export default Wrapper;
