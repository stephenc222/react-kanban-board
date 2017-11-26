import React from 'react'
import './index.css'


const ProjectEditorView = (props) => {

  const renderProjectLanes = (lane, index) => {
    const onProjectLaneTitleChange = (e) => {
      return props.onProjectLaneTitleChange({e, laneIndex: index})
    }

    const removeLane = (e) => {
      return props.removeLane({e, lane, laneIndex: index})
    }

    return (
      <div key={index} className='lane-container'>
        <div className='edit-lane'>
          <div className='remove-lane-container'>
            <div onClick={removeLane} className='remove-lane'>X</div>
          </div>
          <div>
            <input onChange={onProjectLaneTitleChange} value={lane.laneTitle}/>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='project-editor-top-container'>
      <div className='content-container'>
        <div className='header'>
          <div className='back-button'>
            <button onClick={props.goToDashboard}>Back</button>
          </div>
          <div className='title'>Edit Project</div>
        </div>
        <div className='main-content'>
          <div className='project-content'>
            <div className='project-controls'>
              <div className='project-title'>
                <label>
                  Project Name:
                  <input type='text' />
                </label>
              </div>
              <div className='add-lane-container'>
                <label>
                  Lane Name:
                  <input type='text' />
                </label>
                <button onClick={props.addLane}>
                  add lane
                </button>
              </div>
              <div className='go-to-project'>
                <button>
                  Go To Project
                </button>
              </div>
            </div>
            <div className='project-lanes-container'>
              <div className='project-lanes-container-header'>Project Lanes</div>
              { props.nextProject.lanes.map(renderProjectLanes)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectEditorView