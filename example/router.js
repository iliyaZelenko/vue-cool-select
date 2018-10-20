import Vue from 'vue'
import Router from 'vue-router'
import ExamplePage1 from './pages/Example1'
import ExamplePage2 from './pages/Example2'
import ExamplePage3 from './pages/Example3'
import DocsPage from './pages/Docs'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Example1',
      component: ExamplePage1
    },
    {
      path: '/ex2',
      name: 'Example2',
      component: ExamplePage2
    },
    {
      path: '/ex3',
      name: 'Example3',
      component: ExamplePage3
    },
    {
      path: '/docs',
      name: 'Docs',
      component: DocsPage
    }
  ]
})
