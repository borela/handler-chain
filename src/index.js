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
// @flow

function cancelEvent(e) {
  if (!e)
    return
  if (e.preventDefault)
    e.preventDefault()
  if (e.stopPropagation)
    e.stopPropagation()
}

/**
 * A handler is a function that can receive any number of arguments and return
 * “true” to break the chain, any falsy value will be ignored and the next handler
 * in the chain will be executed.
 */
export type Handler = (any) => boolean|undefined

/**
 * Executes the chain of handlers with the provided arguments.
 */
export function executeChain(args:any[], ...handlers:Handler[]) {
  let [e] = args
  for (let handler of handlers) {
    if (handler(...args)) {
      cancelEvent(e)
      return
    }
  }
}

/**
 * Creates a function that can be used as an event handler for React components.
 */
export function createChain(...handlers:Handler[]) {
  return (e, ...otherArgs) => {
    executeChain([ e, ...otherArgs ], ...handlers)
  }
}

export default createChain
