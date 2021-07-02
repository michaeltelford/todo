import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'redux-zero/react';
import { withRouter } from 'react-router-dom';
import actions from '../store/actions';
import Header from './Header';

function Wrapper({ children, title }) {
  return (
    <div style={{ minWidth: 230 }} className='p-3'>
      <Header title={title} />
      { children }
    </div>
  );
}

Wrapper.propTypes = {
  title: PropTypes.string,
};

const mapToProps = ({ lists }, ownProps) => {
  const { id: urlId } = ownProps.match.params; // from withRouter()
  let list;

  // Find the list being displayed by the child component.
  if (lists && urlId) {
    list = lists.find(l => l.id.toString() === urlId);
  }

  return { title: list?.name };
}

export default withRouter(connect(mapToProps, actions)(Wrapper));
