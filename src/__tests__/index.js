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
