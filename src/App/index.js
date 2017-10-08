import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import './index.css'
import Board from './Board'

class App extends Component {
  constructor(props) {
    super(props)

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
        cardTitle: 'planned card 1',
        cardSummary: 'summary for planned card 1'
      },
      {
        cardTitle: 'planned card 2',
        cardSummary: 'summary for planned card 2'
      }
    ]

    const dummyInDevCards = [
      {
        cardTitle: 'in dev card 1',
        cardSummary: 'summary for in dev card 1'
      },
      {
        cardTitle: 'in dev card 2',
        cardSummary: 'summary for in dev card 2'
      },
      {
        cardTitle: 'in dev card 3',
        cardSummary: 'summary for in dev card 3'
      }
    ]

    const dummyInTestingCards = [
      {
        cardTitle: 'in testing card 1',
        cardSummary: 'summary for in testing card 1'
      },
      {
        cardTitle: 'in testing card 2',
        cardSummary: 'summary for in testing card 2'
      }
    ]

    const dummyInDone = [
      {
        cardTitle: 'in done card 1',
        cardSummary: 'summary for in done card 1'
      },
      {
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
  render() {
    return (
      <div className="app">
        <header className="app-header">
          React Kanban Board
        </header>
        <div className='app-main-container'>
          <Board
            lanes={this.state.lanes}  
          />
        </div>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)
