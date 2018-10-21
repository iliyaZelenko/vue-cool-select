import Vue from 'vue'
import Router from 'vue-router'
import ExamplePage1 from './pages/Example1'
// import ExamplePage2 from './pages/Example2'
// import ExamplePage3 from './pages/Example3'
//
// import DevExamplePage1 from './pages/dev/Example1'
// import DevExamplePage2 from './pages/dev/Example2'
// import DevExamplePage3 from './pages/dev/Example3'
// import DocsPage from './pages/Docs'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/vue-cool-select/',
  routes: [
    {
      path: '/',
      name: 'Example1',
      component: ExamplePage1
    },
    {
      path: '/ex2',
      name: 'Example2',
      component: () => import(/* webpackChunkName: "Example2" */ './pages/Example2')
    },
    {
      path: '/ex3',
      name: 'Example3',
      component: () => import(/* webpackChunkName: "Example3" */ './pages/Example3')
    },
    {
      path: '/docs',
      name: 'Docs',
      component: () => import(/* webpackChunkName: "DocsPage" */ './pages/Docs')
    },
    ...groupPrefix('/dev', [
      {
        path: '/',
        component: () => import(/* webpackChunkName: "DevExample2" */ './pages/dev/Example1')
      },
      {
        path: '/2',
        component: () => import(/* webpackChunkName: "DevExample2" */ './pages/dev/Example2')
      },
      {
        path: '/3',
        component: () => import(/* webpackChunkName: "DevExample2" */ './pages/dev/Example3')
      }
    ])
  ]
})

function groupPrefix (prefix, routes) {
  return routes.map(i => {
    i.path = prefix + i.path

    return i
  })
}
