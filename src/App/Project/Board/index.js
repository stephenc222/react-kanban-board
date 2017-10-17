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
          laneIndex={index}
          onEditCard={props.onEditCard}
        />  
      </div>
    )
  }
  return (
    <div className='board-main-container'>
      <div className='board-controls-container'>
        <div className='board-controls--sort-control'>
          Sort By:&nbsp;
          <label>  
            <input 
              type="radio" 
              name="sortType"   
              value="leastComplex"
              checked={props.boardControls.sortType === 'leastComplex'}                
              onChange={props.onBoardControlChange} />
            &nbsp;Least Complex&nbsp;
          </label>
          <label>
            <input 
              type="radio" 
              name="sortType"   
              value="mostComplex"
              checked={props.boardControls.sortType === 'mostComplex'}                
              onChange={props.onBoardControlChange} />
            &nbsp;Most Complex              
          </label>
        </div>
        &nbsp;           
        <div className='board-controls--search-control'>
          <label>  
            Search:&nbsp;  
            <input 
              type="text" 
              style={{width: '225px'}}
              placeholder='search card title, summary or number...'
              name="searchValue"   
              value={props.boardControls.searchValue}
              onChange={props.onBoardControlChange} />
          </label> 
          &nbsp;
          <input
            type='button'
            onClick={props.onBoardSearchReset}
            value='Reset' />
        </div>  
        <div className='board-controls--search-control'>
        </div>  
      </div>
      <div className='board-lanes-container'>
        {props.lanes.map(renderLane)}
      </div>  
    </div>
  )
}

export default Board