import React from 'react';
import { Provider, connect } from "react-redux";
import renderer from 'react-test-renderer';
import { createStore, applyMiddleware } from 'redux';

import appReducer from '../js/reducer';
import Link from '../js/components/Link.js';

test('Renders a Link component', () => {
  const preloadedState = window.__TECHRADAR__;
  const store = createStore(
    appReducer,
    preloadedState,
  );
  const component = renderer.create(
    <Provider store={store}>
      <Link pageName="overview" className="icon-link">
        <span className="icon icon--overview icon-link__icon"></span>Technologies Overview
      </Link>
    </Provider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});