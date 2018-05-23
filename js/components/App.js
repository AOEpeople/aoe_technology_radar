import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import actions from '../actions';
import Header from './Header';
import Footer from './Footer';
import Router from './Router';

function App(props) {
  return (
    <div>
      <div className="page">
        <div className="page__header">
          <Header {...props} />
        </div>
        <div
          className={classNames('page__content', { 'is-faded': props.isFaded })}
        >
          <Router {...props} />
        </div>
        <div className="page__footer">
          <Footer {...props} />
        </div>
      </div>
    </div>
  );
}

export default connect(
  ({ items, releases, pageName, pageState }) => ({
    items,
    releases,
    pageName,
    pageState,
  }),
  actions,
)(App);
