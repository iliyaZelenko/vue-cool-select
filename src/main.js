import { mergeDeep } from '~/helpers'
import CoolSelect from '~/component.vue'

export const CoolSelectPlugin = new Singleton()
export { default as EventEmitter } from '~/eventEmitter'
export { default as component } from '~/component.vue'
export { default as VueCoolSelect } from '~/component.vue'
export { CoolSelect }

function Singleton () {
  return {
    install (Vue, optionsInput = {}) {
      const optionsDefault = {
        text: {
          noData: 'No data available'
        }
      }
      const options = mergeDeep(optionsDefault, optionsInput)

      Vue.prototype.$coolSelect = {
        options
      }
    }
  }
}

let GlobalVue = null

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  // Automatic installation if Vue has been added to the global scope.
  GlobalVue.use(CoolSelectPlugin)
  GlobalVue.component('cool-select', CoolSelect)
  GlobalVue.component('vue-cool-select', CoolSelect)
}
