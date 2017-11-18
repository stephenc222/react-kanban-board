import React from 'react'
import 'raf/polyfill'
import { render } from 'react-dom'
import { expect } from 'chai'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { withRouter, BrowserRouter } from 'react-router-dom'
import sinon from 'sinon'
import MasterContainer from '.'

Enzyme.configure({ adapter: new Adapter() })

describe('MasterContainer Component', () => {
  it('gets mounted to the dom', () => {
    const WrappedMasterContainer = withRouter(MasterContainer, { withRef:true })
    const router = {
      push() {},
      replace() {},
      go() {},
      goBack() {},
      goForward() {},
      setRouteLeaveHook() {},
      isActive() {}
    }
    const Component = (
      <BrowserRouter>
        <WrappedMasterContainer router={router}/>
      </BrowserRouter>
    )
    expect(mount(Component))
  })
})