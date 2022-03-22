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
      component: () => import('@/views/userHome/userHome'),
      meta: {title: '用户中心'},
      children: [
        {
          path: '/userHome/myOrder',
          name: 'myOrder',
          component: () => import('@/views/userHome/myOrder'),
          meta: {title: '我的订单'}},
        {
          path: '/userHome/myChart',
          name: 'myChart',
          component: () => import('@/views/userHome/myCart'),
          meta: {title: '我的购物车'},
          children: [
            {
              path: '/createOrder',
              name: 'createOrder',
              component: () => import('@/views/payment/createOrder'),
              meta: {title: '创建订单'}
            }
          ]},
        {
          path: '/userHome/mySecurity',
          name: 'mySecurity',
          component: () => import('@/views/userHome/mySecurity'),
          meta: {title: '登录和安全'},
          children: [{
            path: '/userHome/mySecurity/resetMyPhone',
            name: 'resetMyPhone',
            component: () => import('@/views/userHome/resetMyPhone'),
            meta: {title: '重置手机号'}
          },
          {
            path: '/userHome/mySecurity/resetMyPassword',
            name: 'resetMyPassword',
            component: () => import('@/views/userHome/resetMyPassword'),
            meta: {title: '重置密码'}
          }]
        },
        {
          path: '/userHome/myAddress',
          name: 'myAddress',
          component: () => import('@/views/userHome/myAddress'),
          meta: {title: '我的地址'}
        }
      ]}, {
      path: '/search',
      name: 'Search',
      component: () => import('@/views/search/search')
    }, {
      path: '/searchResult',
      name: 'SearchResult',
      component: () => import('@/views/search/searchResult')
    }, {
      path: '/bookDetail',
      name: 'BookDetail',
      component: () => import('@/views/book/bookDetail')
    }, {
      path: '/shelveBook',
      name: 'ShelveBook',
      component: () => import('@/views/book/shelveBook')
    }
  ]
})
