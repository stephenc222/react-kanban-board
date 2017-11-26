import React, { Component } from 'react'
import DashboardView from './DashboardView'

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userProjects: []
    }
  }

  render() {

    return (
      <DashboardView
        userProfile={this.props.userProfile}
        userProjects={this.props.userProjects}
        goToProject={this.props.goToProject}
        addNewProject={this.props.addNewProject}
      />
    )
  }
}

export default Dashboard