import React from 'react'
import './index.css'

const DashboardView = (props) => {

  const renderProjectsList = (project, index) => {

    const goToProject = (event) => {
      event.stopPropagation()
      return props.goToProject({ projectId: project._id })
    }
    
    return (
      <div key={index} className='project-list-item__container'>
        <div>
          {project.projectTitle}
        </div>
        <div>
          <input
            type='button'
            value='Go To Project'
            onClick={goToProject}/>
        </div>  
      </div>  
    )
  }

  return (
    <div className='dashboard-main-container'>
      <h3>Dashboard</h3>
      <div>
        <input
          type='button'
          onClick={props.addNewProject}
          value='New Project' />
      </div>
      <div className='user-project-list__container'>
        {props.userProjects && props.userProjects.map(renderProjectsList)}
      </div>  
      <div>
        <pre>{JSON.stringify({ ...props }, null, 2)}</pre>  
      </div>  
    </div>
  )
}

export default DashboardView