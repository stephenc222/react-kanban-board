import React from 'react'
import './index.css'

const WelcomeView = (props) => {
  return (
    <div className='welcome-page-main-container'>
      <div className='welcome-page-content-container'>
        <div className='welcome-page-form-header'>React Kanban</div>
        <div className='welcome-page-input-container'>
          <div className='welcome-page-input--email'>
            <div>  
              Email 
            </div> 
            <div>
              <input
                type='text'
                ref={props.focusEmailInput}
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
                ref={props.getPasswordRef}
                type='password'
                style={{minWidth: '190px', minHeight: '24px'}}
              />
            </div>
          </div>
          <div className='welcome-page-input--submit'>
            <button onClick={props.onSubmit}>
              Create Account
            </button>  
          </div>  
        </div>
      </div>
    </div>
  )
}

export default WelcomeView