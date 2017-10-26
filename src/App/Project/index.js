import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import RandomID from 'random-id'
import HTML5Backend from 'react-dnd-html5-backend'
import Board from './Board'
import Editor from './Editor'
import { LinkButton } from '../Components'
import './index.css'

class Project extends Component {
  constructor(props) {
    super(props)

    this.onBoardControlChange = this.onBoardControlChange.bind(this)
    this.onBoardSearchReset = this.onBoardSearchReset.bind(this)
    this.changeComplexity = this.changeComplexity.bind(this)
    this.onUpdateCard = this.onUpdateCard.bind(this)
    this.showBoard = this.showBoard.bind(this)
    this.addCard = this.addCard.bind(this)
    this.removeCard = this.removeCard.bind(this)
    this.moveCard = this.moveCard.bind(this)
    this.onEditCard = this.onEditCard.bind(this)

    this.state = {
      projectTitle: 'Your Project Title',
      filteredCardLanes: [],
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
      isSearching: false,
      cardIndex: null,
      laneIndex: null,
      currentCard: {
        id: RandomID(),
        title: '',
        assignee: {},
        summary: ''
      },
      boardControls: {
        sortType: 'leastComplex',
        searchValue: ''
      }
    }
  }

  componentWillMount() {
    // call to the DB to get initial card data, stubbed for now
    const lanes = this.state.lanes.slice()

    const dummyPlannedCards = [
      {
        type: 'userStory',
        complexity: 2,        
        id: RandomID(),
        cardNumber: 100,
        title: 'planned card 1',
        summary: 'summary for planned card 1'
      },
      {
        type: 'userStory',   
        complexity: 1,        
        id: RandomID(),
        cardNumber: 101,        
        title: 'planned card 2',
        summary: 'summary for planned card 2'
      }
    ]

    const dummyInDevCards = [
      {
        type: 'userStory',  
        complexity: 3,        
        id: RandomID(),   
        cardNumber: 102,        
        title: 'in dev card 1',
        summary: 'summary for in dev card 1'
      },
      {
        type: 'bug',    
        complexity: 4,        
        id: RandomID(),        
        cardNumber: 103,        
        title: 'in dev card 2',
        summary: 'summary for in dev card 2'
      },
      {
        type: 'userStory',   
        complexity: 5,        
        id: RandomID(),        
        cardNumber: 104,        
        title: 'in dev card 3',
        summary: 'summary for in dev card 3'
      }
    ]

    const dummyInTestingCards = [
      {
        type: 'userStory', 
        complexity: 2,        
        id: RandomID(),      
        cardNumber: 105,        
        title: 'in testing card 1',
        summary: 'summary for in testing card 1',
        files: []
      },
      {
        type: 'bug',    
        complexity: 1,        
        id: RandomID(),   
        cardNumber: 106,        
        title: 'in testing card 2',
        summary: 'summary for in testing card 2'
      }
    ]

    const dummyInDone = [
      {
        type: 'userStory',  
        complexity: 1,
        id: RandomID(),  
        cardNumber: 107,        
        title: 'in done card 1',
        summary: 'summary for in done card 1'
      },
      {
        type: 'bug',  
        complexity: 3,        
        id: RandomID(),        
        cardNumber: 108,        
        title: 'in done card 2',
        summary: 'summary for in done card 2'
      }
    ]

    lanes[0].cards = dummyPlannedCards
    lanes[1].cards = dummyInDevCards
    lanes[2].cards = dummyInTestingCards
    lanes[3].cards = dummyInDone

    // defaults to sorted by least complex
    lanes.forEach(lane => lane.cards.sort((a,b) => a.complexity - b.complexity ))

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

  changeComplexity(event, complexity) {
    event.stopPropagation()    
    const { currentCard } = this.state
    currentCard['complexity'] = complexity
    this.setState({currentCard})
  }

  displayBoard(event) {
    event.stopPropagation()
    this.setState({
      showEditor: false
    })
  }

  onBoardSearchReset(event) {
    event.stopPropagation()
    const boardControls = { ...this.state.boardControls }
    boardControls.searchValue = ''
    this.setState({
      isSearching: false,
      boardControls
    })
  }

  onBoardControlChange(event) {
    const boardControls = { ...this.state.boardControls }
    const lanes = this.state.lanes.slice()
    let filteredCardLanes = this.state.filteredCardLanes.slice()
    let isSearching = false
    boardControls[event.target.name] = event.target.value
    if (event.target.name === 'searchValue' && event.target.value.length > 0) {
      const searchValue = event.target.value
      isSearching = true
      if (parseInt(searchValue, 10)) {
        // search through card cardNumber property, returning exact match
        filteredCardLanes = [].concat(lanes.map(lane => {
          const filteredLane = {
            laneTitle: lane.laneTitle,
            cards: []
          }
          filteredLane.cards = lane.cards.filter(card => {
            return card.cardNumber === parseInt(searchValue, 10)
          })
          return filteredLane
        }))
      } else {
        filteredCardLanes = [].concat(lanes.map(lane => {
          const filteredLane = {
            laneTitle: lane.laneTitle,
            cards: []
          }
          filteredLane.cards = lane.cards.filter(card => {
            const searchMatch = new RegExp(searchValue, 'g')
            return searchMatch.exec(card.title) || searchMatch.exec(card.summary)
          })
          return filteredLane
        }))
      }
    }

    if (event.target.value === 'leastComplex') {
      lanes.forEach(lane => lane.cards.sort((a,b) => a.complexity - b.complexity ))      
    } else if (event.target.value === 'mostComplex') {
      lanes.forEach(lane => lane.cards.sort((a,b) => b.complexity - a.complexity ))      
    }
    this.setState({
      isSearching,
      boardControls,
      filteredCardLanes
    })
  }

  addCard() {
    // just defaults to adding a new card in 'planned'

  }

  removeCard() {
    // remove card
  }

  onUpdateCard(currentCard) {
    const {
      laneIndex,
      cardIndex,
      lanes
    } = this.state

    if (currentCard.title.length && currentCard.summary.length) {
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
    const boardControls = {...this.state.boardControls}
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
        if (dropCard.isPlaceholderCard) {
          dropCardLane.splice(dropCardLane.indexOf(dropCard), 1, dragCard)
        } else {
          dropCardLane.splice(dropCardLane.indexOf(dropCard), 0, dragCard)          
        }

        dragCardLane.length === 0 && dragCardLane.push(
          {
            type: 'bug',   
            complexity: 3,        
            id: RandomID(),        
            cardNumber: 108,        
            title: 'DUMMY',
            summary: 'just some placeholder text',
            isPlaceholderCard: true
          }
        )

        if (boardControls.sortType === 'leastComplex') {
          lanes.forEach(lane => lane.cards.sort((a,b) => a.complexity - b.complexity ))      
        } else if (boardControls.sortType === 'mostComplex') {
          lanes.forEach(lane => lane.cards.sort((a,b) => b.complexity - a.complexity ))      
        }

        this.setState({ lanes })
        return 
      }
    }
  }
  render() {
    return (
      <div className="project">
        <div className='project-main-container'>
          <header className="project-header">
            {this.state.projectTitle}
          </header>
          <LinkButton
            routerPath={'/'}  
            label={'Home'}
          />
          {
            this.state.showEditor
            ? (
                <Editor
                  assignedProjectUsers={this.state.assignedProjectUsers}  
                  changeComplexity={this.changeComplexity}  
                  showBoard={this.showBoard}  
                  cardIndex={this.state.cardIndex}
                  laneIndex={this.state.laneIndex}
                  displayBoard={this.displayBoard}
                  currentCard={this.state.currentCard}
                  removeCard={this.removeCard}
                  onUpdateCard={this.onUpdateCard}
                />
              )
            : (
                <Board
                  onBoardSearchReset={this.onBoardSearchReset}  
                  boardControls={this.state.boardControls}
                  onBoardControlChange={this.onBoardControlChange}
                  lanes={!this.state.isSearching ? this.state.lanes: this.state.filteredCardLanes}
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

export default DragDropContext(HTML5Backend)(Project)
