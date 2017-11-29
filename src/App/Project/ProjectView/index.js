import React from 'react'
import './index.css'

const ProjectView = (props) => {
  const goBack = (e) => {
    props.showEditor 
    ? props.showBoard(e)
    : props.goToDashboard({}) 
  }
  return (
    <div className="project">
      <div className='project-main-container'>
        <div className='header-container'>
          <div className='header'>
            <div className='back-button'>
              <button onClick={goBack}>Back</button>
            </div>
            <div className='title'>{props.projectTitle}</div>
          </div>
        </div>
        { props.children }
      </div>
    </div>
  )
}

export default ProjectView