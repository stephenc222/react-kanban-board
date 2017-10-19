import React from 'react'
import Project from './Project'
import Dashboard from './Dashboard'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <div>  
        <Route exact path="/" component={Dashboard}/>
        <Route path="/project" component={Project} />
      </div>  
    </Router>
  )
}

export default App