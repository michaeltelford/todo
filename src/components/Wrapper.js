import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'redux-zero/react';
import actions from '../store/actions';
import Header from './Header';

function Wrapper({ children, title, user, getUser }) {
  // We grab the current user once at the top level so it's accessible everywhere.
  useEffect(() => {
    !user && getUser();
  }, [user, getUser]);

  return (
    <div style={{ minWidth: 230 }} className='p-3'>
      <Header title={title} />
      { children }
    </div>
  );
}

Wrapper.propTypes = {
  title: PropTypes.string,
  user: PropTypes.object,
  getUser: PropTypes.func.isRequired,
};

const mapToProps = ({ user, list }) => ({
  user,
  title: list?.name,
});

export default connect(mapToProps, actions)(Wrapper);
