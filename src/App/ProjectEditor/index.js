import React, { Component } from 'react'
import ProjectEditorView from './ProjectEditorView'
class ProjectEditor extends Component {
  constructor(props) {
    super(props)
    this.onProjectTitleChange = this.onProjectTitleChange.bind(this)
    this.goToProject = this.goToProject.bind(this)
    this.state = {
      nextProject: {},
      projectTitle: ''
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

  addLane(e) {
    // TODO: adds a lane, but first reveals a text input for naming the lane
    console.warn('addLane')
  }

  removeLane(e, lane, index) {
    // TODO: removes a lane
    console.warn('removeLane:', {lane, index})
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
        onProjectTitleChange={this.onProjectTitleChange}
        projectTitle={this.state.projectTitle}
        addLane={this.addLane}
        removeLane={this.removeLane}
      />
    )
  }
}

export default ProjectEditor