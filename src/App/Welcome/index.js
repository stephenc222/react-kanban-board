import React, { Component } from 'react'
import WelcomeView from './WelcomeView'
class Welcome extends Component {
  constructor(props) {
    super(props)

    this.onTextChange = this.onTextChange.bind(this)
    this.focusEmailInput = this.focusEmailInput.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      email: '',
      password: '',
    }
  }

  componentDidMount() {
    this.emailInput.focus()
  }

  onSubmit() {
    const {
      email,
      password
    } = this.state

    this.props.createUser({email, password})
  }

  onTextChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  focusEmailInput(elem) {
    this.emailInput = elem
  }
  
  render () {
    const {
      email,
      password
    } = this.state
    return (
      <WelcomeView
        password={password}
        focusEmailInput={this.focusEmailInput}
        email={email}
        onTextChange={this.onTextChange}
        onSubmit={this.onSubmit}
      />
    )
  }
}

export default Welcome