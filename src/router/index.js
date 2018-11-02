
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Home from '@/components/Home.vue'
import Detail from '@/components/Detail.vue'
// const Other = r => require.ensure([], () => r(require('@/components/other.vue')), 'other')
// const AwardList = r => require.ensure([], () => r(require('@/components/awardList.vue')), 'list')

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        keepAlive: true, //保活
        title: 'fittime',
        title: 'fittime',
      }
    },
    {
      path: '/index',
      component: Home,
      meta: {
        keepAlive: true, //保活
        title: 'fittime',
        refName:'fittime'
      }
    },
    {
      path:'/detail',
      name:'detail',
      component:Detail,
      meta: {
        title: '课程',
        refName:'detail'
      }
    }
  ]
})

