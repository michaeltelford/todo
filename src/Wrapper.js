import React from 'react';
import { Link } from 'react-router-dom';

function Wrapper(props) {
  return (
    <>
      <h1><Link to='/lists'>TODO Checklist</Link></h1>
      { props.children }
    </>
  );
}

export default Wrapper;
