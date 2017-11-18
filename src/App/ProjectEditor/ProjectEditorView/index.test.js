import React from 'react'
import 'raf/polyfill'
import { expect } from 'chai'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
import ProjectEditorView from '.'

Enzyme.configure({ adapter: new Adapter() })

describe('ProjectEditorView Component', () => {
  it('gets mounted to the dom', () => {
    const nextProject = {
      lanes: []
    }
    expect(mount(<ProjectEditorView nextProject={nextProject}/>))
  })
})