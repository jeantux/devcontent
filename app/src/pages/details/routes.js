export default [
  {
    path: '/details',
    name: 'details',
    component: () => import(/* webpackChunkName: "details" */ './Details')
  }
]
