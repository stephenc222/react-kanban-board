import React from 'react'
import Lane from './Lane'
import './index.css'

// Board renders Lanes which each are a dropTarget
const Board = (props) => {
  const renderLane = (laneData, index) => {
    return (
      <div key={index} className='lane-wrapper-container'>
        <Lane
          moveCard={props.moveCard}  
          laneData={laneData}
        />  
      </div>
    )
  }
  return (
    <div className='board-container'>
      {props.lanes.map(renderLane)}
    </div>
  )
}

export default Board