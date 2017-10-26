import React, { Component } from 'react'
import api from './api'
import Project from './Project'
import Dashboard from './Dashboard'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

class App extends Component {

  constructor(props) {
    super(props)
    this.onGetSuccess = this.onGetSuccess.bind(this)
    this.onGetError = this.onGetError.bind(this)
    this.state = {
      user: {},
      loading: false,
    }
  }

  onGetSuccess(e) {
    console.log('onGetSuccess', {e})
    console.log('result:', e.target.result)
    const userProfile = e.target.result[1]
    return new Promise((resolve, reject) => {
      console.log('in promise:', { userProfile })
      if (!userProfile) {
        console.warn('ask to create a new user profile!')
        resolve(false)
      } else {
        resolve(userProfile)
      }
    })
    .then(user => {
      this.setState({ user })
    })
    // this.setState({
    //   _id: user._id
    // })
  }

  onCreateSuccess(e) {
    console.log('onCreateSuccess', {e})
  }

  onCreateError(e) {
    console.log('onCreateError', {e})
  }

  dummyTestDeleteUserButton() {
    
  }

  onGetError(e) {
    console.log('onGetError:', { e })
    return undefined
    
  }

  componentWillMount() {
    api.getUser(this.onGetError, this.onGetSuccess)
    // api.createUser({username: 'jackAttack24'},this.onCreateError, this.onCreateSuccess)

  }

  render() {

    if (this.state.loading) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <Router>
        <div>    
          <Route path={'/'} component={Dashboard}/>
          <Route path='/project' component={Project} />
        </div>  
      </Router>
    )
  }
}

export default App