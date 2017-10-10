import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import RandomID from 'random-id'
import HTML5Backend from 'react-dnd-html5-backend'
import './index.css'
import Board from './Board'
import Editor from './Editor'

class App extends Component {
  constructor(props) {
    super(props)

    this.onCardTextChange = this.onCardTextChange.bind(this)
    this.onUpdateCard = this.onUpdateCard.bind(this)
    this.showBoard = this.showBoard.bind(this)
    this.addCard = this.addCard.bind(this)
    this.removeCard = this.removeCard.bind(this)
    this.moveCard = this.moveCard.bind(this)
    this.onEditCard = this.onEditCard.bind(this)

    this.state = {
      projectTitle: 'Your Project Title',
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
      ],
      showEditor: false,
      cardIndex: null,
      laneIndex: null,
      currentCard: {
        id: RandomID(),
        cardTitle: '',
        cardSummary: ''
      }
    }
  }

  componentWillMount() {
    // call to the DB to get initial card data, stubbed for now
    const lanes = this.state.lanes.slice()

    const dummyPlannedCards = [
      {
        id: RandomID(),
        cardNumber: 100,
        cardTitle: 'planned card 1',
        cardSummary: 'summary for planned card 1'
      },
      {
        id: RandomID(),
        cardNumber: 101,        
        cardTitle: 'planned card 2',
        cardSummary: 'summary for planned card 2'
      }
    ]

    const dummyInDevCards = [
      {
        id: RandomID(),   
        cardNumber: 102,        
        cardTitle: 'in dev card 1',
        cardSummary: 'summary for in dev card 1'
      },
      {
        id: RandomID(),        
        cardNumber: 103,        
        cardTitle: 'in dev card 2',
        cardSummary: 'summary for in dev card 2'
      },
      {
        id: RandomID(),        
        cardNumber: 104,        
        cardTitle: 'in dev card 3',
        cardSummary: 'summary for in dev card 3'
      }
    ]

    const dummyInTestingCards = [
      {
        id: RandomID(),      
        cardNumber: 105,        
        cardTitle: 'in testing card 1',
        cardSummary: 'summary for in testing card 1'
      },
      {
        id: RandomID(),   
        cardNumber: 106,        
        cardTitle: 'in testing card 2',
        cardSummary: 'summary for in testing card 2'
      }
    ]

    const dummyInDone = [
      {
        id: RandomID(),  
        cardNumber: 107,        
        cardTitle: 'in done card 1',
        cardSummary: 'summary for in done card 1'
      },
      {
        id: RandomID(),        
        cardNumber: 108,        
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

  onEditCard(event, currentCard, laneIndex, cardIndex) {
    this.setState({
      showEditor: true,
      currentCard,
      cardIndex,
      laneIndex
    })
  }

  displayBoard(event) {
    event.stopPropagation()
    this.setState({
      showEditor: false
    })
  }

  onCardTextChange(event) {
    const { currentCard } = this.state

    currentCard[event.target.name] = event.target.value

    this.setState({
      currentCard
    })
  }

  addCard() {
    // just defaults to adding a new card in 'planned'

  }

  removeCard() {
    // remove card
  }

  onUpdateCard() {
    const {
      laneIndex,
      cardIndex,
      currentCard,
      lanes
    } = this.state

    if (currentCard.cardTitle.length && currentCard.cardSummary.length) {
      // only update a card if the card is not empty in the editor
      // removing a card is a separate action
      lanes[laneIndex].cards[cardIndex] = currentCard
      this.setState({
        lanes,
        showEditor: false
      })
    } else {
      this.setState({
        showEditor: false
      })
    }
    
  }

  showBoard(event) {
    event.stopPropagation()
    this.setState({
      showEditor: false
    })
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
          {this.state.projectTitle}
        </header>
        <div className='app-main-container'>
          {
            this.state.showEditor
            ? (
                <Editor
                  showBoard={this.showBoard}  
                  cardIndex={this.state.cardIndex}
                  laneIndex={this.state.laneIndex}
                  displayBoard={this.displayBoard}
                  currentCard={this.state.currentCard}
                  removeCard={this.removeCard}
                  onUpdateCard={this.onUpdateCard}
                  onCardTextChange={this.onCardTextChange}
                />
              )
            : (
                <Board
                  lanes={this.state.lanes}
                  moveCard={this.moveCard}
                  addCard={this.addCard}
                  onEditCard={this.onEditCard}
                />
              )
          }
        </div>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)
