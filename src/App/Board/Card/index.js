import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import flow from 'lodash.flow'
import './index.css'

const cardDropSpec = {
  
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
    // You can disallow drag based on props
    return  true// props.isReady;
  },

  isDragging(props, monitor) {
    // If your component gets unmounted while dragged
    // (like a card in Kanban board dragged between lists)
    // you can implement something like this to keep its
    // appearance dragged:
    return true//monitor.getItem().id === props.id;
  },

  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    const item = { id: props.id };
    return item;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      // You can check whether the drop was successful
      // or if the drag ended but nobody handled the drop
      return;
    }

    // When dropped on a compatible target, do something.
    // Read the original dragged item from getItem():
    const item = monitor.getItem();

    // You may also read the drop result from the drop target
    // that handled the drop, if it returned an object from
    // its drop() method.
    const dropResult = monitor.getDropResult();

    // This is a good place to call some Flux action
    // CardActions.moveCardToList(item.id, dropResult.listId);
  }
};

  
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
  return props.connectDragSource(
    props.connectDropTarget(
      <div className='card-container'>
        <div className='card-title'>{props.cardData.cardTitle}</div>
        <div className='card-summary'>{props.cardData.cardSummary}</div>
      </div>
    )
  )
}

export default flow(
  DragSource('kanban', cardDragSource, cardDragCollect),
  DropTarget('kanban', cardDropSpec, cardDropCollect)
)(Card)