import React, { Component } from 'react'
import Container from './Container'
import {
  BrowserRouter as Router,
} from 'react-router-dom'

class App extends Component {

  render() {

    return (
      <Router>
        <Container/>    
      </Router>
    )
  }
}

export default App