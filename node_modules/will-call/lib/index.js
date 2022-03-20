'use strict';

function WillCall () {
  this._checks = [];
}

module.exports = WillCall;


WillCall.prototype.expect = function expect (fn, expected) {
  if (typeof fn !== 'function') {
    throw new TypeError('fn must be a function');
  }

  if (typeof expected !== 'number' || expected !== expected >>> 0) {
    expected = 1;
  }

  var context = {
    expected: expected,
    actual: 0,
    stack: (new Error()).stack.split('\n').slice(2).join('\n'),
    name: fn.name || '<anonymous>'
  };

  this._checks.push(context);

  return function () {
    context.actual++;
    return fn.apply(this, arguments);
  };
};


WillCall.prototype.check = function check () {
  return this._checks.filter(function filter (context) {
    return context.actual !== context.expected;
  });
};
