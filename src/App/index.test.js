import React from 'react'
import 'raf/polyfill'
import { expect } from 'chai'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
import App from '.'

Enzyme.configure({ adapter: new Adapter() })

describe('App Component', () => {
  it('gets mounted to the dom', () => {
    expect(mount(<App/>))
  })
})