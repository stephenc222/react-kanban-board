import React, { Component } from 'react'
import './index.css'
class StyleButton extends Component {
  constructor(props) {
    super(props)
    this.onToggle = (e) => {
      e.preventDefault()
      this.props.onToggle(this.props.style)
    }
  }

  render() {
    let className = 'styleButton'
    if (this.props.active) {
      className += ' activeButton'
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    )
  }
}

export default StyleButton