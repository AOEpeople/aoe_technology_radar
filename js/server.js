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
  return renderFullPage(html, preloadedState);

  // Save file
  // return save(fullHtml, pageName);
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
        window.__TECHRADAR__ = ${JSON.stringify(preloadedState)}
      </script>
      <script src="/bundle.js"></script>
    </body>
  </html>
    `
}
