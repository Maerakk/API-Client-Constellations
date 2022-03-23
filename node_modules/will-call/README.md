# will-call

[![Current Version](https://img.shields.io/npm/v/will-call.svg)](https://www.npmjs.org/package/will-call)
[![Build Status via Travis CI](https://travis-ci.org/continuationlabs/will-call.svg?branch=master)](https://travis-ci.org/continuationlabs/will-call)
![Dependencies](http://img.shields.io/david/continuationlabs/will-call.svg)

[![belly-button-style](https://cdn.rawgit.com/continuationlabs/belly-button/master/badge.svg)](https://github.com/continuationlabs/belly-button)

**Credit:** This module borrows heavily from the `common.mustCall()` functionality in Node core's test suite.

`will-call` allows you to mark functions that should be executed. You can later check which functions were actually called.

```javascript
const WillCall = require('will-call');
const wc = new WillCall();
const foo = wc.expect(function foo () { return 'foo'; });     // must be called once
const bar = wc.expect(function bar () { return 'bar'; }, 2);  // must be called twice
const baz = wc.expect(function baz () { return 'baz'; });     // must be called once

foo();
bar();
baz();
baz();

const results = wc.check();
// results contains an array of length two, corresponding to bar() and baz()
// Each entry provides the function name, a stack, expected calls, and actual calls
```

## Methods

`will-call` exports a constructor function that takes no arguments. Constructed instances support the following methods.

### `WillCall.prototype.expect(fn [, expected])`

  - Arguments
    - `fn` (function) - The function that is expected to be called.
    - `expected` (integer) - The exact number of times that `fn` should be called. If a non-negative integer is not received, this defaults to 1. Optional.
  - Returns
    - A wrapped version of `fn`. The wrapped function should behave the same as `fn`.

This function specifies the exact number of times that a given function is expected to be called. `expect()` returns a wrapped version of the `fn` argument. It is important that the wrapped function be used instead of the original `fn` function.

### `WillCall.prototype.check()`

  - Arguments
    - None
  - Returns
    - Array of objects. Each object adheres to the following schema.
      - `name` (string) - The name of the function, or `'<anonymous>'` if the function doesn't have a name.
      - `expected` (integer) - The number of times the function was expected to be called.
      - `actual` (integer) - The number of times the function was actually called.
      - `stack` (string) - A partial stack trace identifying where the function was passed to `expect()`.

This function verifies that all expected functions were called the correct number of times. `check()` returns an array identifying the functions that were **not** called correctly. This function does not alter any internal state, and can be called multiple times.
