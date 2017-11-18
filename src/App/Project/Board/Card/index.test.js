import React from 'react'
import 'raf/polyfill'
import { expect } from 'chai'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
import Card from '.'

Enzyme.configure({ adapter: new Adapter() })

const props = {
  cardData: {
    isPlaceholderCard: false,
    cardNumber: 123
  }
}

describe('Card Component', () => {
  it('gets mounted to the dom', () => {
    const TestCard = Card.DecoratedComponent

    const withDndProps = Object.assign(props, {
      connectDragSource: (el) => el,
      connectDropTarget: (el) => el
    })
    
    expect(mount(<TestCard 
      {...withDndProps} 
      />))
  })
})