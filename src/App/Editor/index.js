import React from 'react'
import './index.css'
const Editor = (props) => {
  return (
    <div className='editor-main-container'>
      <div className='editor-content-container'> 
        <div className='editor-back-button'>
          <input
            type='button'
            value='Back To Board'
            onClick={props.showBoard}
          />  
        </div>  
        <div className='editor-header-container'>  
          <div className='editor-back-title-button'>
            <div className='editor-card-type-input'>
              <label>
                <input 
                  type="radio" 
                  name="type"   
                  value="userStory"
                  checked={props.currentCard.type === 'userStory'}                
                  onChange={props.onCardInputChange} />
                &nbsp;User Story  
              </label>
              <label>  
                <input 
                  type="radio" 
                  name="type" 
                  value="bug"
                  checked={props.currentCard.type === 'bug'}
                  onChange={props.onCardInputChange} />
                &nbsp;Bug    
              </label>  
            </div>  
            <div>complexity: {props.currentCard.complexity}</div>
            <div className='editor-title-input'>
              <input
                onChange={props.onCardInputChange}
                name='title'
                type='text'
                value={props.currentCard.title}
              />  
            </div>  
          </div>  
          <div className='editor-title-number-container'> 
            <div className='editor-update-button-number-container'>
              <div className='editor-update-button'>
                <input
                  type='button'
                  value='Update Card'
                  onClick={props.onUpdateCard}
                />  
              </div>  
              {`# ${props.currentCard.cardNumber}`}  
            </div>  
          </div>
        </div>  
        <div className='editor-card-summary-container'>
          <textarea
            name='summary'  
            value={props.currentCard.summary}            
            onChange={props.onCardInputChange}
          />
        </div>  
      </div>  
    </div>
  )
}

export default Editor