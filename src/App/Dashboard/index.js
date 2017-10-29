import React, { Component } from 'react'
import './index.css'
class Dashboard extends Component {
  render () {
    return (
      <div className='dashboard-main-container'>
        <h3>Dashboard</h3>
        <div>
          <input
            type='button'
            onClick={this.props.createUserProject}
            value='New Project' />
        </div>
        <div>
          <pre>{JSON.stringify({ ...this.props }, null, 2)}</pre>  
        </div>  
      </div>
    )
  }
}

export default Dashboard