import Vue from 'vue'
import Router from 'vue-router'
// import SimpleEx from './pages/Simple'
import CodesanboxExample from './pages/CodesanboxExample'

Vue.use(Router)

export const docsRoute = {
  path: '/docs',
  name: 'Docs',
  text: 'Documentation 🗎',
  component: () => import(/* webpackChunkName: "DocsPage" */ './pages/Docs')
}
export const examplesRoutes = [
  {
    path: '/',
    name: 'SimpleEx',
    text: 'Simple',
    component: CodesanboxExample,
    meta: { codesanbox: 'https://codesandbox.io/embed/4zlkjr9xow?fontsize=14&initialpath=%2Fsimple&module=%2Fsrc%2Fexamples%2FSimple.vue' }
  },
  {
    path: '/ex1',
    name: 'TimezonesEx',
    text: 'Item Slot',
    component: CodesanboxExample,
    meta: { codesanbox: 'https://codesandbox.io/embed/4zlkjr9xow?fontsize=14&initialpath=%2Ftimezones&module=%2Fsrc%2Fexamples%2FItemSlot.vue' }
  },
  {
    path: '/ex2',
    name: 'RESTEx',
    text: 'REST API',
    component: CodesanboxExample,
    meta: { codesanbox: 'https://codesandbox.io/embed/4zlkjr9xow?fontsize=14&initialpath=%2Frest-api&module=%2Fsrc%2Fexamples%2FREST_API.vue' }
  },
  {
    path: '/ex4',
    name: 'ValidationEx',
    text: 'Validation',
    component: CodesanboxExample,
    meta: { codesanbox: 'https://codesandbox.io/embed/4zlkjr9xow?fontsize=14&initialpath=%2Fvalidation&module=%2Fsrc%2Fexamples%2FValidation.vue' }
  },
  {
    path: '/input-slots',
    name: 'InputSlotsEx',
    text: 'Input Slots',
    component: CodesanboxExample,
    meta: { codesanbox: 'https://codesandbox.io/embed/4zlkjr9xow?fontsize=14&initialpath=%2Finput-slots&module=%2Fsrc%2Fexamples%2FInputSlots.vue' }
  },
  {
    path: '/before-after-slots',
    name: 'BeforeAfterEx',
    text: 'Before and After Slots',
    component: CodesanboxExample,
    meta: { codesanbox: 'https://codesandbox.io/embed/4zlkjr9xow?fontsize=14&initialpath=%2Fbefore-after-slots&module=%2Fsrc%2Fexamples%2FBeforeAfterSlots.vue' }
  },
  {
    path: '/no-search',
    name: 'NoSearchEx',
    text: 'No Search',
    component: CodesanboxExample,
    meta: { codesanbox: 'https://codesandbox.io/embed/4zlkjr9xow?fontsize=14&initialpath=%2Fno-seach&module=%2Fsrc%2Fexamples%2FNoSearch.vue' }
  },
  {
    path: '/disabled-readonly',
    name: 'DisabledReadonlyEx',
    text: 'Disabled / Readonly',
    component: CodesanboxExample,
    meta: { codesanbox: 'https://codesandbox.io/embed/4zlkjr9xow?fontsize=14&initialpath=%2Fdisabled-readonly&module=%2Fsrc%2Fexamples%2FDisabledReadonly.vue' }
  }
]

export const prodRoutes = [
  docsRoute,
  ...examplesRoutes
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
  },
  {
    path: '/6',
    text: 'Dev 6',
    component: () => import(/* webpackChunkName: "DevExample5" */ './pages/dev/Example6')
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
