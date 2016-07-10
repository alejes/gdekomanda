import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import Home from './Home.jsx'
import Hack from './Hack.jsx'
import HackCreate from './hack/Create.jsx'
import HackFind from './hack/Find.jsx'
import Team from './Team.jsx'

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={Home}/>
    <Route path="/geekday" component={Hack}/>
    <Route path="/geekday/create" component={HackCreate}/>
    <Route path="/geekday/find" component={HackFind}/>
    <Route path="/geekday/team/1" component={Team}/>
  </Router>
)
