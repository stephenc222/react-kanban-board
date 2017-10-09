import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import RandomID from 'random-id'
import HTML5Backend from 'react-dnd-html5-backend'
import './index.css'
import Board from './Board'

class App extends Component {
  constructor(props) {
    super(props)

    this.moveCard = this.moveCard.bind(this)

    this.state = {
      lanes: [
        {
          laneTitle: 'Planned',
          cards: []
        },
        {
          laneTitle: 'In Dev',
          cards: []
        },
        {
          laneTitle: 'In Testing',
          cards: []
        },
        {
          laneTitle: "Done",
          cards: []
        }
      ]
    }
  }

  componentWillMount() {
    // call to the DB to get initial card data, stubbed for now
    const lanes = this.state.lanes.slice()

    const dummyPlannedCards = [
      {
        id: RandomID(),
        cardTitle: 'planned card 1',
        cardSummary: 'summary for planned card 1'
      },
      {
        id: RandomID(),
        cardTitle: 'planned card 2',
        cardSummary: 'summary for planned card 2'
      }
    ]

    const dummyInDevCards = [
      {
        id: RandomID(),        
        cardTitle: 'in dev card 1',
        cardSummary: 'summary for in dev card 1'
      },
      {
        id: RandomID(),        
        cardTitle: 'in dev card 2',
        cardSummary: 'summary for in dev card 2'
      },
      {
        id: RandomID(),        
        cardTitle: 'in dev card 3',
        cardSummary: 'summary for in dev card 3'
      }
    ]

    const dummyInTestingCards = [
      {
        id: RandomID(),        
        cardTitle: 'in testing card 1',
        cardSummary: 'summary for in testing card 1'
      },
      {
        id: RandomID(),        
        cardTitle: 'in testing card 2',
        cardSummary: 'summary for in testing card 2'
      }
    ]

    const dummyInDone = [
      {
        id: RandomID(),        
        cardTitle: 'in done card 1',
        cardSummary: 'summary for in done card 1'
      },
      {
        id: RandomID(),        
        cardTitle: 'in done card 2',
        cardSummary: 'summary for in done card 2'
      }
    ]

    lanes[0].cards = dummyPlannedCards
    lanes[1].cards = dummyInDevCards
    lanes[2].cards = dummyInTestingCards
    lanes[2].cards = dummyInDone

    this.setState({lanes})

  }

  moveCard(dragCard, dropCard) {
    const lanes = this.state.lanes.slice()
    let dropCardLane = []
    let dragCardLane = []
    for (let lane of lanes) {
      // find lane of both cards
      if (lane.cards.includes(dropCard)) {
        dropCardLane = lane.cards
      }

      if (lane.cards.includes(dragCard)) {
        dragCardLane = lane.cards
      }
    }

    for (let card of dragCardLane) {
      if (card === dropCard) {
        return
      } else {
        dragCardLane.splice(dragCardLane.indexOf(dragCard), 1)
        dropCardLane.splice(dropCardLane.indexOf(dropCard), 0, dragCard)
        this.setState({ lanes })
        return 
      }
    }
  }
  render() {
    return (
      <div className="app">
        <header className="app-header">
          React Kanban Board
        </header>
        <div className='app-main-container'>
          <Board
            lanes={this.state.lanes}  
            moveCard={this.moveCard}
          />
        </div>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)
