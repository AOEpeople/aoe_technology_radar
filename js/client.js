import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'

const appReducer = (state = {}, action) => {
  return state;
}

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__TECHRADAR__;

// Allow the passed state to be garbage-collected
delete window.__TECHRADAR__;

// Create Redux store with initial state
const store = createStore(appReducer, preloadedState)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
