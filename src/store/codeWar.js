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

/**
 * codeWar Bouncing Balls Problem
 *A child is playing with a ball on the nth floor of a tall building. The height of this floor, h, is known.

 He drops the ball out of the window. The ball bounces (for example), to two-thirds of its height (a bounce of 0.66).

 His mother looks out of a window 1.5 meters from the ground.

 How many times will the mother see the ball pass in front of her window (including when it's falling and bouncing?

 Three conditions must be met for a valid experiment:
 Float parameter "h" in meters must be greater than 0
 Float parameter "bounce" must be greater than 0 and less than 1
 Float parameter "window" must be less than h.
 If all three conditions above are fulfilled, return a positive integer, otherwise return -1.

 Note:
 The ball can only be seen if the height of the rebounding ball is strictly greater than the window parameter.

 Examples:
 - h = 3, bounce = 0.66, window = 1.5, result is 3

 - h = 3, bounce = 1, window = 1.5, result is -1

 (Condition 2) not fulfilled).
 * @param height
 * @param bouncesPercent
 * @param windowsHeight
 * @returns {number}
 */
function bouncesBall (height, bouncesPercent, windowsHeight) {
  if (bouncesPercent < 0 || bouncesPercent >= 1) {
    return -1
  }
  // 刚开始的时候只有下坠没有上升 所以只有一次，得去掉那一次
  let count = -1
  while (height > windowsHeight) {
    count++
    height = height * bouncesPercent
    bouncesBall(height, bouncesPercent, windowsHeight)
    count++
  }
  return count
}

/**
 * Move the first letter of each word to the end of it, then add "ay" to the end of the word. Leave punctuation marks untouched.
 * example : pigIt('Pig latin is cool'); // igPay atinlay siay oolcay
 *           pigIt('Hello world !');     // elloHay orldway !
 * @param str
 * @returns {string}
 */
// eslint-disable-next-line no-unused-vars
function pigIt (str) {
  var containSpecial = RegExp(
    /[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/
  )
  let splits = str.split(' ')
  let result = ''
  let var1 = ''
  splits.forEach(p => {
    var1 = p.substr(0, 1)
    if (!containSpecial.test(p)) {
      var1 = var1 + 'ay'
    }
    let var2 = p.substr(1, p.length - 1)
    result = result + ' ' + var2 + var1
  })
  return result.substr(1, result.length)
}

/**
 * Write a function that takes in a string of one or more words, and returns the same string,
 * but with all five or more letter words reversed (Just like the name of this Kata).
 * Strings passed in will consist of only letters and spaces. Spaces will be included only when more than one word is present.
 * @param string
 * @returns {string}
 */
function spinWords (word) {
  return word.split(' ').map(function (item) {
    if (item.length >= 5) {
      return item.split('').reverse().join('')
    } else {
      return item
    }
  }).join(' ')
}

/**
 * Given a string of words, you need to find the highest scoring word.

 Each letter of a word scores points according to its position in the alphabet: a = 1, b = 2, c = 3 etc.

 You need to return the highest scoring word as a string.

 If two words score the same, return the word that appears earliest in the original string.

 All letters will be lowercase and all inputs will be valid.
 * @param x
 * @returns {*}
 */

function high (x) {
  let num = 96
  let words = x.split(' ')
  let socres = new Array(words.length)
  for (let i = 0; i < words.length; i++) {
    socres[i] = 0
    words[i].split('').forEach(p => {
      socres[i] = socres[i] + p.charCodeAt() - num
    })
  }
  let max = 0
  let maxScore = socres[0]
  for (let k = 0; k < socres.length; k++) {
    if (maxScore < socres[k]) {
      maxScore = socres[k]
      max = k
    }
  }
  return words[max]
}

function high1(x) {
  let as = x.split(' ').map(s => s.split('').reduce((a, b) => a + b.charCodeAt(0) - 96, 0))
  return x.split(' ')[as.indexOf(Math.max(...as))]
}

// eslint-disable-next-line no-unused-vars
function arrayDiff (a, b) {
  return a.filter(p => !b.includes(p))
}

/***
 *  斐波那契 数列
 * @param n
 * @returns {number|*}
 */
function fib (n) {
  if (n === 0) {
    return 0
  }
  if (n === 1) {
    return 1
  }
  return fib(n - 1) + fib(n - 2)
}

/**
 * Product of consecutive Fib numbers [codeWar]
 * @param prod
 * @returns {any[]}
 */
// eslint-disable-next-line no-unused-vars
function productFib (prod) {
  let i = 0
  let result = new Array(3)
  while (fib(i) * fib(i + 1) < prod) {
    i++
  }
  result[0] = fib(i)
  result[1] = fib(i + 1)
  result[2] = fib(i) * fib(i + 1) === prod
  return result
}
export default {
  toCamelCase,
  getCount,
  songDecoder,
  SquareDigit,
  bouncesBall,
  pigIt,
  fib
}
