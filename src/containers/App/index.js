import React from 'react'
import { Route } from 'react-router-dom'

import Header from '../../components/Header'
import Home from '../Home'
import Game from '../Game'

const App = (props) => (
  <div>
    <Route path='/' component={Header} />
    <Route exact path='/' component={() => <Home restart={props.restart}/>} />
    <Route exact path='/Game' component={() => <Game restart={props.replay}/>} />
  </div>
)

export default App
