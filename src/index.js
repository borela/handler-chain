// Copyright © 2016 Alexandre Borela <alexandre@borela.tech>
//
// NOTICE: All information contained herein is, and remains the property of
// Alexandre Borela and its suppliers, if any. The intellectual and technical
// concepts contained herein are proprietary to Alexandre Borela and its
// suppliers and may be covered by patents, patents in process, and are
// protected by trade secret or copyright law. Dissemination of this information
// or reproduction of this material is strictly forbidden unless prior written
// permission is obtained from Alexandre Borela.

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
