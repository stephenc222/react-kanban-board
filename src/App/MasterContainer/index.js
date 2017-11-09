import React, { Component } from 'react'
import RandomID from 'random-id'
import { Route, Redirect, withRouter } from 'react-router-dom'
import Project from '../Project'
import ProjectEditor from '../ProjectEditor'
import Welcome from '../Welcome'
import Dashboard from '../Dashboard'
import api from './api'

window.api = api
class MasterContainer extends Component {
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
    this.onGetUserProjectSuccess = this.onGetUserProjectSuccess.bind(this)
    this.onGetUserProjectError = this.onGetUserProjectError.bind(this)

    this.removeNewProject = this.removeNewProject.bind(this)
    this.onRemoveUserProjectSuccess = this.onRemoveUserProjectSuccess.bind(this)
    this.onRemoveUserProjectError = this.onRemoveUserProjectError.bind(this)
    // navigation
    this.goToProject = this.goToProject.bind(this)
    this.goToDashboard = this.goToDashboard.bind(this)
    
    this.state = {
      userProfile: undefined,
      nextProject: {},
      currentProject: {},
      masterPath: '/'
    }
  }

  getAllUserProjects({ projectIds }) {
    // api.getAllUserProjects({})
    return Promise.resolve([ { projectTitle: 'project One'}, { projectTitle: 'project Two'}])
    // return Promise.all(projectIds.map(projectId => {
    //   return api.getUserProject({ _id: projectId }, (e) => {
    //     return Promise.reject({e})
    //   }, (e) => {
    //     return Promise.resolve({e})
    //   })
    // }))
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
    if (!api) {
      window.alert('Your browser does not support IndexedDB. So get a newer one!')
      return
    }
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
    const { _id } = {...this.state.userProfile}
    const nextProjectId = RandomID()
    api.createUserProject({
      nextProjectId,
      userId: _id
    }, this.onCreateUserProjectError, this.onCreateUserProjectSuccess)
  }

  removeNewProject({ _id }) {
    api.removeUserProject({ _id }, this.onRemoveUserProjectError, this.onRemoveUserProjectSuccess)
  }

  onCreateUserProjectError(e) {
    console.error('onCreateUserProjectError', {e})
  }

  onRemoveUserProjectError(e) {
    console.error('onCreateUserProjectError', {e})
  }

  onRemoveUserProjectSuccess(e) {
    console.log('onRemoveUserProjectSuccess', { e })
    const userProfile = this.state.userProfile
    const removedProjectId = this.state.removedProjectId
    
    userProfile.projects.splice(userProfile.projects.indexOf(removedProjectId), 1)
    this.setState({
      userProfile,
    }, () => {
      api.updateUser({
        userProfile,
      }, this.onUpdateUserProfileError, this.onUpdateUserProfileSuccess  )
    })
  }
  
  onCreateUserProjectSuccess(e) {
    console.log('onCreateUserProjectSuccess', {e})
    const nextProjectId = e.target.result

    this.setState({ nextProjectId }, () => {   
      api.getUserProject({
        projectId: nextProjectId
      }, this.onGetUserProjectError, this.onGetUserProjectSuccess)
    })

  }

  onGetUserProjectSuccess(e) {
    console.log('onGetUserProjectSuccess', { e })
    const nextProjectId = this.state.nextProjectId
    const nextProject = e.target.result
    const userProfile = this.state.userProfile

    userProfile.projects.push(nextProjectId)

    this.setState({
      nextProject,
      userProfile,
      masterPath: `${this.state.masterPath}/create-project/${nextProjectId}`,
    }, () => {
      api.updateUser({
        userProfile,
      }, this.onUpdateUserProfileError, this.onUpdateUserProfileSuccess  )
    })

  }

  goToProject({ projectId, currentProject }) {
    this.setState({
      masterPath: `/${this.state.userProfile._id}/project-board/${projectId}`,
      currentProject
    })
  }

  goToDashboard({_id = null}) {
    console.warn('going back to dashboard')

    this.setState({
      masterPath: `/${this.state.userProfile._id}`,
      removedProjectId: _id
    }, () => {
      if (_id) {
        this.removeNewProject({_id})
      }
    })
  }

  onUpdateUserProfileError(e) {
    console.error('onUpdateUserProfileError', {e})
  }

  onUpdateUserProfileSuccess(e) {
    console.log('onUpdateUserProfileSuccess', {e})
  }

  onGetUserProjectError(e) {
    console.error('onGetUserProjectError', {e})
  }

  render() {

    console.log(this.props)

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
              goToProject={this.goToProject}
              getAllUserProjects={this.getAllUserProjects}
            />
          )
        }} />
        <Route exact path={'/:userId/create-project/:projectId'} component={() => {
          return (
            <ProjectEditor
              goToDashboard={this.goToDashboard}
              nextProject={this.state.nextProject}
              goToProject={this.goToProject}              
            />
          )
        }} />
        <Route exact path={'/:userId/project-board/:projectId'} component={() => {
          return (
            <Project
              currentProject={this.state.currentProject}
              goToDashboard={this.goToDashboard}
            />
          )
        }} />  
      </div>  
    )
  }
}

export default withRouter(MasterContainer)