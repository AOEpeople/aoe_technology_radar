import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/App';
import appReducer from './reducer';

export const renderPage = (radar, pageName) => {
  // Create a new Redux store instance
  const store = createStore(appReducer, {
    ...radar,
    pageName,
    pageState: {},
  });

  let pageTitle;

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <App onSetTitle={(title) => { pageTitle = title; }} />
    </Provider>
  )

  // Grab the initial state from our Redux store
  const preloadedState = store.getState()

  // Send the rendered page back to the client
  return renderFullPage(html, pageTitle, preloadedState);
}

const renderFullPage = (html, pageTitle, preloadedState) => {
  return `
  <html>
    <head>
      <title>${pageTitle} | AOE Technology Radar</title>
      <link rel="stylesheet" href="/styles.css"/>
      <link rel="stylesheet" href="https://d1azc1qln24ryf.cloudfront.net/114779/Socicon/style-cf.css?c2sn1i">
      <meta property="og:title" content="${pageTitle} | AOE Technology Radar" />
      <meta property="og:image" content="/assets/logo.svg" />
    </head>
    <body>
      <div id="root">${html}</div>
      <script>
        window.__TECHRADAR__ = ${JSON.stringify(preloadedState)}
      </script>
      <script src="/bundle.js"></script>
    </body>
  </html>
    `
}
