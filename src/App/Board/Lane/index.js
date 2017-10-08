import React from 'react'
import { DropTarget } from 'react-dnd'  
import Card from '../Card'
import './index.css'

const laneDropSpec = {

}

function laneDropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

const Lane = (props) => {

  const renderCards = (cardData, index) => {
    console.log({cardData})
    return (
      <div key={index} style={{border: '1px solid magenta'}}>
        <Card
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
        {props.laneData.cards.map(renderCards)}
    </div>
  )
}

export default DropTarget('kanban', laneDropSpec, laneDropCollect)(Lane)