import '~/styles/main.styl'
import component from '~/component.vue'
import EventEmitter from '~/eventEmitter'

export default new Singleton()
export {
  EventEmitter,
  component,
  component as CoolSelect,
  component as VueCoolSelect
}

function Singleton () {
  const self = this

  self.themes = ['bootstrap', 'material-design']
  self.currentTheme = null // будет определено в install
  self.currentLocale = null // будет определено в install

  // public object
  return {
    install (Vue, options = {}) {
      const {
        theme: optTheme = 'bootstrap'
      } = options

      requireTheme(optTheme, self.themes)
    },

    get theme () {
      return self.currentTheme
    }
  }
}

function requireTheme (theme, themes) {
  const errorMessage = `Theme ${theme} is not supported! Available Themes: ${themes.join(', ')}.`

  if (!themes.includes(theme)) throw Error(errorMessage)

  require(`./styles/themes/${theme}.styl`)
}
