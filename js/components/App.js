import React from 'react';
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
        <div className="page__content">
          <Router {...props} />
        </div>
        <div className="page__footer">
          <Footer {...props} />
        </div>
      </div>
    </div>
  )
}

export default connect(
  ({ items, releases, pageName }) => ({ items, releases, pageName }),
  actions
)(App);
