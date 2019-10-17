import { createLocalVue } from '@vue/test-utils'
import { CoolSelectPlugin } from '~/main'

export default function createLocalVueWithPlugin () {
  const localVue = createLocalVue()

  localVue.use(CoolSelectPlugin)

  return localVue
}
