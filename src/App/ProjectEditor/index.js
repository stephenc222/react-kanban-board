import React, { Component } from 'react'
import ProjectEditorView from './ProjectEditorView'
class ProjectEditor extends Component {
  render () {
    return (
      <ProjectEditorView
        props={this.props}  
      />
    )
  }
}

export default ProjectEditor