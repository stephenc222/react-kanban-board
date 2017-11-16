import React from 'react'
import './index.css'

const WelcomeView = (props) => {
  return (
    <div className='welcome-page-main-container'>
      <div className='welcome-page-content-container'>
        <div>Sign Up</div>
        <div className='welcome-page-input-container'>
          <div className='welcome-page-input--email'>
            <div>  
              Email 
            </div> 
            <div>
              <input
                type='text'
                name='email'
                onChange={props.onTextChange}
                value={props.email} />
            </div>
          </div>
          <div className='welcome-page-input--password'>
            <div>
              Password   
            </div>
            <div>
              <input
                type='text'
                name='password'
                onChange={props.onTextChange}
                value={props.password} />
            </div>
          </div>
          <div className='welcome-page-input--submit'>
            <input type='button' onClick={props.onSubmit} value='Create'/>  
          </div>  
        </div>
      </div>
    </div>
  )
}

export default WelcomeView