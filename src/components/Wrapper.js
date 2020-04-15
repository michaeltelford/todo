import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context';
import { handleLogout } from './Auth';

function Wrapper(props) {
  const { api } = useContext(AppContext);

  return (
    <>
      <h1>
        <Link to='/lists'>TODO Checklist</Link>
      </h1>
      { props.children }
      <button onClick={() => handleLogout(api('/session'))}>
        Logout
      </button>
    </>
  );
}

export default Wrapper;
