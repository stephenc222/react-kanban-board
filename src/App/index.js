import React from 'react'
import MasterContainer from './MasterContainer'
import {
  BrowserRouter as Router,
} from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <MasterContainer/>    
    </Router>
  )
}

export default App