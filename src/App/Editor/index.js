import React from 'react'
import './index.css'
const Editor = (props) => {
  return (
    <div className='editor-main-container'>
      <div className='editor-content-container'> 
        <div className='editor-header-container'>  
          <div className='editor-back-title-button'>
            <div className='editor-back-button'>
              <input
                type='button'
                value='Back To Board'
                onClick={props.showBoard}
              />  
            </div>
            <div className='editor-title-input'>
              <input
                onChange={props.onCardTextChange}
                name='cardTitle'
                type='text'
                value={props.currentCard.cardTitle}
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
            name='cardSummary'  
            value={props.currentCard.cardSummary}            
            onChange={props.onCardTextChange}
          />
        </div>  
      </div>  
    </div>
  )
}

export default Editor