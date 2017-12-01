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
    }
  }

  componentDidMount() {
    this.emailInput.focus()
  }

  onSubmit() {
    const {
      email,
    } = this.state

    window.crypto.subtle.digest(
      {
        name: "SHA-1",
      },
      new Uint8Array(this.passwordRef.value.toString().split(''))
    )
    .then(hash => {
      const password = new Uint8Array(hash)
      this.props.createUser({email, password})
    })
    .catch(err => {
      console.error(err);
    })
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
        getPasswordRef={(elem) => this.passwordRef = elem}
        focusEmailInput={this.focusEmailInput}
        email={email}
        onTextChange={this.onTextChange}
        onSubmit={this.onSubmit}
      />
    )
  }
}

export default Welcome