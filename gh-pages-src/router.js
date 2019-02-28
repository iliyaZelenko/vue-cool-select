import Vue from 'vue'
import Router from 'vue-router'
import SimpleEx from './pages/Simple'

Vue.use(Router)

export const prodRoutes = [
  {
    path: '/',
    name: 'SimpleEx',
    text: 'Simple example',
    component: SimpleEx
  },
  {
    path: '/ex1',
    name: 'TimezonesEx',
    text: 'Timezones example',
    component: () => import(/* webpackChunkName: "Example1" */ './pages/Timezones')
  },
  {
    path: '/ex2',
    name: 'RESTEx',
    text: 'REST API',
    component: () => import(/* webpackChunkName: "Example2" */ './pages/REST')
  },
  {
    path: '/ex4',
    name: 'ValidationEx',
    text: 'Validation example',
    component: () => import(/* webpackChunkName: "Example4" */ './pages/Validation')
  },
  {
    path: '/before-after-slots',
    name: 'BeforeAfterEx',
    text: 'Before and After Slots',
    component: () => import(/* webpackChunkName: "Example4" */ './pages/BeforeAfter')
  },
  {
    path: '/docs',
    name: 'Docs',
    text: 'Documentation 🗎',
    component: () => import(/* webpackChunkName: "DocsPage" */ './pages/Docs')
  }
]

export const devRoutes = [
  {
    path: '/',
    text: 'Dev 1',
    component: () => import(/* webpackChunkName: "DevExample1" */ './pages/dev/Example1')
  },
  {
    path: '/2',
    text: 'Dev 2',
    component: () => import(/* webpackChunkName: "DevExample2" */ './pages/dev/Example2')
  },
  {
    path: '/3',
    text: 'Dev 3',
    component: () => import(/* webpackChunkName: "DevExample3" */ './pages/dev/Example3')
  },
  {
    path: '/4',
    text: 'Dev 4',
    component: () => import(/* webpackChunkName: "DevExample4" */ './pages/dev/Example4')
  },
  {
    path: '/5',
    text: 'Dev 5',
    component: () => import(/* webpackChunkName: "DevExample5" */ './pages/dev/Example5')
  }
]

export default new Router({
  // mode: 'history', // на gh pages не работает если скопировать адресс любой страницы кроме / и зайди на нее с стркои поиска (не через переходы по ссылкам)
  base: '/vue-cool-select/',
  routes: [
    ...prodRoutes,
    ...groupPrefix('/dev', devRoutes)
  ]
})

function groupPrefix (prefix, routes) {
  return routes.map(i => {
    i.path = prefix + i.path

    return i
  })
}
