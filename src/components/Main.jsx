import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import Home from './Home.jsx'
import Hack from './Hack.jsx'

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={Home}/>
    <Route path="/geekday" component={Hack}/>
  </Router>
)
