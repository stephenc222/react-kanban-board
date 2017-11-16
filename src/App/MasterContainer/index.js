import React, { Component } from 'react'
import RandomID from 'random-id'
import { Route, Redirect, withRouter, Switch } from 'react-router-dom'
import Project from '../Project'
import ProjectEditor from '../ProjectEditor'
import Welcome from '../Welcome'
import Dashboard from '../Dashboard'
import api from './api'

window.api = api
class MasterContainer extends Component {
  constructor(props) {
    super(props)
    
    this.createUser = this.createUser.bind(this)
    this.addNewProject = this.addNewProject.bind(this)
    this.removeNewProject = this.removeNewProject.bind(this)
    this.getAllUserProjects = this.getAllUserProjects.bind(this)
    // navigation
    this.goToProject = this.goToProject.bind(this)
    this.goToDashboard = this.goToDashboard.bind(this)
    
    this.state = {
      userProfile: undefined,
      userProjects: [],
      nextProject: {},
      currentProject: {},
      masterPath: '/'
    }
  }

  getAllUserProjects() {
    return api.getAllUserProjects({ userId: this.state.userProfile._id })
    .then(foundUserProjects => {
      const userProjects = foundUserProjects.map(project => { 
        const {
          _id,
          projectTitle
        } = project
        
        return {
          _id,
          projectTitle
        }
      })
      return userProjects
    })
  }
  
  componentDidMount() {
    if (!api) {
      window.alert('Your browser does not support IndexedDB. So get a newer one!')
      return
    }
    api.getUser()
    .catch(e => console.error('problem retrieving user:', {e}))
    .then(e => {
      if (e.target.result.length) {

        const userProfile = e.target.result[0]
        const masterPath = `/${userProfile._id}`
        api.getAllUserProjects({ userId: userProfile._id })
        .then(foundUserProjects => {
          const userProjects = foundUserProjects.map(project => { 
            const {
              _id,
              projectTitle
            } = project
            
            return {
              _id,
              projectTitle
            }
          })
          this.setState({ userProfile, masterPath, userProjects })
        })
      }
    })
  }

  createUser({ email, password }) {
    api.createUser({ email, password })
    .then(e => {
      api.getUser()
      .then(e => {
        if (e.target.result.length) {
          const userProfile = e.target.result[0]
          const masterPath = `/${userProfile._id}`
      
          this.setState({ userProfile, masterPath })
        }
      })
    })
  }

  addNewProject() {
    const { _id } = {...this.state.userProfile}
    const nextProjectId = RandomID()
    api.createUserProject({ nextProjectId, userId: _id })
    .then(e => {
      const nextProjectId = e.target.result
      api.getUserProject({ projectId: nextProjectId })
      .then(e => {
        const nextProject = e.target.result
        const userProfile = this.state.userProfile
    
        userProfile.projects.push(nextProjectId)
    
        this.setState({
          nextProject,
          nextProjectId,
          userProfile,
          masterPath: `${this.state.masterPath}/create-project/${nextProjectId}`,
        }, () => {
          api.updateUser({ userProfile })
        })
      })
    })
  }

  removeNewProject({ _id }) {
    api.removeUserProject({ _id })
    .then(e => {
      const userProfile = this.state.userProfile
      const removedProjectId = this.state.removedProjectId
      
      userProfile.projects.splice(userProfile.projects.indexOf(removedProjectId), 1)
      this.setState({
        userProfile,
      }, () => {
        api.updateUser({ userProfile })
        .catch((e) => console.error('problem removing project:', e))
      })
    })
  }

  goToProject({ projectId, currentProject = undefined }) {
    if (currentProject) {
      this.setState({
        masterPath: `/${this.state.userProfile._id}/project-board/${projectId}`,
        currentProject
      }, () => {
        api.updateUserProject({project: currentProject})
      })
    } else {
      api.getUserProject({ projectId })
      .then(e => {
        const currentProject = e.target.result
        
        this.setState({
          currentProject,
          nextProjectId: projectId,
          masterPath: `${this.state.masterPath}/project-board/${projectId}`,
        })
      })
    }
  }

  goToDashboard({ _id = undefined }) {
    this.setState({
      masterPath: `/${this.state.userProfile._id}`,
      removedProjectId: _id
    }, () => {
      if (_id) {
        this.removeNewProject({_id})
      }
    })
  }

  render() {

    if (this.state.masterPath !== this.props.history.location.pathname) {
      return (
        <Redirect to={this.state.masterPath} push />
      )
    }

    return (
      <Switch>
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
              userProjects={this.state.userProjects}
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
              updateUserProject={api.updateUserProject}
            />
          )
        }} />  
      </Switch>  
    )
  }
}

export default withRouter(MasterContainer)