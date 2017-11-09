import React from 'react'
import './index.css'


const ProjectEditorView = (props) => {
  const renderLanesVisual = (lane, index) => {
    return (
      <div key={index} style={{ border: '1px solid red' }}>
        {lane.laneTitle}
        <div>
          <input
          type='button'  
          onClick={(e) => props.removeLane(e, lane, index)}
          value='Remove Lane'/>  
        </div>  
      </div>  
    )
  }
  return (
    <div className='project-editor-view__container'>
      <div>
      <input
        type='button'
        onClick={props.goToDashboard}
        value={"Back to Dashboard"}
      />
      </div>  
      New Project
      <div>
        <label>  
          Project Title: &nbsp;
          <input
            type='text'
            onChange={props.onProjectTitleChange}
            value={props.projectTitle}
          />
        </label>  
      </div>  
      <div>
        <input
          type='button'
          value={'Start Project'}
          onClick={() => props.goToProject({
            projectId: props.nextProject._id,
            currentProject: props.nextProject
          })}
        />  
      </div>  
      <div>
        Lanes:  
      </div>  
      <div>
        <div>
          <input
            type='button'  
            onClick={props.addLane}
            value='Add Lane'/>
        </div>  
      </div>  
      <div>
        {props.nextProject.lanes.map(renderLanesVisual)}
      </div>  
      <pre>{JSON.stringify(props.nextProject, null, 2)}</pre>
    </div>
  )
}

export default ProjectEditorView