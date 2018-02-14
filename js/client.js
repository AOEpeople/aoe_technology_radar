import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import App from './components/App';
import appReducer from './reducer';
import actions, { NAVIGATE } from './actions';
import {isMobileViewport} from '../common/config'
//import {track} from './analytics';
import {track} from './econda';

// Remove .html and map / to index
const getPageNameFromPath = (path) => {
  if (path === '/') {
    return 'index';
  }
  return path.substring(1, path.length - 5);
};

const historyManager = store => {
  const history = createHistory({
    basename: '/techradar'
  });

  // If browser-back button is pressed, provide new pageName to store
  history.listen((location, action) => {
    if (action === 'POP') {
      const pageName = getPageNameFromPath(location.pathname);
      store.dispatch(actions.navigate(pageName, false))
    }
  });

  return next => action => {
    if(action.type === NAVIGATE && action.pushToHistory === true) {
      window.scrollTo(0, 0);
      history.push(`/${action.pageName}.html`);
    }
    return next(action);
  }
};

let reloadTimeout;
let wasMobileViewport = isMobileViewport();
window.addEventListener('resize', function () {
  clearTimeout(reloadTimeout);
  reloadTimeout = setTimeout(() => {
    if (wasMobileViewport != isMobileViewport()) window.location.reload();
  }, 200);
});

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__TECHRADAR__;

// Allow the passed state to be garbage-collected
delete window.__TECHRADAR__;

// Create Redux store with initial state
const store = createStore(appReducer, preloadedState, applyMiddleware(historyManager))

const handleSetTitle = (title) => {
  document.title = `${title} | Haufe Technology Radar`;
  track();
};

render(
  <Provider store={store}>
    <App onSetTitle={handleSetTitle} />
  </Provider>,
  document.getElementById('root')
)
