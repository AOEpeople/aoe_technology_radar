import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions';

function Link({ pageName, children, navigate, className, style = {}}) {
  const handleClick = (e) => {
    e.preventDefault();
    navigate(pageName);
  };

  return (
    <a href={`/techradar/${pageName}.html`} onClick={handleClick} style={style} {...{ className }}>
      {children}
    </a>
  );
}

export default connect(
  undefined,
  actions
)(Link);
