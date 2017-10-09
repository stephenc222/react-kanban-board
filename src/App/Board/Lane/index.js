import React from 'react'
import Card from '../Card'
import './index.css'


const Lane = (props) => {

  const renderCards = (cardData, index) => {
    cardData.laneType = props.laneData.laneTitle
    return (
      <div key={index} style={{border: '1px solid magenta', padding: 5}}>
        <Card
          moveCard={props.moveCard}  
          cardData={cardData}
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
        {props.laneData.cards.map(renderCards)}
      </div>
    </div>
  )
}

export default Lane