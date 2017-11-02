import React from 'react'
import './index.css'

const ProjectEditorView = (props) => {
  return (
    <div className='project-editor-view__container'>
      ProjectEditorView
      <div>
        <input
          type='text'
          onChange={props.onProjectTitleChange}
          value={props.projectTitle}
          name='projectTitle'
        />
      </div>  
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}

export default ProjectEditorView