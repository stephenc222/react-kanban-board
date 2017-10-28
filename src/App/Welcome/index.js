import React, { Component } from 'react'
class Welcome extends Component {
  constructor(props) {
    super(props)

    this.onTextChange = this.onTextChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      username: '',
      email: ''
    }
  }

  onSubmit() {
    const {
      username,
      email
    } = this.state

    this.props.createUser({username, email})
  }

  onTextChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  render () {
    return (
      <div>
        Create an account
        <div>
          <label>  
            username  
            <input
              type='text'
              name='username'
              onChange={this.onTextChange}
              value={this.state.username} />
          </label>  
        </div>
        <div>
          <label>
            Email    
            <input
              type='text'
              name='email'
              onChange={this.onTextChange}
              value={this.state.email} />
          </label>
          <div>
            <input type='button' onClick={this.onSubmit} value='Create'/>  
          </div>  
        </div>
      </div>
    )
  }
}

export default Welcome