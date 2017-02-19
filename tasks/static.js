import { outputFile } from 'fs-extra';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { distPath } from './file';
import App from '../components/App';

const appReducer = (state = {}, action) => {
  return state;
}

export const renderApp = (radar, pageName) => {
  // Create a new Redux store instance
  const store = createStore(appReducer, {
    ...radar,
    pageName
  });

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  // Grab the initial state from our Redux store
  const preloadedState = store.getState()

  // Send the rendered page back to the client
  const fullHtml = renderFullPage(html, preloadedState);

  // Save file
  save(fullHtml, pageName);
}

const renderFullPage = (html, preloadedState) => {
  return `
  <html>
    <head>
      <title>AOE Technology Radar - AOE Tech Radar</title>
      <link rel="stylesheet" href="/styles.css"/>
    </head>
    <body>
      <div id="root">${html}</div>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
      </script>
      <script src="/bundle.js"></script>
    </body>
  </html>


    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>

        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

const save = (html, pageName) => (
  new Promise((resolve, reject) => (
    outputFile(distPath(`${pageName}.html`), html, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  ))
);
