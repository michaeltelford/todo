import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'redux-zero/react';
import { Link, withRouter } from 'react-router-dom';
import actions from '../store/actions';

function Wrapper({ children, listName }) {
  return (
    <div style={{ minWidth: 230 }} className='p-3'>
      <h1 className='max-w-screen-sm mx-auto text-center font-light tracking-widest text-3xl my-6 sm:text-4xl sm:my-8 lg:my-10'>
        <Link to='/lists'>
          { listName || 'TODO Checklist' }
        </Link>
      </h1>
      { children }
    </div>
  );
}

Wrapper.propTypes = {
  listName: PropTypes.string,
};

const mapToProps = ({ lists }, ownProps) => {
  const { id: urlId } = ownProps.match.params; // from withRouter()
  let list;

  // Find the list being displayed by the child component.
  if (lists && urlId) {
    list = lists.find(l => l.id.toString() === urlId);
  }

  return { listName: list?.name };
}

export default withRouter(connect(mapToProps, actions)(Wrapper));
