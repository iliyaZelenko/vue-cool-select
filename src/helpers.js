import { MENU_POSITIONS } from './constants'

export function isObject (val) {
  return val && (val.constructor === Object)
}

export function getOffsetSum (elem) {
  let top = 0
  let left = 0

  while (elem) {
    top = top + parseFloat(elem.offsetTop)
    left = left + parseFloat(elem.offsetLeft)
    elem = elem.offsetParent
  }

  return { top: Math.round(top), left: Math.round(left) }
}

export function scrollIfNeeded (element, container) {
  if (element.offsetTop < container.scrollTop) {
    container.scrollTop = element.offsetTop
  } else {
    const offsetBottom = element.offsetTop + element.offsetHeight
    const scrollBottom = container.scrollTop + container.offsetHeight

    if (offsetBottom > scrollBottom) {
      container.scrollTop = offsetBottom - container.offsetHeight
    }
  }
}

export function mergeDeep (target, source) {
  let output = Object.assign({}, target)
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] })
        } else {
          output[key] = mergeDeep(target[key], source[key])
        }
      } else {
        Object.assign(output, { [key]: source[key] })
      }
    })
  }
  return output
}

export function outOfViewportGetFreePosition (elem) {
  const bounding = elem.getBoundingClientRect()

  return bounding.top < 0
    ? MENU_POSITIONS.BOTTOM
    : bounding.bottom > window.innerHeight
      ? MENU_POSITIONS.TOP
      // default position
      : false
}
