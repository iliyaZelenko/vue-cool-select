import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import App from './App'
import router from './router'

import CoolSelect from '~/main'
import { getTheme } from './themeHelpers'

const theme = getTheme()

Vue.use(Vuetify)
Vue.use(CoolSelect, {
  theme: theme // 'bootstrap' or 'material-design'
})

Vue.use(VueAnalytics, {
  id: 'UA-127403551-2',
  router
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify: new Vuetify(),
  render: h => h(App)
})
