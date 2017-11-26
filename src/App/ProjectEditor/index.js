import React, { Component } from 'react'
import ProjectEditorView from './ProjectEditorView'
class ProjectEditor extends Component {
  constructor(props) {
    super(props)
    this.onProjectLaneTitleChange = this.onProjectLaneTitleChange.bind(this)
    this.onProjectTitleChange = this.onProjectTitleChange.bind(this)
    this.goToProject = this.goToProject.bind(this)
    this.goToDashboard = this.goToDashboard.bind(this)
    this.state = {
      nextProject: {},
      projectTitle: '',
      newLaneTitle: '',
    }
  }

  componentDidMount() {
    this.setState({nextProject: this.props.nextProject})
  }

  onProjectTitleChange(e) {
    const nextProject = this.state.nextProject
    nextProject.projectTitle = e.target.value
    const projectTitle = e.target.value
    this.setState({ nextProject, projectTitle })
  }

  onProjectLaneTitleChange({e, laneIndex}) {
    const nextProject = this.state.nextProject
    nextProject.lanes[laneIndex].laneTitle = e.target.value
    this.setState({nextProject})
  }

  onNewProjectLaneTitleChange({e}) {
    this.setState({newLaneTitle: e.target.value})
  }

  addLane({e}) {
    // TODO: adds a lane, but first reveals a text input for naming the lane
    console.warn('addLane')
    // this.props.updateUserProject
  }

  removeLane({e, lane, laneIndex}) {
    // TODO: removes a lane - incorporate the api for updateUserProject here
    console.warn('removeLane:', {lane, laneIndex})
    // this.props.updateUserProject
  }

  goToDashboard() {
    const projectId = this.state.nextProject._id
    this.props.goToDashboard({_id: projectId})
  }

  goToProject() {
    const projectId = this.state.nextProject._id
    const nextProject = this.state.nextProject
    this.props.goToProject({ projectId, currentProject: nextProject })
  }

  render() {
    if (!this.state.nextProject.lanes) { 
      return (<div>setting up project editor...</div>)
    }
    return (
      <ProjectEditorView
        nextProject={this.state.nextProject}
        goToProject={this.goToProject}
        goToDashboard={this.goToDashboard}
        onProjectTitleChange={this.onProjectTitleChange}
        onProjectLaneTitleChange={this.onProjectLaneTitleChange}
        projectTitle={this.state.projectTitle}
        addLane={this.addLane}
        removeLane={this.removeLane}
      />
    )
  }
}

export default ProjectEditor