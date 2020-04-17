export default [
  {
    path: '/stacks',
    name: 'stacks',
    component: () => import(/* webpackChunkName: "stacks" */ './Stacks')
  }
]
