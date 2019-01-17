import Vue from 'vue'
import locales from './locales'
import { defaultLocale } from './config'

export function isObject (val) {
  return (!!val) && (val.constructor === Object)
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

export function __ (key) {
  const locale = (Vue.prototype.$avatarUploader && Vue.prototype.$avatarUploader.locale) || defaultLocale // || 'ru'

  return locales[locale][key]
}
