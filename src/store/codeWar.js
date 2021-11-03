// eslint-disable-next-line no-unused-vars
function toCamelCase (str) {
  str = str.split('')
  return str.map(function (el, i) {
    // eslint-disable-next-line eqeqeq
    if (el == '_' || el == '-') {
      el = str[i + 1].toUpperCase()
      str.splice(i + 1, i)
    }
    return el
  }).join('')
}

// eslint-disable-next-line no-unused-vars
function getCount (str) {
  let vowelsCount = 0
  str = str.split('')
  str.map(function (item) {
    if (item === 'a' || item === 'e' || item === 'i' || item === 'o' || item === 'u') {
      vowelsCount++
    }
  })
  return vowelsCount
}

function songDecoder (song) {
  song = song.replace(/WUB/gi, ' ')
  let result = song.split(' ')
  let resultStr = ''
  result.map(function (item) {
    if (item != null && item.length > 0) {
      resultStr = resultStr + item + ' '
    }
  })
  return resultStr.trim()
  // return song.replace(/(WUB)+/g, ' ').trim()
}

function SquareDigit (num) {
  if (num <= 0) {
    return 0
  }
  let numArray = []
  let ruler = 0
  while (parseInt(num / 10) !== 0) {
    numArray[ruler] = num % 10
    ruler++
    num = parseInt(num / 10)
  }
  numArray[ruler++] = num % 10
  let result = ''
  for (let i = ruler - 1; i >= 0; i--) {
    result = result + (numArray[i] * numArray[i]).toString()
  }
  return parseInt(result)
}

export default {
  toCamelCase,
  getCount,
  songDecoder,
  SquareDigit
}
