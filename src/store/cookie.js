
// 设置cookie
function setCookie (name, value, timer = 1) {
  let Days = timer
  let exp = new Date()
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
}

// 获取cookie中对应的值
function getCookie (name) {
  let result = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
  if (result != null) {
    return unescape(result[2])
  } else {
    return null
  }
}

// 清除cookie
function clearCookie (name) {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = getCookie(name)
  if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
}

export default {
  setCookie,
  getCookie,
  clearCookie
}
