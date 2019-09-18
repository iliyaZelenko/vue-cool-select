import mergeDeep from '~/helpers'

export const CoolSelectPlugin = new Singleton()
export { default as EventEmitter } from '~/eventEmitter'
export { default as component } from '~/component.vue'
export { default as CoolSelect } from '~/component.vue'
export { default as VueCoolSelect } from '~/component.vue'

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
