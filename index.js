function* NumIterator(num, radix, endianess) {
  let length = num.toString(radix).length
  let exponent = (endianess) ? 0 : length - 1
  let shouldContinue = (endianess) ? () => exponent < length : () => exponent > -1
  let getExponent = (endianess) ? () => exponent++ : () => exponent--
  while (shouldContinue()) {
    yield (num & Math.pow(radix, getExponent()))
  }
}

const numIterator = (num, radix, endianess) => {
  if (typeof num !== 'number') throw new TypeError(`numIterator() num paramter is not a number: got ${num}`) 
  if (radix && !(radix < 2 || radix > 36)) throw new RangeError(`numIterator() radix parameter must be integer between 2 and 36; got ${radix}`) 
  return NumIterator(num, radix || 2, endianess || 1)
}

const polyfill = () => Number[Symbol.iterator] = function(radix, endianess) {
  numIterator(this.valueOf(), radix || 10, endianess)
}

numIterator.polyfill = polyfill

module.exports = numIterator
