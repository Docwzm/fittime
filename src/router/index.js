
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import courseDetail from '@/pages/courseDetail.vue'

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/courseDetail',
      name: 'courseDetail',
      component: courseDetail,
      meta: {
        title: '课程详情'
      }
    }
  ]
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   }
  //   else {
  //     return { x: 0, y: 1 }
  //   }
  // }
})



