
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Home from '@/components/Home.vue'
import Detail from '@/components/Detail.vue'

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        // keepAlive: true, //保活
        title: '全部课程',
        refName: 'fittime',
      }
    },
    {
      path: '/index',
      component: Home,
      meta: {
        title: '全部课程',
        refName:'fittime'
      }
    },
    {
      path:'/detail',
      name:'detail',
      component:Detail,
      meta: {
        title: '课程详情',
        refName:'detail'
      }
    }
  ]
})

