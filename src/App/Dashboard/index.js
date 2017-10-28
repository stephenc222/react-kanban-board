import React, { Component } from 'react'
import { LinkButton } from '../Components'
import './index.css'
class Dashboard extends Component {
  render () {
    return (
      <div className='dashboard-main-container'>
        <h3>Dashboard</h3>
        <LinkButton
          label='Project'
          routerPath='/1234/project'
        />
        <div>
          <pre>{JSON.stringify(this.props, null, 2)}</pre>  
        </div>  
      </div>
    )
  }
}

export default Dashboard