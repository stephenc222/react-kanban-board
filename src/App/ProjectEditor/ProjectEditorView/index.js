import React from 'react'

const ProjectEditorView = (props) => {
  return (
    <div>
      ProjectEditorView
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}

export default ProjectEditorView