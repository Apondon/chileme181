import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      // 点餐
      {
        path:'chooseGoods',
        name:'ChooseGoods',
        component: () => import('../views/ChooseGoods.vue')
      },
      // 库存管理
      {
        path:'stockManagement',
        name:'StockManagement',
        component: () => import('../views/StockManagement.vue')
      },
      {
        path:'lifeCycle',
        name:'LifeCycle',
        component: () => import('../views/lifecycle.vue')
      },
    ]
  },
  // 注册
  {
    path: '/register',
    name: 'Register',
    component: () => import( '../views/Register.vue')
  },
  // 登录
  {
    path: '/login',
    name: 'Login',
    component: () => import( '../views/Login.vue')
  },
  // testApi
  {
    path: '/testApi',
    name: 'testApi',
    component: () => import( '../views/testApi.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
