import Vue from 'vue'
import App from './App'
import router from './router'

// 1. import
import CoolSelect from '../src/main'

// 2. use
Vue.use(CoolSelect, {
  theme: 'bootstrap' // or 'material-design'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
