import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'Home',
      component: () => import('@/views/home/home')
    }, {
      path: '/',
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
      path: '/goods',
      name: 'Goods',
      component: () => import('@/views/book/goods')
    }, {
      path: '/post',
      name: 'Posy',
      component: () => import('@/views/Post/post')
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
          meta: {title: '我的订单'},
          children: [
            {
              path: '/userHome/order/:orderId',
              name: 'orderDetail',
              component: () => import('@/views/payment/orderDetail'),
              meta: {title: '订单详情'}
            }
          ]
        },
        {
          path: '/userHome/mySoldOrder',
          name: 'mySoldOrder',
          component: () => import('@/views/userHome/mySoldOrder'),
          meta: {title: '我卖出的'},
          children: [
            {
              path: '/userHome/soldOrder/:orderId',
              name: 'soldOrderDetail',
              component: () => import('@/views/payment/orderDetail'),
              meta: {title: '订单详情'}
            }
          ]
        },
        {
          path: '/userHome/myChart',
          name: 'myChart',
          component: () => import('@/views/userHome/myCart'),
          meta: {title: '我的购物车'},
          children: [
            {
              path: '/createOrder',
              name: 'selectAddress',
              component: () => import('@/views/payment/selectAddress'),
              meta: {title: '选择收货地址'},
              children: [{
                path: '/createOrder/payment',
                name: 'createOrder',
                component: () => import('@/views/payment/createOrder'),
                meta: {title: '创建订单'}
              },
              {
                path: '/createOrder/result',
                name: 'createOrder',
                component: () => import('@/views/payment/createOrderResult'),
                meta: {title: '创建订单结果'}
              }
              ]
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
    },
    {
      path: '/communicate/:toUserId',
      name: 'communicate',
      component: () => import('@/views/communicate/communicate')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/userHome/user')
    },
    {
      path: '/barHome',
      name: 'BarHome',
      component: () => import('@/views/Bar/barHome')
    },
    {
      path: '/bar',
      name: 'Bar',
      component: () => import('@/views/Bar/bar')
    }
  ]
})

// 解决编程式路由往同一地址跳转时会报错的情况
const originalPush = Router.prototype.push
const originalReplace = Router.prototype.replace
// push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
Router.prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}
