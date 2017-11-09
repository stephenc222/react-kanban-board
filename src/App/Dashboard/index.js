import React, { Component } from 'react'
import './index.css'
class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayProjects: []
    }
  }

  componentWillMount() {
    const { projects: projectIds } = this.props.userProfile
    this.props.getAllUserProjects({ projectIds }).then(displayProjects => {
      this.setState({displayProjects})
    })
  }

  renderProjectsList(project, index) {
    return (
      <div key={index} className='project-list-item__container'>
        {project.projectTitle}
      </div>  
    )
  }
  render() {
    if (!this.state.displayProjects.length) {
      return (
        <div>
          Getting projects...
        </div>  
      )
    }
    return (
      <div className='dashboard-main-container'>
        <h3>Dashboard</h3>
        <div>
          <input
            type='button'
            onClick={this.props.addNewProject}
            value='New Project' />
        </div>
        <div className='user-project-list__container'>
          {this.state.displayProjects.map(this.renderProjectsList)}
        </div>  
        <div>
          <pre>{JSON.stringify({ ...this.props }, null, 2)}</pre>  
        </div>  
      </div>
    )
  }
}

export default Dashboard