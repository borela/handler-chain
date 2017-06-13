// Copyright © 2016 Alexandre Borela <alexandre@borela.tech>
//
// NOTICE: All information contained herein is, and remains the property of
// Alexandre Borela and its suppliers, if any. The intellectual and technical
// concepts contained herein are proprietary to Alexandre Borela and its
// suppliers and may be covered by patents, patents in process, and are
// protected by trade secret or copyright law. Dissemination of this information
// or reproduction of this material is strictly forbidden unless prior written
// permission is obtained from Alexandre Borela.

import React from 'react'
import { shallow } from 'enzyme'
import { createChain } from '..'

class SomeComponent extends React.Component {
  render() {
    return <div {...this.props}>Ctrine!</div>
  }
}

it('Execute the chain', () => {
  let handler1 = jest.fn()
  let handler2 = jest.fn()
  let handler3 = jest.fn()

  const WRAPPER = shallow(
    <SomeComponent
      onClick={createChain(
        handler1,
        handler2,
        handler3
      )}
    />
  )

  WRAPPER.simulate('click')

  expect(handler1).toHaveBeenCalled()
  expect(handler2).toHaveBeenCalled()
  expect(handler3).toHaveBeenCalled()
})

it('Break the chain by returning “true”', () => {
  let breakTheChain = jest.fn(() => true)
  let handler1 = jest.fn()
  let handler2 = jest.fn()
  let handler3 = jest.fn()

  const WRAPPER = shallow(
    <SomeComponent
      onClick={createChain(
        handler1,
        breakTheChain,
        handler2,
        handler3
      )}
    />
  )

  WRAPPER.simulate('click')

  expect(handler1).toHaveBeenCalled()
  expect(handler2).not.toHaveBeenCalled()
  expect(handler3).not.toHaveBeenCalled()
})
