import React, { Component } from 'react'
import { Editor as DraftEditor, EditorState as DraftEditorState,  RichUtils } from 'draft-js'
import 'draft-js/dist/Draft.css'
import './index.css'
class Editor extends Component {

  constructor(props) {
    super(props) 
    this.renderComplexity = this.renderComplexity.bind(this)
    this._onBoldClick = this._onBoldClick.bind(this)
    this.onTextChange = this.onTextChange.bind(this)
    this.state = {
      complexArr: [1, 2, 3, 4, 5],
      currentCard: {},
      editorState: DraftEditorState.createEmpty()
    }
  }

  onTextChange(editorState) {
    this.setState({editorState})
  }

  _onBoldClick() {
    this.onTextChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled'
    }
    return 'not-handled'
  }

  renderComplexity(complexItem) {
    const changeComplexity = (e) => {
      return this.props.changeComplexity(e,complexItem)
    }
    if (complexItem <= this.props.currentCard.complexity) {
      return (
        <div key={complexItem} onClick={changeComplexity} className='editor-card-complexity-item--selected'/>
      )
    } else {
      return (
        <div key={complexItem} onClick={changeComplexity} className='editor-card-complexity-item'/>        
      )
    }
  }


  render() {

    return (
      <div className='editor-main-container'>
        <div className='editor-content-container'> 
          <div className='editor-back-button'>
            <input
              type='button'
              value='Back To Board'
              onClick={this.props.showBoard}
            />  
          </div>  
          <div className='editor-header-container'>  
            <div className='editor-back-title-button'>
              <div className='editor-card-type-input'>
                <label>
                  <input 
                    type="radio" 
                    name="type"   
                    value="userStory"
                    checked={this.props.currentCard.type === 'userStory'}                
                    onChange={this.props.onCardInputChange} />
                  &nbsp;User Story  
                </label>
                <label>  
                  <input 
                    type="radio" 
                    name="type" 
                    value="bug"
                    checked={this.props.currentCard.type === 'bug'}
                    onChange={this.props.onCardInputChange} />
                  &nbsp;Bug    
                </label>  
              </div>  
              <div>complexity: {this.props.currentCard.complexity}</div>
                <div className='editor-card-complexity-container'>
                  {this.state.complexArr.map(this.renderComplexity)}
                </div>
              <div className='editor-title-input'>
                <input
                  onChange={this.props.onCardInputChange}
                  name='title'
                  type='text'
                  value={this.props.currentCard.title}
                />  
              </div>  
            </div>  
            <div className='editor-title-number-container'> 
              <div className='editor-update-button-number-container'>
                <div className='editor-update-button'>
                  <input
                    type='button'
                    value='Update Card'
                    onClick={this.props.onUpdateCard}
                  />  
                </div>  
                {`# ${this.props.currentCard.cardNumber}`}  
              </div>  
            </div>
          </div>  
          <div className='editor-card-summary-container'>
            Summary:
            {/*false && <textarea
              name='summary'
              value={this.props.currentCard.summary}
              onChange={this.props.onCardInputChange}
            />*/}

            <div style={{ paddingTop: 15, paddingBottom: 5 }}>
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    console.log(this.state.editorState.getCurrentContent().getPlainText())
                  }}>  
                  Get Editor Content
                </button>
              </div>  
              <button onClick={this._onBoldClick.bind(this)}>Bold</button>
            </div>  
            <DraftEditor
              handleKeyCommand={this.handleKeyCommand}            
              editorState={this.state.editorState}
              onChange={this.onTextChange}
              placeholder="Card Summary here..."
              
            />            
          </div>  
        </div>  
      </div>
    )
  }
}

export default Editor