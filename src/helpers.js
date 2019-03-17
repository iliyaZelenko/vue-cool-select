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
