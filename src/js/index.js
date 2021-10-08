
import forEach from 'lodash/forEach'

const str = { a: 1, b: 2 }
forEach(str, function (value, key) {
  console.log(key)
  console.log(value)
})
const str2 = { a: 1, b: 2, c: 1, d: 2 }
forEach(str2, function (value, key) {
  console.log(key)
  console.log(value)
})
