import React, { Component } from 'react'
import ProjectEditorView from './ProjectEditorView'
import RandomId from 'random-id'
class ProjectEditor extends Component {
  constructor(props) {
    super(props)
    this.onProjectLaneTitleChange = this.onProjectLaneTitleChange.bind(this)
    this.onProjectTitleChange = this.onProjectTitleChange.bind(this)
    this.onNewProjectLaneTitleChange = this.onNewProjectLaneTitleChange.bind(this)
    this.addLane = this.addLane.bind(this)
    this.removeLane = this.removeLane.bind(this)
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
    this.setState({ 
      nextProject, 
      projectTitle 
    }, () => {
      this.props.updateUserProject({ project: nextProject })
      .catch(e => console.error('updateUserProject on ProjectEditor error:', {e}))
    })
  }

  onProjectLaneTitleChange({e, laneIndex}) {
    const nextProject = this.state.nextProject
    nextProject.lanes[laneIndex].laneTitle = e.target.value
    this.setState({ nextProject }, () => {
      this.props.updateUserProject({ project: nextProject })
      .catch(e => console.error('updateUserProject on ProjectEditor error:', {e}))
    })
  }

  onNewProjectLaneTitleChange(e) {
    this.setState({newLaneTitle: e.target.value})
  }

  addLane(e) {
    const {
      nextProject,
      newLaneTitle
    } = this.state

    if (!newLaneTitle) {
      window.alert('You need a lane title before adding a lane!')
      return
    }
    const nextLane = {
      laneTitle: newLaneTitle,
      cards: [
        {
          _id: RandomId(),
          title: 'placeholder card text',
          summary: 'placeholder card summary',
          isPlaceholderCard: true
        }
      ]
    }
    nextProject.lanes.push(nextLane)
    this.setState({ 
      nextProject, 
      newLaneTitle: '' 
    }, () => {
      this.props.updateUserProject({ project: nextProject })
      .catch(e => console.error('updateUserProject on ProjectEditor error:', {e}))
    })
  }

  removeLane({e, lane, laneIndex}) {
    const {
      nextProject,
    } = this.state

    nextProject.lanes.splice(laneIndex, 1)

    this.setState({
      nextProject,
      newLaneTitle: ''
    }, () => {
      this.props.updateUserProject({ project: nextProject })
      .catch(e => console.error('updateUserProject on ProjectEditor error:', {e}))
    })
  }

  goToDashboard() {
    const projectId = this.state.nextProject._id
    this.props.goToDashboard({_id: projectId})
  }

  goToProject() {
    const projectId = this.state.nextProject._id
    const nextProject = this.state.nextProject

    if (!nextProject.projectTitle) {
      window.alert('You need a project title before starting a project!')
      return
    }
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
        newLaneTitle={this.state.newLaneTitle}
        onNewProjectLaneTitleChange={this.onNewProjectLaneTitleChange}
      />
    )
  }
}

export default ProjectEditor