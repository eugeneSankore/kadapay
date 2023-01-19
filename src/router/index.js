import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homme',
    // component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')

  },


  {
    path: '/causecontribution/:id/'
    , component: () => import(/* webpackChunkName: "home" */ '../pages/LandingPage.vue'),
    name: 'home',   /// <--- WEB HOME PAGE

    children: [
      {
        path: '/causecontribution/:id/',
        component: () => import(/* webpackChunkName: "home" */ '../pages/FormPageOneWeb.vue'),

      },
    ]
  },

  {
    path: '/causecontribution/:id/paymentrestart',
    component: () => import(/* webpackChunkName: "home" */ '../pages/PaymentFailPage.vue'),
    name: 'paymentrestart',

  },


  {
    path: '/causecontribution/:id/payment',
    component: () => import(/* webpackChunkName: "home" */ '../pages/StripePage.vue')
    ,
    name: 'stripPayment'
  },

  {
    path: '/causecontribution/:id/paymentfailure',
    component: () => import(/* webpackChunkName: "home" */ '../pages/PaymentFailPage.vue')
    ,
    name: 'PaymentFailure',  /// <--- WEB FAILURE Page
    // params: true,
    props: true
  },

  {
    path: '/paymentsuccess', component: () => import(/* webpackChunkName: "home" */ '../pages/SuccessPage.vue')
    , name: 'paymentsuccess'
  },

  {
    path: '/causecontribution/:id/form',
    component: () => import(/* webpackChunkName: "home" */ '../pages/FormPageTwo.vue')
    ,
    name: 'FormPageTwo',
    // params: true,
    props: true
  },


  {
    path: '/causecontribution/payment-error',
    name: 'error',
    component: () => import(/* webpackChunkName: "home" */ '../pages/ErrorPagePayment.vue'), props: true
  }
  ,

  {
    path: '/causecontribution/form', component: () => import(/* webpackChunkName: "home" */ '../pages/FormPageOne.vue'),
    name: 'mobileform',
    props: true
  },
  {
    path: '/:notFound(.*)',
    component: () => import(/* webpackChunkName: "home" */ '../pages/ErrorPagePayment.vue'),
    props: true
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
