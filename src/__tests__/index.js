// Licensed under the Apache License, Version 2.0 (the “License”); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

import React from 'react'
import { shallow } from 'enzyme'
import { createChain } from '..'

class SomeComponent extends React.Component {
  render() {
    return <div {...this.props}>Ctrine!</div>
  }
}

it('Execute the chain', () => {
  const HANDLER1 = jest.fn()
  const HANDLER2 = jest.fn()
  const HANDLER3 = jest.fn()

  const WRAPPER = shallow(
    <SomeComponent
      onClick={createChain(
        HANDLER1,
        HANDLER2,
        HANDLER3
      )}
    />
  )

  WRAPPER.simulate('click')

  expect(HANDLER1).toHaveBeenCalled()
  expect(HANDLER2).toHaveBeenCalled()
  expect(HANDLER3).toHaveBeenCalled()
})

it('Break the chain by returning “true”', () => {
  const BREAKTHECHAIN = jest.fn(() => true)
  const HANDLER1 = jest.fn()
  const HANDLER2 = jest.fn()
  const HANDLER3 = jest.fn()

  const WRAPPER = shallow(
    <SomeComponent
      onClick={createChain(
        HANDLER1,
        BREAKTHECHAIN,
        HANDLER2,
        HANDLER3
      )}
    />
  )

  WRAPPER.simulate('click')

  expect(HANDLER1).toHaveBeenCalled()
  expect(HANDLER2).not.toHaveBeenCalled()
  expect(HANDLER3).not.toHaveBeenCalled()
})
