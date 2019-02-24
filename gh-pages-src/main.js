import Vue from 'vue'
import App from './App'
import router from './router'

import CoolSelect from '~/main'
import { getTheme } from './themeHelpers'

const theme = getTheme()

Vue.use(CoolSelect, {
  theme: theme // 'bootstrap' or 'material-design'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
