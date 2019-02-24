import '~/styles/main.styl'
import component from '~/component.vue'

export default new Singelton()
export {
  component,
  component as CoolSelect
}

function Singelton () {
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

    // themes: ['bootstrap', 'material-design'],

    // Стилевые тема
    get theme () {
      return self.currentTheme
    }

    // set theme (val) {
    //   if (this.themes.includes(val)) {
    //     requireTheme(val)
    //     self.currentTheme = val
    //   } else {
    //     throw new Error('Non-existent theme')
    //   }
    // }
  }
}

function requireTheme (theme, themes) {
  const errorMessage = `Theme ${theme} is not supported! Available Themes: ${themes.join(', ')}.`

  if (!themes.includes(theme)) throw Error(errorMessage)

  require(`./styles/themes/${theme}.styl`)
}

// export default class {
//   static install (Vue, options) {
//     const { optTheme = 'bootsrap' } = options
//
//     Vue.prototype.$avatarUploader = this
//
//     this.theme = optTheme
//   }
//
//   static themes = ['bootsrap']
//   static currentTheme = null // будет определено в install
//
//   static get theme () {
//     return this.currentTheme
//   }
//
//   static set theme (val) {
//     if (this.themes.includes(val)) {
//       this.requyreTheme(val)
//       this.currentTheme = val
//     } else {
//       throw new Error('Non-existent theme')
//     }
//   }
//
//   requyreTheme
// }
