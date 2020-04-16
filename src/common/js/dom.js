export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')

  return reg.test(el.className)
}

// export function hasClass (el, className) {
//     return el.classList.contains(className)
// }

// export function addClass (el, className) {
//     el.classList.add(className)
// }

export function getData (el, name, val) {
  const prefix = "data-"
  if (val) {
    return el.setAttribute(prefix + name, val)
  }

  return el.getAttribute(prefix + name)
}

// 浏览器能力检测
let elementStyle = document.createElement('div').style

//立即执行函数
let vendor = (() => {
  let transforms = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let key in transforms) {
    if (elementStyle[transforms[key]]) {
      return key
    }
  }
  return false
})()

export function prefixStyle (style) {
  if (vendor === false) {
    return false
  }
  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase + style.substr(1)
} 