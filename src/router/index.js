import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/home/home')
    }, {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/login')
    }, {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/register/register')
    }, {
      path: '/forgetPassword',
      name: 'ForgetPassword',
      component: () => import('@/views/register/forgetPassword')
    }, {
      path: '/userHome',
      name: 'userHome',
      component: () => import('@/views/userHome/userHome')}, {
      path: '/myOrder',
      name: 'myOrder',
      component: () => import('@/views/userHome/myOrder')
    }, {
      path: '/search',
      name: 'Search',
      component: () => import('@/views/search/search')
    }, {
      path: '/searchResult',
      name: 'SearchResult',
      component: () => import('@/views/search/searchResult')
    }
  ]
})
