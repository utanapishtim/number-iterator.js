const { general, binary } = require('./iterator')

const errMsgNotNum = (val) => `numberIterator() num paramter is not a number: got ${val}`
const errMsgInvalidRadix = (val) => `numberIterator() radix parameter must be integer between 2 and 36; got ${val}`
const errMsgNotInt = (val) => `numberIterator() num parameter cannot be a float; got ${val}`
const errMsgSignedAndRadixNotTwo = (num, radix) => `numberIterator() can only handle signed integers as base 2 number; got num: ${num} and radix: ${radix}`

const numberIterator = (num, radix, leftToRight) => {
  if (typeof num !== 'number') throw new TypeError(errMsgNotNum(num)) 
  if (!Number.isInteger(num)) throw new TypeError(errMsgNotInt(num))
  if (radix && !(radix < 2 || radix > 36)) throw new RangeError(errMsgInvalidRadix(radix)) 
  if (Number.signed(num) === -1 && radix !== 2) throw new TypeError(errMsgSignedAndRadixNotTwo(num, radix))
  return (radix === 2) ? binary(num, leftToRight || false) : general(num, radix, leftToRight || false)
}

const polyfill = () => Number[Symbol.iterator] = function(radix, leftToRight) {
  numberIterator(this.valueOf(), radix, leftToRight)
}

numberIterator.polyfill = polyfill

module.exports = numberIterator
