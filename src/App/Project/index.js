import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import RandomID from 'random-id'
import HTML5Backend from 'react-dnd-html5-backend'
import Board from './Board'
import CardEditor from './CardEditor'
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

  componentDidMount() {
    this.setState({...this.props.currentProject})
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

    const {
      _id,
      userId,
      projectTitle,
      filteredCardLanes,
    } = this.state

    if (currentCard.title.length && currentCard.summary.length) {
      // only update a card if the card is not empty in the editor
      // removing a card is a separate action
      lanes[laneIndex].cards[cardIndex] = currentCard
      this.setState({ lanes, showEditor: false }, () => {
        const project = {
          _id,
          userId,
          projectTitle,
          filteredCardLanes,
          lanes,
        }
        this.props.updateUserProject({ project })
        .catch(e => console.error('updateUserProject', {e}))
      })
    } else {
      this.setState({ showEditor: false })
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
    const boardControls = { ...this.state.boardControls }
    const {
      _id,
      userId,
      projectTitle,
      filteredCardLanes,
    } = this.state
    
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

        this.setState({ lanes }, () => {
          const project = {
            _id,
            userId,
            projectTitle,
            filteredCardLanes,
            lanes,
          }
          this.props.updateUserProject({ project })
          .catch(e => console.error('updateUserProject', {e}))
        })
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
          {
            this.state.showEditor
            ? (
                <CardEditor
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
                  goToDashboard={this.props.goToDashboard}
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
