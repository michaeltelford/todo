import React from 'react';

function Wrapper(props) {
  return (
    <>
      <h1>TODO Checklist</h1>
      { props.children }
    </>
  );
}

export default Wrapper;
