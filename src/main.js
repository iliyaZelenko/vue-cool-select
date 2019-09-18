import component from '~/component.vue'
import EventEmitter from '~/eventEmitter'
import mergeDeep from '~/helpers'

export const CoolSelectPlugin = new Singleton()
export {
  EventEmitter,
  component,
  component as CoolSelect,
  component as VueCoolSelect
}

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
