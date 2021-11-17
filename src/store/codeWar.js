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

export default {
  toCamelCase,
  getCount,
  songDecoder,
  SquareDigit,
  bouncesBall
}
