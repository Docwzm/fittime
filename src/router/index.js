import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import courseDetail from '@/pages/course/courseDetail'
import videoPlayer from '@/pages/course/videoPlayer';
import courseList from '@/pages/course/list'
import courseSpecial from '@/pages/course/special'
import courseShare from '@/pages/course/share'
import coursePayment from '@/pages/course/payment'
import systemService from '@/pages/system/service'

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/course-detail',
      name: 'courseDetail',
      component: courseDetail,
      meta:{
        fullScreen:true
      }
    },{
      path: '/video-player/:id',
      name: 'videoPlayer',
      component: videoPlayer,
      meta:{
        fullScreen:true
      }
    }, {
      path: '/course-list',
      name: 'courseList',
      component: courseList,
      meta: {
        title: '课程列表'
      }
    },
    {
      path: '/course-special',
      name: 'courseSpecial',
      component: courseSpecial,
      meta: {
        title: '课程专题'
      }
    },
    {
      path: '/course-payment',
      name: 'coursePayment',
      component: coursePayment,
      meta: {
        title: '课程购买'
      }
    },
    {
      path: '/course-share',
      name: 'courseShare',
      component: courseShare,
      meta: {
        title: '课程分享'
      }
    },
    {
      path: '/system-service',
      name: 'systemService',
      component: systemService,
      meta: {
        title: '联系客服'
      }
    },

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