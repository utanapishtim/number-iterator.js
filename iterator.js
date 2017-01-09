const weight = (position, size) => size - (1 + position)

const position = (index, size, left) => (left)
  ? index
  : size - (1 + index)

const power = (radix, weight) => Math.pow(radix, weight)

const digit = (string, position, radix) => parseInt(string[position], radix)

const makeNextPower = (left, signed) => (left) 
  ? (power, index) => (signed && (index - 1 === 0)) 
      ? -(power >> 1) 
      : power >> 1
  : (power, index, length) => (signed && (index === length)) 
      ? -(power << 1) 
      : power << 1

function* GeneralNumberIterator(number, radix = 2, left = false) {
  const string = number.toString(radix)
  const length = string.length

  let index = 0
  let curPosition = 0

  while(index < length) {
    curPosition = position(index, length, left)
    yield digit(string, curPosition, radix) * power(radix, weight(curPosition, length))
    index++ 
  }
}

function* BinaryNumberIterator(num, leftToRight = false) {
  const signed = Math.sign(num) === -1
  const number = (signed) ? (num >>> 0) : num
  const length = (signed) ? 32 : number.toString(2).length
 
  let index = 0
  let power = (leftToRight) ? Math.pow(2, length - 1) : 1

  const nextPower = makeNextPower(leftToRight, signed)

  while (index++ < length) {
    yield number & power
    power = nextPower(power, index, length)
  } 
}

exports.general = GeneralNumberIterator
exports.binary = BinaryNumberIterator

