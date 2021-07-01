import React from 'react';

function Wrapper({ children }) {
  return (
    <div style={{ minWidth: 230 }} className='p-3'>
      {children}
    </div>
  );
}

export default Wrapper;
