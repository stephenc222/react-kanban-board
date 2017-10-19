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
          routerPath='/project'
        />
      </div>
    )
  }
}

export default Dashboard