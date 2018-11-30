import React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'

import configureStore from './configureStore'
import { fetchAndStoreAccessToken } from './services/auth'
import App from './containers/App'

import './index.css'

// Fetch and store the Spotify access token in localStorage
/*
Put this back in package.json scripts
,
    "precommit": "npm run lint",
    "prepush": "npm run lint && npm run build" */
fetchAndStoreAccessToken()

const initialState = {}
const history = createHistory()
const store = configureStore(initialState, history)
const MOUNT_NODE = document.getElementById('app')

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  MOUNT_NODE
)
