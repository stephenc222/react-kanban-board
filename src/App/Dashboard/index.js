import React, { Component } from 'react'
import './index.css'
class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.renderProjectsList = this.renderProjectsList.bind(this)
    this.state = {
      userProjects: []
    }
  }

  componentDidMount() {
    if (this.props.userProjects.length !== this.state.userProjects.length) {
      this.props.getAllUserProjects()
        .then((userProjects) => {
          this.setState({ userProjects })
      })
    }
  }

  renderProjectsList(project, index) {
    return (
      <div key={index} className='project-list-item__container'>
        <div>
          {project.projectTitle}
        </div>
        <div>
          <input
            type='button'
            value='Go To Project'
            onClick={() => this.props.goToProject({ projectId: project._id })}/>
        </div>  
      </div>  
    )
  }
  render() {

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
          {this.state.userProjects && this.state.userProjects.map(this.renderProjectsList)}
        </div>  
        <div>
          <pre>{JSON.stringify({ ...this.props }, null, 2)}</pre>  
        </div>  
      </div>
    )
  }
}

export default Dashboard