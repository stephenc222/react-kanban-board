import React from 'react'
import Card from '../Card'
import './index.css'


const Lane = (props) => {

  const renderCards = (cardData, index) => {
    cardData.laneType = props.laneData.laneTitle
    return (
      <div key={index} className='lane-card-container'>
        <Card
          moveCard={props.moveCard}  
          onEditCard={props.onEditCard}
          cardData={cardData}
          cardIndex={index}
          laneIndex={props.laneIndex}
        />  
      </div>  
    )
  }
  return (
    <div className='lane-container'>
      <div className='lane-title'>
        {props.laneData.laneTitle}  
      </div>  
      <div className='lane-content-container'>
        {props.laneData.cards && props.laneData.cards.map(renderCards)}
      </div>
    </div>
  )
}

export default Lane