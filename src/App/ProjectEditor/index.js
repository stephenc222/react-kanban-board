import React, { Component } from 'react'
import ProjectEditorView from './ProjectEditorView'
class ProjectEditor extends Component {
  constructor(props) {
    super(props)
    this.onProjectTitleChange = this.onProjectTitleChange.bind(this)
    this.state = {
      nextProject: {},
      projectTitle: ''
    }
  }

  onProjectTitleChange(e) {
    this.setState({projectTitle: e.target.value })
  }

  addLane() {
    // TODO: adds a lane
  }

  removeLane() {
    // TODO: removes a lane
  }

  goToProject() {
    const projectId = this.state.nextProject._id
    this.props.goToProject({ projectId })
  }

  render () {
    return (
      <ProjectEditorView
        nextProject={this.state.nextProject}
        projectTitle={this.state.projectTitle}
        onProjectTitleChange={this.onProjectTitleChange}
        {...this.props}  
      />
    )
  }
}

export default ProjectEditor