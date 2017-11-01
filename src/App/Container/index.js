import React, { Component } from 'react'
import RandomID from 'random-id'
import { Route, Redirect, withRouter } from 'react-router-dom'
import Project from '../Project'
import ProjectEditor from '../ProjectEditor'
import Welcome from '../Welcome'
import Dashboard from '../Dashboard'
import api from './api'

class Container extends Component {
  constructor(props) {
    super(props)
    this.onGetUserSuccess = this.onGetUserSuccess.bind(this)
    this.onGetUserError = this.onGetUserError.bind(this)
    
    this.createUser = this.createUser.bind(this)
    this.onCreateUserError = this.onCreateUserError.bind(this)
    this.onCreateUserSuccess = this.onCreateUserSuccess.bind(this)
    
    this.addNewProject = this.addNewProject.bind(this)
    this.onCreateUserProjectSuccess = this.onCreateUserProjectSuccess.bind(this)
    this.onCreateUserProjectError = this.onCreateUserProjectError.bind(this)
    
    this.state = {
      userProfile: undefined,
      masterPath: '/'
    }
  }

  onCreateUserSuccess(e) {
    // successfully created a new user
    console.log('onCreateSuccess', { e })
    let masterPath = this.state.masterPath
    const userProfile = {}

    userProfile._id = e.target.result
    masterPath += `${userProfile._id}`

    this.setState({ userProfile, masterPath }, () => {
      api.getUser(this.onGetUserError, this.onGetUserSuccess)
    })
  }


  onCreateUserError(e) {
    console.log('onCreateError', {e})
  }


  onGetUserError(e) {
    console.log('onGetError:', { e })
    return undefined
    
  }

  onGetUserSuccess(e) {
    if (e.target.result.length) {
      console.log('onGetSuccess', {e})
      console.log('result:', e.target.result)
      const userProfile = e.target.result[0]
      const masterPath = `/${userProfile._id}`
  
      this.setState({ userProfile, masterPath })
    }
  }
  
  componentDidMount() {
    api.getUser(this.onGetUserError, this.onGetUserSuccess)
  }

  createUser({ username, email }) {
    api.createUser(
      { username, email },
      this.onCreateUserError,
      this.onCreateUserSuccess
    )
  }

  addNewProject() {
    this.setState({
      masterPath: `${this.state.masterPath}/create-project/${RandomID()}`
    })
  }

  onCreateUserProjectError(e) {
    console.error('onCreateUserProjectError', {e})
  }

  onCreateUserProjectSuccess(e) {
    console.log('onCreateUserProjectSuccess', {e})
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
          return (
            <Welcome
              createUser={this.createUser}
            />
          )
        }
        }/>
        <Route exact path={'/:userId'} component={() => {
          return (
            <Dashboard
              userProfile={this.state.userProfile}  
              addNewProject={this.addNewProject}
            />
          )
        }} />
        <Route exact path={'/:userId/create-project/:projectId'} component={() => {
          return (
            <ProjectEditor/>
          )
        }} />
        <Route exact path={'/:userId/project-board/:projectId'} component={() => {
          return (
            <Project/>
          )
        }} />  
      </div>  
    )
  }
}

export default withRouter(Container)