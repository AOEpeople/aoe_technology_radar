import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {assetUrl} from '../common/config'

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
  return renderFullPage(html, pageTitle, preloadedState, pageName);
}

const renderFullPage = (html, pageTitle, preloadedState, pageName) => {
  return `
  <html>
    <head>
      <meta charset="utf-8">
      <title>${pageTitle} | Haufe Technology Radar</title>
      <link rel="stylesheet" href="${assetUrl('css/styles.css')}"/>
      <link rel="stylesheet" href="https://d1azc1qln24ryf.cloudfront.net/114779/Socicon/style-cf.css?c2sn1i">
      <link rel="shortcut icon" href="${assetUrl('favicon.ico')}" type="image/x-icon">
      <meta name="format-detection" content="telephone=no">
      <meta name="viewport" content="width=device-width, maximum-scale=1.0, initial-scale=1.0, user-scalable=0">
      <meta property="og:title" content="${pageTitle} | Haufe Technology Radar" />
      <meta property="og:image" content="${assetUrl('haufe-logo.jpg')}" />
      <script type="text/javascript">
        window.emos3 = {
          defaults : {
            siteid : 'tech-radar'
          },
          stored : [],
          send : function(p){this.stored.push(p);}
        };
      </script>
    </head>
    <body>
      <script type="text/javascript" src="${assetUrl('lib/emos3.js')}" async="async"></script>
      <div id="root">${html}</div>
      <script>
        window.__TECHRADAR__ = ${JSON.stringify(preloadedState)}
      </script>
      <script src="${assetUrl('js/bundle.js')}"></script>
    </body>
  </html>
    `
}
