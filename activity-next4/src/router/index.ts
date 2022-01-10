/* eslint-disable */

/**
 * attention !!!
 *
 * 半屏页面路由定义请修改子路由，一级路由需要保证唯一性
 */
const half = [
  {
    path: '/game_player_2021',
    name: 'game_player_2021',
    component: () => import(/* webpackChunkName: "HalfRoot" */ '../views/half/HalfRoot.vue')
  }
]

/**
 * pc 以及 全屏页面 路由
 */
const pc = [
  {
    path: '/',
    name: 'PCRoot',
    component: () => import(/* webpackChunkName: "PCRoot" */ '../views/pc/PCRoot.vue')
  }
]

const full = [
  {
    path: '/',
    name: 'FullRoot',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "FullRoot" */ '../views/full/FullRoot.vue')
  }
]

export default {
  half,
  pc,
  full,
  h5Share: {
    link: location.href
  }
}
