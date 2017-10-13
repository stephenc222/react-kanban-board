import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import flow from 'lodash.flow'
import './index.css'

const cardDropSpec = {
  drop(props) {
    return {
      cardData: props.cardData
    }
  }
}
  
  function cardDropCollect(connect, monitor) {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }
  }
  
// Card - basic DragSource and DropTarget of entire App

const cardDragSource = {
  canDrag(props) {
    // if no cardData, prevent dragging
    return  props.cardData
  },

  isDragging(props, monitor) {

    return props.cardData
  },

  beginDrag(props, monitor, component) {
    return {
      cardData: props.cardData
    }
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return
    }

    const dragCard = monitor.getItem().cardData

    const dropCard = monitor.getDropResult().cardData
    props.moveCard(dragCard, dropCard)
  }
}


  function cardDragCollect(connect, monitor) {
    return {
      // Call this function inside render()
      // to let React DnD handle the drag events:
      connectDragSource: connect.dragSource(),
      // You can ask the monitor about the current drag state:
      isDragging: monitor.isDragging()
    }
  }
const Card = (props) => {

  let complexArr = [1,2,3,4,5]
  const renderComplexity = (complexItem) => {
    if (complexItem <= props.cardData.complexity) {
      return (
        <div key={complexItem} className='card-complexity-item--selected'/>
      )
    } else {
      return (
        <div key={complexItem} className='card-complexity-item'/>        
      )
    }
  }
  const onEditCard = (event) => {
    return props.onEditCard(event, props.cardData, props.laneIndex, props.cardIndex)
  }

  return props.connectDragSource(
    props.connectDropTarget(
      <div
        onClick={onEditCard}
        className={
          `card-container--${props.cardData.type === 'userStory' ? 'user-story' : 'bug'}`
        }>
        <div className='card-complexity-container'>
          {complexArr.map(renderComplexity)}
        </div>
        <div className='card-title-number-container'>
          <div className='card-title'>{props.cardData.title}</div>
          <div className='card-number'>{`# ${props.cardData.cardNumber}`}</div>
        </div>  
        <div className='card-summary'>{props.cardData.summary}</div>
      </div>
    )
  )
}

export default flow(
  DragSource('kanban', cardDragSource, cardDragCollect),
  DropTarget('kanban', cardDropSpec, cardDropCollect)
)(Card)