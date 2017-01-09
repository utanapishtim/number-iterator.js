# number-iterator.js
An iterator for numbers in javascript.

If you squint, you can think of a number as composed of different parts. For example, in grade
school you may have had a number like 184 as 'made up of' one hundred, eight tens, and four ones.

We can conceptually think of a number as a kind of container then:

  weight:                    100s    10s   1s
                           +-------+-----+-----+
  digit:                   |   1   |  8  |  4  |
                           +-------+-----+-----+
  position left to right:      0      1     2
  position right to left:      2      1     0

  size: 3

The weight of a given number is determined by its radix or base representation. The above diagram
holds for the number 184 in base 10 representation, the diagram would look different for different
bases.

This module exports a function which will return an iterator for a given number. This can be used
to build combinators like reduce, map, and filter for numbers.

module exports a single function:

```
  numberIterator: (number, radix, leftToRight) => Iterator
```
number must be an integer, if signed radix must be equal to two, it specifies the number to iterate over
radix must be a number between 2 and 36, it specifies the 'base' of the numeric representation of number
leftToRight must be a boolean value, it indicates you'd like to iterate from the most to least significant digit

it has a single property, polyfill:
```
  numberIterator.polyfill: () => undefined
```
If called, it will set Number[Symbol.iterator] to a function which will call numberIterator

I DO NOT RECOMMEND YOU DO THAT FOR ANY CODE THAT 'MATTERS'

It's up to you to define what 'matters' means above; have fun! ;-)

