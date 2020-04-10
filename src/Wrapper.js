import React from 'react';
import { Link } from 'react-router-dom';
import { handleLogout } from './Auth';

function Wrapper(props) {
  const { api } = props;

  return (
    <>
      <h1>
        <Link to='/lists'>TODO Checklist</Link>
      </h1>
      { props.children }
      <a href="#" onClick={(evt) => {
        evt.preventDefault();
        handleLogout(api);
      }}>Logout</a>
    </>
  );
}

export default Wrapper;
