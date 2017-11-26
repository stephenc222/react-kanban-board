import React from 'react'
import './index.css'

const DashboardView = (props) => {

  const renderProjectItemLanes = (lane, index) => {
    return (
      <div key={index} className='project-list-item-lane-item-container'>
        <div className='project-list-item-lane-status-container'>
          <div className='project-list-item-lane-card-count-text'>
            {lane.cards.filter(card => !card.isPlaceholderCard).length}
          </div>
          <div className={`project-list-item-lane-name-text project-list-item-lane-name-text--palette${index + 1}`}>
            {lane.laneTitle}
          </div>
        </div>
      </div>
    )
  }

  const renderProjectItem = (project, index) => {
    const goToProject = () => {
      return props.goToProject({projectId: project._id, currentProject: project})
    }
    return (
      <div key={index} onClick={goToProject} className='project-list-item'>
        <div className='project-list-item-header-container'>
          <div className='project-list-item-project-name-text'>{project.projectTitle}</div>
          <div className='project-list-item-last-status-change-container'>
            <div className='project-list-item-last-status-change-text'>Last change in status:</div>
            <div className='project-list-item-last-status-change-date'>{project.lastUpdated}</div>
          </div>
        </div>
        
        <div className='project-list-item-lanes-container'>
          { project.lanes.map(renderProjectItemLanes)}
        </div>
      </div>
    )
  }
  return (
    <div className='app-container'>
      <div className='project-list-container'>
        <div className='project-list-header-container'>
          <div className='project-list-header-text'>My Projects</div>
          <div className='project-list-header-project-count'>{props.userProjects.length}</div>    
        </div>
        <div className='project-toolbar-container'>
          <button onClick={props.addNewProject} className='new-project-button'>
            <span role='img' aria-label='add project'>➕</span> Project
          </button>
        </div>
        <div className='project-list-items-container'>
          <div>
            { props.userProjects.map(renderProjectItem) }
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardView