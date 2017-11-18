import React, { Component } from 'react'
import DashboardView from './DashboardView'

class Dashboard extends Component {
  constructor(props) {
    super(props)

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

  render() {

    return (
      <DashboardView
        userProfile={this.props.userProfile}
        userProjects={this.state.userProjects}
        goToProject={this.props.goToProject}
        addNewProject={this.props.addNewProject}
      />
    )
  }
}

export default Dashboard