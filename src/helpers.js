import Vue from 'vue'
import locales from './locales'
import { defaultLocale } from './config'

export function __ (key) {
  const locale = (Vue.prototype.$avatarUploader && Vue.prototype.$avatarUploader.locale) || defaultLocale // || 'ru'

  return locales[locale][key]
}
