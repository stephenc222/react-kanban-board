import React, { Component } from 'react'
import { Editor as DraftEditor, EditorState as DraftEditorState, RichUtils, convertFromRaw } from 'draft-js'
import { BlockStyleControls, InlineStyleControls } from './Controls'
import 'draft-js/dist/Draft.css'
import './index.css'

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'draft-editor-blockquote'
    default: return null
  }
}

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
}
class CardEditor extends Component {

  constructor(props) {
    super(props) 
    this.onCardInputChange = this.onCardInputChange.bind(this)
    this.renderComplexity = this.renderComplexity.bind(this)
    this.onTextChange = this.onTextChange.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
    this.onTab = this.onTab.bind(this)
    this.toggleBlockType = this.toggleBlockType.bind(this)
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this)
    this.state = {
      complexArr: [1, 2, 3, 4, 5],
      currentCard: {},
      editorState: DraftEditorState.createEmpty()
    }
  }

  componentWillMount() {

    if (this.props.currentCard.summary.length > 0) {
      const contentState = convertFromRaw({
        entityMap: {},
        blocks: [
          {
            text: this.props.currentCard.summary,
            key: this.props.currentCard.id,
            type: 'unstyled',
            entityRanges: [],
          },
        ],
      })
      this.setState({
        editorState: DraftEditorState.createWithContent(contentState),
        currentCard: this.props.currentCard
      })
    }
  }

  onTextChange(editorState) {

    const currentCard = this.state.currentCard
    currentCard.summary = editorState.getCurrentContent().getPlainText()
    
    this.setState({ editorState, currentCard })
  }


  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onTextChange(newState)
      return true
    }
    return false
  }

  onTab(e) {
    const maxDepth = 4
    this.onTextChange(RichUtils.onTab(e, this.state.editorState, maxDepth))
  }

  toggleBlockType(blockType) {
    this.onTextChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    )
  }

  toggleInlineStyle(inlineStyle) {
    this.onTextChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    )
  }

  onCardInputChange(event) {
    const { currentCard } = this.state

    currentCard[event.target.name] = event.target.value

    this.setState({
      currentCard
    })
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

    let hidePlaceholder = false
    const contentState = this.state.editorState.getCurrentContent()
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        hidePlaceholder = true
      }
    }

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
            <div className='editor-side-inputs-container'>
              <div className='editor-card-type-input'>
                <label>
                  <input 
                    type="radio" 
                    name="type"   
                    value="userStory"
                    checked={this.state.currentCard.type === 'userStory'}                
                    onChange={this.onCardInputChange} />
                  &nbsp;User Story  
                </label>
                <label>  
                  <input 
                    type="radio" 
                    name="type" 
                    value="bug"
                    checked={this.state.currentCard.type === 'bug'}
                    onChange={this.onCardInputChange} />
                  &nbsp;Bug    
                </label>  
                <br/>
              </div>  
            </div> 
            <div className='editor-title-input'>
              <input
                onChange={this.onCardInputChange}
                name='title'
                type='text'
                value={this.state.currentCard.title}
              />  
            </div>  
              <div className='editor-title-number-container'> 
                <div className='editor-update-button-number-container'>
                  <div className='editor-update-button'>
                    <input
                      type='button'
                      value='Update Card'
                      onClick={() => this.props.onUpdateCard(this.state.currentCard)}
                    />  
                  </div>  
                    {`# ${this.state.currentCard.cardNumber}`}  
                </div>  
                <div className='editor-main-complexity-container'>complexity: {this.state.currentCard.complexity}</div>
                  <div className='editor-card-complexity-container'>
                    {this.state.complexArr.map(this.renderComplexity)}
                  </div>
              </div>
          </div>  
          <div className='editor-card-summary-container'>
            Summary:
            <div style={{ paddingTop: 15, paddingBottom: 5 }}>
              <div>
                <BlockStyleControls
                  editorState={this.state.editorState}
                  onToggle={this.toggleBlockType}
                />
                <InlineStyleControls
                  editorState={this.state.editorState}
                  onToggle={this.toggleInlineStyle}
                />
              </div>  
            </div>  
              <DraftEditor
                handleKeyCommand={this.handleKeyCommand}            
                editorState={this.state.editorState}
                onChange={this.onTextChange}
                placeholder={hidePlaceholder ? '' : "Card Summary here..."}
                blockStyleFn={getBlockStyle}
                customStyleMap={styleMap}
                onTab={this.onTab}
                spellCheck={true}
              />            
          </div>  
        </div>  
      </div>
    )
  }
}

export default CardEditor