import { createLocalVue } from '@vue/test-utils'
import { CoolSelectPlugin } from '~/main'

export default function createLocalVueWithPlugin () {
  const localVue = createLocalVue()

  localVue.use(CoolSelectPlugin)

  return localVue
}

// Выделен ли текст в инпуте. https://stackoverflow.com/a/5001669/5286034
export function isTextSelected (input) {
  if (typeof input.selectionStart === 'number') {
    return input.selectionStart === 0 && input.selectionEnd === input.value.length
  } else if (typeof document.selection !== 'undefined') {
    input.focus()

    return document.selection.createRange().text === input.value
  }
}
