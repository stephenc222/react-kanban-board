import React from 'react'
import 'raf/polyfill'
import { expect } from 'chai'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
import CardEditor from '.'

Enzyme.configure({ adapter: new Adapter() })

describe('CardEditor Component', () => {
  it('gets mounted to the dom', () => {
    const currentCard = {
      summary: 'test summary'
    }
    expect(mount(<CardEditor currentCard={currentCard} />))
  })
})