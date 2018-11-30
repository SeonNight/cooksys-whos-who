import React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'

import configureStore from './configureStore'
import { fetchAndStoreAccessToken } from './services/auth'
import App from './containers/App'

import { loadState, saveState, removeState } from './utils/localStorage'

import 'semantic-ui-css/semantic.min.css'
import './index.css'

// Fetch and store the Spotify access token in localStorage
fetchAndStoreAccessToken()

const initialState = loadState()
const history = createHistory()
const store = configureStore(initialState, history)
const MOUNT_NODE = document.getElementById('app')

store.subscribe(() => saveState(store.getState()))

function restart() {
  removeState()
  saveState(undefined)
  location.reload()
}

function replay() {
  removeState()
  saveState({
    ...store.getState(),
    score: 0,
    game: {
      ...store.getState().game,
      guesses: store.getState().config.numLives
    }
  })
  location.reload()
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App restart={restart} replay={replay}/>
    </ConnectedRouter>
  </Provider>,
  MOUNT_NODE
)
