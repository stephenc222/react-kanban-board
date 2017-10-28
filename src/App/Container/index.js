import React, { Component } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import Project from '../Project'
import Welcome from '../Welcome'
import Dashboard from '../Dashboard'
import api from './api'

class Container extends Component {
  constructor(props) {
    super(props)
    this.onGetSuccess = this.onGetSuccess.bind(this)
    this.onCreateSuccess = this.onCreateSuccess.bind(this)
    this.onGetError = this.onGetError.bind(this)
    this.onCreateError = this.onCreateError.bind(this)
    this.createUser = this.createUser.bind(this)
    this.state = {
      userProfile: undefined,
      masterPath: '/'
    }
  }

  onCreateSuccess(e) {
    // successfully created a new user
    console.log('onCreateSuccess', { e })
    const userProfile = {}
    userProfile._id = e.target.result
    let masterPath = this.state.masterPath
    masterPath += `${userProfile._id}`
    this.setState({userProfile, masterPath})
  }

  onCreateError(e) {
    console.log('onCreateError', {e})
  }


  onGetError(e) {
    console.log('onGetError:', { e })
    return undefined
    
  }

  onGetSuccess(e) {
    if (e.target.result.length) {
      console.log('onGetSuccess', {e})
      console.log('result:', e.target.result)
      const userProfile = e.target.result[0]
      const masterPath = `/${userProfile._id}`
  
        this.setState({ userProfile, masterPath })
    }
  }
  
  componentDidMount() {
    api.getUser(this.onGetError, this.onGetSuccess)
  }

  createUser({ username, email }) {
    api.createUser({username, email}, this.onCreateError, this.onCreateSuccess)
  }
  
  render() {

    if (this.state.masterPath !== this.props.history.location.pathname) {
      return (
        <Redirect to={this.state.masterPath} push />
      )
    }

    return (
      <div>
        <Route exact path={'/'} component={() => {
          return (<Welcome
            createUser={this.createUser}
          />)
        }
        }/>
        <Route exact path={'/:userId'} component={Dashboard}/>
        <Route exact path={'/:userId/:projectId'} component={Project}/>  
      </div>  
    )
  }
}

export default withRouter(Container)