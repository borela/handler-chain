Event handler chain for ReactJS components.

## Installation

```sh
npm install --save handler-chain
```

## Usage

```js
import autobind from 'autobind-decorator'
import React, { Component } from 'react'
import { createChain, executeChain } from 'handler-chain'

class SomeComponent extends Component {
  handler1(e) {
    console.log('Handler 1 executed.')
  }

  handler2(e) {
    console.log('Handler 2 executed.')
    // Returning “true” makes the chain break, the third handler will not be
    // executed.
    return true
  }

  handler3(e) {
    console.log('Handler 3 executed.')
  }

  @autobind
  mainHandler(e, ...otherArgs) {
    executeChain(
      // Array containing all the event arguments. For system events, it is
      // important to pass the “e” argument as the first item in the array.
      [e, ...otherArgs],
      // List of handlers to be executed.
      this.handler1,
      this.handler2,
      this.handler3
    )
  }

  render() {
    // Option 1:
    // Define a main handler and executes the chain manually.
    return <div onClick={this.mainHandler}>Ctrine!</div>

    // Option 2:
    // You can create the chain on the fly but this method will create a new
    // function each time the render method is called.
    return (
      <div
        onClick={createChain(
          this.handler1,
          this.handler2,
          this.handler3
        )}>
        Ctrine!
      </div>
    )
  }
}
```
