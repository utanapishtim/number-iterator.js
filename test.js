const { general, binary } = require('./iterator')

const test = (num, radix, leftToRight) => {
  let iter = (radix === 2) ? binary : general
  if (radix === 2) console.log('using binary')
  let count = 0
  let x = 0
  for (var i of iter(num, radix, leftToRight)) {
     x += i
     count++
     if (isNaN(i)) console.log('NAN at', count)
  }
  console.log('FINISHED', (x === num) ? 'SUCCESS' : 'FAILED')
  console.log(num, x)
}

let j = 2
let max = 36

while(j <= max) {
  console.log('TESTING', j)
  test(16, j)
  test(16, j, true)
  if (j === 2) {
    console.log('TESTING SIGNED')
    test(-16, j)
    test(-16, j, true)
  } 
  j++
}
