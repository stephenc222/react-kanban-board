import React from 'react'
import {
  Link
} from 'react-router-dom'

const LinkButton = (props) => {
  return (
    <Link to={props.routerPath}>
      <input type='button' value={props.label} />
    </Link>
  )
}

export { LinkButton }