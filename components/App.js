import React from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Router from './Router';

function App(props) {
  return (
    <div className="js--body">
      <div className="page">
        <div className="page__header">
          <Header />
        </div>
        <div className="page__content">
          <Router {...props} />
        </div>
        <div className="page__footer">
          <div className="branding">
            <span className="branding__logo"><img src="/assets/logo.svg"/></span>
            <div className="branding__content"><span className="footnote">AOE is a leading provider of Enterprise Open Source web solutions.
              Using current agile development methods, more than 250+ developers
              and consultants in 8 global locations develop customized Open Source
              solutions for global companies and corporations.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(({ items, releases, pageName }) => ({ items, releases, pageName }))(App);
